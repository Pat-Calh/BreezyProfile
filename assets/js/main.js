// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Music switcher
const switchButtons = document.querySelectorAll('.switch-btn');
const embeds = document.querySelectorAll('.embed');
switchButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.target);
    if (!target) return;
    embeds.forEach(e => e.classList.remove('shown'));
    target.classList.add('shown');
  });
});

// Lightbox
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

if (gallery && lightbox && lightboxImg) {
  gallery.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    e.preventDefault();
    lightboxImg.src = link.getAttribute('href');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('open');
  });
}

if (lightbox && lightboxClose) {
  const closeLb = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  };
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLb();
  });
  lightboxClose.addEventListener('click', closeLb);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLb();
  });
}

// Smooth scroll for internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        if (navLinks && navLinks.classList.contains('open')) navLinks.classList.remove('open');
      }
    }
  });
});
