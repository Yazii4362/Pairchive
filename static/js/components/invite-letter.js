import { navigateTo } from '../app.js';

/**
 * 09b · 페어 초대장 — 밀랍 봉인 봉투 + 꽃 톤 배경
 */
export function renderInviteLetter() {
  const section = document.createElement('section');
  section.className = 'screen screen--invite-letter';
  section.dataset.scheme = 'dark';
  section.innerHTML = /* html */ `
    <div class="envelope-blooms" aria-hidden="true">
      <span class="envelope-blooms__bloom envelope-blooms__bloom--top-left"></span>
      <span class="envelope-blooms__bloom envelope-blooms__bloom--top-right"></span>
      <span class="envelope-blooms__bloom envelope-blooms__bloom--mid-right"></span>
      <span class="envelope-blooms__bloom envelope-blooms__bloom--bottom-left"></span>
    </div>

    <header class="envelope-headline">
      <p class="envelope-headline__eyebrow">2026 · An Invitation</p>
      <p class="envelope-headline__line">
        신비님이 함께 쌓고 싶은<br/>
        한 권의 책에 담긴 마음을<br/>
        열어보세요.
      </p>
    </header>

    <div class="envelope-wrap">
      <button type="button" class="envelope" data-go="onboarding" aria-label="신비님이 보낸 초대장 열기">
        <svg viewBox="0 0 290 200" xmlns="http://www.w3.org/2000/svg" class="envelope__svg" aria-hidden="true">
          <defs>
            <linearGradient id="env-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stop-color="#E55834"/>
              <stop offset="55%" stop-color="#C9421E"/>
              <stop offset="100%" stop-color="#9F2D11"/>
            </linearGradient>
            <linearGradient id="env-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stop-color="#D44922"/>
              <stop offset="100%" stop-color="#A03012"/>
            </linearGradient>
            <linearGradient id="env-bottom" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"  stop-color="#E55834"/>
              <stop offset="100%" stop-color="#BB3A1B"/>
            </linearGradient>
          </defs>

          <rect x="2" y="2" width="286" height="196" rx="6" ry="6" fill="url(#env-body)"/>

          <polygon points="2,2 288,2 145,100" fill="url(#env-top)" opacity="0.85"/>
          <polygon points="2,198 288,198 145,100" fill="url(#env-bottom)" opacity="0.7"/>
          <polygon points="2,2 2,198 145,100" fill="#000" opacity="0.10"/>
          <polygon points="288,2 288,198 145,100" fill="#000" opacity="0.10"/>

          <line x1="2"   y1="2"   x2="145" y2="100" stroke="rgba(0,0,0,0.32)" stroke-width="0.7"/>
          <line x1="288" y1="2"   x2="145" y2="100" stroke="rgba(0,0,0,0.32)" stroke-width="0.7"/>
          <line x1="2"   y1="198" x2="145" y2="100" stroke="rgba(0,0,0,0.32)" stroke-width="0.7"/>
          <line x1="288" y1="198" x2="145" y2="100" stroke="rgba(0,0,0,0.32)" stroke-width="0.7"/>

          <rect x="6" y="4" width="278" height="2" rx="1" fill="rgba(255,255,255,0.18)"/>
        </svg>

        <span class="wax-seal" aria-hidden="true">
          <span class="wax-seal__mark">P</span>
        </span>
      </button>
    </div>

    <p class="envelope-cta">Touch&nbsp;to&nbsp;open</p>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
