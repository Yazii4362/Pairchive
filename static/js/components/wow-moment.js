import { navigateTo } from '../app.js';

/**
 * 07 · 와우 모먼트 — 한 권의 책이 책장에 꽂힌 순간
 * 시안: "THE PERSONAL CURATION" 헤드라인 + March·APRIL(네이비)·May 책장.
 */
export function renderWowMoment() {
  const section = document.createElement('section');
  section.className = 'screen screen--wow-moment';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="wow-head">
      <h1 class="wow-title">
        <span>THE</span>
        <span>PERSONAL</span>
        <span>CURATION</span>
      </h1>
    </header>

    <div class="wow-shelf-stage" aria-hidden="true">
      <div class="wow-shelf">
        <span class="wow-spine wow-spine--paper">
          <span class="wow-spine__label">MARCH</span>
        </span>
        <span class="wow-spine wow-spine--feature">
          <span class="wow-spine__label">APRIL</span>
        </span>
        <span class="wow-spine wow-spine--paper">
          <span class="wow-spine__label">MAY</span>
        </span>
      </div>
      <div class="wow-shelf-floor"></div>
    </div>

    <footer class="wow-foot">
      <button class="ed-btn ed-btn--block" type="button" data-go="report">리포트 카드로</button>
      <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-go="shelf">서재로 돌아가기</button>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
