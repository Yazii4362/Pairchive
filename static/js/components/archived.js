import { navigateTo } from '../app.js';

/**
 * 11 · 간직된 책 상세 (Read-only) — app.js에서 `detail-read` 이름으로도 노출
 */
export function renderArchived() {
  const section = document.createElement('section');
  section.className = 'screen screen--archived';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <nav class="archived-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="shelf">‹ 책장</button>
      <span class="ed-section-label" style="font-size:9px;">Archive · 2025.04</span>
      <span class="ed-badge ed-badge--paper">읽기 전용</span>
    </nav>

    <div class="cover-stage" style="padding: 18px 28px 8px;">
      <article class="cover" style="width: 168px; height: 230px;">
        <div class="cover__plate">
          <p class="cover__meta-line">Film Archive</p>
          <div class="cover__plate-art" aria-hidden="true">
            <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" fill="none">
              <ellipse cx="40" cy="35" rx="14" ry="16" fill="rgba(237,230,214,0.18)"/>
              <path d="M22 60 Q40 50 58 60 L60 92 Q40 100 20 92 Z" fill="rgba(237,230,214,0.18)"/>
              <path d="M18 92 Q40 84 62 92 L64 110 L16 110 Z" fill="rgba(237,230,214,0.10)"/>
            </svg>
          </div>
          <p class="cover__meta-title">Personal<br/>Curation</p>
          <p class="cover__meta-line" style="margin-top:6px;">April 2025</p>
        </div>
      </article>
    </div>

    <div class="ed-page" style="padding: 0 22px; flex: 0;">
      <header style="text-align:center;">
        <h1 class="ed-title ed-title--sm">선형 대수학,<br/>4월의 한 권</h1>
        <p class="ed-caption" style="margin-top: 6px;">
          두비 · 야지 · 2025.04.01 — 04.30
        </p>
      </header>

      <section class="stat-grid" style="margin-top: 18px;">
        <div class="stat-cell">
          <span class="stat-cell__num">12</span>
          <span class="stat-cell__label">Pages</span>
        </div>
        <div class="stat-cell">
          <span class="stat-cell__num">3</span>
          <span class="stat-cell__label">Wow</span>
        </div>
      </section>

      <article class="ed-card ed-card--quote" style="margin-top: 16px;">
        <p class="ed-section-label" style="font-size:9px;">덮을 때 남긴 한 줄</p>
        <p class="ed-quote">“다음 책은 색에 대해 다뤄볼까?”</p>
        <p class="ed-caption" style="text-align:left; font-size:12px;">야지 · 2025.04.30</p>
      </article>

      <p class="ed-section-label" style="margin: 16px 0 8px;">이 책의 반응 (변경 불가)</p>
      <div class="chip-row" aria-label="기록된 반응">
        <span class="chip" style="cursor:default;"><span class="chip__emoji">🔥</span><span class="chip__count">두비</span></span>
        <span class="chip" style="cursor:default;"><span class="chip__emoji">💡</span><span class="chip__count">야지</span></span>
        <span class="chip" style="cursor:default;"><span class="chip__emoji">🫶</span><span class="chip__count">두비·야지</span></span>
      </div>
    </div>

    <footer class="ed-footer" style="padding-top: 16px;">
      <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-go="shelf">표지 공유하기</button>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}

export { renderArchived as renderDetailRead };
