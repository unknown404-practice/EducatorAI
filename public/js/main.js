/**
 * Educator AI Main Client Controller & Bootstrap
 * Handles user profile state, screen transitions, theme management,
 * profile editing modal, hardware tier profiling, and event routing.
 */

var USER_DATA = null;
var STATIC_USER_PROFILE = null;
var CHAT_HISTORY = [];

var CURRENT_THEME = 'glass';
var THEMES = ['glass', 'dark', 'warm'];
var THEME_ICONS = ['\u25D0', '\u25D1', '\u25D2'];

function esc(s) {
  if (s === null || s === undefined) return '';
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(String(s)));
  return d.innerHTML;
}

function loadUserData() {
  var authUser = null;
  try {
    var a = localStorage.getItem('kinetic-auth-user');
    if (a) authUser = JSON.parse(a);
  } catch (e) { }

  try {
    var r = localStorage.getItem('kinetic-user-prod');
    if (r) { USER_DATA = JSON.parse(r); }
  } catch (e) { }

  if (!USER_DATA) {
    USER_DATA = {
      name: authUser && authUser.name ? authUser.name : 'Ranadeep Saha',
      role: 'CS Graduate - Aspiring Product Manager',
      bio: 'Recent CS grad with internship experience in software engineering. Looking to transition into product management with a focus on technical products.',
      marketVal: '$78K', marketVal6m: '$92K', marketVal2y: '$115K',
      skills: ['Python', 'JavaScript', 'SQL', 'Agile and Scrum', 'User Research', 'Data Analysis', 'Wireframing', 'A/B Testing', 'Roadmapping', 'Stakeholder Mgmt'],
      experience: [
        { title: 'Software Engineering Intern', company: 'TechCorp Inc.', period: 'Jun 2025 - Aug 2025', desc: 'Built internal dashboard for release tracking.' },
        { title: 'Teaching Assistant - Data Structures', company: 'University', period: 'Sep 2024 - May 2025', desc: 'Led lab sessions for 40+ students.' }
      ],
      education: [
        { degree: 'B.S. Computer Science', institution: 'University of Technology', period: '2021 - 2025', desc: 'GPA 3.6, Deans List, Capstone: AI career recommendation.' }
      ],
      topMatches: [
        { title: 'Associate Product Manager', match: '94%' },
        { title: 'Technical Product Owner', match: '88%' },
        { title: 'Product Analyst', match: '82%' }
      ],
      milestones: [
        { title: 'Complete PM certification', due: '15 days left' },
        { title: 'Resume review session', due: 'Mar 28' },
        { title: 'Mock interview sprint', due: 'Apr 5' }
      ],
      nextStep: 'Enroll in Product Strategy & Roadmapping to close the highest-impact gap for APM roles. Completing it could increase your market value by an estimated $6K–$9K.',
      courses: window.DEFAULT_COURSES || [],
      jobs: window.DEFAULT_JOBS || [],
      videos: window.DEFAULT_VIDEOS || [],
      mindmap: [
        { label: 'CS Graduate', x: 0.08, y: 0.5, step: 'Your starting point' },
        { label: 'PM Cert', x: 0.25, y: 0.25, step: 'Earn Product Management certification' },
        { label: 'APM Intern', x: 0.25, y: 0.75, step: 'Secure an APM internship or entry role' },
        { label: 'Portfolio', x: 0.45, y: 0.25, step: 'Build your PM portfolio with case studies' },
        { label: 'Network', x: 0.45, y: 0.75, step: 'Network + get referrals through connections' },
        { label: 'Target: APM', x: 0.73, y: 0.5, step: 'Land an Associate Product Manager role' }
      ]
    };
  }

  try {
    var ch = localStorage.getItem('kinetic-chat-prod');
    if (ch) { CHAT_HISTORY = JSON.parse(ch); }
  } catch (e) { }

  try {
    var sp = localStorage.getItem('kinetic-static-user-profile');
    if (sp) { STATIC_USER_PROFILE = JSON.parse(sp); }
  } catch (e) { }

  if (!STATIC_USER_PROFILE) {
    STATIC_USER_PROFILE = {
      name: authUser && authUser.name ? authUser.name : 'Ranadeep Saha',
      role: 'Computer Applications & IT Specialist (BCA / B.Sc CS / Diploma)',
      bio: 'Connected to UGC Portal (ugc.gov.in) & AICTE. Dedicated curriculum for BCA, B.Sc CS, and Polytechnic IT Diploma. Subjects: C/C++, Java, Web Development (HTML/CSS/JS), Database (MySQL), Data Structures, Computer Networks, Cloud Basics.',
      skills: ['C/C++ Programming', 'Object-Oriented Java', 'Full Stack Web (HTML/CSS/JS)', 'Database MySQL', 'Data Structures & Algorithms', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
      courses: [
        { meta: 'UGC Official Higher Education Gateway &middot; Live Portal', title: 'University Grants Commission e-Syllabus & Curriculum', desc: 'Direct portal access for official degree norms, credit frameworks, and university recognition.' },
        { meta: 'Coursera / IBM &middot; 8 weeks', title: 'IBM Full Stack Software Developer Professional Cert', desc: 'Master cloud native web development with HTML, Node, React, and Python.' }
      ],
      experience: [
        { title: 'Software Engineering Intern', company: 'TechCorp Inc.', period: 'Jun 2025 - Aug 2025', desc: 'Built internal dashboard for release tracking.' }
      ],
      education: [
        { degree: 'BCA / B.Sc Computer Science', institution: 'MAKAUT / UGC Recognized University', period: '2023 - 2026', desc: 'Core Computer Applications & IT Specialist Curriculum.' }
      ]
    };
    try { localStorage.setItem('kinetic-static-user-profile', JSON.stringify(STATIC_USER_PROFILE)); } catch (e) { }
  }

  window.USER_DATA = USER_DATA;
  window.STATIC_USER_PROFILE = STATIC_USER_PROFILE;
  window.CHAT_HISTORY = CHAT_HISTORY;
}

function saveUserData() {
  try {
    localStorage.setItem('kinetic-user-prod', JSON.stringify(USER_DATA));
    if (STATIC_USER_PROFILE) {
      localStorage.setItem('kinetic-static-user-profile', JSON.stringify(STATIC_USER_PROFILE));
    }
    localStorage.setItem('kinetic-chat-prod', JSON.stringify(CHAT_HISTORY));
  } catch (e) { }
}

function syncAllPages() {
  if (!USER_DATA) loadUserData();
  var u = USER_DATA;
  var first = (u.name || 'Student').split(' ')[0];
  var g = document.getElementById('dashGreeting');
  if (g) {
    var h = new Date().getHours();
    g.textContent = (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') + ', ' + first + '.';
  }
  var ds = document.querySelector('.dash-sub');
  if (ds && u.role) ds.innerHTML = 'Career snapshot for <strong style="color:var(--accent)">' + esc(u.role) + '</strong> &middot; Permanently saved';

  // Dashboard Sync
  var dmv = document.getElementById('dashMarketVal'); if (dmv) dmv.textContent = u.marketVal || '$78K';
  var dmc = document.getElementById('dashMatchCount'); if (dmc) dmc.textContent = (u.topMatches || []).length;
  var dml = document.getElementById('dashMatchesList');
  if (dml && u.topMatches) {
    dml.innerHTML = '<ul style="list-style:none;display:flex;flex-direction:column;gap:6px">' +
      u.topMatches.map(function (m, i) {
        var col = i < 3 ? 'var(--accent)' : 'var(--muted)';
        return '<li style="display:flex;justify-content:space-between;font-size:clamp(12px,.8rem,14px)"><span>' + esc(m.title) + '</span><span style="font-weight:600;color:' + col + '">' + esc(m.match) + '</span></li>';
      }).join('') + '</ul>';
  }
  var dmilc = document.getElementById('dashMilestoneCount'); if (dmilc) dmilc.textContent = (u.milestones || []).length;
  var dmill = document.getElementById('dashMilestonesList');
  if (dmill && u.milestones) {
    dmill.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px">' +
      u.milestones.map(function (ms) {
        return '<div style="display:flex;gap:10px;align-items:flex-start"><div style="width:8px;height:8px;border-radius:50%;background:var(--accent);margin-top:5px;flex-shrink:0"></div><div><div style="font-weight:600;font-size:clamp(12px,.8rem,14px)">' + esc(ms.title) + '</div><div class="small" style="margin-top:1px">' + esc(ms.due) + '</div></div></div>';
      }).join('') + '</div>';
  }
  var dnst = document.getElementById('dashNextStepText'); if (dnst) dnst.innerHTML = u.nextStep || '';

  // Path Sync
  var pmvc = document.getElementById('pathMvCurrent'); if (pmvc) pmvc.textContent = u.marketVal || '$78K';
  var pmv6 = document.getElementById('pathMv6m'); if (pmv6) pmv6.textContent = u.marketVal6m || '$92K';
  var pmv2 = document.getElementById('pathMv2y'); if (pmv2) pmv2.textContent = u.marketVal2y || '$115K';
  var pat = document.getElementById('pathAnalysisText');
  if (pat) {
    pat.innerHTML = '<p style="font-size:clamp(12px,.8rem,14px)">' + esc(u.nextStep || 'Focus on building consistent skills.') + '</p>' +
      '<p style="font-size:clamp(12px,.8rem,14px);margin-top:8px">Target timeline: Fast-track certifications & portfolio deployment.</p>';
  }

  // Profile Sync
  var pObj = STATIC_USER_PROFILE || u;
  var av = document.getElementById('profileAv'), nm = document.getElementById('profileName'), rl = document.getElementById('profileRole'), bi = document.getElementById('profileBio');
  if (av) av.textContent = (pObj.name || 'User').split(' ').map(function (s) { return s[0]; }).join('').substring(0, 2).toUpperCase();
  if (nm) nm.textContent = pObj.name;
  if (rl) rl.textContent = pObj.role;
  if (bi) bi.textContent = pObj.bio;
  var ps = document.getElementById('profileSkills');
  if (ps && pObj.skills) ps.innerHTML = pObj.skills.map(function (s, idx) { return '<span class="skill-tag' + (idx < 3 ? ' accent' : '') + '">' + esc(s) + '</span>'; }).join('');
  var pc = document.getElementById('profileCourses');
  if (pc && pObj.courses) pc.innerHTML = pObj.courses.map(function (c) { return '<div class="exp-item" style="padding:10px;background:var(--surface);border-radius:6px;border:1px solid var(--border);"><div class="exp-title" style="font-size:14px;color:var(--accent);">' + esc(c.title) + '</div><div class="exp-meta" style="font-size:12px;">' + esc(c.meta || 'Enrolled Course') + '</div></div>'; }).join('');
  var pe = document.getElementById('profileExp');
  if (pe && pObj.experience) pe.innerHTML = pObj.experience.map(function (e) {
    var metaStr = [e.company, e.period].filter(Boolean).join(' &middot; ');
    return '<div class="exp-item"><div class="exp-title">' + esc(e.title) + '</div>' + (metaStr ? '<div class="exp-meta">' + esc(metaStr) + '</div>' : '') + (e.desc ? '<div class="exp-desc">' + esc(e.desc) + '</div>' : '') + '</div>';
  }).join('');
  var ped = document.getElementById('profileEdu');
  if (ped && pObj.education) ped.innerHTML = pObj.education.map(function (e) {
    var metaStr = [e.institution, e.period].filter(Boolean).join(' &middot; ');
    return '<div class="exp-item"><div class="exp-title">' + esc(e.degree) + '</div>' + (metaStr ? '<div class="exp-meta">' + esc(metaStr) + '</div>' : '') + (e.desc ? '<div class="exp-desc">' + esc(e.desc) + '</div>' : '') + '</div>';
  }).join('');

  // Skill bars
  var sb = document.getElementById('skillBars');
  if (sb) {
    var sList = u.skills || ['Technical', 'Strategy', 'Communication'];
    sb.innerHTML = sList.slice(0, 5).map(function (sk, i) {
      var pct = Math.max(60, 95 - i * 8);
      return '<div><div style="display:flex;justify-content:space-between;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:4px"><span>' + esc(sk) + '</span><span>' + pct + '%</span></div><div class="gap-track"><div class="gap-fill" style="width:' + pct + '%"></div></div></div>';
    }).join('');
  }

  // Learning Hub Sync
  var pcg = document.getElementById('panel-courses-grid');
  if (pcg && u.courses) {
    pcg.innerHTML = u.courses.map(function (c) {
      return '<div class="glass-card" style="display:flex;flex-direction:column"><div class="course-meta">' + esc(c.meta) + '</div><div class="course-title">' + esc(c.title) + '</div><div class="course-desc">' + esc(c.desc) + '</div><div class="course-footer"><span style="color:var(--muted)">' + esc(c.rating) + '</span><a href="' + esc(c.liveUrl || '#') + '" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="text-decoration:none">View Live Course &nearr;</a></div></div>';
    }).join('');
  }
  var pjg = document.getElementById('panel-jobs-grid');
  if (pjg && u.jobs) {
    pjg.innerHTML = u.jobs.map(function (j) {
      var cleanUrl = j.applyUrl || '#';
      if (!cleanUrl || cleanUrl === '#' || cleanUrl.indexOf('shiksha') !== -1 || cleanUrl.indexOf('bachelorsportal') !== -1 || cleanUrl.indexOf('404') !== -1 || (!cleanUrl.includes('spacecrew.com') && !cleanUrl.includes('lalpathlabs.com') && !cleanUrl.includes('linkedin.com') && !cleanUrl.includes('google.com') && !cleanUrl.includes('onetonline.org') && !cleanUrl.includes('upsc.gov.in') && !cleanUrl.includes('isro.gov.in') && !cleanUrl.includes('ugc.gov.in') && !cleanUrl.includes('nta.nic.in') && !cleanUrl.includes('csirhrdg.res.in') && !cleanUrl.includes('iitb.ac.in') && !cleanUrl.includes('iitm.ac.in') && !cleanUrl.includes('iit.ac.in') && !cleanUrl.includes('apprenticeshipindia') && !cleanUrl.includes('naukri.com'))) {
        cleanUrl = 'https://www.google.com/search?q=' + encodeURIComponent((j.title || 'Role') + ' ' + (j.company || '').split('/')[0].split('&')[0] + ' Jobs');
      }
      return '<div class="glass-card" style="display:flex;flex-direction:column"><div class="job-company">' + esc(j.company) + '</div><div class="job-title">' + esc(j.title) + '</div><div class="job-location">' + esc(j.location) + '</div><div class="job-match" style="margin-bottom:12px">' + esc(j.match) + '</div><a href="' + esc(cleanUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="text-decoration:none;align-self:flex-start">Apply Live &nearr;</a></div>';
    }).join('');
  }
  var pvg = document.getElementById('panel-videos-grid');
  if (pvg && u.videos) {
    pvg.innerHTML = u.videos.map(function (v) {
      return '<div class="glass-card video-card" onclick="window.open(\'' + esc(v.videoUrl || 'https://youtube.com') + '\',\'_blank\',\'noopener,noreferrer\')"><div class="video-thumb"><span class="lang-badge">' + esc(v.lang || 'EN') + '</span><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><div class="course-title">' + esc(v.title) + '</div><div class="course-desc">' + esc(v.desc) + '</div><div class="course-footer" style="margin-top:6px;border-top:none;padding-top:0"><span class="course-meta">' + esc(v.meta) + '</span><span style="color:var(--accent);font-weight:600;font-size:11px">Watch &nearr;</span></div></div>';
    }).join('');
  }

  if (u.mindmap && u.mindmap.length > 0) {
    window.MINDMAP_NODES = u.mindmap;
  }

  saveUserData();
}

function cycleTheme() {
  var i = THEMES.indexOf(CURRENT_THEME);
  i = (i + 1) % THEMES.length;
  CURRENT_THEME = THEMES[i];
  applyTheme();
}

function applyTheme() {
  document.documentElement.className = 'theme-' + CURRENT_THEME;
  var tt = document.getElementById('themeToggle');
  if (tt) tt.textContent = THEME_ICONS[THEMES.indexOf(CURRENT_THEME)];
  try { localStorage.setItem('kinetic-theme', CURRENT_THEME); } catch (e) { }
}

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
  document.querySelectorAll('[data-screen]').forEach(function (b) { b.classList.remove('active'); });
  var t = document.getElementById('screen-' + id);
  if (t) t.classList.add('active');
  document.querySelectorAll('[data-screen="' + id + '"]').forEach(function (b) { b.classList.add('active'); });
  try { localStorage.setItem('kinetic-screen', id); } catch (e) { }
  window.scrollTo(0, 0);
  if (id === 'path' && typeof window.syncNodePositions === 'function' && typeof window.drawEdges === 'function') {
    setTimeout(function () { window.syncNodePositions(); window.drawEdges(); }, 30);
    setTimeout(function () { window.syncNodePositions(); window.drawEdges(); }, 160);
  }
}

function switchHub(p) {
  document.querySelectorAll('.hub-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('.hub-panel').forEach(function (pn) { pn.classList.remove('active'); });
  var tab = document.querySelector('.hub-tab[data-panel="' + p + '"]');
  if (tab) tab.classList.add('active');
  var panel = document.getElementById('panel-' + p);
  if (panel) panel.classList.add('active');
}

function captureCurrentEditFields() {
  if (!USER_DATA) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  var n = document.getElementById('editName'); if (n) { u.name = n.value.trim(); USER_DATA.name = u.name; }
  var r = document.getElementById('editRole'); if (r) { u.role = r.value.trim(); USER_DATA.role = u.role; }
  var b = document.getElementById('editBio'); if (b) { u.bio = b.value.trim(); USER_DATA.bio = u.bio; }
}

function openEditProfile() {
  if (!USER_DATA || !STATIC_USER_PROFILE) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  var form = document.getElementById('editForm');
  if (!form) return;
  form.innerHTML =
    '<div class="form-group"><label>Name</label><input type="text" id="editName" value="' + esc(u.name) + '"></div>' +
    '<div class="form-group"><label>Role / Title</label><input type="text" id="editRole" value="' + esc(u.role) + '"></div>' +
    '<div class="form-group"><label>Bio</label><textarea id="editBio" rows="3">' + esc(u.bio || '') + '</textarea></div>' +
    '<div class="form-group"><label>Skills (click to remove)</label><div class="edit-tags" id="editSkillTags">' + (u.skills || []).map(function (s) { return '<span class="edit-tag">' + esc(s) + '<button type="button" class="rm-tag" onclick="removeEditSkill(\'' + esc(s) + '\')">&times;</button></span>'; }).join('') + '</div><button type="button" class="add-btn" id="addSkillBtn">+ Add Skill</button></div>' +
    '<div class="form-group"><label>Enrolled Courses (click to remove)</label><div id="editCourseList">' + (u.courses || []).map(function (c, i) { return '<div class="edit-exp-item" data-idx="' + i + '"><div class="edit-exp-hdr"><span class="exp-title-sm">' + esc(c.title) + '</span><button type="button" class="rm-exp" onclick="removeEditCourse(' + i + ')">Remove</button></div></div>'; }).join('') + '</div><button type="button" class="add-btn" id="addCourseBtn">+ Add Course</button></div>' +
    '<div class="form-group"><label>Experience</label><div id="editExpList">' + (u.experience || []).map(function (e, i) { var titleStr = e.company ? esc(e.title) + ' at ' + esc(e.company) : esc(e.title); return '<div class="edit-exp-item" data-idx="' + i + '"><div class="edit-exp-hdr"><span class="exp-title-sm">' + titleStr + '</span><button type="button" class="rm-exp" onclick="removeEditExp(' + i + ')">Remove</button></div></div>'; }).join('') + '</div><button type="button" class="add-btn" id="addExpBtn">+ Add Experience</button></div>' +
    '<div class="form-group"><label>Education</label><div id="editEduList">' + (u.education || []).map(function (e, i) { var titleStr = e.institution ? esc(e.degree) + ' at ' + esc(e.institution) : esc(e.degree); return '<div class="edit-exp-item" data-idx="' + i + '"><div class="edit-exp-hdr"><span class="exp-title-sm">' + titleStr + '</span><button type="button" class="rm-exp" onclick="removeEditEdu(' + i + ')">Remove</button></div></div>'; }).join('') + '</div><button type="button" class="add-btn" id="addEduBtn">+ Add Education</button></div>';

  var eo = document.getElementById('editOverlay');
  if (eo) eo.classList.add('active');

  var askBtn = document.getElementById('addSkillBtn');
  if (askBtn) askBtn.onclick = function () {
    captureCurrentEditFields();
    var val = prompt('Enter new skill:');
    if (val && val.trim()) {
      u.skills.push(val.trim());
      USER_DATA.skills = u.skills;
      saveUserData();
      openEditProfile();
    }
  };
  var acBtn = document.getElementById('addCourseBtn');
  if (acBtn) acBtn.onclick = function () {
    captureCurrentEditFields();
    var t = prompt('Course Title:');
    if (!t) return;
    var m = prompt('Platform / Provider (e.g. Coursera, UGC, NPTEL):');
    u.courses = u.courses || [];
    u.courses.push({ title: t.trim(), meta: m ? m.trim() : 'Enrolled Course', desc: 'Self-paced course navigation.', rating: '5.0 &star;', liveUrl: '#' });
    USER_DATA.courses = u.courses;
    saveUserData();
    openEditProfile();
  };
  var axBtn = document.getElementById('addExpBtn');
  if (axBtn) axBtn.onclick = function () {
    captureCurrentEditFields();
    var t = prompt('Title / Role:');
    if (!t) return;
    var c = prompt('Company / Organization (optional):');
    var p = prompt('Period (e.g. 2024 - Present):');
    u.experience.push({ title: t.trim(), company: c ? c.trim() : '', period: p ? p.trim() : '', desc: '' });
    USER_DATA.experience = u.experience;
    saveUserData();
    openEditProfile();
  };
  var aeBtn = document.getElementById('addEduBtn');
  if (aeBtn) aeBtn.onclick = function () {
    captureCurrentEditFields();
    var dd = prompt('Degree / Certificate:');
    if (!dd) return;
    var ii = prompt('Institution / University (optional):');
    var pp = prompt('Period:');
    u.education.push({ degree: dd.trim(), institution: ii ? ii.trim() : '', period: pp ? pp.trim() : '', desc: '' });
    USER_DATA.education = u.education;
    saveUserData();
    openEditProfile();
  };
}

function removeEditSkill(s) {
  captureCurrentEditFields();
  if (!USER_DATA) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  u.skills = u.skills.filter(function (x) { return x !== s; });
  USER_DATA.skills = u.skills;
  saveUserData();
  openEditProfile();
}

function removeEditCourse(i) {
  captureCurrentEditFields();
  if (!USER_DATA) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  u.courses.splice(i, 1);
  USER_DATA.courses = u.courses;
  saveUserData();
  openEditProfile();
}

function removeEditExp(i) {
  captureCurrentEditFields();
  if (!USER_DATA) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  u.experience.splice(i, 1);
  USER_DATA.experience = u.experience;
  saveUserData();
  openEditProfile();
}

function removeEditEdu(i) {
  captureCurrentEditFields();
  if (!USER_DATA) loadUserData();
  var u = STATIC_USER_PROFILE || USER_DATA;
  u.education.splice(i, 1);
  USER_DATA.education = u.education;
  saveUserData();
  openEditProfile();
}

function saveEditProfile() {
  if (!USER_DATA) loadUserData();
  captureCurrentEditFields();
  var eo = document.getElementById('editOverlay');
  if (eo) eo.classList.remove('active');
  saveUserData();
  syncAllPages();
}

function detectHardwareTierAndAutoSetup() {
  var ua = navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
  var ram = navigator.deviceMemory || 4;

  var tier = 'workstation';
  if (ua.indexOf('windows nt 6.1') !== -1 || ua.indexOf('windows nt 6.0') !== -1 || ua.indexOf('android 4.') !== -1 || ua.indexOf('android 5.') !== -1 || ua.indexOf('android 6.') !== -1 || ram < 4) {
    tier = 'legacy';
  } else if (ua.indexOf('mobile') !== -1 || ua.indexOf('android') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1 || ua.indexOf('tablet') !== -1 || ram <= 6) {
    tier = 'mobile';
  }

  window.HARDWARE_TIER = tier;

  var statusBar = document.getElementById('ai-status-bar');
  if (statusBar) statusBar.remove();

  var engineStatus = document.getElementById('chatAiEngineStatus');
  if (engineStatus) {
    engineStatus.innerHTML = 'Online &middot; Auto-Routed (' + esc(tier.toUpperCase()) + ')';
  }
}

function showToast(message) {
  var existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = '<span>⚡</span> <span>' + esc(message) + '</span>';
  document.body.appendChild(toast);
  setTimeout(function () {
    if (toast.parentNode) toast.remove();
  }, 3200);
}

function safeAddEvent(id, ev, fn) {
  var el = document.getElementById(id);
  if (el) el.addEventListener(ev, fn);
}

// Global Exports
window.esc = esc;
window.loadUserData = loadUserData;
window.saveUserData = saveUserData;
window.syncAllPages = syncAllPages;
window.cycleTheme = cycleTheme;
window.applyTheme = applyTheme;
window.switchScreen = switchScreen;
window.switchHub = switchHub;
window.openEditProfile = openEditProfile;
window.removeEditSkill = removeEditSkill;
window.removeEditCourse = removeEditCourse;
window.removeEditExp = removeEditExp;
window.removeEditEdu = removeEditEdu;
window.saveEditProfile = saveEditProfile;
window.detectHardwareTierAndAutoSetup = detectHardwareTierAndAutoSetup;
window.showToast = showToast;
window.safeAddEvent = safeAddEvent;

// DOM Bootstrap
document.addEventListener('DOMContentLoaded', function () {
  loadUserData();
  try {
    var savedTheme = localStorage.getItem('kinetic-theme');
    if (savedTheme && THEMES.indexOf(savedTheme) >= 0) {
      CURRENT_THEME = savedTheme;
    }
  } catch (e) { }
  applyTheme();

  try {
    var savedScreen = localStorage.getItem('kinetic-screen');
    if (savedScreen) switchScreen(savedScreen);
  } catch (e) { }

  syncAllPages();
  if (typeof window.initMindmap === 'function') window.initMindmap();
  if (typeof window.initChat === 'function') window.initChat();

  document.querySelectorAll('[data-screen]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = this.dataset.screen;
      if (id) {
        switchScreen(id);
        var sb = document.querySelector('.sidebar');
        if (sb) sb.classList.remove('open');
        var sbo = document.getElementById('sidebarOverlay');
        if (sbo) sbo.classList.remove('open');
        if (id === 'chat' && typeof window.initChat === 'function') window.initChat();
        if (id === 'path' && typeof window.syncNodePositions === 'function') {
          setTimeout(function () { window.syncNodePositions(); window.drawEdges(); }, 50);
        }
      }
    });
  });

  safeAddEvent('logout-trigger', 'click', function () {
    var lo = document.getElementById('logoutOverlay');
    if (lo) lo.classList.add('active');
  });
  safeAddEvent('logout-trigger-mobile', 'click', function () {
    var lo = document.getElementById('logoutOverlay');
    if (lo) lo.classList.add('active');
  });
  safeAddEvent('cancelLogout', 'click', function () {
    var lo = document.getElementById('logoutOverlay');
    if (lo) lo.classList.remove('active');
  });
  safeAddEvent('confirmLogout', 'click', function () {
    try { localStorage.removeItem('kinetic-auth-user'); } catch (e) { }
    var lo = document.getElementById('logoutOverlay');
    if (lo) lo.classList.remove('active');
    window.location.href = 'landingpage.html';
  });
  safeAddEvent('logoutOverlay', 'click', function (e) {
    if (e.target === this) this.classList.remove('active');
  });
  safeAddEvent('reportOverlay', 'click', function (e) {
    if (e.target === this && typeof window.closeReport === 'function') window.closeReport();
  });
  safeAddEvent('themeToggle', 'click', function () {
    cycleTheme();
    if (typeof window.syncNodePositions === 'function') {
      setTimeout(function () { window.syncNodePositions(); window.drawEdges(); }, 50);
    }
  });

  safeAddEvent('zoomIn', 'click', function () { if (typeof window.zoomIn === 'function') window.zoomIn(); });
  safeAddEvent('zoomOut', 'click', function () { if (typeof window.zoomOut === 'function') window.zoomOut(); });
  safeAddEvent('zoomReset', 'click', function () { if (typeof window.zoomReset === 'function') window.zoomReset(); });
  safeAddEvent('stepPrev', 'click', function () {
    if (typeof window.goToStep === 'function' && window.MINDMAP_NODES && window.MINDMAP_NODES.length) {
      window.goToStep((window.currentStep - 1 + window.MINDMAP_NODES.length) % window.MINDMAP_NODES.length);
    }
  });
  safeAddEvent('stepNext', 'click', function () {
    if (typeof window.goToStep === 'function' && window.MINDMAP_NODES && window.MINDMAP_NODES.length) {
      window.goToStep((window.currentStep + 1) % window.MINDMAP_NODES.length);
    }
  });

  safeAddEvent('editProfileBtn', 'click', openEditProfile);
  safeAddEvent('editCancel', 'click', function () {
    var eo = document.getElementById('editOverlay');
    if (eo) eo.classList.remove('active');
  });
  safeAddEvent('editSave', 'click', saveEditProfile);
  safeAddEvent('editOverlay', 'click', function (e) {
    if (e.target === this) this.classList.remove('active');
  });

  safeAddEvent('menuToggle', 'click', function () {
    var sb = document.querySelector('.sidebar');
    if (sb) sb.classList.toggle('open');
    var sbo = document.getElementById('sidebarOverlay');
    if (sbo) sbo.classList.toggle('open');
  });
  safeAddEvent('sidebarOverlay', 'click', function () {
    var sb = document.querySelector('.sidebar');
    if (sb) sb.classList.remove('open');
    this.classList.remove('open');
  });

  safeAddEvent('chatSend', 'click', function () {
    if (typeof window.sendMessage === 'function') window.sendMessage();
  });
  safeAddEvent('chatInput', 'keydown', function (e) {
    if (e.key === 'Enter' && typeof window.sendMessage === 'function') window.sendMessage();
  });

  // Hub tabs delegation
  document.querySelectorAll('.hub-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var panel = this.dataset.panel;
      if (panel) switchHub(panel);
    });
  });

  // Category guidance delegation on quick chips
  document.querySelectorAll('.stage-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var stage = this.dataset.stage || this.textContent.trim();
      if (stage && typeof window.triggerCategoryGuidance === 'function') {
        window.triggerCategoryGuidance(stage);
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var lo = document.getElementById('logoutOverlay'); if (lo) lo.classList.remove('active');
      if (typeof window.closeReport === 'function') window.closeReport();
      var eo = document.getElementById('editOverlay'); if (eo) eo.classList.remove('active');
    }
    var active = document.querySelector('.screen.active');
    if (!active) return;
    var id = active.id.replace('screen-', '');
    if (e.key === 'ArrowRight' && id === 'path' && typeof window.goToStep === 'function' && window.MINDMAP_NODES) {
      window.goToStep(Math.min(window.currentStep + 1, window.MINDMAP_NODES.length - 1));
    } else if (e.key === 'ArrowLeft' && id === 'path' && typeof window.goToStep === 'function') {
      window.goToStep(Math.max(window.currentStep - 1, 0));
    }
    if (e.key >= '1' && e.key <= '5') {
      var screens = ['chat', 'dashboard', 'path', 'learn', 'profile'];
      var sid = screens[parseInt(e.key, 10) - 1];
      switchScreen(sid);
      if (sid === 'chat' && typeof window.initChat === 'function') window.initChat();
    }
  });

  window.addEventListener('resize', function () {
    if (typeof window.syncNodePositions === 'function') window.syncNodePositions();
    if (typeof window.drawEdges === 'function') window.drawEdges();
  });

  detectHardwareTierAndAutoSetup();
});
