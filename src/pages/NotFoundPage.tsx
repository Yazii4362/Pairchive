import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

export default function NotFoundPage() {
  return (
    <div className="mobile-canvas flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
        404
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">
        찾을 수 없는 페이지예요.
      </h1>
      <Link
        to={paths.landing}
        className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
      >
        처음으로
      </Link>
    </div>
  );
}
