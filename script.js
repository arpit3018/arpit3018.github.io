// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Dark mode toggle ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const root = document.documentElement;

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');
applyTheme(initial);

themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  if (themeIcon) themeIcon.textContent = mode === 'dark' ? '☀️' : '🌙';
}

// ---------- Mobile menu toggle ----------
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---------- Google Sheets endpoints ----------
// Paste your Apps Script Web App URLs here (one per form / sheet).
// Leave as '' to skip submission (form will only log to console).
const SHEET_ENDPOINTS = {
  coachingForm: 'https://script.google.com/macros/s/AKfycbynb9VHUFMB0xWVqpU4VSzvebuGzXb-ga-8g7pY48ZpV-M1988wjPjaLaWE1lN72ALQ/exec',
  collabForm:   'https://script.google.com/macros/s/AKfycbwjCZZnqB_3AAy0bnzQWwrARLWkA0DYIZKT2TvF7GERuEQuE46Uv9sPO7vPq1ijcli6XQ/exec',
};

// ---------- Form helper ----------
function wireForm({ formId, statusId, requiredFields, emailField, consentField, successMsg }) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const data = Object.fromEntries(new FormData(form).entries());

    for (const field of requiredFields) {
      if (!data[field]) {
        status.classList.add('error');
        status.textContent = 'Please fill all required fields.';
        return;
      }
    }
    if (!form[consentField]?.checked) {
      status.classList.add('error');
      status.textContent = 'Please accept the consent checkbox.';
      return;
    }
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[emailField])) {
      status.classList.add('error');
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    const endpoint = SHEET_ENDPOINTS[formId];
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = 'Sending...'; }

    try {
      if (endpoint) {
        // 'text/plain' avoids a CORS preflight to Apps Script
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ _form: formId, submittedAt: new Date().toISOString(), ...data })
        });
      } else {
        console.log(`[${formId}] (no endpoint configured) submitted:`, data);
      }

      status.classList.add('success');
      status.textContent = successMsg;
      form.reset();
    } catch (err) {
      console.error(err);
      status.classList.add('error');
      status.textContent = 'Something went wrong. Please try again or email me directly.';
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label; }
    }
  });
}

wireForm({
  formId: 'coachingForm',
  statusId: 'formStatus',
  requiredFields: ['fullName', 'email'],
  emailField: 'email',
  consentField: 'consent',
  successMsg: "✓ Application received! I'll get back to you within 48 hours."
});

wireForm({
  formId: 'collabForm',
  statusId: 'collabStatus',
  requiredFields: ['contactName', 'workEmail', 'company', 'brief'],
  emailField: 'workEmail',
  consentField: 'collabConsent',
  successMsg: "✓ Pitch received! I'll review and respond within 3–5 business days."
});

// ---------- Smooth reveal on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill, .content-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

