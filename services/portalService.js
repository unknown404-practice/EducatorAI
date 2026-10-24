const http = require('http');
const https = require('https');
const OFFICIAL_PORTALS = require('../data/portals');

/**
 * Validates connection to official government and academic portals.
 * Ensures HTTP status codes 200-399 are accurately marked as verified live,
 * while 4xx/5xx or timeouts are truthfully reported as degraded/offline.
 */
async function verifyPortalConnection(portalKey) {
  const portal = OFFICIAL_PORTALS[portalKey] || OFFICIAL_PORTALS['aicte'];
  return new Promise((resolve) => {
    const start = Date.now();
    try {
      const client = portal.url.startsWith('http:') ? http : https;
      const req = client.get(
        portal.url,
        { timeout: 2500, rejectUnauthorized: false },
        (res) => {
          const isSuccess = res.statusCode >= 200 && res.statusCode < 400;
          resolve({
            name: portal.name,
            url: portal.url,
            desc: portal.desc,
            status: isSuccess
              ? `Verified Live (HTTP ${res.statusCode})`
              : `Degraded / Error (HTTP ${res.statusCode})`,
            latency: `${Date.now() - start}ms`,
            verified: isSuccess
          });
        }
      );

      req.on('error', () => {
        resolve({
          name: portal.name,
          url: portal.url,
          desc: portal.desc,
          status: 'Offline / Using Cached Data (Verification Failed)',
          latency: 'Timeout/Error',
          verified: false
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: portal.name,
          url: portal.url,
          desc: portal.desc,
          status: 'Offline / Using Cached Data (Verification Failed)',
          latency: 'Timeout/Error',
          verified: false
        });
      });
    } catch (err) {
      resolve({
        name: portal.name,
        url: portal.url,
        desc: portal.desc,
        status: 'Offline / Using Cached Data (Verification Failed)',
        latency: 'Timeout/Error',
        verified: false
      });
    }
  });
}

module.exports = {
  OFFICIAL_PORTALS,
  verifyPortalConnection
};
