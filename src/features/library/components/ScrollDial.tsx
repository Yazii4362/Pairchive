import { useEffect, useRef, useState } from 'react';

export interface ScrollDialItem {
  /** 스크롤 타겟 — DOM 의 id="book-{id}" 와 매칭. */
  id: string;
  /** 메인 라벨. 예: "2026년 6월" — 다이얼이 시간 축임을 알려줌. */
  label: string;
  /** 보조 라벨. 예: 책 제목. 풍선 안에서 굵게 보조 표시. */
  sub?: string;
}

interface ScrollDialProps {
  items: ScrollDialItem[];
}

/**
 * ChatGPT 채팅창의 우측 미니맵을 차용한 "시간 다이얼".
 *
 * 인터랙션 시나리오:
 *   1) 평소에는 ticks 가 흐릿하게(opacity 0.35) 우측에 부유.
 *   2) 마우스가 우측 hover-zone 에 진입하면 ticks 가 또렷해지고,
 *      **마우스 Y 위치에서 가까운 tick 일수록 길이/명도가 자기장처럼 강화**됩니다.
 *      (거리 0 → 최대 강조, 거리 5+ → 기본)
 *   3) 동시에 좌측에 floating 라벨 풍선이 **마우스 Y 를 부드럽게 따라** 움직입니다.
 *      라벨에는 "2026년 6월" 같은 시간 축 라벨 + 책 제목 보조 라벨.
 *   4) 클릭하면 그 tick 의 책으로 viewport 중앙 smooth scroll.
 *
 * 가시성:
 *   - hover-zone 은 우측 14rem 폭의 투명 영역(pointer-events 살아있음).
 *   - 키보드 포커스로 tick 버튼에 들어가도 다이얼이 펼쳐지도록 focus-within 도 트리거.
 *
 * 활성 마킹:
 *   - IntersectionObserver 가 viewport 중앙 띠를 관찰해, 현재 화면 중앙의 책을
 *     activeIndex 로 마킹. 평소 가장 또렷한 tick = 지금 보고 있는 책.
 *
 * 책이 많아도 leak 되지 않도록:
 *   - track 자체에 max-h-[680px] 을 두고 `justify-between` 으로 균등 배치.
 *     수십~수백 권이어도 다이얼은 항상 한 화면에 들어옴.
 */
export function ScrollDial({ items }: ScrollDialProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /** wrapper 기준의 마우스 Y — 라벨 풍선이 따라가는 좌표. */
  const [labelY, setLabelY] = useState<number | null>(null);

  /* ─── viewport 중앙 책 추적: 다이얼의 "현재 위치" 핀 ─── */
  useEffect(() => {
    if (items.length === 0) return;
    const targets = items
      .map((item) => document.getElementById(`book-${item.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = activeIndex;
        let bestRatio = -Infinity;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const targetId = entry.target.id.replace(/^book-/, '');
          const idx = items.findIndex((i) => i.id === targetId);
          if (idx < 0) continue;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        }
        setActiveIndex(bestIdx);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.01, 0.05, 0.1] },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items, activeIndex]);

  /* ─── 마우스 트래킹: tick 강조 + 라벨 풍선 위치 ─── */
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!trackRef.current || !wrapperRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    // 트랙 안에서의 Y 비율 → 가장 가까운 tick index
    const yInTrack = e.clientY - trackRect.top;
    const ratio = Math.max(0, Math.min(1, yInTrack / Math.max(trackRect.height, 1)));
    const idx = Math.min(
      items.length - 1,
      Math.max(0, Math.round(ratio * (items.length - 1))),
    );

    setHoveredIndex(idx);
    setLabelY(e.clientY - wrapperRect.top);
  }

  function onLeave() {
    setOpen(false);
    setHoveredIndex(null);
    setLabelY(null);
  }

  function onItemClick(idx: number) {
    const item = items[idx];
    if (!item) return;
    const el = document.getElementById(`book-${item.id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveIndex(idx);
  }

  if (items.length === 0) return null;

  const focusedIdx = hoveredIndex ?? activeIndex;
  const focusedItem = items[focusedIdx];

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      onFocus={() => setOpen(true)}
      onBlur={onLeave}
      className="pointer-events-auto fixed inset-y-0 right-0 z-20 flex w-14 items-center justify-end focus-within:[&_ol]:opacity-100"
      aria-label="라이브러리 시간 다이얼"
    >
      {/* 다이얼 트랙 — 균등 분포로 권수에 무관하게 한 화면에 수용 */}
      <ol
        ref={trackRef}
        className={
          'flex h-[min(72vh,680px)] flex-col items-end justify-between py-2 pr-3 transition-opacity duration-200 ' +
          (isOpen ? 'opacity-100' : 'opacity-60')
        }
      >
        {items.map((item, i) => {
          const dist = hoveredIndex != null ? Math.abs(i - hoveredIndex) : Infinity;
          const isActive = i === activeIndex;
          const isFocusedTick = dist === 0;

          // 마우스 거리 → 자기장 보간 (0~1)
          const t = Math.max(0, 1 - dist / 5);
          // 평상시 6px, hover-zone 진입 시 8px + 자기장 12px → 최대 20px
          const width = isOpen ? 8 + t * 12 : isActive ? 10 : 6;
          // 평상시 0.35, hover-zone 진입 시 0.45 + 자기장 0.55 → 최대 1.0
          const opacity = isOpen ? 0.45 + t * 0.55 : isActive ? 0.75 : 0.35;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onItemClick(i)}
                aria-label={`${item.label}${item.sub ? ' · ' + item.sub : ''}`}
                aria-current={isActive}
                style={{ width: `${width}px`, opacity }}
                className={
                  'block h-[2px] rounded-full outline-none transition-[width,background-color,opacity] duration-150 ease-out focus-visible:opacity-100 ' +
                  (isFocusedTick
                    ? 'bg-stone-900'
                    : isActive
                      ? 'bg-stone-800'
                      : 'bg-stone-500')
                }
              />
            </li>
          );
        })}
      </ol>

      {/* Floating 라벨 풍선 — 마우스 Y 를 부드럽게 따라옴.
          translate-y-1/2 + top:{labelY} 로 마우스 위치에 정확히 중앙 정렬. */}
      {isOpen && focusedItem && labelY != null && (
        <div
          className="pointer-events-none absolute right-14 z-10 -translate-y-1/2 transition-[top] duration-100 ease-out"
          style={{ top: `${labelY}px` }}
          aria-live="polite"
        >
          <div className="rounded-xl border border-white/15 bg-stone-900/92 px-4 py-2 text-right shadow-[0_10px_28px_-10px_rgb(0_0_0_/_0.4)] backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-300">
              {focusedItem.label}
            </p>
            {focusedItem.sub && (
              <p className="mt-0.5 max-w-[220px] truncate text-[13px] font-semibold text-white">
                {focusedItem.sub}
              </p>
            )}
          </div>
          {/* 작은 화살표 꼬리 — 라벨이 tick 쪽을 가리킴 */}
          <span
            aria-hidden
            className="absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-white/15 bg-stone-900/92"
          />
        </div>
      )}
    </div>
  );
}
