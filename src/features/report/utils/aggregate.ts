/**
 * 페어 폴더(=책)의 링크 배열에서 리포트용 통계를 뽑아내는 헬퍼들.
 * 페이지 컴포넌트는 이 함수들의 결과만 받아 시각화합니다.
 */

import {
  CATEGORIES,
  CATEGORY_TO_HUE,
  type CategoryId,
} from '@/lib/categories';
import type { BubbleHue } from '@/lib/coverColors';
import {
  REACTIONS,
  REACTION_TO_HUE,
  type ReactionId,
} from '@/lib/reactions';
import type { Link } from '@/types';

/**
 * BubbleChart 가 그대로 소비할 수 있도록 id/label/value 외에
 * hue 와 icon 까지 함께 들고 다닙니다.
 */
export interface CountedItem<T extends string> {
  id: T;
  label: string;
  icon: string;
  value: number;
  hue: BubbleHue;
}

export function countByCategory(
  links: readonly Link[],
): CountedItem<CategoryId>[] {
  const counts = new Map<CategoryId, number>();
  for (const link of links) {
    counts.set(link.category, (counts.get(link.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, value]) => ({
      id,
      label: CATEGORIES[id].label,
      icon: CATEGORIES[id].icon,
      value,
      hue: CATEGORY_TO_HUE[id],
    }))
    .sort((a, b) => b.value - a.value);
}

export function countByReaction(
  links: readonly Link[],
): CountedItem<ReactionId>[] {
  const counts = new Map<ReactionId, number>();
  for (const link of links) {
    for (const reaction of link.reactions) {
      counts.set(reaction.type, (counts.get(reaction.type) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([id, value]) => ({
      id,
      label: REACTIONS[id].label,
      icon: REACTIONS[id].icon,
      value,
      hue: REACTION_TO_HUE[id],
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * 가장 자주 등장한 도메인 (호스트네임 기준).
 * "이달의 가장 인기 도메인은 X였어요" 인사이트에 사용.
 */
export function topDomain(links: readonly Link[]): {
  domain: string;
  count: number;
} | null {
  const counts = new Map<string, number>();
  for (const link of links) {
    try {
      const url = new URL(link.url);
      const host = url.hostname.replace(/^www\./, '');
      counts.set(host, (counts.get(host) ?? 0) + 1);
    } catch {
      // 잘못된 URL은 무시
    }
  }
  if (counts.size === 0) return null;

  let topHost = '';
  let topCount = 0;
  for (const [host, n] of counts) {
    if (n > topCount) {
      topCount = n;
      topHost = host;
    }
  }
  return { domain: topHost, count: topCount };
}

/**
 * 24시간 중 링크가 가장 많이 저장된 시간대를 시:분 형태가 아닌
 * "오후 N시" 라벨로 반환합니다.
 */
export function peakHourLabel(links: readonly Link[]): string | null {
  if (links.length === 0) return null;
  const buckets = new Array<number>(24).fill(0);
  for (const link of links) {
    const date = new Date(link.addedAt);
    if (Number.isNaN(date.getTime())) continue;
    buckets[date.getHours()] = (buckets[date.getHours()] ?? 0) + 1;
  }

  let peakHour = 0;
  let peakCount = 0;
  for (let h = 0; h < 24; h++) {
    if ((buckets[h] ?? 0) > peakCount) {
      peakCount = buckets[h]!;
      peakHour = h;
    }
  }

  if (peakCount === 0) return null;

  const period = peakHour < 12 ? '오전' : '오후';
  const hour12 = peakHour % 12 === 0 ? 12 : peakHour % 12;
  return `${period} ${hour12}시 ~ ${hour12 + 1}시`;
}

/**
 * 한 달간 두 사람이 가장 좋아한 링크 Top N.
 * 정렬 기준: 리액션 총 개수 (동률이면 먼저 저장된 링크 우선).
 *
 * 리포트의 "하이라이트" 탭에서 사용합니다.
 */
export function topLinks(
  links: readonly Link[],
  limit = 5,
): readonly Link[] {
  return [...links]
    .map((link, idx) => ({ link, idx, reactCount: link.reactions.length }))
    .sort((a, b) => {
      if (b.reactCount !== a.reactCount) return b.reactCount - a.reactCount;
      return a.idx - b.idx;
    })
    .slice(0, limit)
    .map((x) => x.link);
}

export interface ReportSummary {
  totalLinks: number;
  totalReactions: number;
  uniqueDomains: number;
  durationDays: number;
}

export function summarize(
  links: readonly Link[],
  startedAt: string,
  endedAt: string,
): ReportSummary {
  const domainSet = new Set<string>();
  let totalReactions = 0;
  for (const link of links) {
    try {
      const url = new URL(link.url);
      domainSet.add(url.hostname.replace(/^www\./, ''));
    } catch {
      // ignore
    }
    totalReactions += link.reactions.length;
  }

  const start = new Date(startedAt).getTime();
  const end = new Date(endedAt).getTime();
  const durationDays = Number.isFinite(start) && Number.isFinite(end)
    ? Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
    : 0;

  return {
    totalLinks: links.length,
    totalReactions,
    uniqueDomains: domainSet.size,
    durationDays,
  };
}
