import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COVER_COLORS } from '@/lib/coverColors';
import { partnerNameOf } from '@/lib/mockData';
import { paths } from '@/routes/paths';
import type { PairFolder } from '@/types';
import { monthKeyOf } from '../lib/groupByMonth';

interface ListViewProps {
  folders: PairFolder[];
}

/**
 * 시간순 한 줄 정렬 — 단서: 표지 색 도트 + 제목 + 닫힌 날짜 + 파트너.
 * 책장의 두께감이나 표지 미감보다 "언제, 누구와, 무슨 책" 정보 접근이 중요한 순간을 위함.
 *
 * 월 단위로 작은 라벨이 들어간 sticky-ish 헤더가 한 번씩 등장합니다.
 */
export function ListView({ folders }: ListViewProps) {
  const rows = useMemo(() => {
    const sorted = [...folders].sort(
      (a, b) => +new Date(b.expiresAt) - +new Date(a.expiresAt),
    );
    let lastKey = '';
    return sorted.map((folder) => {
      const key = monthKeyOf(folder);
      const showHeader = key !== lastKey;
      lastKey = key;
      return { folder, showHeader, key };
    });
  }, [folders]);

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 pb-24 pt-8">
      <ul className="overflow-hidden rounded-2xl border border-border bg-bg-elevated/85 backdrop-blur-md">
        {rows.map(({ folder, showHeader, key }, i) => {
          const preset = COVER_COLORS[folder.cover.colorId];
          const partner = partnerNameOf(folder);
          const d = new Date(folder.expiresAt);
          return (
            <li key={folder.id}>
              {showHeader && (
                <div
                  className={
                    'border-border bg-surface-strong px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle ' +
                    (i === 0 ? '' : 'border-t')
                  }
                >
                  {key.replace('-', ' · ')}월
                </div>
              )}
              <Link
                to={paths.libraryFolder(folder.id)}
                className="flex items-center gap-3 border-t border-border px-4 py-3.5 transition-colors first:border-t-0 hover:bg-surface"
              >
                <span
                  aria-hidden
                  className={'h-8 w-2 shrink-0 rounded-[1px] ' + preset.bgClass}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-[14px] font-bold tracking-tight text-fg">
                    {folder.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">
                    {String(d.getMonth() + 1).padStart(2, '0')}.
                    {String(d.getDate()).padStart(2, '0')} ·{' '}
                    {partner ? partner : '나의 책'} · {folder.links.length} links
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  strokeWidth={1.75}
                  className="text-fg-subtle"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
