/**
 * 책 커버(공유 폴더 표지) 색상 프리셋.
 *
 * 컨셉 정리:
 *  - "진행 중" 상태에서는 단색 솔리드 커버
 *  - 한 달이 지나 폴더가 종료되면 가장 많이 저장된 카테고리에 맞는
 *    일러스트 커버가 입혀짐 — 이때도 베이스 컬러는 이 프리셋의 한 색
 *  - 즉, 단색 커버와 디자인된 커버의 색상은 같은 팔레트를 공유
 *
 * UI 영역(버튼/탭바/사이드바 등)에는 절대 사용하지 않고, 책 커버 한정.
 */

import type { CategoryId } from './categories';

/**
 * 5개 hue 패밀리. UI 가 아닌 책 커버/리포트 데이터 시각화에서만 사용합니다.
 */
export const BUBBLE_HUES = ['yellow', 'pink', 'green', 'orange', 'blue'] as const;
export type BubbleHue = (typeof BUBBLE_HUES)[number];

export const COVER_COLOR_IDS = [
  'pear',
  'archive',
  'index',
  'story',
  'deep',
] as const;

export type CoverColorId = (typeof COVER_COLOR_IDS)[number];

/** 책 cover color id → hue family 매핑 (단일 책 = 단일 hue) */
export const COVER_TO_HUE: Readonly<Record<CoverColorId, BubbleHue>> = {
  pear: 'yellow',
  archive: 'pink',
  index: 'green',
  story: 'orange',
  deep: 'blue',
} as const;

export interface CoverColorPreset {
  id: CoverColorId;
  /** 사용자에게 보여줄 한글 라벨 */
  label: string;
  /** 표지 메인 면에 들어가는 색 — Tailwind 유틸 클래스 */
  bgClass: string;
  /** 책 상단 띠/그림자 등 보조 면 */
  accentClass: string;
  /** 표지 위에 올라가는 텍스트 색상 */
  fgClass: string;
  /** Raw CSS 변수 (커스텀 마크업/그라데이션 등에 인라인 사용) */
  cssVar: `var(--${string})`;
}

/**
 * 5개의 솔리드 커버 프리셋. 모두 우리 컬러 시스템의 600 스텝을 사용해
 * 흰 텍스트가 잘 읽히도록 했습니다.
 */
export const COVER_COLORS: Readonly<Record<CoverColorId, CoverColorPreset>> = {
  pear: {
    id: 'pear',
    label: 'Pear',
    bgClass: 'bg-yellow-600',
    accentClass: 'bg-yellow-900',
    fgClass: 'text-white',
    cssVar: 'var(--yellow-600)',
  },
  archive: {
    id: 'archive',
    label: 'Archive',
    bgClass: 'bg-pink-600',
    accentClass: 'bg-pink-900',
    fgClass: 'text-white',
    cssVar: 'var(--pink-600)',
  },
  index: {
    id: 'index',
    label: 'Index',
    bgClass: 'bg-green-600',
    accentClass: 'bg-green-900',
    fgClass: 'text-white',
    cssVar: 'var(--green-600)',
  },
  story: {
    id: 'story',
    label: 'Story',
    bgClass: 'bg-orange-600',
    accentClass: 'bg-orange-900',
    fgClass: 'text-white',
    cssVar: 'var(--orange-600)',
  },
  deep: {
    id: 'deep',
    label: 'Deep',
    bgClass: 'bg-blue-600',
    accentClass: 'bg-blue-900',
    fgClass: 'text-white',
    cssVar: 'var(--blue-600)',
  },
} as const;

export const COVER_COLOR_LIST: readonly CoverColorPreset[] = COVER_COLOR_IDS.map(
  (id) => COVER_COLORS[id],
);

/**
 * 가장 많이 저장된 카테고리에 대응하는 기본 커버 색을 반환합니다.
 * (디자이너가 추후 카테고리별 시그니처 컬러를 재지정할 수 있도록
 *  이 매핑은 한 함수에 모아둡니다.)
 */
export function defaultCoverColorForCategory(
  category: CategoryId | null,
): CoverColorId {
  if (!category) return 'index';
  switch (category) {
    case 'restaurant':
    case 'recipe':
      return 'story';
    case 'cafe':
    case 'quote':
      return 'archive';
    case 'travel':
    case 'reference':
    case 'article':
      return 'deep';
    case 'workout':
    case 'finance':
    case 'startup':
      return 'index';
    case 'shopping':
    case 'music':
    case 'hobby':
    case 'info':
      return 'pear';
    default:
      return 'index';
  }
}
