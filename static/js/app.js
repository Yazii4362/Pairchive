/* Boot script · HIG-aware behavior
 *
 * Responsibilities:
 *  1) Render the screen-picker tab bar (role=tablist + aria-selected)
 *  2) Render the active screen inside the device frame
 *  3) Device segmented (mo/ta/pc)  ─ switches device frame
 *  4) Theme toggle  (system → light → dark → system)
 *  5) GSAP entrance animation respecting prefers-reduced-motion
 */
(function () {
  const screens = window.PAIRCHIVE_SCREENS;

  const tabBar       = document.getElementById('tab-scroller');
  const viewport     = document.getElementById('screen-viewport');
  const stageTitle   = document.getElementById('stage-title');
  const stageDesc    = document.getElementById('stage-desc');
  const deviceEl     = document.getElementById('device');
  const deviceSeg    = document.getElementById('device-segmented');
  const themeBtn     = document.getElementById('theme-toggle');
  const root         = document.documentElement;

  let activeKey   = screens[0].key;
  let activeDevice = 'mo';        // mo | ta | pc
  let activeTheme  = 'system';    // system | light | dark

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ====================================================================
     Screen picker
     ==================================================================== */
  function renderTabs() {
    tabBar.innerHTML = screens
      .map((s) => `
        <button
          class="tab-btn"
          type="button"
          role="tab"
          data-key="${s.key}"
          aria-selected="${s.key === activeKey}"
          tabindex="${s.key === activeKey ? 0 : -1}"
        >${s.label}</button>`)
      .join('');
  }

  function setActiveScreen(key) {
    if (key === activeKey) return;
    activeKey = key;
    renderTabs();
    renderScreen();
    const btn = tabBar.querySelector(`[data-key="${key}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  /* ====================================================================
     Screen render + animation
     ==================================================================== */
  function animate() {
    if (typeof window.gsap === 'undefined') return;
    if (reduceMotion.matches) return;

    const items = viewport.querySelectorAll('.js-anim');
    if (items.length) {
      window.gsap.from(items, {
        opacity: 0,
        y: 14,
        duration: 0.45,
        ease: 'power3.out',
        stagger: 0.05,
      });
    }

    const books = viewport.querySelectorAll('.js-book');
    if (books.length) {
      window.gsap.from(books, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.04,
        delay: 0.1,
      });

      books.forEach((el, i) => {
        window.gsap.to(el, {
          y: i % 2 === 0 ? -3 : -5,
          duration: 1.6 + (i % 3) * 0.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.6 + i * 0.05,
        });
      });
    }
  }

  function renderScreen() {
    const screen = screens.find((s) => s.key === activeKey) || screens[0];
    if (stageTitle) stageTitle.textContent = screen.label;
    if (stageDesc) stageDesc.textContent  = screen.desc;

    viewport.scrollTop = 0;
    viewport.innerHTML = screen.render();
    animate();
    bindReactions();
  }

  /* ====================================================================
     Emoji reaction toggling (replaces comment interaction)
     ==================================================================== */
  function bindReactions() {
    const buttons = viewport.querySelectorAll('.js-reaction');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pressed = btn.getAttribute('aria-pressed') === 'true';
        const countEl = btn.querySelector('.reaction__count');
        let count = countEl ? parseInt(countEl.textContent, 10) || 0 : 0;

        if (pressed) {
          count = Math.max(0, count - 1);
          btn.setAttribute('aria-pressed', 'false');
        } else {
          count = count + 1;
          btn.setAttribute('aria-pressed', 'true');
        }

        // re-render count badge
        if (count > 0) {
          if (countEl) {
            countEl.textContent = String(count);
          } else {
            const span = document.createElement('span');
            span.className = 'reaction__count';
            span.textContent = String(count);
            btn.appendChild(span);
          }
        } else if (countEl) {
          countEl.remove();
        }

        // pop animation
        btn.classList.remove('is-pop');
        void btn.offsetWidth; // restart animation
        btn.classList.add('is-pop');
        window.setTimeout(() => btn.classList.remove('is-pop'), 420);

        // aria-label sync
        const emoji = btn.querySelector('.reaction__emoji')?.textContent ?? '';
        btn.setAttribute(
          'aria-label',
          `${emoji} 리액션, ${count}명`
        );
      });
    });
  }

  /* ====================================================================
     Device switcher (mo / ta / pc)
     ==================================================================== */
  function setDevice(key) {
    if (!['mo', 'ta', 'pc'].includes(key)) return;
    if (key === activeDevice) return;
    activeDevice = key;

    if (deviceEl) {
      deviceEl.classList.remove('device--mo', 'device--ta', 'device--pc');
      deviceEl.classList.add(`device--${key}`);
    }

    if (deviceSeg) {
      deviceSeg.querySelectorAll('[data-device]').forEach((btn) => {
        btn.setAttribute('aria-selected', String(btn.dataset.device === key));
      });
    }
  }

  /* ====================================================================
     Theme toggle  (system → light → dark → system ...)
     ==================================================================== */
  function applyTheme(theme) {
    activeTheme = theme;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    const isDarkEffective =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    themeBtn.setAttribute('aria-pressed', String(isDarkEffective));
    themeBtn.title =
      theme === 'system' ? '시스템 테마 (탭하면 라이트)' :
      theme === 'light'  ? '라이트 모드 (탭하면 다크)' :
                           '다크 모드 (탭하면 시스템)';
  }

  function cycleTheme() {
    const order = ['system', 'light', 'dark'];
    const next = order[(order.indexOf(activeTheme) + 1) % order.length];
    applyTheme(next);
  }

  /* ====================================================================
     Event bindings
     ==================================================================== */
  function bind() {
    /* Screen tabs ----------------------------------------------------- */
    tabBar.addEventListener('click', (e) => {
      const target = e.target.closest('.tab-btn');
      if (!target) return;
      setActiveScreen(target.dataset.key);
    });

    /* Roving tab index (HIG keyboard support) ------------------------ */
    tabBar.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const buttons = Array.from(tabBar.querySelectorAll('.tab-btn'));
      const currentIdx = buttons.findIndex(
        (b) => b.getAttribute('aria-selected') === 'true'
      );
      let nextIdx = currentIdx;
      if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % buttons.length;
      if (e.key === 'ArrowLeft')  nextIdx = (currentIdx - 1 + buttons.length) % buttons.length;
      if (e.key === 'Home')       nextIdx = 0;
      if (e.key === 'End')        nextIdx = buttons.length - 1;
      const next = buttons[nextIdx];
      if (next) {
        setActiveScreen(next.dataset.key);
        const focusTarget = tabBar.querySelector(`[data-key="${next.dataset.key}"]`);
        focusTarget?.focus();
      }
    });

    /* Device segmented ------------------------------------------------ */
    if (deviceSeg) {
      deviceSeg.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-device]');
        if (!btn) return;
        setDevice(btn.dataset.device);
      });
    }

    /* Theme toggle ---------------------------------------------------- */
    themeBtn.addEventListener('click', cycleTheme);

    /* React to system theme change while in 'system' mode ------------- */
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener?.('change', () => {
        if (activeTheme === 'system') applyTheme('system');
      });

    /* Honor reduced-motion changes ------------------------------------ */
    reduceMotion.addEventListener?.('change', renderScreen);
  }

  /* ====================================================================
     Init
     ==================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    renderScreen();
    setDevice('mo');
    applyTheme('system');
    bind();
  });
})();
