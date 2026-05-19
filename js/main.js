/* ─── Marauder's Map hero trail ──────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-trail');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SPEED      = 0.55;
  const CR = 139, CG = 94, CB = 60;
  const PRINT_DIST = 38;  // px of travel between each footstep
  const MAX_PRINTS = 10;  // last 10 steps visible

  let W, H, x, y, angle, tick = 0, init = false;
  let distSincePrint = 0, printIndex = 0;
  const prints = []; // { x, y, angle, isLeft, frameAge, stepAge }

  // Curvature-based steering: angle drifts gently (curves),
  // curvature is damped toward 0 so it never sustains a full circle
  let curvature = 0;

  // ── Shooting stars ──────────────────────────────────────────────
  const shootingStars = [];
  let nextStarIn = 40; // first star appears quickly on load

  function spawnStar() {
    const edge   = Math.floor(Math.random() * 4);
    const spread = 0.45;
    let sx, sy, sa;
    if (edge === 0) { sx = Math.random() * W;      sy = -10;   sa =  Math.PI/2 + (Math.random()-0.5)*spread; }
    if (edge === 1) { sx = W + 10; sy = Math.random()*H*0.8;   sa =  Math.PI   + (Math.random()-0.5)*spread; }
    if (edge === 2) { sx = -10;    sy = Math.random()*H*0.8;   sa =              (Math.random()-0.5)*spread; }
    if (edge === 3) { sx = Math.random() * W;      sy = H+10;  sa = -Math.PI/2 + (Math.random()-0.5)*spread; }
    const spd = 12 + Math.random() * 8; // faster so it clearly reads as a shooting star
    shootingStars.push({
      x: sx, y: sy,
      vx: Math.cos(sa) * spd,
      vy: Math.sin(sa) * spd,
      life: 1.0,
      decay: 0.008 + Math.random() * 0.006, // slower fade — lasts longer
      trail: [],
      trailLen: 35 + Math.floor(Math.random() * 20), // longer trail
    });
  }

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    if (!init) {
      x = W * 0.05; y = H * (0.3 + Math.random() * 0.4);
      angle = (Math.random() - 0.5) * 0.4;
      curvature = 0;
      init = true;
    }
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  /* Shoe sole: toe oval (larger, forward) + heel oval (smaller, back) */
  function drawSole(size) {
    ctx.beginPath();
    ctx.ellipse( size * 0.07, -size * 0.50, size * 0.40, size * 0.54,  0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-size * 0.04,  size * 0.46, size * 0.29, size * 0.33, -0.10, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderPrint(fp, alpha) {
    if (alpha < 0.01) return;
    const perp   = fp.angle + Math.PI / 2;
    const offset = fp.isLeft ? -9 : 9;
    ctx.save();
    ctx.translate(fp.x + Math.cos(perp) * offset, fp.y + Math.sin(perp) * offset);
    // +π/2 aligns the toe (drawn pointing up in local space) with travel direction
    ctx.rotate(fp.angle + Math.PI / 2 + (fp.isLeft ? 0.15 : -0.15));
    if (fp.isLeft) ctx.scale(-1, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${CR},${CG},${CB})`;
    drawSole(20);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function loop() {
    tick++;

    /* Curvature steering — allow gentle curves, no circles */
    curvature += (Math.random() - 0.5) * 0.005;
    curvature *= 0.97;
    curvature  = Math.max(-0.020, Math.min(0.020, curvature));
    angle += curvature;

    /* Horizontal bias: gently pull the vertical component toward 0
       so the path naturally prefers left/right travel             */
    angle -= Math.sin(angle) * 0.012;

    /* Wrap horizontally — walk off one side, re-enter from the other */
    if (x > W + 30) { x = -30; y = H * (0.2 + Math.random() * 0.6); angle = (Math.random() - 0.5) * 0.5; }
    if (x < -30)    { x = W + 30; y = H * (0.2 + Math.random() * 0.6); angle = Math.PI + (Math.random() - 0.5) * 0.5; }

    /* Soft vertical boundary — nudge back if drifting too high/low */
    const vpad = H * 0.08;
    if (y < vpad)     angle += 0.05;
    if (y > H - vpad) angle -= 0.05;

    const dx = Math.cos(angle) * SPEED;
    const dy = Math.sin(angle) * SPEED;
    distSincePrint += Math.hypot(dx, dy);
    x += dx; y += dy;

    /* Stamp a new footprint when enough distance covered */
    if (distSincePrint >= PRINT_DIST) {
      distSincePrint = 0;
      printIndex++;
      prints.forEach(p => p.stepAge++);   // age all existing prints by 1 step
      prints.push({ x, y, angle, isLeft: printIndex % 2 === 0, stepAge: 0 });
      while (prints.length > MAX_PRINTS + 2) prints.shift();
    }

    ctx.clearRect(0, 0, W, H);

    for (const fp of prints) {
      const fadeOut = Math.max(0, 1 - fp.stepAge / MAX_PRINTS);  // newest=1, oldest=0
      renderPrint(fp, fadeOut * 0.65);
    }

    // ── Shooting stars ────────────────────────────────────────────
    if (--nextStarIn <= 0) {
      spawnStar();
      nextStarIn = 150 + Math.random() * 200; // next star in ~2.5–6 sec
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > s.trailLen) s.trail.shift();
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;
      if (s.life <= 0 || s.x < -150 || s.x > W+150 || s.y < -150 || s.y > H+150) {
        shootingStars.splice(i, 1); continue;
      }

      // Draw tapering glowing trail
      ctx.save();
      ctx.lineCap = 'round';
      ctx.setLineDash([]);
      // Draw tapering glowing trail
      for (let j = 1; j < s.trail.length; j++) {
        const t     = j / s.trail.length;          // 0=tail end → 1=head
        const alpha = t * t * s.life * 0.72;
        const width = t * 2.8;
        ctx.beginPath();
        ctx.moveTo(s.trail[j-1].x, s.trail[j-1].y);
        ctx.lineTo(s.trail[j].x,   s.trail[j].y);
        ctx.strokeStyle = `rgba(255, 220, 155, ${alpha})`; // warm gold
        ctx.lineWidth   = width;
        ctx.stroke();
      }
      // Bright leading point with soft glow
      const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
      grd.addColorStop(0,   `rgba(255, 245, 200, ${s.life * 0.9})`);
      grd.addColorStop(0.4, `rgba(255, 210, 120, ${s.life * 0.5})`);
      grd.addColorStop(1,   `rgba(255, 180,  80, 0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  loop();
})();

/* ─── Nav scroll effect ──────────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ─── Hero brand → nav logo transition ───────────────────────────── */
const heroBrand = document.getElementById('hero-brand');
const navLogo   = document.getElementById('nav-logo');
if (heroBrand && navLogo) {
  const brandObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLogo.classList.remove('nav-logo-visible');
      } else {
        navLogo.classList.add('nav-logo-visible');
      }
    });
  }, { threshold: 0.1 });
  brandObs.observe(heroBrand);
}

/* ─── Reveal on scroll ───────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
}

/* ─── Lightbox ───────────────────────────────────────────────────── */
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt, country, caption) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  const countryEl = document.getElementById('lightbox-country');
  const descEl    = document.getElementById('lightbox-desc');
  if (countryEl) countryEl.textContent = country || '';
  if (descEl)    descEl.textContent    = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item, .masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const country = item.querySelector('.masonry-country')?.textContent || '';
    const caption = item.querySelector('.masonry-caption')?.textContent || '';
    if (img) openLightbox(img.src, img.alt, country, caption);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ─── Counter animation ──────────────────────────────────────────── */
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1600;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const raw = e.target.dataset.count;
        const suffix = e.target.dataset.suffix || '';
        // If the value is ∞ (or any non-numeric), show it directly — no counting
        if (raw === '∞' || isNaN(parseInt(raw, 10))) {
          e.target.textContent = raw + suffix;
        } else {
          animateCount(e.target, parseInt(raw, 10), suffix);
        }
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cObs.observe(el));
}

/* ─── Gallery: fade in once first images are settled (prevents layout shift) ── */
const masonryGrid = document.querySelector('.masonry-grid');
if (masonryGrid) {
  const allImgs = Array.from(masonryGrid.querySelectorAll('img'));
  // Only wait on the first 9 images (above the fold on most screens)
  const firstBatch = allImgs.slice(0, 9);
  let loadedCount = 0;
  const THRESHOLD = Math.min(firstBatch.length, 6); // show after 6 images settle

  const tryReveal = () => {
    loadedCount++;
    if (loadedCount >= THRESHOLD) masonryGrid.classList.add('is-ready');
  };

  if (firstBatch.length === 0) {
    masonryGrid.classList.add('is-ready');
  } else {
    firstBatch.forEach(img => {
      if (img.complete && img.naturalWidth > 0) tryReveal();
      else {
        img.addEventListener('load', tryReveal, { once: true });
        img.addEventListener('error', tryReveal, { once: true });
      }
    });
  }
  // Hard fallback: always reveal within 2.5s even on slow connections
  setTimeout(() => masonryGrid.classList.add('is-ready'), 2500);
}

/* ─── Gallery filter ─────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    masonryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.opacity = '';
      item.style.pointerEvents = '';
      item.style.display = show ? '' : 'none';
      item.classList.toggle('gallery-hidden', !show);
    });
  });
});

/* ─── Nav active link ────────────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ─── Newsletter form ────────────────────────────────────────────── */
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = ctaForm.querySelector('input');
    const btn   = ctaForm.querySelector('button');
    if (!input.value.trim()) return;
    btn.textContent = 'You\'re in ✦';
    btn.style.background = 'var(--bark)';
    btn.style.color = 'var(--sand)';
    input.value = '';
    input.placeholder = 'Thank you for joining the journey!';
    setTimeout(() => {
      btn.textContent = 'Join';
      btn.style.background = '';
      btn.style.color = '';
      input.placeholder = 'your@email.com';
    }, 4000);
  });
}

/* ─── Mobile nav toggle ──────────────────────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-links');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = open ? '' : 'flex';
    mobileMenu.style.flexDirection = 'column';
    mobileMenu.style.position = 'absolute';
    mobileMenu.style.top = '100%';
    mobileMenu.style.left = '0';
    mobileMenu.style.right = '0';
    mobileMenu.style.background = 'var(--sand-light)';
    mobileMenu.style.padding = '1.5rem 2rem';
    mobileMenu.style.borderTop = '1px solid rgba(61,43,26,.08)';
    if (open) mobileMenu.removeAttribute('style');
  });
}
