import type { PairFolder } from '@/types';
import type { ScrollDialItem } from '../components/ScrollDial';

/**
 * 라이브러리의 PairFolder 리스트 → ScrollDial 입력 형태.
 *
 * 정렬 약속:
 *   - StackView 와 동일 — expiresAt 내림차순.
 *   - 즉 다이얼의 가장 위 tick = 가장 최근 책 = 스택의 꼭대기.
 *   - 다이얼의 가장 아래 tick = 가장 오래된 책 = GNB 위에 겹쳐있는 첫 책.
 *
 * 라벨:
 *   - 메인  : "2026년 6월" — 책의 마감 월(=라이브러리에 꽂힌 시점) 시간 축.
 *   - 서브  : 책 제목 — 다이얼 풍선 안에서 굵게 표시되는 보조 정보.
 */
export function toDialItems(folders: readonly PairFolder[]): ScrollDialItem[] {
  const sorted = [...folders].sort(
    (a, b) => +new Date(b.expiresAt) - +new Date(a.expiresAt),
  );
  return sorted.map((folder) => ({
    id: folder.id,
    label: formatYearMonth(folder.expiresAt),
    sub: folder.title,
  }));
}

function formatYearMonth(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
}
