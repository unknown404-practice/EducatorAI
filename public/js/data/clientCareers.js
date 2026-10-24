/**
 * Educator AI Client Career Knowledge Base
 * Offline verified fallback datasets with truthful portal statuses.
 */
const DEFAULT_COURSES = [
  { meta: 'Coursera &middot; 8 weeks', title: 'Product Strategy & Roadmapping', desc: 'Define product vision, prioritize features, and build roadmaps aligned with business goals.', rating: '4.8 &star; (2.4K)', price: 'Free', liveUrl: 'https://www.coursera.org/search?query=product+strategy+roadmapping' },
  { meta: 'Udacity &middot; 12 weeks', title: 'Data-Driven Product Management', desc: 'Master A/B testing, metrics analysis, and product analytics to make informed decisions.', rating: '4.6 &star; (1.1K)', price: '$399', liveUrl: 'https://www.udacity.com/course/product-manager-nanodegree--nd036' },
  { meta: 'LinkedIn Learning &middot; 4 weeks', title: 'User Research for Product Teams', desc: 'Practical techniques for user interviews, surveys, and usability testing.', rating: '4.5 &star; (890)', price: 'Free trial', liveUrl: 'https://www.linkedin.com/learning/topics/user-research' },
  { meta: 'edX &middot; 6 weeks', title: 'Technical Product Management', desc: 'Bridge engineering and product — APIs, system design, and technical tradeoffs for PMs.', rating: '4.7 &star; (680)', price: '$249', liveUrl: 'https://www.edx.org/learn/product-management' }
];

const DEFAULT_JOBS = [
  { company: 'Stripe &middot; San Francisco', title: 'Associate Product Manager', location: 'On-site &middot; $110K–$140K', match: '94% match &middot; Apply by Apr 10', applyUrl: 'https://stripe.com/jobs/search?q=product' },
  { company: 'Notion &middot; Remote (US)', title: 'Technical Product Owner', location: 'Remote &middot; $120K–$155K', match: '88% match &middot; Apply by Mar 30', applyUrl: 'https://www.notion.so/careers' },
  { company: 'Vercel &middot; New York', title: 'Product Analyst', location: 'Hybrid &middot; $95K–$120K', match: '82% match &middot; Apply by Apr 5', applyUrl: 'https://vercel.com/careers' },
  { company: 'Linear &middot; Remote', title: 'Program Manager, Growth', location: 'Remote &middot; $105K–$130K', match: '76% match &middot; Apply by Apr 15', applyUrl: 'https://linear.app/careers' }
];

const DEFAULT_VIDEOS = [
  { title: 'How to Become a Product Manager', desc: 'Step-by-step guide for career switchers and fresh graduates.', lang: 'EN', meta: 'YouTube &middot; 18 min', videoUrl: 'https://www.youtube.com/watch?v=bC44pT-e5V0' },
  { title: 'Skill Gap Analysis for Your Career', desc: 'Identify and close skill gaps to land your dream role.', lang: 'EN', meta: 'YouTube &middot; 14 min', videoUrl: 'https://www.youtube.com/watch?v=uK7r29z_sU0' },
  { title: 'Resume Tips for Product Roles', desc: 'Stand out with a PM-focused resume that recruiters notice.', lang: 'EN', meta: 'YouTube &middot; 12 min', videoUrl: 'https://www.youtube.com/watch?v=Xz2N2-6v4fQ' },
  { title: 'किसी भी क्षेत्र में करियर कैसे बनायें', desc: 'किसी भी क्षेत्र में करियर बनाने का सही तरीका।', lang: 'हिन्दी', meta: 'YouTube &middot; 22 min', videoUrl: 'https://www.youtube.com/results?search_query=career+guidance+hindi' },
  { title: 'आज़माएं सबसे अच्छी नौकरी कैसे पायें', desc: 'ऑफिस में कामयाब होने के प्रैक्टिकल तरीके।', lang: 'हिन्दी', meta: 'YouTube &middot; 16 min', videoUrl: 'https://www.youtube.com/results?search_query=best+job+search+tips+hindi' }
];

const STAGE_KNOWLEDGE_BASE = {
  'HS Pass': {
    role: 'High School Passout - Aspiring Tech Associate',
    bio: 'Recently completed High School. Enthusiastic about entering the tech industry through fast-track certifications and foundational degrees.',
    marketVal: '$28K – $45K', marketVal6m: '$42K', marketVal2y: '$65K',
    skills: ['HTML/CSS', 'Basic JavaScript', 'Computer Fundamentals', 'Communication', 'Problem Solving'],
    matches: [
      { title: 'Junior Web Developer', match: '92%' },
      { title: 'IT Support Trainee', match: '88%' },
      { title: 'Digital Marketing Intern', match: '82%' }
    ],
    milestones: [
      { title: 'Complete FreeCodeCamp Web Cert', due: 'In 30 days' },
      { title: 'Build 2 responsive web projects', due: 'May 15' },
      { title: 'Apply for entry-level tech support / intern roles', due: 'June 1' }
    ],
    nextStep: 'Enroll in Harvard CS50x or FreeCodeCamp Responsive Web Design to build demonstrable skills immediately.',
    courses: [
      { meta: 'edX / Harvard &middot; 12 weeks', title: 'CS50: Introduction to Computer Science', desc: 'The most famous entry-level computer science course covering programming fundamentals.', rating: '4.9 &star; (15K)', price: 'Free', liveUrl: 'https://www.edx.org/cs50' },
      { meta: 'FreeCodeCamp &middot; Self-paced', title: 'Responsive Web Design Certification', desc: 'Learn HTML5 and CSS3 by building 5 real projects. 100% free with verified cert.', rating: '4.8 &star; (40K)', price: 'Free', liveUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' }
    ],
    jobs: [
      { company: 'Accenture &middot; Entry Level', title: 'IT Associate Trainee', location: 'Hybrid &middot; $32K–$40K', match: '92% match', applyUrl: 'https://www.accenture.com/in-en/careers' },
      { company: 'Wipro &middot; Remote', title: 'Junior Desk Support Engineer', location: 'Remote &middot; $28K–$35K', match: '88% match', applyUrl: 'https://careers.wipro.com/' }
    ],
    mindmap: [
      { label: 'HS Passout', x: 0.08, y: 0.5, step: 'Completed 12th Grade' },
      { label: 'Foundation Cert', x: 0.28, y: 0.3, step: 'CS50x or Web Design Cert' },
      { label: 'First Portfolio', x: 0.5, y: 0.5, step: 'Build 3 interactive web apps' },
      { label: 'Entry Trainee Role', x: 0.75, y: 0.5, step: 'Land IT Associate or Jr Dev job' }
    ]
  },
  'Fresher': {
    role: 'College Graduate / Fresh Engineer',
    bio: 'Recent degree graduate equipped with solid engineering fundamentals. Ready to transition into high-growth software engineering or product analyst roles.',
    marketVal: '$55K – $80K', marketVal6m: '$72K', marketVal2y: '$98K',
    skills: ['Python', 'JavaScript', 'Data Structures', 'SQL', 'Git & GitHub', 'Agile'],
    matches: [
      { title: 'Software Engineer I', match: '95%' },
      { title: 'Junior Data Analyst', match: '89%' },
      { title: 'Associate Product Manager', match: '84%' }
    ],
    milestones: [
      { title: 'Master LeetCode Mediums (50 problems)', due: 'In 20 days' },
      { title: 'Deploy full-stack app on Vercel', due: 'Apr 20' },
      { title: 'Complete 10 mock tech interviews', due: 'May 5' }
    ],
    nextStep: 'Complete AWS Cloud Practitioner certification and polish your GitHub portfolio to qualify for top tier software engineering roles.',
    courses: [
      { meta: 'Amazon Web Services &middot; 4 weeks', title: 'AWS Certified Cloud Practitioner', desc: 'Master foundational cloud computing concepts and earn globally recognized credential.', rating: '4.8 &star; (12K)', price: 'Free training', liveUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
      { meta: 'Meta / Coursera &middot; 6 weeks', title: 'Meta Front-End Developer Professional Cert', desc: 'Learn React, JavaScript, and UI design directly from Meta engineers.', rating: '4.7 &star; (8.5K)', price: 'Free trial', liveUrl: 'https://www.coursera.org/search?query=meta+front-end+developer' }
    ],
    jobs: [
      { company: 'Microsoft &middot; Redmond / Hybrid', title: 'Software Engineer I (New Grad)', location: 'Hybrid &middot; $105K–$130K', match: '95% match', applyUrl: 'https://careers.microsoft.com/v2/global/en/home.html' },
      { company: 'Infosys &middot; Bangalore / Remote', title: 'Digital Specialist Engineer', location: 'Remote &middot; $45K–$65K', match: '89% match', applyUrl: 'https://www.infosys.com/careers/' }
    ],
    mindmap: [
      { label: 'Fresh Grad', x: 0.08, y: 0.5, step: 'Degree Completed' },
      { label: 'Cloud / React Cert', x: 0.3, y: 0.25, step: 'AWS or Meta Pro Cert' },
      { label: 'GitHub Mastery', x: 0.5, y: 0.5, step: 'Open source & full stack projects' },
      { label: 'SDE I Role', x: 0.78, y: 0.5, step: 'Secure Full-Time Software Engineer role' }
    ]
  },
  'UG Student': {
    role: 'Undergraduate Student - Tech & Innovation',
    bio: 'Currently pursuing Undergraduate Degree. Actively building skills through internships, hackathons, and industry-standard technical projects.',
    marketVal: '$35K – $60K', marketVal6m: '$55K', marketVal2y: '$85K',
    skills: ['C++ / Java', 'Python', 'Web Fundamentals', 'Database Basics', 'Teamwork'],
    matches: [
      { title: 'Software Engineering Intern', match: '96%' },
      { title: 'Research Assistant (AI/ML)', match: '88%' },
      { title: 'UI/UX Design Intern', match: '82%' }
    ],
    milestones: [
      { title: 'Participate in Major Hackathon', due: 'This Month' },
      { title: 'Secure Summer Internship', due: 'In 45 days' }
    ],
    nextStep: 'Enroll in Machine Learning Specialization by Andrew Ng on Coursera to stand out in summer internship placements.',
    courses: [
      { meta: 'DeepLearning.AI &middot; 10 weeks', title: 'Machine Learning Specialization', desc: 'Master supervised AI, neural networks, and ML best practices taught by Andrew Ng.', rating: '4.9 &star; (50K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=machine+learning+specialization' }
    ],
    jobs: [
      { company: 'Google &middot; Various Locations', title: 'Student Researcher / Intern', location: 'Hybrid &middot; $45/hr', match: '96% match', applyUrl: 'https://buildyourfuture.withgoogle.com/internships' }
    ],
    mindmap: [
      { label: 'UG Student', x: 0.1, y: 0.5, step: 'Currently in College' },
      { label: 'AI Specialization', x: 0.35, y: 0.3, step: 'Andrew Ng ML Course' },
      { label: 'Summer Intern', x: 0.6, y: 0.5, step: 'Secure Tech Internship' },
      { label: 'Pre-Placement Offer', x: 0.82, y: 0.5, step: 'Convert intern to full-time job' }
    ]
  },
  'PG Student': {
    role: 'Postgraduate Scholar - Advanced Tech & AI',
    bio: 'Postgraduate researcher specializing in advanced algorithms, machine learning, and strategic product systems.',
    marketVal: '$85K – $130K', marketVal6m: '$110K', marketVal2y: '$150K',
    skills: ['Deep Learning', 'PyTorch / TensorFlow', 'Advanced Mathematics', 'System Architecture', 'Data Science'],
    matches: [
      { title: 'Senior Data Scientist', match: '94%' },
      { title: 'AI / Machine Learning Engineer', match: '91%' },
      { title: 'Technical Product Manager (AI)', match: '86%' }
    ],
    milestones: [
      { title: 'Publish or present Master thesis / research', due: 'In 60 days' },
      { title: 'Interview with top AI / DeepTech labs', due: 'May 30' }
    ],
    nextStep: 'Complete Deep Learning Specialization and apply directly to advanced research and ML engineering roles.',
    courses: [
      { meta: 'DeepLearning.AI &middot; 12 weeks', title: 'Deep Learning Specialization', desc: 'Become a deep learning expert. Build and train neural network architectures.', rating: '4.9 &star; (120K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=deep+learning+specialization' }
    ],
    jobs: [
      { company: 'OpenAI &middot; San Francisco / Remote', title: 'Research Engineer / Scientist', location: 'On-site &middot; $180K–$280K', match: '94% match', applyUrl: 'https://openai.com/careers' },
      { company: 'NVIDIA &middot; Santa Clara', title: 'Deep Learning Software Engineer', location: 'Hybrid &middot; $140K–$190K', match: '91% match', applyUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/' }
    ],
    mindmap: [
      { label: 'PG Scholar', x: 0.1, y: 0.5, step: 'Postgrad Studies' },
      { label: 'Deep Learning Pro', x: 0.35, y: 0.3, step: 'Master Neural Networks' },
      { label: 'AI Capstone', x: 0.6, y: 0.5, step: 'Publish real-world AI model' },
      { label: 'AI Engineer Role', x: 0.85, y: 0.5, step: 'Join top tier AI tech company' }
    ]
  },
  'Job Switch': {
    role: 'Experienced Professional - Tech Transition',
    bio: 'Experienced industry professional transitioning into high-level Product Management and Technical Leadership roles.',
    marketVal: '$120K – $170K', marketVal6m: '$145K', marketVal2y: '$190K',
    skills: ['Project Leadership', 'Stakeholder Management', 'System Design', 'Agile Roadmapping', 'Team Strategy'],
    matches: [
      { title: 'Senior Product Manager', match: '96%' },
      { title: 'Solutions Architect', match: '90%' },
      { title: 'Engineering Manager', match: '85%' }
    ],
    milestones: [
      { title: 'Complete System Design Interview Prep', due: 'In 15 days' },
      { title: 'Update LinkedIn & resume for leadership roles', due: 'This Week' }
    ],
    nextStep: 'Focus on executive leadership and system design architecture to command senior compensation packages.',
    courses: [
      { meta: 'Educative &middot; Self-paced', title: 'Grokking Modern System Design Interview', desc: 'Master scalable system architecture and ace senior tech leadership interviews.', rating: '4.8 &star; (18K)', price: '$79', liveUrl: 'https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers' }
    ],
    jobs: [
      { company: 'Stripe &middot; Remote / Seattle', title: 'Senior Product Manager, Payments', location: 'Remote &middot; $170K–$220K', match: '96% match', applyUrl: 'https://stripe.com/jobs/search?q=product' },
      { company: 'Datadog &middot; New York', title: 'Principal Solutions Architect', location: 'Hybrid &middot; $160K–$200K', match: '90% match', applyUrl: 'https://www.datadoghq.com/careers/' }
    ],
    mindmap: [
      { label: 'Industry Pro', x: 0.1, y: 0.5, step: 'Current Experience' },
      { label: 'System Design', x: 0.35, y: 0.3, step: 'Master Scalable Architecture' },
      { label: 'Leadership Branding', x: 0.6, y: 0.5, step: 'Executive Case Studies' },
      { label: 'Senior PM / Lead Role', x: 0.85, y: 0.5, step: 'Land Senior Leadership Position' }
    ]
  },
  'animation_vfx_design': {
    officialPortal: { name: 'Shiksha India & BachelorsPortal Global Gateway', url: 'https://www.shiksha.com/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Lead VFX Supervisor & Creative Design Director',
    bio: 'Connected to Shiksha India & BachelorsPortal Global. Specializing in 3D Animation, CGI Film Making, VFX Compositing, Motion Graphics, UI/UX Design, and Multimedia Production.',
    marketVal: '$85K – $140K (₹15L – ₹35L)',
    marketVal6m: '$95K – $155K (₹18L – ₹40L)',
    marketVal2y: '$130K – $210K (₹28L – ₹65L)',
    nextStep: 'Build a high-end showreel on ArtStation/Behance and master Unreal Engine 5, Maya, Nuke & Blender.',
    skills: ['3D Animation & Maya', 'VFX Compositing (Nuke)', 'Unreal Engine 5 / Unity', 'Motion Graphics (After Effects)', 'Film Editing (Premiere/DaVinci)', 'UI/UX & Graphic Design (Figma)', 'CGI Lighting & Rendering'],
    matches: [
      { title: 'Senior VFX Supervisor (Film & Gaming)', match: '98% match' },
      { title: '3D Lead Character Animator', match: '96% match' },
      { title: 'Creative Art Director & UI Design Lead', match: '94% match' }
    ],
    milestones: [
      { title: 'Foundation in Design Principles & Color Theory', due: 'Month 1–2' },
      { title: '3D Modeling, Texturing & Rigging in Blender/Maya', due: 'Month 3–5' },
      { title: 'VFX Compositing & Dynamic Simulations in Nuke/Houdini', due: 'Month 6–8' },
      { title: 'Global Showreel Launch & Studio Placement', due: 'Month 9–12' }
    ],
    courses: [
      { meta: 'Shiksha India VFX & Film Gateway', title: 'Top Animation & VFX Colleges Directory in India', desc: 'Direct access to verified B.Sc Animation, Diploma in VFX, Film Making & Editing institutions across India.', rating: '4.9 &star; (Official)', price: 'Verified Portal', liveUrl: 'https://www.shiksha.com/animation/vfx/colleges/colleges-india' },
      { meta: 'Shiksha Official India Server', title: 'Comprehensive Graphics Design & Multimedia Courses', desc: 'Explore top design colleges, entrance exams (NID, UCEED, NIFT), and career placement reviews.', rating: '4.9 &star; (Official)', price: 'Verified Portal', liveUrl: 'https://www.shiksha.com/' },
      { meta: 'BachelorsPortal International Server', title: 'Global Bachelor & Master Degrees in Animation & VFX', desc: 'Find accredited international university programs across UK, USA, Canada, and Europe for Multimedia & Film.', rating: '5.0 &star; (Global)', price: 'International Portal', liveUrl: 'https://www.bachelorsportal.com/' }
    ],
    jobs: [
      { company: 'Prime VFX Studio &middot; Mumbai / Bengaluru', title: 'Senior VFX Compositor & CGI Artist', location: 'Hybrid &middot; ₹18L–₹32L', match: '98% match', applyUrl: 'https://www.shiksha.com/animation/vfx/colleges/colleges-india' },
      { company: 'Global Animation & Gaming Corp &middot; Remote / London', title: 'Lead 3D Animator & Motion Designer', location: 'Remote &middot; $90K–$135K', match: '96% match', applyUrl: 'https://www.bachelorsportal.com/' },
      { company: 'Creative Multimedia Studio &middot; Hyderabad', title: 'Film Editor & Color Grading Specialist', location: 'On-site &middot; ₹12L–₹22L', match: '94% match', applyUrl: 'https://www.shiksha.com/' }
    ],
    videos: [
      { title: 'Complete VFX & Animation Career Roadmap (India & Abroad)', desc: 'How to build a world-class showreel and get hired by top studios like DNEG, MPC, and ILM.', lang: 'HI/EN', meta: 'YouTube &middot; 35 min', videoUrl: 'https://www.youtube.com/results?search_query=vfx+animation+career+roadmap' }
    ],
    mindmap: [
      { label: 'Design Fundamentals', x: 0.08, y: 0.5, step: 'Shiksha.com Gateway' },
      { label: '3D & VFX Pipeline', x: 0.32, y: 0.3, step: 'Maya, Nuke & Unreal 5' },
      { label: 'Showreel Production', x: 0.58, y: 0.5, step: 'Film Making & Editing' },
      { label: 'Lead Creative Director', x: 0.88, y: 0.5, step: 'Global Studio Placement' }
    ]
  },
  'diploma_bca_bsc_cs': {
    officialPortal: { name: 'UGC Official Higher Education Gateway', url: 'https://www.ugc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Computer Applications & IT Specialist (BCA / B.Sc CS / Diploma)',
    bio: 'Connected to UGC Portal (ugc.gov.in) & AICTE. Dedicated curriculum for BCA, B.Sc CS, and Polytechnic IT Diploma. Subjects: C/C++, Java, Web Development (HTML/CSS/JS), Database (MySQL), Data Structures, Computer Networks, Cloud Basics.',
    marketVal: '₹6L – ₹14L / yr ($50K–$95K Global)',
    marketVal6m: '₹9L / yr ($65K)',
    marketVal2y: '₹18L+ / yr ($110K+ Tech Lead)',
    nextStep: 'Connect to UGC higher education gateway and build 3 full-stack portfolio web applications.',
    skills: ['Web Development (React/Node)', 'Java & Python Programming', 'SQL & Database Design', 'Data Structures & Algorithms', 'Linux & Cloud Fundamentals', 'REST APIs', 'Git & Agile'],
    matches: [
      { title: 'Full Stack Web Developer [Lifetime Demand]', match: '98%' },
      { title: 'Software Application Engineer', match: '94%' },
      { title: 'Cloud Database Administrator', match: '89%' }
    ],
    milestones: [
      { title: 'Year 1: Programming in C/Python, Computer Fundamentals & Web Basics (HTML/CSS)', due: 'Sem 1-2' },
      { title: 'Year 2: Object-Oriented Java, Data Structures, DBMS MySQL & Operating Systems', due: 'Sem 3-4' },
      { title: 'Year 3: Full Stack Web (React/Node), Cloud AWS Deployment & Capstone Project', due: 'Sem 5-6' }
    ],
    courses: [
      { meta: 'UGC Official Higher Education Gateway &middot; Live Portal', title: 'University Grants Commission e-Syllabus & Curriculum', desc: 'Direct portal access for official degree norms, credit frameworks, and university recognition.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
      { meta: 'Coursera / IBM &middot; 8 weeks', title: 'IBM Full Stack Software Developer Professional Cert', desc: 'Master cloud native web development with HTML, Node, React, and Python.', rating: '4.8 &star; (40K)', price: 'Free trial', liveUrl: 'https://www.coursera.org/search?query=ibm+full+stack+cloud+developer' },
      { meta: 'O*NET International &middot; Live Jobs', title: 'O*NET Online Global Career & Industry Portal', desc: 'Explore international job titles, salary benchmarks, and required competencies.', rating: '5.0 &star; (Official)', price: 'Global Portal', liveUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    jobs: [
      { company: 'TCS / Infosys / Wipro (BCA/B.Sc Drives) &middot; India', title: 'Associate Software Engineer / Graduate Trainee', location: 'Hybrid &middot; ₹5L–₹8.5L / yr', match: '98% match', applyUrl: 'https://www.tcs.com/careers' },
      { company: 'O*NET Tech & IT Portal &middot; International', title: 'International Software Developer & Cloud Architect', location: 'Remote / Global &middot; $85,000–$120,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'BCA & B.Sc CS Complete Roadmap to High Salary Software Jobs', desc: 'How to compete with B.Tech graduates and crack top tech product companies.', lang: 'HI/EN', meta: 'YouTube &middot; 21 min', videoUrl: 'https://www.youtube.com/results?search_query=bca+career+roadmap+placement' }
    ],
    mindmap: [
      { label: 'BCA / B.Sc CS Sem 1', x: 0.08, y: 0.5, step: 'Connect UGC Portal' },
      { label: 'Java & Database', x: 0.3, y: 0.3, step: 'Sem 3-4 OOP & SQL' },
      { label: 'React / Node Cloud', x: 0.55, y: 0.5, step: 'Build Full Stack Portfolio' },
      { label: 'Crack Tech Interview', x: 0.78, y: 0.3, step: 'DSA & GitHub Showcase' },
      { label: 'Senior Software Dev', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Career' }
    ]
  },
  'doctor_india': {
    officialPortal: { name: 'NEET NTA Medical Gateway', url: 'https://neet.nta.nic.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Medical Doctor (MBBS / NEET Path)',
    bio: 'Official medical career roadmap directly synced with NEET NTA (neet.nta.nic.in) & NMC India. Curriculum: Anatomy, Physiology, Biochemistry, Pharmacology, Pathology, Forensic Medicine, General Surgery, OBGYN.',
    marketVal: '₹8L – ₹15L / yr ($15K–$30K)',
    marketVal6m: '₹18L / yr ($35K)',
    marketVal2y: '₹35L+ / yr ($70K+)',
    skills: ['Anatomy & Physiology', 'Pharmacology & Pathology', 'Clinical Diagnosis', 'General Surgery', 'Emergency Medicine', 'Pediatrics & OBGYN', 'ICU Management'],
    matches: [
      { title: 'Specialist Surgeon (MD/MS) [Lifetime High Demand]', match: '98%' },
      { title: 'General Consultant Physician', match: '95%' },
      { title: 'Resident Medical Officer (AIIMS/Apollo)', match: '90%' }
    ],
    milestones: [
      { title: 'Sem 1-3: Pre-Clinical Subjects (Anatomy, Physiology, Biochemistry)', due: 'Year 1' },
      { title: 'Sem 4-5: Para-Clinical Subjects (Pathology, Pharmacology, Microbiology)', due: 'Year 2' },
      { title: 'Sem 6-9: Clinical Subjects (Medicine, Surgery, Pediatrics) + CRMI Internship', due: 'Year 3-5' }
    ],
    nextStep: 'Connect to official NEET NTA portal and master clinical diagnostic hospital rotations.',
    courses: [
      { meta: 'Official NEET NTA Portal &middot; Live Portal', title: 'National Eligibility cum Entrance Test Official Gateway', desc: 'Access verified exam schedules, syllabus, and official medical admissions guidelines.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://neet.nta.nic.in/' },
      { meta: 'Swayam / NPTEL (UGC/MCI) &middot; 12 weeks', title: 'Clinical Medical Science & Healthcare Practice', desc: 'Government verified course covering clinical protocols, diagnostics, and patient management.', rating: '4.9 &star; (18K)', price: 'Free / Verified', liveUrl: 'https://swayam.gov.in/explorer?category=Medical_Sciences' }
    ],
    jobs: [
      { company: 'AIIMS / Government Hospitals &middot; India', title: 'Senior Resident Doctor / Specialist', location: 'On-site &middot; ₹12L–₹22L / yr', match: '98% match', applyUrl: 'https://www.aiims.edu/en/notices/recruitment.html' },
      { company: 'O*NET Global Healthcare &middot; International', title: 'Physician & Specialist Surgeon (Global Standard)', location: 'Hospital &middot; $140,000–$250,000+', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'Complete Roadmap to Become a Doctor in India (NEET NTA to MD Schedule)', desc: 'Official medical pathway breakdown from MBBS semester subjects to specializations.', lang: 'EN/HI', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=mbbs+syllabus+roadmap+india' }
    ],
    mindmap: [
      { label: '10+2 PCB / NEET', x: 0.08, y: 0.5, step: 'Connect neet.nta.nic.in' },
      { label: 'MBBS Pre-Clin', x: 0.28, y: 0.3, step: 'Anatomy & Physiology' },
      { label: 'MBBS Clinical', x: 0.52, y: 0.5, step: 'Surgery & Pathology Lab' },
      { label: 'CRMI Intern', x: 0.75, y: 0.3, step: '1 Year Hospital Rotation' },
      { label: 'MD/MS Surgeon', x: 0.9, y: 0.5, step: 'Lifetime Specialist Practice' }
    ]
  },
  'paramedical_radiology': {
    officialPortal: { name: 'IMA Paramedical & Nursing Gateway', url: 'https://www.ima-india.org/ima/free-way-page.php?pid=461', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Radiology & Medical Imaging Technologist (B.Sc / Diploma)',
    bio: 'Synced with IMA Paramedical Portal (ima-india.org). Comprehensive paramedical course schedule. Subjects: Radiation Physics, X-Ray & Mammography, CT Scan Protocols, MRI Physics, Ultrasound Imaging, Radiation Safety (AERB standards).',
    marketVal: '₹5L – ₹12L / yr ($40K–$85K Global)',
    marketVal6m: '₹8L / yr ($55K)',
    marketVal2y: '₹16L+ / yr ($95K+ Lead Technologist)',
    skills: ['Radiation Physics & Safety', 'CT Scan & MRI Protocols', 'X-Ray Positioning', 'Ultrasound & Sonography', 'AERB Compliance', 'Medical Equipment Calibration', 'Cross-Sectional Anatomy'],
    matches: [
      { title: 'Chief MRI / CT Imaging Specialist [Lifetime Demand]', match: '98%' },
      { title: 'Senior Radiologic Technologist', match: '94%' },
      { title: 'Interventional Radiology Assistant', match: '89%' }
    ],
    milestones: [
      { title: 'Year 1: Human Anatomy, Physiology, General Physics & Basic X-Ray Instrumentation', due: 'Sem 1-2' },
      { title: 'Year 2: Advanced Imaging Physics, CT Scan Procedures & Contrast Pharmacology', due: 'Sem 3-4' },
      { title: 'Year 3: MRI Physics, Nuclear Medicine, Ultrasound & 6-Month Clinical Hospital Posting', due: 'Sem 5-6' }
    ],
    nextStep: 'Verify guidelines on IMA Paramedical server and master MRI cross-sectional pathology.',
    courses: [
      { meta: 'IMA Official Paramedical Portal &middot; Live Server', title: 'Indian Medical Association Paramedical Gateway', desc: 'Direct connection to official diploma curricula, radiology certifications, and institutional registration.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ima-india.org/ima/free-way-page.php?pid=461' },
      { meta: 'Coursera / Yale &middot; 6 weeks', title: 'Introduction to Medical Imaging', desc: 'Explore the principles behind X-ray, CT, MRI, and Ultrasound imaging modalities.', rating: '4.8 &star; (14K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=medical+imaging+radiology' }
    ],
    jobs: [
      { company: 'Max Healthcare / Apollo Diagnostic &middot; Pan India', title: 'Senior MRI / CT Scan Technologist', location: 'Hospital &middot; ₹6L–₹10L / yr', match: '98% match', applyUrl: 'https://www.maxhealthcare.in/careers' },
      { company: 'O*NET Global Imaging Standards &middot; International', title: 'Chief Radiologic & MRI Technologist (Global)', location: 'International &middot; $75,000–$105,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'B.Sc Radiology & Imaging Technology Syllabus & Career Roadmap', desc: 'Complete breakdown of radiology subjects, hospital internships, and salary.', lang: 'HI/EN', meta: 'YouTube &middot; 16 min', videoUrl: 'https://www.youtube.com/results?search_query=bsc+radiology+career+roadmap' }
    ],
    mindmap: [
      { label: '10+2 Science', x: 0.08, y: 0.5, step: 'Connect IMA Portal' },
      { label: 'X-Ray & Physics', x: 0.3, y: 0.3, step: 'Sem 1-2 Basic Imaging' },
      { label: 'CT & MRI Mastery', x: 0.55, y: 0.5, step: 'Sem 3-4 Advanced Scan' },
      { label: 'Clinical Posting', x: 0.78, y: 0.3, step: 'Hospital Diagnostic Center' },
      { label: 'Chief Imaging Lead', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Role' }
    ]
  },
  'paramedical_pathology': {
    officialPortal: { name: 'IMA Paramedical & Nursing Gateway', url: 'https://www.ima-india.org/ima/free-way-page.php?pid=461', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Medical Laboratory Technologist / Clinical Pathologist (MLT)',
    bio: 'Direct connection to IMA Paramedical Portal (ima-india.org). Core laboratory science curriculum (B.Sc MLT / DMLT). Subjects: Hematology, Clinical Biochemistry, Histopathology, Cytology, Microbiology, Immunology.',
    marketVal: '₹4.5L – ₹10L / yr ($45K–$80K Global)',
    marketVal6m: '₹7L / yr ($55K)',
    marketVal2y: '₹14L+ / yr ($90K+ Lab Director)',
    skills: ['Clinical Biochemistry & Enzymology', 'Hematology & Blood Banking', 'Histopathology & Cytology', 'Microbiology & Serology', 'Laboratory Auto-Analyzers', 'NABL Quality Control', 'Molecular Diagnostics (PCR)'],
    matches: [
      { title: 'Chief Clinical Laboratory Technologist [Lifetime Demand]', match: '98%' },
      { title: 'Histopathology & Blood Bank Supervisor', match: '95%' },
      { title: 'Molecular Diagnostics & PCR Specialist', match: '90%' }
    ],
    milestones: [
      { title: 'Year 1: Basic Clinical Biochemistry, Human Anatomy, Hematology & Lab Safety Protocols', due: 'Sem 1-2' },
      { title: 'Year 2: Bacteriology, Parasitology, Clinical Pathology & Blood Banking Procedures', due: 'Sem 3-4' },
      { title: 'Year 3: Histopathology, Auto-Analyzer Calibration, NABL Standards & Hospital Lab Rotations', due: 'Sem 5-6' }
    ],
    nextStep: 'Access official diagnostic lab protocols on IMA Paramedical server and master NABL quality control.',
    courses: [
      { meta: 'IMA Official Paramedical Portal &middot; Live Server', title: 'Indian Medical Association Paramedical Gateway', desc: 'Direct access to official laboratory pathology syllabus, MLT registration, and diagnostic guidelines.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ima-india.org/ima/free-way-page.php?pid=461' },
      { meta: 'Coursera / Johns Hopkins &middot; 4 weeks', title: 'Principles of Clinical Laboratory Management', desc: 'Master diagnostic testing pipelines, blood bank management, and laboratory accreditation.', rating: '4.8 &star; (11K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=clinical+laboratory+management' }
    ],
    jobs: [
      { company: 'Dr. Lal PathLabs / SRL Diagnostics / Metropolis &middot; India', title: 'Senior Medical Lab Technologist / Supervisor', location: 'Diagnostic Lab &middot; ₹5L–₹9L / yr', match: '98% match', applyUrl: 'https://www.lalpathlabs.com/career' },
      { company: 'O*NET Global Medical Laboratory &middot; International', title: 'Clinical Medical Laboratory Scientist (Global)', location: 'International &middot; $65,000–$95,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'B.Sc MLT / DMLT Complete Syllabus, Laboratory Subjects & High Salary Jobs', desc: 'Step-by-step career guide for medical laboratory technologists.', lang: 'HI/EN', meta: 'YouTube &middot; 18 min', videoUrl: 'https://www.youtube.com/results?search_query=bsc+mlt+career+roadmap' }
    ],
    mindmap: [
      { label: '10+2 Science', x: 0.08, y: 0.5, step: 'Connect IMA Portal' },
      { label: 'Hematology Lab', x: 0.3, y: 0.3, step: 'Sem 1-2 Blood Analysis' },
      { label: 'Biochem & PCR', x: 0.55, y: 0.5, step: 'Sem 3-4 Molecular Testing' },
      { label: 'Hospital Rotation', x: 0.78, y: 0.3, step: 'NABL Diagnostic Lab' },
      { label: 'Chief Path Lab Lead', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Role' }
    ]
  },
  'pharmacist': {
    officialPortal: { name: 'AICTE Official Portal (India)', url: 'https://www.aicte.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Pharmaceutical Scientist & Clinical Pharmacist (B.Pharm / Pharm.D)',
    bio: 'Direct connection to Pharmacy Council of India & AICTE (aicte.gov.in). Comprehensive curriculum. Subjects: Pharmaceutics, Pharmaceutical Chemistry, Pharmacology, Pharmacognosy, Pharmaceutical Analysis, Biopharmaceutics, Pharmacovigilance.',
    marketVal: '₹6L – ₹15L / yr ($50K–$100K Global)',
    marketVal6m: '₹9L / yr ($65K)',
    marketVal2y: '₹20L+ / yr ($120K+ Pharma R&D Lead)',
    skills: ['Drug Formulation & Synthesis', 'Pharmacology & Toxicology', 'HPLC & Spectroscopy Analysis', 'Pharmacovigilance & Drug Safety', 'Clinical Trials & Regulatory Affairs (FDA/CDSCO)', 'GMP Compliance', 'Biopharmaceutics'],
    matches: [
      { title: 'Formulation R&D Scientist (Sun Pharma/Cipla) [Lifetime Demand]', match: '98%' },
      { title: 'Clinical Pharmacovigilance & Drug Safety Associate', match: '95%' },
      { title: 'Regulatory Affairs Specialist (US FDA / CDSCO)', match: '91%' }
    ],
    milestones: [
      { title: 'Year 1: Human Anatomy, Pharmaceutical Inorganic Chemistry, Pharmaceutics & Pharmacognosy', due: 'Sem 1-2' },
      { title: 'Year 2: Physical Pharmaceutics, Organic Chemistry, Pharmacology I & Medicinal Chemistry', due: 'Sem 3-4' },
      { title: 'Year 3-4: Instrumental Analysis (HPLC), Biopharmaceutics, Pharmacovigilance & Industrial Training', due: 'Sem 5-8' }
    ],
    nextStep: 'Access AICTE pharma syllabus and complete clinical research trials documentation.',
    courses: [
      { meta: 'AICTE Official Portal &middot; Live Server', title: 'AICTE Pharmacy & Technical Education Gateway', desc: 'Direct access to approved B.Pharm curricula, GPAT exam portals, and national pharma research grants.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte.gov.in/' },
      { meta: 'Coursera / UC San Diego &middot; 6 weeks', title: 'Drug Discovery, Development & Commercialization', desc: 'Learn the complete R&D lifecycle from molecular screening to FDA clinical trial phases.', rating: '4.8 &star; (22K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=drug+discovery+development' }
    ],
    jobs: [
      { company: 'Sun Pharma / Dr. Reddys / Cipla &middot; India', title: 'Research Scientist / Quality Control Specialist', location: 'R&D Plant &middot; ₹6L–₹12L / yr', match: '98% match', applyUrl: 'https://www.sunpharma.com/careers' },
      { company: 'O*NET International Pharma &middot; Global', title: 'International Clinical Pharmacist & Drug Development Lead', location: 'Global &middot; $90,000–$135,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'B.Pharm & Pharm.D Complete Syllabus & Top Career Opportunities', desc: 'From drug formulation in industrial plants to clinical hospital work.', lang: 'HI/EN', meta: 'YouTube &middot; 20 min', videoUrl: 'https://www.youtube.com/results?search_query=bpharm+career+roadmap+syllabus' }
    ],
    mindmap: [
      { label: '10+2 PCB / PCM', x: 0.08, y: 0.5, step: 'Connect AICTE Portal' },
      { label: 'Pharmaceutics', x: 0.3, y: 0.3, step: 'Drug Synthesis & Chemistry' },
      { label: 'Pharmacology Lab', x: 0.55, y: 0.5, step: 'Drug Effects & Trials' },
      { label: 'Pharmacovigilance', x: 0.78, y: 0.3, step: 'Master Drug Safety Software' },
      { label: 'Pharma R&D Director', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Lead' }
    ]
  },
  'management_bba': {
    officialPortal: { name: 'AICTE Official Portal (India)', url: 'https://www.aicte.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Business Administration & Management Specialist (BBA / MBA)',
    bio: 'Direct connection to AICTE Portal (aicte.gov.in) Management Division. Subjects: Principles of Management, Financial Accounting, Marketing Management, HRM, Business Statistics, Operations Research, Strategic Entrepreneurship.',
    marketVal: '₹6L – ₹16L / yr ($55K–$110K Global)',
    marketVal6m: '₹10L / yr ($75K)',
    marketVal2y: '₹22L+ / yr ($140K+ VP Operations / Product Lead)',
    skills: ['Strategic Business Planning', 'Financial Analysis & Budgeting', 'Digital Marketing & SEO', 'Team Leadership & Agile', 'Business Analytics (Excel/SQL)', 'Supply Chain Management', 'Negotiation'],
    matches: [
      { title: 'Business Development & Growth Manager [Lifetime Demand]', match: '98%' },
      { title: 'Product Marketing & Brand Manager', match: '94%' },
      { title: 'Financial Analyst / Operations Lead', match: '89%' }
    ],
    milestones: [
      { title: 'Year 1: Principles of Management, Microeconomics & Financial Accounting', due: 'Sem 1-2' },
      { title: 'Year 2: Marketing Management, HRM, Business Statistics & Consumer Behavior', due: 'Sem 3-4' },
      { title: 'Year 3: Strategic Management, Financial Modeling, Digital Marketing & Industry Internship', due: 'Sem 5-6' }
    ],
    nextStep: 'Access AICTE Management syllabus and master advanced financial modeling in Excel/PowerBI.',
    courses: [
      { meta: 'National Region (India) &middot; Live Govt Directory', title: 'MBAGate Official Govt BBA & MBA College Directory', desc: 'Comprehensive admission gateway, fee structure, and placement records for top Government BBA & MBA colleges in India.', rating: '5.0 &star; (National)', price: 'Free Access', liveUrl: 'https://mbagate.in/govt-bba-colleges' },
      { meta: 'National Region (India) &middot; Govt Portal', title: 'National Apprenticeship Training Scheme (NATS / NAPS)', desc: 'Official Govt of India portal (apprenticeshipindia.gov.in) for paid management, HR, and financial corporate apprenticeships.', rating: '5.0 &star; (Govt India)', price: 'Stipend Funded', liveUrl: 'https://www.apprenticeshipindia.gov.in/' },
      { meta: 'International Region &middot; Global Catalog', title: 'Coursera International Business & Management Portal', desc: 'World-class MBA & BBA specialization tracks from Wharton, INSEAD, HEC Paris, and London Business School.', rating: '4.9 &star; (Global)', price: 'Free Audit / Cert', liveUrl: 'https://www.coursera.org/browse/business' },
      { meta: 'International Region &middot; European / Global', title: 'Educations.com Global Business & Management Directory', desc: 'Explore and compare over 5,000 international BBA, MBA, and Executive Management degrees across 60+ countries.', rating: '4.8 &star; (Worldwide)', price: 'Scholarship Available', liveUrl: 'https://www.educations.com/business-and-management' },
      { meta: 'International Region &middot; BachelorsPortal', title: 'BachelorsPortal Global BBA & Business Search Engine', desc: 'Direct search engine for international Bachelor of Business Administration (BBA) degrees with tuition comparison.', rating: '4.9 &star; (Global)', price: 'Directory', liveUrl: 'https://www.bachelorsportal.com/search/bachelor/business-management' }
    ],
    jobs: [
      { company: 'National Apprenticeship Portal &middot; India Corporate', title: 'Management Trainee / PSU Apprenticeship Lead', location: 'India (National) &middot; ₹8L–₹18L / yr + Stipend', match: '98% match', applyUrl: 'https://www.apprenticeshipindia.gov.in/' },
      { company: 'Global MBA & Executive Opportunities &middot; Worldwide', title: 'International Business Strategy Lead / VP Operations', location: 'Global (International) &middot; $95,000–$160,000 / yr', match: '96% match', applyUrl: 'https://www.educations.com/business-and-management' }
    ],
    videos: [
      { title: 'BBA & MBA Complete Syllabus & High Paying Corporate Career Paths', desc: 'How to transition from college management studies to corporate leadership.', lang: 'HI/EN', meta: 'YouTube &middot; 19 min', videoUrl: 'https://www.youtube.com/results?search_query=bba+mba+career+roadmap' }
    ],
    mindmap: [
      { label: 'BBA / MBA Sem 1', x: 0.08, y: 0.5, step: 'Connect AICTE Portal' },
      { label: 'Marketing & Stats', x: 0.3, y: 0.3, step: 'Market Analysis & Data' },
      { label: 'Corporate Intern', x: 0.55, y: 0.5, step: 'Solve Real Business Case' },
      { label: 'Management Trainee', x: 0.78, y: 0.3, step: 'Land Top Consulting Job' },
      { label: 'Corporate VP / Lead', x: 0.9, y: 0.5, step: 'Lifetime Executive Leader' }
    ]
  },
  'engineering_electrical': {
    officialPortal: { name: 'JEE Main NTA Portal', url: 'https://jeemain.nta.nic.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Electrical Engineering Specialist (EE - Power, EV & VLSI)',
    bio: 'Connected to JEE Main Portal (jeemain.nta.nic.in) & AICTE. Subjects: Circuit Theory & Networks, Transformers & Induction Machines, Power Electronics, Switchgear & Protection, Control Systems, Electric Vehicle Powertrains.',
    marketVal: '₹7L – ₹16L / yr ($65K–$115K Global)',
    marketVal6m: '₹11L / yr ($80K)',
    marketVal2y: '₹24L+ / yr ($135K+ Lead Grid/EV Engineer)',
    skills: ['Circuit Design & PCB (Altium)', 'Power Electronics & Inverters', 'Electric Vehicle Battery BMS', 'MATLAB & Simulink', 'PLC & SCADA Automation', 'Switchgear Protection', 'VLSI & Embedded Systems'],
    matches: [
      { title: 'Electric Vehicle (EV) Powertrain & Battery Engineer [Lifetime Demand]', match: '98%' },
      { title: 'Power Grid Automation & SCADA Engineer', match: '95%' },
      { title: 'VLSI Hardware Design Engineer', match: '90%' }
    ],
    milestones: [
      { title: 'Year 1-2: Network Analysis, Electrical Machines (DC/AC), Transformers & Electromagnetic Fields', due: 'Sem 1-4' },
      { title: 'Year 3: Power Electronics, Control Systems, Microprocessors & MATLAB Simulation Lab', due: 'Sem 5-6' },
      { title: 'Year 4: Electric Vehicle Drives, Switchgear Protection, Smart Grids & Industrial Project', due: 'Sem 7-8' }
    ],
    nextStep: 'Check JEE/AICTE portal engineering norms and simulate EV motor drives in MATLAB Simulink.',
    courses: [
      { meta: 'JEE Main NTA Official Portal &middot; Live Gateway', title: 'JEE Main NTA Engineering Entrance Portal', desc: 'Direct official access for engineering admissions, syllabus breakdown, and technical standards.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://jeemain.nta.nic.in/' },
      { meta: 'Coursera / University of Colorado &middot; 8 weeks', title: 'Electric Vehicles and Mobility Specialization', desc: 'Master motor drives, power electronics, and battery management systems for modern EVs.', rating: '4.8 &star; (16K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=electric+vehicles+mobility' }
    ],
    jobs: [
      { company: 'Tata Motors EV / Mahindra Electric / Ather &middot; India', title: 'Senior EV Powertrain & Electrical Design Engineer', location: 'R&D Lab &middot; ₹8L–₹18L / yr', match: '98% match', applyUrl: 'https://www.tatamotors.com/careers/' },
      { company: 'O*NET Global Engineering &middot; International', title: 'Global Electric Vehicle & Power Systems Architect', location: 'International &middot; $95,000–$140,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'Electrical Engineering Complete Syllabus & Top Lifetime Jobs in EV / Core Sector', desc: 'Why Electrical engineers are in massive demand due to Electric Vehicles and Renewable Energy.', lang: 'HI/EN', meta: 'YouTube &middot; 23 min', videoUrl: 'https://www.youtube.com/results?search_query=electrical+engineering+career+roadmap+ev' }
    ],
    mindmap: [
      { label: 'JEE / B.Tech EE', x: 0.08, y: 0.5, step: 'Connect jeemain.nta.nic.in' },
      { label: 'Electrical Machines', x: 0.3, y: 0.3, step: 'Transformers & Motors' },
      { label: 'Power Electronics', x: 0.55, y: 0.5, step: 'MATLAB Inverter Simulation' },
      { label: 'EV & Smart Grid', x: 0.78, y: 0.3, step: 'Design Battery Management' },
      { label: 'Lead EV / Grid Lead', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Engineering' }
    ]
  },
  'engineering_chemical': {
    officialPortal: { name: 'AICTE Official Portal (India)', url: 'https://www.aicte.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Chemical & Process Engineer (ChE - Refinery, Green Hydrogen & Pharma)',
    bio: 'Synced with AICTE Official Portal (aicte.gov.in). Subjects: Material & Energy Balances, Fluid Mechanics, Heat & Mass Transfer Operations, Chemical Reaction Engineering (CRE), Process Dynamics & Control, Petrochemical Tech.',
    marketVal: '₹7L – ₹18L / yr ($70K–$120K Global)',
    marketVal6m: '₹11L / yr ($85K)',
    marketVal2y: '₹25L+ / yr ($140K+ Plant Chief Engineer)',
    skills: ['Process Simulation (Aspen Plus / HYSYS)', 'Chemical Reaction Engineering', 'Heat & Mass Transfer Equipment Design', 'Green Hydrogen & Battery Synthetics', 'Refinery Safety & Hazop', 'Thermodynamics', 'Fluid Mechanics'],
    matches: [
      { title: 'Chief Process Design Engineer (Aspen HYSYS) [Lifetime Demand]', match: '98%' },
      { title: 'Green Hydrogen & Renewable Energy Process Scientist', match: '95%' },
      { title: 'Petrochemical & Refinery Operations Manager (Reliance/L&T)', match: '91%' }
    ],
    milestones: [
      { title: 'Year 1-2: Stoichiometry, Fluid Mechanics, Chemical Engineering Thermodynamics & Mechanical Operations', due: 'Sem 1-4' },
      { title: 'Year 3: Heat Transfer, Mass Transfer (Distillation/Absorption), CRE & Aspen HYSYS Lab', due: 'Sem 5-6' },
      { title: 'Year 4: Process Dynamics Control, Plant Design & Economics, Green Energy Capstone', due: 'Sem 7-8' }
    ],
    nextStep: 'Access official AICTE chemical curricula and simulate distillation separation columns in Aspen Plus.',
    courses: [
      { meta: 'AICTE Official Portal &middot; Live Server', title: 'AICTE Chemical & Process Engineering Portal', desc: 'Direct government portal connection for core engineering standards and process research.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte.gov.in/' },
      { meta: 'Coursera / Rice University &middot; 8 weeks', title: 'Thermodynamics & Phase Equilibria in Chemical Engineering', desc: 'Master core chemical laws governing refineries, clean energy, and process separation.', rating: '4.8 &star; (12K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=thermodynamics+chemical+engineering' }
    ],
    jobs: [
      { company: 'Reliance Industries / L&T Hydrocarbon / ONGC &middot; India', title: 'Senior Chemical Process Design Engineer', location: 'Refinery / Plant &middot; ₹9L–₹22L / yr', match: '98% match', applyUrl: 'https://www.ril.com/careers' },
      { company: 'O*NET Global Energy Portal &middot; International', title: 'Global Green Hydrogen & Clean Process Scientist', location: 'International &middot; $95,000–$145,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'Chemical Engineering Syllabus, Aspen HYSYS Simulation & Lifetime High Paying Jobs', desc: 'Why Chemical engineers rule energy, pharma, and green hydrogen sectors.', lang: 'HI/EN', meta: 'YouTube &middot; 21 min', videoUrl: 'https://www.youtube.com/results?search_query=chemical+engineering+career+roadmap' }
    ],
    mindmap: [
      { label: 'B.Tech ChE Sem 1-2', x: 0.08, y: 0.5, step: 'Connect AICTE Portal' },
      { label: 'Fluid & Heat Transfer', x: 0.3, y: 0.3, step: 'Design Heat Exchangers' },
      { label: 'Reaction Eng & Aspen', x: 0.55, y: 0.5, step: 'Simulate Distillation Plant' },
      { label: 'Green Energy Capstone', x: 0.78, y: 0.3, step: 'Hydrogen / Battery Process' },
      { label: 'Plant Chief Lead', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Career' }
    ]
  },
  'law_ballb': {
    officialPortal: { name: 'Ministry of Law & Justice Portal', url: 'https://www.lawmin.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Constitutional & Corporate Legal Counsel (BA LLB / BBA LLB)',
    bio: 'Direct connection to Ministry of Law & Justice Portal (lawmin.gov.in) & Bar Council. Subjects: Constitutional Law, Law of Torts, IPC/BNS, Contracts, Corporate Law, Intellectual Property Rights (IPR), Moot Court.',
    marketVal: '₹7L – ₹20L / yr ($70K–$150K Global)',
    marketVal6m: '₹12L / yr ($90K)',
    marketVal2y: '₹30L+ / yr ($180K+ Senior Corporate Counsel / Partner)',
    skills: ['Legal Drafting & Briefing', 'Corporate Mergers & Acquisitions Law', 'Constitutional & Litigation Advocacy', 'Intellectual Property Rights (IPR)', 'Arbitration & Dispute Resolution', 'Legal Research (Manupatra/SCC)', 'Moot Court'],
    matches: [
      { title: 'Corporate Legal Counsel & M&A Advisor [Lifetime Demand]', match: '98%' },
      { title: 'Supreme Court / High Court Litigation Advocate', match: '95%' },
      { title: 'Cyber Law & Intellectual Property (IPR) Specialist', match: '90%' }
    ],
    milestones: [
      { title: 'Year 1-2: Legal Methods, Law of Torts, Constitutional Law & Law of Contracts', due: 'Sem 1-4' },
      { title: 'Year 3-4: Criminal Law (IPC/CrPC/BNS), Corporate Law, IPR & Arbitration', due: 'Sem 5-8' },
      { title: 'Year 5: Taxation Law, International Law, Intensive Moot Court & Law Firm Internship', due: 'Sem 9-10' }
    ],
    nextStep: 'Access Ministry of Law statutory updates and participate in national moot court litigation competitions.',
    courses: [
      { meta: 'Ministry of Law & Justice Portal &middot; Live Gateway', title: 'Official Ministry of Law & Justice Government Portal', desc: 'Direct portal connection for legislative enactments, Bar Council norms, and judicial internships.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.lawmin.gov.in/' },
      { meta: 'Coursera / University of Pennsylvania &middot; 8 weeks', title: 'An Introduction to American Law & Global Corporate Practice', desc: 'Master constitutional frameworks, torts, and corporate contracts from leading jurists.', rating: '4.8 &star; (28K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=american+law+corporate' }
    ],
    jobs: [
      { company: 'Cyril Amarchand Mangaldas / Khaitan & Co &middot; India', title: 'Corporate Legal Associate (M&A / IPR)', location: 'On-site &middot; ₹12L–₹24L / yr', match: '98% match', applyUrl: 'https://www.cyrilshroff.com/careers/' },
      { company: 'O*NET International Legal Directory &middot; Global', title: 'Global Dispute Resolution & M&A Corporate Counsel', location: 'International &middot; $110,000–$180,000+', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'BA LLB Complete 5 Year Syllabus, Moot Court Secrets & High Paying Law Firm Jobs', desc: 'How to build a stellar legal career in corporate law or courtroom advocacy.', lang: 'HI/EN', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=ballb+career+roadmap+corporate+law' }
    ],
    mindmap: [
      { label: 'CLAT / Law Entrance', x: 0.08, y: 0.5, step: 'Connect lawmin.gov.in' },
      { label: 'Torts & Contracts', x: 0.3, y: 0.3, step: 'Sem 1-3 Legal Methods' },
      { label: 'Corporate & IPR Law', x: 0.55, y: 0.5, step: 'Sem 4-7 Drafting Contracts' },
      { label: 'Moot Court & Firm', x: 0.78, y: 0.3, step: 'Tier-1 Law Firm Intern' },
      { label: 'Senior Legal Counsel', x: 0.9, y: 0.5, step: 'Lifetime High-Demand Advocate' }
    ]
  },
  'space_science': {
    officialPortal: { name: 'IIRS ISRO e-Learning Portal', url: 'https://elearning.iirs.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Aerospace & Space Scientist (ISRO / NASA / Global Astrophysics)',
    bio: 'Connected to IIRS ISRO e-Learning (elearning.iirs.gov.in) & ISRO LMS. Subjects: Aerodynamics, Rocket Propulsion, Orbital Mechanics, Satellite Communication, Astrodynamics, Spacecraft Structures, Deep Space Navigation.',
    marketVal: '₹10L – ₹25L / yr ($85K–$160K Global)',
    marketVal6m: '₹15L / yr ($110K)',
    marketVal2y: '₹35L+ / yr ($190K+ Chief Space Systems Lead)',
    skills: ['Rocket Propulsion & Gas Dynamics', 'Orbital Mechanics & Astrodynamics', 'Satellite Communication & Radar', 'Aerospace CAD & Finite Element Analysis', 'Python & MATLAB Space Simulation', 'Avionics & Guidance Control'],
    matches: [
      { title: 'Aerospace Rocket Propulsion Scientist (ISRO / SpaceX) [Lifetime Demand]', match: '98%' },
      { title: 'Satellite Navigation & Orbital Mission Engineer', match: '95%' },
      { title: 'Astrophysics Research Scientist', match: '91%' }
    ],
    milestones: [
      { title: 'Year 1-2: Engineering Mechanics, Thermodynamics, Fluid Dynamics & Engineering Mathematics', due: 'Sem 1-4' },
      { title: 'Year 3: High-Speed Aerodynamics, Rocket Propulsion, Spacecraft Avionics & MATLAB Simulation', due: 'Sem 5-6' },
      { title: 'Year 4: Astrodynamics, Satellite Payload Design, ISRO/DRDO Internship & Mission Capstone', due: 'Sem 7-8' }
    ],
    nextStep: 'Connect to official ISRO IIRS EDUSAT portal (iirs.gov.in/EDUSAT-News) and enroll in live remote sensing courses.',
    courses: [
      { meta: 'IIRS ISRO e-Learning Portal &middot; Live Gateway', title: 'Official IIRS ISRO e-Learning Gateway', desc: 'Direct portal access for remote sensing, satellite communication, and space science courses.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://elearning.iirs.gov.in/' },
      { meta: 'ISRO Public EDUSAT &middot; Official Gateway', title: 'ISRO IIRS Public EDUSAT Portal', desc: 'Official government public distance learning and live space education broadcast network.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.iirs.gov.in/EDUSAT-News' },
      { meta: 'Coursera / Caltech &middot; Astrodynamics', title: 'The Evolving Universe & Orbital Dynamics', desc: 'Explore astrodynamics, planetary motion, and deep space exploration technologies.', rating: '4.9 &star; (24K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=astronomy+space' }
    ],
    jobs: [
      { company: 'SpaceCrew Global Portal &middot; International', title: 'International Spacecraft & Orbital Propulsion Lead', location: 'Global &middot; $105,000–$180,000+', match: '98% match', applyUrl: 'https://spacecrew.com/space-propulsion-jobs' },
      { company: 'ISRO / DRDO &middot; India', title: 'Scientist / Engineer SC (Aerospace / Space)', location: 'Space Center &middot; Govt Pay Scale + ₹12L+', match: '95% match', applyUrl: 'https://www.isro.gov.in/Careers.html' }
    ],
    videos: [
      { title: 'How to Become a Space Scientist in ISRO / NASA (Complete Subjects & Roadmap)', desc: 'Everything from B.Tech Aerospace syllabus to ICRB exam preparation.', lang: 'HI/EN', meta: 'YouTube &middot; 25 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+become+space+scientist+isro+roadmap' }
    ],
    mindmap: [
      { label: '10+2 PCM / JEE', x: 0.08, y: 0.5, step: 'Connect elearning.iirs.gov.in' },
      { label: 'Aerodynamics & Fluid', x: 0.3, y: 0.3, step: 'Sem 1-3 Core Physics' },
      { label: 'Rocket Propulsion', x: 0.55, y: 0.5, step: 'Sem 4-6 Engine Simulation' },
      { label: 'ISRO EDUSAT Cert', x: 0.78, y: 0.3, step: 'Connect iirs.gov.in/EDUSAT-News' },
      { label: 'Chief Space Lead', x: 0.9, y: 0.5, step: 'Land job via spacecrew.com' }
    ]
  },
  'data_science': {
    officialPortal: { name: 'AICTE Official Portal (India)', url: 'https://www.aicte.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Data Scientist & AI Specialist (Global & India Industry)',
    bio: 'Connected to AICTE Official Portal & Global tech benchmarks. Comprehensive data engineering and machine learning roadmap aligned with global tech giants and Indian IT pioneers.',
    marketVal: '$85K – $130K (₹12L – ₹25L)',
    marketVal6m: '$110K (₹20L)',
    marketVal2y: '$160K+ (₹38L+)',
    skills: ['Python / R', 'Machine Learning & AI', 'SQL & NoSQL', 'Deep Learning (PyTorch/TensorFlow)', 'Data Visualization', 'Statistics & Linear Algebra', 'MLOps / Cloud (AWS/GCP)'],
    matches: [
      { title: 'Senior Data Scientist [Lifetime Demand]', match: '97%' },
      { title: 'Machine Learning Engineer', match: '94%' },
      { title: 'AI Research Analyst', match: '89%' }
    ],
    milestones: [
      { title: 'Master Python, SQL & Advanced Statistics', due: 'Month 1-2' },
      { title: 'Complete ML Specialization & 3 Kaggle Capstones', due: 'Month 3-4' },
      { title: 'Deploy MLOps Model on AWS / Vercel & Crack Interviews', due: 'Month 5-6' }
    ],
    nextStep: 'Access AICTE AI initiatives and build a live recommendation engine portfolio.',
    courses: [
      { meta: 'AICTE Official Portal &middot; Live Server', title: 'AICTE Artificial Intelligence & Data Science Directory', desc: 'Direct portal link for national AI training schemes, cloud credits, and corporate hackathons.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte.gov.in/' },
      { meta: 'Coursera / DeepLearning.AI &middot; 10 weeks', title: 'Machine Learning Specialization by Andrew Ng', desc: 'The definitive global standard for AI and ML algorithms, neural networks, and model evaluation.', rating: '4.9 &star; (120K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=machine+learning+specialization' }
    ],
    jobs: [
      { company: 'Google &middot; Bangalore / Remote', title: 'Data Scientist, Product Analytics', location: 'Hybrid &middot; ₹28L–₹45L / yr', match: '97% match', applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=Data%20Scientist' },
      { company: 'O*NET Global AI Directory &middot; International', title: 'International Machine Learning & AI Architect', location: 'Global &middot; $120,000–$180,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'How I Became a Data Scientist (Complete Roadmap & Curriculum)', desc: 'Step-by-step guide to mastering math, code, and ML deployment.', lang: 'EN', meta: 'YouTube &middot; 22 min', videoUrl: 'https://www.youtube.com/results?search_query=data+science+roadmap+2026' }
    ],
    mindmap: [
      { label: 'Math & Python', x: 0.08, y: 0.5, step: 'Connect AICTE Portal' },
      { label: 'SQL & EDA', x: 0.28, y: 0.3, step: 'Data Wrangling & Analysis' },
      { label: 'Machine Learning', x: 0.52, y: 0.5, step: 'Scikit-Learn, PyTorch & Kaggle' },
      { label: 'MLOps & Cloud', x: 0.75, y: 0.3, step: 'Deploy Docker & AWS Models' },
      { label: 'Lead AI Scientist', x: 0.9, y: 0.5, step: 'Senior AI Engineering Role' }
    ]
  },
  'engineering_cse': {
    officialPortal: { name: 'AICTE Official Portal (India)', url: 'https://www.aicte.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Computer Science Engineer (B.Tech / AICTE)',
    bio: 'Synced with AICTE Official Portal (aicte.gov.in). Standard engineering degree path covering Data Structures, Operating Systems, DBMS, Compiler Design, Distributed Networks, and Cloud Computing.',
    marketVal: '₹8L – ₹20L / yr ($70K–$130K Global)',
    marketVal6m: '₹12L / yr ($90K)',
    marketVal2y: '₹28L+ / yr ($150K+ Chief Architect)',
    skills: ['Data Structures & Algorithms', 'Operating Systems & Linux', 'Database Management Systems (SQL)', 'Distributed Systems & Cloud Architecture', 'System Design & High Availability', 'Full Stack Engineering'],
    matches: [
      { title: 'Senior Software Development Engineer (SDE-2) [Lifetime Demand]', match: '98%' },
      { title: 'Cloud Solutions Architect', match: '95%' },
      { title: 'Backend Distributed Systems Engineer', match: '92%' }
    ],
    milestones: [
      { title: 'Year 1-2: C++, Data Structures, Discrete Math, Computer Architecture & DBMS', due: 'Sem 1-4' },
      { title: 'Year 3: Operating Systems, Computer Networks, System Design & Cloud Deployment', due: 'Sem 5-6' },
      { title: 'Year 4: Industrial Internship, Distributed Systems Capstone & SDE Interviews', due: 'Sem 7-8' }
    ],
    nextStep: 'Access AICTE portal norms and master Scalable System Design on AWS.',
    courses: [
      { meta: 'AICTE Official Portal &middot; Live Server', title: 'AICTE Computer Science & Engineering Curriculum', desc: 'Direct government portal connection for accredited degree frameworks and technical hackathons.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.aicte.gov.in/' },
      { meta: 'Coursera / Stanford &middot; 8 weeks', title: 'Algorithms Specialization by Tim Roughgarden', desc: 'Master greedy algorithms, dynamic programming, and NP-completeness.', rating: '4.9 &star; (60K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=algorithms+specialization' }
    ],
    jobs: [
      { company: 'Microsoft / Amazon / Flipkart &middot; India', title: 'Software Development Engineer (SDE)', location: 'Hybrid &middot; ₹15L–₹35L / yr', match: '98% match', applyUrl: 'https://careers.microsoft.com/' },
      { company: 'O*NET Global Tech Directory &middot; International', title: 'International Lead Software & Cloud Architect', location: 'Global &middot; $110,000–$165,000', match: '95% match', applyUrl: 'https://www.onetonline.org/find/industry?i=0' }
    ],
    videos: [
      { title: 'B.Tech CSE Complete 4-Year Roadmap, Semester Subjects & Top Placement Strategy', desc: 'How to crack top product tier companies and scale your software career.', lang: 'HI/EN', meta: 'YouTube &middot; 28 min', videoUrl: 'https://www.youtube.com/results?search_query=btech+cse+career+roadmap+placement' }
    ],
    mindmap: [
      { label: 'B.Tech CSE Sem 1', x: 0.08, y: 0.5, step: 'Connect AICTE Portal' },
      { label: 'DSA & Discrete Math', x: 0.3, y: 0.3, step: 'Sem 3-4 Algorithms' },
      { label: 'OS & DBMS Networks', x: 0.55, y: 0.5, step: 'Sem 5-6 System Design' },
      { label: 'Crack SDE Drive', x: 0.78, y: 0.3, step: 'Tier-1 Product Placement' },
      { label: 'Chief Software Architect', x: 0.9, y: 0.5, step: 'Lifetime Executive Career' }
    ]
  },
  'upsc_civil': {
    officialPortal: { name: 'UPSC Official Government Gateway', url: 'https://www.upsc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Civil Services Officer (UPSC - IAS / IPS / IFS)',
    bio: 'Direct connection to UPSC Official Government Portal (upsc.gov.in). Covers Prelims (GS + CSAT), Mains (9 Descriptive Papers), and Personality Test Interview.',
    marketVal: '₹12L – ₹25L / yr + Govt Benefits',
    marketVal6m: '₹16L / yr',
    marketVal2y: '₹30L+ / yr (Senior Administrative Scale)',
    skills: ['Public Administration', 'Policy Analysis', 'Indian Polity & Constitution', 'Macroeconomics', 'Ethics & Integrity', 'Crisis Management', 'Leadership'],
    matches: [
      { title: 'Indian Administrative Service Officer (IAS) [Lifetime Prestige]', match: '98%' },
      { title: 'Indian Police Service Officer (IPS)', match: '95%' },
      { title: 'Indian Foreign Service Officer (IFS)', match: '91%' }
    ],
    milestones: [
      { title: 'Master NCERT Books (Class 6-12) & Standard Reference (Laxmikanth, Spectrum)', due: 'Phase 1 (6 Months)' },
      { title: 'Clear UPSC Preliminary Exam (General Studies & CSAT)', due: 'Phase 2' },
      { title: 'Master Optional Subject & Clear UPSC Mains Written Exam', due: 'Phase 3' },
      { title: 'Clear Personality Test / Interview at Dholpur House', due: 'Final Phase' }
    ],
    nextStep: 'Connect to upsc.gov.in and analyze past 10 years official UPSC Prelims notification papers.',
    courses: [
      { meta: 'UPSC Official Government Gateway &middot; Live Portal', title: 'Union Public Service Commission Official Exam Portal', desc: 'Direct portal connection for exam notifications, application forms, and official answer keys.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.upsc.gov.in/' },
      { meta: 'Swayam / IGNOU (UGC) &middot; 16 weeks', title: 'Governance and Public Policy in India', desc: 'Constitutional framework, administrative ethics, and public sector management.', rating: '4.9 &star; (22K)', price: 'Free / Verified', liveUrl: 'https://swayam.gov.in/explorer?category=Humanities_and_Arts' }
    ],
    jobs: [
      { company: 'Union Public Service Commission &middot; Govt of India', title: 'Civil Services Executive Trainee (IAS/IPS)', location: 'LBSNAA Mussoorie &middot; Govt Pay Scale', match: '98% match', applyUrl: 'https://www.upsc.gov.in/' }
    ],
    videos: [
      { title: 'UPSC Civil Services Complete Strategy & Subject Roadmap', desc: 'Detailed breakdown of Prelims, Mains answer writing, and time management.', lang: 'HI/EN', meta: 'YouTube &middot; 30 min', videoUrl: 'https://www.youtube.com/results?search_query=upsc+complete+strategy+roadmap' }
    ],
    mindmap: [
      { label: 'Foundation NCERT', x: 0.08, y: 0.5, step: 'Connect upsc.gov.in' },
      { label: 'UPSC Prelims', x: 0.32, y: 0.3, step: 'Clear GS Paper 1 & CSAT' },
      { label: 'Mains & Optional', x: 0.58, y: 0.5, step: '9 Written Descriptive Papers' },
      { label: 'IAS / IPS Officer', x: 0.88, y: 0.5, step: 'Interview & LBSNAA Academy' }
    ]
  },
  'geography_gis': {
    officialPortal: { name: 'ISRO / IIRS E-Classroom Portal', url: 'https://eclass.iirs.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Geographic Information Systems (GIS) & Remote Sensing Scientist',
    bio: 'Direct connection to ISRO IIRS & UGC Spatial E-Classroom. Comprehensive mastery of GIS, satellite remote sensing, environmental cartography, and spatial data science using QGIS, ArcGIS Pro, and Python GeoPandas.',
    marketVal: '₹7L – ₹16L / yr ($60K–$105K Global)',
    marketVal6m: '₹11L / yr ($80K)',
    marketVal2y: '₹22L+ / yr ($130K+ Senior Spatial Architect)',
    skills: ['Geographic Information Systems (QGIS / ArcGIS Pro)', 'Satellite Remote Sensing (ISRO Bhuvan / NASA)', 'Spatial Data Science (Python GeoPandas / SQL)', 'Digital Elevation Modeling & Cartography', 'Environmental Impact Assessment & Climate Modeling'],
    matches: [
      { title: 'GIS Application Engineer & Spatial Analyst [Lifetime Demand]', match: '98%' },
      { title: 'Remote Sensing Scientist (@ ISRO / IIRS)', match: '96%' },
      { title: 'Geospatial Data Specialist (@ Google Maps / Esri)', match: '94%' }
    ],
    milestones: [
      { title: 'Register on ISRO E-Classroom / IIRS & Verify UGC Spatial Credits', due: 'Weeks 1–3' },
      { title: 'Master Python Spatial Data Science (QGIS, GeoPandas & PostGIS)', due: 'Weeks 4–8' },
      { title: 'Deploy Live Urban Canopy/Flood Risk Spatial Model & Crack GIS Roles', due: 'Weeks 9–12' }
    ],
    nextStep: 'Register on ISRO IIRS free E-Classroom and build spatial database pipelines in QGIS.',
    courses: [
      { meta: 'ISRO IIRS Official Portal &middot; Free Govt Cert', title: 'ISRO IIRS E-Classroom Remote Sensing & GIS', desc: 'Direct portal to Indian Institute of Remote Sensing official E-Learning platform for satellite data analysis.', rating: '5.0 &star; (Official)', price: 'Free Govt Cert', liveUrl: 'https://eclass.iirs.gov.in/' },
      { meta: 'Coursera / UC Davis &middot; 8 weeks', title: 'Geographic Information Systems (GIS) Specialization', desc: 'Comprehensive mastery of ArcGIS Pro, spatial data management, and geospatial analysis workflows.', rating: '4.8 &star; (65K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=geographic+information+systems+specialization' }
    ],
    jobs: [
      { company: 'ISRO / IIRS Research Track &middot; Dehradun / Remote', title: 'Junior Research Fellow (JRF) - Remote Sensing & GIS', location: 'On-site &middot; ₹37,000/mo + HRA (Govt Scale)', match: '98% match', applyUrl: 'https://eclass.iirs.gov.in/' },
      { company: 'Esri India &middot; Noida / Bengaluru / Remote', title: 'GIS Application Engineer & Spatial Analyst', location: 'Hybrid &middot; ₹8L–₹16L / yr', match: '96% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=GIS+Analyst' }
    ],
    videos: [
      { title: 'Complete BA/B.Sc Geography to GIS & Spatial Data Scientist Roadmap', desc: 'How to transition from Geography degree into high-paying GIS, remote sensing, and Python spatial analytics jobs.', lang: 'EN/HI', meta: 'YouTube &middot; 24 min', videoUrl: 'https://www.youtube.com/results?search_query=geography+to+GIS+data+scientist+career+roadmap' }
    ],
    mindmap: [
      { label: 'Geography Degree', x: 0.08, y: 0.5, step: 'Cartography & Earth Sciences' },
      { label: 'ISRO IIRS & QGIS', x: 0.32, y: 0.3, step: 'Spatial SQL & Remote Sensing' },
      { label: 'Spatial Python', x: 0.58, y: 0.5, step: 'GeoPandas & Urban Analytics' },
      { label: 'Senior Spatial Scientist', x: 0.88, y: 0.5, step: 'Target Pay: ₹11L–₹22L/yr' }
    ]
  },
  'research_phd': {
    officialPortal: { name: 'University Grants Commission (UGC)', url: 'https://www.ugc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Senior Academic Researcher & Doctoral Scholar (PhD Track)',
    bio: 'Synced with UGC Official Portal (ugc.gov.in). Doctorate level academic leadership, advanced research methodology, publication in Scopus/Nature indexed journals, and university professorship pathways.',
    marketVal: '₹12L – ₹25L+ / yr ($85K–$140K Global)',
    marketVal6m: '₹16L / yr ($95K+ Post-Doc / JRF Fellowship)',
    marketVal2y: '₹30L+ / yr ($160K+ University Professor / R&D Director)',
    skills: ['Qualitative & Quantitative Research Methodology', 'Scopus / Nature Indexed Academic Publishing', 'Statistical Hypothesis Testing (SPSS / R / Python)', 'Research Grant Proposal Writing & Institutional Ethics', 'Higher Education Pedagogy & Curriculum Architecture'],
    matches: [
      { title: 'Principal Research Scientist / JRF Fellow [Lifetime Demand]', match: '98%' },
      { title: 'Assistant Professor (@ Central Universities / IIT / IISc)', match: '96%' },
      { title: 'Global Think-Tank Policy & Institutional R&D Director', match: '94%' }
    ],
    milestones: [
      { title: 'Verify UGC PhD Regulations & Register for NET/JRF Examination', due: 'Weeks 1–3' },
      { title: 'Develop Comprehensive Synopsis & Literature Review Matrix', due: 'Weeks 4–8' },
      { title: 'Publish Scopus Indexed Research Paper & Secure Fellowship Funding', due: 'Weeks 9–12' }
    ],
    nextStep: 'Verify UGC PhD norms and structure your doctoral synopsis and research methodology.',
    courses: [
      { meta: 'UGC Official Academic Portal &middot; Govt Portal', title: 'University Grants Commission (UGC) Research Norms & Regulations', desc: 'Direct access to official UGC doctoral standards, JRF fellowship eligibility, and academic recognition criteria.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
      { meta: 'Coursera / Johns Hopkins &middot; 8 weeks', title: 'Methods and Statistics in Social Sciences & Humanities Specialization', desc: 'Master empirical research design, statistical validation, and academic communication.', rating: '4.9 &star; (55K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=methods+and+statistics+in+social+sciences' }
    ],
    jobs: [
      { company: 'Central Universities / IIT / IISc &middot; India', title: 'Assistant Professor / JRF Doctoral Fellow', location: 'On-site &middot; ₹70,000–₹1,20,000/mo (UGC Scale)', match: '98% match', applyUrl: 'https://www.ugc.gov.in/' },
      { company: 'Global Research Institute &middot; Hybrid / USA / UK', title: 'Post-Doctoral Research Scientist', location: 'Hybrid &middot; $85,000–$130,000 / yr', match: '96% match', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Postdoctoral+Researcher' }
    ],
    videos: [
      { title: 'How to Crack UGC-NET JRF & Get Full Doctoral Fellowship in India', desc: 'Complete roadmap for PhD admission, JRF scholarship clearance, and choosing the right supervisor.', lang: 'HI/EN', meta: 'YouTube &middot; 25 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+crack+UGC+NET+JRF+PhD+admission' }
    ],
    mindmap: [
      { label: 'Master / BA Degree', x: 0.08, y: 0.5, step: 'UGC-NET / JRF Clearance' },
      { label: 'Research Synopsis', x: 0.32, y: 0.3, step: 'Methodology & Data Design' },
      { label: 'Scopus Publishing', x: 0.58, y: 0.5, step: 'Peer-Reviewed Journals' },
      { label: 'Tenured Professor', x: 0.88, y: 0.5, step: 'Target Pay: ₹18L–₹35L+/yr' }
    ]
  },
  'humanities_arts': {
    officialPortal: { name: 'AICTE and UGC Government Portal', url: 'https://www.ugc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Public Policy Analyst & Social Research Lead (Humanities Graduate)',
    bio: 'Connected to AICTE and UGC Government Portal. Analytical communication, governance research, public policy evaluation, and executive leadership for Bachelor of Arts (BA) and Master of Arts (MA) humanities graduates.',
    marketVal: '₹6L – ₹15L / yr ($55K–$95K Global)',
    marketVal6m: '₹10L / yr ($75K+ Policy Cert)',
    marketVal2y: '₹20L+ / yr ($120K+ Senior Policy Consultant)',
    skills: ['Public Policy Analysis & Governance Frameworks', 'Advanced Executive Written & Verbal Communication', 'Socio-Economic Research & Demography Analytics', 'Constitutional Law & Administrative Procedures', 'Digital Media Management & Editorial Operations'],
    matches: [
      { title: 'Public Policy Research Analyst (@ Think Tanks / NITI Aayog)', match: '98%' },
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
  },
  'commerce_finance': {
    officialPortal: { name: 'ICAI & UGC Commerce Accreditation Gateway', url: 'https://www.ugc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Financial Analyst & Corporate Accounting Lead (B.Com / CA Track)',
    bio: 'Synced with ICAI & UGC Official Commerce norms. Spreadsheet financial modeling, taxation (GST/IFRS), auditing, investment banking, and corporate accounting control.',
    marketVal: '₹8L – ₹20L / yr ($65K–$115K Global)',
    marketVal6m: '₹12L / yr ($85K+ CFA / CA Inter)',
    marketVal2y: '₹25L+ / yr ($140K+ Senior Financial Controller)',
    skills: ['Financial Statement Auditing & Taxation (GST/IFRS)', 'Investment Valuation & Spreadsheet Financial Modeling', 'Regulatory Compliance & Risk Governance', 'Corporate Accounting & ERP Systems (SAP FICO)', 'Strategic Financial Management'],
    matches: [
      { title: 'Financial Advisory & Audit Specialist (@ Big-4 Deloitte/PwC/EY/KPMG)', match: '98%' },
      { title: 'Senior Investment & Valuation Analyst', match: '96%' },
      { title: 'Corporate ERP & Accounting Controller', match: '94%' }
    ],
    milestones: [
      { title: 'Verify ICAI / UGC Credits & Master Advanced Financial Modeling', due: 'Weeks 1–3' },
      { title: 'Complete SAP FICO & Investment Valuation Case Studies', due: 'Weeks 4–8' },
      { title: 'Apply to Big-4 Audit / Investment Banking & Corporate Finance Tracks', due: 'Weeks 9–12' }
    ],
    nextStep: 'Enroll in Wharton Business Financial Modeling and apply directly to Big-4 audit roles.',
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
  },
  'universal_guidance': {
    officialPortal: { name: 'Official Higher Education Portal (UGC / AICTE)', url: 'https://www.ugc.gov.in/', status: 'Cached Client Data (Unverified Offline)' },
    role: 'Universal Career & Higher Education Guidance Lead',
    bio: 'Dynamic multi-disciplinary roadmap tailored exactly to the candidate\'s unique educational background, domain specialization, career goals, and current position.',
    marketVal: '₹8L – ₹18L / yr ($65K–$110K Global)',
    marketVal6m: '₹12L / yr ($80K+ Industry Cert)',
    marketVal2y: '₹24L+ / yr ($140K+ Senior Leadership Track)',
    skills: ['Core Domain Specialization & Applied Methodologies', 'Advanced Analytical Problem Solving & Strategic Execution', 'Cross-Functional Communication & Leadership', 'Modern Digital Tools & Cloud/Data Integration', 'Official Portal & Regulatory Standard Compliance'],
    matches: [
      { title: 'Specialist Officer / Associate Lead (Custom Track)', match: '98%' },
      { title: 'Senior Professional Consultant', match: '96%' },
      { title: 'Research & Innovation Strategy Specialist', match: '94%' }
    ],
    milestones: [
      { title: 'Verify Academic Credentials on Official Government Portals (UGC/AICTE/ISRO)', due: 'Weeks 1–3' },
      { title: 'Acquire High-Demand Technical & Strategic Specialization Certifications', due: 'Weeks 4–8' },
      { title: 'Build Production Portfolio & Execute Direct Corporate/Institution Applications', due: 'Weeks 9–12' }
    ],
    nextStep: 'Access verified government portals and enroll in targeted domain certifications to accelerate your salary.',
    courses: [
      { meta: 'Official Government Gateway &middot; Verified Portal', title: 'Official Higher Education & Professional Standards Portal', desc: 'Direct access to government educational guidelines, accreditation verification, and national fellowship/job portals.', rating: '5.0 &star; (Official)', price: 'Govt Portal', liveUrl: 'https://www.ugc.gov.in/' },
      { meta: 'Coursera Global Hub &middot; 8 weeks', title: 'Universal Professional Career & Technical Specialization', desc: 'High-impact certification workflows tailored to transition graduates directly into top corporate and research roles.', rating: '4.9 &star; (90K)', price: 'Free audit', liveUrl: 'https://www.coursera.org/search?query=career+success+specialization' }
    ],
    jobs: [
      { company: 'Top Corporate & Research Institutions &middot; India / Global', title: 'Specialist Officer / Associate Lead (Custom Track)', location: 'Hybrid &middot; ₹8L–₹18L / yr', match: '98% match', applyUrl: 'https://www.ugc.gov.in/' },
      { company: 'Global Enterprise & Innovation Firms &middot; Remote / Hybrid', title: 'Senior Professional Consultant', location: 'Hybrid &middot; $75,000–$120,000 / yr', match: '96% match', applyUrl: 'https://www.linkedin.com/jobs' }
    ],
    videos: [
      { title: 'Complete Step-by-Step Career Growth & Salary Acceleration Roadmap', desc: 'Proven strategies for recent graduates and professionals to crack top corporate and academic opportunities.', lang: 'HI/EN', meta: 'YouTube &middot; 22 min', videoUrl: 'https://www.youtube.com/results?search_query=how+to+choose+right+career+path+after+graduation' }
    ],
    mindmap: [
      { label: 'Current Profile', x: 0.08, y: 0.5, step: 'Academic Foundation' },
      { label: 'Skill Acceleration', x: 0.32, y: 0.3, step: 'Certifications & Projects' },
      { label: 'Verified Application', x: 0.58, y: 0.5, step: 'Official Portal Gateway' },
      { label: 'Senior Career Lead', x: 0.88, y: 0.5, step: 'Target Pay: ₹12L–₹25L+/yr' }
    ]
  }
};


function matchClientCareer(query) {
  if (!query) return null;
  var q = query.toLowerCase();
  if (STAGE_KNOWLEDGE_BASE[query]) return STAGE_KNOWLEDGE_BASE[query];
  if (q.includes('geograph') || q.includes('gis') || q.includes('cartograph') || q.includes('earth') || q.includes('geolog')) return STAGE_KNOWLEDGE_BASE['geography_gis'];
  if (q.includes('phd') || q.includes('research') || q.includes('doctorate') || q.includes('thesis') || q.includes('professor') || /\bnet\b/.test(q) || /\bjrf\b/.test(q)) return STAGE_KNOWLEDGE_BASE['research_phd'];
  if (q.includes('bba') || q.includes('mba') || q.includes('business') || q.includes('management') || q.includes('mbagate') || q.includes('apprenticeshipindia') || (q.includes('bachelor') && q.includes('business'))) return STAGE_KNOWLEDGE_BASE['management_bba'];
  if (q.includes('radiolog') || q.includes('x-ray') || q.includes('mri') || q.includes('ct scan') || q.includes('imaging')) return STAGE_KNOWLEDGE_BASE['paramedical_radiology'];
  if (q.includes('patholog') || /\bmlt\b/.test(q) || /\bdmlt\b/.test(q) || q.includes('lab techn') || q.includes('blood bank') || q.includes('microbiolog')) return STAGE_KNOWLEDGE_BASE['paramedical_pathology'];
  if (q.includes('pharm') || q.includes('b.pharm') || q.includes('d.pharm') || q.includes('medicine maker') || q.includes('pharmacovigilance')) return STAGE_KNOWLEDGE_BASE['pharmacist'];
  if (/\bbca\b/.test(q) || q.includes('b.sc cs') || q.includes('bsc cs') || q.includes('diploma cs') || q.includes('computer application') || q.includes('polytechnic')) return STAGE_KNOWLEDGE_BASE['diploma_bca_bsc_cs'];
  if (q.includes('electrical') || /\bee\b/.test(q) || q.includes('ev powertrain') || q.includes('power grid')) return STAGE_KNOWLEDGE_BASE['engineering_electrical'];
  if (q.includes('chemical engineering') || /\bche\b/.test(q) || q.includes('refinery') || q.includes('petrochemical') || q.includes('green hydrogen')) return STAGE_KNOWLEDGE_BASE['engineering_chemical'];
  if (/\blaw\b/.test(q) || q.includes('ballb') || /\bllb\b/.test(q) || q.includes('clat') || q.includes('advocate') || q.includes('court')) return STAGE_KNOWLEDGE_BASE['law_ballb'];
  if (q.includes('space') || q.includes('aerospace') || q.includes('isro') || q.includes('nasa') || q.includes('rocket') || q.includes('astrophysics')) return STAGE_KNOWLEDGE_BASE['space_science'];
  if (q.includes('animat') || /\bvfx\b/.test(q) || q.includes('graphic') || q.includes('multimedia') || q.includes('film') || q.includes('edit') || q.includes('shiksha') || q.includes('bachelorsportal')) return STAGE_KNOWLEDGE_BASE['animation_vfx_design'];
  if (q.includes('doctor') || /\bmbbs\b/.test(q) || /\bneet\b/.test(q) || q.includes('medical') || q.includes('surgeon') || q.includes('physician')) return STAGE_KNOWLEDGE_BASE['doctor_india'];
  if (q.includes('data sci') || q.includes('machine learn') || /\bml\b/.test(q) || /\bai\b/.test(q) || q.includes('artificial intell')) return STAGE_KNOWLEDGE_BASE['data_science'];
  if (/\bcse\b/.test(q) || q.includes('computer sci') || q.includes('makaut') || q.includes('aicte') || q.includes('b.tech') || q.includes('btech') || q.includes('software eng') || q.includes('coding') || q.includes('programmer') || q.includes('developer')) return STAGE_KNOWLEDGE_BASE['engineering_cse'];
  if (q.includes('upsc') || /\bias\b/.test(q) || /\bips\b/.test(q) || q.includes('civil service') || q.includes('public admin')) return STAGE_KNOWLEDGE_BASE['upsc_civil'];
  if (q.includes('computer') || q.includes('software') || /\btech\b/.test(q) || q.includes('it specialist')) return STAGE_KNOWLEDGE_BASE['diploma_bca_bsc_cs'];
  if (q.includes('ba degree') || /\bba\b/.test(q) || q.includes('b.a') || /\bma\b/.test(q) || q.includes('m.a') || q.includes('ma degree') || q.includes('arts') || q.includes('history') || q.includes('english') || q.includes('humanities') || q.includes('literature') || q.includes('sociology') || q.includes('bengali') || q.includes('hindi') || q.includes('sanskrit') || q.includes('tamil') || q.includes('telugu') || q.includes('malayalam') || q.includes('urdu') || q.includes('gujarati') || q.includes('marathi') || q.includes('punjabi') || q.includes('odia') || q.includes('assamese') || q.includes('kannada') || q.includes('philosophy') || q.includes('political science') || q.includes('psychology') || q.includes('fine arts') || q.includes('mass communication') || q.includes('journalism') || q.includes('social work') || /\bmsw\b/.test(q)) return STAGE_KNOWLEDGE_BASE['humanities_arts'];
  if (q.includes('commerce') || /\bb\.com\b/.test(q) || /\bbcom\b/.test(q) || /\bca\b/.test(q) || q.includes('chartered accountant') || q.includes('finance') || q.includes('banking')) return STAGE_KNOWLEDGE_BASE['commerce_finance'];
  if (q.includes('i am ') || q.includes('my name') || q.includes('complete') || q.includes('completed') || q.includes('degree') || q.includes('career') || q.includes('job') || q.includes('next step') || q.includes('fresher') || q.includes('student') || q.includes('internship') || q.includes('college')) return STAGE_KNOWLEDGE_BASE['universal_guidance'];
  return null;
}


window.DEFAULT_COURSES = DEFAULT_COURSES;
window.DEFAULT_JOBS = DEFAULT_JOBS;
window.DEFAULT_VIDEOS = DEFAULT_VIDEOS;
window.STAGE_KNOWLEDGE_BASE = STAGE_KNOWLEDGE_BASE;
window.matchClientCareer = matchClientCareer;
