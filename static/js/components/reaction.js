import { navigateTo } from '../app.js';

export function renderReaction() {
    const section = document.createElement('section');
    section.className = 'screen reaction-overlay-bg';
    section.innerHTML = `
        <div class="bottom-sheet-reaction">
            <div class="drag-handle"></div>
            <h3>취향에 반응 남기기</h3>
            <div class="emoji-chip-grid">
                <button class="emoji-picker-item">🔥 와우</button>
                <button class="emoji-picker-item">💡 영감</button>
                <button class="emoji-picker-item">📌 간직</button>
                <button class="emoji-picker-item">👀 확인</button>
                <button class="emoji-picker-item">💬 대화필요</button>
                <button class="emoji-picker-item">☕️ 커피타임</button>
            </div>
            <button class="btn-close-sheet">닫기</button>
        </div>
    `;

    section.querySelectorAll('.emoji-picker-item, .btn-close-sheet').forEach(btn => {
        btn.addEventListener('click', () => navigateTo('reading'));
    });
    return section;
}