/* ═══════════════════════════════════════════════
   EDUGRAM · app.js — Full Application Logic
   Simulated data interactions via JS objects & DOM
═══════════════════════════════════════════════ */

'use strict';

/* ─── Simulated User Database ─── */
const USERS = [
  { id: 'u1', email: 'student@edugram.edu', password: 'student123', role: 'student', firstName: 'Maria', lastName: 'Santos', studentId: '2024-00101' },
  { id: 'u2', email: 'teacher@edugram.edu', password: 'teacher123', role: 'teacher', firstName: 'Prof. Juan', lastName: 'Dela Cruz', employeeId: 'FAC-2024-001' },
  { id: 'u3', email: 'john@edugram.edu', password: 'john1234', role: 'student', firstName: 'John', lastName: 'Reyes', studentId: '2024-00102' },
];

/* ─── Simulated Assignments Database ─── */
let ASSIGNMENTS = [
  { id: 'a1', title: 'Research Paper: Climate Change', subject: 'English Composition', dueDate: '2026-07-15', minWords: 1200, type: 'research', description: 'Write a well-researched academic paper on the impacts of climate change on Philippine agriculture. Your paper must include an introduction, body with at least three evidence-based arguments, and a strong conclusion. Use APA format for citations.', rubric: 'Content (40%), Research Quality (30%), Writing Mechanics (20%), Formatting (10%)', teacherId: 'u2', createdAt: '2026-06-20T08:00:00Z' },
  { id: 'a2', title: 'Analytical Essay: Social Media', subject: 'Critical Thinking', dueDate: '2026-07-18', minWords: 800, type: 'essay', description: 'Critically analyze the positive and negative effects of social media on academic performance among college students. Present a balanced argument supported by research.', rubric: 'Argumentation (35%), Evidence (35%), Structure (20%), Grammar (10%)', teacherId: 'u2', createdAt: '2026-06-22T09:00:00Z' },
  { id: 'a3', title: 'Book Report: To Kill a Mockingbird', subject: 'Literature', dueDate: '2026-07-05', minWords: 600, type: 'report', description: 'Write a comprehensive book report on Harper Lee\'s "To Kill a Mockingbird". Summarize the plot, analyze main characters, and discuss the major themes of justice and racial inequality.', rubric: 'Summary (25%), Character Analysis (30%), Theme Discussion (35%), Writing (10%)', teacherId: 'u2', createdAt: '2026-06-15T10:00:00Z' },
  { id: 'a4', title: 'Argumentative Essay: Technology in Education', subject: 'English Composition', dueDate: '2026-07-01', minWords: 1000, type: 'essay', description: 'Write a persuasive essay arguing either for or against the extensive use of technology in Philippine classrooms. Support your stance with concrete examples and research.', rubric: 'Thesis Clarity (30%), Support & Evidence (40%), Counter-argument (20%), Mechanics (10%)', teacherId: 'u2', createdAt: '2026-06-10T07:00:00Z' },
];

/* ─── Simulated Submissions ─── */
let SUBMISSIONS = [
  { id: 's1', assignmentId: 'a3', studentId: 'u1', studentName: 'Maria Santos', content: 'To Kill a Mockingbird by Harper Lee is a profound novel set in the American South during the 1930s. The story is narrated by Scout Finch, a young girl who witnesses her father, lawyer Atticus Finch, defend a Black man named Tom Robinson against an unjust accusation of assault. Through Scout\'s innocent eyes, Lee masterfully explores themes of racial injustice, moral growth, and the loss of innocence. The character of Atticus Finch stands as a moral beacon throughout the novel, demonstrating courage and integrity in the face of prejudice. His famous line encapsulates the novel\'s central theme of empathy. Tom Robinson\'s trial is the emotional core of the story, exposing the deep-seated racism embedded in Maycomb\'s society. Despite overwhelming evidence of his innocence, Tom is found guilty, illustrating how prejudice can override justice. The novel ultimately challenges readers to confront their own biases and uphold moral courage.', submittedAt: '2026-07-04T14:32:00Z', version: 2, status: 'graded', feedback: 'Excellent work, Maria! Your character analysis of Atticus is particularly insightful. The quote you selected is perfectly chosen. Consider expanding more on Scout\'s development as a narrator. Strong use of thematic language throughout.', grade: '92/100', feedbackAt: '2026-07-06T09:15:00Z' },
  { id: 's2', assignmentId: 'a4', studentId: 'u1', studentName: 'Maria Santos', content: 'Technology has become an inseparable part of modern education, and its integration into Philippine classrooms presents both remarkable opportunities and significant challenges. This essay argues that, when used thoughtfully and equitably, technology enhances the educational experience and prepares students for an increasingly digital world. However, the current state of technological infrastructure in the Philippines reveals a stark digital divide that must be addressed before full integration can be beneficial. Rural schools often lack reliable internet connectivity, making digital learning tools inaccessible to many students. Despite these challenges, the COVID-19 pandemic demonstrated that technology is not merely a convenience but a necessity in maintaining educational continuity. The shift to online learning, though imperfect, proved that students and teachers could adapt to digital platforms. Moving forward, a blended approach — combining traditional teaching with strategic use of technology — offers the most promising path for Philippine education.', submittedAt: '2026-07-01T16:45:00Z', version: 1, status: 'pending', feedback: null, grade: null, feedbackAt: null },
  { id: 's3', assignmentId: 'a1', studentId: 'u3', studentName: 'John Reyes', content: 'Climate change poses one of the greatest threats to Philippine agriculture, a sector that employs nearly one-third of the country\'s workforce. Rising temperatures, erratic rainfall patterns, and increasingly severe typhoons are disrupting crop cycles and threatening food security across the archipelago. Farmers in the Cagayan Valley, historically one of the most productive agricultural regions, have reported significant changes in planting schedules due to unpredictable monsoon seasons. The traditional indicators they relied upon for generations — flowering of certain trees, migration patterns of birds — no longer reliably predict weather patterns. Rice, the staple crop of the Philippines, is particularly vulnerable to climate change. Studies show that for every degree Celsius increase in temperature during the growing season, rice yields decline by approximately 10%. With projections indicating continued warming, food security becomes an urgent national concern.', submittedAt: '2026-07-10T11:20:00Z', version: 1, status: 'pending', feedback: null, grade: null, feedbackAt: null },
];

/* ─── Simulated Drafts ─── */
let DRAFTS = {
  'u1-a1': { content: '', savedAt: null, version: 1 },
  'u1-a2': { content: '', savedAt: null, version: 1 },
};

/* ─── Notifications & Announcements Database ─── */
let NOTIFICATIONS = [
  { id: 'n1', text: 'System Maintenance scheduled for Friday at midnight.', date: '2026-05-25T10:00:00Z', read: false, type: 'system' },
  { id: 'n2', text: 'New writing rubrics have been published.', date: '2026-05-20T08:00:00Z', read: false, type: 'system' },
  { id: 'n3', text: 'Prof. Juan Dela Cruz posted a new task: "Research Paper: Climate Change".', date: '2026-06-01T09:15:00Z', read: false, type: 'teacher' }
];

/* ─── Private Context Dialogue Database ─── */
let PRIVATE_COMMENTS = [
  { id: 'c1', assignmentId: 'a1', studentId: 'u1', senderRole: 'student', text: 'Professor, I don\'t understand the rubric regarding research quality. Do we need local sources?', timestamp: '2026-06-02T14:00:00Z' },
  { id: 'c2', assignmentId: 'a1', studentId: 'u1', senderRole: 'teacher', text: 'Yes Maria, please include at least 3 peer-reviewed studies from local journals.', timestamp: '2026-06-02T15:30:00Z' }
];

/* ─── Writing Error Simulation Database ─── */
const SIMULATED_ERRORS = [
  { pattern: /\bteh\b/gi, type: 'spell', error: 'teh', fix: 'the', note: 'Spelling error' },
  { pattern: /\brecieve\b/gi, type: 'spell', error: 'recieve', fix: 'receive', note: 'i before e' },
  { pattern: /\bdefinate\b/gi, type: 'spell', error: 'definate', fix: 'definite', note: 'Common misspelling' },
  { pattern: /\boccured\b/gi, type: 'spell', error: 'occured', fix: 'occurred', note: 'Double r' },
  { pattern: /\bseperate\b/gi, type: 'spell', error: 'seperate', fix: 'separate', note: 'Common misspelling' },
  { pattern: /\buntil\b.*\buntill\b|\buntill\b/gi, type: 'spell', error: 'untill', fix: 'until', note: 'Single l' },
  { pattern: /\bneccessary\b/gi, type: 'spell', error: 'neccessary', fix: 'necessary', note: 'One c, two s' },
  { pattern: /\baccomodate\b/gi, type: 'spell', error: 'accomodate', fix: 'accommodate', note: 'Double m' },
  { pattern: /\btheir\s+is\b/gi, type: 'grammar', error: 'their is', fix: 'there is', note: 'Incorrect homophone' },
  { pattern: /\byour\s+welcome\b/gi, type: 'grammar', error: 'your welcome', fix: "you're welcome", note: "Use you're (contraction)" },
  { pattern: /\bshould\s+of\b/gi, type: 'grammar', error: 'should of', fix: 'should have', note: 'Incorrect phrase' },
  { pattern: /\bcould\s+of\b/gi, type: 'grammar', error: 'could of', fix: 'could have', note: 'Incorrect phrase' },
  { pattern: /\bwould\s+of\b/gi, type: 'grammar', error: 'would of', fix: 'would have', note: 'Incorrect phrase' },
  { pattern: /\bits\s+a\b/gi, type: 'grammar', error: "its a", fix: "it's a", note: "Missing apostrophe in it's" },
  { pattern: /,\s*and\s+also\b/gi, type: 'grammar', error: ', and also', fix: ', and', note: '"Also" is redundant here' },
  { pattern: /\.\s*[a-z]/g, type: 'punct', error: 'lowercase after period', fix: 'Capitalize after period', note: 'Punctuation error' },
  { pattern: /\s{2,}/g, type: 'punct', error: 'extra spaces', fix: 'single space', note: 'Remove extra spaces' },
];

const STYLE_SUGGESTIONS = [
  { note: 'Consider varying your sentence length for better rhythm and flow.' },
  { note: 'The passive voice was detected. Try using active voice for stronger writing.' },
  { note: 'Some sentences may be too long. Consider breaking them for clarity.' },
];

/* ─── App State ─── */
let state = {
  currentUser: null,
  studentPanel: 's-overview',
  teacherPanel: 't-overview',
  checkCount: 0,
  feedbackModal: { submissionId: null, activeStudentId: null, activeAssignmentId: null }
};

/* ══════════════════════════════════════════════
   INITIALIZATION
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initStudentDashboard();
  initTeacherDashboard();
  initEditor();
  initNotifications();
  initProfile();
});

/* ══════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════ */
function initAuth() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab + '-form').classList.add('active');
    });
  });

  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('login-email').value = btn.dataset.email;
      document.getElementById('login-password').value = btn.dataset.pass;
      document.getElementById('role-select').value = btn.dataset.role;
    });
  });

  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('login-password').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('register-btn').addEventListener('click', handleRegister);

  document.getElementById('student-logout').addEventListener('click', () => logout('student'));
  document.getElementById('teacher-logout').addEventListener('click', () => logout('teacher'));
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('role-select').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  if (!email || !password || !role) { showError(errEl, 'Please fill all components.'); return; }

  const user = USERS.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) { showError(errEl, 'Invalid configuration parameters.'); return; }

  state.currentUser = user;
  enterDashboard(user);
}

function handleRegister() {
  const first = document.getElementById('reg-first').value.trim();
  const last = document.getElementById('reg-last').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const id = document.getElementById('reg-id').value.trim();
  const pass = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role-select').value;
  const errEl = document.getElementById('register-error');
  const succEl = document.getElementById('register-success');
  errEl.classList.add('hidden'); succEl.classList.add('hidden');

  if (!first || !last || !email || !id || !pass || !role) { showError(errEl, 'All entries mandatory.'); return; }
  if (USERS.find(u => u.email === email)) { showError(errEl, 'Email exists.'); return; }

  const newUser = { id: 'u' + Date.now(), email, password: pass, role, firstName: first, lastName: last };
  if (role === 'student') newUser.studentId = id; else newUser.employeeId = id;
  USERS.push(newUser);

  succEl.textContent = `Registered! Redirection initiated.`;
  succEl.classList.remove('hidden');
  setTimeout(() => {
    document.querySelectorAll('.auth-tab')[0].click();
    document.getElementById('login-email').value = email;
  }, 1500);
}

function enterDashboard(user) {
  showScreen('auth-screen', false);
  if (user.role === 'student') {
    showScreen('student-screen', true);
    loadStudentDashboard(user);
  } else {
    showScreen('teacher-screen', true);
    loadTeacherDashboard(user);
  }
}

function logout(role) {
  state.currentUser = null;
  showScreen(role + '-screen', false);
  showScreen('auth-screen', true);
}

function showScreen(id, show) {
  const el = document.getElementById(id);
  if (show) el.classList.add('active'); else el.classList.remove('active');
}

function showError(el, msg) { el.textContent = msg; el.classList.remove('hidden'); }

/* ══════════════════════════════════════════════
   STUDENT DASHBOARD & PEER VIEWS
══════════════════════════════════════════════ */
function initStudentDashboard() {
  document.querySelectorAll('#student-sidebar .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      switchStudentPanel(item.dataset.panel);
    });
  });

  document.getElementById('student-menu-toggle').addEventListener('click', () => {
    document.getElementById('student-sidebar').classList.toggle('open');
  });

  document.querySelectorAll('#s-assignments .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#s-assignments .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStudentAssignments(btn.dataset.filter);
    });
  });

  // Private comment dispatch listener
  document.getElementById('student-send-comment-btn').addEventListener('click', dispatchStudentComment);
}

function loadStudentDashboard(user) {
  document.getElementById('student-welcome-name').textContent = user.firstName;
  document.getElementById('student-name').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('student-avatar').textContent = user.firstName[0];

  syncStudentStats();
  renderStudentAssignments('all');
  renderSubmissionHistory();
  renderStudentFeedback();
  populateAssignmentSelect();
  renderStudentNotificationDropdown();
  renderStudentOverviewAnnouncements();
  populateStudentProfileFields();
}

function syncStudentStats() {
  const total = ASSIGNMENTS.length;
  const submitted = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id).length;
  const pending = total - submitted;
  const feedback = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id && s.status === 'graded').length;

  document.getElementById('stat-total-assign').textContent = total;
  document.getElementById('stat-submitted-assign').textContent = submitted;
  document.getElementById('stat-pending-assign').textContent = pending;
  document.getElementById('stat-feedback-count').textContent = feedback;
  document.getElementById('pending-count').textContent = pending;
  document.getElementById('feedback-count').textContent = feedback;
}

function switchStudentPanel(panelId) {
  document.querySelectorAll('#student-sidebar .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.panel === panelId);
  });
  document.querySelectorAll('#student-main .panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === panelId);
  });
  
  const titles = {
    's-overview': 'Overview', 's-assignments': 'Assignments',
    's-editor': 'Writing Editor', 's-history': 'Submission History',
    's-feedback': 'Teacher Feedback', 's-people': 'Classmates', 's-profile': 'Profile Settings'
  };
  
  document.getElementById('student-panel-title').textContent = titles[panelId] || '';
  state.studentPanel = panelId;

  if (panelId === 's-people') renderStudentClassDirectory();
  if (panelId === 's-profile') populateStudentProfileFields();
}

function renderStudentClassDirectory() {
  const tbody = document.getElementById('student-people-tbody');
  // Filter and display classmates alongside teachers, without delete tools
  tbody.innerHTML = USERS.map(u => `
    <tr>
      <td><strong>${u.firstName} ${u.lastName}</strong></td>
      <td>${u.email}</td>
      <td><span class="ac-badge ${u.role === 'teacher' ? 'badge-graded' : 'badge-pending'}">${u.role.toUpperCase()}</span></td>
      <td>${u.studentId || u.employeeId || 'N/A'}</td>
    </tr>
  `).join('');
}

function renderStudentOverviewAnnouncements() {
  const container = document.getElementById('student-overview-announcements');
  const teacherNotifs = NOTIFICATIONS.filter(n => n.type === 'teacher');
  
  if (!teacherNotifs.length) {
    container.innerHTML = `<p style="font-size:0.85rem; color:var(--gray-400); font-style:italic;">No active announcements posted by your instructor.</p>`;
    return;
  }

  container.innerHTML = teacherNotifs.map(n => `
    <div class="activity-item" style="margin-bottom:0.75rem;">
      <div class="activity-icon feedback" style="background: var(--gold-pale); color: var(--gold);"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"/></svg></div>
      <div class="activity-text">
        <span>${n.text}</span>
        <time>${new Date(n.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</time>
      </div>
    </div>
  `).join('');
}

function getStudentSubmission(assignmentId) {
  return SUBMISSIONS.find(s => s.assignmentId === assignmentId && s.studentId === state.currentUser.id) || null;
}

function getAssignmentStatus(assignment) {
  const sub = getStudentSubmission(assignment.id);
  if (!sub) return new Date(assignment.dueDate) < new Date() ? 'overdue' : 'pending';
  return sub.status === 'graded' ? 'graded' : 'submitted';
}

function renderStudentAssignments(filter = 'all') {
  const grid = document.getElementById('student-assignment-grid');
  const overviewDeadlines = document.getElementById('student-overview-deadlines');
  
  let targeted = ASSIGNMENTS;
  if (filter !== 'all') targeted = ASSIGNMENTS.filter(a => getAssignmentStatus(a) === filter);

  // Synchronize internal layout grids
  if (overviewDeadlines && filter === 'all') {
    overviewDeadlines.innerHTML = ASSIGNMENTS.slice(0, 3).map(a => {
      const stat = getAssignmentStatus(a);
      return `
        <div class="deadline-item ${stat === 'overdue' ? 'urgent' : ''}">
          <div class="deadline-dot"></div>
          <div class="deadline-info">
            <span class="deadline-title">${a.title}</span>
            <span class="deadline-sub">${a.subject}</span>
          </div>
          <span class="deadline-badge ${stat === 'overdue' ? 'urgent' : ''}">${stat.toUpperCase()}</span>
        </div>`;
    }).join('');
  }

  if (!targeted.length) {
    grid.innerHTML = '<p style="color:var(--gray-400); font-style: italic; padding: 1rem;">No matching workspace materials found.</p>';
    return;
  }

  grid.innerHTML = targeted.map(a => {
    const status = getAssignmentStatus(a);
    const badgeMap = { pending: ['badge-pending', 'Pending'], submitted: ['badge-submitted', 'Submitted'], graded: ['badge-graded', 'Graded'], overdue: ['badge-overdue', 'Overdue'] };
    const [bClass, bLabel] = badgeMap[status] || ['badge-pending', 'Pending'];
    return `
      <div class="assignment-card">
        <div class="ac-header">
          <span class="ac-title">${a.title}</span>
          <span class="ac-badge ${bClass}">${bLabel}</span>
        </div>
        <div class="ac-subject">${a.subject}</div>
        <div class="ac-desc">${a.description}</div>
        <div class="ac-footer">
          <span class="ac-due">Due: <strong>${a.dueDate}</strong></span>
          <span class="ac-action open-editor" data-id="${a.id}">Workspace →</span>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.open-editor').forEach(btn => {
    btn.addEventListener('click', () => openEditorForAssignment(btn.dataset.id));
  });
}

function openEditorForAssignment(id) {
  switchStudentPanel('s-editor');
  const select = document.getElementById('assignment-select');
  select.value = id;
  select.dispatchEvent(new Event('change'));
}

function renderSubmissionHistory() {
  const tbody = document.getElementById('history-tbody');
  const mySubs = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id);
  
  if (!mySubs.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; font-style:italic; padding:2rem;">No documentation records found.</td></tr>';
    return;
  }

  tbody.innerHTML = mySubs.map(s => {
    const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
    return `
      <tr>
        <td><strong>${a ? a.title : 'Deleted Module'}</strong></td>
        <td>v${s.version}</td>
        <td>${new Date(s.submittedAt).toLocaleString('en-PH')}</td>
        <td><span class="ac-badge ${s.status === 'graded' ? 'badge-graded' : 'badge-submitted'}">${s.status.toUpperCase()}</span></td>
        <td><button class="ac-action" style="padding:.2rem .5rem;" onclick="alert('Module locked for editing.')">Review</button></td>
      </tr>`;
  }).join('');
}

function renderStudentFeedback() {
  const list = document.getElementById('student-feedback-list');
  const graded = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id && s.status === 'graded');

  if (!graded.length) {
    list.innerHTML = '<div style="padding:2rem; font-style:italic; color:var(--gray-400);">Assessments undergoing review lines.</div>';
    return;
  }

  list.innerHTML = graded.map(s => {
    const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
    return `
      <div class="feedback-card">
        <div class="feedback-card-header">
          <h4>${a ? a.title : 'Assignment Outline'}</h4>
          <span class="feedback-grade">${s.grade}</span>
        </div>
        <div class="feedback-body">
          <div class="feedback-text">${s.feedback}</div>
          ${s.privateNote ? `<div style="margin-top:0.5rem; font-size:0.75rem; color:var(--red);">* Dispatched Note Correction Layer active *</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   PRIVATE DISCUSSIONS / COMMENTING INFRASTRUCTURE
══════════════════════════════════════════════ */
function renderContextualCommentsThread(assignmentId, studentId) {
  const threadBox = state.currentUser.role === 'student' 
    ? document.getElementById('student-comments-thread')
    : document.getElementById('teacher-modal-comments-thread');
    
  if (!threadBox) return;

  const relevant = PRIVATE_COMMENTS.filter(c => c.assignmentId === assignmentId && c.studentId === studentId);

  if (!relevant.length) {
    threadBox.innerHTML = `<p style="font-size:0.78rem; color:var(--gray-400); font-style:italic; text-align:center; padding:1rem; width:100%;">No private comments exchanged yet.</p>`;
    return;
  }

  threadBox.innerHTML = relevant.map(c => {
    const bubbleClass = c.senderRole === 'student' ? 'student-type' : 'teacher-type';
    const alignStyle = c.senderRole === 'student' ? 'flex-start' : 'flex-end';
    const senderName = c.senderRole === 'student' ? 'You' : 'Instructor';
    
    return `
      <div style="display:flex; flex-direction:column; align-items:${alignStyle}; width:100%;">
        <div class="comment-bubble ${bubbleClass}">
          <strong>${senderName}:</strong> ${c.text}
          <span class="comment-timestamp">${new Date(c.timestamp).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    `;
  }).join('');
  
  threadBox.scrollTop = threadBox.scrollHeight;
}

function dispatchStudentComment() {
  const assignmentId = document.getElementById('assignment-select').value;
  const input = document.getElementById('student-comment-input');
  const text = input.value.trim();

  if (!assignmentId) { alert('Please select an active assignment layout first.'); return; }
  if (!text) return;

  PRIVATE_COMMENTS.push({
    id: 'c' + Date.now(),
    assignmentId,
    studentId: state.currentUser.id,
    senderRole: 'student',
    text,
    timestamp: new Date().toISOString()
  });

  input.value = '';
  renderContextualCommentsThread(assignmentId, state.currentUser.id);
}

function dispatchTeacherComment() {
  const text = document.getElementById('teacher-modal-comment-input').value.trim();
  const assignmentId = state.feedbackModal.activeAssignmentId;
  const studentId = state.feedbackModal.activeStudentId;

  if (!text || !assignmentId || !studentId) return;

  PRIVATE_COMMENTS.push({
    id: 'c' + Date.now(),
    assignmentId,
    studentId,
    senderRole: 'teacher',
    text,
    timestamp: new Date().toISOString()
  });

  document.getElementById('teacher-modal-comment-input').value = '';
  renderContextualCommentsThread(assignmentId, studentId);
}

/* ══════════════════════════════════════════════
   STUDENT PROFILE MANAGEMENT
══════════════════════════════════════════════ */
function populateStudentProfileFields() {
  if (!state.currentUser || state.currentUser.role !== 'student') return;
  document.getElementById('student-profile-first').value = state.currentUser.firstName;
  document.getElementById('student-profile-last').value = state.currentUser.lastName;
  document.getElementById('student-profile-email').value = state.currentUser.email;
  document.getElementById('student-profile-pass').value = '';
}

function initProfile() {
  document.getElementById('save-profile-btn').addEventListener('click', saveTeacherProfile);
  document.getElementById('student-save-profile-btn').addEventListener('click', saveStudentProfile);
}

function saveStudentProfile() {
  const first = document.getElementById('student-profile-first').value.trim();
  const last = document.getElementById('student-profile-last').value.trim();
  const pass = document.getElementById('student-profile-pass').value;

  if (!first || !last) { alert('Identity fields cannot be left empty.'); return; }

  state.currentUser.firstName = first;
  state.currentUser.lastName = last;
  if (pass) state.currentUser.password = pass;

  // Sync structural layouts
  document.getElementById('student-name').textContent = `${first} ${last}`;
  document.getElementById('student-welcome-name').textContent = first;
  document.getElementById('student-avatar').textContent = first[0];

  const toast = document.getElementById('student-profile-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function saveTeacherProfile() {
  const first = document.getElementById('profile-first').value.trim();
  const last = document.getElementById('profile-last').value.trim();
  const pass = document.getElementById('profile-pass').value;

  if (first) state.currentUser.firstName = first;
  if (last) state.currentUser.lastName = last;
  if (pass) state.currentUser.password = pass;

  document.getElementById('teacher-welcome-name').textContent = state.currentUser.firstName;
  document.getElementById('teacher-name').textContent = `${state.currentUser.firstName} ${state.currentUser.lastName}`;

  const toast = document.getElementById('profile-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}

/* ══════════════════════════════════════════════
   EDITOR INFRASTRUCTURE
══════════════════════════════════════════════ */
function initEditor() {
  const select = document.getElementById('assignment-select');
  const area = document.getElementById('writing-area');

  select.addEventListener('change', () => {
    const id = select.value;
    if (!id) {
      document.getElementById('meta-title').textContent = '—';
      document.getElementById('meta-due').textContent = '—';
      document.getElementById('meta-words').textContent = '—';
      area.textContent = '';
      document.getElementById('student-comments-card').classList.add('hidden');
      return;
    }
    
    // Make comment workspace view visible dynamically
    document.getElementById('student-comments-card').classList.remove('hidden');
    renderContextualCommentsThread(id, state.currentUser.id);

    const a = ASSIGNMENTS.find(x => x.id === id);
    if (!a) return;
    document.getElementById('meta-title').textContent = a.title;
    document.getElementById('meta-due').textContent = a.dueDate;
    document.getElementById('meta-words').textContent = a.minWords;

    const dKey = `${state.currentUser.id}-${id}`;
    area.textContent = DRAFTS[dKey] ? DRAFTS[dKey].content : '';
    updateWordCount();
    resetAssistant();
  });

  area.addEventListener('input', updateWordCount);
  document.getElementById('save-draft-btn').addEventListener('click', saveDraft);
  document.getElementById('submit-assignment-btn').addEventListener('click', submitAssignment);
  document.getElementById('check-writing-btn').addEventListener('click', checkWriting);
}

function populateAssignmentSelect() {
  const select = document.getElementById('assignment-select');
  if (!select) return;
  select.innerHTML = '<option value="">— Select Assignment —</option>';
  ASSIGNMENTS.forEach(a => {
    const sub = getStudentSubmission(a.id);
    select.innerHTML += `<option value="${a.id}">${a.title} ${sub ? '[Submitted]' : ''}</option>`;
  });
}

function updateWordCount() {
  const area = document.getElementById('writing-area');
  const text = area.innerText || area.textContent || '';
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  document.getElementById('word-count-display').textContent = `${words} words`;
}

function saveDraft() {
  const id = document.getElementById('assignment-select').value;
  if (!id) return;
  const content = document.getElementById('writing-area').innerText;
  DRAFTS[`${state.currentUser.id}-${id}`] = { content, savedAt: new Date().toISOString() };
  
  const btn = document.getElementById('save-draft-btn');
  btn.textContent = 'Saved!';
  setTimeout(() => btn.textContent = 'Save Draft', 1000);
}

function submitAssignment() {
  const id = document.getElementById('assignment-select').value;
  const content = document.getElementById('writing-area').innerText.trim();
  if (!id || !content) return;

  const existing = SUBMISSIONS.find(s => s.assignmentId === id && s.studentId === state.currentUser.id);
  if (existing) {
    existing.content = content;
    existing.submittedAt = new Date().toISOString();
    existing.version++;
  } else {
    SUBMISSIONS.push({
      id: 's' + Date.now(), assignmentId: id, studentId: state.currentUser.id,
      studentName: `${state.currentUser.firstName} ${state.currentUser.lastName}`,
      content, submittedAt: new Date().toISOString(), version: 1, status: 'pending'
    });
  }

  document.getElementById('submit-toast').classList.remove('hidden');
  setTimeout(() => document.getElementById('submit-toast').classList.add('hidden'), 2000);
  
  syncStudentStats();
  renderSubmissionHistory();
  populateAssignmentSelect();
}

/* ══════════════════════════════════════════════
   WRITING ASSISTANT ENGINE
══════════════════════════════════════════════ */
function checkWriting() {
  const text = document.getElementById('writing-area').innerText;
  if (!text.trim()) return;

  const errors = [];
  SIMULATED_ERRORS.forEach(rule => {
    if (text.match(rule.pattern)) {
      errors.push({ type: rule.type, error: rule.error, fix: rule.fix, note: rule.note });
    }
  });

  document.getElementById('error-count').textContent = errors.length;
  const eList = document.getElementById('error-list');
  if (!errors.length) {
    eList.innerHTML = '<div class="suggestion-item"><span class="s-fix">Grammar constraints sound.</span></div>';
  } else {
    eList.innerHTML = errors.map(e => `
      <div class="suggestion-item">
        <span class="s-type" style="color:var(--red);">${e.type.toUpperCase()}</span>
        <span class="s-error">"${e.error}"</span> -> <span class="s-fix">"${e.fix}"</span>
        <p class="s-note">${e.note}</p>
      </div>`).join('');
  }
  
  document.getElementById('score-num').textContent = Math.max(60, 100 - (errors.length * 7));
  document.getElementById('score-arc').style.strokeDasharray = `85, 100`;
}

function resetAssistant() {
  document.getElementById('error-list').innerHTML = '<p class="empty-hint">Scan execution lines ready.</p>';
  document.getElementById('error-count').textContent = '0';
  document.getElementById('score-num').textContent = '—';
}

/* ══════════════════════════════════════════════
   TEACHER OPERATION CENTRE
══════════════════════════════════════════════ */
function initTeacherDashboard() {
  document.querySelectorAll('#teacher-sidebar .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      switchTeacherPanel(item.dataset.panel);
    });
  });

  document.getElementById('teacher-menu-toggle').addEventListener('click', () => {
    document.getElementById('teacher-sidebar').classList.toggle('open');
  });

  document.getElementById('create-assignment-btn').addEventListener('click', createAssignment);
  document.getElementById('teacher-modal-send-comment-btn').addEventListener('click', dispatchTeacherComment);

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-submit-feedback').addEventListener('click', submitFeedback);
}

function loadTeacherDashboard(user) {
  document.getElementById('teacher-welcome-name').textContent = user.firstName;
  document.getElementById('teacher-name').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('teacher-avatar').textContent = user.firstName[0];

  syncTeacherStats();
  renderRecentSubmissions();
}

function syncTeacherStats() {
  document.getElementById('t-total-students').textContent = USERS.filter(u => u.role === 'student').length;
  document.getElementById('t-total-assignments').textContent = ASSIGNMENTS.length;
  document.getElementById('t-pending-review').textContent = SUBMISSIONS.filter(s => s.status === 'pending').length;
  document.getElementById('t-graded').textContent = SUBMISSIONS.filter(s => s.status === 'graded').length;
  document.getElementById('t-pending-count').textContent = SUBMISSIONS.filter(s => s.status === 'pending').length;
}

function switchTeacherPanel(panelId) {
  document.querySelectorAll('#teacher-sidebar .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.panel === panelId);
  });
  document.querySelectorAll('#teacher-main .panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === panelId);
  });

  if (panelId === 't-submissions') renderSubmissionsList('all');
  if (panelId === 't-assignments') renderTeacherAssignments();
  if (panelId === 't-people') renderPeopleList();
  if (panelId === 't-profile') populateProfile();
}

function renderRecentSubmissions() {
  const container = document.getElementById('t-recent-submissions');
  const pending = SUBMISSIONS.filter(s => s.status === 'pending');
  
  if (!pending.length) {
    container.innerHTML = '<p style="padding:1rem; font-style:italic;">All clean! No queues remaining.</p>';
    return;
  }
  container.innerHTML = pending.map(s => renderSubmissionCard(s)).join('');
  container.querySelectorAll('.review-btn').forEach(b => b.addEventListener('click', () => openFeedbackModal(b.dataset.sid)));
}

function renderSubmissionsList(filter = 'all') {
  const container = document.getElementById('submissions-list');
  let filtered = SUBMISSIONS;
  if (filter === 'pending') filtered = SUBMISSIONS.filter(s => s.status === 'pending');
  if (filter === 'graded') filtered = SUBMISSIONS.filter(s => s.status === 'graded');

  container.innerHTML = filtered.map(s => renderSubmissionCard(s)).join('');
  container.querySelectorAll('.review-btn').forEach(b => b.addEventListener('click', () => openFeedbackModal(b.dataset.sid)));
}

function renderSubmissionCard(s) {
  const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
  return `
    <div class="submission-card" style="margin-bottom:0.5rem;">
      <div class="submission-avatar">${s.studentName[0]}</div>
      <div class="submission-info">
        <div class="submission-student">${s.studentName}</div>
        <div class="submission-assignment">${a ? a.title : 'Deleted Context'}</div>
      </div>
      <div class="submission-actions">
        ${s.status === 'graded' ? `<span>${s.grade}</span>` : `<button class="review-btn" data-sid="${s.id}">Review</button>`}
      </div>
    </div>`;
}

function openFeedbackModal(submissionId) {
  const s = SUBMISSIONS.find(x => x.id === submissionId);
  if (!s) return;
  const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);

  state.feedbackModal.submissionId = submissionId;
  state.feedbackModal.activeStudentId = s.studentId;
  state.feedbackModal.activeAssignmentId = s.assignmentId;

  document.getElementById('modal-student').textContent = s.studentName;
  document.getElementById('modal-assignment').textContent = a ? a.title : '—';
  document.getElementById('modal-submitted').textContent = new Date(s.submittedAt).toLocaleString();
  document.getElementById('modal-text').textContent = s.content;

  // Render inline discussion streams matching cross-functional scopes
  renderContextualCommentsThread(s.assignmentId, s.studentId);

  document.getElementById('feedback-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('feedback-modal').classList.add('hidden'); }

function submitFeedback() {
  const s = SUBMISSIONS.find(x => x.id === state.feedbackModal.submissionId);
  if (!s) return;

  s.feedback = document.getElementById('modal-feedback-text').value;
  s.grade = document.getElementById('modal-grade').value || 'Passed';
  s.status = 'graded';

  closeModal();
  syncTeacherStats();
  renderRecentSubmissions();
}

function createAssignment() {
  const title = document.getElementById('new-assignment-title').value.trim();
  const subject = document.getElementById('new-assignment-subject').value.trim();
  const dueDate = document.getElementById('new-assignment-due').value;
  const desc = document.getElementById('new-assignment-desc').value.trim();

  if (!title || !dueDate || !desc) { alert('Fill mandatory parameters.'); return; }

  const newId = 'a' + Date.now();
  ASSIGNMENTS.unshift({ id: newId, title, subject, dueDate, description: desc, minWords: 500, type: 'essay' });

  // PUSH ANNOUNCEMENT DIRECTLY SO STUDENTS RECEIVE THE NOTIFICATION DYNAMICALLY
  NOTIFICATIONS.unshift({
    id: 'n' + Date.now(),
    text: `${state.currentUser ? state.currentUser.firstName : 'Instructor'} posted a new task: "${title}".`,
    date: new Date().toISOString(),
    read: false,
    type: 'teacher'
  });

  const succEl = document.getElementById('create-success');
  succEl.textContent = 'Assignment published and notification pushed!';
  succEl.classList.remove('hidden');

  setTimeout(() => {
    succEl.classList.add('hidden');
    switchTeacherPanel('t-assignments');
  }, 1500);
}

function renderTeacherAssignments() {
  const container = document.getElementById('teacher-assignment-list');
  container.innerHTML = ASSIGNMENTS.map(a => `
    <div class="t-assignment-row" style="padding:1rem; background:white; margin-bottom:0.5rem; border-radius:8px; display:flex; justify-content:space-between;">
      <div>
        <strong>${a.title}</strong>
        <div style="font-size:0.75rem; color:var(--gray-400);">${a.subject} · Due ${a.dueDate}</div>
      </div>
      <button class="ta-del" data-aid="${a.id}">Remove</button>
    </div>
  `).join('');

  container.querySelectorAll('.ta-del').forEach(b => b.addEventListener('click', () => {
    ASSIGNMENTS = ASSIGNMENTS.filter(x => x.id !== b.dataset.aid);
    renderTeacherAssignments();
    syncTeacherStats();
  }));
}

function renderPeopleList() {
  const tbody = document.getElementById('people-tbody');
  tbody.innerHTML = USERS.map(u => `
    <tr>
      <td><strong>${u.firstName} ${u.lastName}</strong></td>
      <td>${u.email}</td>
      <td>${u.role.toUpperCase()}</td>
      <td>${u.studentId || u.employeeId || 'N/A'}</td>
      <td><button class="ta-del" onclick="deleteUser('${u.id}')">Remove</button></td>
    </tr>`).join('');
}

window.deleteUser = function(id) {
  const idx = USERS.findIndex(u => u.id === id);
  if (idx > -1) USERS.splice(idx, 1);
  renderPeopleList();
  syncTeacherStats();
};

function populateProfile() {
  document.getElementById('profile-first').value = state.currentUser.firstName;
  document.getElementById('profile-last').value = state.currentUser.lastName;
}

/* ══════════════════════════════════════════════
   NOTIFICATIONS COMPONENT ENGINE
══════════════════════════════════════════════ */
function initNotifications() {
  // Setup Instructor-side notification popups
  document.getElementById('notif-toggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const drop = document.getElementById('notif-dropdown');
    drop.classList.toggle('hidden');
    if (!drop.classList.contains('hidden')) {
      const list = document.getElementById('notif-list');
      list.innerHTML = NOTIFICATIONS.map(n => `<div style="font-size:0.8rem; margin-bottom:0.4rem;">${n.text}</div>`).join('');
      document.getElementById('notif-indicator').classList.add('hidden');
    }
  });

  // Setup Student-side notice dashboard pipelines
  const studentToggle = document.getElementById('student-notif-toggle');
  if (studentToggle) {
    studentToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const drop = document.getElementById('student-notif-dropdown');
      drop.classList.toggle('hidden');
      if (!drop.classList.contains('hidden')) {
        renderStudentNotificationDropdown();
        // Clear warning badge array parameters natively once viewed
        document.getElementById('student-notif-indicator').classList.add('hidden');
        NOTIFICATIONS.forEach(n => n.read = true);
      }
    });
  }

  // Clear menus on workspace body clicks
  document.addEventListener('click', () => {
    document.getElementById('notif-dropdown')?.classList.add('hidden');
    document.getElementById('student-notif-dropdown')?.classList.add('hidden');
  });
}

function renderStudentNotificationDropdown() {
  const list = document.getElementById('student-notif-list');
  const indicator = document.getElementById('student-notif-indicator');
  if (!list) return;

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;
  if (unreadCount > 0 && indicator) {
    indicator.classList.remove('hidden');
  }

  if (!NOTIFICATIONS.length) {
    list.innerHTML = `<p style="font-size:0.8rem; color:var(--gray-400); text-align:center; padding:0.5rem;">No notifications found.</p>`;
    return;
  }

  list.innerHTML = NOTIFICATIONS.map(n => {
    const boldStyle = !n.read ? 'font-weight: 600; color: var(--navy);' : 'color: var(--gray-700);';
    const accentBorder = n.type === 'teacher' ? 'border-left: 2px solid var(--gold); padding-left: 4px;' : '';
    return `
      <div style="font-size:0.82rem; padding-bottom:0.5rem; border-bottom:1px solid var(--gray-100); ${boldStyle} ${accentBorder}">
        ${n.text}
        <div style="font-size:0.68rem; color:var(--gray-400); margin-top:0.15rem;">
          ${new Date(n.date).toLocaleDateString('en-PH')}
        </div>
      </div>
    `;
  }).join('');
}