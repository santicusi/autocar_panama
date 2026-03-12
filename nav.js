/* ══════════════════════════════════════════════════════════════
   FAST CAR AUDIO & SYSTEMS — Shared Navigation & WhatsApp JS
   Incluir en todas las landing pages
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Navbar scroll effect ───
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ─── Mobile menu ───
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-mobile-overlay');
  const closeBtn = document.querySelector('.nav-mobile-close');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function cerrarMenu() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', cerrarMenu);

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', cerrarMenu);
    });
  }

  // ─── Fade-in on scroll (Intersection Observer) ───
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── WhatsApp conversion tracking ───
  // Cada botón con data-tracking dispara el evento de conversión
  document.querySelectorAll('[data-tracking]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var trackingName = this.getAttribute('data-tracking');

      // Google Ads conversion event (reemplazar ID/label por los del cliente)
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXX', // ← REEMPLAZAR
          'event_callback': function () { }
        });
      }

      // GA4 custom event
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
          'event_category': 'contacto',
          'event_label': trackingName
        });
      }
    });
  });
});
