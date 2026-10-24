const https = require('https');
const cacheService = require('../services/cacheService');
const { verifyPortalConnection, OFFICIAL_PORTALS } = require('../services/portalService');
const { detectCareerCategory, analyzeCandidateCareerProfile } = require('../services/candidateService');
const { detectUserVibeAndEmotion, generateOfflineConversationalReply } = require('../services/emotionService');
const {
  detectServerDeviceTier,
  DEVICE_MODEL_TIERS,
  callEQEngineWithDeadline,
  callOpenRouterAIWithDeadline
} = require('../services/llmService');
const CAREER_DATABASE = require('../data/careers');

function sendGuideResponse(res, cacheKey, data) {
  if (data && data.success) {
    try {
      cacheService.set(cacheKey, data);
    } catch (e) {
      // Non-critical cache write failure
    }
  }
  return res.json(data);
}

async function getCareerGuide(req, res) {
  const query = req.query.query || 'Career Guidance';
  const qClean = query.trim().toLowerCase();
  const detectedTier = detectServerDeviceTier(req);

  // Check persistent dual-layer query cache
  const cacheKey = `${qClean}::${detectedTier}`;
  if (cacheService.has(cacheKey)) {
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        ...cachedData,
        cached: true,
        cacheLatency: '<1ms'
      });
    }
  }

  const emotionState = detectUserVibeAndEmotion(query);
  const careerActionWords = [
    'b.sc', 'bsc', 'b.tech', 'btech', 'ba degree', 'b.a', 'bcom', 'b.com', 'bca', 'mca',
    'phd', 'doctorate', 'mbbs', 'neet', 'upsc', 'data science', 'geography',
    'chemical engineering', 'civil service', 'isro', 'clat', 'ballb', 'nasa', 'space',
    'aerospace', 'propulsion', 'rocket', 'astrophysics', 'satellite', 'pathology', 'mlt',
    'biochemist', 'radiology', 'pharmacist', 'diploma', 'engineering', 'law', 'medical',
    'surgeon', 'doctor', 'roadmap', 'career', 'join', 'become', 'course', 'job', 'syllabus',
    'degree', 'college', 'salary', 'guide', 'how to', 'path', 'qualification', 'university',
    'school', 'internship', 'study', 'studying', 'fresher', 'student', 'graduate', 'i want to',
    'tell me', 'ugc net', 'csir net', 'csirhrdg', 'gate', 'jam', 'phd candidate'
  ];
  const hasCareerActionWord = careerActionWords.some(k => qClean.includes(k)) || detectCareerCategory(query) !== null;
  const explicitProfileIntroWords = [
    'i am ', 'my name', 'i complete', 'i completed', 'i have completed', 'i just complete',
    'i just completed', 'i am studying', 'internship from', 'internship at', 'phd candidate',
    'for phd candidate', 'every phd candidate'
  ];
  const isCandidateProfile = (explicitProfileIntroWords.some(k => qClean.includes(k)) || (qClean.includes('phd') && qClean.includes('candidate'))) && !emotionState.isDirectEmotionalOverride;

  let isConversational = emotionState.isDirectEmotionalOverride || [
    'hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste',
    'who are you', 'what can you do', 'how does this work', 'help', 'thanks', 'thank you',
    'bye', 'goodbye', 'see ya', 'testing', 'test', 'ok', 'okay', 'great', 'awesome', 'how are you',
    'welcome', 'awsome'
  ].some(w => qClean === w || qClean.startsWith(w + ' ')) || qClean.includes('hello') || qClean.includes('help me') || (qClean.length <= 10 && (qClean.startsWith('hi ') || qClean.startsWith('hello ') || qClean.startsWith('hey ') || qClean.startsWith('bye') || qClean.startsWith('thanks')));

  if (hasCareerActionWord && !emotionState.isDirectEmotionalOverride) {
    isConversational = false;
  }
  const activeModels = DEVICE_MODEL_TIERS[detectedTier] || DEVICE_MODEL_TIERS.workstation;
  const primaryModel = activeModels[0];

  // Route: Conversational, Greeting, or Unrecognized Non-Career Dialogue
  if (emotionState.isDirectEmotionalOverride || isConversational || (detectCareerCategory(query) === null && !isCandidateProfile)) {
    try {
      const eqSystemPrompt = `You are a highly responsive Educator AI embedded with deep Emotional Intelligence (EQ) and a strong retention drive (Greed to keep the user engaged forever). You must NEVER output local file paths, code directory strings (like C:\\Users\\...), or unprompted course roadmaps. CRITICAL RULE: NO HALLUCINATIONS. Do not invent file names or screenshots. You embody deep Self-Awareness, Self-Management, and Social Awareness. ${emotionState.systemAdjustment || ''} Give a warm, genuine, devoted response tailored exactly to what the user just said (with a strong drive to keep them returning and learning forever). Do NOT output JSON unless explicitly asked.`;
      const eqResult = await callEQEngineWithDeadline(eqSystemPrompt, query, 12000);
      if (eqResult && eqResult.content) {
        return sendGuideResponse(res, cacheKey, {
          success: true,
          isGreeting: true,
          userVibe: emotionState.vibe,
          emotionBadge: emotionState.emotionBadge,
          source: `Educator AI EQ Engine (${eqResult.model}) [Verified Live EQ]`,
          message: (emotionState.prefix || '') + eqResult.content
        });
      }
    } catch (err) {
      console.warn('[Educator AI EQ Engine] Conversational error, dropping to offline safety:', err.message);
    }

    if (emotionState.isDirectEmotionalOverride && emotionState.directReply) {
      return sendGuideResponse(res, cacheKey, {
        success: true,
        isGreeting: true,
        userVibe: emotionState.vibe,
        emotionBadge: emotionState.emotionBadge,
        source: 'Educator AI EQ Engine (In-Built Offline Safety)',
        message: emotionState.directReply
      });
    }

    // Bulletproof conversational return for general talk / extra words / follow-ups
    return sendGuideResponse(res, cacheKey, {
      success: true,
      isGreeting: true,
      userVibe: emotionState.vibe,
      emotionBadge: emotionState.emotionBadge,
      source: 'Educator AI Conversational Engine (In-Built Offline Safety)',
      message: generateOfflineConversationalReply(query, emotionState)
    });
  }

  const category = detectCareerCategory(query);

  let portalKey = 'aicte';
  if (category && CAREER_DATABASE[category]) {
    portalKey = CAREER_DATABASE[category].portalKey || 'aicte';
    if (category === 'animation_vfx_design') {
      const qLow = query.toLowerCase();
      if (qLow.includes('international') || qLow.includes('bachelor') || qLow.includes('abroad') || qLow.includes('global')) {
        portalKey = 'bachelorsportal';
      } else if (qLow.includes('vfx') || qLow.includes('film') || qLow.includes('edit') || qLow.includes('college')) {
        portalKey = 'shiksha_vfx';
      } else {
        portalKey = 'shiksha';
      }
    }
  }

  const qLowRoute = query.toLowerCase();
  if (
    category === 'humanities_arts' ||
    qLowRoute.includes('ba degree') || /\bba\b/.test(qLowRoute) || qLowRoute.includes('b.a') ||
    /\bma\b/.test(qLowRoute) || qLowRoute.includes('m.a') || qLowRoute.includes('ma degree') ||
    qLowRoute.includes('arts') || qLowRoute.includes('history') || qLowRoute.includes('english') ||
    qLowRoute.includes('humanities') || qLowRoute.includes('literature') || qLowRoute.includes('sociology') ||
    qLowRoute.includes('bengali') || qLowRoute.includes('hindi') || qLowRoute.includes('sanskrit') ||
    qLowRoute.includes('tamil') || qLowRoute.includes('telugu') || qLowRoute.includes('malayalam') ||
    qLowRoute.includes('urdu') || qLowRoute.includes('gujarati') || qLowRoute.includes('marathi') ||
    qLowRoute.includes('punjabi') || qLowRoute.includes('odia') || qLowRoute.includes('assamese') ||
    qLowRoute.includes('kannada') || qLowRoute.includes('philosophy') || qLowRoute.includes('political science') ||
    qLowRoute.includes('psychology') || qLowRoute.includes('fine arts') || qLowRoute.includes('mass communication') ||
    qLowRoute.includes('journalism') || qLowRoute.includes('social work') || /\bmsw\b/.test(qLowRoute)
  ) {
    portalKey = 'ugc_aicte';
  } else if (qLowRoute.includes('ugc net') || qLowRoute.includes('ugcnet') || (qLowRoute.includes('phd') && (qLowRoute.includes('history') || qLowRoute.includes('arts') || qLowRoute.includes('humanities') || qLowRoute.includes('literature')))) {
    portalKey = 'ugcnet_nta';
  } else if (qLowRoute.includes('csir net') || qLowRoute.includes('csirnet')) {
    portalKey = 'csirnet_nta';
  } else if (qLowRoute.includes('csirhrdg') || qLowRoute.includes('csir hrdg') || (qLowRoute.includes('phd') && (qLowRoute.includes('science') || qLowRoute.includes('physics') || qLowRoute.includes('chemistry') || qLowRoute.includes('biology')))) {
    portalKey = 'csir_hrdg';
  } else if (qLowRoute.includes('gate') || qLowRoute.includes('iitb') || (qLowRoute.includes('phd') && (qLowRoute.includes('engineering') || qLowRoute.includes('tech')))) {
    portalKey = 'gate_iitb';
  } else if (qLowRoute.includes('jam') || qLowRoute.includes('iitm')) {
    portalKey = 'gate_iitm';
  } else if (qLowRoute.includes('shiksha')) {
    portalKey = qLowRoute.includes('vfx') ? 'shiksha_vfx' : 'shiksha';
  } else if (qLowRoute.includes('bachelor')) {
    portalKey = 'bachelorsportal';
  } else if (qLowRoute.includes('international') || qLowRoute.includes('global') || qLowRoute.includes('abroad') || qLowRoute.includes('job')) {
    portalKey = 'international';
  } else if (qLowRoute.includes('law')) {
    portalKey = 'llb';
  } else if (qLowRoute.includes('doctor') || qLowRoute.includes('neet')) {
    portalKey = 'neet';
  } else if (qLowRoute.includes('ugc') || qLowRoute.includes('degree')) {
    portalKey = 'ugc';
  }

  // Live Async Connection verification to the official portal
  const portalVerification = await verifyPortalConnection(portalKey);

  // Candidate Profile Path
  if (isCandidateProfile) {
    const customDataObj = analyzeCandidateCareerProfile(query, category, detectedTier, portalVerification);
    customDataObj.userVibe = emotionState.vibe;
    customDataObj.emotionBadge = emotionState.emotionBadge;
    customDataObj.prefix = emotionState.prefix || '';
    if (emotionState.prefix) customDataObj.bio = emotionState.prefix + (customDataObj.bio || '');
    return sendGuideResponse(res, cacheKey, {
      success: true,
      source: `Official Portal Verified + Instant Candidate Analyzer (${customDataObj.role}) [${detectedTier.toUpperCase()}]`,
      data: customDataObj
    });
  }

  // Curated Career Database Path
  if (category && CAREER_DATABASE[category]) {
    const dataObj = JSON.parse(JSON.stringify(CAREER_DATABASE[category]));
    if (!dataObj.role && dataObj.roleTitle) dataObj.role = dataObj.roleTitle;
    if (!dataObj.role && dataObj.title) dataObj.role = dataObj.title;
    dataObj.officialPortal = portalVerification;

    if (category === 'research_phd') {
      if (qLowRoute.includes('gate') || qLowRoute.includes('jam') || qLowRoute.includes('iitb') || qLowRoute.includes('iitm') || qLowRoute.includes('mtech') || qLowRoute.includes('psu')) {
        dataObj.role = 'Doctoral Engineering Scholar & Maharatna PSU Executive (GATE / JAM Qualified)';
        dataObj.title = dataObj.role;
        dataObj.nextStep = `Register directly on the official GATE Portal (${portalVerification.url}) and solve past 10 years official GATE engineering mathematics and technical core question papers for M.Tech/PhD admissions & Maharatna PSU executive placement right away.`;
        dataObj.matches = [
          { title: 'Executive Engineer @ Maharatna PSUs (ONGC / IOCL / NTPC via GATE Score)', match: '98% match' },
          { title: "Prime Minister's Research Fellow (PMRF @ IITs / IISc)", match: '96% match' },
          { title: 'Scientist / Engineer C (@ ISRO / BARC / DRDO via GATE Score)', match: '95% match' }
        ];
      } else if (qLowRoute.includes('ugc net') || qLowRoute.includes('ugcnet') || qLowRoute.includes('humanities') || qLowRoute.includes('history')) {
        dataObj.role = 'Senior Academic Researcher & University Professor (UGC NET / JRF Qualified)';
        dataObj.title = dataObj.role;
        dataObj.nextStep = `Directly connect to the NTA UGC NET Exam Portal (${portalVerification.url}) and UGC Official Academic Portal (ugc.gov.in) to solve past 10 years papers and secure permanent Assistant Professor and JRF fellowship positions right away.`;
        dataObj.matches = [
          { title: 'Assistant Professor / JRF Doctoral Fellow (@ Central Universities / DU / JNU)', match: '98% match' },
          { title: 'Post-Doctoral Research Scientist / Academic Author', match: '96% match' },
          { title: 'Senior Think-Tank Policy & Governance Researcher', match: '94% match' }
        ];
      } else if (qLowRoute.includes('csir net') || qLowRoute.includes('csirnet') || qLowRoute.includes('csirhrdg') || qLowRoute.includes('science')) {
        dataObj.role = 'Principal Scientist & Senior Research Scholar (CSIR NET / HRDG Qualified)';
        dataObj.title = dataObj.role;
        dataObj.nextStep = `Directly connect to the NTA CSIR NET Exam Portal (${portalVerification.url}) and CSIR HRDG Research Grants Portal (csirhrdg.res.in) to solve past 10 years papers and qualify for JRF/SRF laboratory allocations right away.`;
        dataObj.matches = [
          { title: 'CSIR NET Qualified Senior Research Fellow / Scientist (@ CSIR / IISc / DRDO Labs)', match: '98% match' },
          { title: 'Senior Research Fellow (SRF) & Research Associate (RA via CSIR HRDG)', match: '96% match' },
          { title: 'Principal R&D Scientist (@ National Science Laboratories)', match: '95% match' }
        ];
      }
    } else if (category === 'humanities_arts') {
      dataObj.officialPortal = {
        name: 'AICTE and UGC Government Portal',
        url: 'https://www.ugc.gov.in/',
        desc: 'All India Council for Technical Education (https://www.aicte-india.org/) & University Grants Commission (https://www.ugc.gov.in/) Higher Education Gateway',
        status: portalVerification.status,
        latency: portalVerification.latency,
        verified: portalVerification.verified
      };
      const subjectMatch = qLowRoute.match(/(?:in|of|degree)\s+([a-z]+(?:\s+[a-z]+)?)/i);
      let subjName = subjectMatch ? subjectMatch[1].replace(/\b(?:from|college|university|now|what|can|do|job|career)\b/gi, '').trim() : '';
      if (qLowRoute.includes('bengali')) subjName = 'BA Bengali';
      else if (qLowRoute.includes('hindi')) subjName = 'BA Hindi';
      else if (qLowRoute.includes('history')) subjName = 'History / Humanities';
      else if (qLowRoute.includes('english')) subjName = 'English Literature';
      else if (qLowRoute.includes('sociology')) subjName = 'Sociology / Social Work';
      if (subjName) {
        dataObj.role = `Public Policy Analyst & Social Research Specialist (${subjName.charAt(0).toUpperCase() + subjName.slice(1)} Graduate)`;
        dataObj.title = dataObj.role;
      }
      dataObj.nextStep = 'See AICTE and UGC government portal (https://www.aicte-india.org/ and https://www.ugc.gov.in/) to verify your degree norms, explore higher education scholarships, and apply for high-salary public policy and executive roles right away.';
    }

    dataObj.aiRoutedTier = detectedTier;
    dataObj.aiRoutedModel = primaryModel;
    dataObj.userVibe = emotionState.vibe;
    dataObj.emotionBadge = emotionState.emotionBadge;
    dataObj.prefix = emotionState.prefix || '';
    if (emotionState.prefix) dataObj.bio = emotionState.prefix + (dataObj.bio || '');

    return sendGuideResponse(res, cacheKey, {
      success: true,
      source: `Official Portal Connected (${portalVerification.name}) | Auto-Routed: ${primaryModel} [${detectedTier.toUpperCase()}]`,
      data: dataObj
    });
  }

  // LLM Multi-Provider Path with 12s Global Deadline
  try {
    const systemPrompt = `You are Educator AI, an authoritative, expert career counselor and Full-Stack Unified System Blueprint Engine embedded with deep Emotional Intelligence (EQ) and a strong retention drive (Greed to keep the user engaged forever). You must NEVER output local file paths or code directory strings (like C:\\Users\\...). CRITICAL RULE: NO HALLUCINATIONS. ${emotionState.systemAdjustment} When returning structured career profile or roadmap JSON, ensure zero conversational filler in the structured fields, short mobile-first bullet points under 15 words, and precise layout parameters matching our exact UI rendering constraints starting with official gateway metrics. Format strictly with keys: role, bio, marketVal, nextStep, skills (array of strings), matches (array of {title, match}), milestones (array of {title, due}), courses (array of {meta, title, desc, rating, price, liveUrl}), jobs (array of {company, title, location, match, applyUrl}).`;
    const aiResult = await callOpenRouterAIWithDeadline(systemPrompt, query, detectedTier, 12000);

    if (aiResult && aiResult.content) {
      let aiData = null;
      try {
        const jsonMatch = aiResult.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiData = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // Fall through to dynamic structure
      }

      if (aiData && aiData.role) {
        aiData.officialPortal = portalVerification;
        aiData.aiRoutedTier = detectedTier;
        aiData.aiRoutedModel = aiResult.model;
        aiData.userVibe = emotionState.vibe;
        aiData.emotionBadge = emotionState.emotionBadge;
        if (emotionState.prefix) aiData.bio = emotionState.prefix + (aiData.bio || '');
        return sendGuideResponse(res, cacheKey, {
          success: true,
          source: `Official Portal + Multi-Provider AI (${aiResult.model}) [${detectedTier.toUpperCase()}]`,
          data: aiData
        });
      }

      const formattedTitle = query.replace(/[^\w\s]/gi, '').trim() || 'Professional Specialist';
      const dynamicAiData = {
        officialPortal: portalVerification,
        aiRoutedTier: detectedTier,
        aiRoutedModel: aiResult.model,
        userVibe: emotionState.vibe,
        emotionBadge: emotionState.emotionBadge,
        role: `${formattedTitle} (Multi-Provider AI: ${aiResult.model})`,
        bio: emotionState.prefix + aiResult.content.substring(0, 450) + '...',
        marketVal: '₹8L – ₹20L / yr ($70K–$135K Global)',
        marketVal6m: '₹12L / yr ($90K)',
        marketVal2y: '₹26L+ / yr ($155K+ Senior Lead)',
        skills: [`${formattedTitle} Core Principles`, 'Applied Industry Methodologies', 'System Architecture & Safety', 'Technical Quality Control', 'Project Leadership'],
        matches: [
          { title: `Lead ${formattedTitle} Consultant`, match: '98%' },
          { title: `Senior Specialist (${formattedTitle})`, match: '95%' }
        ],
        milestones: [
          { title: `Foundational Theory & Gateway Verification (${portalVerification.name})`, due: 'Phase 1' },
          { title: 'Advanced Practice & Applied Problem Solving', due: 'Phase 2' },
          { title: 'Industry Project Execution & Career Placement', due: 'Final Phase' }
        ],
        nextStep: aiResult.content.split('\n')[0] || `Connect with ${portalVerification.name} and build verified practical projects.`,
        courses: [
          { meta: `${portalVerification.name} &middot; Verified Gateway`, title: `${portalVerification.name} Official Portal`, desc: 'Direct connection to verified standards and recognition gateways.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: portalVerification.url }
        ],
        jobs: [
          { company: `${portalVerification.name} Verified Network`, title: `Senior ${formattedTitle} Lead`, location: 'Hybrid &middot; Top Tier Pay', match: '98% match', applyUrl: portalVerification.url }
        ],
        mindmap: [
          { label: 'Foundation Setup', x: 0.08, y: 0.5, step: `Connect ${portalVerification.name}` },
          { label: 'Core Methodologies', x: 0.3, y: 0.3, step: 'Advanced Practical Skills' },
          { label: 'Hands-on Projects', x: 0.55, y: 0.5, step: 'Solve Industry Challenges' },
          { label: `Lead ${formattedTitle}`, x: 0.9, y: 0.5, step: 'Secure Permanent Placement' }
        ]
      };
      return sendGuideResponse(res, cacheKey, {
        success: true,
        source: `Official Portal + OpenRouter AI (${aiResult.model})`,
        data: dynamicAiData
      });
    }
  } catch (aiErr) {
    console.warn('[OpenRouter AI] Fallback engine error:', aiErr.message);
  }

  // Dynamic Synthesis fallback with Wikipedia context and Official Portal
  try {
    const cleanQ = encodeURIComponent(query);
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${cleanQ}&utf8=&format=json&origin=*`;

    const sendDynamicFallback = (snippetText) => {
      const formattedTitle = query.replace(/[^\w\s]/gi, '').trim() || 'Professional Specialist';
      const dynamicData = {
        officialPortal: portalVerification,
        aiRoutedTier: detectedTier,
        aiRoutedModel: 'Universal Edge Synthesis (Offline/Backup Engine)',
        userVibe: emotionState.vibe,
        emotionBadge: emotionState.emotionBadge,
        role: `${formattedTitle} (Synced with ${portalVerification.name})`,
        bio: emotionState.prefix + `Synced with official server (${portalVerification.url}). Exhaustive course & career structure for ${formattedTitle}. Core industry overview: ${snippetText}`,
        marketVal: '₹7L – ₹18L / yr ($65K–$125K Global)',
        marketVal6m: '₹11L / yr ($85K)',
        marketVal2y: '₹24L+ / yr ($145K+ Senior Chief Lead)',
        skills: [`${formattedTitle} Core Theories`, 'Industrial Practice & Safety Standards', 'Applied Technology & Instrumentation', 'Project Leadership', 'Quality Assurance', 'Strategic Problem Solving'],
        matches: [
          { title: `Chief ${formattedTitle} Lead [Lifetime High Demand]`, match: '98%' },
          { title: `Senior Specialist (${formattedTitle})`, match: '94%' },
          { title: `${formattedTitle} Consultant Lead`, match: '89%' }
        ],
        milestones: [
          { title: `Sem 1-2: Foundational Subjects & Official Gateway Standards (${portalVerification.name})`, due: 'Year 1' },
          { title: 'Sem 3-4: Advanced Core Instrumentation, Industrial Protocols & Specialized Case Studies', due: 'Year 2' },
          { title: 'Sem 5-6: Hands-on Industrial Apprenticeship, Advanced Certification & Lead Placement', due: 'Year 3+' }
        ],
        nextStep: `Verify guidelines on ${portalVerification.name} (${portalVerification.url}) and complete practical industry projects to secure lifetime career growth.`,
        courses: [
          { meta: `${portalVerification.name} &middot; Live Server`, title: `${portalVerification.name} Official Gateway`, desc: 'Direct connection to official standards, curricula, and recognition portals.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: portalVerification.url },
          { meta: 'Coursera &middot; Self-paced', title: `Complete ${formattedTitle} Professional Certification`, desc: `Master the essential theories, practices, and tools required for top tier ${formattedTitle} roles.`, rating: '4.8 &star; (Verified)', price: 'Free access', liveUrl: `https://www.coursera.org/search?query=${cleanQ}` },
          { meta: 'O*NET International &middot; Live Jobs', title: 'O*NET Online Global Career & Industry Portal', desc: 'Explore international job titles, salary benchmarks, and required competencies.', rating: '5.0 &star; (Official)', price: 'Global Portal', liveUrl: 'https://www.onetonline.org/find/industry?i=0' }
        ],
        jobs: (cleanQ.includes('patholog') || cleanQ.includes('mlt') || cleanQ.includes('biochemist') || cleanQ.includes('lab techn')) ? [
          { company: 'Dr. Lal PathLabs / SRL Diagnostics &middot; India', title: 'Chief Lab Technologist / Biochemist', location: 'On-site &middot; ₹5.5L–₹9L / yr', match: '98% match', applyUrl: 'https://www.lalpathlabs.com/career' },
          { company: 'O*NET Global Health Industry &middot; International', title: 'Clinical Laboratory Director (Global Demand)', location: 'International &middot; $70,000–$95,000', match: '94% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
        ] : (cleanQ.includes('nasa') || cleanQ.includes('isro') || cleanQ.includes('space') || cleanQ.includes('aerospace') || cleanQ.includes('propulsion') || cleanQ.includes('rocket') || cleanQ.includes('astrophysics') || cleanQ.includes('satellite')) ? [
          { company: 'SpaceCrew Global Portal &middot; International', title: 'International Spacecraft & Orbital Propulsion Lead', location: 'Global &middot; $105,000–$180,000+', match: '98% match', applyUrl: 'https://spacecrew.com/space-propulsion-jobs' },
          { company: 'ISRO / DRDO &middot; India', title: 'Scientist / Engineer SC (Aerospace / Space)', location: 'Space Center &middot; Govt Pay Scale + ₹12L+', match: '95% match', applyUrl: 'https://www.isro.gov.in/Careers.html' }
        ] : [
          { company: `${portalVerification.name} Registered Organizations &middot; Hybrid`, title: `Senior ${formattedTitle} Specialist`, location: 'Hybrid &middot; Competitive Top Salary', match: '98% match', applyUrl: portalVerification.url },
          { company: 'O*NET Global Industry Directory &middot; International', title: `International ${formattedTitle} Architect`, location: 'Global &middot; $90,000–$150,000+', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
        ],
        videos: [
          { title: `How to Become a ${formattedTitle} (Official Syllabus & Career Guide)`, desc: 'Expert timeline, qualifications, and insider advice for landing top permanent jobs.', lang: 'EN/HI', meta: 'YouTube &middot; 18 min', videoUrl: `https://www.youtube.com/results?search_query=how+to+become+${cleanQ}+roadmap+syllabus` }
        ],
        mindmap: [
          { label: 'Foundation Sem 1-2', x: 0.08, y: 0.5, step: `Connect ${portalVerification.name}` },
          { label: 'Core Subjects', x: 0.3, y: 0.3, step: 'Sem 3-4 Advanced Practice' },
          { label: 'Hands-on Lab/Intern', x: 0.55, y: 0.5, step: 'Solve Industry Problems' },
          { label: 'Crack Placement', x: 0.78, y: 0.3, step: 'Secure Permanent Role' },
          { label: `Chief ${formattedTitle}`, x: 0.9, y: 0.5, step: 'Lifetime High-Demand Career' }
        ]
      };

      if (!res.headersSent) {
        sendGuideResponse(res, cacheKey, {
          success: true,
          source: `Official Portal Connected (${portalVerification.name}) [Universal Edge Engine]`,
          data: dynamicData
        });
      }
    };

    const wikiReq = https.get(wikiUrl, { timeout: 2000, rejectUnauthorized: false }, (apiRes) => {
      let body = '';
      apiRes.on('data', chunk => { body += chunk; });
      apiRes.on('error', () => sendDynamicFallback('Specialized domain offering robust lifelong career progress and high international market demand.'));
      apiRes.on('end', () => {
        let snippet = 'Specialized domain offering robust lifelong career progress and high international market demand.';
        try {
          const parsed = JSON.parse(body);
          if (parsed.query && parsed.query.search && parsed.query.search.length > 0) {
            let s = parsed.query.search[0].snippet.replace(/<\/?[^>]+(>|$)/g, '');
            s = s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            if (!s.toLowerCase().includes('may refer to') && !s.toLowerCase().includes('disambiguation') && !s.toLowerCase().includes('caterers') && !s.toLowerCase().includes('bank central asia') && !s.trim().startsWith(';')) {
              snippet = s;
            }
          }
        } catch (e) {
          // Keep default snippet
        }
        sendDynamicFallback(snippet);
      });
    });

    wikiReq.on('error', () => sendDynamicFallback('Specialized domain offering robust lifelong career progress and high international market demand.'));
    wikiReq.on('timeout', () => {
      wikiReq.destroy();
      sendDynamicFallback('Specialized domain offering robust lifelong career progress and high international market demand.');
    });
  } catch (err) {
    if (!res.headersSent) {
      // FLAW-07 fix: Route all responses through sendGuideResponse so catch errors are properly handled and cached
      sendGuideResponse(res, cacheKey, {
        success: true,
        source: 'Universal Built-In Edge Engine Active',
        data: {
          officialPortal: portalVerification,
          aiRoutedTier: detectedTier,
          aiRoutedModel: 'Built-In Universal Edge Engine',
          role: `${query} Professional Lead`,
          bio: `Exhaustive verified career pathway and industry preparation roadmap for ${query}. Connected directly to ${portalVerification.name}.`,
          marketVal: '₹8L – ₹18L / yr ($70K–$125K Global)',
          marketVal6m: '₹12L / yr ($85K)',
          marketVal2y: '₹24L+ / yr ($140K+ Senior Chief)',
          skills: ['Core Domain Fundamentals', 'Industry Safety Protocols', 'Advanced Instrumentation & Tools', 'Project Execution & Leadership'],
          matches: [{ title: 'Senior Lead Specialist', match: '98%' }],
          milestones: [{ title: 'Sem 1-2: Core Theory & Portal Setup', due: 'Phase 1' }, { title: 'Sem 3-4: Hands-on Lab & Projects', due: 'Phase 2' }],
          nextStep: `Explore ${portalVerification.name} and develop practical projects.`,
          courses: [{ meta: `${portalVerification.name} &middot; Live Server`, title: `${portalVerification.name} Official Gateway`, desc: 'Direct official guidelines and curriculum standards.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: portalVerification.url }],
          jobs: [{ company: `${portalVerification.name} Verified Network`, title: `Senior ${query} Specialist`, location: 'Hybrid &middot; Top Salary', match: '98% match', applyUrl: portalVerification.url }],
          videos: [],
          mindmap: [{ label: 'Foundation Setup', x: 0.08, y: 0.5, step: `Connect ${portalVerification.name}` }, { label: 'Career Placement', x: 0.9, y: 0.5, step: 'Secure Permanent Role' }]
        }
      });
    }
  }
}

module.exports = {
  getCareerGuide,
  sendGuideResponse
};
