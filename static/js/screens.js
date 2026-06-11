/* Pairchive · Static Prototype · Screen templates
 * ----------------------------------------------------------------------
 * Flow (final):
 *   ① 온보딩(Dim coachmark)          → 'onboardingDim'
 *   ② 홈 책장 (메인)                  → 'home'
 *   ③ 책 만들기 (1인 vs 페어)         → 'newBook'
 *   ④ 페어 탭 (초대장 허브)            → 'pairHub'
 *   ⑤ 책 상세 (링크 + 리액션)         → 'bookDetail'
 *   ⑥ 링크 캡처 (공유시트)            → 'shareSheet'
 *   ⑦ 알림 센터                       → 'notifications'
 *   ⑧ 책 종료 → 리포트                → 'reportCard'
 *   ⑨ 자동 복사 와우 모먼트            → 'wowMoment'
 *   ⑩ 책 설정 / 책에서 나가기          → 'bookSettings'
 *   ⑪ 잠금 화면 알림                  → 'lockNoti'
 *   ⑫ 간직된 책(읽기 전용)             → 'archivedBook'
 *   ⑬ 초대 페이지(웹)                  → 'invite'
 *
 * Conventions:
 *  - Every interactive element is a <button> with an accessible name.
 *  - All buttons / list rows meet the 44pt HIG hit-target.
 *  - Animation hooks: `.js-anim` (fade-up), `.js-book` (shelf book pop)
 */
(function () {
  const data = window.PAIRCHIVE_DATA;

  /* =====================================================================
     Reusable atoms
     ===================================================================== */

  const sfChevron = `
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
      <path d="M1.5 1.5 7 7l-5.5 5.5" stroke="currentColor" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const sfBack = `
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
      <path d="M10 2 2 10l8 8" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function navBar({ title, leading = '', trailing = '' }) {
    return `
      <header class="nav-bar" role="navigation" aria-label="${title || '화면'} 네비게이션">
        <div class="nav-bar__side">${leading}</div>
        <div class="nav-bar__title">${title}</div>
        <div class="nav-bar__side" style="justify-content:flex-end;">${trailing}</div>
      </header>`;
  }

  const backBtn = (label = '뒤로') => `
    <button type="button" class="nav-bar__btn" aria-label="${label}">
      ${sfBack}<span>뒤로</span>
    </button>`;

  const actionBtn = (label, aria) => `
    <button type="button" class="nav-bar__btn" aria-label="${aria || label}">${label}</button>`;

  const tag = (label) => `<span class="tag-pill">${label}</span>`;
  const tagRow = (labels) => `
    <div class="tag-row" role="list">
      ${labels.map((l) => `<span role="listitem">${tag(l)}</span>`).join('')}
    </div>`;

  /* ----- emoji reactions ------------------------------------------------ */
  function reactionsRow(scope, overrides = {}) {
    const list = (overrides.list || data.reactions).map((r, i) => `
      <button type="button" class="reaction js-reaction"
              data-scope="${scope}" data-idx="${i}"
              aria-label="${r.label} 리액션, ${r.count}명"
              aria-pressed="${r.pressed ? 'true' : 'false'}">
        <span class="reaction__emoji" aria-hidden="true">${r.emoji}</span>
        ${r.count > 0 ? `<span class="reaction__count">${r.count}</span>` : ''}
      </button>`).join('');

    const peers = overrides.hidePeers ? '' : `
      <span class="reaction-peers" aria-label="최근 리액션한 페어">
        <span class="avatars" aria-hidden="true">
          ${data.peers.map((p) => `
            <span class="avatar" style="background:${p.color}">${p.initial}</span>
          `).join('')}
        </span>
        <span>두비 · 야지가 반응했어요</span>
      </span>`;

    return `
      <div class="reactions-block js-anim">
        <div class="reactions" role="group" aria-label="이모지 리액션">
          ${list}
          <button type="button" class="reaction reaction--add"
                  aria-label="다른 이모지로 리액션 추가">
            <span class="reaction__emoji" aria-hidden="true">+</span>
          </button>
        </div>
        ${peers}
      </div>`;
  }

  /* ----- book spine (shelf metaphor) ----------------------------------- */
  function bookSpine(book, idx = 0) {
    const isPair = book.kind === 'pair';
    const tall   = 130 + (idx % 4) * 10;
    const width  = 36 + (idx % 3) * 4;
    return `
      <button type="button" class="spine js-book"
              data-id="${book.id}"
              style="height:${tall}px; width:${width}px; background:${book.accent};"
              aria-label="${book.title}, ${isPair ? '페어 책' : '개인 책'}, ${book.count}개 링크">
        <span class="spine__band" aria-hidden="true"></span>
        <span class="spine__title">${book.title}</span>
        ${isPair ? `<span class="spine__pair" aria-hidden="true">두비</span>` : ''}
      </button>`;
  }

  /* ----- archived book spine (lying flat on the top shelf) ------------- */
  function archivedSpine(book) {
    return `
      <button type="button" class="archived-spine"
              style="background:${book.accent};"
              aria-label="${book.title} (간직된 책)">
        <span class="archived-spine__title">${book.title}</span>
      </button>`;
  }

  /* =====================================================================
     ① 온보딩 — 기본 책 1권 꽂힌 홈 + Dim 코치마크 (3단계)
     ===================================================================== */
  function onboardingDim() {
    return `
      <main class="screen home" aria-label="페어카이브 온보딩">
        <header class="home__head">
          <div>
            <p class="eyebrow">PAIRCHIVE</p>
            <h1 class="title-1">야지의 서재</h1>
          </div>
          <button type="button" class="icon-btn" aria-label="알림 열기">🔔</button>
        </header>

        <section class="shelf" aria-label="내 책장">
          <div class="shelf__row shelf__row--archive" aria-label="간직된 책">
            <span class="shelf__caption">간직된 책</span>
            <div class="shelf__archive-empty">아직 덮은 책이 없어요</div>
          </div>
          <div class="shelf__row shelf__row--active" aria-label="진행 중인 책">
            <div class="spines">
              ${bookSpine(data.defaultBook, 0)}
              <button type="button" class="spine spine--add" aria-label="새 책 만들기">
                <span aria-hidden="true">＋</span>
              </button>
            </div>
            <span class="shelf__caption">진행 중인 책</span>
          </div>
        </section>

        <!-- Dim coachmark overlay (3 steps) -->
        <div class="coach" id="coach" data-step="1" role="dialog" aria-modal="true" aria-labelledby="coach-title">
          <div class="coach__dim" aria-hidden="true"></div>

          <article class="coach__step is-active" data-step="1">
            <span class="coach__index">1 / 3</span>
            <h2 class="coach__title" id="coach-title">이 책은 당신만의 아카이빙 공간이에요</h2>
            <p class="coach__body">앱을 설치하면 책 한 권이 기본으로 꽂혀 있어요.<br/>여기에 링크를 모아 나만의 취향을 채워보세요.</p>
            <div class="coach__actions">
              <button type="button" class="btn btn--plain" data-coach="skip">건너뛰기</button>
              <button type="button" class="btn btn--brand" data-coach="next">다음</button>
            </div>
          </article>

          <article class="coach__step" data-step="2">
            <span class="coach__index">2 / 3</span>
            <h2 class="coach__title">＋ 버튼으로 새 책을 만들어요</h2>
            <p class="coach__body">카테고리 = 책 한 권이에요.<br/>혼자만의 책이든, 누군가와 함께하는 책이든 자유롭게 시작하세요.</p>
            <div class="coach__actions">
              <button type="button" class="btn btn--plain" data-coach="back">이전</button>
              <button type="button" class="btn btn--brand" data-coach="next">다음</button>
            </div>
          </article>

          <article class="coach__step" data-step="3">
            <span class="coach__index">3 / 3</span>
            <h2 class="coach__title">짝꿍에게 초대장을 보내볼까요</h2>
            <p class="coach__body">페어 탭에서 초대장을 보내고, 함께 한 권의 책을 채워가세요.<br/><strong>배처럼 달콤하고 슴슴한 우리만의 기록, Pairchive 를 시작해 보세요.</strong></p>
            <div class="coach__actions">
              <button type="button" class="btn btn--plain" data-coach="back">이전</button>
              <button type="button" class="btn btn--brand" data-coach="finish">시작하기</button>
            </div>
          </article>
        </div>
      </main>
      ${tabBar(mainTabs, 'home')}`;
  }

  /* =====================================================================
     Bottom tab bar (HIG UITabBar)
     ===================================================================== */
  const mainTabs = [
    { key: 'home',     label: '홈',    glyph: '⌂' },
    { key: 'pair',     label: '페어',  glyph: '✉' },
    { key: 'add',      label: '추가',  glyph: '＋', primary: true },
    { key: 'noti',     label: '알림',  glyph: '🔔' },
    { key: 'me',       label: '설정',  glyph: '⚙' },
  ];

  function tabBar(items, activeKey) {
    return `
      <nav class="tab-bar" role="tablist" aria-label="앱 메인 탭">
        ${items.map((it) => {
          const active = it.key === activeKey;
          return `
            <button type="button" role="tab"
                    class="tab-bar__item ${it.primary ? 'tab-bar__item--primary' : ''}"
                    aria-selected="${active}" aria-label="${it.label} 탭"
                    tabindex="${active ? 0 : -1}">
              <span class="icon" aria-hidden="true">${it.glyph}</span>
              <span>${it.label}</span>
            </button>`;
        }).join('')}
      </nav>`;
  }

  /* =====================================================================
     ② 홈 — 다층 책장 (간직된 책 / 진행 중 / 추가 버튼)
     ===================================================================== */
  function home() {
    const archive = data.archive.map(archivedSpine).join('');
    const active  = data.bookshelf.map(bookSpine).join('');

    return `
      <main class="screen home" aria-label="홈 책장">
        <header class="home__head">
          <div>
            <p class="eyebrow">야지의 서재</p>
            <h1 class="title-1">5권의 책이<br/>나란히 있어요</h1>
          </div>
          <button type="button" class="icon-btn" aria-label="알림 열기">🔔</button>
        </header>

        <section class="shelf" aria-label="내 책장">
          <div class="shelf__row shelf__row--archive" aria-label="간직된 책 (읽기 전용)">
            <span class="shelf__caption">간직된 책</span>
            <div class="archived-stack">${archive}</div>
          </div>
          <div class="shelf__row shelf__row--active" aria-label="진행 중인 책">
            <div class="spines">
              ${active}
              <button type="button" class="spine spine--add" aria-label="새 책 만들기">
                <span aria-hidden="true">＋</span>
              </button>
            </div>
            <span class="shelf__caption">진행 중인 책 · 4권</span>
          </div>
        </section>

        <p class="callout home__hint js-anim">
          한 권을 길게 눌러 이름을 바꾸거나, 페어를 초대할 수 있어요.
        </p>
      </main>
      ${tabBar(mainTabs, 'home')}`;
  }

  /* =====================================================================
     ③ 책 만들기 — 1인 / 페어 분기
     ===================================================================== */
  function newBook() {
    return `
      ${navBar({
        title: '새 책',
        leading: actionBtn('취소', '책 만들기 취소'),
        trailing: actionBtn('만들기', '책 생성 완료'),
      })}
      <main class="screen screen--grouped" aria-label="새 책 만들기">
        <p class="subhead js-anim">한 권의 책은 하나의 카테고리예요. 누구와, 무엇을 쌓을지 정해보세요.</p>

        <section class="js-anim" aria-labelledby="kind-label">
          <p id="kind-label" class="eyebrow" style="padding:0 4px 8px;">책의 종류</p>
          <div class="segmented segmented--block" role="radiogroup" aria-label="책 종류">
            <button type="button" class="segmented__btn" role="radio" aria-checked="true">
              🌱  1인 책
            </button>
            <button type="button" class="segmented__btn" role="radio" aria-checked="false">
              🤝  페어 책
            </button>
          </div>
          <p class="footnote" style="margin-top:8px;">
            1인 책으로 시작해도, 언제든 초대장을 보내 페어 책으로 전환할 수 있어요.
          </p>
        </section>

        <section class="js-anim" aria-labelledby="meta-label">
          <p id="meta-label" class="eyebrow" style="padding:0 4px 8px;">책 정보</p>
          <div class="form-list">
            <div class="form-row">
              <label class="form-row__label" for="bk-title">책 이름</label>
              <input id="bk-title" class="form-row__input" type="text"
                     placeholder="예 ) 두비와의 디자인 책" value="두비와의 디자인 책" />
            </div>
            <div class="form-row">
              <span class="form-row__label">카테고리</span>
              <span class="form-row__value">디자인 ${sfChevron}</span>
            </div>
            <div class="form-row">
              <span class="form-row__label">종료 날짜</span>
              <span class="form-row__value">기본 1개월 (D-30) ${sfChevron}</span>
            </div>
          </div>
        </section>

        <section class="js-anim invite-card invite-card--inline" aria-label="초대장 발송">
          <p class="eyebrow">짝꿍 초대 (선택)</p>
          <p class="callout" style="font-weight:500;">
            혼자 읽던 책을 함께 집필할 짝꿍에게 초대장을 보냅니다.
          </p>
          <button type="button" class="btn btn--brand btn--block">＋ 초대장 보내기</button>
        </section>
      </main>`;
  }

  /* =====================================================================
     ④ 페어 탭 — 초대장 허브
     ===================================================================== */
  function pairHub() {
    const received = data.invitations.received.map((inv) => `
      <article class="invite-row js-anim">
        <div class="invite-row__avatar" aria-hidden="true">${inv.from[0]}</div>
        <div class="invite-row__body">
          <p class="headline">${inv.from} 님이 초대했어요</p>
          <p class="footnote">${inv.bookTitle} · ${inv.sentAt}</p>
        </div>
        <div class="invite-row__actions">
          <button type="button" class="btn btn--brand btn--compact">수락</button>
          <button type="button" class="btn btn--gray btn--compact">거절</button>
        </div>
      </article>`).join('');

    const sent = data.invitations.sent.map((inv) => `
      <article class="invite-row js-anim">
        <div class="invite-row__avatar invite-row__avatar--outline" aria-hidden="true">${inv.to[0]}</div>
        <div class="invite-row__body">
          <p class="headline">${inv.to} 님에게 보냈어요</p>
          <p class="footnote">${inv.bookTitle} · ${inv.state}</p>
        </div>
        <button type="button" class="btn btn--gray btn--compact">취소</button>
      </article>`).join('');

    const active = data.invitations.active.map((p) => `
      <button type="button" class="active-pair js-anim" aria-label="${p.peer} 와 진행 중인 책 ${p.books}권">
        <span class="active-pair__avatar" aria-hidden="true">${p.peer[0]}</span>
        <span class="active-pair__body">
          <span class="headline">${p.peer}</span>
          <span class="footnote">${p.books}권 · ${p.lastActivity}</span>
        </span>
        ${sfChevron}
      </button>`).join('');

    return `
      ${navBar({
        title: '페어',
        trailing: actionBtn('＋ 초대', '새 초대장 보내기'),
      })}
      <main class="screen screen--grouped" aria-label="페어 허브">
        <section class="js-anim" aria-labelledby="received-h">
          <header class="section-header">
            <h2 id="received-h" class="title-3">받은 초대장</h2>
            <span class="badge badge--ink">${data.invitations.received.length}</span>
          </header>
          <div class="invite-list">${received}</div>
        </section>

        <section class="js-anim" aria-labelledby="sent-h">
          <header class="section-header">
            <h2 id="sent-h" class="title-3">보낸 초대장</h2>
            <span class="footnote">대기 ${data.invitations.sent.length}</span>
          </header>
          <div class="invite-list">${sent}</div>
        </section>

        <section class="js-anim" aria-labelledby="active-h">
          <header class="section-header">
            <h2 id="active-h" class="title-3">진행 중인 짝꿍</h2>
          </header>
          <div class="active-list">${active}</div>
        </section>
      </main>
      ${tabBar(mainTabs, 'pair')}`;
  }

  /* =====================================================================
     ⑤ 책 상세 — 진행 중 책 (링크 + 리액션 + D-N + 종료 버튼)
     ===================================================================== */
  function bookDetail() {
    const links = data.links.map((l, i) => `
      <article class="link-card js-anim">
        <button type="button" class="link-card__main" aria-label="${l.title}, ${l.host}">
          <span class="link-card__thumb" style="background:${l.accent}"
                aria-hidden="true">${l.who[0]}</span>
          <span class="link-card__body">
            <span class="link-card__title">${l.title}</span>
            <span class="link-card__meta">${l.host} · ${l.who} 추가</span>
            ${tagRow(l.tags)}
          </span>
        </button>
        ${i === 0 ? reactionsRow(`bk-${i}`, { hidePeers: false }) : `
          <footer class="link-card__footer">
            <span class="reaction-summary" aria-hidden="true">
              <span class="reaction-summary__dot">🔥</span>
              <span class="reaction-summary__dot">💡</span>
              <span class="reaction-summary__dot">🫶</span>
            </span>
            <span class="reaction-summary__text">두비 · 야지가 반응했어요</span>
          </footer>`}
      </article>`).join('');

    return `
      ${navBar({
        title: '두비와의 디자인 책',
        leading: backBtn(),
        trailing: actionBtn('···', '책 설정 열기'),
      })}
      <main class="screen screen--grouped" aria-label="책 상세">
        <header class="book-detail__head js-anim">
          <div>
            <p class="eyebrow text-pink">PAIR · ${data.links.length}개의 링크</p>
            <h1 class="title-1">두비 ♡ 디자인</h1>
            <p class="footnote">두 사람 모두 수정 가능 · D-7</p>
          </div>
          <button type="button" class="btn btn--brand btn--compact">＋ 링크</button>
        </header>

        ${links}

        <button type="button" class="btn btn--gray btn--block js-anim">
          이 책을 지금 덮기
        </button>
      </main>`;
  }

  /* =====================================================================
     ⑥ 공유시트 — 외부에서 들어온 링크를 어느 책에 꽂을지 고름
     ===================================================================== */
  function shareSheet() {
    const opts = data.bookshelf.slice(0, 3).map((b) => `
      <button type="button" class="share-row js-anim" aria-label="${b.title} 에 저장">
        <span class="share-row__spine" style="background:${b.accent}" aria-hidden="true"></span>
        <span class="share-row__body">
          <span class="headline">${b.title}</span>
          <span class="footnote">${b.subtitle} · ${b.count}개 링크</span>
        </span>
        <span class="footnote text-tint">저장</span>
      </button>`).join('');

    return `
      <main class="screen screen--share" aria-label="페어카이브 공유시트">
        <section class="sheet js-anim share-sheet" aria-label="저장 위치 선택">
          <span class="sheet__handle" aria-hidden="true"></span>
          <header class="share-sheet__head">
            <span class="brand-dot" aria-hidden="true"></span>
            <h2 class="title-3">Pairchive · 어떤 책에 넣을까요?</h2>
          </header>

          <article class="share-preview js-anim">
            <div class="share-preview__thumb" aria-hidden="true"></div>
            <div>
              <p class="headline">Apple 디자인 어워드 2026 수상작</p>
              <p class="footnote">developer.apple.com</p>
            </div>
          </article>

          ${opts}

          <button type="button" class="btn btn--plain btn--block js-anim">＋ 새 책으로 만들기</button>
        </section>
      </main>`;
  }

  /* =====================================================================
     ⑦ 알림 센터
     ===================================================================== */
  function notifications() {
    const glyph = {
      reaction: '🔥',
      link:     '🔗',
      'd-3':    '⏰',
      wow:      '✨',
    };

    const rows = data.notifications.map((n) => `
      <article class="noti-row js-anim">
        <span class="noti-row__icon noti-row__icon--${n.type}" aria-hidden="true">
          ${glyph[n.type] || '•'}
        </span>
        <div class="noti-row__body">
          <p class="callout" style="font-weight:500;">${n.body}</p>
          <p class="footnote">${n.who ? n.who + ' · ' : ''}${n.at}</p>
        </div>
      </article>`).join('');

    return `
      ${navBar({
        title: '알림',
        trailing: actionBtn('모두 읽음', '모든 알림 읽음 표시'),
      })}
      <main class="screen screen--grouped" aria-label="알림 센터">
        <section class="noti-section js-anim">
          <p class="eyebrow">오늘</p>
          ${rows}
        </section>
      </main>
      ${tabBar(mainTabs, 'noti')}`;
  }

  /* =====================================================================
     ⑧ 책 종료 → 리포트 카드 (한 달 리캡)
     ===================================================================== */
  function reportCard() {
    return `
      ${navBar({
        title: '5월 리포트',
        leading: actionBtn('닫기', '리포트 닫기'),
        trailing: actionBtn('이미지 저장', '리포트 이미지 저장'),
      })}
      <main class="screen" aria-label="월간 리포트">
        <article class="report-card js-anim">
          <header class="report-card__head">
            <span class="eyebrow text-pink">5月 RECAP</span>
            <h1 class="title-1">두비와의<br/>디자인 책</h1>
            <p class="footnote">2025.05.01 — 05.30 · 30일</p>
          </header>
          <div class="report-card__grid">
            <div class="report-stat">
              <span class="stat-number">24</span>
              <span class="footnote">함께 모은 링크</span>
            </div>
            <div class="report-stat">
              <span class="stat-number">11</span>
              <span class="footnote">와 모먼트</span>
            </div>
            <div class="report-stat">
              <span class="stat-number">3</span>
              <span class="footnote">탑 카테고리</span>
            </div>
            <div class="report-stat">
              <span class="stat-number">두비</span>
              <span class="footnote">최다 기여자</span>
            </div>
          </div>
          <p class="callout report-card__quote">
            "이거 진짜 신기해, 시각화가 너무 좋다"
          </p>
          <p class="footnote">— 야지가 남긴 와 모먼트</p>
        </article>

        <button type="button" class="btn btn--brand btn--block js-anim">
          내 서재에 자동으로 간직됐어요
        </button>
        <p class="footnote js-anim" style="text-align:center;">
          상대방의 허락 없이도 각자의 서재에 안전하게 복사돼요.
        </p>
      </main>`;
  }

  /* =====================================================================
     ⑨ 와우 모먼트 — 책이 책장에 꽂히는 순간
     ===================================================================== */
  function wowMoment() {
    return `
      <main class="screen wow" aria-label="새 책 간직 완료">
        <div class="wow__shelf">
          <div class="archived-stack archived-stack--wow">
            ${data.archive.map(archivedSpine).join('')}
            <button type="button" class="archived-spine archived-spine--new js-wow"
                    style="background:#FF4FA3;"
                    aria-label="방금 간직된 두비와의 디자인 책">
              <span class="archived-spine__title">두비 · 5月</span>
            </button>
          </div>
          <span class="shelf__caption">간직된 책 · ${data.archive.length + 1}권</span>
        </div>

        <article class="wow__copy js-anim">
          <span class="badge">간직됐어요</span>
          <h1 class="title-1">"두비와의 디자인 책"이<br/>책장 위층에 꽂혔어요</h1>
          <p class="callout">언제든 펼쳐 다시 읽을 수 있어요. 새 책으로 이어가고 싶다면 페어 탭에서 시작할 수 있어요.</p>
        </article>

        <button type="button" class="btn btn--brand btn--block js-anim">서재로 돌아가기</button>
      </main>`;
  }

  /* =====================================================================
     ⑩ 책 설정 / 책에서 나가기
     ===================================================================== */
  function bookSettings() {
    return `
      ${navBar({
        title: '책 설정',
        leading: backBtn(),
      })}
      <main class="screen screen--grouped" aria-label="책 설정">
        <section class="profile-card js-anim" aria-label="책 정보">
          <div class="profile-avatar" style="background:#FF4FA3;color:#fff;" aria-hidden="true">디</div>
          <div style="flex:1;">
            <p class="headline">두비와의 디자인 책</p>
            <p class="footnote">PAIR · D-7 · 24개 링크</p>
          </div>
        </section>

        <section class="js-anim" aria-labelledby="meta-h">
          <p id="meta-h" class="eyebrow" style="padding:0 4px 8px;">정보 수정 (둘 다 가능)</p>
          <div class="option-list">
            <button type="button" class="option-item">
              <span>책 이름</span>
              <span class="option-item__chevron">두비와의 디자인 책 ${sfChevron}</span>
            </button>
            <button type="button" class="option-item">
              <span>종료 날짜</span>
              <span class="option-item__chevron">2025.06.07 ${sfChevron}</span>
            </button>
            <button type="button" class="option-item">
              <span>알림 설정</span>
              <span class="option-item__chevron">기본 ${sfChevron}</span>
            </button>
          </div>
        </section>

        <section class="js-anim" aria-labelledby="member-h">
          <p id="member-h" class="eyebrow" style="padding:0 4px 8px;">멤버</p>
          <div class="option-list">
            <button type="button" class="option-item">
              <span>두비</span><span class="footnote">방장</span>
            </button>
            <button type="button" class="option-item">
              <span>야지 (나)</span><span class="footnote">멤버</span>
            </button>
          </div>
        </section>

        <section class="js-anim">
          <div class="option-list">
            <button type="button" class="option-item option-item--destructive">
              이 책에서 나가기
            </button>
          </div>
          <p class="footnote" style="padding:8px 4px;">
            나가면 그 시점까지 쌓인 링크가 자동으로 종료 처리되어 각자의 책장에 복사돼요.
          </p>
        </section>
      </main>`;
  }

  /* =====================================================================
     ⑪ 잠금 화면 알림
     ===================================================================== */
  function lockNoti() {
    return `
      <main class="lock-screen" aria-label="잠금 화면 알림">
        <p class="lock-time js-anim">9:41</p>
        <p class="lock-date js-anim">2025년 5월 22일 목요일</p>
        <section aria-label="알림 목록">
          <div class="lock-notification js-anim" role="article">
            <p class="lock-notification__title">Pairchive · 두비님</p>
            <p class="lock-notification__body">"두비와의 디자인 책"에 새 링크를 추가했어요</p>
          </div>
          <div class="lock-notification js-anim" role="article">
            <p class="lock-notification__title">Pairchive · 두비님</p>
            <p class="lock-notification__body">"Figma Variables 완벽 가이드"에 🔥 리액션을 남겼어요</p>
          </div>
        </section>
        <p class="lock-hint js-anim">밀어서 잠금 해제</p>
      </main>`;
  }

  /* =====================================================================
     ⑫ 간직된 책 (Read-Only) — 종료된 책 상세
     ===================================================================== */
  function archivedBook() {
    return `
      ${navBar({
        title: '간직된 책',
        leading: backBtn(),
      })}
      <main class="screen screen--grouped" aria-label="간직된 책 상세">
        <span class="footnote text-pink js-anim" style="font-weight:700;">읽기 전용 · 2025.04 덮음</span>
        <article class="archived-card js-anim">
          <div class="archived-thumb" style="background:linear-gradient(135deg,#FFB0D3,#B83870);"></div>
          <h2 class="title-3">두비와의 음악 책</h2>
          <p class="footnote">4월 한 달 · 18개 링크</p>
          <span class="eyebrow" style="margin-top:6px;">베스트 와 모먼트</span>
          <p class="callout" style="font-weight:500;">"이 트랙이 한 달을 통째로 가져갔어"</p>
        </article>

        <section class="js-anim" aria-label="새 책 이어 만들기">
          <article class="surface-card" style="display:flex; flex-direction:column; gap:10px;">
            <p class="headline">이 책은 아름답게 완성되었습니다.</p>
            <p class="callout">두비 님과 새로운 맛의 책을 한 권 더 묶어볼까요?</p>
            <button type="button" class="btn btn--brand btn--block">＋ 새 책 이어 만들기</button>
          </article>
        </section>
      </main>`;
  }

  /* =====================================================================
     ⑬ 초대 페이지 (웹)
     ===================================================================== */
  function invite() {
    return `
      <main class="screen screen--grouped" style="justify-content:center;" aria-label="초대 페이지">
        <article class="invite-card js-anim">
          <span class="eyebrow">PAIRCHIVE INVITE</span>
          <h1 class="title-1">두비가 보낸<br/>초대 링크</h1>
          <p class="body">
            메신저에서 받은 초대 링크를 열면 앱 설치를 유도하는 프리뷰가 표시됩니다.
            <em style="font-style:normal; color:var(--brand-primary); font-weight:600;">
              배처럼 달콤하고 슴슴한 우리만의 기록</em>이 시작돼요.
          </p>
          <button type="button" class="btn btn--brand btn--block">앱 설치하고 함께하기</button>
          <div class="invite-preview" role="group" aria-label="초대 미리보기">
            <span class="invite-preview__thumb" aria-hidden="true"></span>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <span class="headline">두비님이 초대했어요</span>
              <span class="footnote">pairchive.app/invite/duvi</span>
            </div>
          </div>
        </article>
      </main>`;
  }

  /* =====================================================================
     Screen registry (in flow order)
     ===================================================================== */
  window.PAIRCHIVE_SCREENS = [
    { key: 'onboardingDim', label: '① 온보딩 (Dim)', desc: '기본 책 1권이 꽂힌 상태에서 화면 전체를 어둡게 처리하고 코치마크 3단계로 핵심 기능을 학습시킵니다.', render: onboardingDim },
    { key: 'home',          label: '② 홈 (책장)',    desc: '간직된 책(위층) + 진행 중 책(아래층) + ＋ 버튼으로 다층 책장을 구성합니다.', render: home },
    { key: 'newBook',       label: '③ 책 만들기',    desc: '1인 / 페어를 고르고 카테고리·종료일·초대 여부까지 한 화면에서 설정합니다.', render: newBook },
    { key: 'pairHub',       label: '④ 페어 탭',      desc: '받은 / 보낸 / 진행 중 짝꿍을 한 곳에서 관리하는 초대장 허브입니다.', render: pairHub },
    { key: 'bookDetail',    label: '⑤ 책 상세',      desc: '진행 중인 책의 링크 목록과 이모지 리액션, 종료까지 남은 시간을 보여줍니다.', render: bookDetail },
    { key: 'shareSheet',    label: '⑥ 공유시트',     desc: '앱을 켜지 않고도 어떤 책에 링크를 넣을지 고를 수 있는 외부 공유 시트입니다.', render: shareSheet },
    { key: 'notifications', label: '⑦ 알림 센터',    desc: '리액션 / 새 링크 / D-3 종료 경고 / 와 모먼트를 한 줄로 묶은 알림 화면입니다.', render: notifications },
    { key: 'reportCard',    label: '⑧ 리포트',       desc: '책이 종료되면 자동 생성되는 한 달 리캡 이미지입니다.', render: reportCard },
    { key: 'wowMoment',     label: '⑨ 와우 모먼트',  desc: '리포트 확인 후 메인으로 돌아오면 새 책이 위층 책장에 스르륵 꽂히는 연출입니다.', render: wowMoment },
    { key: 'bookSettings',  label: '⑩ 책 설정',      desc: '둘 다 책 정보를 수정할 수 있고, 중도 탈퇴 시 자동 복사 정책을 명시합니다.', render: bookSettings },
    { key: 'lockNoti',      label: '⑪ 잠금 알림',    desc: '잠금 화면에 떠오르는 페어카이브 알림 컴포넌트입니다.', render: lockNoti },
    { key: 'archivedBook',  label: '⑫ 간직된 책',    desc: '책이 덮힌 후 읽기 전용 폴더 + "새 책 이어 만들기" 유도가 들어갑니다.', render: archivedBook },
    { key: 'invite',        label: '⑬ 초대 페이지',  desc: '메신저에서 열리는 초대 링크 웹 페이지입니다.', render: invite },
  ];

  /* =====================================================================
     Per-screen post-mount binders
     ===================================================================== */
  window.PAIRCHIVE_BINDERS = {
    onboardingDim(container) {
      const coach = container.querySelector('#coach');
      if (!coach) return;
      const steps = coach.querySelectorAll('.coach__step');

      function go(n) {
        const next = Math.min(Math.max(n, 1), steps.length);
        steps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === next));
        coach.dataset.step = String(next);
      }

      coach.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-coach]');
        if (!btn) return;
        const action = btn.dataset.coach;
        const cur = Number(coach.dataset.step) || 1;
        if (action === 'next')   go(cur + 1);
        if (action === 'back')   go(cur - 1);
        if (action === 'skip' || action === 'finish') {
          coach.classList.add('is-dismissed');
          setTimeout(() => coach.remove(), 320);
        }
      });
    },
  };
})();
