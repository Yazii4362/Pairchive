import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronUp, Lock } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(Observer, ScrollToPlugin, useGSAP);

interface PullUpHandleProps {
  /**
   * locked = 잠긴 상태(첫 책 완성 전).
   *   - 카피/아이콘이 자물쇠 톤으로 바뀜.
   *   - 페이지에서 floor-2 자체가 안 그려지므로, 이 핸들이 곧 페이지의 천장.
   *     → 클릭/드래그업은 어디로도 가지 않는 no-op (스크롤 더 위가 존재하지 않음).
   *     → 드래그다운은 그대로 #floor-1 에 도킹 (방향 일관성).
   */
  locked?: boolean;
}

/**
 * "위 책장(=2F · 간직한 책) 끌어내려 보기" 어포던스.
 *
 * GSAP 기반 인터랙션:
 *   1) 클릭        → power3.inOut 으로 #floor-2 까지 0.6s 부드럽게 스크롤
 *   2) 드래그 업/다운 → Observer 가 방향 잡아 #floor-2 / #floor-1 자동 도킹
 *   3) 트랙패드/휠은 기본 스크롤 동작 그대로 — 우리가 가로채지 않음
 *
 * 잠금(locked) 상태일 때:
 *   - 페이지가 floor-2 자체를 DOM 에 넣지 않으므로, 위로 갈 곳이 없음.
 *   - 클릭/드래그업은 no-op. 사용자는 lock 아이콘 + "곧 열려요" 카피로
 *     "여기까지가 한계" 라는 사실을 시각적으로 학습.
 *
 * iOS 러버밴딩 회피:
 *   - window 스크롤을 ScrollToPlugin 으로만 제어, 직접 scrollY 조작 X.
 *   - touchAction:'none' 으로 핸들 위 기본 패닝 차단.
 */
export function PullUpHandle({ locked = false }: PullUpHandleProps) {
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const [dragging, setDragging] = useState(false);
  // locked 값을 최신 상태로 ref 에 동기화 — Observer 콜백이 stale closure 를 잡지 않도록.
  const lockedRef = useRef(locked);
  lockedRef.current = locked;

  useGSAP(
    () => {
      const el = handleRef.current;
      if (!el) return;

      const observer = Observer.create({
        target: el,
        type: 'touch,pointer',
        dragMinimum: 10,
        onUp: () => {
          if (lockedRef.current) return; // 잠김 → 갈 곳 없음
          gsap.to(window, {
            scrollTo: { y: '#floor-2', offsetY: 24 },
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onDown: () => {
          // 1F 로 내려가는 동작은 잠김과 무관하게 항상 허용.
          gsap.to(window, {
            scrollTo: { y: '#floor-1', offsetY: 0 },
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onPress: () => setDragging(true),
        onRelease: () => setDragging(false),
        tolerance: 4,
      });

      return () => observer.kill();
    },
    { scope: handleRef },
  );

  function onClick() {
    if (locked) return; // 잠김 → 갈 곳 없음
    gsap.to(window, {
      scrollTo: { y: '#floor-2', offsetY: 24 },
      duration: 0.6,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
  }

  return (
    <div className="mb-8 flex justify-center">
      <button
        type="button"
        ref={handleRef}
        onClick={onClick}
        aria-label={
          locked
            ? '곧 열릴 위 책장 미리 보기'
            : '위 책장(간직한 책) 보기'
        }
        className="group inline-flex select-none flex-col items-center gap-1.5 px-3 py-2 transition-colors focus-visible:outline-none"
        style={{ touchAction: 'none', cursor: 'grab' }}
      >
        {locked ? (
          <Lock
            size={12}
            strokeWidth={1.5}
            className={
              'transition-colors ' +
              (dragging ? 'text-fg-muted' : 'text-fg-subtle')
            }
            aria-hidden
          />
        ) : (
          <ChevronUp
            size={14}
            strokeWidth={1.5}
            className={
              'transition-transform ' +
              (dragging
                ? '-translate-y-0.5 text-fg'
                : 'text-fg-subtle group-hover:-translate-y-0.5 group-hover:text-fg-muted')
            }
            aria-hidden
          />
        )}

        {/* 핸들 필 — 책장 위로 잡아당기는 단서 */}
        <span
          className={
            'block h-[3px] w-6 rounded-full transition-colors ' +
            (dragging ? 'bg-fg-muted' : 'bg-border-strong group-hover:bg-fg-subtle')
          }
          aria-hidden
        />

        <span
          className={
            'font-serif text-[10px] tracking-wide transition-colors ' +
            (dragging ? 'text-fg-muted' : 'text-fg-subtle')
          }
        >
          {locked ? '곧 열려요' : '간직한 책 보기'}
        </span>
      </button>
    </div>
  );
}
