import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

/**
 * "첫 책을 완성했어요" — 책이 만료되어 라이브러리에 보관된 직후,
 * 사용자가 어디 있든 즉시 한 번 뜨는 축하 오버레이.
 *
 * 흐름:
 *   1) 어떤 책의 status 가 처음 expired 가 되면 markFirstBookCompleted() 가 호출됨
 *      → hasCompletedFirstBook=true, showFirstBookModal=true, firstBookUnlockSeen=false
 *   2) 이 컴포넌트가 AppShell 전역에 마운트되어 있어 즉시 모달이 뜸
 *   3) 사용자가 "확인" → setShowFirstBookModal(false) 로 닫힘
 *   4) 다음 메인 화면 진입 시 LibraryUnlockedBanner 가 한 번 등장
 *
 * 즉시 축하와 다음 진입 배너를 분리한 이유:
 *   - 즉시: 사용자가 방금 한 일을 정확히 짚어줌 ("당신이 첫 책을 만들었어요")
 *   - 다음 진입: 책장 UI 자체가 변했음을 자연스럽게 안내 ("이제 위 책장이 열려요")
 */
export function FirstBookCompletionModal() {
  const open = useAppStore((s) => s.showFirstBookModal);
  const setShow = useAppStore((s) => s.setShowFirstBookModal);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShow(false);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, setShow]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-book-title"
    >
      {/* 전역 딤 — 책 완성의 무게감 */}
      <div
        className="animate-fade-in absolute inset-0 bg-fg/55 backdrop-blur-sm"
        onClick={() => setShow(false)}
        aria-hidden
      />

      <div className="animate-slide-up relative w-full max-w-sm rounded-3xl bg-bg-elevated p-6 text-center shadow-2xl">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Sparkles size={22} strokeWidth={1.75} />
        </span>

        <h2
          id="first-book-title"
          className="mt-5 font-serif text-[24px] font-medium leading-[1.2] tracking-tight text-fg"
        >
          첫 책을 완성했어요
        </h2>

        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-fg-muted">
          {`이제 두 번째 책장이 열렸어요.\n간직한 책들이 위 책장에 꽂힙니다.`}
        </p>

        <button
          type="button"
          onClick={() => setShow(false)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong"
        >
          확인
        </button>
      </div>
    </div>
  );
}
