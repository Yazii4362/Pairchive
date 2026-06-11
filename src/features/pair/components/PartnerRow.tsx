import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import type { PairPartner } from '@/types';

/**
 * 페어 친구 한 줄.
 *
 * 시각 메타포:
 *   - 좌측 아바타 — User.avatarHex 단색 (UI는 그린/뉴트럴만, 아바타는 개인 식별색이라 예외 1개).
 *   - 우측 미니 책등 더미 — 함께 만든 책 권 수를 책꽂이처럼 5권 max 로 점유. 그 이상은 "+N" 라벨.
 *   - 한 행 클릭 → /pairs/:id (그 친구와 함께한 책장 필터 뷰).
 *
 * 디자인 결정:
 *   - 미니 책등 색은 fg-subtle 톤의 회색조 — UI 영역이라 액센트 컬러를 끌어다 쓰지 않음.
 *     (책 표지의 실제 색은 책장 페이지에서만 등장)
 */
export function PartnerRow({ partner }: { partner: PairPartner }) {
  const initial = partner.name.slice(0, 1);
  const visibleBooks = Math.min(partner.bookCount, 5);
  const extra = partner.bookCount - visibleBooks;

  return (
    <Link
      to={paths.pairFriend(partner.id)}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-strong p-3.5 transition-colors hover:border-border-strong"
    >
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-[15px] font-medium text-white"
        style={{ backgroundColor: partner.avatarHex }}
        aria-hidden
      >
        {initial}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{partner.name}</p>
        <p className="mt-0.5 text-[11px] text-fg-muted">
          함께 만든 책 {partner.bookCount}권 · {formatLastActive(partner.lastActiveAt)}
        </p>
      </div>

      <div className="flex items-end gap-[2px]" aria-hidden>
        {Array.from({ length: visibleBooks }).map((_, i) => (
          <span
            key={i}
            className="block w-[3px] rounded-sm bg-fg-subtle/60 transition-colors group-hover:bg-fg-muted"
            style={{ height: `${14 + ((i * 7) % 10)}px` }}
          />
        ))}
        {extra > 0 && (
          <span className="ml-1 font-mono text-[10px] tracking-wider text-fg-subtle">
            +{extra}
          </span>
        )}
      </div>

      <ChevronRight
        size={16}
        strokeWidth={1.5}
        className="text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg-muted"
      />
    </Link>
  );
}

function formatLastActive(iso: string): string {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return '';
  const diffHr = Math.floor((Date.now() - t) / 3600_000);
  if (diffHr < 1) return '방금 활동';
  if (diffHr < 24) return `${diffHr}시간 전 활동`;
  const day = Math.floor(diffHr / 24);
  if (day < 7) return `${day}일 전 활동`;
  return `${Math.floor(day / 7)}주 전 활동`;
}
