import { navigateTo } from '../app.js';

/**
 * 17-A · 에지 케이스 ① — 수락 전 링크 추가 시도 차단
 * - 룰: 초대 수락 전에는 책 내부에 진입 불가.
 *       링크 추가 버튼 자체가 비활성화돼야 하고, 실수로 누르면 이 안내가 뜬다.
 */
export function renderEdgeBlocked() {
  const section = document.createElement('section');
  section.className = 'screen screen--edge';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="edge-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="pair-hub">‹ 페어</button>
      <span class="ed-section-label" style="font-size:9px;">Edge · Locked</span>
      <span style="width: 36px;"></span>
    </header>

    <div class="ed-page" style="padding: 14px 22px 22px; text-align:center;">
      <p class="ed-eyebrow">Awaiting · 수락 대기</p>
      <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">
        아직 책을<br/>열어볼 수 없어요
      </h1>

      <article class="ed-card edge-card" style="margin-top: 26px;">
        <span class="edge-card__seal" aria-hidden="true">🔒</span>
        <p class="edge-card__title">두비 님의 초대를 수락해야</p>
        <p class="edge-card__body">
          이 책의 안으로 들어갈 수 있어요.<br/>
          수락 전엔 링크를 추가하거나 코멘트를 남길 수 없습니다.<br/>
          <span style="color: var(--ink-mute);">초대장은 페어 탭에서 다시 열어볼 수 있어요.</span>
        </p>
      </article>

      <div class="edge-actions">
        <button class="ed-btn ed-btn--block" type="button" data-go="pair-hub">초대 수락하러 가기</button>
        <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-go="shelf">나중에 할게요</button>
      </div>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}

/**
 * 17-B · 에지 케이스 ② — 종료된 책에 새 링크 추가 시도
 * - 룰: 종료된 책은 읽기 전용. 링크 추가 시도 시 "새 책 이어 만들기" 유도 모달.
 */
export function renderEdgeReopen() {
  const section = document.createElement('section');
  section.className = 'screen screen--edge';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="edge-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="archived">‹ 간직된 책</button>
      <span class="ed-section-label" style="font-size:9px;">Edge · Sealed</span>
      <span style="width: 36px;"></span>
    </header>

    <div class="ed-page" style="padding: 14px 22px 22px; text-align:center;">
      <p class="ed-eyebrow">Sealed · 간직된 책</p>
      <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">
        이 책은 아름답게<br/>완성되었습니다
      </h1>

      <article class="ed-card edge-card" style="margin-top: 26px;">
        <span class="edge-card__seal edge-card__seal--wax" aria-hidden="true">✦</span>
        <p class="edge-card__title">두비 님과 새로운 맛의 책을<br/>한 권 더 묶어볼까요?</p>
        <p class="edge-card__body">
          간직된 책엔 더 이상 링크를 끼울 수 없어요.<br/>
          대신 새 책을 이어서 만들면 흐름이 자연스럽게 이어집니다.<br/>
          <span style="color: var(--ink-mute);">이전 책의 카테고리·태그를 그대로 가져올 수 있어요.</span>
        </p>
      </article>

      <div class="edge-actions">
        <button class="ed-btn ed-btn--block" type="button" data-go="empty-shelf">＋ 새 책 이어 만들기</button>
        <button class="ed-btn ed-btn--ghost ed-btn--block" type="button" data-go="archived">간직된 책으로 돌아가기</button>
      </div>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
