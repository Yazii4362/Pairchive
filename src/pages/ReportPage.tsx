import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Check } from 'lucide-react';
import { paths } from '@/routes/paths';
import { mockFolder } from '@/lib/mockData';
import { COVER_COLORS } from '@/lib/coverColors';
import { CATEGORIES, pickDominantCategory } from '@/lib/categories';
import {
  countByCategory,
  countByReaction,
  topLinks,
} from '@/features/report/utils/aggregate';
import { CategoryBubbles } from '@/features/report/components/CategoryBubbles';
import { HighlightList } from '@/features/report/components/HighlightList';
import { InsightsBlobs } from '@/features/report/components/InsightsBlobs';
import { cn } from '@/lib/cn';

/**
 * 만료된 페어 폴더의 리포트.
 *
 * 구조 (단일 페이지, 탭 패널 교체):
 *   [Header] ─ 라이브러리로 / 작은 메타
 *   [Title] ─ "우리의 ◯◯월이 닫혔어요" (italic 강조)
 *   [AI Inline] ─ 좌측 border accent + AI 한 줄 코멘트 + 호흡 점
 *   [Book Strip] ─ 작은 책 미니어처 + 이름/기간/대표 태그
 *   [Tabs] ─ 카테고리 · 하이라이트 · 인사이트 (세그먼티드)
 *   [Panel] ─ 활성 탭의 콘텐츠만 표시
 *   [Sticky CTA] ─ "책장에 간직하기" + 힌트
 *
 * AppShell 밖에서 단독 라우트로 동작. Dock GNB 도 표시되지 않습니다.
 */

type Tab = 'category' | 'highlight' | 'insights';

const TABS: ReadonlyArray<{ value: Tab; label: string }> = [
  { value: 'category', label: '카테고리' },
  { value: 'highlight', label: '하이라이트' },
  { value: 'insights', label: '인사이트' },
];

const PANEL_COPY: Record<Tab, { number: string; label: string; title: React.ReactNode }> = {
  category: {
    number: '01',
    label: 'Category',
    title: (
      <>
        우리는 무엇에
        <br />
        가장 빠져있었을까?
      </>
    ),
  },
  highlight: {
    number: '02',
    label: 'Highlight',
    title: (
      <>
        우리가 제일
        <br />
        좋아한 것들
      </>
    ),
  },
  insights: {
    number: '03',
    label: 'Insights',
    title: (
      <>
        이번 달
        <br />
        우리의 기록
      </>
    ),
  },
};

export default function ReportPage() {
  const { folderId } = useParams();
  void folderId;
  const folder = mockFolder;
  const [tab, setTab] = useState<Tab>('category');
  const [kept, setKept] = useState(false);

  const categories = useMemo(
    () => countByCategory(folder.links),
    [folder.links],
  );
  const reactions = useMemo(
    () => countByReaction(folder.links),
    [folder.links],
  );
  const highlights = useMemo(() => topLinks(folder.links, 5), [folder.links]);

  // 헤더 타이틀의 italic 강조 — 폴더 시작 월
  const { headerEyebrow, headerMonth } = useMemo(() => {
    const start = new Date(folder.createdAt);
    const month = `${start.getMonth() + 1}월`;
    const eyebrow = `${start.toLocaleString('en-US', { month: 'long' })} ${start.getFullYear()} · Report`;
    return { headerEyebrow: eyebrow, headerMonth: month };
  }, [folder.createdAt]);

  // 책 정보용 라벨
  const cover = COVER_COLORS[folder.cover.colorId];
  const periodLabel = useMemo(() => {
    const s = new Date(folder.createdAt);
    const e = new Date(folder.expiresAt);
    const fmt = (d: Date) =>
      d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(s)} – ${fmt(e)}, ${e.getFullYear()} · ${folder.links.length} links`;
  }, [folder.createdAt, folder.expiresAt, folder.links.length]);

  const dominantCategory = useMemo(
    () => pickDominantCategory(folder.links.map((l) => l.category)),
    [folder.links],
  );
  const dominantLabel = dominantCategory
    ? CATEGORIES[dominantCategory].label
    : '기록';

  // AI 한 줄 — 실제로는 백엔드가 만들 카피, 지금은 mock 으로 조합.
  const aiSummary = useMemo(() => {
    const top2 = categories.slice(0, 2).map((c) => c.label);
    if (top2.length < 2) {
      return `두 사람은 한 달 동안 ${folder.links.length}개의 조각을 함께 모았어요.`;
    }
    return (
      <>
        두 사람은 <strong>{top2[0]}과 {top2[1]}</strong>을 중심으로 취향을
        쌓았어요. 후반엔 더 자주 같은 풍경을 봤고요.
      </>
    );
  }, [categories, folder.links.length]);

  const panelCopy = PANEL_COPY[tab];

  return (
    <div className="min-h-screen bg-bg">
      {/* 좁은 모바일 컨테이너 — 리포트 전체가 이 너비 안에서 흐름 */}
      <div className="mx-auto w-full max-w-[var(--container-mobile)] pb-44">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Link
            to={paths.library}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            라이브러리로
          </Link>
        </div>

        <header className="px-6 pt-10">
          <p className="font-serif text-[10px] uppercase tracking-[0.14em] text-brand">
            {headerEyebrow}
          </p>
          <h1 className="mt-2.5 font-serif text-[44px] font-medium leading-[1.05] text-fg">
            우리의
            <br />
            <em className="font-medium italic text-brand">{headerMonth}</em>이
            <br />
            닫혔어요
          </h1>
        </header>

        {/* AI inline */}
        <div className="mx-6 mt-5 rounded-r-md bg-brand-soft/40 py-4 pl-4 pr-5 [border-left:1.5px_solid_var(--color-brand)]">
          <div className="flex items-center gap-1.5">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-serif text-[10px] uppercase tracking-[0.1em] text-brand">
              Pairchive AI
            </span>
          </div>
          <p className="mt-2 font-serif text-[17px] italic leading-[1.65] text-fg-muted">
            {aiSummary}
          </p>
        </div>

        {/* Book strip */}
        <div className="mx-6 mt-5 flex items-center gap-3.5 rounded-2xl border border-border bg-surface-strong px-4 py-3.5">
          <BookMini cover={cover.cssVar} title={folder.title} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-fg">
              {folder.title}
            </p>
            <p className="mt-0.5 font-serif text-[11px] tracking-wide text-fg-muted">
              {periodLabel}
            </p>
            <span className="mt-1.5 inline-block rounded-full border border-brand-soft bg-brand-soft px-2.5 py-0.5 font-serif text-[10px] tracking-wider text-brand">
              {dominantLabel} 중심
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="mx-6 mt-5 flex rounded-lg border border-border bg-surface-strong p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={tab === t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                'flex-1 rounded-md py-2 text-xs font-medium transition-colors',
                tab === t.value
                  ? 'border border-border bg-bg text-fg'
                  : 'text-fg-muted hover:text-fg',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel header */}
        <div className="px-6 pt-7">
          <p className="font-serif text-[10px] uppercase tracking-[0.12em] text-brand">
            {panelCopy.number} · {panelCopy.label}
          </p>
          <h2 className="mt-1.5 font-serif text-[28px] font-medium leading-[1.2] text-fg">
            {panelCopy.title}
          </h2>
        </div>

        {/* Active panel */}
        <div className="px-6 pt-8">
          {tab === 'category' && <CategoryBubbles items={categories} />}
          {tab === 'highlight' && (
            <HighlightList links={highlights} viewerId={folder.ownerId} />
          )}
          {tab === 'insights' && <InsightsBlobs folder={folder} />}

          {tab === 'insights' && reactions.length === 0 && (
            <p className="mt-6 text-xs text-fg-subtle">
              아직 두 사람의 감정이 충분히 모이지 않았어요.
            </p>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center"
        aria-hidden={kept ? false : undefined}
      >
        <div
          className="pointer-events-auto w-full max-w-[var(--container-mobile)] px-6 pb-9 pt-5"
          style={{
            background:
              'linear-gradient(to top, var(--color-bg) 65%, transparent)',
          }}
        >
          <button
            type="button"
            disabled={kept}
            onClick={() => setKept(true)}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-base font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-default disabled:opacity-90"
          >
            {kept ? (
              <>
                <Check size={18} strokeWidth={2.25} />
                책장에 꽂았어요
              </>
            ) : (
              <>
                <Bookmark size={18} strokeWidth={2} />
                책장에 간직하기
              </>
            )}
          </button>
          {kept ? (
            <Link
              to={paths.library}
              className="mt-2.5 block text-center font-serif text-[11px] tracking-wide text-fg-muted transition-colors hover:text-fg"
            >
              라이브러리로 가기 →
            </Link>
          ) : (
            <p className="mt-2.5 text-center font-serif text-[11px] tracking-wide text-fg-subtle">
              각자의 책장에 복사본이 꽂혀요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 책 미니어처 — 책 표지 톤만 살린 작은 도식 (40×54).
 */
function BookMini({ cover, title }: { cover: string; title: string }) {
  return (
    <div
      className="relative flex h-[54px] w-10 shrink-0 items-end overflow-hidden rounded-l-[3px] rounded-r-[5px] px-1.5 py-1"
      style={{ backgroundColor: cover }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
        aria-hidden
      />
      <span className="relative z-10 font-serif text-[7px] leading-[1.4] text-white/75">
        {title.slice(0, 6)}
      </span>
    </div>
  );
}
