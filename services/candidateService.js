/**
 * Candidate Profile & Keyword Routing Service
 * Analyzes academic background, virtual internships, and qualifications to
 * synthesize tailored career guidance and candidate roadmaps.
 */

function detectCareerCategory(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  if (q.includes('geograph') || q.includes('gis') || q.includes('cartograph') || q.includes('earth') || q.includes('geolog')) return 'geography_gis';
  if (q.includes('phd') || q.includes('research') || q.includes('doctorate') || q.includes('thesis') || q.includes('professor') || /\bnet\b/.test(q) || /\bjrf\b/.test(q) || q.includes('ugc net') || q.includes('ugcnet') || q.includes('csir net') || q.includes('csirnet') || q.includes('csirhrdg') || /\bgate\b/.test(q) || /\bjam\b/.test(q) || q.includes('iitb') || q.includes('iitm') || q.includes('nta.nic.in') || q.includes('csirhrdg.res.in') || q.includes('iitb.ac.in') || q.includes('iitm.ac.in') || q.includes('ugc.gov.in')) return 'research_phd';
  if (q.includes('bba') || q.includes('mba') || q.includes('business') || q.includes('management') || q.includes('mbagate') || q.includes('apprenticeshipindia') || (q.includes('bachelor') && q.includes('business'))) return 'management_bba';
  if (q.includes('radiolog') || q.includes('x-ray') || q.includes('mri') || q.includes('ct scan') || q.includes('imaging')) return 'paramedical_radiology';
  if (q.includes('patholog') || /\bmlt\b/.test(q) || /\bdmlt\b/.test(q) || q.includes('lab techn') || q.includes('blood bank') || q.includes('microbiolog')) return 'paramedical_pathology';
  if (q.includes('pharm') || q.includes('b.pharm') || q.includes('d.pharm') || q.includes('medicine maker') || q.includes('pharmacovigilance')) return 'pharmacist';
  if (/\bbca\b/.test(q) || q.includes('b.sc cs') || q.includes('bsc cs') || q.includes('diploma cs') || q.includes('computer application') || q.includes('polytechnic')) return 'diploma_bca_bsc_cs';
  if (q.includes('electrical') || /\bee\b/.test(q) || q.includes('ev powertrain') || q.includes('power grid')) return 'engineering_electrical';
  if (q.includes('chemical engineering') || /\bche\b/.test(q) || q.includes('refinery') || q.includes('petrochemical') || q.includes('green hydrogen')) return 'engineering_chemical';
  if (/\blaw\b/.test(q) || q.includes('ballb') || /\bllb\b/.test(q) || q.includes('clat') || q.includes('advocate') || q.includes('court')) return 'law_ballb';
  if (q.includes('space') || q.includes('aerospace') || q.includes('isro') || q.includes('nasa') || q.includes('rocket') || q.includes('astrophysics')) return 'space_science';
  if (q.includes('animat') || /\bvfx\b/.test(q) || q.includes('graphic') || q.includes('multimedia') || q.includes('film') || q.includes('edit') || q.includes('shiksha') || q.includes('bachelorsportal')) return 'animation_vfx_design';
  if (q.includes('doctor') || /\bmbbs\b/.test(q) || /\bneet\b/.test(q) || q.includes('medical') || q.includes('surgeon') || q.includes('physician')) return 'doctor_india';
  if (q.includes('data sci') || q.includes('machine learn') || /\bml\b/.test(q) || /\bai\b/.test(q) || q.includes('artificial intell')) return 'data_science';
  if (/\bcse\b/.test(q) || q.includes('computer sci') || q.includes('makaut') || q.includes('aicte') || q.includes('b.tech') || q.includes('btech') || q.includes('software eng') || q.includes('coding') || q.includes('programmer') || q.includes('developer')) return 'engineering_cse';
  if (q.includes('upsc') || /\bias\b/.test(q) || /\bips\b/.test(q) || q.includes('civil service') || q.includes('public admin')) return 'upsc_civil';
  if (q.includes('computer') || q.includes('software') || /\btech\b/.test(q) || q.includes('it specialist')) return 'diploma_bca_bsc_cs';
  if (q.includes('ba degree') || /\bba\b/.test(q) || q.includes('b.a') || /\bma\b/.test(q) || q.includes('m.a') || q.includes('ma degree') || q.includes('arts') || q.includes('history') || q.includes('english') || q.includes('humanities') || q.includes('literature') || q.includes('sociology') || q.includes('bengali') || q.includes('hindi') || q.includes('sanskrit') || q.includes('tamil') || q.includes('telugu') || q.includes('malayalam') || q.includes('urdu') || q.includes('gujarati') || q.includes('marathi') || q.includes('punjabi') || q.includes('odia') || q.includes('assamese') || q.includes('kannada') || q.includes('philosophy') || q.includes('political science') || q.includes('psychology') || q.includes('fine arts') || q.includes('mass communication') || q.includes('journalism') || q.includes('social work') || /\bmsw\b/.test(q)) return 'humanities_arts';
  if (q.includes('commerce') || /\bb\.com\b/.test(q) || /\bbcom\b/.test(q) || /\bca\b/.test(q) || q.includes('chartered accountant') || q.includes('finance') || q.includes('banking')) return 'commerce_finance';
  if (q.includes('i am ') || q.includes('my name') || q.includes('complete') || q.includes('completed') || q.includes('degree') || q.includes('career') || q.includes('job') || q.includes('next step') || q.includes('fresher') || q.includes('student') || q.internship || q.includes('internship') || q.includes('college')) return 'universal_guidance';
  return null;
}

function analyzeCandidateCareerProfile(query, category, detectedTier, portalVerification) {
  const qLow = query.toLowerCase();
  
  let candidateName = 'Candidate';
  const nameMatch = query.match(/i am ([a-zA-Z\s]{2,20})[\.\,\!]/i) || query.match(/name is ([a-zA-Z\s]{2,20})[\.\,\!]/i);
  if (nameMatch && nameMatch[1]) {
    const cleanedName = nameMatch[1].replace(/just|complete|completed|studying|student|fresher|a |an /gi, '').trim();
    if (cleanedName && cleanedName.length > 1) candidateName = cleanedName;
  } else if (qLow.includes('ranadeep')) {
    candidateName = 'Ranadeep Saha';
  } else if (qLow.includes('john doe')) {
    candidateName = 'John Doe';
  }

  let degree = 'University Degree';
  if (qLow.includes('bca') || qLow.includes('mca')) degree = 'BCA in Software Engineering';
  else if (qLow.includes('b.sc') || qLow.includes('bsc')) degree = 'B.Sc Data Science';
  else if (qLow.includes('b.tech') || qLow.includes('btech')) degree = 'B.Tech Engineering';
  else if (qLow.includes('mba') || qLow.includes('bba')) degree = 'Business Administration (BBA/MBA)';

  let internship = '';
  if (qLow.includes('tcs') || qLow.includes('tata')) internship = 'TCS (Tata Consultancy Services)';
  else if (qLow.includes('oracle')) internship = 'Oracle';
  else if (qLow.includes('google')) internship = 'Google';
  else if (qLow.includes('microsoft')) internship = 'Microsoft';
  else if (qLow.includes('infosys') || qLow.includes('wipro')) internship = 'Infosys / Wipro';

  // Branch 1: Software Engineering / BCA / MCA / TCS / Web / Full Stack
  if (qLow.includes('software engineer') || qLow.includes('bca') || qLow.includes('mca') || qLow.includes('tcs') || qLow.includes('full stack') || category === 'software_engineering') {
    const shortCompany = internship.includes('TCS') ? 'TCS' : (internship || 'Corporate');
    const roleTitle = `Software Engineer & Full Stack Specialist (${shortCompany} Alumni & ${degree} Graduate - ${candidateName})`;
    const bioText = `Hello ${candidateName}! Congratulations on completing your **${degree}** and successfully executing your virtual internship with **${internship || 'Tier-1 Tech'}**. Your practical exposure at ${shortCompany} equips you with proven corporate standards in agile development, enterprise software lifecycle, and full-stack problem solving. To accelerate directly into high-paying Tier-1 Software Engineer and Full Stack Lead roles (**₹8L–₹18L / yr** / **$65,000–$115,000 global**), your exact right next step is to combine your ${shortCompany} internship credentials with advanced cloud-native web development and system design mastery.`;
    
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: roleTitle,
      bio: bioText,
      marketVal: '₹8L – ₹18L / yr ($65,000–$115,000 Global Standard)',
      marketVal6m: '₹12L / yr ($85K+ Cloud Native Cert)',
      marketVal2y: '₹24L+ / yr ($145K+ Senior Software Architect)',
      skills: [
        `${shortCompany} Enterprise Software Lifecycle & Agile Methods`,
        'Full Stack Web Development (React / Node.js / Python)',
        'Data Structures & Algorithms (DSA) Optimization',
        'Relational & NoSQL Database Architecture',
        'Cloud Deployment & CI/CD Pipelines (AWS / Docker)'
      ],
      matches: [
        { title: `Full Stack Software Engineer (@ ${shortCompany})`, match: '98%' },
        { title: 'Cloud Systems Engineer & Architect', match: '96%' },
        { title: 'Enterprise Application Specialist', match: '94%' }
      ],
      milestones: [
        { title: `Leverage ${shortCompany} Internship Credentials for Corporate Referral / Full-Time Track`, due: 'Weeks 1–3' },
        { title: 'Master Full Stack System Design & Cloud Architecture', due: 'Weeks 4–8' },
        { title: 'Deploy Production Portfolio & Crack Tier-1 Tech Interviews', due: 'Weeks 9–12' }
      ],
      nextStep: `Leverage your ${shortCompany} virtual internship experience by mastering cloud-native full-stack development and applying to ${shortCompany} Digital / Ninja and Tier-1 Software Engineer roles immediately.`,
      courses: [
        { meta: `${portalVerification.name} &middot; Official Computing Standards`, title: `${portalVerification.name} Verified Higher Education Norms`, desc: `Official portal access for verified software degree guidelines and academic recognition.`, rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: portalVerification.url },
        { meta: 'Coursera / IBM &middot; 12 weeks', title: 'Full Stack Software Developer Professional Certificate', desc: 'Master cloud-native full-stack application development with React, Node.js, and Docker.', rating: '4.8 &star; (85K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=full+stack+software+developer' },
        { meta: 'Coursera / Princeton &middot; 8 weeks', title: 'Algorithms & System Design Mastery', desc: 'Data structures, algorithmic efficiency, and distributed system design for top-tier tech interviews.', rating: '4.9 &star; (90K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=algorithms+system+design' }
      ],
      jobs: [
        { company: `${shortCompany} &middot; India / Global`, title: `Software Engineer (${shortCompany} Digital / Innovator Track)`, location: 'Hybrid &middot; ₹8L–₹16L / yr', match: '98% match', applyUrl: shortCompany === 'TCS' ? 'https://www.tcs.com/careers' : (shortCompany === 'Oracle' ? 'https://www.oracle.com/corporate/careers/' : 'https://www.linkedin.com/jobs/search/?keywords=Software+Engineer') },
        { company: 'Infosys &middot; Bangalore / Pune / Hyderabad', title: 'Specialist Programmer / Systems Engineer', location: 'Hybrid &middot; ₹9L–₹18L / yr', match: '96% match', applyUrl: 'https://www.infosys.com/careers' },
        { company: 'Microsoft &middot; Redmond / Hyderabad', title: 'Software Engineer I (Full Stack Track)', location: 'Hybrid &middot; $115K–$145K / yr', match: '94% match', applyUrl: 'https://careers.microsoft.com/v2/global/en/home.html' }
      ],
      videos: [
        { title: `${degree} to Top Product Company SDE Complete Roadmap`, desc: `How to build a world-class engineering portfolio and clear system design rounds.`, lang: 'EN/HI', meta: 'YouTube &middot; 22 min', videoUrl: 'https://www.youtube.com/results?search_query=software+engineer+career+roadmap+system+design' },
        { title: 'Crack TCS Digital & Innovator Coding Assessment in 30 Days', desc: 'Real advanced coding problems, data structures, and tech interview questions.', lang: 'EN/HI', meta: 'YouTube &middot; 18 min', videoUrl: 'https://www.youtube.com/results?search_query=tcs+digital+exam+preparation+tips' }
      ],
      mindmap: [
        { label: `${degree} Graduate (${candidateName})`, x: 0.08, y: 0.5, step: `${shortCompany} Internship Experience` },
        { label: 'Cloud-Native & System Design', x: 0.35, y: 0.3, step: 'Docker / React / Node.js' },
        { label: 'Tier-1 Interview Prep', x: 0.6, y: 0.5, step: 'DSA & Distributed Systems' },
        { label: 'Senior SDE / Tech Lead', x: 0.88, y: 0.5, step: 'Target Pay: ₹18L–₹28L/yr' }
      ]
    };
  }

  // Branch 2.4: Space / NASA / ISRO / Aerospace Track
  if (qLow.includes('nasa') || qLow.includes('isro') || qLow.includes('space') || qLow.includes('aerospace') || qLow.includes('propulsion') || qLow.includes('rocket') || category === 'space_science') {
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: `Aerospace & Space Scientist (ISRO / NASA / Global Astrophysics - ${candidateName})`,
      bio: `Hello ${candidateName}! Your passion and academic drive for space science, propulsion systems, and aerospace technologies put you on one of the most prestigious and intellectually rewarding trajectories in the world. To join premier organizations like **NASA**, **ISRO**, or **SpaceCrew international spacecraft programs** (**₹10L–₹25L / yr** / **$105,000–$180,000+ global**), your exact right next step is mastering rocket propulsion simulation, astrodynamics, and satellite telemetry.`,
      marketVal: '₹10L – ₹25L / yr ($105,000–$180,000+ Global Standard)',
      marketVal6m: '₹15L / yr ($125K+ Propulsion Lead)',
      marketVal2y: '₹35L+ / yr ($190K+ Chief Space Systems Architect)',
      skills: [
        'Rocket Propulsion & Gas Dynamics Simulation',
        'Orbital Mechanics & Astrodynamics (MATLAB / Python)',
        'Spacecraft Structures & Thermal Control Systems',
        'Satellite Communication & Deep Space Navigation',
        'Avionics & Guidance Control Architecture'
      ],
      matches: [
        { title: 'International Spacecraft & Orbital Propulsion Lead (@ SpaceCrew)', match: '98%' },
        { title: 'Aerospace Rocket Propulsion Scientist (ISRO / SpaceX)', match: '96%' },
        { title: 'Satellite Telemetry & Guidance Systems Lead', match: '94%' }
      ],
      milestones: [
        { title: 'Connect to Official ISRO IIRS EDUSAT / e-Learning Portal & Verify Foundation', due: 'Weeks 1–3' },
        { title: 'Master Advanced MATLAB / Python Orbital Mechanics & Propulsion Simulation', due: 'Weeks 4–8' },
        { title: 'Submit Space Propulsion Capstone & Apply via SpaceCrew / ISRO Gateways', due: 'Weeks 9–12' }
      ],
      courses: [
        { meta: 'IIRS ISRO e-Learning &middot; Official Govt Portal', title: 'ISRO Satellite & Remote Sensing Certification', desc: 'Connect to official ISRO IIRS EDUSAT e-learning portal for live remote sensing and space dynamics courses.', rating: '5.0 &star; (Govt India)', price: 'Free Govt Access', liveUrl: 'https://elearning.iirs.gov.in/' },
        { meta: 'Coursera / Caltech &middot; Astrodynamics', title: 'The Evolving Universe & Orbital Dynamics', desc: 'Explore astrodynamics, planetary motion, and deep space exploration technologies.', rating: '4.9 &star; (24K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=astronomy+space' }
      ],
      jobs: [
        { company: 'SpaceCrew Global Portal &middot; International', title: 'International Spacecraft & Orbital Propulsion Lead', location: 'Global &middot; $105,000–$180,000+', match: '98% match', applyUrl: 'https://spacecrew.com/space-propulsion-jobs' },
        { company: 'ISRO / DRDO &middot; India', title: 'Scientist / Engineer SC (Aerospace / Space)', location: 'Space Center &middot; Govt Pay Scale + ₹12L+', match: '95% match', applyUrl: 'https://www.isro.gov.in/Careers.html' }
      ],
      videos: [
        { title: 'Complete NASA / ISRO Space Scientist Roadmap (Propulsion & Astrodynamics)', desc: `Step-by-step qualification guide, interview rounds, and research mastery.`, lang: 'EN/HI', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+become+isro+nasa+scientist+roadmap' }
      ],
      mindmap: [
        { label: `${degree} (${candidateName})`, x: 0.08, y: 0.5, step: 'Academic Foundation' },
        { label: 'ISRO IIRS e-Learning', x: 0.32, y: 0.3, step: 'Govt Certification' },
        { label: 'Propulsion Simulation', x: 0.58, y: 0.5, step: 'MATLAB / Python' },
        { label: 'Spacecraft Propulsion Lead', x: 0.88, y: 0.5, step: 'Land job via spacecrew.com' }
      ]
    };
  }

  // Branch 2: Data Science / Oracle / Machine Learning
  if (qLow.includes('data science') || qLow.includes('oracle') || category === 'data_science') {
    const shortCompany = internship ? internship.split(' ')[0] : 'Oracle';
    const roleTitle = internship ? `Junior Data Scientist & AI/ML Engineer (${shortCompany} Alumni & ${degree} Graduate)` : `Junior Data Scientist & AI Specialist (${degree} Graduate - ${candidateName})`;
    const bioText = `Hello ${candidateName}! As a **${degree}** graduate with hands-on corporate internship experience${internship ? ' at **' + internship + '**' : ''}, your profile already stands in the top 10% of entry-level candidates nationwide. ${internship ? 'Your **' + internship + '** internship gives you proven industry credibility in enterprise data structures, SQL optimization, and cloud relational systems. ' : ''}To accelerate directly into high-paying Tier-1 Data Scientist roles (**₹12L–₹22L / yr** / **$85,000–$120,000 global**), your exact right next step is not taking basic introductory Python courses, but bridging enterprise data engineering with end-to-end MLOps, PyTorch deep learning pipelines, and cloud AI architecture (AWS/OCI).`;
    
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: roleTitle,
      bio: bioText,
      marketVal: '₹12L – ₹22L / yr ($85,000–$120,000 Global Standard)',
      marketVal6m: '₹16L / yr ($95K+ Cloud AI Cert)',
      marketVal2y: '₹28L+ / yr ($160K+ Senior MLOps Lead)',
      skills: [
        internship ? `${shortCompany} Enterprise SQL & Database Architecture` : 'Enterprise SQL & Data Modeling',
        'Predictive Modeling & Statistical Machine Learning',
        'Python / R / PyTorch Deep Learning Pipelines',
        'Automated Exploratory Data Analysis (EDA)',
        'Cloud MLOps & Deployment (AWS / Oracle Cloud / GCP)'
      ],
      matches: [
        { title: `Junior Data Scientist (@ ${shortCompany || 'Tier-1 Tech'})`, match: '98%' },
        { title: 'Cloud AI & MLOps Engineer', match: '96%' },
        { title: 'Enterprise Data Analytics Specialist', match: '93%' }
      ],
      milestones: [
        { title: `Leverage ${shortCompany || 'Internship'} Experience for Corporate Referrals & Transition`, due: 'Weeks 1–3' },
        { title: 'Master Cloud AI Pipelines & Deep Learning Specialization (Andrew Ng)', due: 'Weeks 4–8' },
        { title: 'Publish End-to-End MLOps Portfolio & Ace System Design Interviews', due: 'Weeks 9–12' }
      ],
      nextStep: `Leverage your ${shortCompany ? shortCompany + ' data engineering' : degree} credentials by enrolling in Andrew Ng's Machine Learning Specialization and applying to Tier-1 Junior Data Scientist / MLOps roles immediately.`,
      courses: [
        { meta: 'Coursera / DeepLearning.AI &middot; 10 weeks', title: 'Machine Learning Specialization by Andrew Ng', desc: 'The definitive global standard for AI and ML algorithms, neural networks, and model evaluation.', rating: '4.9 &star; (120K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=machine+learning+specialization' },
        { meta: 'Coursera / DeepLearning.AI &middot; 12 weeks', title: 'Deep Learning Specialization', desc: 'Become a deep learning expert. Build and train neural network architectures.', rating: '4.9 &star; (120K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=deep+learning+specialization' },
        { meta: 'Amazon Web Services &middot; 4 weeks', title: 'AWS Certified Cloud Practitioner & Machine Learning', desc: 'Master foundational cloud AI concepts and deploy enterprise data models.', rating: '4.8 &star; (12K)', price: 'Free training', liveUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' }
      ],
      jobs: [
        { company: `${shortCompany} &middot; Bangalore / Remote`, title: `Junior Data Scientist (${shortCompany} Alumni Referral Track)`, location: 'Hybrid &middot; ₹14L–₹22L / yr', match: '98% match', applyUrl: shortCompany === 'Oracle' ? 'https://www.oracle.com/corporate/careers/' : 'https://www.linkedin.com/jobs/search/?keywords=Data+Scientist' },
        { company: 'Google &middot; Bangalore / Hyderabad', title: 'Data Scientist, Product Analytics (New Grad)', location: 'Hybrid &middot; ₹28L–₹45L / yr', match: '96% match', applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=Data%20Scientist' },
        { company: 'Microsoft &middot; Redmond / Hybrid', title: 'AI/ML Software Engineer I', location: 'Hybrid &middot; $115K–$145K / yr', match: '94% match', applyUrl: 'https://careers.microsoft.com/v2/global/en/home.html' }
      ],
      videos: [
        { title: `${degree} to Data Scientist & MLOps Complete Career Roadmap`, desc: `How to combine ${shortCompany || 'enterprise'} SQL skills with modern AI/ML architectures.`, lang: 'EN', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=data+scientist+career+roadmap+MLOps' },
        { title: 'Machine Learning Specialization Walkthrough & Portfolio Tips', desc: 'Andrew Ng Machine Learning Specialization key projects and hiring interview preparation.', lang: 'EN', meta: 'YouTube &middot; 19 min', videoUrl: 'https://www.youtube.com/results?search_query=machine+learning+specialization+andrew+ng+review' },
        { title: 'Crack Tier-1 Data Scientist Interviews @ Google, Oracle & Microsoft', desc: 'Real interview case studies, statistical modeling questions, and system design answers.', lang: 'EN/HI', meta: 'YouTube &middot; 26 min', videoUrl: 'https://www.youtube.com/results?search_query=data+scientist+interview+preparation+google+oracle' }
      ],
      mindmap: [
        { label: `${degree} Foundation`, x: 0.08, y: 0.5, step: `${shortCompany || 'Corporate'} Internship` },
        { label: 'Enterprise SQL & Cloud', x: 0.3, y: 0.3, step: 'Data Engineering' },
        { label: 'Deep Learning & MLOps', x: 0.55, y: 0.5, step: 'Production AI Models' },
        { label: 'Tier-1 Data Scientist', x: 0.82, y: 0.5, step: 'Target Pay: ₹18L–₹28L/yr' }
      ]
    };
  }

  // Branch 2.5: Geography / GIS & Spatial Analytics
  if (qLow.includes('geograph') || qLow.includes('gis') || qLow.includes('cartograph') || qLow.includes('earth') || qLow.includes('geolog') || category === 'geography_gis') {
    const roleTitle = `Geographic Information Systems (GIS) & Spatial Analytics Specialist (${degree} Graduate - ${candidateName})`;
    const bioText = `Hello ${candidateName}! Congratulations on completing your **${degree || 'BA in Geography'}**. Your academic foundation in spatial analysis, cartography, and environmental geography gives you a unique analytical edge. To transition directly into high-paying modern tech and research careers (**₹7L–₹16L / yr** / **$60,000–$105,000 global**), your exact right next step is to master Geographic Information Systems (GIS), Satellite Remote Sensing (ISRO Bhuvan/IIRS), and Spatial Data Science (Python/SQL for GIS).`;
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: roleTitle,
      bio: bioText,
      marketVal: '₹7L – ₹16L / yr ($60,000–$105,000 Global Standard)',
      marketVal6m: '₹11L / yr ($80K+ ISRO/Python GIS Cert)',
      marketVal2y: '₹22L+ / yr ($130K+ Senior Spatial Architect)',
      skills: [
        'Geographic Information Systems (QGIS / ArcGIS Pro / PostGIS)',
        'Satellite Remote Sensing & Earth Observation (ISRO Bhuvan / NASA EOS)',
        'Spatial Data Science & Spatial SQL (Python GeoPandas / Rasterio)',
        'Digital Elevation Modeling & Cartographic Engineering',
        'Environmental Impact Assessment & Urban Climate Modeling'
      ],
      matches: [
        { title: 'GIS Application Engineer & Spatial Analyst', match: '98%' },
        { title: 'Remote Sensing Scientist (@ ISRO / IIRS)', match: '96%' },
        { title: 'Urban Climate & Geospatial Modeler', match: '94%' }
      ],
      milestones: [
        { title: 'Register on ISRO E-Classroom / IIRS & Verify UGC Spatial Credits', due: 'Weeks 1–3' },
        { title: 'Master Python Spatial Data Science (QGIS, GeoPandas & PostGIS)', due: 'Weeks 4–8' },
        { title: 'Deploy Live Urban Canopy/Flood Risk Spatial Model & Crack GIS Roles', due: 'Weeks 9–12' }
      ],
      nextStep: `Leverage your ${degree} background by registering for ISRO IIRS free remote sensing courses and building spatial data pipelines in QGIS/Python.`,
      courses: [
        { meta: 'ISRO IIRS Official Portal &middot; Free Govt Cert', title: 'ISRO IIRS E-Classroom Remote Sensing & GIS', desc: 'Direct portal to Indian Institute of Remote Sensing official E-Learning platform for satellite data analysis.', rating: '5.0 &star; (Official)', price: 'Free Govt Cert', liveUrl: 'https://eclass.iirs.gov.in/' },
        { meta: 'Coursera / UC Davis &middot; 8 weeks', title: 'Geographic Information Systems (GIS) Specialization', desc: 'Comprehensive mastery of ArcGIS Pro, spatial data management, and geospatial analysis workflows.', rating: '4.8 &star; (65K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=geographic+information+systems+specialization' }
      ],
      jobs: [
        { company: 'ISRO / IIRS Research Track &middot; Dehradun / Remote', title: 'Junior Research Fellow (JRF) - Remote Sensing & GIS', location: 'On-site &middot; ₹37,000/mo + HRA (Govt Scale)', match: '98% match', applyUrl: 'https://eclass.iirs.gov.in/' },
        { company: 'Esri India &middot; Noida / Bengaluru / Remote', title: 'GIS Application Engineer & Spatial Analyst', location: 'Hybrid &middot; ₹8L–₹16L / yr', match: '96% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=GIS+Analyst' },
        { company: 'Google Maps / GeoData Corp &middot; Hyderabad / London', title: 'Geospatial Data Specialist', location: 'Hybrid &middot; ₹14L–₹24L / yr ($85K–$115K)', match: '94% match', applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=Geospatial' }
      ],
      videos: [
        { title: 'Complete BA/B.Sc Geography to GIS & Spatial Data Scientist Roadmap', desc: 'How to transition from Geography degree into high-paying GIS, remote sensing, and Python spatial analytics jobs.', lang: 'EN/HI', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=geography+to+GIS+data+scientist+career+roadmap' },
        { title: 'ISRO IIRS E-Classroom Registration & Free Government Certificate Guide', desc: 'Step-by-step tutorial on applying for ISRO free live courses and adding remote sensing credentials to your CV.', lang: 'HI/EN', meta: 'YouTube &middot; 16 min', videoUrl: 'https://www.youtube.com/results?search_query=ISRO+IIRS+free+GIS+certificate+apply' }
      ],
      mindmap: [
        { label: 'Geography Degree', x: 0.08, y: 0.5, step: 'Cartography & Earth Sciences' },
        { label: 'ISRO IIRS & QGIS', x: 0.32, y: 0.3, step: 'Spatial SQL & Remote Sensing' },
        { label: 'Spatial Python', x: 0.58, y: 0.5, step: 'GeoPandas & Urban Analytics' },
        { label: 'Senior Spatial Scientist', x: 0.88, y: 0.5, step: 'Target Pay: ₹11L–₹22L/yr' }
      ]
    };
  }

  // Branch 2.6: PhD & Doctorate Research Track (UGC NET / CSIR NET / CSIR HRDG / GATE / JAM Master Engine)
  if (qLow.includes('phd') || qLow.includes('research') || qLow.includes('doctorate') || qLow.includes('thesis') || qLow.includes('professor') || /\bnet\b/.test(qLow) || /\bjrf\b/.test(qLow) || qLow.includes('ugc net') || qLow.includes('ugcnet') || qLow.includes('csir net') || qLow.includes('csirnet') || qLow.includes('csirhrdg') || /\bgate\b/.test(qLow) || /\bjam\b/.test(qLow) || qLow.includes('iitb') || qLow.includes('iitm') || category === 'research_phd') {
    const isHistoryOrHumanities = qLow.includes('history') || qLow.includes('arts') || qLow.includes('humanities') || qLow.includes('literature') || qLow.includes('sociology') || qLow.includes('ugc net') || qLow.includes('ugcnet') || category === 'humanities_arts';
    const isScienceSTEM = qLow.includes('csir') || qLow.includes('science') || qLow.includes('physics') || qLow.includes('chemistry') || qLow.includes('biology') || qLow.includes('biotech') || qLow.includes('hrdg');
    const isEngineeringGATE = qLow.includes('gate') || qLow.includes('engineering') || qLow.includes('b.tech') || qLow.includes('m.tech') || qLow.includes('iitb');
    const isJAMMath = qLow.includes('jam') || qLow.includes('math') || qLow.includes('iitm');

    if (isHistoryOrHumanities && !isScienceSTEM && !isEngineeringGATE) {
      return {
        officialPortal: portalVerification,
        aiRoutedTier: detectedTier,
        aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
        role: `Senior Academic Researcher & Historian (PhD / UGC NET Candidate - ${candidateName})`,
        bio: `Hello ${candidateName}! Congratulations on your advanced academic journey in **Humanities & History**! Holding or preparing for a doctorate / UGC-NET in your discipline places you among the highest intellectual echelons of historical preservation, archival scholarship, and university leadership. To transform your qualifications into elite career growth (**₹12L–₹28L+ / yr** / **$85,000–$145,000 global**), your exact right next steps are qualifying **UGC NET JRF (https://ugcnet.nta.nic.in/)**, securing Assistant Professorship tenure across Central & State Universities, directing archival heritage institutions (National Archives / ASI / UNESCO), and publishing monographs in premier university presses (Oxford / Cambridge).`,
        marketVal: '₹12L – ₹28L+ / yr ($85,000–$145,000 Global Heritage & Professorship Standard)',
        marketVal6m: '₹16L / yr (UGC Pay Scale Grade 10/11 Assistant Professor Track)',
        marketVal2y: '₹32L+ / yr ($145K+ Chief Heritage Director / Tenured Professor)',
        skills: [
          'Advanced Historiographical Methodologies & Archival Paleography',
          'UGC NET / JRF Examination Clearance & Academic Pedagogy',
          'Academic Monograph Publishing (Oxford/Cambridge University Press)',
          'Public History & Geopolitical Policy Analysis (Think Tanks / UNESCO)',
          'Higher Education Pedagogy & University Professorship (UGC Standards)'
        ],
        matches: [
          { title: 'Assistant / Associate Professor (@ Central Universities / DU / JNU)', match: '98%' },
          { title: 'Senior Archival Officer & Historical Conservation Director (National Archives / ASI)', match: '96%' },
          { title: 'Senior Cultural & Geopolitical Policy Fellow (Global Think Tanks / UNESCO)', match: '95%' }
        ],
        milestones: [
          { title: 'Register on NTA Official Portal & Clear UGC NET JRF Examination (https://ugcnet.nta.nic.in/)', due: 'Weeks 1–3' },
          { title: 'Apply for Central University Assistant Professor Vacancies via UGC Academic Gateway', due: 'Weeks 4–8' },
          { title: 'Connect with National Archives / UNESCO Heritage Research Fellowships', due: 'Weeks 9–12' }
        ],
        nextStep: `Directly connect to the NTA UGC NET Exam Portal (https://ugcnet.nta.nic.in/) and UGC Official Academic Portal (ugc.gov.in) to secure permanent faculty and JRF fellowship positions right away.`,
        courses: [
          { meta: 'NTA Official Exam Gateway &middot; Govt Portal', title: 'National Testing Agency (NTA) UGC NET / JRF Examination Portal', desc: 'Official gateway for UGC NET registration, syllabus verification, eligibility checking, and Assistant Professor qualification.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://ugcnet.nta.nic.in/' },
          { meta: 'UGC Official Academic Portal &middot; Govt Portal', title: 'University Grants Commission (UGC) Professorship Norms & API Regulations', desc: 'Direct access to official UGC Assistant Professor eligibility, API scores, and academic research guidelines.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' }
        ],
        jobs: [
          { company: 'National Testing Agency &middot; Central Universities / DU / JNU', title: 'Assistant Professor of Humanities / History (UGC Pay Scale Grade 10/11)', location: 'On-site &middot; ₹80,000–₹1,45,000/mo + Perks', match: '98% match', applyUrl: 'https://ugcnet.nta.nic.in/' },
          { company: 'National Archives of India / ASI &middot; New Delhi / Regional', title: 'Senior Archival Officer & Historical Conservation Director', location: 'On-site &middot; Govt Pay Scale + ₹14L/yr', match: '96% match', applyUrl: 'https://nationalarchives.nic.in/' },
          { company: 'UNESCO / International Cultural Heritage Foundations &middot; Global', title: 'International Historical Heritage & Cultural Policy Director', location: 'Global / Hybrid &middot; $90,000–$145,000+', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
        ],
        videos: [
          { title: 'Complete Career Roadmap after PhD in History (Professorship, ASI & Heritage)', desc: `Step-by-step guide to securing university tenure, academic publishing, and heritage directorships.`, lang: 'HI/EN', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=career+after+phd+in+history+professorship+roadmap' },
          { title: 'How to Crack UGC NET JRF with Top Percentile & Secure Full Fellowship', desc: `Exam strategy, paper 1 & paper 2 preparation, and UGC fellowship clearance.`, lang: 'EN', meta: 'YouTube &middot; 22 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+crack+ugc+net+jrf+first+attempt' }
        ],
        mindmap: [
          { label: `PhD / UGC NET (${candidateName})`, x: 0.08, y: 0.5, step: 'UGC NET JRF Clearance' },
          { label: 'UGC Assistant Professor', x: 0.32, y: 0.3, step: 'Central University Faculty' },
          { label: 'Monograph Publishing', x: 0.58, y: 0.5, step: 'Oxford / Cambridge Press' },
          { label: 'Heritage / Tenured Director', x: 0.88, y: 0.5, step: 'Target Pay: ₹18L–₹35L+/yr' }
        ]
      };
    }

    if (isScienceSTEM) {
      return {
        officialPortal: portalVerification,
        aiRoutedTier: detectedTier,
        aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
        role: `Principal Scientist & Senior Research Scholar (CSIR NET / HRDG Qualified - ${candidateName})`,
        bio: `Hello ${candidateName}! Excellent dedication to advanced research in **Science & STEM**! Whether you are a PhD researcher, JRF fellow, or master candidate, your exact right next step is qualifying **CSIR NET JRF (https://csirnet.nta.nic.in/)**, registering with the **CSIR Human Resource Development Group (https://csirhrdg.res.in/Home/Index/1)** for research grants, and joining premier national & international laboratories (CSIR NCL, NPL, IISc, BARC, TIFR). This trajectory unlocks elite scientist grades (**₹14L–₹30L+ / yr** / **$90,000–$150,000 global**).`,
        marketVal: '₹14L – ₹30L+ / yr ($90,000–$150,000 Global R&D Scientist Standard)',
        marketVal6m: '₹16L / yr ($95K+ CSIR SRF / Post-Doctoral Fellowship)',
        marketVal2y: '₹32L+ / yr ($150K+ Principal Scientist / Lab Director)',
        skills: [
          'Advanced Empirical Research Design & Laboratory Analytical Methods',
          'CSIR NET JRF / SRF / RA Fellowship Clearance & Grant Architecture',
          'Scopus / Nature / Science Peer-Reviewed Academic Publishing',
          'Advanced Spectroscopy, Chromatography & Statistical Modeling',
          'R&D Project Leadership & Institutional Ethics (CSIR / HRDG Guidelines)'
        ],
        matches: [
          { title: 'CSIR Senior Research Fellow / Research Associate (@ CSIR HRDG Labs)', match: '98%' },
          { title: 'Scientist / Principal Research Associate (@ CSIR NCL / NPL / IISc / IIT)', match: '96%' },
          { title: 'International Post-Doctoral / R&D Scientist (@ Global Science Labs)', match: '95%' }
        ],
        milestones: [
          { title: 'Register on NTA CSIR NET Exam Portal (https://csirnet.nta.nic.in/) & Clear JRF Examination', due: 'Weeks 1–3' },
          { title: 'Submit Research Proposal to CSIR HRDG (https://csirhrdg.res.in/Home/Index/1) for SRF/RA Grants', due: 'Weeks 4–8' },
          { title: 'Publish Scopus / Nature Indexed Paper & Secure Laboratory Placement', due: 'Weeks 9–12' }
        ],
        nextStep: `Connect directly to the NTA CSIR NET Portal (https://csirnet.nta.nic.in/) and CSIR Human Resource Development Group (https://csirhrdg.res.in/Home/Index/1) for fellowships and research grant allocation immediately.`,
        courses: [
          { meta: 'NTA Official Exam Gateway &middot; Govt Portal', title: 'National Testing Agency (NTA) CSIR NET Official Examination Portal', desc: 'Direct gateway for CSIR NET registration, syllabus, JRF fellowship verification, and Lectureship qualification across Chemical, Physical, Mathematical, and Life Sciences.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://csirnet.nta.nic.in/' },
          { meta: 'CSIR HRDG Official Portal &middot; Govt Gateway', title: 'CSIR Human Resource Development Group (HRDG) Research Grants & Fellowships', desc: 'Official portal for CSIR JRF, SRF, Research Associate (RA) grants, Shyama Prasad Mukherjee Fellowships, and academic project allocation.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://csirhrdg.res.in/Home/Index/1' }
        ],
        jobs: [
          { company: 'National Testing Agency &middot; CSIR / IISc / Central Universities', title: 'CSIR NET Qualified Senior Research Fellow / Assistant Professor', location: 'On-site &middot; ₹75,000–₹1,35,000/mo + Perks', match: '98% match', applyUrl: 'https://csirnet.nta.nic.in/' },
          { company: 'CSIR Human Resource Development Group (HRDG) &middot; National Laboratories', title: 'CSIR Senior Research Fellow (SRF) & Research Associate (RA)', location: 'On-site &middot; Govt Research Fellowship Pay Scale', match: '96% match', applyUrl: 'https://csirhrdg.res.in/Home/Index/1' },
          { company: 'Global Research Institute / Pharma & R&D &middot; Hybrid / USA / UK', title: 'Post-Doctoral Research Scientist', location: 'Hybrid &middot; $85,000–$135,000 / yr', match: '95% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Postdoctoral+Researcher' }
        ],
        videos: [
          { title: 'How to Crack CSIR NET JRF with Top Rank & Get CSIR HRDG Fellowship', desc: `Complete strategy for Chemical, Life, Physical & Mathematical Sciences JRF clearance.`, lang: 'HI/EN', meta: 'YouTube &middot; 26 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+crack+csir+net+jrf+strategy' },
          { title: 'CSIR HRDG Research Associate & SRF Grant Application Process', desc: `Step-by-step guide to securing direct research grants and lab placements via CSIR HRDG.`, lang: 'EN', meta: 'YouTube &middot; 21 min', videoUrl: 'https://www.youtube.com/results?search_query=csir+hrdg+srf+ra+fellowship+application' }
        ],
        mindmap: [
          { label: `Science PhD/JRF (${candidateName})`, x: 0.08, y: 0.5, step: 'CSIR NET JRF Clearance' },
          { label: 'CSIR HRDG Grants', x: 0.32, y: 0.3, step: 'SRF / RA Fellowship' },
          { label: 'Scopus Publishing', x: 0.58, y: 0.5, step: 'Nature / Science Journals' },
          { label: 'Principal Scientist', x: 0.88, y: 0.5, step: 'Target Pay: ₹20L–₹35L+/yr' }
        ]
      };
    }

    if (isEngineeringGATE || isJAMMath) {
      return {
        officialPortal: portalVerification,
        aiRoutedTier: detectedTier,
        aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
        role: `Doctoral Engineering & Technical Research Scientist (GATE / JAM Qualified - ${candidateName})`,
        bio: `Hello ${candidateName}! Outstanding ambition in **Technical Research & Engineering/JAM paths**! For every doctoral or post-grad candidate in engineering, technology, or applied sciences, the exact right next step is securing top percentile scores in **GATE IIT Bombay (https://gate.iitb.ac.in/)** or **GATE/JAM IIT Madras (https://gate.iitm.ac.in/)**, unlocking Prime Minister's Research Fellowships (PMRF), direct PhD/M.Tech placements at IITs/IISc, and executive Grade-A Scientist / Engineer recruitment across Maharatna PSUs (**₹14L–₹32L+ / yr** / **$95,000–$160,000 global**).`,
        marketVal: '₹14L – ₹32L+ / yr ($95,000–$160,000 Global Engineering R&D Standard)',
        marketVal6m: '₹18L / yr (PMRF / IIT Doctoral Fellowship / PSU Grade A)',
        marketVal2y: '₹35L+ / yr ($160K+ Chief R&D Architect / Executive Scientist)',
        skills: [
          'Advanced Mathematical Modeling & Computational Simulation',
          'GATE / JAM High Percentile Clearance & PMRF Fellowship Architecture',
          'High-Performance Computing & Systems Design Engineering',
          'Peer-Reviewed Technical Publishing (IEEE / Scopus / Nature)',
          'Maharatna PSU Executive Recruitment & R&D Project Directorship'
        ],
        matches: [
          { title: 'Prime Minister\'s Research Fellow (PMRF) / Doctoral Scholar (@ IIT Bombay / IIT Madras / IISc)', match: '98%' },
          { title: 'Executive Engineer / Scientist C (Direct Recruitment via GATE @ ONGC/ISRO/BARC)', match: '96%' },
          { title: 'Senior R&D Systems Engineer (@ Global AI / Aerospace Tech Labs)', match: '95%' }
        ],
        milestones: [
          { title: 'Register on Official GATE IIT Bombay (gate.iitb.ac.in) or GATE/JAM IIT Madras (gate.iitm.ac.in) Portal', due: 'Weeks 1–3' },
          { title: 'Secure Top Percentile Score & Apply for PMRF Doctoral Fellowships / PSU Recruitment', due: 'Weeks 4–8' },
          { title: 'Publish IEEE / Scopus Technical Research & Lead Advanced Engineering Projects', due: 'Weeks 9–12' }
        ],
        nextStep: `Connect directly to the official GATE IIT Bombay Portal (https://gate.iitb.ac.in/) and GATE/JAM IIT Madras Portal (https://gate.iitm.ac.in/) for doctoral admissions and PSU recruitment immediately.`,
        courses: [
          { meta: 'IIT Bombay Official Portal &middot; Govt Gateway', title: 'GATE Official Examination Portal (IIT Bombay Gateway)', desc: 'Official gateway for Graduate Aptitude Test in Engineering (GATE) registration, syllabus, M.Tech/PhD admissions, and Maharatna PSU recruitment.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://gate.iitb.ac.in/' },
          { meta: 'IIT Madras Official Portal &middot; Govt Gateway', title: 'GATE / JAM Official Examination Portal (IIT Madras Gateway)', desc: 'Official gateway for Joint Admission Test for Masters (JAM) and GATE examinations, direct PhD admissions, and national technical research qualifications.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://gate.iitm.ac.in/' }
        ],
        jobs: [
          { company: 'IIT Bombay / IIT Madras / IISc &middot; India', title: 'Prime Minister\'s Research Fellow (PMRF) & Doctoral Engineering Scholar', location: 'On-site &middot; ₹80,000–₹1,30,000/mo Research Stipend', match: '98% match', applyUrl: 'https://gate.iitb.ac.in/' },
          { company: 'Maharatna PSUs & ISRO / BARC &middot; National Recruitment', title: 'Executive Engineer & Scientist C (Direct Recruitment via GATE / JAM Score)', location: 'On-site &middot; Grade A Pay Scale (₹14L–₹24L/yr)', match: '96% match', applyUrl: 'https://gate.iitm.ac.in/' },
          { company: 'Global Tech Corporate Labs &middot; Hybrid / International', title: 'Senior Technical Research Scientist & Systems Architect', location: 'Hybrid &middot; $95,000–$160,000 / yr', match: '95% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Research+Engineer' }
        ],
        videos: [
          { title: 'How to Crack GATE & JAM with Top 100 Rank & Get PMRF Fellowship at IITs', desc: `Complete roadmap for M.Tech/PhD admissions and direct Maharatna PSU recruitment.`, lang: 'HI/EN', meta: 'YouTube &middot; 28 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+crack+gate+pmrf+fellowship+iit' },
          { title: 'GATE to PSU Direct Recruitment Complete Process & Eligibility', desc: `Step-by-step guide to securing Grade-A Executive Engineer posts at ONGC, IOCL, NTPC & ISRO via GATE.`, lang: 'EN', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=gate+to+psu+recruitment+process' }
        ],
        mindmap: [
          { label: `GATE/JAM PhD (${candidateName})`, x: 0.08, y: 0.5, step: 'Top Percentile Clearance' },
          { label: 'PMRF Fellowship', x: 0.32, y: 0.3, step: 'IIT Bombay / IIT Madras' },
          { label: 'PSU Grade A Post', x: 0.58, y: 0.5, step: 'Maharatna Executive' },
          { label: 'Chief R&D Architect', x: 0.88, y: 0.5, step: 'Target Pay: ₹22L–₹35L+/yr' }
        ]
      };
    }

    // Universal Master Doctoral & Research Matrix
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: `Senior Doctoral Scholar & Principal Research Scientist (UGC NET / CSIR NET / GATE / JAM Qualified - ${candidateName})`,
      bio: `Hello ${candidateName}! Pursuing a **PhD or advanced doctorate** places you at the pinnacle of academic scholarship, empirical inquiry, and innovation. To ensure every PhD candidate gets their exact next path according to their discipline continuously every year, our system is deeply integrated with the 5 master gateways: **UGC NET (https://ugcnet.nta.nic.in/)** for humanities/professorship, **CSIR NET (https://csirnet.nta.nic.in/)** & **CSIR HRDG (https://csirhrdg.res.in/Home/Index/1)** for science fellowships & grants, and **GATE IIT Bombay (https://gate.iitb.ac.in/)** & **GATE/JAM IIT Madras (https://gate.iitm.ac.in/)** for engineering/M.Sc/PhD & PSU executive recruitment (**₹12L–₹30L+ / yr** / **$85,000–$150,000 global**).`,
      marketVal: '₹12L – ₹30L+ / yr ($85,000–$150,000 Global Doctoral Standard)',
      marketVal6m: '₹16L / yr (JRF / PMRF / CSIR SRF Fellowship Track)',
      marketVal2y: '₹32L+ / yr ($155K+ Tenured Professor / Principal R&D Scientist)',
      skills: [
        'Advanced Qualitative & Quantitative Research Methodology',
        'National Fellowship Clearance (UGC NET / CSIR NET / GATE / JAM)',
        'Academic & Technical Publishing (Scopus / Nature / IEEE / JSTOR)',
        'CSIR HRDG Grant Proposal Writing & Laboratory Analytics',
        'Higher Education Pedagogy & R&D Project Directorship'
      ],
      matches: [
        { title: 'CSIR Senior Research Fellow / JRF Doctoral Scholar (@ CSIR HRDG / UGC Labs)', match: '98%' },
        { title: 'Assistant Professor / PMRF Fellow (@ Central Universities / IIT Bombay / IIT Madras)', match: '96%' },
        { title: 'Executive Engineer / R&D Scientist (@ PSUs / BARC / ISRO via GATE/NET)', match: '95%' }
      ],
      milestones: [
        { title: 'Register on NTA UGC NET (https://ugcnet.nta.nic.in/) or CSIR NET (https://csirnet.nta.nic.in/) Exam Portal', due: 'Weeks 1–3' },
        { title: 'Register on GATE IIT Bombay (https://gate.iitb.ac.in/) or GATE/JAM IIT Madras (https://gate.iitm.ac.in/) Gateway', due: 'Weeks 4–8' },
        { title: 'Secure Research Grants via CSIR HRDG (https://csirhrdg.res.in/Home/Index/1) & Publish Scopus Papers', due: 'Weeks 9–12' }
      ],
      nextStep: `Directly connect to the official national exam portals (https://ugcnet.nta.nic.in/ , https://csirnet.nta.nic.in/ , https://csirhrdg.res.in/Home/Index/1 , https://gate.iitb.ac.in/ , https://gate.iitm.ac.in/) to qualify for full doctoral fellowships and permanent leadership positions right away.`,
      courses: [
        { meta: 'NTA Official Exam Gateway &middot; Govt Portal', title: 'NTA UGC NET / JRF Official Examination Portal', desc: 'Direct gateway for UGC NET registration, syllabus, and Assistant Professor eligibility across humanities & social sciences.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://ugcnet.nta.nic.in/' },
        { meta: 'NTA Official Exam Gateway &middot; Govt Portal', title: 'NTA CSIR NET Official Examination Portal', desc: 'Direct gateway for CSIR NET registration, JRF fellowship clearance, and lectureship across Science disciplines.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://csirnet.nta.nic.in/' },
        { meta: 'CSIR HRDG Official Portal &middot; Govt Gateway', title: 'CSIR Human Resource Development Group (HRDG) Research Grants Portal', desc: 'Official portal for CSIR JRF, SRF, Research Associate (RA) grants, Shyama Prasad Mukherjee Fellowships, and lab allocations.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://csirhrdg.res.in/Home/Index/1' },
        { meta: 'IIT Bombay Official Portal &middot; Govt Gateway', title: 'GATE Official Examination Portal (IIT Bombay Gateway)', desc: 'Official gateway for Graduate Aptitude Test in Engineering (GATE) registration, syllabus, M.Tech/PhD admissions, and Maharatna PSU recruitment.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://gate.iitb.ac.in/' },
        { meta: 'IIT Madras Official Portal &middot; Govt Gateway', title: 'GATE / JAM Official Examination Portal (IIT Madras Gateway)', desc: 'Official gateway for Joint Admission Test for Masters (JAM) and GATE examinations, direct PhD admissions, and national research qualifications.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://gate.iitm.ac.in/' }
      ],
      jobs: [
        { company: 'National Testing Agency &middot; Central Universities / DU / JNU', title: 'Assistant Professor / UGC NET Qualified Doctoral Fellow', location: 'On-site &middot; ₹80,000–₹1,45,000/mo (UGC Scale)', match: '98% match', applyUrl: 'https://ugcnet.nta.nic.in/' },
        { company: 'National Testing Agency &middot; CSIR / IISc / Science Labs', title: 'CSIR NET Qualified Senior Research Fellow / Scientist', location: 'On-site &middot; ₹75,000–₹1,35,000/mo + Perks', match: '97% match', applyUrl: 'https://csirnet.nta.nic.in/' },
        { company: 'CSIR Human Resource Development Group (HRDG) &middot; National Labs', title: 'CSIR Senior Research Fellow (SRF) & Research Associate (RA)', location: 'On-site &middot; Govt Research Fellowship Pay Scale', match: '96% match', applyUrl: 'https://csirhrdg.res.in/Home/Index/1' },
        { company: 'IIT Bombay / IIT Madras / IISc &middot; PMRF Scheme', title: 'Prime Minister\'s Research Fellow (PMRF) & Doctoral Engineering Scholar', location: 'On-site &middot; ₹80,000–₹1,30,000/mo Research Stipend', match: '96% match', applyUrl: 'https://gate.iitb.ac.in/' },
        { company: 'Maharatna PSUs & ISRO / BARC &middot; National Recruitment', title: 'Executive Engineer & Scientist C (Direct Recruitment via GATE / JAM Score)', location: 'On-site &middot; Grade A Pay Scale (₹14L–₹24L/yr)', match: '95% match', applyUrl: 'https://gate.iitm.ac.in/' }
      ],
      videos: [
        { title: 'Complete Guide: UGC NET, CSIR NET, GATE & JAM for Every PhD Candidate', desc: `Master comparison and preparation roadmap for securing top rank and JRF/PMRF fellowships across India.`, lang: 'HI/EN', meta: 'YouTube &middot; 30 min', videoUrl: 'https://www.youtube.com/results?search_query=ugc+net+csir+net+gate+jam+phd+roadmap' },
        { title: 'How to Secure Research Grants via CSIR HRDG & PMRF at IITs/IISc', desc: `Step-by-step application and interview clearance guide for government doctoral funding.`, lang: 'EN', meta: 'YouTube &middot; 25 min', videoUrl: 'https://www.youtube.com/results?search_query=csir+hrdg+pmrf+research+grant+application' }
      ],
      mindmap: [
        { label: `Master / PhD Candidate`, x: 0.08, y: 0.5, step: 'Exams: NET / GATE / JAM' },
        { label: 'JRF / PMRF Fellowship', x: 0.32, y: 0.3, step: 'UGC / CSIR / IIT Admissions' },
        { label: 'CSIR HRDG / Scopus', x: 0.58, y: 0.5, step: 'Lab Grants & Publishing' },
        { label: 'Tenured Prof / Scientist', x: 0.88, y: 0.5, step: 'Target Pay: ₹20L–₹35L+/yr' }
      ]
    };
  }

  // Branch 2.7: Humanities & Arts / Public Policy
  if (qLow.includes('ba degree') || /\bba\b/.test(qLow) || qLow.includes('b.a') || /\bma\b/.test(qLow) || qLow.includes('m.a') || qLow.includes('ma degree') || qLow.includes('arts') || qLow.includes('history') || qLow.includes('english') || qLow.includes('humanities') || qLow.includes('literature') || qLow.includes('sociology') || qLow.includes('bengali') || qLow.includes('hindi') || qLow.includes('sanskrit') || qLow.includes('tamil') || qLow.includes('telugu') || qLow.includes('malayalam') || qLow.includes('urdu') || qLow.includes('gujarati') || qLow.includes('marathi') || qLow.includes('punjabi') || qLow.includes('odia') || qLow.includes('assamese') || qLow.includes('kannada') || qLow.includes('philosophy') || qLow.includes('political science') || qLow.includes('psychology') || qLow.includes('fine arts') || qLow.includes('mass communication') || qLow.includes('journalism') || qLow.includes('social work') || /\bmsw\b/.test(qLow) || category === 'humanities_arts') {
    const roleTitle = `Public Policy Analyst & Social Research Lead (${degree} Graduate - ${candidateName})`;
    const bioText = `Hello ${candidateName}! Congratulations on completing your **${degree}**. A strong background in humanities & languages equips you with critical thinking, socio-economic research capabilities, and advanced communication prowess. To transition directly into high-paying governance, media, translation, and corporate policy advisory roles (**₹6L–₹15L / yr** / **$55,000–$95,000 global**), your exact right next step is verifying degree norms via AICTE and UGC government portals and specializing in Public Policy Analysis.`;
    return {
      officialPortal: {
        name: 'AICTE and UGC Government Portal',
        url: 'https://www.ugc.gov.in/',
        desc: 'All India Council for Technical Education (https://www.aicte-india.org/) & University Grants Commission (https://www.ugc.gov.in/) Higher Education Gateway',
        status: portalVerification.status,
        latency: portalVerification.latency,
        verified: portalVerification.verified
      },
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: roleTitle,
      bio: bioText,
      marketVal: '₹6L – ₹15L / yr ($55,000–$95,000 Global Standard)',
      marketVal6m: '₹10L / yr ($75K+ Public Policy Cert)',
      marketVal2y: '₹20L+ / yr ($120K+ Senior Policy Consultant / IAS Track)',
      skills: [
        'Public Policy Analysis & Governance Frameworks',
        'Advanced Written & Verbal Executive Communication',
        'Socio-Economic Research & Demographic Analytics',
        'Constitutional Law & Administrative Procedures',
        'Digital Media Management & Editorial Operations'
      ],
      matches: [
        { title: 'Public Policy Research Analyst (@ NITI Aayog / Think Tanks)', match: '98%' },
        { title: 'Higher Education & Civil Administration Officer (AICTE / UGC Verified)', match: '96%' },
        { title: 'Senior Editorial & Communications Lead', match: '95%' }
      ],
      milestones: [
        { title: 'Verify Degree Equivalence & Norms on AICTE (aicte-india.org) and UGC (ugc.gov.in)', due: 'Weeks 1–3' },
        { title: 'Complete Public Policy & Data Communication Specialization', due: 'Weeks 4–8' },
        { title: 'Secure Corporate Policy / Media or Civil Administration Track', due: 'Weeks 9–12' }
      ],
      nextStep: 'See AICTE and UGC government portal (https://www.aicte-india.org/ and https://www.ugc.gov.in/) to verify your degree norms, explore higher education scholarships, and apply for high-salary public policy and executive roles right away.',
      courses: [
        { meta: 'AICTE Official Portal &middot; Govt Gateway', title: 'AICTE Higher Education & Vocational Curricula Portal', desc: 'Direct access to All India Council for Technical Education guidelines, innovation initiatives, and vocational training frameworks.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte-india.org/' },
        { meta: 'UGC Official Gateway &middot; Govt Portal', title: 'UGC Higher Education & Civil Services Norms', desc: 'Verify degree equivalence and explore official higher education scholarship and research grants.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
        { meta: 'Coursera / LSE &middot; 6 weeks', title: 'Public Policy & Economics Specialization', desc: 'Learn policy formulation, institutional economics, and governance structures from London School of Economics.', rating: '4.8 &star; (40K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=public+policy+specialization' }
      ],
      jobs: [
        { company: 'NITI Aayog / Think Tanks &middot; New Delhi / Hybrid', title: 'Public Policy Research Analyst', location: 'Hybrid &middot; ₹8L–₹16L / yr', match: '98% match', applyUrl: 'https://www.ugc.gov.in/' },
        { company: 'Global Media & Communications Corp &middot; Mumbai / Bengaluru', title: 'Senior Editorial & Communications Lead', location: 'Hybrid &middot; ₹9L–₹18L / yr', match: '95% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Public+Policy+Analyst' }
      ],
      videos: [
        { title: 'Best High-Salary Career Options after BA (Bachelor of Arts) Degree', desc: 'Top 10 career paths for BA graduates in public policy, civil services, corporate analytics, and journalism.', lang: 'HI/EN', meta: 'YouTube &middot; 20 min', videoUrl: 'https://www.youtube.com/results?search_query=best+careers+after+BA+degree+high+salary' }
      ],
      mindmap: [
        { label: 'BA Humanities', x: 0.08, y: 0.5, step: 'Analytical Communication' },
        { label: 'Policy & Analytics', x: 0.32, y: 0.3, step: 'UGC / Think Tank Prep' },
        { label: 'Corporate / Govt Track', x: 0.58, y: 0.5, step: 'Leadership & Administration' },
        { label: 'Senior Policy Lead', x: 0.88, y: 0.5, step: 'Target Pay: ₹12L–₹24L/yr' }
      ]
    };
  }

  // Branch 2.8: Commerce & Financial Analysis
  if (qLow.includes('commerce') || qLow.includes('b.com') || qLow.includes('bcom') || qLow.includes('chartered accountant') || qLow.includes('finance') || category === 'commerce_finance') {
    const roleTitle = `Financial Analyst & Corporate Accounting Lead (${degree} Graduate - ${candidateName})`;
    const bioText = `Hello ${candidateName}! Congratulations on your background in **${degree || 'Commerce & Finance'}**. Your numerical fluency in taxation, corporate auditing, and financial accounting forms the backbone of global business. To jump into top-tier financial controller and investment banking advisory roles (**₹8L–₹20L / yr** / **$65,000–$115,000 global**), your exact right next step is mastering Financial Spreadsheet Modeling, SAP FICO ERP, and international auditing standards.`;
    return {
      officialPortal: portalVerification,
      aiRoutedTier: detectedTier,
      aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
      role: roleTitle,
      bio: bioText,
      marketVal: '₹8L – ₹20L / yr ($65,000–$115,000 Global Standard)',
      marketVal6m: '₹12L / yr ($85K+ CFA / CA Inter)',
      marketVal2y: '₹25L+ / yr ($140K+ Senior Financial Controller)',
      skills: [
        'Financial Statement Auditing & Corporate Taxation (GST/IFRS)',
        'Investment Valuation & Financial Modeling (Excel / Python for Finance)',
        'Regulatory Compliance & Risk Governance',
        'Corporate Accounting & ERP Systems (SAP FICO / Tally Prime)',
        'Strategic Financial Management & Capital Budgeting'
      ],
      matches: [
        { title: 'Financial Advisory & Audit Specialist (@ Big-4)', match: '98%' },
        { title: 'Senior Investment & Valuation Analyst', match: '96%' },
        { title: 'Corporate ERP & Accounting Controller', match: '94%' }
      ],
      milestones: [
        { title: 'Verify ICAI / UGC Credits & Master Advanced Financial Modeling', due: 'Weeks 1–3' },
        { title: 'Complete SAP FICO & Investment Valuation Case Studies', due: 'Weeks 4–8' },
        { title: 'Apply to Big-4 Audit / Investment Banking & Corporate Finance Tracks', due: 'Weeks 9–12' }
      ],
      nextStep: `Enroll in Wharton's Business Financial Modeling course and apply directly to Big-4 audit roles.`,
      courses: [
        { meta: 'UGC / ICAI Official &middot; Govt Portal', title: 'ICAI & UGC Commerce Accreditation Gateway', desc: 'Official portal for accounting norms, chartered accountant syllabus, and higher education recognition.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
        { meta: 'Coursera / Wharton &middot; 8 weeks', title: 'Business and Financial Modeling Specialization', desc: 'Master quantitative modeling, spreadsheet decision support, and corporate valuation.', rating: '4.9 &star; (80K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=financial+modeling+specialization' }
      ],
      jobs: [
        { company: 'Big-4 (Deloitte / PwC / EY / KPMG) &middot; India / Global', title: 'Financial Advisory & Audit Specialist', location: 'Hybrid &middot; ₹9L–₹18L / yr', match: '98% match', applyUrl: 'https://www.ugc.gov.in/' },
        { company: 'Investment Banking & Corp Finance &middot; Mumbai / Bengaluru', title: 'Senior Financial Analyst', location: 'Hybrid &middot; ₹12L–₹24L / yr ($90K–$120K)', match: '96% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Financial+Analyst' }
      ],
      videos: [
        { title: 'Complete Roadmap after B.Com / CA / Commerce (High Salary Options)', desc: 'Detailed comparison of CA, CFA, MBA Finance, and Investment Banking roles.', lang: 'HI/EN', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=career+options+after+bcom+high+salary+roadmap' }
      ],
      mindmap: [
        { label: 'Commerce Degree', x: 0.08, y: 0.5, step: 'Accounting & Taxation' },
        { label: 'Financial Modeling', x: 0.32, y: 0.3, step: 'Excel, Python & SAP FICO' },
        { label: 'Big-4 / Valuation', x: 0.58, y: 0.5, step: 'Audit & Corporate Finance' },
        { label: 'Financial Controller', x: 0.88, y: 0.5, step: 'Target Pay: ₹15L–₹30L+/yr' }
      ]
    };
  }

  // Branch 3: Generic / Customized Candidate Field
  const genericRole = `${degree} Graduate & Career Aspirant (${candidateName})`;
  return {
    officialPortal: portalVerification,
    aiRoutedTier: detectedTier,
    aiRoutedModel: `Instant Candidate Profile Analyzer (${detectedTier.toUpperCase()})`,
    role: genericRole,
    bio: `Hello ${candidateName}! Based on your academic foundation in **${degree}**${internship ? ' and your practical internship with **' + internship + '**' : ''}, you have already established a crucial technical base. Your exact right next step is to align your qualifications directly with high-growth industry certifications on verified portals (${portalVerification.name}) and build portfolio projects to qualify for top-tier full-time opportunities immediately.`,
    marketVal: '₹8L – ₹18L / yr ($65,000–$110,000 Global Standard)',
    marketVal6m: '₹12L / yr ($80K)',
    marketVal2y: '₹24L+ / yr ($140K+ Senior Lead)',
    skills: [
      `${degree} Foundational Theory & Practice`,
      internship ? `${internship} Applied Corporate Protocols` : 'Applied Industry Methodologies',
      'Production-Ready Software / System Development',
      'Advanced Problem Solving & Analytics',
      'Cross-Functional Team Collaboration'
    ],
    matches: [
      { title: `Junior Specialist (${degree} Track)`, match: '98%' },
      { title: `Associate Engineer / Analyst`, match: '95%' }
    ],
    milestones: [
      { title: `Verify Curriculum & Credits on ${portalVerification.name}`, due: 'Weeks 1–2' },
      { title: 'Complete Industry Capstone & Advanced Specialization', due: 'Weeks 3–6' },
      { title: 'Direct Corporate Application & Interview Mastery', due: 'Weeks 7–10' }
    ],
    nextStep: `Check ${portalVerification.name} guidelines and enroll in advanced professional certifications to bridge your ${degree} into a high-paying corporate lead role.`,
    courses: [
      { meta: `${portalVerification.name} &middot; Official Gateway`, title: `${portalVerification.name} Curriculum & Norms`, desc: `Direct portal access for verified standards and certification pathways.`, rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: portalVerification.url },
      { meta: 'Coursera / Stanford &middot; 8 weeks', title: 'Algorithms & Problem Solving Specialization', desc: 'Master core computational methodologies and ace technical interviews.', rating: '4.9 &star; (60K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=algorithms+specialization' }
    ],
    jobs: [
      { company: `${internship || 'Tier-1 Tech'} &middot; India / Global`, title: `Associate Specialist / Graduate Engineer (${degree})`, location: 'Hybrid &middot; Top Tier Pay', match: '98% match', applyUrl: internship ? (internship.includes('TCS') ? 'https://www.tcs.com/careers' : (internship.includes('Infosys') ? 'https://www.infosys.com/careers' : 'https://www.linkedin.com/jobs/search/?keywords=' + encodeURIComponent(degree))) : 'https://www.linkedin.com/jobs/search/?keywords=' + encodeURIComponent(degree) },
      { company: 'Global Corporate Leaders &middot; Hybrid', title: `${degree} Specialist / Graduate Trainee`, location: 'Hybrid &middot; ₹8L–₹16L / yr', match: '95% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=' + encodeURIComponent(degree) }
    ],
    videos: [
      { title: `${degree} Complete Career Roadmap & High Salary Strategy`, desc: `Comprehensive step-by-step career guide for ${degree} graduates.`, lang: 'EN/HI', meta: 'YouTube &middot; 20 min', videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(degree + ' career roadmap')}` },
      { title: 'How to Crack Top Corporate Interviews as a Fresh Graduate', desc: 'Proven resume building, project selection, and interview strategies.', lang: 'EN/HI', meta: 'YouTube &middot; 16 min', videoUrl: 'https://www.youtube.com/results?search_query=fresh+graduate+job+interview+tips' }
    ],
    mindmap: [
      { label: `${degree} Completed`, x: 0.08, y: 0.5, step: `${internship || 'Practical Experience'}` },
      { label: 'Verified Certifications', x: 0.35, y: 0.3, step: `${portalVerification.name}` },
      { label: 'Industry Portfolio', x: 0.6, y: 0.5, step: 'Real-World Projects' },
      { label: 'Corporate Placement', x: 0.85, y: 0.5, step: 'Full-Time Lead Role' }
    ]
  };
}

module.exports = {
  detectCareerCategory,
  analyzeCandidateCareerProfile
};
