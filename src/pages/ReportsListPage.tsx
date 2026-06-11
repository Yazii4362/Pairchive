import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockFolder } from '@/lib/mockData';
import { COVER_COLORS } from '@/lib/coverColors';
import { paths } from '@/routes/paths';

/**
 * "리포트" 탭 — 한 달이 지나 닫힌 책의 리포트 인덱스.
 * 다음 스텝에서 store 데이터로 연결됩니다.
 */
export default function ReportsListPage() {
  const folder = mockFolder;
  const preset = COVER_COLORS[folder.cover.colorId];

  return (
    <div className="mobile-canvas pt-8 pb-4">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          Reports
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
          한 달의 기록
        </h1>
        <p className="mt-1.5 text-sm text-fg-muted">
          닫힌 책마다 한 편의 리포트가 남아있어요.
        </p>
      </header>

      <ul className="mt-8 flex flex-col gap-3">
        <li>
          <Link
            to={paths.libraryReport(folder.id)}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface-strong p-4 transition-colors hover:bg-surface"
          >
            <span
              className="h-14 w-10 shrink-0 rounded-l-[3px] rounded-r-[5px]"
              style={{ backgroundColor: preset.cssVar }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-fg">
                {folder.title}
              </p>
              <p className="mt-0.5 font-serif text-[11px] tracking-wide text-fg-muted">
                {folder.links.length} links · 한 줄 요약 보기
              </p>
            </div>
            <ArrowRight size={14} strokeWidth={1.75} className="text-fg-subtle" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
