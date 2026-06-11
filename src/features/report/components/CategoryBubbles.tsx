import { useMemo } from 'react';
import { GrainOverlay } from '@/components/visual/GrainOverlay';
import type { BubbleHue } from '@/lib/coverColors';
import type { CountedItem } from '../utils/aggregate';

/**
 * 카테고리/감정 패널의 5-bubble cluster.
 *
 * - 모든 원이 서로 닿거나 살짝 겹쳐 한 덩어리처럼 보이도록 packing.
 *   좌표는 정사각 280×280 컨테이너 안의 절대 픽셀 위치(좌상단 기준).
 * - 떠다니는 애니메이션은 빼고 정적 배치 + hover 시 살짝 들리는 정도.
 * - 색상은 item.hue 의 900(배경) / 300(라벨) 단계로 라이트/다크 모두 대비 확보.
 */

interface CategoryBubblesProps {
  items: ReadonlyArray<CountedItem<string>>;
  /** 빈 데이터일 때 노출할 안내 텍스트 */
  emptyHint?: string;
}

interface Slot {
  /** 지름(px) */
  size: number;
  /** 컨테이너(280×280) 안의 좌상단 위치(px) */
  left: number;
  top: number;
  /** 라벨 폰트 크기(px) */
  labelSize: number;
}

/**
 * 5개 원을 한 덩어리로 packing 한 좌표. 각 쌍의 중심 거리가
 * 두 반지름 합과 거의 같도록 손으로 계산한 배치입니다.
 * (큰 원 두 개가 대각선으로 자리잡고, 작은 원이 그 표면을 따라 붙음)
 */
const SLOTS: readonly Slot[] = [
  { size: 150, left: 5, top: 0, labelSize: 18 },
  { size: 130, left: 90, top: 110, labelSize: 16 },
  { size: 90, left: 155, top: 15, labelSize: 13 },
  { size: 60, left: 210, top: 75, labelSize: 11 },
  { size: 30, left: 40, top: 135, labelSize: 10 },
];

const HUE_TO_BG: Record<BubbleHue, string> = {
  yellow: 'var(--yellow-900)',
  pink: 'var(--pink-900)',
  green: 'var(--green-900)',
  orange: 'var(--orange-900)',
  blue: 'var(--blue-900)',
};
const HUE_TO_LABEL: Record<BubbleHue, string> = {
  yellow: 'var(--yellow-300)',
  pink: 'var(--pink-300)',
  green: 'var(--green-300)',
  orange: 'var(--orange-300)',
  blue: 'var(--blue-300)',
};
const HUE_TO_COUNT: Record<BubbleHue, string> = {
  yellow: 'var(--yellow-400)',
  pink: 'var(--pink-400)',
  green: 'var(--green-400)',
  orange: 'var(--orange-400)',
  blue: 'var(--blue-400)',
};

export function CategoryBubbles({ items, emptyHint }: CategoryBubblesProps) {
  const sliced = useMemo(() => items.slice(0, SLOTS.length), [items]);

  if (sliced.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-fg-subtle">
        {emptyHint ?? '아직 충분한 데이터가 없어요.'}
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[250px] w-[280px]">
      {sliced.map((item, i) => {
        const slot = SLOTS[i]!;
        const bg = HUE_TO_BG[item.hue];
        const label = HUE_TO_LABEL[item.hue];
        const count = HUE_TO_COUNT[item.hue];
        return (
          <div
            key={item.id}
            className="absolute flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full text-center"
            style={{
              width: `${slot.size}px`,
              height: `${slot.size}px`,
              left: `${slot.left}px`,
              top: `${slot.top}px`,
              backgroundColor: bg,
            }}
          >
            <span
              className="relative z-10 font-serif font-medium"
              style={{ color: label, fontSize: `${slot.labelSize}px` }}
            >
              {item.label}
            </span>
            {slot.size >= 60 && (
              <span
                className="relative z-10 font-mono"
                style={{
                  color: count,
                  fontSize: `${Math.max(9, slot.labelSize - 4)}px`,
                  opacity: 0.85,
                }}
              >
                {item.value}개
              </span>
            )}
            {/* Grainy gradient illustration 결 — 단색 원형 위에 자글자글한 인쇄 텍스처. */}
            <GrainOverlay scope="absolute" opacity={0.22} seed={item.id} />
          </div>
        );
      })}
    </div>
  );
}
