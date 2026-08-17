/* =========================================================
   Zouyaab.Dev — interactions
   ========================================================= */

/* ---------- current year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

// close menu after clicking a link
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

/* ---------- active nav link ---------- */
const sections = [...document.querySelectorAll('main section[id]')];
const linkMap = new Map(
  [...navLinks.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a])
);

function setActiveLink() {
  const pos = window.scrollY + 140;
  let current = sections[0]?.id;

  for (const s of sections) {
    if (s.offsetTop <= pos) current = s.id;
  }

  linkMap.forEach((a, id) => a.classList.toggle('active', id === current));
}

/* ---------- nav background + scroll progress ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';

  setActiveLink();
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 70}ms`;
  revealObserver.observe(el);
});

/* ---------- animated stat counters ---------- */
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

function animateCount(el) {
  const target = Number(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    // easeOutExpo
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- skill bars ---------- */
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const level = bar.dataset.level || 0;
      bar.querySelector('.track span').style.width = `${level}%`;
      barObserver.unobserve(bar);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.bar').forEach(b => barObserver.observe(b));

/* ---------- contact form ---------- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

const MY_EMAIL = 'zouyaabhussain25@gmail.com';
const MY_LINKEDIN = 'https://www.linkedin.com/in/zouyaab-hussain-7b8693218';

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  const missing = ['name', 'email', 'subject', 'message'].filter(k => !data[k]?.trim());

  if (missing.length) {
    note.textContent = 'Please fill in every field.';
    note.className = 'form-note err';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    note.textContent = 'Please enter a valid email address.';
    note.className = 'form-note err';
    return;
  }

  if (!MY_EMAIL) {
    note.textContent = 'Email isn\u2019t set up yet — opening LinkedIn so you can message me there.';
    note.className = 'form-note ok';
    window.open(MY_LINKEDIN, '_blank', 'noopener');
    return;
  }

  // Opens the visitor's mail client pre-filled.
  // Swap for Formspree/EmailJS if you want inbox delivery without mail apps.
  const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
  window.location.href =
    `mailto:${MY_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;

  note.textContent = 'Opening your email app…';
  note.className = 'form-note ok';
  form.reset();
});
