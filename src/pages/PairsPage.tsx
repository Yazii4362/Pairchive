import { useState } from 'react';
import { Send } from 'lucide-react';
import { InviteCard } from '@/features/pair/components/InviteCard';
import { InviteSheet } from '@/features/pair/components/InviteSheet';
import { PartnerRow } from '@/features/pair/components/PartnerRow';
import { mockPartners } from '@/lib/mockData';
import { useAppStore } from '@/store/useAppStore';

/**
 * "페어" 탭 — 같이 책을 쓰는 사람들의 어드레스북 + 초대장 진입.
 *
 * IA 결정:
 *   - 받은 초대함  : 알림 인박스와 같은 데이터 소스(`useAppStore.receivedInvites`)를
 *                    공유. 어느 쪽에서 수락/거절해도 양쪽 즉시 반영.
 *   - 페어 친구    : 클릭 시 그 친구와 함께 만든 책 책장 필터 뷰(`/pairs/:id`)로 이동.
 *   - 보낸 초대장  : 추적하지 않음(plant-and-forget). 상대가 수락하면 알림으로 회신.
 */
export default function PairsPage() {
  const [openInvite, setOpenInvite] = useState(false);

  const receivedInvites = useAppStore((s) => s.receivedInvites);
  const acceptInvite = useAppStore((s) => s.acceptInvite);
  const declineInvite = useAppStore((s) => s.declineInvite);

  const pending = receivedInvites.filter((iv) => iv.status === 'pending');

  return (
    <div className="mobile-canvas pt-8 pb-4">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          Pairs
        </p>
        <h1 className="mt-2 font-serif text-[28px] font-medium tracking-tight text-fg">
          함께 책을 쓰는 친구
        </h1>
        <p className="mt-1.5 text-sm text-fg-muted">
          한 권을 같이 채워갈 친구에게 초대장을 보내보세요.
        </p>
      </header>

      {/* 받은 초대함 — pending 이 있을 때만 노출 */}
      {pending.length > 0 && (
        <section className="mt-8" aria-labelledby="received-heading">
          <div className="mb-3 flex items-baseline justify-between px-0.5">
            <h2
              id="received-heading"
              className="font-serif text-[15px] font-medium text-fg"
            >
              받은 초대함
            </h2>
            <span className="font-mono text-[10px] tracking-wider text-fg-subtle">
              {pending.length}통
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {pending.map((invite) => (
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

      {/* 페어 친구 목록 */}
      <section className="mt-10" aria-labelledby="partners-heading">
        <div className="mb-3 flex items-baseline justify-between px-0.5">
          <h2
            id="partners-heading"
            className="font-serif text-[15px] font-medium text-fg"
          >
            페어 친구
          </h2>
          <span className="font-mono text-[10px] tracking-wider text-fg-subtle">
            {mockPartners.length}명
          </span>
        </div>
        {mockPartners.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-bg-elevated px-4 py-6 text-center text-sm text-fg-subtle">
            아직 페어가 없어요.
            <br />
            아래에서 첫 친구에게 초대장을 보내보세요.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {mockPartners.map((p) => (
              <li key={p.id}>
                <PartnerRow partner={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 보내기 CTA */}
      <button
        type="button"
        onClick={() => setOpenInvite(true)}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong"
      >
        <Send size={15} strokeWidth={1.75} />
        친구에게 초대장 보내기
      </button>

      <InviteSheet
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        onSend={(payload) => {
          // mock 단계 — 실제 전송 대신 콘솔에 한 통 남김. 다음 스텝에서 API 연결.
          // eslint-disable-next-line no-console
          console.info('[invite] sent:', payload);
        }}
      />
    </div>
  );
}
