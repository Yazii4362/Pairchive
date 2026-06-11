import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { Logo } from '@/components/Logo';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-strong px-5 py-12">
      <div className="w-full max-w-[var(--container-mobile)] rounded-2xl border border-border bg-surface p-8 shadow-card">
        <Link
          to={paths.landing}
          className="inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors hover:text-fg"
          aria-label="홈으로"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          <Logo height={20} />
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-fg">
          로그인
        </h1>
        <p className="mt-2 text-sm text-fg-muted">
          이메일로 로그인하고 페어와 함께 폴더를 만들어보세요.
        </p>

        <form className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-fg-muted">이메일</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none transition-colors focus:border-brand"
            />
          </label>

          <button
            type="button"
            className="mt-2 h-11 rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            인증 메일 받기
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-fg-subtle">
          아직 백엔드가 없는 상태예요. 다음 스텝에서 mock 로그인으로 연결할게요.
        </p>
      </div>
    </div>
  );
}
