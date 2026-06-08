import { navigateTo } from '../app.js';

/**
 * 04c · Save to book — 어느 책에 끼울지 미니 책 카드로 고르기
 */
export function renderSaveSheet() {
  const section = document.createElement('section');
  section.className = 'screen screen--save-sheet';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding: 16px 24px 16px;">
      <h1 class="save-headline" style="text-align:left;">Save to book</h1>

      <article class="link-tile" style="margin-top: 14px; padding: 10px;">
        <span class="link-tile__thumb" style="
            --thumb:#7E6F9E;
            background: linear-gradient(135deg, #9586BC, #5E4F8B);
            width: 44px; height: 44px; border-radius: 8px;
          " aria-hidden="true"></span>
        <div class="link-tile__body">
          <p class="link-tile__title" style="font-size: 13px;">
            Color Grading — Bringing Mood Into Film
          </p>
          <p class="link-tile__domain" style="text-transform:none; letter-spacing:0.02em; font-size: 11px;">
            ↗ youtube.com
          </p>
        </div>
      </article>

      <p class="ed-track-label" style="margin: 22px 0 10px;">Select book</p>
      <div class="book-cards" role="radiogroup" aria-label="저장할 책 선택">
        <button class="book-card" type="button" aria-pressed="true">
          <span class="book-card__spine-edge" style="--spine: rgba(242,239,231,0.55);" aria-hidden="true"></span>
          <span class="book-card__name">Reading</span>
        </button>
        <button class="book-card" type="button" aria-pressed="false">
          <span class="book-card__spine-edge" style="--spine: #D89AAE;" aria-hidden="true"></span>
          <span class="book-card__name">Inspo</span>
        </button>
        <button class="book-card" type="button" aria-pressed="false">
          <span class="book-card__spine-edge" style="--spine: #2A4A35;" aria-hidden="true"></span>
          <span class="book-card__name">Film</span>
        </button>
        <button class="book-card book-card--add" type="button" aria-label="새 책 만들기">
          <span class="book-card__name">New</span>
        </button>
      </div>

      <p class="ed-track-label" style="margin: 22px 0 8px;">Note</p>
      <input class="ed-input" type="text" placeholder="떠오른 생각을 남겨주세요" aria-label="저장할 때 남길 메모" />
    </div>

    <footer class="ed-footer">
      <button type="button" class="ed-btn ed-btn--block" style="letter-spacing: 0.32em;" data-go="reading">
        STASH&nbsp;IT
      </button>
    </footer>
  `;

  section.querySelectorAll('.book-card').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      section.querySelectorAll('.book-card').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });
  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
