import { useEffect, useRef } from 'react';
import { BookOpen, Grid3x3, List, SlidersHorizontal } from 'lucide-react';

export type LibraryViewMode = 'stack' | 'album' | 'list';

interface LibraryViewMenuProps {
  current: LibraryViewMode;
  onSelect: (mode: LibraryViewMode) => void;
}

interface LibraryViewToggleProps extends LibraryViewMenuProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const OPTIONS: Array<{
  id: LibraryViewMode;
  label: string;
  hint: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'stack',
    label: '책장으로 보기',
    hint: '시간순으로 쌓인 모습',
    icon: <BookOpen size={15} strokeWidth={1.75} />,
  },
  {
    id: 'album',
    label: '앨범으로 보기',
    hint: '표지를 그리드로',
    icon: <Grid3x3 size={15} strokeWidth={1.75} />,
  },
  {
    id: 'list',
    label: '리스트로 보기',
    hint: '제목·날짜 한 줄',
    icon: <List size={15} strokeWidth={1.75} />,
  },
];

/**
 * 필터 버튼 + 펼침 패널이 한 단위로 묶인 뷰 전환 모듈.
 *
 * "필터" 라벨을 그대로 유지한 이유: 사용자의 1차 mock 에서 같은 단어로 표기됐고,
 * 추후 카테고리/태그 필터까지 흡수해 한 메뉴로 키울 수 있는 자리이기 때문.
 *
 * 인터랙션:
 *   - 버튼 클릭 → 패널 토글
 *   - 옵션 선택 → onSelect 호출 + 패널 자동 닫힘
 *   - 패널 밖 클릭 또는 Escape → 닫힘
 */
export function LibraryViewToggle({
  current,
  onSelect,
  open,
  onToggle,
  onClose,
}: LibraryViewToggleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/40 bg-white/75 px-3.5 text-sm font-medium text-stone-800 shadow-[0_2px_10px_-4px_rgb(0_0_0_/_0.12)] backdrop-blur-xl transition-colors hover:bg-white"
      >
        <span>필터</span>
        <SlidersHorizontal size={14} strokeWidth={1.75} aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          className="animate-fade-in absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-bg-elevated p-1.5 shadow-2xl"
        >
          {OPTIONS.map((opt) => {
            const isActive = opt.id === current;
            return (
              <button
                key={opt.id}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  onSelect(opt.id);
                  onClose();
                }}
                className={
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ' +
                  (isActive
                    ? 'bg-surface-strong text-fg'
                    : 'text-fg-muted hover:bg-surface hover:text-fg')
                }
              >
                <span
                  className={
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ' +
                    (isActive
                      ? 'bg-brand-soft text-brand'
                      : 'bg-surface text-fg-muted')
                  }
                >
                  {opt.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="mt-0.5 text-[11px] text-fg-subtle">
                    {opt.hint}
                  </p>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
