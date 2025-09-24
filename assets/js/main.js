// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
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

// Scroll reveal using IntersectionObserver
(() => {
  const toReveal = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || toReveal.length === 0) {
    // Fallback: show immediately
    toReveal.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  toReveal.forEach(el => io.observe(el));
})();

// Subtle parallax for background orbs
(() => {
  const orbs = document.querySelector('.bg-orbs');
  if (!orbs) return;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    // Very gentle translate effect
    orbs.style.transform = `translate3d(0, ${y * -0.03}px, 0)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Randomize wave separators on each load
(() => {
  const waves = document.querySelectorAll('.wave-separator svg');
  if (!waves.length) return;

  // A few nice wave variants (two layered paths each). Keep heights compatible with 120px viewport height.
  const variants = [
    [
      'M0,64 C240,112 360,0 720,48 C1080,96 1200,32 1440,80 L1440,120 L0,120 Z',
      'M0,72 C240,120 360,16 720,64 C1080,112 1200,48 1440,96 L1440,120 L0,120 Z'
    ],
    [
      'M0,80 C180,40 360,100 720,60 C1080,20 1260,80 1440,40 L1440,120 L0,120 Z',
      'M0,90 C220,60 380,110 720,70 C1060,30 1240,90 1440,60 L1440,120 L0,120 Z'
    ],
    [
      'M0,70 C200,10 380,100 720,80 C1060,60 1240,20 1440,50 L1440,120 L0,120 Z',
      'M0,85 C240,30 400,110 720,90 C1040,70 1220,40 1440,65 L1440,120 L0,120 Z'
    ],
    [
      'M0,76 C180,96 420,20 720,68 C1040,120 1200,40 1440,88 L1440,120 L0,120 Z',
      'M0,84 C220,104 440,28 720,76 C1000,124 1180,52 1440,100 L1440,120 L0,120 Z'
    ],
    [
      'M0,60 C260,20 420,100 720,56 C980,14 1200,86 1440,44 L1440,120 L0,120 Z',
      'M0,68 C300,28 440,108 720,64 C960,26 1180,92 1440,52 L1440,120 L0,120 Z'
    ],
    [
      'M0,74 C180,18 380,108 720,72 C1080,36 1240,88 1440,60 L1440,120 L0,120 Z',
      'M0,88 C220,32 400,116 720,80 C1040,44 1220,100 1440,72 L1440,120 L0,120 Z'
    ]
  ];

  // Assign random shape, flip, opacity, height, and parallax factor
  waves.forEach((svg) => {
    const paths = svg.querySelectorAll('path');
    if (paths.length < 2) return;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    paths[0].setAttribute('d', variant[0]);
    paths[1].setAttribute('d', variant[1]);

    // Random flip horizontally 50% of the time
    const flip = Math.random() < 0.5;
    svg.dataset.flip = flip ? '1' : '0';

    // Slight randomize opacity within a tasteful range
    const op1 = (0.08 + Math.random() * 0.06).toFixed(2);
    const op2 = (0.08 + Math.random() * 0.06).toFixed(2);
    const fills = [
      `rgba(122,162,255,${op1})`,
      `rgba(108,240,194,${op2})`
    ];
    paths[0].setAttribute('fill', fills[0]);
    paths[1].setAttribute('fill', fills[1]);

    // Randomize height a bit (110-150px)
    const h = Math.round(110 + Math.random() * 40);
    svg.style.height = `${h}px`;
    // Store a parallax factor for vertical scroll (0.02 - 0.08)
    const factor = (0.02 + Math.random() * 0.06).toFixed(3);
    svg.dataset.parallaxFactor = factor;
  });

  // Apply vertical parallax on scroll (combine flip + translateY)
  const updateWaveTransforms = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    waves.forEach((svg) => {
      const flip = svg.dataset.flip === '1';
      const factor = parseFloat(svg.dataset.parallaxFactor || '0.04');
      const ty = -(y * factor);
      const flipStr = flip ? 'scaleX(-1)' : 'none';
      svg.style.transform = `${flipStr} translate3d(0, ${ty}px, 0)`;
    });
  };
  window.addEventListener('scroll', updateWaveTransforms, { passive: true });
  updateWaveTransforms();
})();
