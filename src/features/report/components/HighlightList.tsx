import { CATEGORIES } from '@/lib/categories';
import { REACTIONS } from '@/lib/reactions';
import type { Link } from '@/types';

/**
 * 하이라이트 패널 — 리액션 수 기준 Top N 링크 카드 리스트.
 *
 * 각 카드는:
 *   - 좌측: 큰 italic 순위(1, 2, 3...) — 매거진 톤
 *   - 우측: 도메인 / 제목 / 카테고리 칩 / 리액션 이모지 / "내가/네가 저장"
 * 카드 자체도 살짝 float 애니메이션이 돕니다.
 */
interface HighlightListProps {
  links: readonly Link[];
  /** 어느 사용자 시점에서 카드를 보여줄지 — "내가 저장 / 네가 저장" 판정용 */
  viewerId: string;
}

export function HighlightList({ links, viewerId }: HighlightListProps) {
  if (links.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-fg-subtle">
        아직 하이라이트할 링크가 없어요.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {links.map((link, i) => (
        <HighlightCard
          key={link.id}
          link={link}
          rank={i + 1}
          viewerId={viewerId}
          // 카드마다 살짝 다른 속도/지연
          dur={4.5 + (i % 3) * 0.35}
          delay={(i % 4) * 0.3}
        />
      ))}
    </ul>
  );
}

function HighlightCard({
  link,
  rank,
  viewerId,
  dur,
  delay,
}: {
  link: Link;
  rank: number;
  viewerId: string;
  dur: number;
  delay: number;
}) {
  const domain = extractDomain(link.url);
  const cat = CATEGORIES[link.category];
  const savedByMe = link.addedById === viewerId;

  const reactionIcons = uniqueReactionIcons(link).slice(0, 3);

  return (
    <li
      className="animate-float-soft flex items-start gap-3.5 rounded-2xl border border-border bg-surface-strong p-4"
      style={
        {
          '--dur': `${dur}s`,
          '--delay': `${delay}s`,
          '--lift': '-5px',
        } as React.CSSProperties
      }
    >
      <span className="min-w-6 pt-0.5 font-serif text-[28px] italic leading-none text-fg-subtle">
        {rank}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-serif text-[10px] uppercase tracking-[0.06em] text-brand">
          {domain}
        </p>
        <p className="truncate text-sm font-medium text-fg">{link.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-serif text-[10px] text-fg-muted">
            {cat.label}
          </span>
          {reactionIcons.length > 0 && (
            <span className="flex items-center gap-0.5 text-xs">
              {reactionIcons.map((icon, idx) => (
                <span key={idx}>{icon}</span>
              ))}
            </span>
          )}
          <span className="ml-auto font-serif text-[10px] text-fg-subtle">
            {savedByMe ? '내가 저장' : '네가 저장'}
          </span>
        </div>
      </div>
    </li>
  );
}

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function uniqueReactionIcons(link: Link): string[] {
  const seen = new Set<string>();
  const icons: string[] = [];
  for (const r of link.reactions) {
    const icon = REACTIONS[r.type].icon;
    if (!seen.has(icon)) {
      seen.add(icon);
      icons.push(icon);
    }
  }
  return icons;
}
