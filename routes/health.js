const express = require('express');
const router = express.Router();
const cacheService = require('../services/cacheService');
const { OFFICIAL_PORTALS } = require('../services/portalService');
const CAREER_DATABASE = require('../data/careers');

router.get(['/ping', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    service: 'Educator AI Intelligence Gateway',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    message: 'Keep-Alive Heartbeat Active - Container Awake'
  });
});

router.get('/stats', (req, res) => {
  const cacheStats = cacheService.getStats();
  res.json({
    success: true,
    service: 'Educator AI SaaS Intelligence Gateway',
    version: '2.0.0-saas',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    cache: cacheStats,
    rateLimiting: {
      windowMs: 15 * 60 * 1000,
      maxPerWindow: 100
    },
    portalsTracked: Object.keys(OFFICIAL_PORTALS).length,
    careersTracked: Object.keys(CAREER_DATABASE).length
  });
});

module.exports = router;
