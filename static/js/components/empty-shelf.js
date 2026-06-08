/**
 * 01 · 빈 서재 (페어 모드 직후 / 첫 진입)
 * — 빈 서가에 "First Volume" 카드 하나만 가운데 강조
 */
export default {
  id: 'empty-shelf',
  label: '빈 서재',
  group: 'cycle',
  scheme: 'light',

  render() {
    return /* html */ `
      <section class="screen screen--empty-shelf">
        <div class="ed-page" style="padding-top: 8px;">
          <header style="text-align:center; padding: 18px 28px 0;">
            <p class="ed-eyebrow">The Personal Curation</p>
            <h1 class="ed-title" style="margin-top: 26px;">
              THE<br/>PERSONAL<br/>CURATION
            </h1>
            <p class="ed-caption" style="margin-top: 18px;">
              두비와 함께 시작할 첫 책을 꽂아 보세요.<br/>
              한 권의 결이 둘만의 흐름이 됩니다.
            </p>
            <div style="display:flex; justify-content:center; margin-top: 14px;">
              <span class="ed-badge ed-badge--paper">PAIR MODE · 두비 + 야지</span>
            </div>
          </header>

          <div class="shelf-stage" aria-hidden="true">
            <div class="shelf">
              <span class="spine spine--empty spine--xshort"><span class="spine__label">···</span></span>
              <span class="spine spine--empty spine--short"><span class="spine__label">···</span></span>
              <div class="shelf-new-book" aria-label="첫 책 자리">
                <span class="shelf-new-book__label">First&nbsp;Volume</span>
              </div>
              <span class="spine spine--empty spine--short"><span class="spine__label">···</span></span>
              <span class="spine spine--empty spine--xshort"><span class="spine__label">···</span></span>
            </div>
            <div class="shelf-floor"></div>
          </div>
        </div>

        <footer class="ed-footer">
          <button class="ed-btn ed-btn--block" type="button">첫 책 꽂기</button>
          <button class="ed-btn ed-btn--ghost ed-btn--block" type="button">한 사람 더 초대</button>
          <p class="ed-caption" style="font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute);">
            한 권이 한 달의 결이 됩니다
          </p>
        </footer>
      </section>
    `;
  },
};
