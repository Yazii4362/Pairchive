import { ArrowLeft, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { InviteCard } from '@/features/pair/components/InviteCard';
import { useAppStore } from '@/store/useAppStore';

/**
 * 알림 (인박스) — 모든 사건이 한 줄로 흐르는 피드.
 *
 * 카드 종류:
 *   - 초대장 : `InviteCard` 재사용. 수락/거절 인라인 액션. 페어 탭 "받은 초대함" 과
 *              같은 zustand 슬라이스를 공유하므로, 어느 쪽에서 상태를 바꿔도 즉시 동기화.
 *   - 일반   : 텍스트 한 줄 + 시각 메타.
 *
 * 카드 사이의 시각 우선순위: 초대장이 가장 위 (액션 필요한 사건). 일반 알림은 그 아래.
 */
export default function NotificationsPage() {
  const navigate = useNavigate();

  const receivedInvites = useAppStore((s) => s.receivedInvites);
  const acceptInvite = useAppStore((s) => s.acceptInvite);
  const declineInvite = useAppStore((s) => s.declineInvite);

  const pendingInvites = receivedInvites.filter((iv) => iv.status === 'pending');

  return (
    <div className="mobile-canvas pt-6 pb-4">
      <header className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          Notifications
        </p>
      </header>

      <h1 className="mt-4 font-serif text-[28px] font-medium tracking-tight text-fg">
        알림
      </h1>

      {/* 초대장 — 액션 필요한 사건이 가장 위 */}
      {pendingInvites.length > 0 && (
        <section className="mt-6" aria-labelledby="noti-invites">
          <p
            id="noti-invites"
            className="mb-2 px-0.5 font-serif text-[11px] uppercase tracking-[0.16em] text-fg-subtle"
          >
            받은 초대장
          </p>
          <ul className="flex flex-col gap-2.5">
            {pendingInvites.map((invite) => (
              <li key={invite.id}>
                <InviteCard
                  invite={invite}
                  onAccept={acceptInvite}
                  onDecline={declineInvite}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 일반 알림 */}
      <section className="mt-8" aria-labelledby="noti-feed">
        <p
          id="noti-feed"
          className="mb-2 px-0.5 font-serif text-[11px] uppercase tracking-[0.16em] text-fg-subtle"
        >
          최근 활동
        </p>
        <ul className="flex flex-col gap-2.5">
          {GENERIC_NOTIFICATIONS.map((n, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface-strong p-4"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Bell size={14} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-fg">{n.text}</p>
                <p className="mt-0.5 font-serif text-[11px] text-fg-subtle">
                  {n.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-xs text-fg-subtle">
        아직 mock 알림입니다. 다음 스텝에서{' '}
        <Link to="/pair" className="text-brand hover:underline">
          실시간 알림
        </Link>
        과 연결할게요.
      </p>
    </div>
  );
}

const GENERIC_NOTIFICATIONS: { text: string; when: string }[] = [
  { text: '보라님이 「여름의 페어」에 링크를 추가했어요', when: '1시간 전' },
  { text: '「봄의 책」이 7일 뒤에 닫혀요', when: '4시간 전' },
  { text: '에이미님이 초대장을 수락했어요', when: '어제' },
];
