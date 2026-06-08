import { navigateTo } from '../app.js';

export function renderSoloEmpty() {
    const section = document.createElement('section');
    section.className = 'screen shelf-light solo-mode-modifier';
    section.innerHTML = `
        <div class="shelf-dashboard">
            <header class="shelf-header">
                <div class="room-title-wrap">
                    <h2>나만의 고독한 서재</h2>
                    <p>현재 페어 연결이 없는 상태입니다.</p>
                </div>
                <button id="btn-re-invite" class="btn-pill-connect">친구 초대하기</button>
            </header>
            
            <div class="solo-empty-center">
                <div class="empty-book-outline-graphic"></div>
                <p>혼자서도 책을 채워나갈 수 있지만,<br>페어를 맺으면 한 달에 한 권씩 취향 집이 바인딩됩니다.</p>
            </div>
        </div>
    `;

    section.querySelector('#btn-re-invite').addEventListener('click', () => navigateTo('onboarding'));
    return section;
}