const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { PORT } = require('./config/env');
const apiRoutes = require('./routes/api');
const healthRoutes = require('./routes/health');

const app = express();

// Flaw #6: Enable reverse-proxy IP trust immediately for Render / Cloudflare
app.set('trust proxy', 1);

// Flaw #6: Production API Rate Limiter (100 req / 15 min per client IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Rate limit exceeded. Please wait 15 minutes.' },
  skip: (req) => req.path === '/ping' || req.path === '/health'
});

// Middleware & Static Security Perimeter
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', apiLimiter);

// Telemetry, Health, and Business APIs
app.use('/api', healthRoutes);
app.use('/api', apiRoutes);

// Page Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landingpage.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Educator.html'));
});

// Automatic Port Conflict Fallback Listener
function startServer(portToTry) {
  const srv = app.listen(portToTry, () => {
    console.log(`[Educator AI] Intelligence Server running at http://localhost:${portToTry}`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = Number(portToTry) + 1;
      console.warn(`[Port Conflict] Port ${portToTry} in use. Automatically binding to http://localhost:${nextPort}...`);
      startServer(nextPort);
    } else {
      console.error('[Server Error]', err);
    }
  });
}

if (require.main === module) {
  startServer(PORT);
}

module.exports = app;
