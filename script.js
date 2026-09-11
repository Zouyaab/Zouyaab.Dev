/* =========================================================
   Zouyaab.Dev — interactions
   ========================================================= */

/* ---------- current year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function setNavOpen(open) {
  navLinks.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
}

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  setNavOpen(!navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => setNavOpen(false))
);

document.addEventListener('click', (e) => {
  if (!navLinks.classList.contains('open')) return;
  if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
  setNavOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNavOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) setNavOpen(false);
});

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
const submitBtn = form.querySelector('button[type="submit"]');

/** Inbox that receives every contact-form submission */
const MY_EMAIL = 'zouyaabh@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${MY_EMAIL}`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  const missing = ['name', 'email', 'subject', 'message'].filter((k) => !String(data[k] || '').trim());

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

  // Honeypot — bots fill this; humans leave it empty.
  if (data._honey) {
    note.textContent = 'Message sent. Thank you!';
    note.className = 'form-note ok';
    form.reset();
    return;
  }

  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending…';
  note.textContent = 'Sending your message…';
  note.className = 'form-note';

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        _replyto: data.email.trim(),
        _subject: `Portfolio contact: ${data.subject.trim()}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || 'Could not send message');
    }

    note.textContent = 'Message sent — I’ll get back to you soon.';
    note.className = 'form-note ok';
    form.reset();
  } catch (err) {
    note.textContent =
      'Could not send right now. Email me directly at zouyaabh@gmail.com.';
    note.className = 'form-note err';
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
  }
});
