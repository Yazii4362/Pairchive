/* ====================================================================
   Pairchive · app.js
   - 단일 페이지(SPA) 오케스트레이터
   - 모든 화면을 `screens` 레지스트리에 등록하고, navigateTo(id)로 스위치
   - 각 컴포넌트는 <section class="screen"> DOM 노드를 반환
   - section.dataset.scheme = 'light' | 'dark' 로 body 톤 토글
   - 해시 라우팅 (#shelf, #reading …) + 키보드 ← → + 우하단 미니 페이저
   ==================================================================== */

import { renderIntro }         from './components/intro.js';
import { renderOnboarding }    from './components/onboarding.js';
import { renderEmptyShelf }    from './components/empty-shelf.js';
import { renderShelf }         from './components/shelf.js';
import { renderReading }       from './components/reading.js';
import { renderCapture }       from './components/capture.js';
import { renderShareSheet }    from './components/share-sheet.js';
import { renderSaveSheet }     from './components/save-sheet.js';
import { renderReaction }      from './components/reaction.js';
import { renderReactions }     from './components/reactions.js';
import { renderCloseConsent }  from './components/close-consent.js';
import { renderCloseBook }     from './components/close-book.js';
import { renderWowMoment }     from './components/wow-moment.js';
import { renderReport }        from './components/report.js';
import { renderInvite }        from './components/invite.js';
import { renderInviteLetter }  from './components/invite-letter.js';
import { renderLockNoti, renderDeeplink }     from './components/lock-noti.js';
import { renderArchived, renderDetailRead }   from './components/archived.js';
import { renderSettings }      from './components/settings.js';
import { renderSoloEmpty }     from './components/solo-empty.js';

/* ── 전역 상태 ──────────────────────────────────────────────────── */
export const appState = {
  currentView: 'intro',
  pairName: '민지 × 수빈의 서재',
  isPairMode: true,
  lastCapturedLink: {
    title: 'Acne Studios — 가을 룩북 아카이브 컬렉션',
    url: 'https://acnestudios.com/fall-lookbook',
    memo: '이번 시즌 컬러웨이 진짜 맑고 중성적임. 우리 브랜드 톤앤매너 잡을 때 무조건 참고하기!',
  },
};

/* ── 화면 레지스트리 — 순서가 곧 ←/→ 이동 흐름 ─────────────────── */
const screens = [
  { id: 'intro',          render: renderIntro,         group: 'enter' },
  { id: 'onboarding',     render: renderOnboarding,    group: 'enter' },
  { id: 'empty-shelf',    render: renderEmptyShelf,    group: 'cycle' },
  { id: 'shelf',          render: renderShelf,         group: 'cycle' },
  { id: 'reading',        render: renderReading,       group: 'cycle' },
  { id: 'capture',        render: renderCapture,       group: 'cycle' },
  { id: 'share-sheet',    render: renderShareSheet,    group: 'cycle' },
  { id: 'save-sheet',     render: renderSaveSheet,     group: 'cycle' },
  { id: 'reaction',       render: renderReaction,      group: 'cycle' },
  { id: 'reactions',      render: renderReactions,     group: 'cycle' },
  { id: 'close-consent',  render: renderCloseConsent,  group: 'cycle' },
  { id: 'close-book',     render: renderCloseBook,     group: 'cycle' },
  { id: 'wow-moment',     render: renderWowMoment,     group: 'cycle' },
  { id: 'report',         render: renderReport,        group: 'cycle' },
  { id: 'invite',         render: renderInvite,        group: 'extra' },
  { id: 'invite-letter',  render: renderInviteLetter,  group: 'extra' },
  { id: 'lock-noti',      render: renderLockNoti,      group: 'extra' },
  { id: 'deeplink',       render: renderDeeplink,      group: 'alias', hidden: true },
  { id: 'archived',       render: renderArchived,      group: 'extra' },
  { id: 'detail-read',    render: renderDetailRead,    group: 'alias', hidden: true },
  { id: 'settings',       render: renderSettings,      group: 'extra' },
  { id: 'solo-empty',     render: renderSoloEmpty,     group: 'extra' },
];

const screenMap = Object.fromEntries(screens.map((s) => [s.id, s]));
const visibleList = screens.filter((s) => !s.hidden);

/* ── DOM 셸 ─────────────────────────────────────────────────────── */
const appContainer  = document.getElementById('app');
const statusBar     = document.getElementById('status-bar');
const homeIndicator = document.getElementById('home-indicator');
const pagerPrev     = document.getElementById('pager-prev');
const pagerNext     = document.getElementById('pager-next');

/* ── 라우팅 ─────────────────────────────────────────────────────── */
export function navigateTo(viewName) {
  if (!screenMap[viewName]) {
    console.warn('[pairchive] unknown screen:', viewName);
    return;
  }
  appState.currentView = viewName;
  if (location.hash !== `#${viewName}`) {
    history.pushState({ view: viewName }, '', `#${viewName}`);
  }
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function neighborId(delta) {
  const idx = visibleList.findIndex((s) => s.id === appState.currentView);
  if (idx < 0) return visibleList[0]?.id;
  const next = (idx + delta + visibleList.length) % visibleList.length;
  return visibleList[next].id;
}

function render() {
  if (!appContainer) return;

  const current = screenMap[appState.currentView];
  if (!current) return;

  appContainer.dataset.state = 'leaving';

  requestAnimationFrame(() => {
    appContainer.innerHTML = '';
    const node = current.render();
    appContainer.appendChild(node);

    const scheme = node.dataset?.scheme || 'light';
    document.body.dataset.scheme = scheme;
    document.body.dataset.screen = current.id;

    const chromelessGroups = new Set(['enter']);
    const chromeless = chromelessGroups.has(current.group) || node.dataset?.chromeless === 'true';
    if (statusBar)     statusBar.dataset.hidden     = chromeless ? 'true' : 'false';
    if (homeIndicator) homeIndicator.dataset.hidden = chromeless ? 'true' : 'false';

    appContainer.dataset.state = 'entering';
  });
}

/* ── 미니 페이저 ─────────────────────────────────────────────── */
pagerPrev?.addEventListener('click', () => navigateTo(neighborId(-1)));
pagerNext?.addEventListener('click', () => navigateTo(neighborId(+1)));

/* ── 키보드: ← / → 이전·다음 ─────────────────────────────────── */
window.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  if (e.key === 'ArrowRight') navigateTo(neighborId(+1));
  else if (e.key === 'ArrowLeft') navigateTo(neighborId(-1));
});

/* ── 해시 라우팅 ────────────────────────────────────────────── */
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (id && screenMap[id] && id !== appState.currentView) {
    appState.currentView = id;
    render();
  }
});

/* ── 부팅 ──────────────────────────────────────────────────── */
function boot() {
  const initial = location.hash.slice(1);
  if (initial && screenMap[initial]) {
    appState.currentView = initial;
  }
  render();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
