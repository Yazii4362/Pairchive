import { ArrowLeft, Moon, Sun, User, Bell, LogOut, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/theme/ThemeProvider';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/store/useAppStore';

/**
 * 설정 — 계정/테마/알림 환경설정.
 *
 * Dock 의 테마 토글이 이 페이지로 이관되었습니다.
 * (Dock 슬롯을 4-탭 네비게이션 전용으로 깔끔하게 비웠어요.)
 */
export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const hasCompletedFirstBook = useAppStore((s) => s.hasCompletedFirstBook);
  const firstBookUnlockSeen = useAppStore((s) => s.firstBookUnlockSeen);
  const markFirstBookCompleted = useAppStore((s) => s.markFirstBookCompleted);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);

  const libraryState = hasCompletedFirstBook
    ? firstBookUnlockSeen
      ? 'UNLOCKED'
      : 'UNLOCK_PENDING'
    : 'LOCKED';

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
          Settings
        </p>
      </header>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">설정</h1>

      {/* 테마 토글 */}
      <section className="mt-8">
        <h2 className="font-serif text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          Appearance
        </h2>
        <div
          role="radiogroup"
          aria-label="테마"
          className="mt-3 flex rounded-lg border border-border bg-surface-strong p-1"
        >
          <ThemeOption
            label="라이트"
            icon={<Sun size={14} strokeWidth={1.75} />}
            active={theme === 'light'}
            onClick={() => setTheme('light')}
          />
          <ThemeOption
            label="다크"
            icon={<Moon size={14} strokeWidth={1.75} />}
            active={theme === 'dark'}
            onClick={() => setTheme('dark')}
          />
        </div>
      </section>

      {/* 그 외 메뉴 (스텁) */}
      <section className="mt-10">
        <h2 className="font-serif text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          Account
        </h2>
        <ul className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface-strong">
          <SettingsRow icon={<User size={16} strokeWidth={1.75} />} label="프로필 편집" />
          <SettingsRow icon={<Bell size={16} strokeWidth={1.75} />} label="알림 환경설정" />
          <SettingsRow
            icon={<LogOut size={16} strokeWidth={1.75} />}
            label="로그아웃"
            danger
          />
        </ul>
      </section>

      {/* ────────────── 데모/개발 도구 — 첫 책 완성 흐름 시뮬레이션 ────────────── */}
      <section className="mt-10">
        <div className="flex items-center gap-1.5">
          <FlaskConical size={12} strokeWidth={1.75} className="text-fg-subtle" />
          <h2 className="font-serif text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
            Dev · 라이브러리 잠금 흐름
          </h2>
        </div>
        <p className="mt-2 text-[12px] text-fg-muted">
          현재 상태:{' '}
          <span className="font-mono text-[11px] tracking-wider text-fg">
            {libraryState}
          </span>
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={markFirstBookCompleted}
            disabled={hasCompletedFirstBook}
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            첫 책 완성 시뮬레이션 (즉시 축하 모달 + 다음 진입 배너 예약)
          </button>
          <button
            type="button"
            onClick={resetOnboarding}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            처음 상태로 되돌리기 (→ LOCKED)
          </button>
        </div>
        <p className="mt-3 text-[11px] text-fg-subtle">
          데모용 — 실제 구현에선 책 상태가 처음 expired 로 바뀌는 순간이 트리거합니다.
        </p>
      </section>

      <p className="mt-8 text-center font-serif text-[11px] text-fg-subtle">
        Pairchive · v0.0.1
      </p>
    </div>
  );
}

function ThemeOption({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors',
        active
          ? 'border border-border bg-bg text-fg'
          : 'text-fg-muted hover:text-fg',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SettingsRow({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3.5 text-sm transition-colors hover:bg-surface',
          danger ? 'text-fg' : 'text-fg',
        )}
      >
        <span className={cn('text-fg-muted', danger && 'text-pink-600')}>
          {icon}
        </span>
        <span className={cn('flex-1 text-left', danger && 'text-pink-600')}>
          {label}
        </span>
      </button>
    </li>
  );
}
