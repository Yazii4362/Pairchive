/**
 * 책 표지(spine) 의 "Grainy Gradient Illustration" 톤 — 단색 대신
 * 멀티스톱 그라디언트 + 좌상 글로우 로 표지 한 면을 한 그림처럼 만들어줍니다.
 *
 * 사용 위치:
 *   - 메인 책장의 BookSpine (책등 정면)
 *   - 라이브러리의 BookStackBar (책 막대) 와 다른 톤: 그쪽은 파스텔 cream,
 *     여기 spine 은 한 단계 더 채도 있는 인쇄 일러스트 톤.
 *
 * 색은 index.css 의 --cover-grad-{id}-{top|mid|bot|glow} 변수로 정의되어
 * 라이트/다크 모드에서 같은 함수 호출로 자동 스왑됩니다.
 */
import type { CoverColorId } from './coverColors';

/**
 * 책등 한 면의 메인 그라디언트 (위→아래 3-stop).
 * 표지 위쪽이 가장 밝고(글씨 잘 읽힘), 아래로 갈수록 진해져 무게가 잡힙니다.
 */
export function coverSpineGradient(id: CoverColorId): string {
  return `linear-gradient(180deg, var(--cover-grad-${id}-top) 0%, var(--cover-grad-${id}-mid) 55%, var(--cover-grad-${id}-bot) 100%)`;
}

/**
 * 책등 좌상단의 부드러운 글로우 한 점 — 인쇄 일러스트의 "빛 한 줌".
 * 메인 그라디언트 위에 살짝 얹어 단색의 평평함을 없애줍니다.
 */
export function coverSpineGlow(id: CoverColorId): string {
  return `radial-gradient(120% 60% at 30% 18%, var(--cover-grad-${id}-glow) 0%, transparent 70%)`;
}

/**
 * BookSpine 의 `style.background` 에 그대로 넣을 수 있는 합성 문자열.
 * 글로우(위) → 메인 그라디언트(아래) 두 레이어를 한 줄로.
 */
export function coverSpineBackground(id: CoverColorId): string {
  return `${coverSpineGlow(id)}, ${coverSpineGradient(id)}`;
}
