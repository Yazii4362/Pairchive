import { navigateTo } from '../app.js';

/**
 * 06b · 책 덮기 합의 — 둘 다 동의해야 책이 닫혀요
 */
export function renderCloseConsent() {
  const section = document.createElement('section');
  section.className = 'screen screen--close-consent';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding: 4px 24px 0;">
      <header style="text-align: center; margin-top: 8px;">
        <p class="ed-script ed-script--meta">예지 × 신비 · 2026.05</p>
      </header>

      <div class="cover-stage" style="padding: 22px 16px 8px;">
        <article class="cover cover--rose cover--sm" aria-label="서로의 세계, Vol. 03">
          <div class="cover__plate">
            <p class="cover__meta-line">2026 · MAY</p>
            <div class="cover__plate-art" aria-hidden="true">
              <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect x="10" y="14" width="40" height="52" rx="1" stroke="rgba(245,229,211,0.55)" stroke-width="0.7"/>
                <rect x="14" y="18" width="32" height="44" rx="0.5" stroke="rgba(245,229,211,0.32)" stroke-width="0.6"/>
              </svg>
            </div>
            <p class="cover__meta-title" style="font-style: italic;">
              서로의<br/>세계
            </p>
            <p class="cover__meta-line" style="margin-top: 6px;">VOL. 03</p>
          </div>
        </article>
      </div>

      <header style="text-align: center; margin-top: 6px;">
        <h1 class="ed-title ed-title--sm" style="font-weight: 400;">
          이번 달 책을<br/>
          <strong style="font-weight: 600;">함께 간직할까요?</strong>
        </h1>
      </header>

      <div class="consent-pair" style="margin-top: 24px;" aria-label="두 사람의 합의 상태">
        <div class="consent-person">
          <div class="consent-circle consent-circle--agreed" aria-label="예지가 동의함">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5 10 17 19 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="consent-name">예지</p>
          <p class="consent-status">마음을 모았어요</p>
        </div>
        <div class="consent-person">
          <div class="consent-circle consent-circle--waiting" aria-label="신비는 아직 응답 대기 중"></div>
          <p class="consent-name">신비</p>
          <p class="consent-status">기다리는 중</p>
        </div>
      </div>
    </div>

    <footer class="ed-footer" style="margin-top: auto;">
      <button type="button" class="ed-btn ed-btn--green ed-btn--block" data-go="close-book">간직하기</button>
      <p class="ed-caption" style="font-size: 12px; color: var(--ink-mute);">
        두 사람이 모두 동의해야 책이 닫혀요
      </p>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
