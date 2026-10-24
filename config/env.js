require('dotenv').config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const openRouterKeys = [
  process.env.OPENROUTER_API_KEY,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
  process.env.OPENROUTER_API_KEY_4,
  process.env.OPENROUTER_API_KEY_5
]
  .filter(key => typeof key === 'string' && key.trim().length > 0)
  .map(key => key.trim());

// Eliminate duplicate keys
const uniqueOpenRouterKeys = Array.from(new Set(openRouterKeys));

const cloudflareAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
  ? process.env.CLOUDFLARE_ACCOUNT_ID.trim()
  : null;

const cloudflareApiToken = (process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_API_KEY)
  ? (process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_API_KEY).trim()
  : null;

module.exports = {
  PORT: isNaN(port) ? 3000 : port,
  OPENROUTER_KEYS: uniqueOpenRouterKeys,
  CLOUDFLARE_ACCOUNT_ID: cloudflareAccountId,
  CLOUDFLARE_API_TOKEN: cloudflareApiToken,
  NODE_ENV: process.env.NODE_ENV || 'production'
};
