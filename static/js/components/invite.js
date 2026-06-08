/**
 * 09 · 페어 초대 (받는 쪽) — 외부 메신저에서 받은 링크 웹 프리뷰
 */
export default {
  id: 'invite',
  label: '페어 초대 (웹)',
  group: 'extra',
  scheme: 'light',

  render() {
    return /* html */ `
      <section class="screen screen--invite">
        <div class="web-chrome" role="region" aria-label="Safari 주소창">
          <span aria-hidden="true" style="opacity:0.5;">‹</span>
          <span class="web-chrome__pill">pairchive.app/invite/duvi-yaji</span>
          <span aria-hidden="true" style="opacity:0.5;">⋯</span>
        </div>

        <div class="ed-page" style="padding: 26px 26px 16px;">
          <header style="text-align:center;">
            <p class="ed-eyebrow">Personal Curation</p>
            <h1 class="ed-title ed-title--sm" style="margin-top: 14px;">
              두비가<br/>책장을 함께 쓰자고<br/>보냈어요.
            </h1>
            <p class="ed-caption" style="margin-top: 14px;">
              둘만의 책장이 한 권의 책처럼 쌓여요.<br/>
              메신저를 떠나지 않고 페어카이브에서 정리해요.
            </p>
          </header>

          <article class="invite-preview">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span class="ed-section-label">두비의 미리 보기</span>
              <span class="ed-badge ed-badge--paper">PREVIEW</span>
            </div>

            <div class="shelf" style="min-height: 130px; margin-top: 14px; gap: 1px;">
              <span class="spine spine--short" style="--spine:#D08A6F;"><span class="spine__label">Essay</span></span>
              <span class="spine spine--short" style="--spine:#A04F4A;"><span class="spine__label">Travel</span></span>
              <span class="spine spine--short" style="--spine:#15203F;"><span class="spine__label">Design</span></span>
              <span class="spine spine--short spine--paper"><span class="spine__label">Notes</span></span>
              <span class="spine spine--short" style="--spine:#B82A2F;"><span class="spine__label">Film</span></span>
              <span class="spine spine--short" style="--spine:#5D442B;"><span class="spine__label">Music</span></span>
            </div>
            <div class="shelf-floor"></div>

            <div class="pair-row" style="margin-top: 12px; justify-content:center;">
              <span class="pair-avatars" aria-hidden="true">
                <span class="pair-avatar">두</span>
              </span>
              두비가 만든 책장 · 7권
            </div>
          </article>

          <article class="invite-app-tile" style="margin-top: 18px;">
            <span class="invite-app-mark" aria-hidden="true">P</span>
            <div class="link-tile__body">
              <p class="link-tile__title" style="font-size: 14px;">Pairchive — 둘만의 책장</p>
              <p class="link-tile__domain">App Store · 무료</p>
            </div>
            <span class="ed-list__chev" aria-hidden="true">›</span>
          </article>
        </div>

        <footer class="ed-footer">
          <button class="ed-btn ed-btn--block" type="button">앱 받고 함께 시작하기</button>
          <button class="ed-btn ed-btn--ghost ed-btn--block" type="button">웹에서 미리 둘러보기</button>
          <p class="ed-caption" style="font-size:11px; letter-spacing:0.16em; text-transform: uppercase; color: var(--ink-mute);">
            이미 앱이 있어요?  →  앱에서 열기
          </p>
        </footer>
      </section>
    `;
  },
};
