/**
 * Educator AI Production Readiness & Flaws Verification Suite
 * Verifies all 7 audit flaws across Phases 1-5.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let allPassed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    allPassed = false;
  }
}

async function runTests() {
  console.log('\n--- 1. Security & Environment Hardening (FLAW-01 & FLAW-06) ---');
  const serverCode = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
  const envCode = fs.readFileSync(path.join(__dirname, 'config', 'env.js'), 'utf8');
  const llmCode = fs.readFileSync(path.join(__dirname, 'services', 'llmService.js'), 'utf8');

  assert(!serverCode.includes('1ab26c6a33c9eeb1bd8d302029b88a06'), 'server.js has no hardcoded Cloudflare account id');
  assert(!llmCode.includes('1ab26c6a33c9eeb1bd8d302029b88a06'), 'llmService.js has no hardcoded Cloudflare account id');
  assert(!serverCode.includes('cfut_zy1DXlo4fZEU6sLMbUDMTolHuiiF3XXbvssv9RHeb6cccf3a'), 'server.js has no hardcoded Cloudflare API token');
  assert(!llmCode.includes('cfut_zy1DXlo4fZEU6sLMbUDMTolHuiiF3XXbvssv9RHeb6cccf3a'), 'llmService.js has no hardcoded Cloudflare API token');
  assert(serverCode.includes("app.set('trust proxy', 1);") || serverCode.includes('app.set("trust proxy", 1);'), 'server.js configures trust proxy for Render');
  assert(serverCode.includes('max: 100'), 'API rate limit configured for 100 requests / 15 minutes');

  console.log('\n--- 2. Backend Modular Layering (FLAW-02) ---');
  const serverLines = serverCode.split('\n').length;
  assert(serverLines < 100, `server.js entry point is < 100 lines (current: ${serverLines} lines)`);
  assert(fs.existsSync(path.join(__dirname, 'config', 'env.js')), 'config/env.js exists');
  assert(fs.existsSync(path.join(__dirname, 'services', 'cacheService.js')), 'services/cacheService.js exists');
  assert(fs.existsSync(path.join(__dirname, 'services', 'portalService.js')), 'services/portalService.js exists');
  assert(fs.existsSync(path.join(__dirname, 'services', 'llmService.js')), 'services/llmService.js exists');
  assert(fs.existsSync(path.join(__dirname, 'services', 'emotionService.js')), 'services/emotionService.js exists');
  assert(fs.existsSync(path.join(__dirname, 'services', 'candidateService.js')), 'services/candidateService.js exists');
  assert(fs.existsSync(path.join(__dirname, 'controllers', 'careerController.js')), 'controllers/careerController.js exists');
  assert(fs.existsSync(path.join(__dirname, 'routes', 'health.js')), 'routes/health.js exists');
  assert(fs.existsSync(path.join(__dirname, 'routes', 'api.js')), 'routes/api.js exists');

  console.log('\n--- 3. Timeouts & Cascades (FLAW-03) ---');
  const apiClientCode = fs.readFileSync(path.join(__dirname, 'public', 'js', 'services', 'apiClient.js'), 'utf8');
  assert(apiClientCode.includes('AbortController'), 'Frontend apiClient enforces AbortController');
  assert(apiClientCode.includes('8000'), 'Frontend apiClient default timeout is 8000ms');
  assert(llmCode.includes('globalTimeoutMs = 12000'), 'Backend llmService enforces global 12s deadline');
  assert(llmCode.includes('callOpenRouterAIWithDeadline'), 'Backend exposes callOpenRouterAIWithDeadline');
  assert(llmCode.includes('callEQEngineWithDeadline'), 'Backend exposes callEQEngineWithDeadline');

  console.log('\n--- 4. Truthful Portal Verification (FLAW-04) ---');
  const portalCode = fs.readFileSync(path.join(__dirname, 'services', 'portalService.js'), 'utf8');
  assert(portalCode.includes('res.statusCode >= 200 && res.statusCode < 400'), 'portalService validates HTTP status codes 200-399');
  assert(portalCode.includes('Degraded / Error'), 'portalService marks non-2xx/3xx as Degraded / Error');

  const clientCareersCode = fs.readFileSync(path.join(__dirname, 'public', 'js', 'data', 'clientCareers.js'), 'utf8');
  assert(!clientCareersCode.includes("'200% Verified Live Gateway'"), 'clientCareers has 0 fake 200% Verified Live Gateway strings');
  assert(clientCareersCode.includes("'Cached Client Data (Unverified Offline)'"), 'clientCareers uses truthful Cached Client Data (Unverified Offline)');

  console.log('\n--- 5. Frontend Modular Architecture (FLAW-05) ---');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'data', 'clientCareers.js')), 'public/js/data/clientCareers.js exists');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'services', 'apiClient.js')), 'public/js/services/apiClient.js exists');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'ui', 'mindmapCanvas.js')), 'public/js/ui/mindmapCanvas.js exists');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'ui', 'chatView.js')), 'public/js/ui/chatView.js exists');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'ui', 'reportGenerator.js')), 'public/js/ui/reportGenerator.js exists');
  assert(fs.existsSync(path.join(__dirname, 'public', 'js', 'main.js')), 'public/js/main.js exists');

  const htmlCode = fs.readFileSync(path.join(__dirname, 'public', 'Educator.html'), 'utf8');
  assert(htmlCode.includes('src="js/data/clientCareers.js"'), 'Educator.html references clientCareers.js');
  assert(htmlCode.includes('src="js/services/apiClient.js"'), 'Educator.html references apiClient.js');
  assert(htmlCode.includes('src="js/ui/mindmapCanvas.js"'), 'Educator.html references mindmapCanvas.js');
  assert(htmlCode.includes('src="js/ui/chatView.js"'), 'Educator.html references chatView.js');
  assert(htmlCode.includes('src="js/ui/reportGenerator.js"'), 'Educator.html references reportGenerator.js');
  assert(htmlCode.includes('src="js/main.js"'), 'Educator.html references main.js');

  console.log('\n--- 6. Caching System Integrity (FLAW-07) ---');
  const cacheCode = fs.readFileSync(path.join(__dirname, 'services', 'cacheService.js'), 'utf8');
  assert(cacheCode.includes('NodeCache'), 'cacheService uses NodeCache');
  assert(cacheCode.includes('DISK_CACHE_PATH'), 'cacheService implements disk cache persistence');
  assert(apiClientCode.includes('sessionStorage'), 'Frontend implements sessionStorage caching');
  assert(apiClientCode.includes('educator_cache_'), 'Frontend sets educator_cache_ keys');

  const controllerCode = fs.readFileSync(path.join(__dirname, 'controllers', 'careerController.js'), 'utf8');
  const catchMatches = controllerCode.match(/catch\s*\(err\)\s*\{([\s\S]*?)\n\}/);
  assert(catchMatches && catchMatches[1].includes('sendGuideResponse'), 'careerController catch block routes through sendGuideResponse');

  console.log('\n--- 7. Live Server Endpoints & Telemetry Integration ---');
  const express = require('express');
  const cors = require('cors');
  const healthRoutes = require('./routes/health');
  const apiRoutes = require('./routes/api');

  const testApp = express();
  testApp.set('trust proxy', 1);
  testApp.use(cors());
  testApp.use(express.json());
  testApp.use('/api', healthRoutes);
  testApp.use('/api', apiRoutes);

  const testPort = 3847;
  const server = testApp.listen(testPort);

  function makeRequest(urlPath) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${testPort}${urlPath}`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch(e) {
            resolve({ status: res.statusCode, body });
          }
        });
      }).on('error', reject);
    });
  }

  try {
    const pingRes = await makeRequest('/api/ping');
    assert(pingRes.status === 200 && pingRes.data.status === 'ONLINE', 'GET /api/ping returns 200 ONLINE');

    const statsRes = await makeRequest('/api/stats');
    assert(statsRes.status === 200 && statsRes.data.version === '2.0.0-saas', 'GET /api/stats returns 200 with SaaS metrics');
    assert(statsRes.data.rateLimiting.maxPerWindow === 100, 'GET /api/stats reports 100 max per rate window');
    assert(statsRes.data.portalsTracked >= 18, `GET /api/stats tracks ${statsRes.data.portalsTracked} official portals`);

    const greetRes = await makeRequest('/api/career-guide?query=hello');
    assert(greetRes.status === 200 && greetRes.data.success && greetRes.data.isGreeting, 'GET /api/career-guide?query=hello returns high-EQ greeting');

    const careerRes = await makeRequest('/api/career-guide?query=b.tech%20cse');
    assert(
      careerRes.status === 200 &&
      careerRes.data.success &&
      Boolean(careerRes.data.data && careerRes.data.data.role && (careerRes.data.data.role.includes('B.Tech') || careerRes.data.data.role.includes('Computer') || careerRes.data.data.role.includes('Software'))),
      'GET /api/career-guide?query=b.tech%20cse returns career guidance'
    );

    const cachedRes = await makeRequest('/api/career-guide?query=b.tech%20cse');
    assert(cachedRes.status === 200 && cachedRes.data.cached === true, 'Subsequent query returns cached: true from dual-layer cache');
  } finally {
    server.close();
  }

  console.log('\n-----------------------------------------------------------');
  if (allPassed) {
    console.log('🎉 ALL PRODUCTION READINESS CRITERIA & AUDIT TESTS PASSED!');
  } else {
    console.error('❌ SOME TESTS FAILED. PLEASE REVIEW LOGS.');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
