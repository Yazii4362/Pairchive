/**
 * 라이브러리 책장 진화 — 12 단계.
 *
 *  0권          : 비어있는 서재  (empty)
 *  1권          : 첫 번째 책     (one)
 *  2~10권       : 야늑한 방      (room)
 *  11~20권      : 창문 너머 하늘 (sky-window)
 *  21~30권      : 옥상 위 하늘   (sky-roof)
 *  31~40권      : 구름 위        (clouds)
 *  41~50권      : 배나무 가지    (pear-branch)  — PAirchive = Pear 의 펀
 *  51~70권      : 배나무 꼭대기  (pear-top)
 *  71~100권     : 성층권         (stratosphere)
 *  101~150권    : 우주 경계      (space-edge)
 *  151~300권    : 별빛 우주      (starlight)
 *  301권 이상   : 끝없는 우주    (cosmos)
 *
 * 임계값을 한 곳에서 관리해 추후 디자인 조정/AB 가 쉬워지도록 했습니다.
 */
export type LibraryTier =
  | 'empty'
  | 'one'
  | 'room'
  | 'sky-window'
  | 'sky-roof'
  | 'clouds'
  | 'pear-branch'
  | 'pear-top'
  | 'stratosphere'
  | 'space-edge'
  | 'starlight'
  | 'cosmos';

export interface LibraryTierMeta {
  id: LibraryTier;
  /** 사용자에게 보여줄 한국어 라벨 ("배나무 꼭대기" 등). */
  label: string;
  /** 한 줄 캡션 — 페이지 헤더 우상단의 부가 설명에 쓰임. */
  caption: string;
  /** 권수 범위 표기 ("21~30권" 등). 데모/디버그 용. */
  range: string;
  /** 다음 단계로 가기 위한 권수 임계 — null 이면 최종 단계. */
  nextThreshold: number | null;
}

const TIERS: ReadonlyArray<{ max: number; meta: LibraryTierMeta }> = [
  { max: 0, meta: { id: 'empty', label: '비어있는 서재', caption: '아직 시작 전', range: '0권', nextThreshold: 1 } },
  { max: 1, meta: { id: 'one', label: '첫 번째 책', caption: '시작의 자리', range: '1권', nextThreshold: 2 } },
  { max: 10, meta: { id: 'room', label: '야늑한 방', caption: '둘만의 서재', range: '2~10권', nextThreshold: 11 } },
  { max: 20, meta: { id: 'sky-window', label: '창문 너머 하늘', caption: '창밖이 펼쳐지는 자리', range: '11~20권', nextThreshold: 21 } },
  { max: 30, meta: { id: 'sky-roof', label: '옥상 위 하늘', caption: '하늘과 가까워진 자리', range: '21~30권', nextThreshold: 31 } },
  { max: 40, meta: { id: 'clouds', label: '구름 위', caption: '구름이 발 아래로', range: '31~40권', nextThreshold: 41 } },
  { max: 50, meta: { id: 'pear-branch', label: '배나무 가지', caption: '열매가 손에 닿는 자리', range: '41~50권', nextThreshold: 51 } },
  { max: 70, meta: { id: 'pear-top', label: '배나무 꼭대기', caption: '나무 꼭대기에 닿은 자리', range: '51~70권', nextThreshold: 71 } },
  { max: 100, meta: { id: 'stratosphere', label: '성층권', caption: '대기의 끝', range: '71~100권', nextThreshold: 101 } },
  { max: 150, meta: { id: 'space-edge', label: '우주 경계', caption: '별이 보이기 시작한 자리', range: '101~150권', nextThreshold: 151 } },
  { max: 300, meta: { id: 'starlight', label: '별빛 우주', caption: '사방이 별', range: '151~300권', nextThreshold: 301 } },
  { max: Number.POSITIVE_INFINITY, meta: { id: 'cosmos', label: '끝없는 우주', caption: '책이 별자리가 된 자리', range: '301권 이상', nextThreshold: null } },
];

export function getLibraryTier(bookCount: number): LibraryTierMeta {
  for (const t of TIERS) {
    if (bookCount <= t.max) return t.meta;
  }
  return TIERS[TIERS.length - 1].meta;
}
