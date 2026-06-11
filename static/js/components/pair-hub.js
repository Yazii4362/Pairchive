import { navigateTo } from '../app.js';

/**
 * 13 · 페어 탭 — 초대장 허브 (받은 / 보낸 / 진행 중)
 * - flow: ④
 * - "내가 보낸 초대의 대기 상태", "받은 초대 → 수락/거절", "진행 중인 짝꿁"을 한 곳에서.
 */
export function renderPairHub() {
  const received = [
    { from: '리아', initial: '리', bookTitle: '같이 보는 영화 책', sentAt: '오늘 14:22' },
    { from: '하준', initial: '하', bookTitle: '러닝 메이트 책',     sentAt: '어제'      },
  ];

  const sent = [
    { to: '두비', initial: '두', bookTitle: '디자인 트렌드 책', state: '수락 대기' },
    { to: '예지', initial: '예', bookTitle: 'AI 논문 책',       state: '수락 대기' },
  ];

  const active = [
    { peer: '두비', initial: '두', books: 3, lastActivity: '5분 전' },
    { peer: '리아', initial: '리', books: 1, lastActivity: '2시간 전' },
  ];

  const section = document.createElement('section');
  section.className = 'screen screen--pair-hub';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <header class="pair-nav">
      <button class="ed-btn ed-btn--ghost" type="button" data-go="shelf">‹ 책장</button>
      <span class="ed-section-label" style="font-size:9px;">Pair · Letters</span>
      <button class="ed-btn ed-btn--ghost" type="button" data-go="invite-letter" aria-label="새 초대장 보내기">＋ 초대</button>
    </header>

    <div class="ed-page" style="padding: 12px 20px 24px;">
      <header style="text-align:center;">
        <p class="ed-eyebrow">Letters between us</p>
        <h1 class="ed-title ed-title--sm" style="margin-top: 12px;">
          짝꿁 · 초대장
        </h1>
        <p class="ed-caption" style="margin-top: 10px;">
          혼자 읽던 책을 함께 집필할 짝꿁에게 초대장을 보냅니다.
        </p>
      </header>

      <!-- ── Received ─────────────────────────────────────────── -->
      <section style="margin-top: 26px;" aria-labelledby="ph-received">
        <header class="pair-section-head">
          <p id="ph-received" class="ed-section-label">받은 초대장</p>
          <span class="pair-pill">${received.length}통</span>
        </header>

        <div class="pair-list">
          ${received.map((it) => `
            <article class="pair-row">
              <span class="pair-row__avatar" aria-hidden="true">${it.initial}</span>
              <div class="pair-row__body">
                <p class="pair-row__title">${it.from} 님이 초대했어요</p>
                <p class="pair-row__meta">${it.bookTitle} · ${it.sentAt}</p>
              </div>
              <div class="pair-row__actions">
                <button class="ed-btn ed-btn--compact" type="button" data-action="accept">수락</button>
                <button class="ed-btn ed-btn--ghost ed-btn--compact" type="button" data-action="decline">거절</button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- ── Sent ─────────────────────────────────────────────── -->
      <section style="margin-top: 22px;" aria-labelledby="ph-sent">
        <header class="pair-section-head">
          <p id="ph-sent" class="ed-section-label">보낸 초대장</p>
          <span class="ed-caption" style="font-size:11px;">대기 ${sent.length}통</span>
        </header>

        <div class="pair-list">
          ${sent.map((it) => `
            <article class="pair-row pair-row--muted">
              <span class="pair-row__avatar pair-row__avatar--ghost" aria-hidden="true">${it.initial}</span>
              <div class="pair-row__body">
                <p class="pair-row__title">${it.to} 님에게 보냈어요</p>
                <p class="pair-row__meta">${it.bookTitle} · ${it.state}</p>
              </div>
              <button class="ed-btn ed-btn--ghost ed-btn--compact" type="button" data-action="cancel">취소</button>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- ── Active pairs ─────────────────────────────────────── -->
      <section style="margin-top: 22px;" aria-labelledby="ph-active">
        <header class="pair-section-head">
          <p id="ph-active" class="ed-section-label">진행 중인 짝꿁</p>
        </header>

        <div class="pair-active">
          ${active.map((p) => `
            <button class="pair-active__item" type="button" data-go="shelf"
                    aria-label="${p.peer} 와 진행 중인 책 ${p.books}권">
              <span class="pair-active__avatar" aria-hidden="true">${p.initial}</span>
              <span class="pair-active__body">
                <span class="pair-active__name">${p.peer}</span>
                <span class="pair-active__meta">${p.books}권 · ${p.lastActivity}</span>
              </span>
              <span class="ed-list__chev">›</span>
            </button>
          `).join('')}
        </div>
      </section>
    </div>

    <footer class="ed-footer">
      <button class="ed-btn ed-btn--block" type="button" data-go="invite-letter">＋ 새 초대장 쓰기</button>
      <p class="ed-caption" style="font-size:12px; margin-top: 2px;">
        Pair · Pear · Archive — 배처럼 슴슴한 우리만의 기록.
      </p>
    </footer>
  `;

  // Demo interactions — accept/decline visually dismiss the row
  section.querySelectorAll('.pair-row').forEach((row) => {
    row.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        row.style.opacity = '0';
        row.style.transform = 'translateY(-6px)';
        row.style.transition = 'opacity .2s ease, transform .2s ease';
        setTimeout(() => row.remove(), 220);
      });
    });
  });

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );

  return section;
}
