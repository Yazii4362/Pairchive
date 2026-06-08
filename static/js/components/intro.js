import { navigateTo } from '../app.js';

/**
 * INTRO · 스플래시 — THE PERSONAL CURATION + 큰 책장
 * 시안 그대로: 별도 CTA 없이 책장(=메인 책 표지)을 탭하면 진입.
 */
export function renderIntro() {
  const section = document.createElement('section');
  section.className = 'screen screen--intro';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="intro-stage">
      <header class="intro-head">
        <h1 class="intro-title">
          <span>THE PERSONAL</span>
          <span class="intro-title__line2">CURATION</span>
        </h1>
      </header>

      <button
        type="button"
        class="bookshelf-stage"
        data-go="onboarding"
        aria-label="페어카이브 시작하기"
      >
        <div class="bookshelf-line" aria-hidden="true">
          <!-- 메인 책 왼쪽 -->
          <div class="book-spine book-white"        style="--book-height: 132px; --book-width: 12px;"></div>
          <div class="book-spine book-coral-soft"   style="--book-height: 150px; --book-width: 18px;">
            <span class="spine-text vertical small">PETOFOTV</span>
          </div>
          <div class="book-spine book-pink"         style="--book-height: 178px; --book-width: 30px;">
            <span class="spine-text vertical italic">in Paris</span>
          </div>
          <div class="book-spine book-light-pink"   style="--book-height: 172px; --book-width: 14px;">
            <span class="spine-text vertical">Acne Studios</span>
          </div>
          <div class="book-spine book-paper"        style="--book-height: 168px; --book-width: 18px;">
            <span class="spine-text vertical dark-text small">Vincent Van Dieren · Works 2006—2016</span>
          </div>
          <div class="book-spine book-dark-brown"   style="--book-height: 160px; --book-width: 12px;">
            <span class="spine-text vertical small">Damiani &amp; Lock</span>
          </div>
          <div class="book-spine book-tan"          style="--book-height: 156px; --book-width: 14px;">
            <span class="spine-text vertical small dark-text">Jeannouy</span>
          </div>

          <!-- 메인 책 표지 (네이비 + 누드 조각상 사진) -->
          <div class="book-cover-main" style="--book-height: 208px; --book-width: 112px;">
            <div class="cover-inner">
              <div class="cover-photo" aria-hidden="true">
                <svg class="cover-photo__svg" viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <defs>
                    <radialGradient id="cover-figure-glow" cx="50%" cy="38%" r="55%">
                      <stop offset="0%"  stop-color="rgba(237,230,214,0.45)"/>
                      <stop offset="100%" stop-color="rgba(237,230,214,0)"/>
                    </radialGradient>
                  </defs>
                  <rect width="80" height="110" fill="url(#cover-figure-glow)" opacity="0.55"/>
                  <!-- 머리 -->
                  <ellipse cx="40" cy="28" rx="8" ry="10" fill="rgba(237,230,214,0.40)"/>
                  <!-- 어깨에서 무릎까지 (구부린 자세) -->
                  <path d="M28 42 Q22 56 27 72 L27 90 L53 90 L53 72 Q58 56 52 42 Q40 38 28 42 Z"
                        fill="rgba(237,230,214,0.36)"/>
                  <!-- 무릎 — 튀어나온 둥근 부분 -->
                  <ellipse cx="40" cy="74" rx="14" ry="6.5" fill="rgba(237,230,214,0.30)"/>
                  <!-- 팔 (무릎 위에서 끌어안음) -->
                  <path d="M26 64 Q40 56 54 64" stroke="rgba(237,230,214,0.42)" stroke-width="1.2" stroke-linecap="round"/>
                  <!-- 받침 -->
                  <rect x="12" y="92" width="56" height="14" fill="rgba(237,230,214,0.12)"/>
                </svg>
                <span class="cover-photo__veil"></span>
              </div>
              <span class="cover-mini-text">
                <span class="cover-mini-text__top">PERSONAL</span>
                <span class="cover-mini-text__bot">CURATION</span>
              </span>
            </div>
          </div>

          <!-- 메인 책 오른쪽 -->
          <div class="book-spine book-monocle"      style="--book-height: 182px; --book-width: 18px;">
            <span class="spine-text vertical">The Monocle Guide to Cosy Homes</span>
          </div>
          <div class="book-spine book-graphite"     style="--book-height: 176px; --book-width: 12px;">
            <span class="spine-text vertical small">The Interior Design Handbook</span>
          </div>
          <div class="book-spine book-white book-smlxl" style="--book-height: 188px; --book-width: 32px;">
            <span class="spine-text horizontal bold dark-text">S,M,L,XL</span>
          </div>
          <div class="book-spine book-yellow"       style="--book-height: 162px; --book-width: 16px;">
            <span class="spine-text vertical small dark-text">David Hockney</span>
          </div>
          <div class="book-spine book-brown"        style="--book-height: 150px; --book-width: 18px;">
            <span class="spine-text vertical small">Current</span>
          </div>
        </div>
        <div class="bookshelf-floor" aria-hidden="true"></div>
      </button>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
