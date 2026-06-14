/* ==========================================================================
   Webnetic Digital Solutions — shared.js
   Theme toggle (persisted), sticky nav, mobile menu, counters, hero canvas.
   ========================================================================== */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- Theme */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('webnetic-theme', t); } catch (e) {}
  }
  // Set early-stored theme (also done inline in <head> to avoid flash).
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(cur === 'light' ? 'dark' : 'light');
  });

  /* ---------------------------------------------------- Sticky nav */
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('is-stuck', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------- Mobile menu */
  var burger = document.querySelector('[data-hamburger]');
  var mnav = document.querySelector('.mobile-nav');
  function toggleMenu(open) {
    if (!mnav || !burger) return;
    var willOpen = open === undefined ? !mnav.classList.contains('is-open') : open;
    mnav.classList.toggle('is-open', willOpen);
    burger.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
    var ico = burger.querySelector('[data-burger-ico]');
    if (ico) ico.setAttribute('data-lucide', willOpen ? 'x' : 'menu');
    if (window.lucide) window.lucide.createIcons();
  }
  if (burger) burger.addEventListener('click', function () { toggleMenu(); });
  if (mnav) mnav.addEventListener('click', function (e) { if (e.target.closest('a')) toggleMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggleMenu(false); });

  /* ------------------------------------------------- Number counters */
  function countUp(el, target, duration) {
    duration = duration || 1800;
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          countUp(en.target, parseFloat(en.target.dataset.count));
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ------------------------------------------------ Hero word cycle */
  var cycle = document.querySelector('[data-cycle]');
  if (cycle) {
    var words = (cycle.dataset.cycle || '').split('|');
    var i = 0;
    if (!reduceMotion && words.length > 1) {
      setInterval(function () {
        cycle.style.opacity = '0';
        cycle.style.transform = 'translateY(10px)';
        setTimeout(function () {
          i = (i + 1) % words.length;
          cycle.textContent = words[i];
          cycle.style.opacity = '1';
          cycle.style.transform = 'translateY(0)';
        }, 320);
      }, 2500);
    }
  }

  /* ---------------------------------------------- Testimonial carousel */
  var track = document.querySelector('[data-carousel]');
  if (track && !reduceMotion) {
    var paused = false;
    track.addEventListener('mouseenter', function () { paused = true; });
    track.addEventListener('mouseleave', function () { paused = false; });
    setInterval(function () {
      if (paused) return;
      var max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: track.clientWidth * 0.6, behavior: 'smooth' });
    }, 3800);
  }

  /* ----------------------------------------------- Lucide icons init */
  if (window.lucide) window.lucide.createIcons();

  /* ================================================= HERO CANVAS ===== */
  var host = document.getElementById('hero-canvas');
  if (host && !reduceMotion) initHero(host);

  function initHero(host) {
    var net = host.querySelector('.hero-net');
    var rain = host.querySelector('.hero-rain');
    if (!net) return;
    var nctx = net.getContext('2d');
    var rctx = rain ? rain.getContext('2d') : null;
    var W, H, DPR;
    var particles = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00d4ff';

    function rgb(a) {
      // crude hex -> rgba
      var h = primary.replace('#', '');
      if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
      var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      [net, rain].forEach(function (c) {
        if (!c) return;
        c.width = W * DPR; c.height = H * DPR;
        c.style.width = W + 'px'; c.style.height = H + 'px';
        c.getContext('2d').setTransform(DPR, 0, 0, DPR, 0, 0);
      });
      buildRain();
    }

    function makeParticle(x, y, burst) {
      return {
        x: x != null ? x : Math.random() * W,
        y: y != null ? y : Math.random() * H,
        vx: (Math.random() - 0.5) * (burst ? 3 : 0.5),
        vy: (Math.random() - 0.5) * (burst ? 3 : 0.5),
        r: Math.random() * 1.6 + 0.8,
        life: burst ? 1 : Infinity
      };
    }

    function seed() {
      particles = [];
      var count = Math.min(210, Math.floor((W * H) / 9000));
      for (var i = 0; i < count; i++) particles.push(makeParticle());
    }

    function step() {
      nctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        // mouse attraction
        if (mouse.active) {
          var dx = mouse.x - p.x, dy = mouse.y - p.y;
          var d = Math.hypot(dx, dy);
          if (d < 140 && d > 0.5) {
            var f = (140 - d) / 140 * 0.6;
            p.vx += (dx / d) * f * 0.12;
            p.vy += (dy / d) * f * 0.12;
          }
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.985; p.vy *= 0.985;
        // gentle drift floor
        if (Math.abs(p.vx) < 0.15 && p.life === Infinity) p.vx += (Math.random() - 0.5) * 0.06;
        if (Math.abs(p.vy) < 0.15 && p.life === Infinity) p.vy += (Math.random() - 0.5) * 0.06;
        // wrap / fade
        if (p.life !== Infinity) { p.life -= 0.012; if (p.life <= 0) { particles.splice(i, 1); i--; continue; } }
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;

        nctx.beginPath();
        nctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        nctx.fillStyle = rgb(p.life === Infinity ? 0.55 : p.life * 0.8);
        nctx.fill();
      }
      // connections
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var pa = particles[a], pb = particles[b];
          var ddx = pa.x - pb.x, ddy = pa.y - pb.y;
          var dist = Math.hypot(ddx, ddy);
          if (dist < 122) {
            var op = (1 - dist / 122) * 0.32;
            var near = mouse.active && (Math.hypot(mouse.x - pa.x, mouse.y - pa.y) < 160 || Math.hypot(mouse.x - pb.x, mouse.y - pb.y) < 160);
            nctx.beginPath();
            nctx.moveTo(pa.x, pa.y); nctx.lineTo(pb.x, pb.y);
            nctx.strokeStyle = rgb(near ? Math.min(op * 2.4, 0.7) : op);
            nctx.lineWidth = near ? 1 : 0.6;
            nctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }

    /* --- code rain --- */
    var cols = [], rainGlyphs = ['0', '1', '0', '1', '<div>', '</a>', 'const', '{', '}', 'function()', '</>', '01', 'API', '=>'];
    function buildRain() {
      if (!rctx) return;
      cols = [];
      var n = Math.floor(W / 22);
      for (var c = 0; c < n; c++) cols.push({ x: c * 22 + 6, y: Math.random() * H, speed: Math.random() * 0.9 + 0.4 });
    }
    function rainStep() {
      if (!rctx) return;
      rctx.clearRect(0, 0, W, H);
      rctx.font = '12px monospace';
      for (var c = 0; c < cols.length; c++) {
        var col = cols[c];
        rctx.fillStyle = 'rgba(0, 255, 140, 0.05)';
        rctx.fillText(rainGlyphs[(Math.floor(col.y / 16) + c) % rainGlyphs.length], col.x, col.y);
        col.y += col.speed;
        if (col.y > H + 20) { col.y = -20; col.speed = Math.random() * 0.9 + 0.4; }
      }
      requestAnimationFrame(rainStep);
    }

    // events
    host.addEventListener('mousemove', function (e) {
      var r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    });
    host.addEventListener('mouseleave', function () { mouse.active = false; mouse.x = -9999; mouse.y = -9999; });
    host.addEventListener('click', function (e) {
      var r = host.getBoundingClientRect();
      var cx = e.clientX - r.left, cy = e.clientY - r.top;
      for (var k = 0; k < 12; k++) particles.push(makeParticle(cx, cy, true));
    });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); seed(); }, 200); });

    size(); seed(); step(); rainStep();
  }
})();
