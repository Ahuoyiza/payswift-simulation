// ─── CUSTOM CURSOR ───
// Move cursor out of flex body to avoid layout constraints
const cursor = document.getElementById('cursor');
document.documentElement.appendChild(cursor);
document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}, { passive: true });

// ─── NAVIGATION ───
function navigate(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.phase-pill').forEach(n => n.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    document.getElementById('main').scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // Highlight nav item
  document.querySelectorAll('[data-page="' + pageId + '"]').forEach(el => {
    el.classList.add('active');
  });
}

// Attach click handlers to all nav items and phase pills
document.addEventListener('click', e => {
  const target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    navigate(target.dataset.page);
  }
});

// ─── PHASE DOT COLORS ───
const phaseColors = {
  phase1: 'var(--lime)',
  phase2: 'var(--blue-light)',
  phase3: 'var(--yellow)',
  phase4: 'var(--green)',
  phase5: 'var(--pink)',
  phase6: 'var(--orange)'
};

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  const pageId = item.dataset.page;
  const dot = item.querySelector('.phase-dot');
  if (dot && phaseColors[pageId]) {
    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('active')) {
        dot.style.background = phaseColors[pageId];
        dot.style.color = 'var(--navy)';
      }
    });
    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        dot.style.background = 'rgba(255,255,255,0.1)';
        dot.style.color = 'rgba(255,255,255,0.4)';
      }
    });
  }
});

// ─── PM SECTION TOGGLE ───
document.querySelectorAll('.pm-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const collapsible = btn.nextElementSibling;
    collapsible.classList.toggle('open');
    btn.classList.toggle('open');
  });
});

// ─── MODAL DATA ───
const modalData = {
  phase1: {
    tag: "Phase 1 \u2014 Project Kickoff",
    title: "What should Morgan be doing right now?",
    sub: "Ada has read a brief and is breaking the feature into technical components. Before writing a single line of code, a lot of PM work needs to happen.",
    adaActions: [
      "Reading the product brief and understanding the full scope",
      "Breaking the feature into 5 layers: Frontend, Backend, Database, APIs, Security",
      "Estimating the timeline: 6 weeks to build",
      "Identifying the tech stack: React Native, Node.js, PostgreSQL, Redis",
      "Creating an initial technical spec document"
    ],
    questions: [
      "What document does Morgan write to communicate requirements to Ada clearly?",
      "What success metrics has Morgan defined? How will the team know this feature is working?",
      "Ada says 6 weeks. Stakeholders want 4. What does Morgan do \u2014 and why?",
      "What business rules must Morgan have specified before Ada begins? Think: transaction limits, fees, compliance."
    ]
  },
  phase2: {
    tag: "Phase 2 \u2014 Frontend Build",
    title: "What is Morgan providing to make this possible?",
    sub: "Ada is building the screens users will see and touch. Every label, error message and validation rule must come from somewhere \u2014 that is Morgan's job.",
    adaActions: [
      "Building SendMoneyScreen \u2014 recipient search, amount input, note field",
      "Building ConfirmationModal \u2014 transaction summary and PIN entry",
      "Building SuccessScreen \u2014 animation, transaction ID, receipt option",
      "Adding frontend validation: amount >= N100, <= N1M, balance check",
      "Connecting screens to API endpoints using React Native + Axios"
    ],
    questions: [
      "Where does the screen copy come from? Who decided what the Send button says?",
      "What validation rules must Morgan have specified? What message shows when a user tries N50?",
      "Who created the Figma designs Ada is implementing from? What is Morgan's role in approving them?",
      "What does the success screen say when money is sent? Who wrote that copy?"
    ]
  },
  phase3: {
    tag: "Phase 3 \u2014 Backend Build",
    title: "What business rules is Ada coding from?",
    sub: "Ada's backend services enforce limits, handle failures, and send notifications. Every rule hardcoded into this system was first defined by Morgan.",
    adaActions: [
      "Building Auth Service: verify JWT token, check PIN, verify session",
      "Building Validation Service: check limits, sender/recipient status, daily cap",
      "Building Transaction Service: lock wallets, debit, credit, commit \u2014 or rollback",
      "Building Notification Service: push to sender and recipient, queue email receipt",
      "Returning the success response with transactionId to the frontend"
    ],
    questions: [
      "What are the exact transaction limits? Who decides whether there is a transfer fee?",
      "If a transaction fails mid-way, what does the user see? Who defined that error message?",
      "What does the push notification say when money is received? Who wrote that copy?",
      "What daily limit per user has Morgan set \u2014 and why that number?"
    ]
  },
  phase4: {
    tag: "Phase 4 \u2014 Database & Data",
    title: "What data requirements did Morgan specify?",
    sub: "Ada is designing the schema \u2014 the permanent structure of how data is stored. Schema changes after launch are expensive. Morgan must get this right upfront.",
    adaActions: [
      "Designing PostgreSQL schema: USERS, WALLETS, TRANSACTIONS tables",
      "Implementing ACID-compliant transaction processing with row-level locking",
      "Writing the full transaction flow: START to LOCK to DEBIT to CREDIT to COMMIT or ROLLBACK",
      "Setting up Redis cache for fast real-time balance lookups",
      "Configuring automated backups and disaster recovery"
    ],
    questions: [
      "How long must transaction records be kept? What do CBN / NDPR regulations require?",
      "What can users request to be deleted? What financial data cannot legally be deleted?",
      "Which data fields does the business actually need? Who defined what goes in the TRANSACTIONS table?",
      "What analytics events need to be tracked? Who defines the instrumentation plan?"
    ]
  },
  phase5: {
    tag: "Phase 5 \u2014 Security",
    title: "What security policies is Ada implementing from?",
    sub: "Ada is building the protection layers. Every threshold, lockout rule and compliance requirement was first decided by Morgan \u2014 security cannot be bolted on at the end.",
    adaActions: [
      "Implementing HTTPS/TLS: SSL cert, forced HTTPS, strong cipher suites",
      "Building authentication: JWT tokens, Bcrypt PIN hashing, session expiry",
      "Setting up encryption at rest: AES-256 for bank details, encrypted personal data",
      "Implementing rate limiting: 5 logins/hr, 10 transfers/min, 100 calls/min per IP",
      "Building fraud detection engine: risk scoring with automatic hold above 50 and block above 80"
    ],
    questions: [
      "After 3 wrong PINs the account locks for 1 hour \u2014 who decided that? What does the user see?",
      "A fraud score of 55 triggers a hold. Who reviews it? What is the SLA? What does the user see while waiting?",
      "What compliance frameworks apply to PaySwift? Think: CBN regulations, NDPR, PCI-DSS.",
      "If a legitimate transaction is blocked by fraud detection, what is Morgan's escalation process?"
    ]
  },
  phase6: {
    tag: "Phase 6 \u2014 API Integration",
    title: "What does Morgan define for the API layer?",
    sub: "Ada is building the final contract between frontend and backend and running end-to-end tests. Morgan's role now shifts to testing, release planning, and measuring success.",
    adaActions: [
      "Building the API Gateway: routing, rate limiting, auth middleware",
      "Implementing all endpoints: POST /transfer, GET /search, GET /balance, GET /transactions",
      "Writing Swagger/OpenAPI documentation for all endpoints",
      "Running end-to-end integration tests in the staging environment",
      "Fixing bugs found during integration testing"
    ],
    questions: [
      "What does the API return when a transfer fails? What exact message does the frontend show the user?",
      "What are the performance requirements? How fast must the API respond \u2014 and what is acceptable downtime?",
      "How does Morgan test that the feature actually satisfies the original user story before launch?",
      "What is the rollout strategy \u2014 full launch, phased, or feature-flagged? What is the rollback plan?"
    ]
  }
};

// ─── MODAL OPEN/CLOSE ───
const modal = document.getElementById('discussModal');
const modalClose = document.getElementById('modalClose');

function openModal(phaseId) {
  const data = modalData[phaseId];
  if (!data) return;
  document.getElementById('modalPhaseTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSub').textContent = data.sub;
  const adaList = document.getElementById('modalAdaList');
  adaList.innerHTML = data.adaActions.map((a, i) =>
    '<div class="modal-ada-item"><div class="modal-ada-dot">' + (i+1) + '</div><span>' + a + '</span></div>'
  ).join('');
  const qList = document.getElementById('modalQuestions');
  qList.innerHTML = data.questions.map(q =>
    '<li class="modal-q-item"><div class="modal-q-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div><span>' + q + '</span></li>'
  ).join('');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.your-turn-q[data-phase]').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.phase));
});

// ─── MOBILE SIDEBAR TOGGLE ───
const mobMenuBtn = document.getElementById('mob-menu-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
  document.body.classList.add('sidebar-open');
}
function closeSidebar() {
  document.body.classList.remove('sidebar-open');
}
mobMenuBtn.addEventListener('click', () => {
  document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
});
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on nav item click (mobile)
document.querySelectorAll('.nav-item, .phase-pill').forEach(el => {
  el.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeSidebar();
  });
});

// Initialize
navigate('overview');