/**
 * 06 · 책 덮기 — 깊은 잉크 톤, 한 권을 책장으로 보내는 마지막 의식
 */
export default {
  id: 'close-book',
  label: '책 덮기',
  group: 'cycle',
  scheme: 'dark',

  render() {
    return /* html */ `
      <section class="screen screen--close-book">
        <header style="text-align:center; padding: 14px 28px 0;">
          <p class="ed-eyebrow">Closing the Book</p>
        </header>

        <div class="cover-stage">
          <article class="cover" aria-label="책 표지: Personal Curation, Film Archive, April 2025">
            <div class="cover__plate">
              <p class="cover__meta-line">Film Archive</p>
              <div class="cover__plate-art" aria-hidden="true">
                <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <ellipse cx="40" cy="35" rx="14" ry="16" fill="rgba(237,230,214,0.18)"/>
                  <path d="M22 60 Q40 50 58 60 L60 92 Q40 100 20 92 Z" fill="rgba(237,230,214,0.18)"/>
                  <path d="M18 92 Q40 84 62 92 L64 110 L16 110 Z" fill="rgba(237,230,214,0.10)"/>
                </svg>
              </div>
              <p class="cover__meta-title">Personal<br/>Curation</p>
              <p class="cover__meta-line" style="margin-top:6px;">April 2025 · 두비 · 야지</p>
            </div>
          </article>
        </div>

        <section style="padding: 0 28px;">
          <p class="ed-caption close-caption">
            이번 책에는 12개의 페이지,<br/>3개의 와우 모먼트가 끼워졌어요.
          </p>

          <article class="close-final">
            <p class="ed-section-label" style="color: rgba(242,239,231,0.5);">우리 둘이 남긴 마지막 한 줄</p>
            <p class="close-final__line">
              “행렬은 결국 공간을 비트는 이야기.<br/>다음 책은 색에 대해 다뤄볼까?”
            </p>
            <p class="close-final__sig">야지 · 2025.04.30</p>
          </article>
        </section>

        <footer class="ed-footer">
          <button class="ed-btn ed-btn--block" type="button" style="background:#F2EFE7; color: var(--navy-ink);">
            CLOSE — 책 덮기
          </button>
          <p class="ed-caption" style="color: rgba(242,239,231,0.45); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
            눌러서 책장으로 보내기
          </p>
        </footer>
      </section>
    `;
  },
};
