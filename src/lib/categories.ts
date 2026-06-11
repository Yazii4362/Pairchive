/**
 * 링크 저장 시 사용자가 고르는 14개 추천 카테고리.
 * 가장 많이 선택된 카테고리가 공유 폴더의 "주제(topic)"가 되고,
 * 한 달이 지나 폴더가 종료될 때 그 주제에 맞는 책 커버 일러스트가 입혀집니다.
 *
 * 순서는 디자인 시안의 칩 배치를 그대로 따릅니다.
 */

import type { BubbleHue } from './coverColors';

export const CATEGORY_IDS = [
  'restaurant',
  'cafe',
  'hobby',
  'travel',
  'workout',
  'recipe',
  'shopping',
  'music',
  'info',
  'finance',
  'startup',
  'reference',
  'article',
  'quote',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  icon: string;
}

export const CATEGORIES: Readonly<Record<CategoryId, CategoryMeta>> = {
  restaurant: { id: 'restaurant', label: '맛집', icon: '🍜' },
  cafe: { id: 'cafe', label: '카페', icon: '☕' },
  hobby: { id: 'hobby', label: '취미', icon: '🎨' },
  travel: { id: 'travel', label: '여행', icon: '✈️' },
  workout: { id: 'workout', label: '운동', icon: '💪' },
  recipe: { id: 'recipe', label: '레시피', icon: '🥗' },
  shopping: { id: 'shopping', label: '쇼핑', icon: '🛍️' },
  music: { id: 'music', label: '음악', icon: '🎵' },
  info: { id: 'info', label: '정보', icon: 'ℹ️' },
  finance: { id: 'finance', label: '재테크', icon: '💰' },
  startup: { id: 'startup', label: '스타트업', icon: '🚀' },
  reference: { id: 'reference', label: '레퍼런스', icon: '📌' },
  article: { id: 'article', label: '아티클', icon: '📰' },
  quote: { id: 'quote', label: '글귀', icon: '💬' },
} as const;

export const CATEGORY_LIST: readonly CategoryMeta[] = CATEGORY_IDS.map(
  (id) => CATEGORIES[id],
);

/**
 * 리포트 버블 차트에서 사용하는 카테고리 → hue family 매핑.
 * 의미상 비슷한 카테고리끼리 같은 hue 로 묶었습니다.
 *  - green  : 학습/지식 (article, reference, info, startup)
 *  - pink   : 따뜻함/표현 (cafe, music, quote)
 *  - yellow : 일상/실용/취미 (shopping, finance, hobby)
 *  - orange : 활기/육체 (restaurant, recipe, workout)
 *  - blue   : 여백/확장 (travel)
 */
export const CATEGORY_TO_HUE: Readonly<Record<CategoryId, BubbleHue>> = {
  article: 'green',
  reference: 'green',
  info: 'green',
  startup: 'green',
  cafe: 'pink',
  music: 'pink',
  quote: 'pink',
  shopping: 'yellow',
  finance: 'yellow',
  hobby: 'yellow',
  restaurant: 'orange',
  recipe: 'orange',
  workout: 'orange',
  travel: 'blue',
} as const;

/**
 * 링크들의 카테고리 분포를 보고 가장 많은 카테고리를 반환합니다.
 * 동률이면 먼저 등장한(=먼저 저장된) 카테고리가 우선합니다.
 * 빈 배열이면 null.
 */
export function pickDominantCategory(
  categories: readonly CategoryId[],
): CategoryId | null {
  if (categories.length === 0) return null;

  const counts = new Map<CategoryId, number>();
  for (const c of categories) {
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }

  let winner: CategoryId = categories[0]!;
  let max = 0;
  for (const c of categories) {
    const n = counts.get(c) ?? 0;
    if (n > max) {
      max = n;
      winner = c;
    }
  }
  return winner;
}
