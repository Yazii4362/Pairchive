import { useMemo } from 'react';
import type { PairFolder } from '@/types';
import { REACTIONS, REACTION_TO_HUE, type ReactionId } from '@/lib/reactions';
import type { BubbleHue } from '@/lib/coverColors';
import { countByReaction } from '../utils/aggregate';

/**
 * 인사이트 패널.
 *
 * 1) 자유롭게 떠다니는 organic SVG blob 3개 — 한 달의 핵심 수치를 한눈에:
 *    - LINKS    : 총 링크 수
 *    - REACTS   : 두 사람이 남긴 총 리액션 수
 *    - 1위 감정  : 가장 많이 눌린 감정 (이름/카운트)
 * 2) 그 아래 감정 리액션 칩 리스트 (모든 감정칩의 카운트 분포)
 *
 * 블롭 path 는 mockup 의 자유 곡선 그대로. 라이트/다크 모두 충분한 대비를 위해
 * hue × 900(블롭 채움) 단계와 흰 텍스트 조합.
 */

const BLOB_PATHS = {
  big: 'M84 13C111 8 151 31 159 61C167 91 149 131 121 147C93 163 49 155 27 131C5 107 3 61 25 37C39 21 61 17 84 13Z',
  mid: 'M61 7C82 3 110 19 116 44C122 69 108 101 84 113C60 125 26 113 13 88C0 63 8 29 28 15C40 7 48 9 61 7Z',
  small: 'M34 5C47 3 64 13 66 29C68 45 56 61 40 66C24 71 6 61 2 45C-2 29 8 11 22 6C26 4 30 5 34 5Z',
} as const;

interface BlobItem {
  shape: keyof typeof BLOB_PATHS;
  size: number;
  viewBox: string;
  bgVar: string;
  name: string;
  count: string;
  /** 컨테이너(정사각 280×220) 안의 좌상단 위치 px — 서로 닿는 packing 좌표. */
  left: number;
  top: number;
  /** 라벨 폰트 사이즈 — small blob 에선 줄임 */
  small?: boolean;
}

export function InsightsBlobs({ folder }: { folder: PairFolder }) {
  const reactions = useMemo(
    () => countByReaction(folder.links),
    [folder.links],
  );

  const blobs: BlobItem[] = useMemo(() => {
    const totalLinks = folder.links.length;
    const totalReactions = folder.links.reduce(
      (s, l) => s + l.reactions.length,
      0,
    );
    const dominant: ReactionId | undefined = reactions[0]?.id;
    const dominantHue = dominant ? REACTION_TO_HUE[dominant] : 'orange';
    const dominantLabel = dominant ? REACTIONS[dominant].label : '?';
    const dominantCount = reactions[0]?.value ?? 0;

    return [
      {
        shape: 'big',
        size: 168,
        viewBox: '0 0 168 168',
        bgVar: 'var(--green-900)',
        name: 'LINKS',
        count: `${totalLinks}개`,
        left: 0,
        top: 0,
      },
      {
        shape: 'mid',
        size: 122,
        viewBox: '0 0 122 122',
        bgVar: 'var(--pink-900)',
        name: 'REACTS',
        count: `${totalReactions}개`,
        left: 135,
        top: 0,
      },
      {
        shape: 'small',
        size: 68,
        viewBox: '0 0 68 68',
        bgVar: hueVar900(dominantHue),
        name: dominantLabel,
        count: `${dominantCount}회`,
        left: 215,
        top: 100,
        small: true,
      },
    ];
  }, [folder.links, reactions]);

  return (
    <div className="flex flex-col gap-6">
      {/* organic blob cluster — 3개 blob 이 서로 닿거나 살짝 겹치는 한 덩어리. */}
      <div className="relative mx-auto h-[180px] w-[285px]">
        {blobs.map((b, i) => (
          <div
            key={b.name}
            className="absolute flex items-center justify-center"
            style={{
              left: `${b.left}px`,
              top: `${b.top}px`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
          >
            <svg
              width={b.size}
              height={b.size}
              viewBox={b.viewBox}
              aria-hidden
              className="absolute inset-0"
            >
              <defs>
                {/* blob path 모양 안에서만 grain 이 보이도록 클립. */}
                <clipPath id={`blob-clip-${i}`}>
                  <path d={BLOB_PATHS[b.shape]} />
                </clipPath>
                {/* Grainy flat illustration 결 — fractalNoise. */}
                <filter id={`blob-grain-${i}`}>
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.85"
                    numOctaves={2}
                    seed={1}
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
              {/* 원본 단색 blob */}
              <path d={BLOB_PATHS[b.shape]} fill={b.bgVar} />
              {/* 자글자글한 grain 한 장 — clip 안에서만, overlay 로 자연스럽게. */}
              <rect
                width="100%"
                height="100%"
                filter={`url(#blob-grain-${i})`}
                clipPath={`url(#blob-clip-${i})`}
                opacity="0.22"
                style={{ mixBlendMode: 'overlay' }}
              />
            </svg>
            <div className="pointer-events-none relative z-10 flex flex-col items-center text-center text-white">
              <span
                className="font-serif font-medium uppercase tracking-[0.08em] text-white/85"
                style={{ fontSize: b.small ? '9px' : '13px' }}
              >
                {b.name}
              </span>
              <span
                className="mt-0.5 font-serif text-white/45"
                style={{ fontSize: b.small ? '9px' : '11px' }}
              >
                {b.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 감정 리액션 칩 */}
      <div>
        <p className="mb-3 font-serif text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
          감정 리액션
        </p>
        {reactions.length === 0 ? (
          <p className="text-xs text-fg-subtle">
            아직 두 사람이 남긴 리액션이 없어요.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {reactions.map((r, i) => (
              <li
                key={r.id}
                className="animate-float-soft flex items-center gap-1.5 rounded-full border border-border bg-surface-strong px-3.5 py-2 text-sm text-fg"
                style={
                  {
                    '--dur': `${3.2 + (i % 4) * 0.4}s`,
                    '--delay': `${(i % 5) * 0.25}s`,
                    '--lift': '-5px',
                  } as React.CSSProperties
                }
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
                <span className="font-serif text-xs text-fg-muted">
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function hueVar900(hue: BubbleHue): string {
  switch (hue) {
    case 'yellow':
      return 'var(--yellow-900)';
    case 'pink':
      return 'var(--pink-900)';
    case 'green':
      return 'var(--green-900)';
    case 'orange':
      return 'var(--orange-900)';
    case 'blue':
      return 'var(--blue-900)';
  }
}
