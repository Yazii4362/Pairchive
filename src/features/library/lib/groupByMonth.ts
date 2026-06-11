import type { PairFolder } from '@/types';

export interface MonthGroup {
  /** 'YYYY-MM' — 정렬/매칭용 단일 키. */
  key: string;
  /** '2025 4월' 형태의 사람-친화 라벨. */
  label: string;
  /** 해당 월에 닫힌 책 수. */
  count: number;
  /** 해당 월에서 가장 먼저(=가장 최근에) 닫힌 책의 id — 스크롤 앵커. */
  firstFolderId: string;
}

/**
 * 라이브러리 책 목록을 월 단위로 묶어 책장/우측 레일 양쪽에서 공유할 수 있게 합니다.
 *   - 정렬: expiresAt 내림차순 (= 가장 최근에 닫힌 책이 위)
 *   - 같은 월의 책 묶음에서 "첫 번째" 책 id 를 노출해, 우측 레일 클릭 시
 *     element.scrollIntoView({ block: 'center' }) 의 타겟으로 그대로 쓰입니다.
 */
export function groupByMonth(folders: PairFolder[]): MonthGroup[] {
  const sorted = [...folders].sort(
    (a, b) => +new Date(b.expiresAt) - +new Date(a.expiresAt),
  );

  const map = new Map<string, MonthGroup>();
  for (const folder of sorted) {
    const d = new Date(folder.expiresAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }
    map.set(key, {
      key,
      label: `${d.getFullYear()} ${d.getMonth() + 1}월`,
      count: 1,
      firstFolderId: folder.id,
    });
  }

  return Array.from(map.values());
}

/** 'YYYY-MM' 키 */
export function monthKeyOf(folder: PairFolder): string {
  const d = new Date(folder.expiresAt);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
