import { navigateTo } from '../app.js';

/**
 * 03 · 진행 중 책 — 두비가 끼워둔 한 페이지
 */
export function renderReading() {
  const section = document.createElement('section');
  section.className = 'screen screen--reading';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding: 12px 22px 16px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">Currently Open</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 14px;">
          지금 펼쳐 둔 책
        </h1>
        <p class="ed-caption" style="margin-top: 8px;">
          두비가 어제 한 페이지를 끼워 두었어요.
        </p>
      </header>

      <article class="ed-card reading-card">
        <div class="reading-card__head">
          <span class="ed-badge ed-badge--paper">FILM · APRIL 2025</span>
          <span class="ed-section-label" style="font-size: 9px;">PAGE 03 / 07</span>
        </div>

        <div class="link-tile">
          <span class="link-tile__thumb" style="--thumb:#15203F;" aria-hidden="true"></span>
          <div class="link-tile__body">
            <p class="link-tile__domain">youtube.com</p>
            <h2 class="link-tile__title">
              선형 대수학의 직관적 이해 — 3Blue1Brown
            </h2>
            <p class="ed-caption" style="text-align:left; font-size:12px; margin-top: 2px;">
              행렬 변환을 시각화로 풀어내는 짧은 강의.
            </p>
          </div>
        </div>

        <div class="reading-card__pair">
          <span class="pair-row">
            <span class="pair-avatars" aria-hidden="true">
              <span class="pair-avatar">두</span>
              <span class="pair-avatar pair-avatar--ink">야</span>
            </span>
            두비가 끼워둔 페이지
          </span>
          <span class="ed-section-label" style="font-size:9px;">23분 전</span>
        </div>
      </article>

      <article class="ed-card ed-card--quote" style="margin-top: 14px;">
        <p class="ed-section-label" style="font-size: 9px;">두비가 남긴 한 줄</p>
        <p class="ed-quote">
          “행렬은 결국 공간을 어떻게 비트는지에 대한 이야기였다.”
        </p>
      </article>

      <div style="margin-top: 18px;">
        <p class="ed-section-label" style="margin-bottom: 8px;">우리의 한 줄 반응</p>
        <div class="chip-row">
          <button class="chip" aria-pressed="true" type="button" data-go="reactions">
            <span class="chip__emoji">🔥</span>
            <span class="chip__count">2</span>
          </button>
          <button class="chip" aria-pressed="false" type="button" data-go="reactions">
            <span class="chip__emoji">💡</span>
            <span class="chip__count">1</span>
          </button>
          <button class="chip" aria-pressed="false" type="button" data-go="reactions">
            <span class="chip__emoji">🫶</span>
          </button>
          <button class="chip chip--add" aria-label="다른 이모지로 반응" type="button" data-go="reaction">
            <span class="chip__emoji">+</span>
          </button>
        </div>
      </div>
    </div>

    <footer class="ed-footer">
      <button class="ed-btn ed-btn--block" type="button" data-go="close-consent">이번 책 덮기</button>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
