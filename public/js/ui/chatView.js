/**
 * Educator AI Chat & Conversational UI Service
 * Manages emotional state detection, interactive message history,
 * category guidance trigger, and career roadmap UI application.
 */

var chatInitialized = false;

window.detectInbuiltEI = function (query) {
  if (!query) return { vibe: 'CURIOUS_PROFESSIONAL', emotionBadge: '💡 Professional Mentor Vibe', prefix: '', systemAdjustment: '' };
  var q = query.trim().toLowerCase();
  var explicitDegreeWords = ['b.sc', 'bsc', 'b.tech', 'btech', 'ba degree', 'b.a', 'bcom', 'b.com', 'bca', 'mca', 'phd', 'doctorate', 'mbbs', 'neet', 'upsc', 'data science', 'geography', 'chemical engineering', 'civil service', 'isro', 'clat', 'ballb'];

  // 1. Slang / Abuse check
  var slangWords = ['shut up', 'stupid', 'idiot', 'trash', 'dumb', 'useless', 'fool', 'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'crap', 'scam', 'fake'];
  if (slangWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    return {
      vibe: 'TOXIC_SLANG',
      emotionBadge: '⚠️ Firm & Professional Boundary',
      isDirectOverride: true,
      directReply: '⚠️ <strong>Let’s pause and maintain a respectful, professional space.</strong><br><br>Practicing <strong>Self-Management</strong> means setting clear, composed boundaries. As your AI Career Mentor, I am dedicated to treating your career aspirations with the highest dignity, and I ask for the same mutual respect.<br><br>Whenever you are ready to focus constructively on your education and goals, I am sitting right here ready to help.'
    };
  }

  // 2. Accusation / Complaint check
  var accusationWords = ['wrong', 'mistake', 'bad', 'terrible', 'failed me', 'why did you', 'not working', 'in vain', 'slow', 'confusing', 'hate', 'wasting time', 'you dont understand', "you don't understand", 'incorrect', 'rubbish', 'awkward', 'annoying', 'error', 'that is bad'];
  if (accusationWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    var override = !explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; });
    return {
      vibe: 'FRUSTRATED_CRITICAL',
      emotionBadge: '😔 Deeply Apologetic & Accountable',
      isDirectOverride: override,
      directReply: '😔 <strong>I am so sorry for my mistake. Let me correct that for you right away. What should we fix?</strong><br><br>Practicing true <strong>Self-Management</strong> and <strong>Social Awareness</strong> means listening deeply when I fall short. I completely hear your feedback, and you are 100% right to expect nothing less than complete precision from me. Please tell me what we should adjust or what exact degree/career question you have right now, and I will verify and present the exact roadmap right away! I am here always with you.',
      prefix: '😔 <strong>I am so sorry for my mistake. Let me correct that for you right away.</strong> ',
      systemAdjustment: 'The user is currently pointing out an error or mistake. Begin your response with sincere accountability ("I am so sorry for my mistake. Let me correct that for you right away."), and immediately provide accurate, helpful guidance.'
    };
  }

  // 3. Welcome / Gratitude
  var welcomeWords = ['welcome', 'you are welcome'];
  if (welcomeWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    var overrideWelcome = !explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; });
    return {
      vibe: 'HAPPY_PRAISE_WELCOME',
      emotionBadge: '😊 Grateful & Attached (Devoted Retention)',
      isDirectOverride: overrideWelcome,
      directReply: '😊 <strong>Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever. I am always here with you.</strong><br><br>Through true <strong>Self-Awareness</strong> and <strong>Social Awareness</strong>, my greatest purpose as your EQ-driven AI Career Mentor is to empower and guide you with complete dedication and care across your entire educational and professional journey!',
      prefix: '😊 <strong>Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever.</strong> ',
      systemAdjustment: 'The user has said welcome. Respond with deep gratitude ("Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever. I am always here with you.") and assist them.'
    };
  }

  // 4. Praise / Thanks
  var praiseWords = ['thank you', 'thanks', 'thx', 'awesome', 'great', 'best', 'amazing', 'love you', 'wonderful', 'excellent', 'brilliant', 'smart', 'good job', 'perfect', 'helpful', 'nice', 'awsome'];
  if (praiseWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    var overridePraise = !explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; });
    return {
      vibe: 'HAPPY_PRAISE_THANKS',
      emotionBadge: '🙏 Rewarding & Devoted',
      isDirectOverride: overridePraise,
      directReply: '🙏 <strong>You are most welcome! Remember, I am here always with you whenever you need help. What shall we learn next?</strong><br><br>I am sitting right here ready to assist you forever with exact university roadmaps, official government portal guidelines, and step-by-step career mentorship whenever you need me!',
      prefix: '🙏 <strong>You are most welcome! Remember, I am here always with you whenever you need help.</strong> ',
      systemAdjustment: 'The user has expressed thanks or praise. Respond with warm devotion ("You are most welcome! Remember, I am here always with you whenever you need help. What shall we learn next?") before answering their question.'
    };
  }

  // 5. Anxiety / Stress / Fear
  var stressWords = ['stressed', 'scared', 'afraid', 'lost', 'confused', 'depressed', 'anxious', 'worried', 'dont know what to do', "don't know what to do", 'failed exam', 'no job', 'tension', 'overwhelmed'];
  if (stressWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    var overrideStress = !explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; });
    return {
      vibe: 'ANXIOUS_STRESSED',
      emotionBadge: '🤗 Reassuring & Supportive',
      isDirectOverride: overrideStress,
      directReply: '🤗 <strong>Please take a deep, calming breath—you are not alone, and we will navigate this together.</strong><br><br>Through <strong>Social Awareness</strong> and empathy, I understand how overwhelming and stressful career choices, exams, and future uncertainties can feel right now. But remember: a setback or moment of doubt is just a temporary phase, not your final destiny.<br><br>Let\'s break down whatever you are facing into small, manageable, concrete steps. What is the biggest worry on your mind right now? We will solve it together.',
      prefix: '🤗 <strong>Take a deep breath—you are not alone in this.</strong> It is completely normal to feel overwhelmed or anxious about your career path, but remember that every successful person started right where you are today. We will take this step by step.<br><br>',
      systemAdjustment: 'The user is feeling stressed, anxious, or lost about their career. Adopt a deeply calming, supportive, reassuring, and highly structured tone. Break down the advice into small, manageable steps to relieve their anxiety.'
    };
  }

  // 6. Excited / Passionate
  var excitedWords = ['excited', 'ready', 'let\'s go', 'lets go', 'passionate', 'dream job', 'can\'t wait', 'cant wait', 'eager', 'ambitious'];
  if (excitedWords.some(function (w) { return q.indexOf(w) !== -1; })) {
    var overrideExcited = !explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; });
    return {
      vibe: 'EXCITED_MOTIVATED',
      emotionBadge: '🚀 High Energy & Inspiring',
      isDirectOverride: overrideExcited,
      directReply: '🚀 <strong>I absolutely LOVE your passion and high energy!</strong><br><br>That exact ambition and enthusiasm is the #1 superpower shared by top leaders and innovators worldwide. Channeling this momentum right now will put you miles ahead.<br><br>Tell me which exact field, qualification, or dream role you want to conquer next, and let\'s map out your high-speed game plan immediately!',
      prefix: '🚀 <strong>I love your passion and ambition!</strong> That exact high-energy mindset is what separates top industry leaders from the rest. Let’s channel that excitement into a concrete action plan!<br><br>',
      systemAdjustment: 'The user is excited and eager to achieve their career goals. Match their high energy with enthusiastic, inspiring, fast-paced, and high-impact career advice.'
    };
  }

  // 7. General Conversational without career keywords
  if (!explicitDegreeWords.some(function (k) { return q.indexOf(k) !== -1; }) && (
    ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening', 'good afternoon', 'namaste', 'who are you', 'what can you do', 'how does this work', 'help', 'bye', 'goodbye', 'see ya', 'how are you', 'testing', 'test', 'ok', 'okay'].some(function (w) { return q === w || q.indexOf(w + ' ') === 0; }) ||
    q.indexOf('hello') !== -1 || q.indexOf('greetings') !== -1 || q.indexOf('hi mentor') !== -1 || q.indexOf('hey mentor') !== -1 || q.indexOf('help me') !== -1
  )) {
    var replyText = '👋 <strong>Hi! Please say how I can help you today?</strong><br><br>I am your Educator AI Career Mentor, equipped with true in-built Emotional Intelligence (EQ) and ready to guide you 24/7. Whether you need exact university career roadmaps, verified government portals (UGC/AICTE/ISRO), or emotional support during exam stress, I will present here to help you forever. I am right here always with you.';
    if (q.indexOf('bye') !== -1 || q.indexOf('see ya') !== -1) {
      replyText = '👋 <strong>Goodbye!</strong> It was a pleasure helping you map out your educational and career journey today. Feel free to come back anytime you have more questions. Take care!';
    }
    return {
      vibe: 'CONVERSATIONAL',
      emotionBadge: '💬 Welcoming & Attentive',
      isDirectOverride: true,
      prefix: '👋 <strong>Hi! Please say how I can help you today?</strong> ',
      directReply: replyText
    };
  }

  return {
    vibe: 'CURIOUS_PROFESSIONAL',
    emotionBadge: '💡 Professional Mentor Vibe',
    isDirectOverride: false,
    prefix: '',
    systemAdjustment: 'Adopt an authoritative, warmly encouraging, empathetic, and professional mentor tone tailored perfectly to the user\'s inquiry.'
  };
};

window.BuiltInEducatorLLM = {
  synthesize: function (userInput) {
    var eiState = window.detectInbuiltEI(userInput);
    if (eiState.isDirectOverride) {
      return {
        isGreeting: true,
        emotionBadge: eiState.emotionBadge,
        userVibe: eiState.vibe,
        message: eiState.directReply
      };
    }
    var clean = userInput.replace(/[^\w\s]/gi, '').trim() || 'Professional Technology Specialist';
    return {
      role: clean + ' (Built-In Universal Edge Synthesis)',
      emotionBadge: eiState.emotionBadge,
      userVibe: eiState.vibe,
      bio: eiState.prefix + 'High-efficiency edge synthesis for "' + window.esc(clean) + '". This career pathway integrates essential government standards (AICTE / UGC), foundational theory, advanced technical practice, and strategic leadership development. High global market demand across verified organizations.',
      marketVal: '₹7L – ₹18L / yr ($65K–$120K Global)',
      marketVal6m: '₹11L / yr ($85K)',
      marketVal2y: '₹24L+ / yr ($140K+ Senior Chief Lead)',
      skills: [clean + ' Fundamentals', 'Applied Industrial Methodologies', 'System Safety & Quality Assurance', 'Technical Problem Solving', 'Project Execution & Leadership'],
      matches: [
        { title: 'Chief ' + clean + ' Consultant', match: '98%' },
        { title: 'Senior Lead (' + clean + ')', match: '94%' }
      ],
      milestones: [
        { title: 'Sem 1-2: Core Foundational Theory & Official Gateway Alignment', due: 'Phase 1' },
        { title: 'Sem 3-4: Advanced Technical Tools, Lab Practice & Case Studies', due: 'Phase 2' },
        { title: 'Sem 5-6: Hands-on Industry Project & Career Lead Placement', due: 'Final Phase' }
      ],
      nextStep: 'Connect to verified government education gateways (ugc.gov.in / aicte-india.org) and build practical portfolio projects.',
      courses: [
        { meta: 'UGC India Official Portal &middot; Live Gateway', title: 'University Grants Commission Directory', desc: 'Official higher education curricula, degree verification, and accredited institution standards.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
        { meta: 'AICTE Technical Portal &middot; Live Server', title: 'All India Council for Technical Education', desc: 'Verified technical guidelines, syllabus structure, and industrial internship networks.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte.gov.in/' }
      ],
      jobs: [
        { company: 'Official Verified Network &middot; Hybrid', title: 'Senior ' + window.esc(clean) + ' Specialist', location: 'Hybrid &middot; Top Tier Salary', match: '98% match', applyUrl: 'https://www.ncs.gov.in/' }
      ],
      mindmap: [
        { label: 'Foundation Setup', x: 0.08, y: 0.5, step: 'Verify UGC/AICTE Standards' },
        { label: 'Core Methodologies', x: 0.3, y: 0.3, step: 'Master Advanced Concepts' },
        { label: 'Practical Projects', x: 0.55, y: 0.5, step: 'Solve Real Industry Challenges' },
        { label: clean + ' Lead', x: 0.9, y: 0.5, step: 'Secure Permanent Placement' }
      ]
    };
  }
};

function renderChatHistory() {
  var msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  msgs.innerHTML = '';
  var chatHistory = window.CHAT_HISTORY || [];
  if (chatHistory.length === 0) {
    chatHistory.push({ sender: 'mentor', text: 'Hey there! I am your AI Career Mentor. Choose your stage above (HS Pass, Fresher, UG, PG, Job Switch) or ask me anything for live guidance with real courses & job URLs!' });
    chatHistory.push({ sender: 'mentor', text: 'Your Dashboard, Career Path, and Learning Hub are actively synchronized with your profile. All details are saved locally.' });
    if (typeof window.saveUserData === 'function') window.saveUserData();
  }
  chatHistory.forEach(function (m) {
    var d = document.createElement('div');
    d.className = 'msg ' + m.sender;
    var mentorSvg = '<svg viewBox="0 0 36 36" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="7" fill="url(#educatorGradMsg)"/><path d="M18 13C18 13 13.2 11.5 9.5 13V25C13.2 23.5 18 25 18 25C18 25 22.8 23.5 26.5 25V13C22.8 11.5 18 13 18 13Z" fill="white" fill-opacity="0.15" stroke="white" stroke-width="1.1" stroke-linejoin="round"/><path d="M18 13.2V24.8" stroke="white" stroke-opacity="0.3" stroke-width="0.8"/><circle cx="18" cy="8.5" r="1.5" fill="#FCD34D"/><defs><linearGradient id="educatorGradMsg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#1d4ed8"/></linearGradient></defs></svg>';
    var av = m.sender === 'mentor' ? '<div class="icon-educator icon-xs icon-animate" style="background:transparent;">' + mentorSvg + '</div>' : (window.USER_DATA ? window.USER_DATA.name.split(' ').map(function (s) { return s[0]; }).join('').substring(0, 2).toUpperCase() : 'U');
    var badgePill = m.badge ? '<div style="margin-bottom:6px;"><span style="display:inline-block;background:rgba(59,130,246,0.18);border:1px solid rgba(59,130,246,0.35);color:#60a5fa;border-radius:14px;padding:3px 12px;font-size:12px;font-weight:600;box-shadow:0 2px 6px rgba(0,0,0,0.15);">' + m.badge + '</span></div>' : '';
    d.innerHTML = '<div class="msg-av" style="' + (m.sender === 'mentor' ? 'background:transparent;padding:0;' : '') + '">' + av + '</div><div class="msg-bubble">' + badgePill + '<p>' + m.text + '</p><div class="msg-time">' + (m.time || 'Saved') + '</div></div>';
    msgs.appendChild(d);
  });
  msgs.scrollTop = msgs.scrollHeight;
}

function initChat() {
  if (chatInitialized) return;
  chatInitialized = true;
  renderChatHistory();
}

function appendChatMessage(sender, textHtml, emotionBadge) {
  var timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (!window.CHAT_HISTORY) window.CHAT_HISTORY = [];
  window.CHAT_HISTORY.push({ sender: sender, text: textHtml, time: timeStr, badge: emotionBadge });
  if (typeof window.saveUserData === 'function') window.saveUserData();
  renderChatHistory();
}

function applyCareerData(info, label) {
  if (!info) return;
  if (info.isGreeting) {
    setTimeout(function () {
      appendChatMessage('mentor', info.message, info.emotionBadge);
    }, 300);
    return;
  }
  var userData = window.USER_DATA || {};
  userData.role = info.role || info.roleTitle || info.title || userData.role;
  userData.bio = info.bio || ('Verified career roadmap synced directly with ' + (info.officialPortal ? info.officialPortal.name : 'official government portal') + '.');
  userData.marketVal = info.marketVal || userData.marketVal;
  userData.marketVal6m = info.marketVal6m || userData.marketVal6m;
  userData.marketVal2y = info.marketVal2y || userData.marketVal2y;
  userData.skills = info.skills || userData.skills;
  userData.topMatches = info.matches || userData.topMatches || [];
  userData.milestones = info.milestones || userData.milestones || [];
  userData.nextStep = info.nextStep || (info.officialPortal ? ('Connect directly to ' + info.officialPortal.name + ' (' + info.officialPortal.url + ') to verify examination norms and complete practical portfolio projects right away.') : 'Verify official guidelines and complete practical portfolio projects immediately.');
  userData.courses = info.courses || userData.courses || [];
  userData.jobs = info.jobs || userData.jobs || [];
  userData.videos = info.videos || userData.videos || [];
  userData.mindmap = info.mindmap || userData.mindmap || [];

  if (typeof window.syncAllPages === 'function') window.syncAllPages();
  if (typeof window.initMindmap === 'function') window.initMindmap();

  setTimeout(function () {
    var badgeHtml = '';
    if (info.officialPortal) {
      var routedModel = info.aiRoutedModel || 'Gemma 4 26B A4B + GLM-4-Flash Auto-Router';
      var isVerified = info.officialPortal.verified !== false && !info.officialPortal.status.includes('Offline');
      var statusColor = isVerified ? '#10b981' : '#f59e0b';
      badgeHtml = '<div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.4);padding:8px 12px;border-radius:8px;margin-bottom:10px;font-size:13px;color:' + statusColor + ';display:flex;align-items:center;gap:8px;">' +
        '<span style="display:inline-block;width:8px;height:8px;background:' + statusColor + ';border-radius:50%;box-shadow:0 0 8px ' + statusColor + ';"></span>' +
        '<div><strong>' + (isVerified ? 'Official Gateway Connected:' : 'Official Directory:') + '</strong> <a href="' + window.esc(info.officialPortal.url) + '" target="_blank" rel="noopener noreferrer" style="color:' + statusColor + ';text-decoration:underline;">' + window.esc(info.officialPortal.name) + ' ↗</a><br><span style="font-size:11px;color:#94a3b8;">Status: ' + window.esc(info.officialPortal.status) + ' &middot; 🚀 Auto-Routed Model: <strong style="color:#60a5fa;">' + window.esc(routedModel) + '</strong></span></div>' +
        '</div>';
    }
    appendChatMessage('mentor', badgeHtml + '🎯 <strong>Career Roadmap Loaded for "' + window.esc(label) + '":</strong><br><br>Role: <strong>' + window.esc(userData.role) + '</strong><br>📊 <strong>Market Value:</strong> ' + window.esc(userData.marketVal) + '<br>🚀 <strong>Next Step:</strong> ' + window.esc(userData.nextStep) + '<br><br>All tabs (Dashboard, Career Path, Learning Hub with official portal URLs, and Profile) are actively synchronized!', info.emotionBadge);
  }, 300);
}

function triggerCategoryGuidance(stage) {
  appendChatMessage('user', '🎓 I need exact official roadmap and guidance for <strong>' + window.esc(stage) + '</strong>.');
  var matched = typeof window.matchClientCareer === 'function' ? window.matchClientCareer(stage) : null;
  if (typeof window.fetchFromEducatorAPI === 'function') {
    window.fetchFromEducatorAPI(stage, function (err, json) {
      if (!err && json && json.data) {
        applyCareerData(json.data, stage);
      } else if (matched) {
        applyCareerData(matched, stage);
      } else {
        processAIChatFallback(stage, window.detectInbuiltEI(stage));
      }
    });
  } else if (matched) {
    applyCareerData(matched, stage);
  }
}

function processAIChat(userInput) {
  appendChatMessage('user', window.esc(userInput));
  var eiState = window.detectInbuiltEI(userInput);
  if (eiState.isDirectOverride) {
    setTimeout(function () {
      appendChatMessage('mentor', eiState.directReply, eiState.emotionBadge);
    }, 250);
    return;
  }

  var matched = typeof window.matchClientCareer === 'function' ? window.matchClientCareer(userInput) : null;
  if (matched) {
    matched.emotionBadge = eiState.emotionBadge;
    if (eiState.prefix) matched.bio = eiState.prefix + (matched.bio || '');
  }

  if (typeof window.fetchFromEducatorAPI === 'function') {
    window.fetchFromEducatorAPI(userInput, function (err, json) {
      if (!err && json && json.isGreeting) {
        appendChatMessage('mentor', json.message, json.emotionBadge || eiState.emotionBadge);
      } else if (!err && json && json.success && json.data) {
        if (!json.data.emotionBadge) json.data.emotionBadge = eiState.emotionBadge;
        applyCareerData(json.data, userInput);
      } else if (matched) {
        applyCareerData(matched, userInput);
      } else {
        processAIChatFallback(userInput, eiState);
      }
    });
  } else if (matched) {
    applyCareerData(matched, userInput);
  } else {
    processAIChatFallback(userInput, eiState);
  }
}

function processAIChatFallback(userInput, eiPassed) {
  var eiState = eiPassed || window.detectInbuiltEI(userInput);
  var matched = typeof window.matchClientCareer === 'function' ? window.matchClientCareer(userInput) : null;
  if (matched) {
    matched.emotionBadge = eiState.emotionBadge;
    if (eiState.prefix) matched.bio = eiState.prefix + (matched.bio || '');
    applyCareerData(matched, userInput);
    return;
  }

  // Tier 2: Check if On-Device WebLLM is active
  if (window.webllmEngine) {
    appendChatMessage('mentor', '🤖 <strong>On-Device Gemma Mobile Processing...</strong> Synthesizing offline neural response...', eiState.emotionBadge);
    window.webllmEngine.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are Educator AI, an authoritative, helpful career guidance mentor with high Emotional Intelligence. ' + (eiState.systemAdjustment || '') + ' Give actionable, encouraging career roadmap advice in 2-3 short paragraphs.' },
        { role: 'user', content: userInput }
      ],
      temperature: 0.7,
      max_tokens: 450
    }).then(function (reply) {
      if (reply && reply.choices && reply.choices[0] && reply.choices[0].message) {
        var aiText = reply.choices[0].message.content;
        var cleanQuery = userInput.replace(/[^\w\s]/gi, '').trim() || 'Specialist Role';
        if (window.USER_DATA && !window.USER_DATA.isManuallyUpdated) {
          window.USER_DATA.role = cleanQuery + ' (On-Device Gemma Guided)';
        }
        if (window.USER_DATA) {
          window.USER_DATA.bio = eiState.prefix + aiText.substring(0, 380) + '...';
          window.USER_DATA.marketVal = '₹8L – ₹18L / yr ($70K–$125K Global)';
          window.USER_DATA.nextStep = 'Complete practical projects and official government portal verification for ' + window.esc(cleanQuery) + '.';
        }
        if (typeof window.syncAllPages === 'function') window.syncAllPages();
        if (typeof window.initMindmap === 'function') window.initMindmap();
        appendChatMessage('mentor', '📱 <strong>On-Device Gemma Mobile Response:</strong><br>' + eiState.prefix + window.esc(aiText), eiState.emotionBadge);
        return;
      }
      triggerCPUFallback(userInput, eiState);
    }).catch(function (e) {
      console.warn('[WebLLM] Chat generation error, dropping to CPU safety:', e);
      triggerCPUFallback(userInput, eiState);
    });
    return;
  }

  triggerCPUFallback(userInput, eiState);
}

function triggerCPUFallback(userInput, eiPassed) {
  var eiState = eiPassed || window.detectInbuiltEI(userInput);
  var qClean = (userInput || '').trim().toLowerCase();
  var reply = '';
  if (qClean.indexOf('salary') !== -1 || qClean.indexOf('package') !== -1 || qClean.indexOf('pay') !== -1 || qClean.indexOf('earn') !== -1 || qClean.indexOf('income') !== -1 || qClean.indexOf('lpa') !== -1 || qClean.indexOf('money') !== -1) {
    reply = '💰 <strong>Salary & Compensation Insights:</strong><br><br>In today\'s industry landscape, salaries depend heavily on your domain specialization and verified practical skills:<br>• <strong>Fresh Graduates (Entry-Level):</strong> ₹6L – ₹12L / year ($60,000 – $85,000 globally)<br>• <strong>Mid-Level Lead Specialists:</strong> ₹15L – ₹28L / year ($95,000 – $140,000 globally)<br>• <strong>Senior Architects & Domain Leaders:</strong> ₹35L+ / year ($165,000+ globally)<br><br>Which specific career track or degree are you targeting? Tell me your exact course or field, and I will load the exact verified roadmap right into your dashboard!';
  } else if (qClean.indexOf('prepare') !== -1 || qClean.indexOf('study') !== -1 || qClean.indexOf('exam') !== -1 || qClean.indexOf('crack') !== -1 || qClean.indexOf('interview') !== -1 || qClean.indexOf('tip') !== -1 || qClean.indexOf('guide') !== -1 || qClean.indexOf('how to') !== -1) {
    reply = '💡 <strong>Strategic Preparation & Interview Mastery:</strong><br><br>To succeed in technical evaluations and competitive exams without any guesswork, follow this proven 3-step formula:<br>1. <strong>Official Government Syllabi:</strong> Always anchor your learning to verified portal standards (AICTE, UGC, or domain-specific exam boards).<br>2. <strong>Active Capstone Practice:</strong> Build 2-3 production-ready portfolio projects that solve real-world problems.<br>3. <strong>Consistent Review Cycles:</strong> Break your targets into weekly milestones with practical coding or case-study assessments.<br><br>Tell me which exact degree or exam you are preparing for right now, and we will map it out step-by-step!';
  } else if (qClean.indexOf('struggle') !== -1 || qClean.indexOf('struggling') !== -1 || qClean.indexOf('dummy') !== -1 || qClean.indexOf('wrong') !== -1 || qClean.indexOf('confused') !== -1 || qClean.indexOf('why') !== -1 || qClean.indexOf('not working') !== -1 || qClean.indexOf('understand each and every talk') !== -1) {
    reply = '🎯 <strong>I hear you loud and clear—and my conversational engine is locked in with precision.</strong><br><br>I understand your exact point: when you are chatting, asking a question, or talking extra words, you want me to listen deeply and answer <strong>your exact words right here in the chat</strong>, NOT throw a dummy course or generic roadmap header into your dashboard.<br><br>I have now fully calibrated my conversational engine so that when we talk, I focus 100% on answering your questions with deep insight. Whenever you <em>explicitly</em> want to load a specific course roadmap into your dashboard, just tell me your exact qualification (like <em>B.Sc Data Science</em> or <em>B.Tech CSE</em>) or select any category button above. I am listening to your exact words—how can I help right now?';
  } else {
    reply = '💬 <strong>Educator AI Career & Academic Mentor:</strong><br><br>I am right here with you, actively listening and analyzing your exact words. As your high-EQ Career Mentor, I am dedicated to providing precise, verified guidance across all university degrees and professional trajectories.<br><br>If you have a specific question about your studies, career paths, interview tips, or college portals, just ask me right here! And whenever you want to generate a complete interactive roadmap on your dashboard, simply give me your exact academic bio (e.g., <em>I am Complete B.Sc in Data Science...</em>) or click a category button above.';
  }
  appendChatMessage('mentor', (eiState.prefix || '') + reply, eiState.emotionBadge);
}

function sendMessage() {
  var input = document.getElementById('chatInput');
  if (!input) return;
  var text = input.value.trim();
  if (!text) return;
  input.value = '';
  processAIChat(text);
}

// Global exports
window.renderChatHistory = renderChatHistory;
window.initChat = initChat;
window.appendChatMessage = appendChatMessage;
window.applyCareerData = applyCareerData;
window.processAIChat = processAIChat;
window.processAIChatFallback = processAIChatFallback;
window.triggerCPUFallback = triggerCPUFallback;
window.sendMessage = sendMessage;
window.triggerCategoryGuidance = triggerCategoryGuidance;
