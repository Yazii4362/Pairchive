import { navigateTo } from '../app.js';

/**
 * 02 · 다층 책장 — 상단 미니 칸 + 하단 메인 칸
 */
export function renderShelf() {
  const section = document.createElement('section');
  section.className = 'screen screen--shelf';
  section.dataset.scheme = 'light';
  section.innerHTML = /* html */ `
    <div class="ed-page" style="padding-top: 4px;">
      <header style="text-align:center; padding: 18px 28px 0;">
        <p class="ed-eyebrow">The Personal Curation</p>
        <h1 class="ed-title" style="margin-top: 18px;">
          THE<br/>PERSONAL<br/>CURATION
        </h1>
      </header>

      <div class="shelf-stage shelf-stage--double" aria-hidden="true" style="margin-top: 28px;">
        <div class="shelf shelf--mini" data-go="reading">
          <span class="spine spine--xshort" style="--spine:#3B2C1C;"><span class="spine__label">Essay</span></span>
          <span class="spine spine--xshort" style="--spine:#7A8C99;"><span class="spine__label">Memoir</span></span>
          <span class="spine spine--xshort" style="--spine:#A45B3A;"><span class="spine__label">Travel</span></span>
          <span class="spine spine--xshort" style="--spine:#2C3E6B;"><span class="spine__label">Poetry</span></span>
          <span class="spine spine--xshort spine--paper"><span class="spine__label">Notes</span></span>
          <span class="spine spine--xshort" style="--spine:#54473A;"><span class="spine__label">Music</span></span>
          <span class="spine spine--xshort" style="--spine:#9B2A2F;"><span class="spine__label">Photo</span></span>
        </div>
        <div class="shelf-floor"></div>

        <div class="shelf shelf--main" data-go="reading">
          <span class="spine spine--tall spine--wide" style="--spine:#D08A6F;"><span class="spine__label">Bauhaus</span></span>
          <span class="spine spine--tall" style="--spine:#A04F4A;"><span class="spine__label">In&nbsp;Paris</span></span>
          <span class="spine spine--tall" style="--spine:#E8B7A8;"><span class="spine__label">Acne</span></span>
          <span class="spine spine--xtall spine--xwide" style="--spine:#15203F;"><span class="spine__label">Design</span></span>
          <span class="spine spine--tall spine--paper"><span class="spine__label">Cosy</span></span>
          <span class="spine spine--tall" style="--spine:#B82A2F;"><span class="spine__label">Film</span></span>
          <span class="spine spine--tall spine--wide" style="--spine:#E2DCC5;"><span class="spine__label" style="color:rgba(27,22,18,0.55);">Archive</span></span>
          <span class="spine spine--tall" style="--spine:#5D442B;"><span class="spine__label">Current</span></span>
        </div>
        <div class="shelf-floor"></div>
      </div>
    </div>

    <footer class="ed-footer">
      <div class="ed-paging" role="tablist" aria-label="카테고리 페이지">
        <span class="ed-paging__dot"></span>
        <span class="ed-paging__dot" aria-current="true"></span>
        <span class="ed-paging__dot"></span>
        <span class="ed-paging__dot"></span>
      </div>
      <p class="ed-section-label" style="margin: 4px 0 0;">FILM · 12권</p>
    </footer>
  `;

  section.querySelectorAll('[data-go]').forEach((el) =>
    el.addEventListener('click', () => navigateTo(el.dataset.go))
  );
  return section;
}
