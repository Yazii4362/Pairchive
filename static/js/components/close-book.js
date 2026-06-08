import { navigateTo } from '../app.js';

/**
 * 06 · 책 덮기 — 종이톤 배경, 가운데 네이비 책 한 권 + 하단 "· CLOSE ·"
 * 시안 기반 미니멀 디자인.
 */
export function renderCloseBook() {
  const section = document.createElement('section');
  section.className = 'screen screen--close-book';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="close-stage">
      <article class="cover cover--close" aria-label="책 표지: Personal Curation, Film Archive, April 2025">
        <div class="cover__plate">
          <div class="cover__plate-art" aria-hidden="true">
            <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" fill="none">
              <defs>
                <radialGradient id="close-figure-glow" cx="50%" cy="38%" r="55%">
                  <stop offset="0%"  stop-color="rgba(237,230,214,0.40)"/>
                  <stop offset="100%" stop-color="rgba(237,230,214,0)"/>
                </radialGradient>
              </defs>
              <rect width="80" height="110" fill="url(#close-figure-glow)" opacity="0.55"/>
              <ellipse cx="40" cy="28" rx="8" ry="10" fill="rgba(237,230,214,0.40)"/>
              <path d="M28 42 Q22 56 27 72 L27 90 L53 90 L53 72 Q58 56 52 42 Q40 38 28 42 Z"
                    fill="rgba(237,230,214,0.36)"/>
              <ellipse cx="40" cy="74" rx="14" ry="6.5" fill="rgba(237,230,214,0.30)"/>
              <path d="M26 64 Q40 56 54 64" stroke="rgba(237,230,214,0.42)" stroke-width="1.2" stroke-linecap="round"/>
              <rect x="12" y="92" width="56" height="14" fill="rgba(237,230,214,0.12)"/>
            </svg>
          </div>
          <p class="cover__meta-line cover__meta-line--top">FILM&nbsp;ARCHIVE</p>
          <p class="cover__meta-line cover__meta-line--bot">APRIL 2025</p>
        </div>
      </article>

      <button type="button" class="close-trigger" data-go="wow-moment" aria-label="이번 책을 책장으로 보내기">
        <span class="close-trigger__dot">·</span>
        <span class="close-trigger__label">CLOSE</span>
        <span class="close-trigger__dot">·</span>
      </button>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
