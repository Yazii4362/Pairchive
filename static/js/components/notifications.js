import { navigateTo } from '../app.js';

/**
 * 14 · 알림 센터 — Reaction / New link / D-3 / Wow moment 타입
 * - flow: ⑦ (숨은 와이어프레임 1번)
 * - 알림 카테고리: reaction · link · 'd-3' · wow
 */
export function renderNotifications() {
  const items = [
    {
      type: 'reaction', who: '두비', initial: '두',
      body: '"Figma Variables 완벽 가이드"에 🔥 리액션을 남겼어요',
      at: '방금', go: 'reactions',
    },
    {
      type: 'link', who: '리아', initial: '리',
      body: '"리아와의 영화 책"에 새 링크를 끼웠어요',
      at: '12분 전', go: 'reading',
    },
    {
      type: 'd-3', who: null, initial: '⏰',
      body: '"두비와의 디자인 책"이 3일 후 종료돼요.\n마지막 링크들을 채워 책을 완성하세요.',
      at: '오늘 09:00', go: 'reading',
    },
    {
      type: 'wow', who: '두비', initial: '두',
      body: '"이거 진짜 신기해, 시각화가 너무 좋다"를 와 모먼트로 남겼어요',
      at: '어제', go: 'reaction',
    },
    {
      type: 'reaction', who: '리아', initial: '리',
      body: '"도쿄 골목 사진 에세이"에 🫶 리액션을 남겼어요',
      at: '어제', go: 'reactions',
    },
  ];

  const grouped = {
    today:     items.filter((i) => /방금|분 전|오늘/.test(i.at)),
    yesterday: items.filter((i) => /어제/.test(i.at)),
  };

  const renderRow = (n) => /* html */ `
    <article class="noti-row" role="listitem" data-go="${n.go}" tabindex="0">
      <span class="noti-row__icon noti-row__icon--${n.type}" aria-hidden="true">
        ${n.type === 'reaction' ? '🔥'
        : n.type === 'link'     ? '🔗'
        : n.type === 'd-3'      ? '⏰'
        : n.type === 'wow'      ? '✨'
        : '•'}
      </span>
      <div class="noti-row__body">
        <p class="noti-row__text">${n.body.replace(/\n/g, '<br/>')}</p>
        <p class="noti-row__meta">${n.who ? n.who + ' · ' : ''}${n.at}</p>
      </div>
      <span class="ed-list__chev" aria-hidden="true">›</span>
    </article>
  `;

  const section = document.createElement('section');
  section.className = 'screen screen--notifications';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="noti-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="shelf">‹ 책장</button>
      <span class="ed-section-label" style="font-size:9px;">Quiet Bell</span>
      <button class="ed-btn ed-btn--ghost" type="button" data-action="mark-read">모두 읽음</button>
    </header>

    <div class="ed-page" style="padding: 12px 20px 20px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">Quiet Bell</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">알림</h1>
        <p class="ed-caption" style="margin-top: 10px;">
          한 명이 한 페이지에 한 마디만 — 시끄럽지 않게.
        </p>
      </header>

      <section style="margin-top: 22px;" aria-labelledby="noti-today">
        <p id="noti-today" class="ed-section-label" style="margin: 0 4px 8px;">오늘</p>
        <div class="noti-list" role="list">
          ${grouped.today.map(renderRow).join('')}
        </div>
      </section>

      ${grouped.yesterday.length ? `
        <section style="margin-top: 22px;" aria-labelledby="noti-y">
          <p id="noti-y" class="ed-section-label" style="margin: 0 4px 8px;">어제</p>
          <div class="noti-list" role="list">
            ${grouped.yesterday.map(renderRow).join('')}
          </div>
        </section>
      ` : ''}

      <p class="ed-caption" style="margin: 22px 0 0; text-align:center; font-size: 12px;">
        D-3 알림은 책 종료 3일 전, 마지막 페이지를 채울 수 있게 알려드려요.
      </p>
    </div>
  `;

  // Mark-all-read demo behavior
  section.querySelector('[data-action="mark-read"]').addEventListener('click', () => {
    section.querySelectorAll('.noti-row').forEach((r) => (r.style.opacity = '0.5'));
  });

  // Make each row keyboard-activatable
  section.querySelectorAll('.noti-row').forEach((row) => {
    row.addEventListener('click', () => navigateTo(row.dataset.go));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(row.dataset.go);
      }
    });
  });

  section.querySelectorAll('[data-go]').forEach((el) => {
    if (el.matches('.noti-row')) return; // handled above
    el.addEventListener('click', () => navigateTo(el.dataset.go));
  });

  return section;
}
