import { Mail } from 'lucide-react';
import type { Invite } from '@/types';

interface InviteCardProps {
  invite: Invite;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

/**
 * "받은 초대장" 한 통.
 *
 * 시각 메타포:
 *   - 봉투(envelope) 카드 — 좌측 봉투 아이콘 + 보낸 사람 + 첫 책 제목.
 *   - 띠지 메시지가 있으면 본문에 인용 톤으로 노출 (font-serif italic).
 *   - 두 액션을 인라인으로 — `수락` 은 brand, `거절` 은 무채.
 *
 * 상태 변화:
 *   - pending : 액션 활성
 *   - accepted: 카드 옅게, "수락함" 라벨로 잠금. 첫 책이 1F 책장에 꽂혔다는 안내.
 *   - declined: 카드 옅게, "거절함" 라벨.
 *
 * 같은 컴포넌트를 페어 탭 "받은 초대함" / 알림 탭의 초대장 알림에서 공유 사용합니다.
 */
export function InviteCard({ invite, onAccept, onDecline }: InviteCardProps) {
  const isPending = invite.status === 'pending';

  return (
    <article
      className={
        'rounded-2xl border border-border bg-surface-strong p-4 transition-opacity ' +
        (isPending ? 'opacity-100' : 'opacity-60')
      }
    >
      <header className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Mail size={16} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-fg">
            <span className="font-medium">{invite.fromUserName}</span>
            <span className="text-fg-muted">님이 초대장을 보냈어요</span>
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-fg-subtle">
            {formatAgo(invite.sentAt)}
          </p>
        </div>
        {(invite.status === 'accepted' || invite.status === 'declined') && (
          <StatusBadge status={invite.status} />
        )}
      </header>

      <div className="mt-3 rounded-xl border border-border bg-bg-elevated px-4 py-3">
        <p className="font-serif text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          첫 책 제목
        </p>
        <p className="mt-1 font-serif text-[17px] font-medium text-fg">
          {invite.bookTitle}
        </p>
        {invite.message && (
          <p className="mt-2 font-serif text-[13px] italic leading-relaxed text-fg-muted">
            &ldquo;{invite.message}&rdquo;
          </p>
        )}
      </div>

      {isPending && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onDecline(invite.id)}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-border bg-bg-elevated text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            거절
          </button>
          <button
            type="button"
            onClick={() => onAccept(invite.id)}
            className="inline-flex h-10 flex-[1.6] items-center justify-center rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            수락하고 책 시작
          </button>
        </div>
      )}

      {invite.status === 'accepted' && (
        <p className="mt-3 text-[12px] text-fg-muted">
          첫 책이 1층 책장에 꽂혔어요. 함께 채워가 보세요.
        </p>
      )}
    </article>
  );
}

function StatusBadge({ status }: { status: 'accepted' | 'declined' }) {
  if (status === 'accepted') {
    return (
      <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-brand-soft px-2.5 font-mono text-[10px] tracking-wider text-brand">
        수락함
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-border px-2.5 font-mono text-[10px] tracking-wider text-fg-subtle">
      거절함
    </span>
  );
}

function formatAgo(iso: string): string {
  const sent = new Date(iso).getTime();
  if (!Number.isFinite(sent)) return '';
  const diffMs = Date.now() - sent;
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return '방금';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}일 전`;
  return new Date(iso).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
}
