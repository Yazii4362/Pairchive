import { navigateTo } from '../app.js';

/**
 * 16 · 온보딩 코치마크 — 기본 책 1권이 꽂힌 채 Dim 가이드
 * - flow: ①
 * - 앱 설치 + 가입 직후 진입 화면.
 *   빈 서재가 아니라 "나만의 개인 책" 한 권이 기본으로 꽂혀 있고,
 *   화면 전체에 Dim 오버레이 + 3단계 가이드 토글이 떠 핵심 기능을 학습시킨다.
 */
export function renderCoachmark() {
  const section = document.createElement('section');
  section.className = 'screen screen--coachmark';
  section.dataset.scheme = 'light';

  section.innerHTML = /* html */ `
    <!-- 1) 기본 책 1권 꽂힌 서재(가짜 home) -->
    <div class="ed-page" style="padding: 16px 22px 0;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">Welcome · 처음의 책장</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">야지의 서재</h1>
      </header>

      <div class="shelf-stage" aria-hidden="true" style="margin-top: 22px;">
        <div class="shelf shelf--main">
          <span class="spine spine--tall" style="--spine:#2DB854;" data-coach-target="book">
            <span class="spine__label">나의 첫 책</span>
          </span>
          <div class="shelf-new-book" data-coach-target="add" aria-label="새 책 만들기">
            <span class="shelf-new-book__label">＋</span>
          </div>
          <span class="spine spine--empty spine--xshort"><span class="spine__label">···</span></span>
          <span class="spine spine--empty spine--xshort"><span class="spine__label">···</span></span>
        </div>
        <div class="shelf-floor"></div>
      </div>

      <p class="ed-caption" style="margin: 22px 0 0; text-align:center;">
        Pair · Pear · Archive
      </p>
    </div>

    <!-- 2) Dim coachmark overlay -->
    <div class="coach" id="coach" data-step="1" role="dialog"
         aria-modal="true" aria-labelledby="coach-title">
      <div class="coach__dim" aria-hidden="true"></div>

      <article class="coach__step is-active" data-step="1">
        <span class="coach__index">1 / 3</span>
        <h2 class="coach__title" id="coach-title">이 책은 당신만의 아카이빙 공간이에요</h2>
        <p class="coach__body">
          앱을 설치하면 책 한 권이 기본으로 꽂혀 있어요.<br/>
          여기에 링크를 모아 나만의 취향을 채워보세요.
        </p>
        <div class="coach__actions">
          <button class="ed-btn ed-btn--ghost ed-btn--compact" type="button" data-coach="skip">건너뛰기</button>
          <button class="ed-btn ed-btn--compact" type="button" data-coach="next">다음</button>
        </div>
      </article>

      <article class="coach__step" data-step="2">
        <span class="coach__index">2 / 3</span>
        <h2 class="coach__title">＋ 버튼으로 새 책을 만들어요</h2>
        <p class="coach__body">
          카테고리 = 책 한 권이에요.<br/>
          혼자 보는 책이든, 누군가와 함께 쓰는 책이든 자유롭게 시작하세요.
        </p>
        <div class="coach__actions">
          <button class="ed-btn ed-btn--ghost ed-btn--compact" type="button" data-coach="back">이전</button>
          <button class="ed-btn ed-btn--compact" type="button" data-coach="next">다음</button>
        </div>
      </article>

      <article class="coach__step" data-step="3">
        <span class="coach__index">3 / 3</span>
        <h2 class="coach__title">짝꿁에게 초대장을 보내볼까요</h2>
        <p class="coach__body">
          페어 탭에서 초대장을 보내고, 함께 한 권의 책을 채워가세요.<br/>
          <strong>배처럼 달콤하고 슴슴한 우리만의 기록, Pairchive 를 시작해 보세요.</strong>
        </p>
        <div class="coach__actions">
          <button class="ed-btn ed-btn--ghost ed-btn--compact" type="button" data-coach="back">이전</button>
          <button class="ed-btn ed-btn--compact" type="button" data-coach="finish">시작하기</button>
        </div>
      </article>
    </div>
  `;

  // ── State machine for the 3-step coachmark ───────────────────────
  const coach = section.querySelector('#coach');
  const steps = coach.querySelectorAll('.coach__step');
  const targets = section.querySelectorAll('[data-coach-target]');

  function highlight(stepNum) {
    targets.forEach((t) => t.classList.remove('is-spotlit'));
    if (stepNum === 1) section.querySelector('[data-coach-target="book"]')?.classList.add('is-spotlit');
    if (stepNum === 2) section.querySelector('[data-coach-target="add"]')?.classList.add('is-spotlit');
  }

  function go(n) {
    const total = steps.length;
    const next = Math.min(Math.max(n, 1), total);
    steps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === next));
    coach.dataset.step = String(next);
    highlight(next);
  }
  highlight(1);

  coach.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-coach]');
    if (!btn) return;
    const action = btn.dataset.coach;
    const cur = Number(coach.dataset.step) || 1;
    if (action === 'next')   return go(cur + 1);
    if (action === 'back')   return go(cur - 1);
    if (action === 'skip')   return navigateTo('empty-shelf');
    if (action === 'finish') return navigateTo('shelf');
  });

  // Keyboard navigation between steps
  section.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(Number(coach.dataset.step) + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(Number(coach.dataset.step) - 1); }
    if (e.key === 'Escape')     navigateTo('empty-shelf');
  });

  return section;
}
