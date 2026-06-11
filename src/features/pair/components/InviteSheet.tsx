import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface InviteSheetProps {
  open: boolean;
  onClose: () => void;
  onSend: (payload: { contact: string; bookTitle: string; message: string }) => void;
}

/**
 * "친구에게 초대장 보내기" 바텀시트.
 *
 * 디자인 컨셉:
 *   - 책의 띠지를 입히듯이, 입력값이 그대로 상대의 알림으로 도착하는 한 통의 편지.
 *   - 카피는 기능형이 아닌 메타포 톤 ("받는 사람" / "첫 책 제목" / "띠지 메시지").
 *   - 모바일 컨테이너 폭(`--container-mobile`) 안에 정렬되어, PC에서도 같은 폭 유지.
 *   - `Escape` 로 닫힘 + 오버레이 클릭 닫힘.
 *
 * 사용성:
 *   - 받는 사람만 필수, 나머지는 비워두면 기본값으로 채워짐.
 *   - 보내고 닫히면 잊는다(plant-and-forget). 수락 시에만 알림으로 회신 (mock).
 */
export function InviteSheet({ open, onClose, onSend }: InviteSheetProps) {
  const [contact, setContact] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [message, setMessage] = useState('');
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) {
      setContact('');
      setBookTitle('');
      setMessage('');
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const canSend = contact.trim().length > 0;

  function handleSend() {
    if (!canSend) return;
    onSend({
      contact: contact.trim(),
      bookTitle: bookTitle.trim() || '우리의 첫 책',
      message: message.trim(),
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="animate-fade-in absolute inset-0 bg-fg/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="animate-slide-up relative w-full max-w-[var(--container-mobile)] rounded-t-3xl bg-bg-elevated px-5 pb-8 pt-3 shadow-2xl">
        {/* 핸들 */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-strong" aria-hidden />

        <div className="flex items-start justify-between">
          <div>
            <h2
              id={titleId}
              className="font-serif text-[22px] font-medium tracking-tight text-fg"
            >
              친구에게 초대장 보내기
            </h2>
            <p className="mt-1 text-[13px] text-fg-muted">
              한 권의 책을 같이 채워갈 친구를 불러보세요.
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Field
            label="받는 사람"
            placeholder="이메일 또는 닉네임"
            value={contact}
            onChange={setContact}
            required
            inputRef={firstFieldRef}
          />
          <Field
            label="첫 책 제목"
            placeholder="우리의 첫 책"
            value={bookTitle}
            onChange={setBookTitle}
            hint="비우면 '우리의 첫 책' 으로 시작해요."
          />
          <Field
            label="띠지 메시지"
            placeholder="한 줄 인사를 남겨보세요"
            value={message}
            onChange={setMessage}
            multiline
            optional
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          초대장 보내기
        </button>
        <p className="mt-3 text-center text-[11px] text-fg-subtle">
          상대가 수락하면 두 사람의 책장에 첫 책이 꽂혀요.
        </p>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (next: string) => void;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  hint?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  required,
  optional,
  multiline,
  hint,
  inputRef,
}: FieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[12px] font-medium text-fg-muted">
        <span>
          {label}
          {required && <span className="ml-1 text-brand">*</span>}
        </span>
        {optional && <span className="text-[11px] text-fg-subtle">선택</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1.5 w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      ) : (
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1.5 h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      )}
      {hint && <p className="mt-1.5 text-[11px] text-fg-subtle">{hint}</p>}
    </div>
  );
}
