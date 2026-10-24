/**
 * Educator AI Frontend API Client Service
 * Enforces strict AbortController timeouts (8000ms max) and dual-layer
 * sessionStorage client-side caching to eliminate infinite spins and redundant requests.
 */

function fetchWithClientTimeout(url, options, timeoutMs) {
  var opts = options || {};
  var ms = timeoutMs || 8000;
  if (typeof AbortController === 'undefined') {
    return fetch(url, opts);
  }
  var controller = new AbortController();
  var timer = setTimeout(function () {
    controller.abort();
  }, ms);

  var fetchOpts = Object.assign({}, opts, { signal: controller.signal });
  return fetch(url, fetchOpts).finally(function () {
    clearTimeout(timer);
  });
}

function getClientCachedResponse(query, tier) {
  if (!query) return null;
  try {
    var key = 'educator_cache_' + encodeURIComponent(query.trim().toLowerCase()) + '_' + (tier || 'workstation');
    var raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setClientCachedResponse(query, tier, data) {
  if (!query || !data) return;
  try {
    var key = 'educator_cache_' + encodeURIComponent(query.trim().toLowerCase()) + '_' + (tier || 'workstation');
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Non-critical session quota exceeded
  }
}

function handleApiCacheBadge(json) {
  var badge = document.getElementById('apiCacheBadge');
  if (!badge) return;
  if (json && (json.cached || json.clientCached)) {
    var sourceText = json.clientCached ? '⚡ Client Cached (<1ms)' : '⚡ Server Cached (<1ms)';
    badge.textContent = sourceText;
    badge.className = 'cache-indicator active';
    badge.style.display = 'inline-flex';
  } else {
    badge.textContent = '🌐 Live AI Synthesis';
    badge.className = 'cache-indicator live';
    badge.style.display = 'inline-flex';
  }
}

function fetchFromEducatorAPI(queryText, callback) {
  var wrappedCallback = function (err, json) {
    if (!err && json) handleApiCacheBadge(json);
    callback(err, json);
  };

  var tier = window.HARDWARE_TIER || 'workstation';
  var tierQuery = '&tier=' + encodeURIComponent(tier);

  // 1. Check client-side sessionStorage cache first (FLAW-07)
  var clientCached = getClientCachedResponse(queryText, tier);
  if (clientCached) {
    clientCached.clientCached = true;
    clientCached.cached = true;
    return wrappedCallback(null, clientCached);
  }

  var cloudUrl = 'https://educator-ai-jolp.onrender.com/api/career-guide?query=' + encodeURIComponent(queryText) + tierQuery;

  var onFetchSuccess = function (json) {
    if (json && json.success) {
      setClientCachedResponse(queryText, tier, json);
    }
    wrappedCallback(null, json);
  };

  // 2. Hosted on Render cloud server -> relative endpoint with 8000ms timeout
  if (window.location.hostname && window.location.hostname.indexOf('onrender.com') !== -1) {
    fetchWithClientTimeout('/api/career-guide?query=' + encodeURIComponent(queryText) + tierQuery, {}, 8000)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(onFetchSuccess)
      .catch(function (err) {
        wrappedCallback(err);
      });
    return;
  }

  // 3. Localhost or 127.0.0.1 -> local endpoint with 8000ms timeout, failover to Cloud with 8000ms timeout
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    fetchWithClientTimeout('/api/career-guide?query=' + encodeURIComponent(queryText) + tierQuery, {}, 8000)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(onFetchSuccess)
      .catch(function () {
        fetchWithClientTimeout(cloudUrl, {}, 8000)
          .then(function (res) {
            return res.json();
          })
          .then(onFetchSuccess)
          .catch(function (err) {
            wrappedCallback(err);
          });
      });
    return;
  }

  // 4. Opened via file:/// or static host -> cascade local ports with 1500ms timeout, failover to Cloud
  var primaryLocal = 'http://localhost:3000/api/career-guide?query=' + encodeURIComponent(queryText) + tierQuery;
  var altLocal = 'http://localhost:3001/api/career-guide?query=' + encodeURIComponent(queryText) + tierQuery;

  fetchWithClientTimeout(primaryLocal, {}, 1500)
    .then(function (res) {
      if (!res.ok) throw new Error('Local 3000 non-200');
      return res.json();
    })
    .then(onFetchSuccess)
    .catch(function () {
      fetchWithClientTimeout(altLocal, {}, 1500)
        .then(function (res) {
          if (!res.ok) throw new Error('Local 3001 non-200');
          return res.json();
        })
        .then(onFetchSuccess)
        .catch(function () {
          fetchWithClientTimeout(cloudUrl, {}, 8000)
            .then(function (res) {
              return res.json();
            })
            .then(onFetchSuccess)
            .catch(function (err) {
              wrappedCallback(err);
            });
        });
    });
}

// Global exports
window.fetchWithClientTimeout = fetchWithClientTimeout;
window.getClientCachedResponse = getClientCachedResponse;
window.setClientCachedResponse = setClientCachedResponse;
window.handleApiCacheBadge = handleApiCacheBadge;
window.fetchFromEducatorAPI = fetchFromEducatorAPI;
