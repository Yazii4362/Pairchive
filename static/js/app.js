import { renderOnboarding } from './components/onboarding.js';
import { renderShelf } from './components/shelf.js';
import { renderReading } from './components/reading.js';
import { renderCapture } from './components/capture.js';
import { renderReaction } from './components/reaction.js';
import { renderCloseBook } from './components/close-book.js';
import { renderWowMoment } from './components/wow-moment.js';
import { renderReport } from './components/report.js';
import { renderInvite } from './components/invite.js';
import { renderDeeplink } from './components/deeplink.js';
import { renderDetailRead } from './components/detail-read.js';
import { renderSettings } from './components/settings.js';
import { renderSoloEmpty } from './components/solo-empty.js';

export const appState = {
    currentView: 'onboarding', // 첫 진입 화면
    pairName: '민지 × 수빈의 서재',
    isPairMode: true,
    lastCapturedLink: {
        title: 'Acne Studios — 가을 룩북 아카이브 컬렉션',
        url: 'https://acnestudios.com/fall-lookbook',
        memo: '이번 시즌 컬러웨이 진짜 맑고 중성적임. 우리 브랜드 톤앤매너 잡을 때 무조건 참고하기!'
    }
};

const appContainer = document.getElementById('app');

export function navigateTo(viewName) {
    appState.currentView = viewName;
    render();
}

function render() {
    appContainer.innerHTML = '';
    
    switch (appState.currentView) {
        case 'onboarding': appContainer.appendChild(renderOnboarding()); break;
        case 'shelf': appContainer.appendChild(renderShelf()); break;
        case 'reading': appContainer.appendChild(renderReading()); break;
        case 'capture': appContainer.appendChild(renderCapture()); break;
        case 'reaction': appContainer.appendChild(renderReaction()); break;
        case 'close-book': appContainer.appendChild(renderCloseBook()); break;
        case 'wow-moment': appContainer.appendChild(renderWowMoment()); break;
        case 'report': appContainer.appendChild(renderReport()); break;
        case 'invite': appContainer.appendChild(renderInvite()); break;
        case 'deeplink': appContainer.appendChild(renderDeeplink()); break;
        case 'detail-read': appContainer.appendChild(renderDetailRead()); break;
        case 'settings': appContainer.appendChild(renderSettings()); break;
        case 'solo-empty': appContainer.appendChild(renderSoloEmpty()); break;
    }
}

window.addEventListener('DOMContentLoaded', render);