import { navigateTo } from '../app.js';

/**
 * 08 · 리포트 카드 — 이번 책의 요약
 */
export function renderReport() {
  const section = document.createElement('section');
  section.className = 'screen screen--report';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding: 12px 22px 16px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">April Report</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">
          두비 · 야지<br/>4월의 페이지
        </h1>
      </header>

      <section class="stat-grid" style="margin-top: 22px;">
        <div class="stat-cell">
          <span class="stat-cell__num">12</span>
          <span class="stat-cell__label">Pages</span>
        </div>
        <div class="stat-cell stat-cell--accent">
          <span class="stat-cell__num">3</span>
          <span class="stat-cell__label">Wow Moments</span>
        </div>
        <div class="stat-cell">
          <span class="stat-cell__num">7</span>
          <span class="stat-cell__label">Reactions</span>
        </div>
        <div class="stat-cell">
          <span class="stat-cell__num">1</span>
          <span class="stat-cell__label">Closed Book</span>
        </div>
      </section>

      <div style="margin-top: 22px;">
        <p class="ed-section-label">가장 많이 끼워둔 칸</p>
        <div class="chip-row" style="margin-top: 8px;">
          <span class="chip" style="cursor:default;">Film <span class="chip__count">5</span></span>
          <span class="chip" style="cursor:default;">Design <span class="chip__count">4</span></span>
          <span class="chip" style="cursor:default;">Essay <span class="chip__count">3</span></span>
        </div>
      </div>

      <article class="ed-card ed-card--quote" style="margin-top: 22px;">
        <p class="ed-section-label" style="font-size: 9px;">이달의 와우 모먼트</p>
        <p class="ed-quote">
          “행렬은 결국 공간을<br/>어떻게 비트는지에 대한 이야기였다.”
        </p>
        <p class="ed-caption" style="text-align:left; font-size:12px;">두비 · 04. 18.</p>
      </article>

      <div class="pair-row report-pair">
        <span class="pair-avatars" aria-hidden="true">
          <span class="pair-avatar">두</span>
          <span class="pair-avatar pair-avatar--ink">야</span>
        </span>
        두비 · 야지 · 2025.04
      </div>
    </div>

    <footer class="ed-footer">
      <button class="ed-btn ed-btn--block" type="button" data-go="detail-read">간직된 책 보기</button>
      <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-go="shelf">5월의 책 시작하기</button>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
