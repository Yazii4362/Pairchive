import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COVER_COLORS } from '@/lib/coverColors';
import { partnerNameOf } from '@/lib/mockData';
import { paths } from '@/routes/paths';
import type { PairFolder } from '@/types';

interface AlbumViewProps {
  folders: PairFolder[];
}

/**
 * 표지 위주의 그리드 뷰 — 책장에서 책을 한 권씩 꺼내 책상 위에 펼친 느낌.
 *
 * 카드 한 장:
 *   - 3:4 비율의 표지 (cover preset 색)
 *   - 우상단 모서리 띠(accent class) 로 책의 두께감 표현
 *   - 표지 아래에 작은 제목/파트너/닫힌 달
 */
export function AlbumView({ folders }: AlbumViewProps) {
  const sorted = useMemo(
    () =>
      [...folders].sort(
        (a, b) => +new Date(b.expiresAt) - +new Date(a.expiresAt),
      ),
    [folders],
  );

  return (
    <div className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
        {sorted.map((folder) => {
          const preset = COVER_COLORS[folder.cover.colorId];
          const partner = partnerNameOf(folder);
          const d = new Date(folder.expiresAt);
          return (
            <Link
              key={folder.id}
              to={paths.libraryFolder(folder.id)}
              className="group block"
            >
              <div
                className={
                  'relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-md transition-transform duration-300 group-hover:-translate-y-1.5 ' +
                  preset.bgClass
                }
              >
                {/* 우측 표지 띠 — 책 두께 느낌 */}
                <span
                  className={
                    'absolute right-0 top-0 h-full w-1.5 ' + preset.accentClass
                  }
                  aria-hidden
                />
                {/* 표지 위 타이포 — Bauhaus 톤 */}
                <div
                  className={
                    'flex h-full flex-col justify-between px-4 py-5 ' +
                    preset.fgClass
                  }
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                    {d.getFullYear()}.{String(d.getMonth() + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-sans text-[18px] font-bold leading-tight tracking-tight">
                    {folder.title}
                  </h3>
                </div>
              </div>
              <div className="mt-2 px-0.5">
                <p className="truncate text-[12px] text-fg-muted">
                  {partner ? `${partner}과 함께` : '나의 책'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
