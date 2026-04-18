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
      const downloadsLabel = isHE ? 'קבצים להורדה' : 'Downloads';
      const statusLabel = isHE ? 'סטטוס' : 'Status';
      const narrativeLabel = isHE ? 'על התהליך' : 'Behind the work';
      const statusText = card.getAttribute('data-status') || '';

      // Media template (gallery/video/iframe/pdf/etc) — raw HTML from <template data-embed>
      const mediaTpl = card.querySelector('template[data-embed]');
      const mediaHTML = mediaTpl ? mediaTpl.innerHTML : '';

      // Narrative template (optional rich body)
      const narrativeTpl = card.querySelector('template[data-narrative]');
      const narrativeHTML = narrativeTpl ? narrativeTpl.innerHTML : '';

      // Downloads template (optional <a> links)
      const downloadsTpl = card.querySelector('template[data-downloads]');
      const downloadsHTML = downloadsTpl ? downloadsTpl.innerHTML : '';

      const toolsBlock = tools.length
        ? '<h4>' + toolsLabel + '</h4><div class="chips">' +
            tools.map(function (t) { return '<span class="chip">' + escapeHTML(t) + '</span>'; }).join('') +
          '</div>'
        : '';

      const narrativeBlock = narrativeHTML
        ? '<h4>' + narrativeLabel + '</h4><div class="modal__narrative">' + narrativeHTML + '</div>'
        : '';

      const downloadsBlock = downloadsHTML
        ? '<h4>' + downloadsLabel + '</h4><div class="modal__downloads">' + downloadsHTML + '</div>'
        : '';

      modalBody.innerHTML =
        mediaHTML +
        (detail ? '<p class="modal__lede">' + escapeHTML(detail) + '</p>' : '') +
        narrativeBlock +
        toolsBlock +
        downloadsBlock +
        (statusText ? '<h4>' + statusLabel + '</h4><p>' + escapeHTML(statusText) + '</p>' : '');

      // Wide layout whenever there is any media
      modal.classList.toggle('modal--wide', !!mediaHTML);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Activate simple gallery lightbox (next/prev via thumbnails already inline)
      const gallery = modalBody.querySelector('[data-gallery]');
      if (gallery) initGallery(gallery);

      // Activate video tab switcher
      const videoset = modalBody.querySelector('.modal__videoset');
      if (videoset) initVideoTabs(videoset, modalBody);

      setTimeout(function () { modalClose.focus(); }, 10);
    }

    function initVideoTabs(root, scope) {
      const tabs = root.querySelectorAll('[data-video-tab]');
      const panes = root.querySelectorAll('[data-video-pane]');
      const narrativeScope = scope || root;
      const narrativeSections = narrativeScope.querySelectorAll('[data-narrative-for]');
      function applyTab(target) {
        tabs.forEach(function (t) {
          const on = t.getAttribute('data-video-tab') === target;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panes.forEach(function (p) {
          const on = p.getAttribute('data-video-pane') === target;
          p.classList.toggle('is-active', on);
          const v = p.querySelector('video');
          if (v && !on) { try { v.pause(); } catch (e) {} }
        });
        narrativeSections.forEach(function (s) {
          const keys = (s.getAttribute('data-narrative-for') || '').split(/[\s,]+/).filter(Boolean);
          s.hidden = keys.length > 0 && keys.indexOf(target) === -1;
        });
      }
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          applyTab(tab.getAttribute('data-video-tab'));
        });
      });
      const initial = root.querySelector('[data-video-tab].is-active');
      if (initial) applyTab(initial.getAttribute('data-video-tab'));
    }

    function initGallery(root) {
      const stage = root.querySelector('[data-gallery-stage]');
      const thumbs = root.querySelectorAll('[data-gallery-thumb]');
      if (!stage || !thumbs.length) return;
      thumbs.forEach(function (t, idx) {
        t.addEventListener('click', function () {
          const src = t.getAttribute('data-src');
          const caption = t.getAttribute('data-caption') || '';
          stage.querySelector('img').src = src;
          stage.querySelector('img').alt = caption;
          const cap = stage.querySelector('figcaption');
          if (cap) cap.textContent = caption;
          thumbs.forEach(function (x) { x.classList.remove('is-active'); });
          t.classList.add('is-active');
          stage.setAttribute('data-index', idx);
        });
      });
      // Prev/Next buttons
      const prev = root.querySelector('[data-gallery-prev]');
      const next = root.querySelector('[data-gallery-next]');
      function go(delta) {
        const cur = parseInt(stage.getAttribute('data-index') || '0', 10);
        const n = thumbs.length;
        const nx = (cur + delta + n) % n;
        thumbs[nx].click();
      }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });
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

    /* ---------- Image lightbox (zoomable) ---------- */
    var lightbox = document.createElement('div');
    lightbox.className = 'img-lightbox';
    lightbox.innerHTML = '<button class="img-lightbox__close" type="button" aria-label="Close">&times;</button><img src="" alt="">';
    document.body.appendChild(lightbox);
    var lbImg = lightbox.querySelector('img');
    var lbClose = lightbox.querySelector('.img-lightbox__close');
    function openLightbox(src, alt) {
      lbImg.src = src; lbImg.alt = alt || '';
      lightbox.classList.add('is-open');
    }
    function closeLightbox() { lightbox.classList.remove('is-open'); }
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
    document.addEventListener('click', function (e) {
      var img = e.target.closest('img[data-zoomable]');
      if (img) { e.preventDefault(); openLightbox(img.src, img.alt); }
    });

    /* ---------- Update footer year ---------- */
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
