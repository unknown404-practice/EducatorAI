const { OPENROUTER_KEYS, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = require('../config/env');

const DEVICE_MODEL_TIERS = {
  workstation: [
    'openrouter/free',
    'nvidia/nemotron-3.5-lightning:free',
    'qwen/qwen3.8-27b:free',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free',
    'openai/gpt-oss-120b'
  ],
  mobile: [
    'openrouter/free',
    'nvidia/nemotron-3.5-lightning:free',
    'qwen/qwen3.8-27b:free',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free'
  ],
  legacy: [
    'openrouter/free',
    'nvidia/nemotron-3.5-lightning:free',
    'qwen/qwen3.8-27b:free',
    'google/gemma-4-31b-it:free'
  ]
};

function detectServerDeviceTier(req) {
  if (req && req.query && req.query.tier && DEVICE_MODEL_TIERS[req.query.tier]) {
    return req.query.tier;
  }
  const ua = (req && req.headers && req.headers['user-agent'])
    ? req.headers['user-agent'].toLowerCase()
    : '';

  if (
    ua.includes('windows nt 6.1') ||
    ua.includes('windows nt 6.0') ||
    ua.includes('android 4.') ||
    ua.includes('android 5.') ||
    ua.includes('android 6.')
  ) {
    return 'legacy';
  }
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('tablet')
  ) {
    return 'mobile';
  }
  return 'workstation';
}

async function fetchWithTimeout(resource, options = {}, timeoutMs = 8000, parentSignal = null) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const abortHandler = () => controller.abort();
  if (parentSignal) {
    if (parentSignal.aborted) {
      clearTimeout(id);
      throw new Error('Operation aborted by parent signal');
    }
    parentSignal.addEventListener('abort', abortHandler);
  }

  try {
    const response = await globalThis.fetch(resource, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(id);
    if (parentSignal) {
      parentSignal.removeEventListener('abort', abortHandler);
    }
  }
}

async function callEQEngine(systemPrompt, studentMessage, parentSignal = null, deadlineTimestamp = 0) {
  const apiKeys = OPENROUTER_KEYS;
  const eqModels = [
    process.env.NEXT_PUBLIC_AI_MODEL,
    'openrouter/free',
    'nvidia/nemotron-3.5-lightning:free',
    'qwen/qwen3.8-27b:free',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free',
    'openai/gpt-oss-120b'
  ].filter(Boolean);

  for (const model of eqModels) {
    if (parentSignal && parentSignal.aborted) break;
    if (deadlineTimestamp && Date.now() >= deadlineTimestamp) break;

    for (const apiKey of apiKeys) {
      if (parentSignal && parentSignal.aborted) break;
      if (deadlineTimestamp && Date.now() >= deadlineTimestamp) break;

      const remainingTime = deadlineTimestamp ? Math.max(500, deadlineTimestamp - Date.now()) : 8000;
      const perCallTimeout = Math.min(8000, remainingTime);

      try {
        const response = await fetchWithTimeout(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'HTTP-Referer': 'https://github.com/unknown404-practice/EducatorAI',
              'X-Title': 'Educator AI EQ Engine',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: studentMessage }
              ],
              temperature: 0.75,
              max_tokens: 650
            })
          },
          perCallTimeout,
          parentSignal
        );

        if (response.ok) {
          const json = await response.json();
          if (json.choices && json.choices.length > 0 && json.choices[0].message) {
            const rawContent = json.choices[0].message.content || json.choices[0].message.reasoning;
            if (rawContent && typeof rawContent === 'string' && rawContent.trim()) {
              return {
                content: rawContent.trim(),
                model
              };
            }
          }
        } else if (response.status === 401 || response.status === 429) {
          continue; // Rotate key
        } else {
          break; // Next model
        }
      } catch (err) {
        break; // Next model on network or abort failure
      }
    }
  }

  // Cloudflare Workers AI Edge EQ Fallback (only if explicit env tokens configured)
  if (CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_API_TOKEN) {
    if (!parentSignal || !parentSignal.aborted) {
      const remainingTime = deadlineTimestamp ? Math.max(500, deadlineTimestamp - Date.now()) : 5000;
      try {
        const cfResponse = await fetchWithTimeout(
          `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: studentMessage }
              ]
            })
          },
          remainingTime,
          parentSignal
        );
        if (cfResponse.ok) {
          const cfJson = await cfResponse.json();
          if (cfJson.success && cfJson.result && cfJson.result.response) {
            return {
              content: cfJson.result.response,
              model: 'Cloudflare Edge AI (@cf/meta/llama-3.1-8b-instruct)'
            };
          }
        }
      } catch (cfErr) {
        // Fall through to null
      }
    }
  }

  return null;
}

async function callOpenRouterAI(systemPrompt, userPrompt, tier = 'workstation', parentSignal = null, deadlineTimestamp = 0) {
  const apiKeys = OPENROUTER_KEYS;
  const modelList = DEVICE_MODEL_TIERS[tier] || DEVICE_MODEL_TIERS.workstation;

  for (const model of modelList) {
    if (parentSignal && parentSignal.aborted) break;
    if (deadlineTimestamp && Date.now() >= deadlineTimestamp) break;

    for (const apiKey of apiKeys) {
      if (parentSignal && parentSignal.aborted) break;
      if (deadlineTimestamp && Date.now() >= deadlineTimestamp) break;

      const remainingTime = deadlineTimestamp ? Math.max(500, deadlineTimestamp - Date.now()) : 8000;
      const perCallTimeout = Math.min(8000, remainingTime);

      try {
        const isMassiveModel = model.includes('120b') || model.includes('72b') || model.includes('70b') || model.includes('405b');
        const response = await fetchWithTimeout(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'HTTP-Referer': 'https://github.com/unknown404-practice/EducatorAI',
              'X-Title': 'Educator AI Career Mentor',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              temperature: isMassiveModel ? 0.6 : 0.7,
              max_tokens: isMassiveModel ? 1800 : 1500
            })
          },
          perCallTimeout,
          parentSignal
        );

        if (response.ok) {
          const json = await response.json();
          if (json.choices && json.choices.length > 0 && json.choices[0].message) {
            const rawContent = json.choices[0].message.content || json.choices[0].message.reasoning;
            if (rawContent && typeof rawContent === 'string' && rawContent.trim()) {
              return {
                content: rawContent.trim(),
                model,
                tier
              };
            }
          }
        } else if (response.status === 401 || response.status === 429) {
          continue; // Try next key
        } else {
          break; // Try next model
        }
      } catch (err) {
        break; // Network/abort failover to next model
      }
    }
  }

  // Cloudflare Workers AI Edge Fallback (only if runtime environment variables are set)
  if (CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_API_TOKEN) {
    if (!parentSignal || !parentSignal.aborted) {
      const remainingTime = deadlineTimestamp ? Math.max(500, deadlineTimestamp - Date.now()) : 5000;
      try {
        const cfModel = tier === 'workstation' ? '@cf/meta/llama-3.1-70b-instruct' : '@cf/meta/llama-3.1-8b-instruct';
        const cfResponse = await fetchWithTimeout(
          `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${cfModel}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ]
            })
          },
          remainingTime,
          parentSignal
        );
        if (cfResponse.ok) {
          const cfJson = await cfResponse.json();
          if (cfJson.success && cfJson.result && cfJson.result.response) {
            return {
              content: cfJson.result.response,
              model: `Cloudflare Workers AI (${cfModel})`,
              tier
            };
          }
        }
      } catch (cfErr) {
        // Fall through to null
      }
    }
  }

  return null;
}

// Global 12s deadline wrappers preventing Render 30s gateway timeout
async function callEQEngineWithDeadline(systemPrompt, studentMessage, globalTimeoutMs = 12000) {
  const globalController = new AbortController();
  const deadline = Date.now() + globalTimeoutMs;
  const timer = setTimeout(() => globalController.abort(), globalTimeoutMs);
  try {
    return await callEQEngine(systemPrompt, studentMessage, globalController.signal, deadline);
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenRouterAIWithDeadline(systemPrompt, userPrompt, tier, globalTimeoutMs = 12000) {
  const globalController = new AbortController();
  const deadline = Date.now() + globalTimeoutMs;
  const timer = setTimeout(() => globalController.abort(), globalTimeoutMs);
  try {
    return await callOpenRouterAI(systemPrompt, userPrompt, tier, globalController.signal, deadline);
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  DEVICE_MODEL_TIERS,
  detectServerDeviceTier,
  fetchWithTimeout,
  callEQEngine,
  callEQEngineWithDeadline,
  callOpenRouterAI,
  callOpenRouterAIWithDeadline
};
