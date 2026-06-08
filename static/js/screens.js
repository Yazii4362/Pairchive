/* Screen templates · HIG-aligned
 *
 * Each screen returns a string that includes (when appropriate):
 *  - <header class="nav-bar">  iOS UINavigationBar pattern
 *  - <main class="screen">     scroll content area
 *  - <nav class="tab-bar">     iOS UITabBar (where the app has bottom tabs)
 *
 * All interactive elements use <button>, have an accessible name,
 * and meet the 44pt minimum touch target via .btn / .option-item / .nav-bar__btn.
 */
(function () {
  const data = window.PAIRCHIVE_DATA;

  /* -------- helpers --------------------------------------------------- */
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
      <header class="nav-bar" role="navigation" aria-label="${title} 화면 네비게이션">
        <div class="nav-bar__side">${leading}</div>
        <div class="nav-bar__title">${title}</div>
        <div class="nav-bar__side" style="justify-content:flex-end;">${trailing}</div>
      </header>`;
  }

  function backBtn(label = '뒤로') {
    return `
      <button type="button" class="nav-bar__btn" aria-label="${label}">
        ${sfBack}<span>뒤로</span>
      </button>`;
  }

  function actionBtn(label, aria) {
    return `
      <button type="button" class="nav-bar__btn" aria-label="${aria || label}">${label}</button>`;
  }

  function tag(label) {
    return `<span class="tag-pill">${label}</span>`;
  }

  function tagRow(labels) {
    return `<div class="tag-row" role="list">${labels
      .map((l) => `<span role="listitem">${tag(l)}</span>`)
      .join('')}</div>`;
  }

  /* ----- emoji reactions --------------------------------------------- */
  function reactionsRow(idScope, overrides = {}) {
    const list = (overrides.list || data.reactions).map((r, i) => `
      <button
        type="button"
        class="reaction js-reaction"
        data-scope="${idScope}"
        data-idx="${i}"
        aria-label="${r.label} 리액션, ${r.count}명"
        aria-pressed="${r.pressed ? 'true' : 'false'}"
      >
        <span class="reaction__emoji" aria-hidden="true">${r.emoji}</span>
        ${r.count > 0
          ? `<span class="reaction__count">${r.count}</span>`
          : ''}
      </button>
    `).join('');

    const peers = overrides.hidePeers
      ? ''
      : `
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
          <button
            type="button"
            class="reaction reaction--add"
            aria-label="다른 이모지로 리액션 추가"
          >
            <span class="reaction__emoji" aria-hidden="true">+</span>
          </button>
        </div>
        ${peers}
      </div>`;
  }

  function tabBar(items, activeKey) {
    const icons = {
      home: '􀎟',
      library: '􀉟',
      add: '􀅼',
      bell: '􀋙',
      gear: '􀍟',
    };
    return `
      <nav class="tab-bar" role="tablist" aria-label="앱 메인 탭">
        ${items
          .map((item) => {
            const active = item.key === activeKey;
            return `
            <button
              type="button"
              role="tab"
              class="tab-bar__item"
              aria-selected="${active}"
              aria-label="${item.label} 탭"
              tabindex="${active ? 0 : -1}"
            >
              <span class="icon" aria-hidden="true">${icons[item.icon] || '􀟈'}</span>
              <span>${item.label}</span>
            </button>`;
          })
          .join('')}
      </nav>`;
  }

  const mainTabs = [
    { key: 'home', label: '홈', icon: 'home' },
    { key: 'library', label: '서재', icon: 'library' },
    { key: 'add', label: '추가', icon: 'add' },
    { key: 'noti', label: '알림', icon: 'bell' },
    { key: 'me', label: '나', icon: 'gear' },
  ];

  /* =================================================================== */
  /* 1. Onboarding  ─ "tastify"-inspired editorial still-life            */
  /*    Two-page swipe: dark serif splash → warm beige scene             */
  /* =================================================================== */

  /* — small lamp glyph used on the dark splash page —------------------- */
  function lampGlyph(scale = 1) {
    const s = scale;
    return `
      <svg viewBox="0 0 60 64" width="${48 * s}" height="${52 * s}"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="30" cy="56" rx="20" ry="3" fill="rgba(232,90,42,0.18)"/>
        <path d="M8 32 Q8 6 30 6 Q52 6 52 32 Z" fill="#EA5C28"/>
        <path d="M8 32 L52 32 L48 36 L12 36 Z" fill="#C04619"/>
        <rect x="28" y="36" width="4" height="14" fill="#1B1612"/>
        <ellipse cx="30" cy="52" rx="11" ry="2.5" fill="#1B1612"/>
      </svg>`;
  }

  /* — big still-life SVG used on the beige scene page —----------------- */
  function stillLifeScene() {
    return `
      <svg
        class="ts-scene__svg"
        viewBox="0 0 280 460"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stop-color="#FFB87E" stop-opacity="0.45"/>
            <stop offset="60%" stop-color="#EA5C28" stop-opacity="0.10"/>
            <stop offset="100%" stop-color="#EA5C28" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="woodTop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stop-color="#B49873"/>
            <stop offset="100%" stop-color="#9E835F"/>
          </linearGradient>
          <linearGradient id="cabinet" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stop-color="#E8D6B4"/>
            <stop offset="100%" stop-color="#D8C29C"/>
          </linearGradient>
        </defs>

        <!-- Upper wall + tiny book row -->
        <g class="ts-layer ts-layer--top">
          <rect x="38" y="38" width="5" height="24" rx="1" fill="#5A4634"/>
          <rect x="45" y="32" width="6" height="30" rx="1" fill="#2C2218"/>
          <rect x="53" y="36" width="5" height="26" rx="1" fill="#8A6F4E"/>
          <rect x="60" y="28" width="7" height="34" rx="1" fill="#42321F"/>
          <rect x="69" y="34" width="5" height="28" rx="1" fill="#6B5237"/>
          <rect x="76" y="30" width="6" height="32" rx="1" fill="#A88A66"/>
          <rect x="84" y="38" width="5" height="24" rx="1" fill="#5A4634"/>
          <rect x="208" y="40" width="14" height="22" rx="1.5" fill="#5A4634"/>
          <rect x="210" y="40" width="10" height="4" fill="#2C2218"/>
          <rect x="32" y="62" width="200" height="4" rx="1" fill="url(#woodTop)"/>
        </g>

        <!-- Mid shelf with a book + dome object -->
        <g class="ts-layer ts-layer--mid">
          <rect x="58"  y="118" width="38" height="48" rx="1.5" fill="#2C2218"/>
          <rect x="62"  y="124" width="6"  height="36" fill="rgba(255,255,255,0.06)"/>
          <rect x="100" y="130" width="22" height="36" rx="1" fill="#8A6F4E"/>
          <path d="M188 166 Q188 138 208 138 Q228 138 228 166 Z" fill="#C5AB80"/>
          <ellipse cx="208" cy="166" rx="20" ry="3" fill="#9E835F"/>
          <rect x="32" y="170" width="200" height="4" rx="1" fill="url(#woodTop)"/>
        </g>

        <!-- Lamp halo (behind the lamp) -->
        <ellipse class="ts-glow" cx="140" cy="240" rx="95" ry="50" fill="url(#lampGlow)"/>

        <!-- Sideboard / platform -->
        <g class="ts-layer ts-layer--platform">
          <rect x="18" y="252" width="244" height="6"   rx="1.5" fill="url(#woodTop)"/>
          <rect x="18" y="258" width="244" height="158" fill="url(#cabinet)"/>
          <rect x="18" y="412" width="244" height="6"   rx="1.5" fill="#9E835F"/>
          <line x1="140" y1="258" x2="140" y2="412" stroke="#B49873" stroke-width="1"/>
          <rect x="76"  y="334" width="16" height="2" rx="1" fill="#9E835F"/>
          <rect x="188" y="334" width="16" height="2" rx="1" fill="#9E835F"/>
        </g>

        <!-- Turntable -->
        <g class="ts-layer ts-layer--turntable">
          <rect x="62" y="300" width="156" height="98" rx="6" fill="#F4ECDA"/>
          <rect x="62" y="300" width="156" height="6"  rx="6" fill="#E1D6BC"/>
          <circle cx="140" cy="352" r="38" fill="#161412"/>
          <circle cx="140" cy="352" r="30" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
          <circle cx="140" cy="352" r="22" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
          <circle cx="140" cy="352" r="14" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
          <circle cx="140" cy="352" r="9"  fill="#EA5C28"/>
          <circle cx="140" cy="352" r="1.8" fill="#F4ECDA"/>
          <rect x="198" y="310" width="3" height="40" rx="1.5" fill="#2C2218"
                transform="rotate(20 199.5 330)"/>
          <circle cx="208" cy="316" r="3.5" fill="#2C2218"/>
        </g>

        <!-- Hero orange dome lamp on the platform -->
        <g class="ts-layer ts-layer--lamp">
          <ellipse cx="140" cy="252" rx="32" ry="3" fill="rgba(0,0,0,0.18)"/>
          <path d="M110 250 Q110 206 140 206 Q170 206 170 250 Z" fill="#EA5C28"/>
          <path d="M110 250 L170 250 L165 256 L115 256 Z" fill="#B8431D"/>
          <path d="M120 248 Q120 214 140 214" stroke="#FFC79B" stroke-width="2"
                stroke-linecap="round" fill="none" opacity="0.7"/>
        </g>
      </svg>`;
  }

  /* — Onboarding renderer —--------------------------------------------- */
  function onboarding() {
    return `
      <main class="ts-onboarding" data-page="0" aria-label="페어카이브 온보딩">

        <!-- Page 1 : dark serif splash -->
        <section
          class="ts-page ts-page--splash"
          data-idx="0"
          role="group"
          aria-roledescription="온보딩 페이지"
          aria-label="페어카이브 소개"
        >
          <div class="ts-splash-block ts-splash-block--top">
            <h1 class="ts-wordmark js-anim">pairchive</h1>
            <p class="ts-tagline js-anim">
              우리 사이의 취향이<br/>책장 한 칸으로 쌓이는 곳
            </p>
            <p class="ts-tagline ts-tagline--meta js-anim">
              취향의 칸, 그리고 디테일
            </p>
          </div>
          <div class="ts-splash-block ts-splash-block--bottom">
            <div class="ts-splash-lamp js-anim">${lampGlyph(1)}</div>
            <p class="ts-splash-credit js-anim">인디 디자이너 페어카이브</p>
          </div>
        </section>

        <!-- Page 2 : beige still-life scene -->
        <section
          class="ts-page ts-page--scene"
          data-idx="1"
          role="group"
          aria-roledescription="온보딩 페이지"
          aria-label="페어카이브 사용 안내"
          hidden
        >
          <header class="ts-scene__copy js-anim">
            <p>우리만의 취향이 향을 선택했어요.</p>
            <p>흩어졌던 것들로 하나의 책장으로.</p>
          </header>

          <div class="ts-scene js-anim" aria-hidden="true">
            ${stillLifeScene()}
          </div>
        </section>

        <!-- Persistent footer (paging + CTA) -->
        <footer class="ts-foot">
          <ol class="ts-paging" role="tablist" aria-label="온보딩 페이지 선택">
            <li role="presentation">
              <button type="button" class="ts-dot" data-go="0"
                      role="tab" aria-selected="true"  aria-label="1 / 2 페이지"></button>
            </li>
            <li role="presentation">
              <button type="button" class="ts-dot" data-go="1"
                      role="tab" aria-selected="false" aria-label="2 / 2 페이지"></button>
            </li>
          </ol>
          <button type="button" class="ts-cta" data-action="next"
                  aria-label="다음 페이지로">
            <span class="ts-cta__label"
                  data-label-0="다음" data-label-1="페어 시작하기">다음</span>
          </button>
        </footer>
      </main>`;
  }

  /* =================================================================== */
  /* 2. Empty shelf                                                      */
  /* =================================================================== */
  function emptyShelf() {
    return `
      ${navBar({
        title: '야지의 서재',
        trailing: actionBtn('+', '링크 추가'),
      })}
      <main class="screen" aria-label="빈 서재">
        <p class="footnote js-anim text-secondary">두비와 함께</p>
        <section class="empty-state js-anim" aria-labelledby="empty-title">
          <div class="empty-state__icon" aria-hidden="true">+</div>
          <h2 id="empty-title" class="title-3">아직 링크가 없어요</h2>
          <p class="subhead">첫 번째 링크를 함께 쌓아봐요.</p>
        </section>
        <button type="button" class="btn btn--dark btn--block js-anim">
          링크 추가하기
        </button>
        <button type="button" class="btn btn--plain btn--block js-anim">
          페어에게 초대 링크 보내기
        </button>
      </main>
      ${tabBar(mainTabs, 'library')}`;
  }

  /* =================================================================== */
  /* 3. Shelf                                                            */
  /* =================================================================== */
  function shelf() {
    const topReactions = ['🔥', '💡', '🫶'];
    const cards = data.links
      .map(
        (item, i) => `
        <article class="shelf-card js-anim">
          <button type="button" class="shelf-card__main"
                  aria-label="${item.title} 상세 보기">
            <span class="shelf-card__thumb" style="background:${item.accentColor}" aria-hidden="true"></span>
            <span class="shelf-card__body">
              <span class="shelf-card__title">${item.title}</span>
              <span class="shelf-card__meta">${item.subtitle}</span>
              <span class="shelf-card__desc">${item.description}</span>
              ${tagRow(item.tags)}
            </span>
          </button>
          <footer class="shelf-card__footer" aria-label="리액션 요약">
            <span class="reaction-summary" aria-hidden="true">
              ${topReactions.map((e) => `<span class="reaction-summary__dot">${e}</span>`).join('')}
            </span>
            <span class="reaction-summary__text">두비 외 ${4 + i}명</span>
          </footer>
        </article>`
      )
      .join('');

    return `
      ${navBar({
        title: '서재',
        leading: actionBtn('편집', '서재 편집'),
        trailing: actionBtn('+', '링크 추가'),
      })}
      <main class="screen" aria-label="서재 목록">
        <header class="js-anim" style="display:flex; flex-direction:column; gap:6px;">
          <h1 class="title-1">야지의 서재</h1>
          <p class="subhead">함께 쌓인 링크를 한 권으로</p>
        </header>
        <div
          class="segmented js-anim"
          role="tablist"
          aria-label="태그 필터"
          style="align-self:flex-start;"
        >
          <button class="segmented__btn" role="tab" aria-selected="true" type="button">전체</button>
          <button class="segmented__btn" role="tab" aria-selected="false" type="button">디자인</button>
          <button class="segmented__btn" role="tab" aria-selected="false" type="button">영상</button>
          <button class="segmented__btn" role="tab" aria-selected="false" type="button">글</button>
        </div>
        <section style="display:flex; flex-direction:column; gap:12px;" aria-label="링크 카드 목록">
          ${cards}
        </section>
      </main>
      ${tabBar(mainTabs, 'library')}`;
  }

  /* =================================================================== */
  /* 4. Reading                                                          */
  /* =================================================================== */
  function reading() {
    return `
      ${navBar({
        title: '진행 중 책',
        leading: backBtn(),
        trailing: actionBtn('···', '더 보기'),
      })}
      <main class="screen" aria-label="현재 읽는 링크">
        <div class="js-anim" style="display:flex; justify-content:space-between; align-items:center;">
          <span class="eyebrow">PAIR · 진행 중</span>
          <span class="text-secondary footnote" style="font-weight:600;">읽는 중</span>
        </div>
        <article class="reader-card js-anim">
          <span class="reader-card__thumb" aria-hidden="true"></span>
          <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
            <h2 class="title-3">선형 대수학의 직관적 이해</h2>
            <p class="shelf-card__meta">youtube.com · 23분 전</p>
            <p class="callout">행렬 변환과 시각화의 핵심을 정리하며, 한 번에 반응을 남겨보세요.</p>
          </div>
        </article>
        ${reactionsRow('reading')}
      </main>`;
  }

  /* =================================================================== */
  /* 5. Capture                                                          */
  /* =================================================================== */
  function capture() {
    return `
      ${navBar({
        title: '링크 저장',
        leading: actionBtn('취소', '저장 취소'),
        trailing: actionBtn('저장', '링크 저장 완료'),
      })}
      <main class="screen screen--grouped" aria-label="링크 저장 미리보기">
        <p class="subhead js-anim">지금 읽는 페이지를 페어카이브에 쌓아보세요.</p>

        <article class="capture-card js-anim">
          <span class="capture-card__thumb" aria-hidden="true"></span>
          <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
            <h2 class="title-3">선형 대수학의 직관적 이해</h2>
            <p class="shelf-card__meta">youtube.com · 23분 전</p>
            ${tagRow(['수학', '영상'])}
          </div>
        </article>

        <section class="sheet js-anim" aria-label="저장 위치 선택 시트">
          <span class="sheet__handle" aria-hidden="true"></span>
          <h3 class="sheet__title">링크를 어느 서재에 저장할까요?</h3>
          <button type="button" class="btn btn--filled btn--block">야지의 서재에 저장</button>
          <button type="button" class="btn btn--gray btn--block">1인 모드로 저장</button>
        </section>
      </main>`;
  }

  /* =================================================================== */
  /* (removed) 6. Comment screen                                          */
  /*  →  Replaced by inline emoji reactions across every relevant screen. */
  /* =================================================================== */

  /* =================================================================== */
  /* 7. Close book                                                       */
  /* =================================================================== */
  function closeBook() {
    return `
      ${navBar({
        title: '책 덮기',
        leading: backBtn(),
      })}
      <main class="screen screen--grouped" aria-label="책 덮기 완료">
        <article class="surface-card js-anim" style="display:flex; flex-direction:column; gap:12px;">
          <span class="footnote text-secondary" style="font-weight:600;">책을 덮었어요</span>
          <h1 class="title-2">선형 대수학의 직관적 이해</h1>
          <p class="footnote">읽기 완료 · 23분 전</p>
          <div class="highlight-box">
            <span class="footnote text-secondary" style="font-weight:600;">와 모먼트</span>
            <p class="callout" style="font-weight:500;">"이거 진짜 신기해, 시각화가 너무 좋다"</p>
            <p class="footnote">야지 · 23분 전</p>
          </div>
          ${reactionsRow('closeBook')}
        </article>
        <button type="button" class="btn btn--filled btn--block js-anim" style="margin-top:auto;">
          서재로 돌아가기
        </button>
      </main>`;
  }

  /* =================================================================== */
  /* 8. Wow moment                                                       */
  /* =================================================================== */
  function wowMoment() {
    return `
      ${navBar({
        title: '와 모먼트',
        leading: actionBtn('닫기', '와 모먼트 닫기'),
        trailing: actionBtn('공유', '와 모먼트 공유'),
      })}
      <main class="screen screen--grouped" aria-label="와 모먼트">
        <div class="js-anim" style="display:flex; align-items:center; gap:8px;">
          <span class="badge">NEW</span>
          <span class="footnote text-secondary">오늘의 와 모먼트</span>
        </div>
        <article class="moment-card js-anim">
          <p class="moment-quote">"이거 진짜 신기해, 시각화가 너무 좋다"</p>
          <p class="footnote">야지 · 23분 전</p>
          ${reactionsRow('wow')}
        </article>
        <button type="button" class="btn btn--filled btn--block js-anim">서재로 돌아가기</button>
      </main>`;
  }

  /* =================================================================== */
  /* 9. Report card                                                      */
  /* =================================================================== */
  function reportCard() {
    return `
      ${navBar({
        title: '리포트',
        trailing: actionBtn('공유', '리포트 공유'),
      })}
      <main class="screen" aria-label="월간 리포트">
        <h1 class="title-1 js-anim">5월 리포트</h1>
        <section class="stat-row js-anim" aria-label="요약 통계">
          <div class="stat-box">
            <span class="stat-number">12</span>
            <span class="footnote">함께 읽은 링크</span>
          </div>
          <div class="stat-box">
            <span class="stat-number">8</span>
            <span class="footnote">책 덮기</span>
          </div>
        </section>
        ${`<div class="js-anim">${tagRow(['디자인', '수학', '영상'])}</div>`}
        <article class="summary-card js-anim">
          <span class="eyebrow">이달의 와 모먼트</span>
          <p class="title-3" style="font-weight:500;">
            "이거 진짜 신기해, 시각화가 너무 좋다"
          </p>
          <p class="footnote">야지 · 23분 전</p>
        </article>
      </main>`;
  }

  /* =================================================================== */
  /* 10. Archived book                                                   */
  /* =================================================================== */
  function archivedBook() {
    return `
      ${navBar({
        title: '간직된 책',
        leading: backBtn(),
      })}
      <main class="screen screen--grouped" aria-label="간직된 책 상세">
        <span class="footnote text-secondary js-anim" style="font-weight:600;">읽기 전용</span>
        <article class="archived-card js-anim">
          <div class="archived-thumb" aria-hidden="true"></div>
          <h2 class="title-3">선형 대수학의 직관적 이해</h2>
          <p class="footnote">youtube.com · 2025.05.22 덮음</p>
          <span class="eyebrow" style="margin-top:6px;">와 모먼트</span>
          <p class="callout" style="font-weight:500;">"이거 진짜 신기해, 시각화가 너무 좋다"</p>
          <p class="footnote">야지 · 23분 전</p>
        </article>
        <section class="js-anim" style="display:flex; flex-direction:column; gap:10px;" aria-label="리액션 미리보기">
          <p class="headline">우리 페어의 반응</p>
          ${reactionsRow('archived', { hidePeers: false })}
        </section>
      </main>`;
  }

  /* =================================================================== */
  /* 11. Settings                                                        */
  /* =================================================================== */
  function settings() {
    const item = (label, opts = {}) => `
      <button type="button" class="option-item ${opts.destructive ? 'option-item--destructive' : ''}"
              aria-label="${label}">
        <span>${label}</span>
        <span class="option-item__chevron" aria-hidden="true">${opts.destructive ? '' : sfChevron}</span>
      </button>`;

    return `
      ${navBar({ title: '설정' })}
      <main class="screen screen--grouped" aria-label="설정">
        <section class="profile-card js-anim" aria-label="프로필">
          <div class="profile-avatar" aria-hidden="true">야</div>
          <div style="flex:1;">
            <p class="headline">야지</p>
            <p class="footnote">@yaji</p>
          </div>
          <span class="option-item__chevron" aria-hidden="true">${sfChevron}</span>
        </section>

        <section class="js-anim" aria-labelledby="pair-section">
          <p id="pair-section" class="eyebrow" style="padding:0 4px 8px;">페어</p>
          <div class="option-list">
            ${item('페어 관리')}
            ${item('알림 설정')}
          </div>
        </section>

        <section class="js-anim" aria-labelledby="library-section">
          <p id="library-section" class="eyebrow" style="padding:0 4px 8px;">서재</p>
          <div class="option-list">
            ${item('1인 모드 전환')}
            ${item('데이터 내보내기')}
          </div>
        </section>

        <section class="js-anim" aria-label="계정">
          <div class="option-list">
            ${item('로그아웃', { destructive: true })}
          </div>
        </section>
      </main>
      ${tabBar(mainTabs, 'me')}`;
  }

  /* =================================================================== */
  /* 12. Solo empty shelf                                                */
  /* =================================================================== */
  function soloEmptyShelf() {
    return `
      ${navBar({
        title: '야지의 서재',
        trailing: actionBtn('+', '링크 추가'),
      })}
      <main class="screen" aria-label="1인 모드 빈 서재">
        <p class="footnote js-anim">1인 모드</p>
        <section class="empty-state js-anim" aria-labelledby="solo-title">
          <div class="empty-state__icon empty-state__icon--solid" aria-hidden="true">+</div>
          <h2 id="solo-title" class="title-3">지금은 나만의 서재</h2>
          <p class="subhead">나만의 링크를 쌓아두고, 언제든 페어를 초대할 수 있어요.</p>
        </section>
        <button type="button" class="btn btn--filled btn--block js-anim">링크 추가하기</button>
        <button type="button" class="btn btn--plain btn--block js-anim">페어 초대하기</button>
      </main>
      ${tabBar(mainTabs, 'library')}`;
  }

  /* =================================================================== */
  /* 13. Notification lock                                               */
  /* =================================================================== */
  function notificationLock() {
    return `
      <main class="lock-screen" aria-label="잠금 화면 알림">
        <p class="lock-time js-anim" aria-label="현재 시각">9:41</p>
        <p class="lock-date js-anim">2025년 5월 22일 목요일</p>
        <section aria-label="알림 목록">
          <div class="lock-notification js-anim" role="article">
            <p class="lock-notification__title">두비님이 링크를 추가했어요</p>
            <p class="lock-notification__body">Figma Variables 완벽 가이드 — 야지의 서재</p>
          </div>
          <div class="lock-notification js-anim" role="article">
            <p class="lock-notification__title">두비님이 댓글을 남겼어요</p>
            <p class="lock-notification__body">"이거 행렬 변환 부분 너무 신기하지 않아?"</p>
          </div>
        </section>
        <p class="lock-hint js-anim">밀어서 잠금 해제</p>
      </main>`;
  }

  /* =================================================================== */
  /* 14. Invite (web)                                                    */
  /* =================================================================== */
  function invite() {
    return `
      <main class="screen screen--grouped" style="justify-content:center;" aria-label="초대 링크 페이지">
        <article class="invite-card js-anim">
          <span class="eyebrow">PAIRCHIVE INVITE</span>
          <h1 class="title-1">두비가 보낸<br/>초대 링크</h1>
          <p class="body">
            메신저에서 받은 초대 링크를 열면 앱 설치를 유도하는 프리뷰가 표시됩니다.
            외부 사용자는 빠르게 앱을 설치하고 참여할 수 있어야 합니다.
          </p>
          <button type="button" class="btn btn--gradient btn--block">
            앱 설치하고 함께하기
          </button>
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

  /* =================================================================== */
  /* Export                                                              */
  /* =================================================================== */
  window.PAIRCHIVE_SCREENS = [
    { key: 'onboarding',     label: '온보딩',          desc: '첫 진입에서 페어카이브의 정체성과 가치 제안을 한 번에 보여주는 화면입니다.', render: onboarding },
    { key: 'emptyShelf',     label: '빈 서재',         desc: '아직 함께 쌓은 링크가 없을 때 액션을 유도하는 화면입니다.',                  render: emptyShelf },
    { key: 'shelf',          label: '다층 책장',       desc: '함께 쌓인 링크가 한 권의 책처럼 정리된 서재 화면입니다.',                    render: shelf },
    { key: 'reading',        label: '진행 중 책',      desc: '지금 함께 보고 있는 링크와 댓글 미리보기를 보여줍니다.',                     render: reading },
    { key: 'capture',        label: '캡처',            desc: '외부에서 가져온 링크를 어느 서재에 저장할지 선택하는 바텀시트입니다.',         render: capture },
    { key: 'closeBook',      label: '책 덮기',         desc: '하나의 링크를 다 읽고 마무리하면서 와 모먼트를 강조하는 화면입니다.',         render: closeBook },
    { key: 'wowMoment',      label: '와 모먼트',       desc: '인상 깊은 한 마디를 카드 형태로 부각하는 화면입니다.',                       render: wowMoment },
    { key: 'reportCard',     label: '리포트 카드',     desc: '한 달 동안 페어와 함께한 활동 요약 화면입니다.',                             render: reportCard },
    { key: 'archivedBook',   label: '간직된 책',       desc: '덮은 책을 읽기 전용 형태로 보관하는 아카이브 화면입니다.',                   render: archivedBook },
    { key: 'settings',       label: '설정',            desc: '계정과 페어, 서재 옵션을 관리하는 설정 화면입니다.',                         render: settings },
    { key: 'soloEmptyShelf', label: '1인 모드 빈 서재', desc: '아직 페어가 없을 때 혼자만의 서재로 사용할 수 있도록 유도합니다.',          render: soloEmptyShelf },
    { key: 'lockNoti',       label: '잠금 화면 알림',  desc: '잠금 화면에서 보이는 페어카이브 알림 컴포넌트입니다.',                       render: notificationLock },
    { key: 'invite',         label: '초대 페이지(웹)', desc: '메신저에서 열리는 초대 링크의 웹 미리보기 페이지입니다.',                     render: invite },
  ];

  /* ===================================================================
   * Per-screen post-mount binders.
   * app.js calls `PAIRCHIVE_BINDERS[key]?.(viewport)` after innerHTML
   * is swapped, so screens can wire up screen-local interactions.
   * =================================================================== */
  window.PAIRCHIVE_BINDERS = {
    /* Onboarding ─ paging dots + CTA toggles between splash & scene. */
    onboarding(container) {
      const root = container.querySelector('.ts-onboarding');
      if (!root) return;
      const pages   = root.querySelectorAll('.ts-page');
      const dots    = root.querySelectorAll('.ts-dot');
      const ctaText = root.querySelector('.ts-cta__label');
      const total   = pages.length;

      function go(idx) {
        const i = ((idx % total) + total) % total;
        pages.forEach((p, n) => {
          const active = n === i;
          p.hidden = !active;
          if (active) p.removeAttribute('aria-hidden');
          else        p.setAttribute('aria-hidden', 'true');
        });
        dots.forEach((d, n) => d.setAttribute('aria-selected', String(n === i)));
        root.dataset.page = String(i);
        if (ctaText) {
          ctaText.textContent =
            ctaText.dataset[`label${i}`] || ctaText.textContent;
        }

        // Re-run subtle entrance animation on newly visible page
        if (typeof window.gsap !== 'undefined' &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const fresh = pages[i].querySelectorAll('.js-anim');
          if (fresh.length) {
            window.gsap.from(fresh, {
              opacity: 0, y: 18,
              duration: 0.6, ease: 'power3.out', stagger: 0.06,
            });
          }
        }
      }

      root.addEventListener('click', (e) => {
        const dot = e.target.closest('[data-go]');
        if (dot) { go(parseInt(dot.dataset.go, 10)); return; }
        const next = e.target.closest('[data-action="next"]');
        if (next) {
          const cur = parseInt(root.dataset.page, 10) || 0;
          go(cur + 1);
        }
      });

      // Soft pulsing glow under the lamp (page 2)
      if (typeof window.gsap !== 'undefined' &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const glow = root.querySelector('.ts-glow');
        if (glow) {
          window.gsap.to(glow, {
            opacity: 0.55, scale: 1.05, transformOrigin: '50% 50%',
            duration: 2.4, ease: 'sine.inOut',
            yoyo: true, repeat: -1,
          });
        }
      }
    },
  };
})();
