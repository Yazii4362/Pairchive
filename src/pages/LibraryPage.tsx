import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AlbumView } from '@/features/library/components/AlbumView';
import { EmptyLibraryState } from '@/features/library/components/EmptyLibraryState';
import {
  LibraryViewToggle,
  type LibraryViewMode,
} from '@/features/library/components/LibraryViewMenu';
import { ListView } from '@/features/library/components/ListView';
import { ScrollDial } from '@/features/library/components/ScrollDial';
import { StackView } from '@/features/library/components/StackView';
import { getLibraryTier } from '@/features/library/lib/tier';
import { toDialItems } from '@/features/library/lib/toDialItems';
import { LibraryScene } from '@/features/library/scenes/LibraryScene';
import { mockLibraryFolders } from '@/lib/mockData';

/**
 * "라이브러리" 탭 — 닫힌 책들의 영구 보관소. (PC-first 시안)
 *
 * 디자인 방향:
 *   - 권수에 따라 12 단계 톤으로 진화하는 파스텔 그라디언트 배경 (LibraryScene).
 *   - 책 막대는 페이지 하단(=GNB 위)에 항상 고정되어 쌓이고, 위쪽은 단계 톤의 빈 하늘.
 *   - 우측에 GPT-style 시간 다이얼 (ScrollDial). 평소엔 ticks 만, 마우스 진입 시
 *     자기장 효과 + "2026년 N월" 풍선이 마우스 Y 를 따라옴.
 *
 * PC-first 폭 설계:
 *   - 모바일       : 책 막대 max-w 520px, px-5.
 *   - lg(≥1024px) : 책 막대 max-w 760px, px-8. 화면 폭이 넓어질수록 책이 한 폭 더 자라남.
 *   - 헤더는 lg 부터 좌우 패딩이 커지고, "Library" 아이브로우가 한 호흡 큼직해짐.
 */
export default function LibraryPage() {
  const folders = mockLibraryFolders;

  const [view, setView] = useState<LibraryViewMode>('stack');
  const [menuOpen, setMenuOpen] = useState(false);

  const tier = useMemo(() => getLibraryTier(folders.length), [folders.length]);
  const dialItems = useMemo(() => toDialItems(folders), [folders]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <LibraryScene tier={tier.id} />

      <header className="sticky top-12 z-10 flex items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-10 lg:py-5">
        <div className="flex items-baseline gap-3 lg:gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-700/85 lg:text-[12px]">
            <span>Library</span>
            <span aria-hidden className="mx-3 text-stone-800">·</span>
            <span className="font-semibold text-stone-900">{folders.length} Books</span>
          </p>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500 lg:inline">
            <span aria-hidden className="mr-3">·</span>
            {tier.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="라이브러리에서 책 검색"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/75 text-stone-700 shadow-[0_2px_10px_-4px_rgb(0_0_0_/_0.12)] backdrop-blur-xl transition-colors hover:bg-white hover:text-stone-900"
          >
            <Search size={16} strokeWidth={1.75} />
          </button>
          <LibraryViewToggle
            current={view}
            onSelect={setView}
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {folders.length === 0 ? (
          <div className="flex flex-1 items-center justify-center pb-32 pt-12">
            <EmptyLibraryState />
          </div>
        ) : (
          <>
            {view === 'stack' && (
              <>
                <div className="flex-1" aria-hidden />
                <StackView folders={folders} />
              </>
            )}
            {view === 'album' && (
              <div className="pb-32 pt-6 sm:pt-8">
                <AlbumView folders={folders} />
              </div>
            )}
            {view === 'list' && (
              <div className="pb-32 pt-6 sm:pt-8">
                <ListView folders={folders} />
              </div>
            )}
          </>
        )}
      </main>

      {view === 'stack' && folders.length > 0 && <ScrollDial items={dialItems} />}
    </div>
  );
}
