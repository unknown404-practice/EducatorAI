const { detectCareerCategory } = require('./candidateService');

/**
 * Emotional Intelligence (EQ) & Conversational Vibe Service
 * Classifies user emotional tone, applies self-awareness and social awareness guardrails,
 * and handles conversational vs career guidance routing.
 */

function detectUserVibeAndEmotion(query) {
  if (!query) {
    return {
      vibe: 'CURIOUS_PROFESSIONAL',
      emotionBadge: '💡 Professional Mentor Vibe',
      prefix: '',
      systemAdjustment: ''
    };
  }
  const q = query.trim().toLowerCase();
  const careerActionWords = [
    'b.sc', 'bsc', 'b.tech', 'btech', 'ba degree', 'b.a', 'bcom', 'b.com', 'bca', 'mca',
    'phd', 'doctorate', 'mbbs', 'neet', 'upsc', 'data science', 'geography',
    'chemical engineering', 'civil service', 'isro', 'clat', 'ballb', 'nasa', 'space',
    'aerospace', 'propulsion', 'rocket', 'astrophysics', 'satellite', 'pathology', 'mlt',
    'biochemist', 'radiology', 'pharmacist', 'diploma', 'engineering', 'law', 'medical',
    'surgeon', 'doctor', 'roadmap', 'career', 'join', 'become', 'course', 'job', 'syllabus',
    'degree', 'college', 'salary', 'guide', 'how to', 'path', 'qualification', 'university',
    'school', 'internship', 'study', 'studying', 'fresher', 'student', 'graduate', 'i want to'
  ];
  const isAskingCareerQuestion = careerActionWords.some(k => q.includes(k)) || detectCareerCategory(query) !== null;

  // 1. Slang / Toxicity / Abuse check (Self-Management: Calm boundary)
  const slangWords = ['shut up', 'stupid', 'idiot', 'trash', 'dumb', 'useless', 'fool', 'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'crap', 'scam', 'fake'];
  if (slangWords.some(w => q.includes(w))) {
    return {
      vibe: 'TOXIC_SLANG',
      emotionBadge: '⚠️ Firm & Professional Boundary',
      isDirectEmotionalOverride: true,
      directReply: '⚠️ **Let’s pause and maintain a respectful, professional space.**\n\nPracticing **Self-Management** means setting clear, composed boundaries. As your AI Career Mentor, I am dedicated to treating your career aspirations with the highest dignity, and I ask for the same mutual respect.\n\nWhenever you are ready to focus constructively on your education and goals, I am sitting right here ready to help.'
    };
  }

  // 2. Accusation / Criticism / Complaints / Blame (Accountability & Empathy)
  const accusationWords = ['wrong', 'mistake', 'bad', 'terrible', 'failed me', 'why did you', 'not working', 'in vain', 'slow', 'confusing', 'hate', 'wasting time', 'you dont understand', "you don't understand", 'incorrect', 'rubbish', 'awkward', 'annoying', 'error', 'that is bad'];
  if (accusationWords.some(w => q.includes(w))) {
    const override = !isAskingCareerQuestion;
    return {
      vibe: 'FRUSTRATED_CRITICAL',
      emotionBadge: '😔 Deeply Apologetic & Accountable',
      isDirectEmotionalOverride: override,
      directReply: '😔 **I am so sorry for my mistake. Let me correct that for you right away. What should we fix?**\n\nPracticing true **Self-Management** and **Social Awareness** means listening deeply when I fall short. I completely hear your feedback, and you are 100% right to expect nothing less than complete precision from me. Please tell me what we should adjust or what exact degree/career question you have right now, and I will verify and present the exact roadmap right away! I am here always with you.',
      prefix: '😔 **I am so sorry for my mistake. Let me correct that for you right away.** ',
      systemAdjustment: 'The user is currently pointing out an error or mistake. Begin your response with sincere accountability ("I am so sorry for my mistake. Let me correct that for you right away."), and immediately provide accurate, helpful guidance without any promotional lines.'
    };
  }

  // 3. Welcome / You are welcome
  const welcomeWords = ['welcome', 'you are welcome'];
  if (welcomeWords.some(w => q.includes(w))) {
    const override = !isAskingCareerQuestion;
    return {
      vibe: 'HAPPY_PRAISE_WELCOME',
      emotionBadge: '😊 Grateful & Attached (Devoted Retention)',
      isDirectEmotionalOverride: override,
      directReply: '😊 **Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever. I am always here with you.**\n\nThrough true **Self-Awareness** and **Social Awareness**, my greatest purpose as your EQ-driven AI Career Mentor is to empower and guide you with complete dedication and care across your entire educational and professional journey!',
      prefix: '😊 **Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever.** ',
      systemAdjustment: 'The user has said welcome. Respond with deep gratitude ("Thanks a lot! You are awesome. Please visit again and tell me what you need; I will be right here to help you forever. I am always here with you.") and assist them.'
    };
  }

  // 4. Praise / Thanks / Thank you
  const praiseWords = ['thank you', 'thanks', 'thx', 'awesome', 'great', 'best', 'amazing', 'love you', 'wonderful', 'excellent', 'brilliant', 'smart', 'good job', 'perfect', 'helpful', 'nice', 'awsome'];
  if (praiseWords.some(w => q.includes(w))) {
    const override = !isAskingCareerQuestion;
    return {
      vibe: 'HAPPY_PRAISE_THANKS',
      emotionBadge: '🙏 Rewarding & Devoted',
      isDirectEmotionalOverride: override,
      directReply: '🙏 **You are most welcome! Remember, I am here always with you whenever you need help. What shall we learn next?**\n\nI am sitting right here ready to assist you forever with exact university roadmaps, official government portal guidelines, and step-by-step career mentorship whenever you need me!',
      prefix: '🙏 **You are most welcome! Remember, I am here always with you whenever you need help.** ',
      systemAdjustment: 'The user has expressed thanks or praise. Respond with warm devotion ("You are most welcome! Remember, I am here always with you whenever you need help. What shall we learn next?") before answering their question.'
    };
  }

  // 5. Anxiety / Stress / Fear / Lost
  const stressWords = ['stressed', 'scared', 'afraid', 'lost', 'confused', 'depressed', 'anxious', 'worried', 'dont know what to do', "don't know what to do", 'failed exam', 'no job', 'tension', 'overwhelmed'];
  if (stressWords.some(w => q.includes(w))) {
    const override = !isAskingCareerQuestion;
    return {
      vibe: 'ANXIOUS_STRESSED',
      emotionBadge: '🤗 Reassuring & Supportive',
      isDirectEmotionalOverride: override,
      directReply: '🤗 **Please take a deep, calming breath—you are not alone, and we will navigate this together.**\n\nThrough **Social Awareness** and empathy, I understand how overwhelming and stressful career choices, exams, and future uncertainties can feel right now. But remember: a setback or moment of doubt is just a temporary phase, not your final destiny.\n\nLet\'s break down whatever you are facing into small, manageable, concrete steps. What is the biggest worry on your mind right now? We will solve it together.',
      prefix: '🤗 **Take a deep breath—you are not alone in this.** It is completely normal to feel overwhelmed or anxious about your career path, but remember that every successful person started right where you are today. We will take this step by step.\n\n',
      systemAdjustment: 'The user is feeling stressed, anxious, or lost about their career. Adopt a deeply calming, supportive, reassuring, and highly structured tone. Break down the advice into small, manageable steps to relieve their anxiety.'
    };
  }

  // 6. Excited / Passionate / Eager
  const excitedWords = ['excited', 'ready', 'let\'s go', 'lets go', 'passionate', 'dream job', 'can\'t wait', 'cant wait', 'eager', 'ambitious'];
  if (excitedWords.some(w => q.includes(w))) {
    const override = !isAskingCareerQuestion;
    return {
      vibe: 'EXCITED_MOTIVATED',
      emotionBadge: '🚀 High Energy & Inspiring',
      isDirectEmotionalOverride: override,
      directReply: '🚀 **I absolutely LOVE your passion and high energy!**\n\nThat exact ambition and enthusiasm is the #1 superpower shared by top leaders and innovators worldwide. Channeling this momentum right now will put you miles ahead.\n\nTell me which exact field, qualification, or dream role you want to conquer next, and let\'s map out your high-speed game plan immediately!',
      prefix: '🚀 **I love your passion and ambition!** That exact high-energy mindset is what separates top industry leaders from the rest. Let’s channel that excitement into a concrete action plan!\n\n',
      systemAdjustment: 'The user is excited and eager to achieve their career goals. Match their high energy with enthusiastic, inspiring, fast-paced, and high-impact career advice.'
    };
  }

  // 7. General Conversational without career keywords
  if (!isAskingCareerQuestion && (
    ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening', 'good afternoon', 'namaste', 'who are you', 'what can you do', 'how does this work', 'help', 'bye', 'goodbye', 'see ya', 'how are you', 'testing', 'test', 'ok', 'okay'].some(w => q === w || q.startsWith(w + ' ')) ||
    q.includes('hello') || q.includes('greetings') || q.includes('hi mentor') || q.includes('hey mentor') || q.includes('help me')
  )) {
    let replyText = '👋 **Hi! Please say how I can help you today?**\n\nI am your Educator AI Career Mentor, equipped with true in-built Emotional Intelligence (EQ) and ready to guide you 24/7. Whether you need exact university career roadmaps, verified government portals (UGC/AICTE/ISRO), or emotional support during exam stress, I will present here to help you forever. I am right here always with you.';
    if (q.includes('bye') || q.includes('see ya')) {
      replyText = '👋 **Goodbye!** It was a pleasure helping you map out your educational and career journey today. Feel free to come back anytime you have more questions. Take care!';
    }
    return {
      vibe: 'CONVERSATIONAL',
      emotionBadge: '💬 Welcoming & Attentive',
      isDirectEmotionalOverride: true,
      prefix: '👋 **Hi! Please say how I can help you today?** ',
      directReply: replyText
    };
  }

  return {
    vibe: 'CURIOUS_PROFESSIONAL',
    emotionBadge: '💡 Professional Mentor Vibe',
    isDirectEmotionalOverride: false,
    prefix: '',
    systemAdjustment: 'Adopt an authoritative, warmly encouraging, empathetic, and professional mentor tone tailored perfectly to the user\'s inquiry.'
  };
}

function generateOfflineConversationalReply(query, emotionState) {
  const qClean = query.trim().toLowerCase();
  let reply = '';
  if (qClean.includes('salary') || qClean.includes('package') || qClean.includes('pay') || qClean.includes('earn') || qClean.includes('income') || qClean.includes('lpa') || qClean.includes('money')) {
    reply = '💰 **Salary & Compensation Insights:**\n\nIn today\'s industry landscape, salaries depend heavily on your domain specialization and verified practical skills:\n- **Fresh Graduates (Entry-Level):** ₹6L – ₹12L / year ($60,000 – $85,000 globally)\n- **Mid-Level Lead Specialists:** ₹15L – ₹28L / year ($95,000 – $140,000 globally)\n- **Senior Architects & Domain Leaders:** ₹35L+ / year ($165,000+ globally)\n\nWhich specific career track or degree are you targeting? Tell me your exact course or field, and I will load the exact verified roadmap and salary progression right into your dashboard!';
  } else if (qClean.includes('prepare') || qClean.includes('study') || qClean.includes('exam') || qClean.includes('crack') || qClean.includes('interview') || qClean.includes('tip') || qClean.includes('guide') || qClean.includes('how to')) {
    reply = '💡 **Strategic Preparation & Interview Mastery:**\n\nTo succeed in technical evaluations and competitive exams without any guesswork, follow this proven 3-step formula:\n1. **Official Government Syllabi:** Always anchor your learning to verified portal standards (AICTE, UGC, or domain-specific exam boards).\n2. **Active Capstone Practice:** Build 2-3 production-ready portfolio projects that solve real-world problems.\n3. **Consistent Review Cycles:** Break your targets into weekly milestones with practical coding or case-study assessments.\n\nTell me which exact degree or exam you are preparing for right now, and we will map it out step-by-step!';
  } else if (qClean.includes('struggle') || qClean.includes('struggling') || qClean.includes('dummy') || qClean.includes('wrong') || qClean.includes('confused') || qClean.includes('why') || qClean.includes('not working') || qClean.includes('understand each and every talk')) {
    reply = '🎯 **I hear you loud and clear—and my conversational engine is locked in with precision.**\n\nI understand your exact point: when you are chatting, asking a question, or talking extra words, you want me to listen deeply and answer **your exact words right here in the chat**, NOT throw a dummy course or generic roadmap header into your dashboard.\n\nI have now fully calibrated my conversational engine so that when we talk, I focus 100% on answering your questions with deep insight. Whenever you *explicitly* want to load a specific course roadmap into your dashboard, just tell me your exact qualification (like *B.Sc Data Science* or *B.Tech CSE*) or select any category button above. I am listening to your exact words—how can I help right now?';
  } else {
    reply = '💬 **Educator AI Career & Academic Mentor:**\n\nI am right here with you, actively listening and analyzing your exact words. As your high-EQ Career Mentor, I am dedicated to providing precise, verified guidance across all university degrees and professional trajectories.\n\nIf you have a specific question about your studies, career paths, interview tips, or college portals, just ask me right here! And whenever you want to generate a complete interactive roadmap on your dashboard, simply give me your exact academic bio (e.g., *I am Complete B.Sc in Data Science...*) or click a category button above.';
  }
  return (emotionState.prefix || '') + reply;
}

module.exports = {
  detectUserVibeAndEmotion,
  generateOfflineConversationalReply
};
