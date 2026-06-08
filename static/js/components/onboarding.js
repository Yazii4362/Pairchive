import { navigateTo } from '../app.js';

export function renderOnboarding() {
    const section = document.createElement('section');
    section.className = 'screen onboarding-dark';
    section.innerHTML = `
        <div class="onboarding-wrap">
            <div class="header-logo">tastify</div>
            <div class="typography-block">
                <h2>내가 좋아하는 취향을<br><span class="highlight">가장 아름답게 아카이빙</span>하는 곳</h2>
                <p>흩어지는 링크와 영감의 조각들을<br>둘만의 정돈된 서재에 기록해 보세요.</p>
            </div>
            
            <div class="form-container">
                <input type="text" id="input-pair-name" class="input-minimal" placeholder="서재 이름을 입력하세요 (예: 민지 × 수빈)">
                <button id="btn-create-shelf" class="btn-primary-rect">서재 만들고 초대 코드 생성</button>
            </div>
            
            <div class="dev-bypass">
                <button id="btn-bypass-invite" class="btn-text-link">페어 초대장 웹 프리뷰 먼저 보기 →</button>
            </div>
        </div>
    `;

    section.querySelector('#btn-create-shelf').addEventListener('click', () => navigateTo('shelf'));
    section.querySelector('#btn-bypass-invite').addEventListener('click', () => navigateTo('invite'));
    return section;
}