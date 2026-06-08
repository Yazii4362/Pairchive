/**
 * 10 · 잠금 화면 알림 (deep link)
 */
export default {
  id: 'lock-noti',
  label: '잠금 화면 알림',
  group: 'extra',
  scheme: 'dark',

  render() {
    return /* html */ `
      <section class="screen screen--lock-noti">
        <p class="lock-date">2025년 4월 18일 목요일</p>
        <p class="lock-time">9:41</p>

        <section class="lock-notif-stack" aria-label="알림">
          <article class="lock-notif" role="article">
            <div class="lock-notif__icon" aria-hidden="true">P</div>
            <div class="lock-notif__body">
              <div class="lock-notif__head">
                <span class="lock-notif__app">Pairchive</span>
                <span class="lock-notif__time">지금</span>
              </div>
              <p class="lock-notif__title">두비가 새 페이지를 끼웠어요</p>
              <p class="lock-notif__msg">
                Film · April 2025 책에 “선형 대수학의 직관적 이해” 한 줄이 들어왔어요.
              </p>
            </div>
          </article>

          <article class="lock-notif" role="article">
            <div class="lock-notif__icon" aria-hidden="true">P</div>
            <div class="lock-notif__body">
              <div class="lock-notif__head">
                <span class="lock-notif__app">Pairchive</span>
                <span class="lock-notif__time">3분 전</span>
              </div>
              <p class="lock-notif__title">두비가 🔥 로 반응했어요</p>
              <p class="lock-notif__msg">
                “행렬은 결국 공간을 어떻게 비트는지에 대한 이야기였다.”
              </p>
            </div>
          </article>

          <article class="lock-notif lock-notif--stacked" role="article" aria-hidden="true">
            <div class="lock-notif__icon">P</div>
            <div class="lock-notif__body">
              <div class="lock-notif__head">
                <span class="lock-notif__app">Pairchive</span>
                <span class="lock-notif__time">어제</span>
              </div>
              <p class="lock-notif__title">와우 모먼트가 한 권에 쌓였어요</p>
            </div>
          </article>
        </section>

        <div class="lock-foot">
          <div class="lock-foot__icons">
            <span class="lock-foot__icon" aria-label="플래시" title="플래시">🔦</span>
            <span class="lock-foot__icon" aria-label="카메라" title="카메라">📷</span>
          </div>
          <span style="opacity:0.55; font-size:12px;">밀어서 페어카이브로 이동</span>
        </div>
      </section>
    `;
  },
};
