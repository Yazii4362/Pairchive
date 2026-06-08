import { navigateTo } from '../app.js';

/**
 * 12 · 설정 — 페어/책장/데이터/계정
 */
export function renderSettings() {
  const section = document.createElement('section');
  section.className = 'screen screen--settings';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="settings-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="shelf">‹ 책장</button>
      <span class="ed-section-label" style="font-size:9px;">Settings</span>
      <span style="width: 36px;"></span>
    </header>

    <div class="ed-page" style="padding: 14px 20px 18px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">Personal Curation</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">설정</h1>
      </header>

      <article class="ed-card settings-profile" style="margin-top: 22px;">
        <span class="settings-profile__avatar" aria-hidden="true">야</span>
        <div class="settings-profile__body">
          <p class="settings-profile__name">야지</p>
          <p class="ed-list__item-meta">@yaji · 두비와 페어 중</p>
        </div>
        <span class="ed-list__chev">›</span>
      </article>

      <p class="ed-section-label settings-group-label">페어</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button">페어 관리<span class="ed-list__chev">두비 ›</span></button>
        <button class="ed-list__item" type="button" data-go="invite-letter">초대 링크 다시 만들기<span class="ed-list__chev">›</span></button>
        <button class="ed-list__item" type="button">알림 (페이지 · 와우 · 책 덮기)<span class="ed-list__chev">켜짐 ›</span></button>
      </div>

      <p class="ed-section-label settings-group-label">책장</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button">현재 책 표지<span class="ed-list__chev">Film Archive ›</span></button>
        <button class="ed-list__item" type="button">카테고리 정리<span class="ed-list__chev">8칸 ›</span></button>
        <button class="ed-list__item" type="button" data-go="solo-empty">1인 모드로 전환<span class="ed-list__chev">›</span></button>
      </div>

      <p class="ed-section-label settings-group-label">데이터</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button">책 PDF로 내보내기<span class="ed-list__chev">›</span></button>
        <button class="ed-list__item" type="button">백업 · 동기화<span class="ed-list__chev">iCloud ›</span></button>
      </div>

      <p class="ed-section-label settings-group-label">계정</p>
      <div class="ed-list">
        <button class="ed-list__item" type="button">도움말<span class="ed-list__chev">›</span></button>
        <button class="ed-list__item ed-list__item--destructive" type="button">로그아웃<span class="ed-list__chev" style="color: var(--rose-ink);">›</span></button>
      </div>

      <p class="ed-caption" style="margin: 22px 0 0; font-size: 11px; color: var(--ink-mute);">
        Pairchive v0.4 · 우리 둘만의 책장
      </p>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
