import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { paths } from '@/routes/paths';

/**
 * 모든 일반 페이지(=AppShell 하위) 공통 상단 헤더.
 *
 * 좌측: 브랜드 로고 (탭해서 책장 = /pair 로)
 * 우측: 알림 / 설정 두 아이콘
 *
 * 디자인 결정:
 *   - 모바일 컨테이너 안에서만 콘텐츠 정렬 (페이지와 동일한 480 너비 안)
 *   - bg-bg/85 + backdrop-blur 로 스크롤 시 콘텐츠가 살짝 비치는 톤
 *   - sticky top-0 — 페이지 위에 항상 고정
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mobile-canvas flex h-12 items-center justify-between">
        <Link to={paths.pair} aria-label="PAirchive 홈" className="-ml-0.5">
          <Logo height={20} />
        </Link>

        <div className="flex items-center gap-1">
          <TopBarIcon
            to={paths.notifications}
            label="알림"
            icon={<Bell size={17} strokeWidth={1.75} />}
          />
          <TopBarIcon
            to={paths.settings}
            label="설정"
            icon={<Settings size={17} strokeWidth={1.75} />}
          />
        </div>
      </div>
    </header>
  );
}

function TopBarIcon({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
    >
      {icon}
    </Link>
  );
}
