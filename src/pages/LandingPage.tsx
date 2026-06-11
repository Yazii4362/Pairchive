import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { Logo } from '@/components/Logo';

/**
 * 비로그인 진입 페이지.
 * 모든 화면이 모바일 컨테이너 기준이므로 단일 컬럼 세로 흐름.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mobile-canvas flex h-16 items-center justify-between">
        <Link to={paths.landing} aria-label="PAirchive 홈">
          <Logo height={28} />
        </Link>
        <Link
          to={paths.auth}
          className="rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-strong"
        >
          로그인
        </Link>
      </header>

      <section className="mobile-canvas flex flex-1 flex-col justify-center gap-8 py-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          Pair · Archive · Memory
        </p>
        <h1 className="text-[clamp(2.25rem,8vw,3rem)] font-semibold leading-[1.1] tracking-tight text-fg">
          둘이서 한 달,
          <br />
          링크로 남기는 기록.
        </h1>
        <p className="text-base leading-relaxed text-fg-muted">
          친구, 연인, 동료와 함께 폴더를 만들고 링크를 모으세요. 한 달이 지나면
          폴더는 자동으로 닫히고, 그대로 책장에 꽂혀 둘만의 작은 아카이브가 됩니다.
        </p>

        <div className="mt-2 flex flex-col gap-3">
          <Link
            to={paths.auth}
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            시작하기
          </Link>
          <Link
            to={paths.pair}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong text-sm font-medium text-fg transition-colors hover:bg-surface-strong"
          >
            미리보기
          </Link>
        </div>
      </section>
    </div>
  );
}
