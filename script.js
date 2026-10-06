// Initialize Lucide Icons
lucide.createIcons();

// 1. Theme Management (Dark / Light toggle with localStorage)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const htmlElement = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    htmlElement.classList.remove('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    htmlElement.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
  localStorage.setItem('portfolio_theme', theme);
}

const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const isDark = htmlElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
  lucide.createIcons();
});

// 2. Mobile Navigation Drawer Controls
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

function toggleMobileMenu() {
  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Auto-close menu when clicking mobile links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// 3. Project Filtering System
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-indigo-600', 'text-white');
      b.classList.add('glass-card', 'text-slate-700', 'dark:text-slate-300');
    });
    btn.classList.add('bg-indigo-600', 'text-white');
    btn.classList.remove('glass-card', 'text-slate-700', 'dark:text-slate-300');

    const category = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 4. Project Modal Data & Handlers
const projectSpecs = {
  rag: {
    title: "Enterprise RAG Knowledge Engine",
    tag: "Artificial Intelligence & Vector Embeddings",
    desc: "Designed and engineered an automated Retrieval-Augmented Generation pipeline. It parses complex academic and technical documents, breaks text into semantic chunks, generates contextual embeddings via vector models, stores them in an indexed vector store, and synthesizes answers using LLMs with strict anti-hallucination guardrails.",
    metrics: [
      "98% accuracy on domain questions",
      "Chunk overlap optimization for continuous context",
      "Sub-400ms vector similarity lookup speed"
    ],
    stack: ["Python", "LangChain", "Vector Embeddings", "FastAPI", "React.js", "Docker"]
  },
  amazon: {
    title: "Amazon Full-Stack MERN Platform",
    tag: "E-Commerce System Engineering",
    desc: "Built a production-grade e-commerce application modeling Amazon's shopping workflows. Features include catalog indexing, multi-criteria filtering, persistent shopping basket with Redux and localStorage, JWT user authentication with encrypted password hashes, and a mock checkout gateway.",
    metrics: [
      "MongoDB aggregations for real-time inventory queries",
      "JWT session authorization with refresh cookies",
      "Fully responsive mobile-to-desktop catalog UX"
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "Tailwind CSS"]
  },
  student: {
    title: "Student Management & Analytics Portal",
    tag: "Academic Administration Platform",
    desc: "Developed a comprehensive university administrative portal. Enables multi-tier credentials (Admin, Faculty, Student), real-time academic records search, grade point calculation engine, and instant export of records.",
    metrics: [
      "Optimized search across 5,000+ mock student entries",
      "Role-based access control (RBAC)",
      "CSV export & automated attendance logs"
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Chart.js"]
  },
  chat: {
    title: "Real-Time Chat & Collaboration Engine",
    tag: "WebSockets & Event-Driven Architecture",
    desc: "Engineered a low-latency messaging application built on WebSockets. Delivers live messaging channels, direct messages, active user presence detection, message receipt timestamps, and persistent history.",
    metrics: [
      "Under 50ms latency for message dispatch",
      "Concurrent room joining with broadcast rooms",
      "MongoDB indexing on channel and timestamp fields"
    ],
    stack: ["Socket.io", "React.js", "Express.js", "Node.js", "MongoDB"]
  }
};

const projectModal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function openProjectModal(key) {
  const data = projectSpecs[key];
  if (!data) return;

  modalContent.innerHTML = `
    <span class="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">${data.tag}</span>
    <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">${data.title}</h3>
    <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-2">${data.desc}</p>
    
    <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Engineering Highlights</p>
      <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        ${data.metrics.map(m => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> ${m}</li>`).join('')}
      </ul>
    </div>

    <div class="mt-4">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Stack Utilized</p>
      <div class="flex flex-wrap gap-1.5">
        ${data.stack.map(s => `<span class="px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">${s}</span>`).join('')}
      </div>
    </div>
  `;

  projectModal.classList.remove('hidden');
  projectModal.classList.add('flex');
  lucide.createIcons();
}

function closeProjectModal() {
  projectModal.classList.add('hidden');
  projectModal.classList.remove('flex');
}

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeProjectModal();
});

// 5. Contact Form Submission Toast
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function triggerToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3600);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  triggerToast(`Thank you ${name}! Your inquiry has been dispatched.`);
  contactForm.reset();
});