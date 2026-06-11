import { useEffect, useState } from 'react';
import { BookOpen, X } from 'lucide-react';

interface LibraryUnlockedBannerProps {
  /** 4000ms 자동 사라짐 또는 X 클릭 시 호출. */
  onDismiss: () => void;
}

/**
 * "이제 두 번째 책장을 사용할 수 있어요 ↑"
 *
 * 첫 책 완성 직후 다음 메인 화면 진입 시 1F 헤더 위에 한 번 떠오르는 안내 배너.
 *
 * 자동/수동 모두 닫힘:
 *   - 4초 후 자동으로 fade-out → onDismiss
 *   - 우측 상단 X 버튼 → 즉시 onDismiss
 *
 * 시각:
 *   - bg-brand-soft (= brand 10% 톤) / border brand 20% 톤
 *   - BookOpen 아이콘 + brand 색 텍스트
 *   - banner-flash 애니메이션으로 진입→hold→fade-out 한 트랙
 *
 * 표시 조건은 부모(PairFolderListPage) 가 결정.
 * 여기서는 단지 "있을 땐 4s 머물고 사라진다" 만 책임짐.
 */
export function LibraryUnlockedBanner({ onDismiss }: LibraryUnlockedBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-banner-flash mb-6 flex items-center gap-2.5 rounded-2xl border border-brand/20 bg-brand-soft px-4 py-3"
    >
      <BookOpen size={16} strokeWidth={1.75} className="shrink-0 text-brand" aria-hidden />
      <p className="flex-1 text-sm font-medium text-brand">
        이제 두 번째 책장을 사용할 수 있어요 <span aria-hidden>↑</span>
      </p>
      <button
        type="button"
        aria-label="배너 닫기"
        onClick={() => {
          setVisible(false);
          onDismiss();
        }}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand/10"
      >
        <X size={14} strokeWidth={1.75} />
      </button>
    </div>
  );
}
