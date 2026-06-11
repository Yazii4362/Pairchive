import { navigateTo } from '../app.js';

/**
 * 15 · 책 설정 — 정보 수정 / 멤버 / 책에서 나가기
 * - flow: ⑩ (숨은 와이어프레임 3번)
 * - 둘 다 모든 정보 수정 가능 (페어 컨셉)
 * - 책에서 나가기 → 종료 처리 + 자동 복사 사이드 이펙트 명시
 */
export function renderBookSettings() {
  const section = document.createElement('section');
  section.className = 'screen screen--book-settings';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="bs-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="reading">‹ 책</button>
      <span class="ed-section-label" style="font-size:9px;">Book · Settings</span>
      <span style="width: 36px;"></span>
    </header>

    <div class="ed-page" style="padding: 12px 20px 24px;">
      <!-- Cover plate -->
      <article class="bs-cover">
        <div class="bs-cover__plate" aria-hidden="true">
          <span class="ed-section-label" style="color: rgba(255,255,255,0.7); font-size: 9px;">PAIR · DESIGN</span>
          <h2 class="bs-cover__title">두비와의<br/>디자인 책</h2>
          <p class="bs-cover__meta">D-7 · 24개 링크</p>
        </div>
      </article>

      <!-- ── 정보 (둘 다 수정 가능) ────────────────────────────── -->
      <p class="ed-section-label bs-group-label">정보 (둘 다 수정 가능)</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button">
          책 이름<span class="ed-list__chev">두비와의 디자인 책 ›</span>
        </button>
        <button class="ed-list__item" type="button">
          카테고리<span class="ed-list__chev">디자인 ›</span>
        </button>
        <button class="ed-list__item" type="button">
          종료 날짜<span class="ed-list__chev">2025.06.07 · D-7 ›</span>
        </button>
        <button class="ed-list__item" type="button">
          알림<span class="ed-list__chev">기본 · D-3 켜짐 ›</span>
        </button>
      </div>

      <!-- ── 멤버 ────────────────────────────────────────────── -->
      <p class="ed-section-label bs-group-label">멤버</p>
      <div class="ed-list">
        <article class="ed-list__item bs-member">
          <span class="bs-member__avatar bs-member__avatar--owner" aria-hidden="true">두</span>
          <span class="bs-member__body">
            <span class="bs-member__name">두비</span>
            <span class="bs-member__meta">방장 · 4일 전 가장 활발</span>
          </span>
          <span class="ed-list__chev">›</span>
        </article>
        <article class="ed-list__item bs-member">
          <span class="bs-member__avatar" aria-hidden="true">야</span>
          <span class="bs-member__body">
            <span class="bs-member__name">야지 (나)</span>
            <span class="bs-member__meta">멤버 · 12개 링크 기여</span>
          </span>
          <span class="ed-list__chev">›</span>
        </article>
      </div>

      <!-- ── 종료 / 탈퇴 ──────────────────────────────────────── -->
      <p class="ed-section-label bs-group-label">책 닫기</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button" data-go="close-consent">
          이 책을 지금 덮기<span class="ed-list__chev">›</span>
        </button>
        <button class="ed-list__item ed-list__item--destructive" type="button" data-action="leave">
          이 책에서 나가기<span class="ed-list__chev" style="color: var(--rose-ink);">›</span>
        </button>
      </div>
      <p class="ed-caption" style="margin: 10px 4px 0; font-size: 12px; color: var(--ink-mute); line-height: 1.5;">
        헤어져도 각자의 책으로 남아요.<br/>
        나가면 그 시점까지 쌓인 링크가 자동으로 종료 처리되어<br/>
        <strong style="color: var(--ink);">두 사람 모두의 책장에 복사본</strong>으로 안전하게 간직돼요.
      </p>
    </div>

    <!-- ── Leave-book confirm modal ─────────────────────────── -->
    <div class="bs-modal" id="bs-modal" hidden role="dialog" aria-modal="true" aria-labelledby="bs-modal-title">
      <div class="bs-modal__veil" data-modal-close></div>
      <article class="bs-modal__panel">
        <span class="ed-section-label" style="text-align:center;">CONFIRM · LEAVE</span>
        <h3 id="bs-modal-title" class="bs-modal__title">이 책에서 정말 나가실래요?</h3>
        <p class="bs-modal__body">
          나가는 순간 책은 <strong>아름답게 종료</strong>되고,<br/>
          24개의 링크가 두 사람 각자의 책장으로<br/>
          한 권씩 자동 복사돼요.<br/><br/>
          헤어져도 각자의 책으로 남아요.
        </p>
        <div class="bs-modal__actions">
          <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-modal-close>아직 머무를래요</button>
          <button class="ed-btn ed-btn--destructive ed-btn--block" type="button" data-go="close-book">
            그래도 나갈래요
          </button>
        </div>
      </article>
    </div>
  `;

  // Open / close modal
  const modal = section.querySelector('#bs-modal');
  section.querySelector('[data-action="leave"]').addEventListener('click', () => {
    modal.hidden = false;
    modal.dataset.open = 'true';
  });
  section.querySelectorAll('[data-modal-close]').forEach((el) =>
    el.addEventListener('click', () => {
      modal.removeAttribute('data-open');
      setTimeout(() => (modal.hidden = true), 180);
    })
  );

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
