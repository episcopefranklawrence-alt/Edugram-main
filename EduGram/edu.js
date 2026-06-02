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
  { id: 'a1', title: 'Research Paper: Climate Change', subject: 'English Composition', dueDate: '2025-07-15', minWords: 1200, type: 'research', description: 'Write a well-researched academic paper on the impacts of climate change on Philippine agriculture. Your paper must include an introduction, body with at least three evidence-based arguments, and a strong conclusion. Use APA format for citations.', rubric: 'Content (40%), Research Quality (30%), Writing Mechanics (20%), Formatting (10%)', teacherId: 'u2', createdAt: '2025-06-20T08:00:00Z' },
  { id: 'a2', title: 'Analytical Essay: Social Media', subject: 'Critical Thinking', dueDate: '2025-07-18', minWords: 800, type: 'essay', description: 'Critically analyze the positive and negative effects of social media on academic performance among college students. Present a balanced argument supported by research.', rubric: 'Argumentation (35%), Evidence (35%), Structure (20%), Grammar (10%)', teacherId: 'u2', createdAt: '2025-06-22T09:00:00Z' },
  { id: 'a3', title: 'Book Report: To Kill a Mockingbird', subject: 'Literature', dueDate: '2025-07-05', minWords: 600, type: 'report', description: 'Write a comprehensive book report on Harper Lee\'s "To Kill a Mockingbird". Summarize the plot, analyze main characters, and discuss the major themes of justice and racial inequality.', rubric: 'Summary (25%), Character Analysis (30%), Theme Discussion (35%), Writing (10%)', teacherId: 'u2', createdAt: '2025-06-15T10:00:00Z' },
  { id: 'a4', title: 'Argumentative Essay: Technology in Education', subject: 'English Composition', dueDate: '2025-07-01', minWords: 1000, type: 'essay', description: 'Write a persuasive essay arguing either for or against the extensive use of technology in Philippine classrooms. Support your stance with concrete examples and research.', rubric: 'Thesis Clarity (30%), Support & Evidence (40%), Counter-argument (20%), Mechanics (10%)', teacherId: 'u2', createdAt: '2025-06-10T07:00:00Z' },
];

/* ─── Simulated Submissions ─── */
let SUBMISSIONS = [
  { id: 's1', assignmentId: 'a3', studentId: 'u1', studentName: 'Maria Santos', content: 'To Kill a Mockingbird by Harper Lee is a profound novel set in the American South during the 1930s. The story is narrated by Scout Finch, a young girl who witnesses her father, lawyer Atticus Finch, defend a Black man named Tom Robinson against an unjust accusation of assault. Through Scout\'s innocent eyes, Lee masterfully explores themes of racial injustice, moral growth, and the loss of innocence. The character of Atticus Finch stands as a moral beacon throughout the novel, demonstrating courage and integrity in the face of prejudice. His famous line — "You never really understand a person until you consider things from his point of view, until you climb inside of his skin and walk around in it" — encapsulates the novel\'s central theme of empathy. Tom Robinson\'s trial is the emotional core of the story, exposing the deep-seated racism embedded in Maycomb\'s society. Despite overwhelming evidence of his innocence, Tom is found guilty, illustrating how prejudice can override justice. The novel ultimately challenges readers to confront their own biases and uphold moral courage.', submittedAt: '2025-07-04T14:32:00Z', version: 2, status: 'graded', feedback: 'Excellent work, Maria! Your character analysis of Atticus is particularly insightful. The quote you selected is perfectly chosen. Consider expanding more on Scout\'s development as a narrator. Strong use of thematic language throughout.', grade: '92/100', feedbackAt: '2025-07-06T09:15:00Z' },
  { id: 's2', assignmentId: 'a4', studentId: 'u1', studentName: 'Maria Santos', content: 'Technology has become an inseparable part of modern education, and its integration into Philippine classrooms presents both remarkable opportunities and significant challenges. This essay argues that, when used thoughtfully and equitably, technology enhances the educational experience and prepares students for an increasingly digital world. However, the current state of technological infrastructure in the Philippines reveals a stark digital divide that must be addressed before full integration can be beneficial. Rural schools often lack reliable internet connectivity, making digital learning tools inaccessible to many students. Despite these challenges, the COVID-19 pandemic demonstrated that technology is not merely a convenience but a necessity in maintaining educational continuity. The shift to online learning, though imperfect, proved that students and teachers could adapt to digital platforms. Moving forward, a blended approach — combining traditional teaching with strategic use of technology — offers the most promising path for Philippine education.', submittedAt: '2025-07-01T16:45:00Z', version: 1, status: 'pending', feedback: null, grade: null, feedbackAt: null },
  { id: 's3', assignmentId: 'a1', studentId: 'u3', studentName: 'John Reyes', content: 'Climate change poses one of the greatest threats to Philippine agriculture, a sector that employs nearly one-third of the country\'s workforce. Rising temperatures, erratic rainfall patterns, and increasingly severe typhoons are disrupting crop cycles and threatening food security across the archipelago. Farmers in the Cagayan Valley, historically one of the most productive agricultural regions, have reported significant changes in planting schedules due to unpredictable monsoon seasons. The traditional indicators they relied upon for generations — flowering of certain trees, migration patterns of birds — no longer reliably predict weather patterns. Rice, the staple crop of the Philippines, is particularly vulnerable to climate change. Studies show that for every degree Celsius increase in temperature during the growing season, rice yields decline by approximately 10%. With projections indicating continued warming, food security becomes an urgent national concern.', submittedAt: '2025-07-10T11:20:00Z', version: 1, status: 'pending', feedback: null, grade: null, feedbackAt: null },
];

/* ─── Simulated Drafts ─── */
let DRAFTS = {
  'u1-a1': { content: '', savedAt: null, version: 1 },
  'u1-a2': { content: '', savedAt: null, version: 1 },
};

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
  { note: 'Look for opportunities to replace weak verbs (is, are, was) with stronger action verbs.' },
  { note: 'Ensure smooth transitions between paragraphs using connective phrases.' },
  { note: 'Vary your vocabulary to avoid repetition of key words.' },
  { note: 'Make sure your topic sentence clearly states the main idea of each paragraph.' },
];

/* ─── App State ─── */
let state = {
  currentUser: null,
  studentPanel: 's-overview',
  teacherPanel: 't-overview',
  checkCount: 0,
  feedbackModal: { submissionId: null },
};

/* ══════════════════════════════════════════════
   INITIALIZATION
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initStudentDashboard();
  initTeacherDashboard();
  initEditor();
});

/* ══════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════ */
function initAuth() {
  // Tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab + '-form').classList.add('active');
    });
  });

  // Demo buttons — auto-fill email, password, and set dropdown role
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('login-email').value = btn.dataset.email;
      document.getElementById('login-password').value = btn.dataset.pass;
      document.getElementById('role-select').value = btn.dataset.role;
    });
  });

  // Login
  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('login-password').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

  // Register
  document.getElementById('register-btn').addEventListener('click', handleRegister);

  // Logout
  document.getElementById('student-logout').addEventListener('click', () => logout('student'));
  document.getElementById('teacher-logout').addEventListener('click', () => logout('teacher'));
}

function getActiveRole(formId) {
  const selectId = formId === 'login-form' ? 'role-select' : 'reg-role-select';
  return document.getElementById(selectId)?.value || '';
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const role = getActiveRole('login-form');
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  if (!email || !password) { showError(errEl, 'Please enter your email and password.'); return; }
  if (!role) { showError(errEl, 'Please select a role (Student or Teacher).'); return; }

  const user = USERS.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) { showError(errEl, 'Invalid credentials or wrong role selected.'); return; }

  state.currentUser = user;
  enterDashboard(user);
}

function handleRegister() {
  const first = document.getElementById('reg-first').value.trim();
  const last = document.getElementById('reg-last').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const id = document.getElementById('reg-id').value.trim();
  const pass = document.getElementById('reg-password').value;
  const role = getActiveRole('register-form');
  const errEl = document.getElementById('register-error');
  const succEl = document.getElementById('register-success');
  errEl.classList.add('hidden'); succEl.classList.add('hidden');

  if (!first || !last || !email || !id || !pass) { showError(errEl, 'Please fill in all fields.'); return; }
  if (!role) { showError(errEl, 'Please select a role (Student or Teacher).'); return; }
  if (pass.length < 8) { showError(errEl, 'Password must be at least 8 characters.'); return; }
  if (USERS.find(u => u.email === email)) { showError(errEl, 'This email is already registered.'); return; }

  const newUser = {
    id: 'u' + Date.now(),
    email, password: pass, role,
    firstName: first, lastName: last,
    studentId: id
  };
  USERS.push(newUser);

  succEl.textContent = `Account created for ${first}! You can now sign in.`;
  succEl.classList.remove('hidden');
  setTimeout(() => {
    document.querySelectorAll('.auth-tab')[0].click();
    document.getElementById('login-email').value = email;
  }, 2000);
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
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').classList.add('hidden');
}

function showScreen(id, show) {
  const el = document.getElementById(id);
  if (show) { el.classList.add('active'); }
  else { el.classList.remove('active'); }
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

/* ══════════════════════════════════════════════
   STUDENT DASHBOARD
══════════════════════════════════════════════ */
function initStudentDashboard() {
  // Sidebar navigation
  document.querySelectorAll('#student-sidebar .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      switchStudentPanel(item.dataset.panel);
    });
  });

  // Card quick links
  document.addEventListener('click', e => {
    const link = e.target.closest('.s-nav-link');
    if (link) { e.preventDefault(); switchStudentPanel(link.dataset.panel); }
  });

  // Mobile menu
  document.getElementById('student-menu-toggle').addEventListener('click', () => {
    document.getElementById('student-sidebar').classList.toggle('open');
  });

  // Assignment filter
  document.querySelectorAll('#s-assignments .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#s-assignments .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStudentAssignments(btn.dataset.filter);
    });
  });
}

function loadStudentDashboard(user) {
  const displayName = user.firstName;
  document.getElementById('student-welcome-name').textContent = displayName;
  document.getElementById('student-name').textContent = user.firstName + ' ' + user.lastName;
  document.getElementById('student-avatar').textContent = user.firstName[0];

  const mySubmissions = SUBMISSIONS.filter(s => s.studentId === user.id);
  const submitted = mySubmissions.length;
  const pending = ASSIGNMENTS.length - submitted;
  document.getElementById('pending-count').textContent = Math.max(0, pending);
  document.getElementById('feedback-count').textContent = mySubmissions.filter(s => s.feedback).length;

  renderStudentAssignments('all');
  renderSubmissionHistory();
  renderStudentFeedback();
  populateAssignmentSelect();
}

function switchStudentPanel(panelId) {
  document.querySelectorAll('#student-sidebar .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.panel === panelId);
  });
  document.querySelectorAll('#student-main .panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === panelId);
  });
  const titles = {
    's-overview': 'Overview',
    's-assignments': 'Assignments',
    's-editor': 'Writing Editor',
    's-history': 'Submission History',
    's-feedback': 'Teacher Feedback',
  };
  document.getElementById('student-panel-title').textContent = titles[panelId] || '';
  state.studentPanel = panelId;
  document.getElementById('student-sidebar').classList.remove('open');
}

function getStudentSubmission(assignmentId) {
  if (!state.currentUser) return null;
  return SUBMISSIONS.find(s => s.assignmentId === assignmentId && s.studentId === state.currentUser.id) || null;
}

function getAssignmentStatus(assignment) {
  const sub = getStudentSubmission(assignment.id);
  if (!sub) {
    const due = new Date(assignment.dueDate);
    if (due < new Date()) return 'overdue';
    return 'pending';
  }
  if (sub.status === 'graded') return 'graded';
  return 'submitted';
}

function renderStudentAssignments(filter = 'all') {
  const grid = document.getElementById('student-assignment-grid');
  let assignments = ASSIGNMENTS;
  if (filter !== 'all') {
    assignments = ASSIGNMENTS.filter(a => getAssignmentStatus(a) === filter);
  }
  if (assignments.length === 0) {
    grid.innerHTML = '<p style="color:var(--gray-400); font-style: italic; padding: 1rem;">No assignments found for this filter.</p>';
    return;
  }
  grid.innerHTML = assignments.map(a => {
    const status = getAssignmentStatus(a);
    const badgeMap = { pending: ['badge-pending', 'Pending'], submitted: ['badge-submitted', 'Submitted'], graded: ['badge-graded', 'Graded'], overdue: ['badge-overdue', 'Overdue'] };
    const [badgeClass, badgeLabel] = badgeMap[status] || ['badge-pending', 'Pending'];
    const dueFormatted = new Date(a.dueDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
    const actionLabel = status === 'pending' ? 'Start Writing' : status === 'overdue' ? 'Late Submit' : 'View Draft';
    return `
      <div class="assignment-card" data-id="${a.id}">
        <div class="ac-header">
          <span class="ac-title">${a.title}</span>
          <span class="ac-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <div class="ac-subject">${a.subject} · ${a.type.charAt(0).toUpperCase() + a.type.slice(1)}</div>
        <div class="ac-desc">${a.description}</div>
        <div class="ac-footer">
          <span class="ac-due">Due: <strong>${dueFormatted}</strong></span>
          <span class="ac-action open-editor" data-id="${a.id}">${actionLabel} →</span>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.open-editor').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openEditorForAssignment(btn.dataset.id);
    });
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
  if (!state.currentUser) return;
  const mySubs = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id);
  if (mySubs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--gray-300);font-style:italic;padding:2rem">No submissions yet</td></tr>';
    return;
  }
  tbody.innerHTML = mySubs.map(s => {
    const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
    const dt = new Date(s.submittedAt).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const statusHtml = s.status === 'graded'
      ? `<span class="ac-badge badge-graded">Graded · ${s.grade}</span>`
      : `<span class="ac-badge badge-submitted">Awaiting Review</span>`;
    return `
      <tr>
        <td><strong>${a ? a.title : 'Unknown'}</strong></td>
        <td>v${s.version}</td>
        <td>${dt}</td>
        <td>${statusHtml}</td>
        <td><button class="ac-action" style="background:var(--blue-light);color:var(--navy);padding:.3rem .6rem;border-radius:6px;font-size:.75rem;font-weight:600;" onclick="previewSubmission('${s.id}')">View</button></td>
      </tr>`;
  }).join('');
}

function renderStudentFeedback() {
  const list = document.getElementById('student-feedback-list');
  if (!state.currentUser) return;
  const graded = SUBMISSIONS.filter(s => s.studentId === state.currentUser.id && s.status === 'graded');
  if (graded.length === 0) {
    list.innerHTML = '<div class="feedback-card" style="padding:2rem;text-align:center;color:var(--gray-300);font-style:italic">No feedback received yet.</div>';
    return;
  }
  list.innerHTML = graded.map(s => {
    const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
    const dt = s.feedbackAt ? new Date(s.feedbackAt).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
    return `
      <div class="feedback-card">
        <div class="feedback-card-header">
          <h4>${a ? a.title : 'Assignment'}</h4>
          <span class="feedback-grade">${s.grade}</span>
        </div>
        <div class="feedback-body">
          <div class="feedback-meta">From: Prof. Dela Cruz · ${dt}</div>
          <div class="feedback-text">${s.feedback}</div>
        </div>
      </div>`;
  }).join('');
}

function previewSubmission(id) {
  const s = SUBMISSIONS.find(x => x.id === id);
  if (!s) return;
  alert(`Submission Preview\n\nStatus: ${s.status}\nContent:\n\n"${s.content.substring(0, 300)}..."`);
}

/* ══════════════════════════════════════════════
   EDITOR
══════════════════════════════════════════════ */
function initEditor() {
  const select = document.getElementById('assignment-select');
  const area = document.getElementById('writing-area');

  // Populate select on panel load
  populateAssignmentSelect();

  select.addEventListener('change', () => {
    const id = select.value;
    if (!id) {
      document.getElementById('meta-title').textContent = '—';
      document.getElementById('meta-due').textContent = '—';
      document.getElementById('meta-words').textContent = '—';
      area.textContent = '';
      return;
    }
    const a = ASSIGNMENTS.find(x => x.id === id);
    if (!a) return;
    document.getElementById('meta-title').textContent = a.title;
    document.getElementById('meta-due').textContent = new Date(a.dueDate).toLocaleDateString('en-PH', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('meta-words').textContent = a.minWords.toLocaleString();

    // Load draft if exists
    const draftKey = `${state.currentUser?.id}-${id}`;
    const draft = DRAFTS[draftKey];
    if (draft && draft.content) {
      area.textContent = draft.content;
    } else {
      area.textContent = '';
    }
    updateWordCount();
    resetAssistant();
  });

  // Word count
  area.addEventListener('input', updateWordCount);

  // Save draft
  document.getElementById('save-draft-btn').addEventListener('click', saveDraft);

  // Submit
  document.getElementById('submit-assignment-btn').addEventListener('click', submitAssignment);

  // Check writing
  document.getElementById('check-writing-btn').addEventListener('click', checkWriting);
}

function populateAssignmentSelect() {
  const select = document.getElementById('assignment-select');
  select.innerHTML = '<option value="">— Select Assignment —</option>';
  ASSIGNMENTS.forEach(a => {
    const sub = getStudentSubmission(a.id);
    const label = sub ? `${a.title} [Submitted]` : a.title;
    select.innerHTML += `<option value="${a.id}">${label}</option>`;
  });
}

function updateWordCount() {
  const area = document.getElementById('writing-area');
  const text = area.innerText || area.textContent || '';
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  document.getElementById('word-count-display').textContent = `${words.toLocaleString()} word${words !== 1 ? 's' : ''}`;
}

function saveDraft() {
  const id = document.getElementById('assignment-select').value;
  if (!id || !state.currentUser) { alert('Please select an assignment first.'); return; }
  const content = document.getElementById('writing-area').innerText || '';
  const draftKey = `${state.currentUser.id}-${id}`;
  DRAFTS[draftKey] = DRAFTS[draftKey] || {};
  DRAFTS[draftKey].content = content;
  DRAFTS[draftKey].savedAt = new Date().toISOString();
  DRAFTS[draftKey].version = (DRAFTS[draftKey].version || 1) + 1;

  const btn = document.getElementById('save-draft-btn');
  const orig = btn.innerHTML;
  btn.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Saved!`;
  btn.style.color = 'var(--green)';
  setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
}

function submitAssignment() {
  const id = document.getElementById('assignment-select').value;
  const content = (document.getElementById('writing-area').innerText || '').trim();
  if (!id) { alert('Please select an assignment to submit.'); return; }
  if (!content) { alert('Please write your assignment before submitting.'); return; }
  if (!state.currentUser) return;

  const a = ASSIGNMENTS.find(x => x.id === id);
  const words = content.split(/\s+/).length;
  if (words < a.minWords * 0.5) {
    if (!confirm(`Your submission is only ${words} words. The minimum is ${a.minWords}. Submit anyway?`)) return;
  }

  // Check for existing submission
  const existing = SUBMISSIONS.find(s => s.assignmentId === id && s.studentId === state.currentUser.id);
  if (existing) {
    existing.content = content;
    existing.submittedAt = new Date().toISOString();
    existing.version = (existing.version || 1) + 1;
    existing.status = 'pending';
  } else {
    SUBMISSIONS.push({
      id: 's' + Date.now(),
      assignmentId: id,
      studentId: state.currentUser.id,
      studentName: state.currentUser.firstName + ' ' + state.currentUser.lastName,
      content,
      submittedAt: new Date().toISOString(),
      version: 1,
      status: 'pending',
      feedback: null, grade: null, feedbackAt: null
    });
  }

  // Show toast
  const toast = document.getElementById('submit-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);

  // Refresh related UI
  renderSubmissionHistory();
  renderStudentAssignments('all');
  populateAssignmentSelect();
}

/* ══════════════════════════════════════════════
   WRITING ASSISTANT
══════════════════════════════════════════════ */
function checkWriting() {
  const area = document.getElementById('writing-area');
  const text = area.innerText || area.textContent || '';

  if (!text.trim()) { alert('Please write something before checking.'); return; }

  state.checkCount++;
  const errors = [];
  const usedPatterns = new Set();

  // Run error checks
  SIMULATED_ERRORS.forEach(rule => {
    const matches = text.match(rule.pattern);
    if (matches && !usedPatterns.has(rule.error)) {
      usedPatterns.add(rule.error);
      errors.push({ type: rule.type, error: rule.error, fix: rule.fix, note: rule.note });
    }
  });

  // Additional heuristic checks
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.trim().split(/\s+/);
  const avgWordsPerSentence = sentences.length ? Math.round(words.length / sentences.length) : 0;

  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 35);
  if (longSentences.length > 0) {
    errors.push({ type: 'grammar', error: 'Long sentence detected', fix: 'Break into shorter sentences', note: `${longSentences.length} sentence(s) exceed 35 words` });
  }

  const passiveVoicePatterns = /\b(is|are|was|were|be|been|being)\s+(written|done|made|given|taken|found|used|shown|seen)\b/gi;
  const passiveMatches = text.match(passiveVoicePatterns) || [];

  // Render errors
  const errorList = document.getElementById('error-list');
  document.getElementById('error-count').textContent = errors.length;
  if (errors.length === 0) {
    errorList.innerHTML = '<div class="suggestion-item" style="border-color:var(--green)"><span class="s-fix">✓ No issues detected in this scan.</span></div>';
  } else {
    errorList.innerHTML = errors.map(e => `
      <div class="suggestion-item">
        <span class="s-type">${e.type}</span>
        <span class="s-error">"${e.error}"</span>
        <span class="s-fix">→ Suggest: "${e.fix}"</span>
        <span class="s-note">${e.note}</span>
      </div>`).join('');
  }

  // Render style suggestions (pick 3 random)
  const styleList = document.getElementById('suggestion-list');
  const selected = STYLE_SUGGESTIONS.sort(() => Math.random() - .5).slice(0, 3);
  styleList.innerHTML = selected.map(s => `
    <div class="suggestion-item style-item">
      <span class="s-type">style</span>
      <span class="s-error">${s.note}</span>
    </div>`).join('');

  // Readability stats
  document.getElementById('r-sentences').textContent = sentences.length;
  document.getElementById('r-avg').textContent = avgWordsPerSentence;
  const levels = ['Elementary', 'Middle School', 'High School', 'College', 'Graduate'];
  const levelIdx = Math.min(Math.floor(avgWordsPerSentence / 5), levels.length - 1);
  document.getElementById('r-level').textContent = levels[levelIdx];
  document.getElementById('r-passive').textContent = passiveMatches.length > 0 ? `${passiveMatches.length} instance(s)` : 'None detected';

  // Score calculation
  let score = 100;
  score -= errors.filter(e => e.type === 'spell').length * 8;
  score -= errors.filter(e => e.type === 'grammar').length * 10;
  score -= errors.filter(e => e.type === 'punct').length * 5;
  score -= passiveMatches.length * 3;
  if (avgWordsPerSentence > 30) score -= 5;
  score = Math.max(10, Math.min(100, score));

  // Animate score ring
  const scoreNum = document.getElementById('score-num');
  const scoreArc = document.getElementById('score-arc');
  scoreNum.textContent = score;
  scoreArc.style.strokeDasharray = `${score}, 100`;
  scoreArc.style.stroke = score >= 80 ? 'var(--green)' : score >= 60 ? 'var(--gold)' : 'var(--red)';
}

function resetAssistant() {
  document.getElementById('error-list').innerHTML = '<p class="empty-hint">Click "Check Writing" to scan your text</p>';
  document.getElementById('suggestion-list').innerHTML = '<p class="empty-hint">Suggestions appear after checking</p>';
  document.getElementById('error-count').textContent = '0';
  document.getElementById('score-num').textContent = '—';
  document.getElementById('score-arc').style.strokeDasharray = '0, 100';
  ['r-sentences', 'r-avg', 'r-level', 'r-passive'].forEach(id => { document.getElementById(id).textContent = '—'; });
}

/* ══════════════════════════════════════════════
   TEACHER DASHBOARD
══════════════════════════════════════════════ */
function initTeacherDashboard() {
  document.querySelectorAll('#teacher-sidebar .nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      switchTeacherPanel(item.dataset.panel);
    });
  });

  document.addEventListener('click', e => {
    const link = e.target.closest('.t-nav-link');
    if (link) { e.preventDefault(); switchTeacherPanel(link.dataset.panel); }
  });

  document.getElementById('teacher-menu-toggle').addEventListener('click', () => {
    document.getElementById('teacher-sidebar').classList.toggle('open');
  });

  document.getElementById('create-assignment-btn').addEventListener('click', createAssignment);
  document.getElementById('reset-assignment-btn').addEventListener('click', resetCreateForm);

  // Submission filters
  document.querySelectorAll('#t-submissions .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#t-submissions .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubmissionsList(btn.dataset.tfilter);
    });
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-submit-feedback').addEventListener('click', submitFeedback);
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  // Quick tags
  document.querySelectorAll('.ftag').forEach(btn => {
    btn.addEventListener('click', () => {
      const ta = document.getElementById('modal-feedback-text');
      ta.value = ta.value ? ta.value + ' ' + btn.dataset.tag + '.' : btn.dataset.tag + '.';
    });
  });
}

function loadTeacherDashboard(user) {
  document.getElementById('teacher-welcome-name').textContent = user.firstName;
  document.getElementById('teacher-name').textContent = user.firstName + ' ' + user.lastName;
  document.getElementById('teacher-avatar').textContent = user.firstName[0];

  const pending = SUBMISSIONS.filter(s => s.status === 'pending').length;
  document.getElementById('t-pending-count').textContent = pending;
  document.getElementById('t-pending-review').textContent = pending;
  document.getElementById('t-total-assignments').textContent = ASSIGNMENTS.length;
  document.getElementById('t-graded').textContent = SUBMISSIONS.filter(s => s.status === 'graded').length;

  renderRecentSubmissions();
  renderSubmissionsList('all');
  renderTeacherAssignments();
}

function switchTeacherPanel(panelId) {
  document.querySelectorAll('#teacher-sidebar .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.panel === panelId);
  });
  document.querySelectorAll('#teacher-main .panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === panelId);
  });
  const titles = {
    't-overview': 'Dashboard',
    't-create': 'Create Assignment',
    't-submissions': 'Student Submissions',
    't-assignments': 'My Assignments',
  };
  document.getElementById('teacher-panel-title').textContent = titles[panelId] || '';
  state.teacherPanel = panelId;
  document.getElementById('teacher-sidebar').classList.remove('open');

  if (panelId === 't-submissions') renderSubmissionsList('all');
  if (panelId === 't-assignments') renderTeacherAssignments();
}

function renderRecentSubmissions() {
  const container = document.getElementById('t-recent-submissions');
  const recent = [...SUBMISSIONS].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 4);
  if (!recent.length) {
    container.innerHTML = '<p style="padding:1rem;color:var(--gray-300);font-style:italic">No submissions yet</p>';
    return;
  }
  container.innerHTML = recent.map(s => renderSubmissionCard(s, true)).join('');
  attachSubmissionCardEvents(container);
}

function renderSubmissionsList(filter = 'all') {
  const container = document.getElementById('submissions-list');
  let subs = [...SUBMISSIONS];
  if (filter === 'pending') subs = subs.filter(s => s.status === 'pending');
  if (filter === 'graded') subs = subs.filter(s => s.status === 'graded');
  subs.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  if (!subs.length) {
    container.innerHTML = '<p style="padding:1rem;color:var(--gray-300);font-style:italic">No submissions found.</p>';
    return;
  }
  container.innerHTML = subs.map(s => renderSubmissionCard(s, false)).join('');
  attachSubmissionCardEvents(container);
}

function renderSubmissionCard(s, compact) {
  const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
  const dt = new Date(s.submittedAt).toLocaleString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const initials = s.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const actionHtml = s.status === 'graded'
    ? `<span class="graded-badge">Graded · ${s.grade}</span>`
    : `<button class="review-btn" data-sid="${s.id}">Review</button>`;
  return `
    <div class="submission-card">
      <div class="submission-avatar">${initials}</div>
      <div class="submission-info">
        <div class="submission-student">${s.studentName}</div>
        <div class="submission-assignment">${a ? a.title : 'Unknown Assignment'}</div>
        <div class="submission-time">Submitted ${dt} · v${s.version}</div>
      </div>
      <div class="submission-actions">${actionHtml}</div>
    </div>`;
}

function attachSubmissionCardEvents(container) {
  container.querySelectorAll('.review-btn').forEach(btn => {
    btn.addEventListener('click', () => openFeedbackModal(btn.dataset.sid));
  });
}

function openFeedbackModal(submissionId) {
  const s = SUBMISSIONS.find(x => x.id === submissionId);
  if (!s) return;
  const a = ASSIGNMENTS.find(x => x.id === s.assignmentId);
  state.feedbackModal.submissionId = submissionId;

  document.getElementById('modal-student').textContent = s.studentName;
  document.getElementById('modal-assignment').textContent = a ? a.title : '—';
  document.getElementById('modal-submitted').textContent = new Date(s.submittedAt).toLocaleString('en-PH');
  document.getElementById('modal-text').textContent = s.content;
  document.getElementById('modal-feedback-text').value = '';
  document.getElementById('modal-grade').value = '';
  document.getElementById('feedback-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('feedback-modal').classList.add('hidden');
  state.feedbackModal.submissionId = null;
}

function submitFeedback() {
  const id = state.feedbackModal.submissionId;
  const feedbackText = document.getElementById('modal-feedback-text').value.trim();
  const grade = document.getElementById('modal-grade').value.trim();

  if (!feedbackText) { alert('Please write feedback before submitting.'); return; }
  if (!id) return;

  const s = SUBMISSIONS.find(x => x.id === id);
  if (!s) return;
  s.feedback = feedbackText;
  s.grade = grade || 'Reviewed';
  s.status = 'graded';
  s.feedbackAt = new Date().toISOString();

  closeModal();

  // Refresh UI
  renderRecentSubmissions();
  renderSubmissionsList('all');
  renderTeacherAssignments();
  document.getElementById('t-pending-review').textContent = SUBMISSIONS.filter(s => s.status === 'pending').length;
  document.getElementById('t-graded').textContent = SUBMISSIONS.filter(s => s.status === 'graded').length;

  // Refresh student feedback if same user
  if (state.currentUser && state.currentUser.role === 'student') {
    renderStudentFeedback();
    renderSubmissionHistory();
  }

  const btn = document.getElementById('modal-submit-feedback');
  btn.textContent = '✓ Feedback Sent!';
  setTimeout(() => { btn.textContent = 'Submit Feedback'; }, 2000);
}

function createAssignment() {
  const title = document.getElementById('new-assignment-title').value.trim();
  const subject = document.getElementById('new-assignment-subject').value.trim();
  const dueDate = document.getElementById('new-assignment-due').value;
  const minWords = parseInt(document.getElementById('new-assignment-words').value) || 0;
  const type = document.getElementById('new-assignment-type').value;
  const description = document.getElementById('new-assignment-desc').value.trim();
  const rubric = document.getElementById('new-assignment-rubric').value.trim();
  const errEl = document.getElementById('create-error');
  const succEl = document.getElementById('create-success');
  errEl.classList.add('hidden'); succEl.classList.add('hidden');

  if (!title) { showError(errEl, 'Assignment title is required.'); return; }
  if (!dueDate) { showError(errEl, 'Due date is required.'); return; }
  if (!description) { showError(errEl, 'Assignment description/prompt is required.'); return; }
  if (new Date(dueDate) < new Date()) {
    if (!confirm('The due date is in the past. Publish anyway?')) return;
  }

  const newAssignment = {
    id: 'a' + Date.now(),
    title, subject: subject || 'General', dueDate,
    minWords: minWords || 500, type,
    description, rubric,
    teacherId: state.currentUser?.id || 'u2',
    createdAt: new Date().toISOString()
  };
  ASSIGNMENTS.unshift(newAssignment);

  succEl.textContent = `"${title}" published successfully!`;
  succEl.classList.remove('hidden');
  resetCreateForm();
  document.getElementById('t-total-assignments').textContent = ASSIGNMENTS.length;

  setTimeout(() => {
    succEl.classList.add('hidden');
    switchTeacherPanel('t-assignments');
    renderTeacherAssignments();
  }, 2000);
}

function resetCreateForm() {
  ['new-assignment-title', 'new-assignment-subject', 'new-assignment-due',
   'new-assignment-words', 'new-assignment-desc', 'new-assignment-rubric'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('new-assignment-type').value = 'essay';
  document.getElementById('create-error').classList.add('hidden');
  document.getElementById('create-success').classList.add('hidden');
}

function renderTeacherAssignments() {
  const container = document.getElementById('teacher-assignment-list');
  if (!ASSIGNMENTS.length) {
    container.innerHTML = '<p style="color:var(--gray-300);font-style:italic">No assignments created yet.</p>';
    return;
  }
  // 1. Render the assignment list, adding the new "Extend" button
  container.innerHTML = ASSIGNMENTS.map(a => {
    const subCount = SUBMISSIONS.filter(s => s.assignmentId === a.id).length;
    const dueFormatted = new Date(a.dueDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
    return `
      <div class="t-assignment-row">
        <div class="ta-info">
          <div class="ta-title">${a.title}</div>
          <div class="ta-meta">
            <span>📚 ${a.subject}</span>
            <span>📅 Due ${dueFormatted}</span>
            <span>📝 Min. ${a.minWords.toLocaleString()} words</span>
            <span>👥 ${subCount} submission${subCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="ta-ext" data-aid="${a.id}" style="color: var(--navy); font-size: .78rem; font-weight: 600; padding: .3rem .6rem; border-radius: 6px; border: 1px solid var(--gray-300); background: white;">Extend</button>
          <button class="ta-del" data-aid="${a.id}">Delete</button>
        </div>
      </div>`;
  }).join('');

  // 2. Existing delete logic
  container.querySelectorAll('.ta-del').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this assignment?')) {
        ASSIGNMENTS = ASSIGNMENTS.filter(a => a.id !== btn.dataset.aid);
        renderTeacherAssignments();
        renderSubmissionsList('all');
        document.getElementById('t-total-assignments').textContent = ASSIGNMENTS.length;
      }
    });
  });

  // 3. NEW: Extension logic
  container.querySelectorAll('.ta-ext').forEach(btn => {
    btn.addEventListener('click', () => {
      const assignment = ASSIGNMENTS.find(a => a.id === btn.dataset.aid);
      // Prompt the teacher for a new date, defaulting to the current due date
      const newDate = prompt(`Extend deadline for "${assignment.title}"\nFormat: YYYY-MM-DD`, assignment.dueDate);
      if (newDate) {
        // Basic validation to ensure the teacher entered a real date
        if (!isNaN(Date.parse(newDate))) {
          assignment.dueDate = newDate;
          // Refresh the UI to show the new date and update assignment statuses
          renderTeacherAssignments();
          renderSubmissionsList('all');
          alert('Deadline extended successfully!');
        } else {
          alert('Invalid date format. Please use YYYY-MM-DD.');
        }
      }
    });
  });
}