import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * "두 분의 책이 시작되었어요" — 초대장을 수락한 직후 마주오는 두 배(pear) 의 결합 의식.
 *
 * 브랜드 노트:
 *   PAirchive = Pair + Archive 인데, 시각적으로는 "Pear" 의 펀(pun) 까지 끌어다 씀.
 *   서로 다른 색의 두 배가 마주보면서 한 권의 책이 열리는 은유를 한 장면으로 압축합니다.
 *
 * 표시 트리거:
 *   store.acceptInvite() 가 호출되면 같은 트랜잭션에서 pairCelebrationFor 가 채워지고,
 *   AppShell 전역에 마운트된 이 컴포넌트가 즉시 풀스크린으로 떠오릅니다.
 *
 * 테마 스코핑:
 *   data-theme="dark" 를 루트에 박아 라이트 모드 사용자에게도
 *   시네마틱 다크 톤을 일관되게 보여줍니다 — 즉, bg-bg/text-fg 토큰이
 *   이 서브트리에서는 무조건 다크 값으로 해석됩니다.
 *
 * 인터랙션:
 *   - X 버튼 / 백드롭 클릭 / Escape → dismissPairCelebration()
 *   - 자동 해제 없음 (사용자가 의식의 길이를 직접 결정)
 *
 * 애니메이션:
 *   GSAP 타임라인이 백드롭 fade → 두 배 양옆에서 슬라이드 인 → 타이틀/캡션 stagger 까지
 *   한 트랙으로 묶고, 진입 직후엔 무한 호흡(float) 으로 살아있는 느낌을 유지합니다.
 */
export function PairBondCelebration() {
  const ctx = useAppStore((s) => s.pairCelebrationFor);
  const dismiss = useAppStore((s) => s.dismissPairCelebration);
  const open = ctx !== null;

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Escape 닫기 + body scroll lock
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, dismiss]);

  // 진입 시퀀스 — 백드롭 → 두 배 → 타이틀/캡션 → CTA
  useGSAP(
    () => {
      if (!open) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.pbc-backdrop', { opacity: 0, duration: 0.35 })
        .from(
          '.pbc-pear-left',
          { x: -120, scale: 0.85, opacity: 0, duration: 0.75 },
          '-=0.1',
        )
        .from(
          '.pbc-pear-right',
          { x: 120, scale: 0.85, opacity: 0, duration: 0.75 },
          '<',
        )
        .from(
          '.pbc-eyebrow',
          { y: -8, opacity: 0, duration: 0.5 },
          '-=0.45',
        )
        .from(
          '.pbc-title',
          { y: 16, opacity: 0, duration: 0.6 },
          '-=0.25',
        )
        .from(
          '.pbc-sub',
          { y: 12, opacity: 0, duration: 0.5 },
          '-=0.35',
        )
        .from(
          '.pbc-cta',
          { y: 12, opacity: 0, duration: 0.4 },
          '-=0.2',
        );

      // 진입이 끝난 뒤에도 두 배는 조용히 호흡 — 인라인 rotate 가 살아있도록 y 만 다룸.
      gsap.to('.pbc-pear-left', {
        y: -8,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.9,
      });
      gsap.to('.pbc-pear-right', {
        y: -10,
        duration: 2.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });

      // 바닥 글로우는 천천히 맥동
      gsap.to('.pbc-glow', {
        opacity: 0.65,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    },
    { scope: rootRef, dependencies: [open] },
  );

  if (!open || !ctx) return null;

  return (
    <div
      ref={rootRef}
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pbc-title"
      className="fixed inset-0 z-[60] overflow-hidden"
    >
      {/* 백드롭 — bg 토큰이 다크 스코프 안에서 near-black 으로 해석됨 */}
      <div
        className="pbc-backdrop absolute inset-0 bg-bg"
        onClick={dismiss}
        aria-hidden
      />

      {/* 바닥에서 올라오는 미묘한 청보랏빛 글로우 — 의식의 무드 라이팅 */}
      <div
        className="pbc-glow pointer-events-none absolute inset-x-0 bottom-0 h-[55vh] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(108, 130, 220, 0.55) 0%, rgba(80, 70, 200, 0.28) 32%, rgba(40, 30, 100, 0.12) 55%, transparent 75%)',
        }}
        aria-hidden
      />

      {/* X 닫기 */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="닫기"
        className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
      >
        <X size={18} strokeWidth={1.75} />
      </button>

      {/* 본문 — 모바일 캔버스 폭 안에서 수직 정렬 */}
      <div className="relative mx-auto flex h-full max-w-[440px] flex-col px-6">
        <p className="pbc-eyebrow mt-16 text-center font-mono text-[11px] uppercase tracking-[0.32em] text-fg-subtle">
          PAirchive
        </p>

        {/* 두 배 — Pear 컴포넌트 자체에 margin 으로 살짝 겹쳐, 마주보는 인상 */}
        <div className="mt-12 flex flex-1 items-start justify-center">
          <div className="flex items-end">
            <Pear side="left" />
            <Pear side="right" />
          </div>
        </div>

        {/* 타이틀 블록 */}
        <div className="mb-16 text-center">
          <h2
            id="pbc-title"
            className="pbc-title font-serif text-[22px] font-medium leading-[1.35] tracking-tight text-fg"
          >
            두 분의 책이 시작되었어요
          </h2>
          <p className="pbc-sub mt-3 text-[13px] leading-relaxed text-fg-muted">
            <span className="font-medium text-fg">{ctx.partnerName}</span>
            님과 함께 채울 책,
            <br />
            <span className="font-serif italic text-fg-muted">
              &ldquo;{ctx.bookTitle}&rdquo;
            </span>
            의 첫 페이지가 열렸어요.
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="pbc-cta mt-8 inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            책장 열기
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 두 종류의 배 — pair 와 pear 의 펀.
 * 색 자체는 의식의 상징물이라 토큰 대신 의도된 하드코드 그러데이션을 씁니다.
 */
function Pear({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  const id = `pbc-pear-${side}`;
  const cls = isLeft ? 'pbc-pear-left' : 'pbc-pear-right';

  return (
    <svg
      className={`${cls} h-[180px] w-[140px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] sm:h-[210px] sm:w-[160px]`}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden
      style={{
        transform: isLeft ? 'rotate(-6deg)' : 'rotate(6deg)',
        marginLeft: isLeft ? 0 : -10,
        marginRight: isLeft ? -10 : 0,
      }}
    >
      <defs>
        <radialGradient
          id={id}
          cx={isLeft ? '32%' : '68%'}
          cy="34%"
          r="78%"
        >
          {isLeft ? (
            <>
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="22%" stopColor="#fde047" />
              <stop offset="48%" stopColor="#a3e635" />
              <stop offset="78%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffe4e6" />
              <stop offset="22%" stopColor="#fda4af" />
              <stop offset="48%" stopColor="#fb7185" />
              <stop offset="78%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#831843" />
            </>
          )}
        </radialGradient>
        {/* 내부 하이라이트 — 광이 한 번 더 도는 느낌 */}
        <radialGradient
          id={`${id}-hi`}
          cx={isLeft ? '32%' : '68%'}
          cy="28%"
          r="32%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 줄기 */}
      <path
        d="M58 6 Q60 12 60 22"
        stroke="#2a1d12"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 본체 — 위는 좁고 아래가 풍성한 배 실루엣 */}
      <path
        d="M60 22
           C 54 24  50 30  48 38
           C 46 46  42 52  34 60
           C 22 72  16 92  16 112
           C 16 138  34 152  60 152
           C 86 152 104 138 104 112
           C 104 92  98 72  86 60
           C 78 52  74 46  72 38
           C 70 30  66 24  60 22 Z"
        fill={`url(#${id})`}
      />
      {/* 윗부분 광택 */}
      <path
        d="M60 22
           C 54 24  50 30  48 38
           C 46 46  42 52  34 60
           C 22 72  16 92  16 112
           C 16 138  34 152  60 152
           C 86 152 104 138 104 112
           C 104 92  98 72  86 60
           C 78 52  74 46  72 38
           C 70 30  66 24  60 22 Z"
        fill={`url(#${id}-hi)`}
      />
    </svg>
  );
}
