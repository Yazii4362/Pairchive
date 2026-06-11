import type { LibraryTier } from '../lib/tier';

/**
 * 라이브러리 배경 — 12 단계 톤 진화.
 *
 * 디자인 원칙:
 *   - 부드러운 파스텔 그라디언트 한 장이 무드의 90% — 일러스트는 시그니처 한 두 개만.
 *   - 책 색이 주인공이므로 배경은 자기주장이 약함. 가벼운 채도, 큰 면적.
 *   - 모든 씬은 fixed 풀스크린 + pointer-events-none. 책/컨트롤이 위에 떠 있음.
 *   - 라이트 모드 우선 — 어두운 단계(우주권)는 자기 색을 가지지만, 그 외엔 항상 환함.
 */
export function LibraryScene({ tier }: { tier: LibraryTier }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* 베이스 그라디언트 — 화면 전체 */}
      <div className="absolute inset-0" style={{ background: gradientFor(tier) }} />
      {/* 시그니처 일러스트 */}
      <SceneArt tier={tier} />
    </div>
  );
}

/* ────────────────── 그라디언트 ────────────────── */

function gradientFor(tier: LibraryTier): string {
  switch (tier) {
    case 'empty':
      return 'linear-gradient(180deg, #fdf3e0 0%, #f7e0c5 100%)';
    case 'one':
      return 'linear-gradient(180deg, #fef4d8 0%, #f7d4a6 100%)';
    case 'room':
      return 'linear-gradient(180deg, #fdebcb 0%, #f5c8a4 100%)';
    case 'sky-window':
      return 'linear-gradient(180deg, #d4dffa 0%, #f9dcc4 100%)';
    case 'sky-roof':
      return 'linear-gradient(180deg, #f0c7e3 0%, #c5b0f0 100%)';
    case 'clouds':
      return 'linear-gradient(180deg, #cad4f5 0%, #e3d8f5 100%)';
    case 'pear-branch':
      return 'linear-gradient(180deg, #fff1c7 0%, #f0e1a8 100%)';
    case 'pear-top':
      return 'linear-gradient(180deg, #fdedc1 0%, #d5eab9 100%)';
    case 'stratosphere':
      return 'linear-gradient(180deg, #b0bdf5 0%, #c290ec 100%)';
    case 'space-edge':
      return 'linear-gradient(180deg, #6e57cf 0%, #2b1f6b 100%)';
    case 'starlight':
      return 'linear-gradient(180deg, #3a2f87 0%, #110a30 100%)';
    case 'cosmos':
      return 'radial-gradient(120% 80% at 30% 30%, #6b3aa8 0%, #2e1a72 45%, #110a30 100%)';
  }
}

/* ────────────────── 시그니처 일러스트 — tier 별 1~3 요소만 ────────────────── */

function SceneArt({ tier }: { tier: LibraryTier }) {
  switch (tier) {
    case 'empty':
    case 'room':
      return null; // 빈 면이 곧 화법
    case 'one':
      return <HangingPear cx={70} cy={28} scale={1} />;
    case 'sky-window':
      return <ArchedWindow />;
    case 'sky-roof':
      return <FloatingCloud cx={20} cy={26} scale={1.1} />;
    case 'clouds':
      return (
        <>
          <FloatingCloud cx={18} cy={22} scale={1.2} />
          <FloatingCloud cx={72} cy={36} scale={0.9} />
          <FloatingCloud cx={45} cy={52} scale={1} />
        </>
      );
    case 'pear-branch':
      return <PearBranch />;
    case 'pear-top':
      return <PearTop />;
    case 'stratosphere':
      return <EarthCurve />;
    case 'space-edge':
      return (
        <>
          <StarField density="sparse" />
          <Planet cx={78} cy={64} r={86} hue="#a78bfa" highlight="#e9d5ff" />
        </>
      );
    case 'starlight':
      return <StarField density="dense" />;
    case 'cosmos':
      return (
        <>
          <StarField density="dense" />
          <NebulaSwirl />
        </>
      );
  }
}

/* ────────────────── 일러스트 부품들 ────────────────── */

function HangingPear({ cx, cy, scale }: { cx: number; cy: number; scale: number }) {
  return (
    <div
      className="absolute"
      style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%, -50%) scale(${scale})` }}
    >
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" aria-hidden>
        <defs>
          <radialGradient id="hp-pear" cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#fff5d8" />
            <stop offset="50%" stopColor="#f7d779" />
            <stop offset="100%" stopColor="#c98f3a" />
          </radialGradient>
        </defs>
        <path d="M60 0 L60 26" stroke="#a76a36" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M58 26 Q60 30 60 36" stroke="#5a3a18" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M60 28 Q72 24 80 30 Q72 36 60 32" fill="#7aa84a" />
        <path
          d="M60 36
             C 48 38 42 50 40 62
             C 38 72 30 82 24 96
             C 14 116 18 144 40 156
             C 52 162 68 162 80 156
             C 102 144 106 116 96 96
             C 90 82 82 72 80 62
             C 78 50 72 38 60 36 Z"
          fill="url(#hp-pear)"
        />
      </svg>
    </div>
  );
}

function ArchedWindow() {
  return (
    <svg
      className="absolute inset-x-0 top-0 h-[70%] w-full"
      viewBox="0 0 100 120"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="aw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9c6f8" />
          <stop offset="100%" stopColor="#dee5ff" />
        </linearGradient>
      </defs>
      <path
        d="M 20 120 L 20 60 A 30 30 0 0 1 80 60 L 80 120 Z"
        fill="url(#aw-sky)"
      />
      <path
        d="M 20 120 L 20 60 A 30 30 0 0 1 80 60 L 80 120"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FloatingCloud({ cx, cy, scale }: { cx: number; cy: number; scale: number }) {
  return (
    <div
      className="absolute"
      style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%, -50%) scale(${scale})` }}
    >
      <svg width="180" height="80" viewBox="0 0 180 80" aria-hidden>
        <g fill="#ffffff" fillOpacity="0.85">
          <ellipse cx="40" cy="42" rx="36" ry="22" />
          <ellipse cx="80" cy="34" rx="42" ry="26" />
          <ellipse cx="120" cy="44" rx="38" ry="22" />
          <ellipse cx="60" cy="50" rx="30" ry="18" />
        </g>
      </svg>
    </div>
  );
}

function PearBranch() {
  return (
    <svg
      className="absolute right-0 top-[8%] h-[55%] w-[55%]"
      viewBox="0 0 100 140"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden
    >
      <path
        d="M 100 8 Q 70 24 40 50 Q 18 70 10 102"
        stroke="#7a5a36"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#9ab84a" fillOpacity="0.85">
        <ellipse cx="86" cy="20" rx="14" ry="9" transform="rotate(-20 86 20)" />
        <ellipse cx="60" cy="40" rx="14" ry="9" transform="rotate(-10 60 40)" />
        <ellipse cx="28" cy="70" rx="14" ry="9" transform="rotate(10 28 70)" />
      </g>
      <Pear cx={66} cy={56} />
      <Pear cx={22} cy={92} />
    </svg>
  );
}

function PearTop() {
  return (
    <svg
      className="absolute right-[-10%] top-0 h-[80%] w-[75%]"
      viewBox="0 0 120 160"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden
    >
      <g fill="#9ab84a" fillOpacity="0.85">
        <ellipse cx="40" cy="40" rx="50" ry="32" />
        <ellipse cx="80" cy="30" rx="40" ry="26" />
        <ellipse cx="60" cy="65" rx="36" ry="22" />
      </g>
      <Pear cx={48} cy={50} />
      <Pear cx={70} cy={42} scale={0.9} />
      <Pear cx={88} cy={62} scale={0.85} />
      <Pear cx={36} cy={74} scale={0.9} />
      <Pear cx={60} cy={84} scale={0.8} />
    </svg>
  );
}

function Pear({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <defs>
        <radialGradient id={`p-${cx}-${cy}`} cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff5d8" />
          <stop offset="60%" stopColor="#f5d36a" />
          <stop offset="100%" stopColor="#b8842a" />
        </radialGradient>
      </defs>
      <path d="M0 -2 L0 4" stroke="#5a3a18" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M 0 4
           C -4 4 -6 8 -6 12
           C -6 18 -4 22 0 22
           C 4 22 6 18 6 12
           C 6 8 4 4 0 4 Z"
        fill={`url(#p-${cx}-${cy})`}
      />
    </g>
  );
}

function EarthCurve() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-[42%] w-full"
      viewBox="0 0 1000 240"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="ec-atm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ab8f5" stopOpacity="0" />
          <stop offset="60%" stopColor="#bcd2f8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#dfe9fd" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="380" rx="800" ry="240" fill="url(#ec-atm)" />
      <path
        d="M -200 240 Q 500 60 1200 240 L 1200 240 L -200 240 Z"
        fill="#c4d4e8"
      />
    </svg>
  );
}

function Planet({
  cx,
  cy,
  r,
  hue,
  highlight,
}: {
  cx: number;
  cy: number;
  r: number;
  hue: string;
  highlight: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`} aria-hidden>
        <defs>
          <radialGradient id={`pl-${cx}-${cy}`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor={highlight} />
            <stop offset="60%" stopColor={hue} />
            <stop offset="100%" stopColor="#1c1247" />
          </radialGradient>
        </defs>
        <circle cx={r} cy={r} r={r * 0.92} fill={`url(#pl-${cx}-${cy})`} />
      </svg>
    </div>
  );
}

function StarField({ density }: { density: 'sparse' | 'dense' }) {
  const stars = density === 'dense' ? DENSE_STARS : SPARSE_STARS;
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 1400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o}>
          {s.r > 1.5 && (
            <animate
              attributeName="opacity"
              values={`${s.o * 0.55};${s.o};${s.o * 0.55}`}
              dur={`${3 + (i % 4)}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  );
}

function NebulaSwirl() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 1400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="nb-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3a4e8" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#9148c6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3a1858" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nb-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7ed6f4" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#3a5fcf" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0a1858" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="320" cy="500" rx="480" ry="280" fill="url(#nb-a)" />
      <ellipse cx="740" cy="900" rx="440" ry="260" fill="url(#nb-b)" />
    </svg>
  );
}

const SPARSE_STARS: Array<{ x: number; y: number; r: number; o: number }> = [
  { x: 100, y: 80, r: 1.4, o: 0.85 },
  { x: 280, y: 140, r: 1, o: 0.7 },
  { x: 460, y: 60, r: 1.6, o: 0.9 },
  { x: 640, y: 200, r: 1, o: 0.65 },
  { x: 820, y: 110, r: 1.4, o: 0.85 },
  { x: 150, y: 360, r: 1.2, o: 0.8 },
  { x: 380, y: 480, r: 1.5, o: 0.9 },
  { x: 600, y: 380, r: 1, o: 0.65 },
  { x: 880, y: 520, r: 1.3, o: 0.8 },
  { x: 220, y: 720, r: 1.1, o: 0.75 },
  { x: 480, y: 820, r: 1.5, o: 0.9 },
  { x: 760, y: 760, r: 1.2, o: 0.8 },
];

const DENSE_STARS: Array<{ x: number; y: number; r: number; o: number }> = [
  ...SPARSE_STARS,
  ...SPARSE_STARS.map((s) => ({
    x: 1000 - s.x,
    y: 1400 - s.y,
    r: s.r * 0.85,
    o: s.o * 0.9,
  })),
  { x: 320, y: 280, r: 2.2, o: 0.95 },
  { x: 720, y: 460, r: 2, o: 0.9 },
  { x: 540, y: 940, r: 2.4, o: 0.95 },
  { x: 180, y: 1080, r: 1.8, o: 0.85 },
  { x: 880, y: 1140, r: 2, o: 0.9 },
  { x: 70, y: 240, r: 0.8, o: 0.6 },
  { x: 240, y: 540, r: 0.9, o: 0.65 },
  { x: 420, y: 660, r: 0.8, o: 0.55 },
  { x: 580, y: 760, r: 0.8, o: 0.6 },
  { x: 700, y: 1020, r: 0.9, o: 0.65 },
  { x: 940, y: 360, r: 0.8, o: 0.55 },
  { x: 60, y: 880, r: 0.9, o: 0.65 },
  { x: 360, y: 1180, r: 0.8, o: 0.55 },
];
