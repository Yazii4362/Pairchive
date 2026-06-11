import { NavLink } from 'react-router-dom';
import {
  BookMarked,
  Users,
  Library as LibraryIcon,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

/**
 * 모든 화면 하단 중앙에 floating 된 4-탭 GNB.
 *
 * 디자인:
 *   - backdrop-blur + 반투명 elevated 배경
 *   - 4개 슬롯 동일 사이즈, 아이콘 + 작은 라벨 세로 정렬
 *   - active: fg/bg 반전, inactive: 무채색 hover
 *   - 테마 토글이나 + 새 폴더 같은 보조 액션은 두지 않음
 *     (테마 → 설정 페이지, 새 폴더 → 페이지 내 CTA 로 분리)
 */

interface NavSlot {
  to: string;
  label: string;
  icon: LucideIcon;
  /** 정확히 일치할 때만 active 로 칠지(=true) — /pair 가 /pair/:id 등에서 active 잡히지 않도록 */
  end?: boolean;
}

const SLOTS: readonly NavSlot[] = [
  { to: paths.pair, label: '책장', icon: BookMarked, end: false },
  { to: paths.pairs, label: '페어', icon: Users, end: true },
  { to: paths.library, label: '라이브러리', icon: LibraryIcon, end: false },
  { to: paths.reports, label: '리포트', icon: BarChart3, end: true },
];

export function Dock() {
  return (
    <nav
      aria-label="주 네비게이션"
      className="pointer-events-none fixed inset-x-0 z-30 flex justify-center"
      style={{ bottom: 'var(--dock-bottom-offset)' }}
    >
      <div
        className={cn(
          'pointer-events-auto flex items-center gap-1 rounded-full p-1.5',
          'border border-border bg-bg-elevated/70 backdrop-blur-xl shadow-pop',
        )}
      >
        {SLOTS.map((slot) => (
          <DockSlot key={slot.to} slot={slot} />
        ))}
      </div>
    </nav>
  );
}

function DockSlot({ slot }: { slot: NavSlot }) {
  const Icon = slot.icon;
  return (
    <NavLink
      to={slot.to}
      end={slot.end}
      aria-label={slot.label}
      className={({ isActive }) =>
        cn(
          'inline-flex h-14 w-[68px] flex-col items-center justify-center gap-0.5 rounded-full transition-colors',
          isActive
            ? 'bg-fg text-bg'
            : 'text-fg-muted hover:bg-surface-strong hover:text-fg',
        )
      }
    >
      <Icon size={18} strokeWidth={1.75} />
      <span className="text-[10px] font-medium tracking-wide">
        {slot.label}
      </span>
    </NavLink>
  );
}
