import { navigateTo } from '../app.js';

/**
 * 04 · 캡처 — 호스트 앱(Safari) 위에 Pairchive 시트
 */
export function renderCapture() {
  const section = document.createElement('section');
  section.className = 'screen screen--capture';
  section.dataset.scheme = 'dark';
  section.innerHTML = /* html */ `
    <div class="web-chrome" role="region" aria-label="Safari 주소창">
      <span aria-hidden="true" style="opacity:0.6;">‹</span>
      <span class="web-chrome__pill">youtube.com/watch?v=fNk_zzaMoSs</span>
      <span aria-hidden="true" style="opacity:0.6;">⋯</span>
    </div>

    <div class="capture-body">
      <section class="capture-sheet" aria-label="Pairchive에 꽂기">
        <span class="sheet-handle" aria-hidden="true"
              style="align-self:center; width:38px; height:5px; border-radius:99px; background: rgba(27,22,18,0.18);"></span>
        <p class="ed-script" style="margin-top: 4px;">
          <em>Pairchive</em>에&nbsp;꽂기
        </p>

        <article class="link-tile">
          <span class="link-tile__thumb" style="--thumb:#15203F;" aria-hidden="true"></span>
          <div class="link-tile__body">
            <p class="link-tile__domain">youtube.com</p>
            <h2 class="link-tile__title">선형 대수학의 직관적 이해 — 3Blue1Brown</h2>
          </div>
        </article>

        <div class="ed-field">
          <label class="ed-field-label" for="capture-memo">왜 이 페이지를 끼웠어?</label>
          <input id="capture-memo" class="ed-input" type="text" placeholder="“행렬을 비로소 이해했어”" aria-label="왜 끼웠는지" />
        </div>

        <div class="ed-field">
          <p class="ed-field-label">어느 책의 어느 칸에?</p>
          <div class="chip-row">
            <button type="button" class="chip" aria-pressed="true">Film · April</button>
            <button type="button" class="chip" aria-pressed="false">Design</button>
            <button type="button" class="chip" aria-pressed="false">Notes</button>
            <button type="button" class="chip chip--add" aria-label="새 칸 만들기">+</button>
          </div>
        </div>

        <button type="button" class="ed-btn ed-btn--block" data-go="reading">우리 책에 꽂기</button>
      </section>
    </div>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
