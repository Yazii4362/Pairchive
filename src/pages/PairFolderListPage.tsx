import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ChevronsRight } from 'lucide-react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LibraryUnlockedBanner } from '@/features/pair-folder/components/LibraryUnlockedBanner';
import { PullUpHandle } from '@/features/pair-folder/components/PullUpHandle';
import { ShelfRow } from '@/features/pair-folder/components/ShelfRow';
import { mockActiveFolders, mockLibraryFolders } from '@/lib/mockData';
import { paths } from '@/routes/paths';
import { useAppStore } from '@/store/useAppStore';

/**
 * "책장" 탭 (= 메인 홈) — 2층 책장 + 점진적 잠금 해제.
 *
 * 상태 머신 (store):
 *   LOCKED          : !hasCompletedFirstBook                       → 2F 자체를 렌더하지 않음
 *   UNLOCK_PENDING  : hasCompletedFirstBook && !firstBookUnlockSeen → 진입 시 1회 배너 + ShelfRow
 *   UNLOCKED        : hasCompletedFirstBook && firstBookUnlockSeen  → ShelfRow (정상)
 *
 * 1F = 항상 존재.
 *   - "나만의 폴더" 가 앱 초기화 시점에 보장되므로 active === 0 상태는 없습니다.
 *   - 빈 상태 UI / 안내 카드를 따로 그리지 않습니다.
 *
 * 진입 모델:
 *   - useLayoutEffect 가 #floor-1 위치로 인스턴트 점프 → 1F 가 첫 화면
 *   - 1F 책등들 stagger 진입 (60px / power3.out / stagger 0.06)
 *   - 잠금 상태(=LOCKED) 에서는 PullUpHandle 의 잠금 인디케이터(Lock + "곧 열려요") 가
 *     사실상 페이지의 천장이 되도록 floor-2 영역 자체를 DOM 에서 빼버립니다.
 *     → 사용자가 위로 스크롤하더라도 PullUpHandle 위로는 더 노출되지 않음 (자연스러운 한계).
 *
 * 첫 책 완성 시점의 알림은 두 갈래로 갈라집니다:
 *   1) "즉시"      → FirstBookCompletionModal (AppShell 에 전역 렌더, 어디서나 뜸)
 *   2) "다음 진입" → 이 페이지의 LibraryUnlockedBanner (1F 헤더 위, 4초 fade)
 */
export default function PairFolderListPage() {
  const active = mockActiveFolders;
  const library = mockLibraryFolders;

  const hasCompletedFirstBook = useAppStore((s) => s.hasCompletedFirstBook);
  const firstBookUnlockSeen = useAppStore((s) => s.firstBookUnlockSeen);
  const setFirstBookUnlockSeen = useAppStore((s) => s.setFirstBookUnlockSeen);

  const libraryView: 'locked' | 'unlocked' = hasCompletedFirstBook
    ? 'unlocked'
    : 'locked';

  const pageRef = useRef<HTMLDivElement>(null);
  const floor2Ref = useRef<HTMLElement>(null);
  const [floor2Revealed, setFloor2Revealed] = useState(false);

  // 진입 시점에 단 한 번 캡쳐 — 마운트 후 상태 변화에 영향받지 않도록.
  // (예: 사용자가 홈에 있는 동안 다른 곳에서 책 완성이 트리거되더라도
  //   이번 진입에서는 배너가 뜨지 않고, 다음 진입에서 정상적으로 뜸.)
  const [showUnlockBanner, setShowUnlockBanner] = useState(
    () => hasCompletedFirstBook && !firstBookUnlockSeen,
  );

  // 배너를 띄우기로 결정한 진입이라면 즉시 "본 적 있음" 플래그를 올림 →
  // 다음 진입부터는 다시는 안 뜸. (의도적으로 effect 가 아닌 layout 단계에서 처리해
  // React StrictMode 의 double mount 와도 충돌하지 않음.)
  useLayoutEffect(() => {
    if (showUnlockBanner) setFirstBookUnlockSeen(true);
    // showUnlockBanner 는 mount 시 단 한 번 결정되므로 deps 에 넣지 않음.
    // setFirstBookUnlockSeen 은 store action 이라 안정적임.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 진입 기본 포커스: 1F. 페인트 직전에 위치 잡아 깜빡임 최소화.
  useLayoutEffect(() => {
    const floor1 = document.getElementById('floor-1');
    if (!floor1) return;
    window.scrollTo({
      top: floor1.offsetTop,
      behavior: 'instant' as ScrollBehavior,
    });
  }, []);

  // 1F 책 stagger 진입 — 마운트 후 한 번.
  useGSAP(
    () => {
      gsap.from('#floor-1 .book-spine', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.1,
        clearProps: 'transform,opacity',
      });
    },
    { scope: pageRef },
  );

  // 2F 진입 시 한 번 — 책 stagger + CTA fade-in.
  useGSAP(
    () => {
      const target = floor2Ref.current;
      if (!target) return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !floor2Revealed) {
              setFloor2Revealed(true);
              if (libraryView === 'unlocked') {
                gsap.from('#floor-2 .book-spine', {
                  y: 40,
                  opacity: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                  stagger: 0.05,
                  clearProps: 'transform,opacity',
                });
              }
              io.disconnect();
              break;
            }
          }
        },
        { threshold: 0.1 },
      );
      io.observe(target);

      return () => io.disconnect();
    },
    { scope: pageRef, dependencies: [floor2Revealed, libraryView] },
  );

  const eyebrow = useMemo(() => {
    const now = new Date();
    return `${now.toLocaleString('en-US', { month: 'long' })} ${now.getFullYear()}`;
  }, []);

  return (
    <div ref={pageRef} className="home-canvas pb-2 pt-6 lg:pt-10">
      {/* ────────────────── 2F : 간직한 책 ──────────────────
       * 잠금(LOCKED) 동안에는 통째로 안 그림 — PullUpHandle 이 천장.
       * unlocked 일 때만 ShelfRow 와 헤더가 1F 위에 등장.
       */}
      {libraryView === 'unlocked' && (
        <>
          <section
            id="floor-2"
            ref={floor2Ref}
            aria-labelledby="floor-2-heading"
            className="floor-2"
          >
            <div
              className={
                'mb-3 flex items-end justify-between px-1 transition-opacity duration-500 lg:mb-4 ' +
                (floor2Revealed ? 'opacity-100' : 'opacity-0')
              }
            >
              <div>
                <p
                  id="floor-2-heading"
                  className="font-serif text-[11px] uppercase tracking-[0.16em] text-fg-subtle lg:text-[12px] lg:tracking-[0.22em]"
                >
                  2F · 간직한 책
                </p>
                <p className="mt-0.5 text-[12px] text-fg-muted lg:text-[13px]">
                  시간이 머문 자리
                </p>
              </div>
              <Link
                to={paths.library}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-[12px] font-medium text-brand transition-colors hover:border-brand lg:px-4 lg:py-2 lg:text-[13px]"
              >
                전체보기
                <ChevronsRight size={12} strokeWidth={1.75} />
              </Link>
            </div>

            <ShelfRow folders={library} tone="muted" trailingSlot="none" />
          </section>

          {/* 층 사이 공백 — PC 에서는 두 층 간 호흡을 더 크게. */}
          <div className="h-14 lg:h-24" aria-hidden />
        </>
      )}

      {/* ────────────────── 1F : 진입 기본 포커스 ────────────────── */}
      <section id="floor-1" className="floor-1 scroll-mt-4">
        <PullUpHandle locked={libraryView === 'locked'} />

        {/* 잠금이 막 풀린 첫 진입 — 1F 헤더 위에 한 번 뜨고 사라지는 배너 */}
        {showUnlockBanner && (
          <div className="px-1">
            <LibraryUnlockedBanner
              onDismiss={() => setShowUnlockBanner(false)}
            />
          </div>
        )}

        <header className="px-1">
          <p className="font-serif text-[11px] uppercase tracking-[0.16em] text-brand lg:text-[12px] lg:tracking-[0.22em]">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-[34px] font-medium leading-[1.1] tracking-tight text-fg lg:mt-3 lg:text-[56px]">
            둘의 <em className="italic text-brand">책장</em>
          </h1>
          <p className="mt-2 text-sm text-fg-muted lg:mt-3 lg:text-[15px]">
            {libraryView === 'locked'
              ? `지금 함께 채워가는 중인 책 ${active.length}권 · 2층은 곧 열려요.`
              : `지금 함께 채워가는 중인 책 ${active.length}권 · 간직한 책 ${library.length}권.`}
          </p>
        </header>

        <div className="mt-10 lg:mt-14">
          <ShelfRow
            folders={active}
            tone="primary"
            trailingSlot="invite"
            floorLabel="1F"
            caption="함께 쌓는 중"
          />
        </div>
      </section>
    </div>
  );
}
