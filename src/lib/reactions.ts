/**
 * 링크에 페어가 남길 수 있는 8가지 리액션 종류.
 * 한 사람이 한 링크에 여러 리액션을 남길 수 있고,
 * 한 달이 지나 책이 종료될 때 리포트의 "Emotions" 챕터에서 집계됩니다.
 */

import type { BubbleHue } from './coverColors';

export const REACTION_IDS = [
  'love',
  'inspire',
  'curious',
  'fun',
  'warm',
  'wow',
  'calm',
  'sad',
] as const;

export type ReactionId = (typeof REACTION_IDS)[number];

export interface ReactionMeta {
  id: ReactionId;
  label: string;
  icon: string;
}

export const REACTIONS: Readonly<Record<ReactionId, ReactionMeta>> = {
  love: { id: 'love', label: '좋아', icon: '💗' },
  inspire: { id: 'inspire', label: '영감', icon: '✨' },
  curious: { id: 'curious', label: '호기심', icon: '🤔' },
  fun: { id: 'fun', label: '재밌', icon: '😆' },
  warm: { id: 'warm', label: '따뜻', icon: '🥰' },
  wow: { id: 'wow', label: '놀람', icon: '🤯' },
  calm: { id: 'calm', label: '차분', icon: '🌿' },
  sad: { id: 'sad', label: '짠함', icon: '🥲' },
} as const;

export const REACTION_LIST: readonly ReactionMeta[] = REACTION_IDS.map(
  (id) => REACTIONS[id],
);

/**
 * 리액션 → hue family 매핑.
 *  - pink   : 애정/따뜻 (love, warm)
 *  - yellow : 가볍/활기 (fun, inspire)
 *  - green  : 평온/탐구 (calm, curious)
 *  - orange : 충격/놀람 (wow)
 *  - blue   : 짠함/여백 (sad)
 */
export const REACTION_TO_HUE: Readonly<Record<ReactionId, BubbleHue>> = {
  love: 'pink',
  warm: 'pink',
  fun: 'yellow',
  inspire: 'yellow',
  calm: 'green',
  curious: 'green',
  wow: 'orange',
  sad: 'blue',
} as const;

/**
 * 가장 자주 등장한 리액션을 반환합니다.
 * 빈 배열이면 null. 동률이면 먼저 등장한 것 우선.
 */
export function pickDominantReaction(
  reactions: readonly ReactionId[],
): ReactionId | null {
  if (reactions.length === 0) return null;
  const counts = new Map<ReactionId, number>();
  for (const r of reactions) counts.set(r, (counts.get(r) ?? 0) + 1);

  let winner: ReactionId = reactions[0]!;
  let max = 0;
  for (const r of reactions) {
    const n = counts.get(r) ?? 0;
    if (n > max) {
      max = n;
      winner = r;
    }
  }
  return winner;
}
