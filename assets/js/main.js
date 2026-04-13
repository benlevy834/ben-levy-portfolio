/* =========================================================
   Ben Levy — Portfolio
   Vanilla JS: language toggle, reveal, modal, nav, smooth scroll
   ========================================================= */
(function () {
  'use strict';

  const HE_HOME = '../index.html';
  const EN_HOME = 'en/index.html';

  const docLang = document.documentElement.lang || 'en';
  const isHE = docLang.toLowerCase().startsWith('he');

  /* ---------- Language persistence + toggle ---------- */
  try {
    // On first load of the session, honor a saved preference.
    const saved = localStorage.getItem('bl-lang');
    const redirected = sessionStorage.getItem('bl-lang-redirected');
    if (!redirected && saved && ((saved === 'en' && isHE) || (saved === 'he' && !isHE))) {
      sessionStorage.setItem('bl-lang-redirected', '1');
      window.location.replace(isHE ? EN_HOME : HE_HOME);
      return;
    }
  } catch (e) { /* storage may be unavailable */ }

  document.addEventListener('DOMContentLoaded', function () {
    const langToggle = document.querySelector('[data-lang-toggle]');
    if (langToggle) {
      langToggle.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          localStorage.setItem('bl-lang', isHE ? 'en' : 'he');
          sessionStorage.setItem('bl-lang-redirected', '1');
        } catch (err) { /* noop */ }
        window.location.href = isHE ? EN_HOME : HE_HOME;
      });
    }

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const id = link.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            const headerOffset = 72;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: top, behavior: 'smooth' });
            // Close mobile menu if open
            const list = document.querySelector('.nav__list');
            if (list) list.classList.remove('is-open');
          }
        }
      });
    });

    /* ---------- Mobile nav toggle ---------- */
    const burger = document.querySelector('[data-nav-toggle]');
    const navList = document.querySelector('.nav__list');
    if (burger && navList) {
      burger.addEventListener('click', function () {
        const isOpen = navList.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    /* ---------- Portfolio modal ---------- */
    const modal = document.getElementById('work-modal');
    if (!modal) return;
    const modalTag = modal.querySelector('[data-modal-tag]');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const modalBody = modal.querySelector('[data-modal-body]');
    const modalClose = modal.querySelector('[data-modal-close]');

    let lastFocused = null;

    function openModal(card) {
      lastFocused = document.activeElement;
      modalTag.textContent = card.getAttribute('data-tag') || '';
      modalTitle.textContent = card.getAttribute('data-title') || '';
      const detail = card.getAttribute('data-detail') || '';
      const tools = (card.getAttribute('data-tools') || '').split('|').filter(Boolean);
      const toolsLabel = isHE ? 'כלים' : 'Tools';
      const statusLabel = isHE ? 'סטטוס' : 'Status';
      const statusText = card.getAttribute('data-status') || '';
      const embedTpl = card.querySelector('template[data-embed]');
      const embedHTML = embedTpl ? embedTpl.innerHTML : '';
      const embedBlock = embedHTML
        ? '<div class="modal__embed">' + embedHTML + '</div>'
        : '';
      modalBody.innerHTML =
        embedBlock +
        '<p>' + escapeHTML(detail) + '</p>' +
        '<h4>' + toolsLabel + '</h4>' +
        '<div class="chips">' +
          tools.map(function (t) { return '<span class="chip">' + escapeHTML(t) + '</span>'; }).join('') +
        '</div>' +
        (statusText ? '<h4>' + statusLabel + '</h4><p>' + escapeHTML(statusText) + '</p>' : '');
      // Wide layout when embed is present
      modal.classList.toggle('modal--wide', !!embedHTML);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus first focusable
      setTimeout(function () { modalClose.focus(); }, 10);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function escapeHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const card = btn.closest('[data-card]');
        if (card) openModal(card);
      });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      // Focus trap
      if (e.key === 'Tab' && modal.classList.contains('is-open')) {
        const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    /* ---------- Update footer year ---------- */
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
