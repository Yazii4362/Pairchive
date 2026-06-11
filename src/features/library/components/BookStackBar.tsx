import { forwardRef } from 'react';
import { GrainOverlay } from '@/components/visual/GrainOverlay';
import { cn } from '@/lib/cn';
import { partnerNameOf } from '@/lib/mockData';
import type { PairFolder } from '@/types';
import { PASTEL_COVERS } from '../lib/pastelCovers';

interface BookStackBarProps {
  folder: PairFolder;
  /**
   * 0~1 사이의 폭 배율 — 책마다 살짝 다른 두께로 책 쌓인 윤곽을 만듭니다.
   * 높이는 항상 동일.
   */
  widthScale?: number;
  onClick?: () => void;
}

/**
 * 라이브러리 책장의 한 권 — 시간이 묵은 파스텔 톤의 책등.
 *
 * 디자인:
 *   - 같은 책 정체성을 유지하되 **파스텔 200/900** 으로 가라앉힌 톤.
 *   - 부드러운 rounded-xl + 가벼운 그림자 = "정리된, 안정된 느낌".
 *   - 메인 책장은 채도 가득(생동), 라이브러리는 묵직한 파스텔(보존) — 대비.
 *
 * 인터랙션:
 *   - hover/focus: translateX(+16px) — "책 한 권 빼내는" 어포던스 유지.
 *   - 우측에 inner-page 띠가 같은 톤 한 단계 진하게 살짝 드러남.
 */
export const BookStackBar = forwardRef<HTMLDivElement, BookStackBarProps>(
  function BookStackBar({ folder, widthScale = 1, onClick }, ref) {
    const preset = PASTEL_COVERS[folder.cover.colorId];
    const partner = partnerNameOf(folder);
    const pctWidth = Math.min(Math.max(widthScale, 0.72), 1) * 100;
    const dateLabel = formatClosedDate(folder.expiresAt);
    const metaLabel = partner ? `${partner} · ${dateLabel}` : dateLabel;

    const ariaLabel = [
      folder.title,
      partner ? `${partner}과` : '나의 책',
      `${dateLabel} 마감`,
    ]
      .filter(Boolean)
      .join(' · ');

    function onKeyDown(e: React.KeyboardEvent) {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }

    return (
      <div
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? ariaLabel : undefined}
        onClick={onClick}
        onKeyDown={onKeyDown}
        style={{ width: `${pctWidth}%` }}
        className="group/book relative outline-none"
      >
        {/* 우측 inner-page 띠 — 한 톤 진한 파스텔 300 */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-[-10px] top-1/2 z-0 h-[18px] w-2 -translate-y-1/2 rounded-r-md opacity-0 transition-opacity duration-300',
            'group-hover/book:opacity-100 group-focus-visible/book:opacity-100',
            preset.edgeClass,
          )}
        />

        {/* 본체 */}
        <div
          className={cn(
            'relative z-10 flex h-[56px] items-center justify-between gap-3 overflow-hidden rounded-xl px-5',
            'shadow-[0_2px_6px_-2px_rgb(0_0_0_/_0.08),0_1px_2px_rgb(0_0_0_/_0.05)]',
            'transition-transform duration-300 ease-out',
            'group-hover/book:translate-x-4 group-focus-visible/book:translate-x-4',
            'motion-reduce:transition-none motion-reduce:group-hover/book:translate-x-0 motion-reduce:group-focus-visible/book:translate-x-0',
            preset.bgClass,
          )}
        >
          <p
            className={cn(
              'relative z-10 min-w-0 flex-1 truncate font-sans text-[15px] font-semibold tracking-tight',
              preset.fgClass,
            )}
          >
            {folder.title}
          </p>
          <span
            className={cn(
              'relative z-10 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em]',
              preset.metaClass,
            )}
          >
            {metaLabel}
          </span>

          {/* Grainy flat illustration 결 — 책 막대 면 한 장에 자글자글한 인쇄 텍스처. */}
          <GrainOverlay scope="absolute" opacity={0.16} seed={folder.id} />
        </div>
      </div>
    );
  },
);

function formatClosedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}.${day}`;
}
