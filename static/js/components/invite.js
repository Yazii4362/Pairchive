import { navigateTo } from '../app.js';

export function renderInvite() {
    const section = document.createElement('section');
    section.className = 'screen onboarding-dark';
    section.innerHTML = `
        <div class="invite-web-preview">
            <div class="envelope-badge">INVITATION</div>
            <h2>민지님으로부터<br><strong>pairchive</strong> 서재 초대장이 도착했습니다.</h2>
            <p class="sub-desc">코드를 복사하고 앱을 다운로드하여<br>둘만의 아날로그 취향 서가를 빌드해 보세요.</p>
            
            <div class="code-box-display">
                <span>PAIR-X9F2-33A1</span>
            </div>
            
            <button id="btn-app-download" class="btn-primary-rect fill-white">초대 수락하고 앱 설치하기</button>
            <button id="btn-back-home" class="btn-text-link text-gray" style="margin-top:16px;">처음 화면으로</button>
        </div>
    `;

    section.querySelector('#btn-app-download').addEventListener('click', () => navigateTo('shelf'));
    section.querySelector('#btn-back-home').addEventListener('click', () => navigateTo('onboarding'));
    return section;
}