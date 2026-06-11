/**
 * 포스터 결의 그레인 노이즈를 그 자리에 그대로 깔아주는 가벼운 오버레이.
 *
 * 구현:
 *   - SVG feTurbulence 의 fractalNoise 로 생성한 회색 노이즈.
 *   - feColorMatrix saturate 0 으로 컬러 노이즈를 그레이로 환원.
 *   - mix-blend-overlay 가 기본 — 어두운 곳은 더 어둡게, 밝은 곳은 더 밝게 거칠어짐.
 *   - pointer-events-none 으로 인터랙션 안 가림.
 *
 * 사용:
 *   <div className="relative">
 *     <SomeBackground />
 *     <GrainOverlay />  ← 항상 마지막
 *     <Content />        ← 그레인 위로 또렷이
 *   </div>
 *
 * "fixed" 옵션은 viewport 전체 그레인이 필요한 페이지(라이브러리/메인 책장 등)에서 사용.
 * 그 외에는 absolute(default) — 부모 컨테이너 안에서만 그레인.
 */
interface GrainOverlayProps {
  /** 그레인 강도 — 0~1. 기본 0.14. */
  opacity?: number;
  /** 부모 안에서만 깔지 / viewport 전체. */
  scope?: 'absolute' | 'fixed';
  /** 노이즈 입자 크기 — 클수록 더 굵은 그레인. 기본 0.85 (포스터 결). */
  frequency?: number;
  /** 같은 화면에서 두 번 쓸 때 filter id 충돌을 막기 위한 인스턴스 키. */
  seed?: string;
}

export function GrainOverlay({
  opacity = 0.14,
  scope = 'absolute',
  frequency = 0.85,
  seed = 'g0',
}: GrainOverlayProps) {
  const filterId = `grain-${seed}`;
  return (
    <svg
      aria-hidden
      className={
        'pointer-events-none h-full w-full ' +
        (scope === 'fixed' ? 'fixed inset-0' : 'absolute inset-0')
      }
      style={{ opacity, mixBlendMode: 'overlay' }}
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={2}
          seed={1}
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
