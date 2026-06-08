import { navigateTo } from '../app.js';

/**
 * 05 · 이모티콘 칩 (풀스크린 burst) — Tapback 스타일 한 줄 반응
 */
export function renderReactions() {
  const section = document.createElement('section');
  section.className = 'screen screen--reactions';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding: 12px 22px 16px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">A Single Line</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">
          이 한 줄에<br/>어떻게 반응할래?
        </h1>
      </header>

      <article class="ed-card ed-card--quote" style="margin-top: 22px;">
        <p class="ed-section-label" style="font-size: 9px;">선형 대수학의 직관적 이해 · 03:12</p>
        <p class="ed-quote">
          “행렬은 결국 공간을 어떻게 비트는지에 대한 이야기였다.”
        </p>
        <p class="ed-caption" style="text-align:left; font-size:12px;">— 두비가 끼워둔 페이지에서</p>
      </article>

      <p class="ed-section-label" style="margin: 26px 0 6px; text-align:center;">고를 수 있는 한 마디</p>
      <div class="chip-burst" aria-label="이모티콘 반응 선택">
        <button class="chip" aria-pressed="false" aria-label="🔥 인상 깊어요" type="button">
          <span class="chip__emoji">🔥</span>
        </button>
        <button class="chip" aria-pressed="true" aria-label="💡 아이디어가 떠올랐어요" type="button">
          <span class="chip__emoji">💡</span>
        </button>
        <button class="chip" aria-pressed="false" aria-label="🫶 마음에 들었어요" type="button">
          <span class="chip__emoji">🫶</span>
        </button>
        <button class="chip" aria-pressed="false" aria-label="😮 와우" type="button">
          <span class="chip__emoji">😮</span>
        </button>
        <button class="chip" aria-pressed="false" aria-label="🔖 북마크" type="button">
          <span class="chip__emoji">🔖</span>
        </button>
        <button class="chip chip--add" aria-label="다른 이모지 추가" type="button">
          <span class="chip__emoji">+</span>
        </button>
      </div>

      <div style="margin-top: 14px; display:flex; flex-direction:column; gap:10px;">
        <p class="ed-section-label" style="text-align:center;">두비는 이렇게 반응했어요</p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <span class="chip" aria-disabled="true" style="background: var(--paper); cursor:default;">
            <span class="chip__emoji">🔥</span>
            <span class="chip__count">두비</span>
          </span>
          <span class="chip" aria-disabled="true" style="background: var(--paper); cursor:default;">
            <span class="chip__emoji">🫶</span>
            <span class="chip__count">두비</span>
          </span>
        </div>
      </div>
    </div>

    <footer class="ed-footer">
      <button class="ed-btn ed-btn--block" type="button" data-go="reading">한 줄 남기기</button>
      <p class="ed-caption" style="font-size:12px; margin-top: 2px;">
        한 마디 더 적고 싶다면 길게 눌러서 코멘트.
      </p>
    </footer>
  `;

  section.querySelectorAll('.chip-burst .chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
      btn.setAttribute('aria-pressed', next);
    });
  });
  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
