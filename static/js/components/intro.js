import { navigateTo } from '../app.js';

/**
 * INTRO · 스플래시 — THE PERSONAL CURATION + 책장 미리보기
 * 사용자가 index.html에 적어둔 첫 진입 UI를 컴포넌트로 분리.
 */
export function renderIntro() {
  const section = document.createElement('section');
  section.className = 'screen screen--intro';
  section.innerHTML = /* html */ `
    <div class="intro-stage">
      <header class="intro-head">
        <p class="intro-eyebrow">The Personal Curation</p>
        <h1 class="intro-title">
          <span>THE PERSONAL</span>
          <span class="intro-title__sub">CURATION</span>
        </h1>
        <p class="intro-sub">둘만의 시선으로 쌓아 올린 아카이브</p>
      </header>

      <nav class="intro-cta">
        <button type="button" id="btn-enter" class="btn-next-flow">
          시작하기 <span aria-hidden="true">→</span>
        </button>
      </nav>

      <div class="bookshelf-stage" aria-hidden="true">
        <div class="bookshelf-line">
          <div class="book-spine book-green"        style="--book-height: 140px; --book-width: 14px;"></div>
          <div class="book-spine book-orange-text"  style="--book-height: 165px; --book-width: 24px;">
            <span class="spine-text vertical">PAIRCHIVE</span>
          </div>
          <div class="book-spine book-dark"         style="--book-height: 160px; --book-width: 12px;">
            <span class="spine-text vertical small">2026.06</span>
          </div>
          <div class="book-spine book-pink"         style="--book-height: 180px; --book-width: 26px;">
            <span class="spine-text vertical">in Paris</span>
          </div>
          <div class="book-spine book-light-pink"   style="--book-height: 172px; --book-width: 16px;">
            <span class="spine-text vertical">Acne Studios</span>
          </div>

          <div class="book-cover-main" style="--book-height: 198px; --book-width: 110px;">
            <div class="cover-inner">
              <div class="cover-photo">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop"
                  alt="Curation Art"
                  loading="lazy"
                />
                <span class="cover-photo__veil" aria-hidden="true"></span>
              </div>
              <span class="cover-mini-text">VOLUME 01</span>
            </div>
          </div>

          <div class="book-spine book-red"          style="--book-height: 182px; --book-width: 16px;">
            <span class="spine-text vertical">The Monocle Guide</span>
          </div>
          <div class="book-spine book-blue"         style="--book-height: 175px; --book-width: 22px;">
            <span class="spine-text vertical">Interior Design</span>
          </div>
          <div class="book-spine book-white"        style="--book-height: 188px; --book-width: 30px;">
            <span class="spine-text vertical bold">S,M,L,XL</span>
          </div>
          <div class="book-spine book-yellow"       style="--book-height: 162px; --book-width: 16px;">
            <span class="spine-text vertical dark-text">David Hockney</span>
          </div>
          <div class="book-spine book-brown"        style="--book-height: 150px; --book-width: 18px;"></div>
        </div>
        <div class="bookshelf-floor"></div>
      </div>
    </div>
  `;

  section.querySelector('#btn-enter').addEventListener('click', () => navigateTo('onboarding'));
  return section;
}
