/**
 * 04b · 공유 시트 (Instagram 등 호스트 위에서 Pairchive로 꽂기)
 */
export default {
  id: 'share-sheet',
  label: '공유 시트',
  group: 'cycle',
  scheme: 'dark',

  render() {
    return /* html */ `
      <section class="screen screen--share-sheet">
        <p class="share-host__app-label">Instagram에서 공유</p>

        <div class="share-host__body" aria-hidden="true"></div>

        <section class="sheet-card" aria-label="Pairchive에 꽂기">
          <span class="sheet-handle" aria-hidden="true"></span>

          <p class="ed-script" style="margin-top: 4px;">
            <em>Pairchive</em>에 꽂기
          </p>

          <article class="link-tile" style="background: var(--paper-soft);">
            <span class="link-tile__thumb" style="
                --thumb:#5C7F9E;
                background: linear-gradient(135deg, #6A8FB0, #3F5F84);
                width: 48px; height: 48px; border-radius: 10px;
              " aria-hidden="true"></span>
            <div class="link-tile__body">
              <p class="link-tile__title" style="font-size: 14px; font-weight: 600;">Studio Folder · 2026</p>
              <p class="link-tile__domain" style="text-transform: none; letter-spacing: 0; font-size: 12px;">instagram.com</p>
            </div>
          </article>

          <div class="ed-field">
            <label class="ed-field-label" for="share-memo">왜 공유했어? (선택)</label>
            <input id="share-memo" class="ed-input" type="text" placeholder="“여기 레퍼런스 진짜 좋다…”" aria-label="공유한 이유" />
          </div>

          <div class="ed-field">
            <p class="ed-field-label" id="picker-label">어느 서재에 꽂을까요?</p>
            <div class="chip-row" role="radiogroup" aria-labelledby="picker-label">
              <button type="button" class="chip chip--green" aria-pressed="true">예지 × 신비</button>
              <button type="button" class="chip chip--green" aria-pressed="false">민지</button>
              <button type="button" class="chip chip--green" aria-pressed="false">도현</button>
            </div>
          </div>

          <button type="button" class="ed-btn ed-btn--green ed-btn--block" style="margin-top: 4px;">
            우리 서재에 꽂기
          </button>
        </section>
      </section>
    `;
  },
};
