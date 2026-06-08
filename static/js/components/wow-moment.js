/**
 * 07 · 와우 모먼트 — 한 권의 책이 책장에 꽂히는 순간
 */
export default {
  id: 'wow-moment',
  label: '와우 모먼트',
  group: 'cycle',
  scheme: 'light',

  render() {
    return /* html */ `
      <section class="screen screen--wow-moment">
        <header style="text-align:center; padding: 18px 28px 0;">
          <p class="ed-eyebrow">A New Volume</p>
          <h1 class="ed-title" style="margin-top: 14px;">
            THE<br/>PERSONAL<br/>CURATION
          </h1>
          <p class="ed-caption" style="margin-top: 14px;">
            4월의 책이 책장에 꽂혔어요.<br/>
            가장 두꺼운 한 권으로요.
          </p>
        </header>

        <div class="shelf-stage" aria-hidden="true" style="margin-top: 32px; padding-bottom: 22px;">
          <div class="shelf shelf--wow">
            <span class="spine spine--tall spine--xwide" style="--spine:#E2DCC5;">
              <span class="spine__label" style="color:rgba(27,22,18,0.55);">March</span>
            </span>
            <span class="spine spine--feature" style="--spine:#15203F;">
              <span class="spine__label">April</span>
            </span>
            <span class="spine spine--tall spine--xwide" style="--spine:#E2DCC5;">
              <span class="spine__label" style="color:rgba(27,22,18,0.55);">May</span>
            </span>
          </div>
          <div class="shelf-floor" style="margin-top: 4px;"></div>
        </div>

        <footer class="ed-footer" style="padding-top: 8px;">
          <div style="display:flex; gap: 8px; align-items:center; justify-content:center; flex-wrap:wrap;">
            <span class="ed-badge">NEW</span>
            <span class="ed-section-label">12 pages · 3 wow · 2 readers</span>
          </div>
          <button class="ed-btn ed-btn--block" type="button">책 표지 확인하기</button>
          <button class="ed-btn ed-btn--ghost ed-btn--block" type="button">서재로 돌아가기</button>
        </footer>
      </section>
    `;
  },
};
