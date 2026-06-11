/**
 * 리포트 페이지를 미리 볼 수 있는 더미 데이터.
 * 실제 백엔드/스토어 연결 전까지의 시각 검증용입니다.
 */

import type { CategoryId } from './categories';
import type { ReactionId } from './reactions';
import type { Invite, Link, PairFolder, PairPartner } from '@/types';

const PARTNERS = {
  amy: { id: 'u_amy', name: '에이미' },
  bora: { id: 'u_bora', name: '보라' },
};

/**
 * userId → 사람 이름 단순 매핑.
 * 책등(저자명) / 책장 헤더 등 "그 사람이 누구인지" 만 보여줄 때 사용.
 * 백엔드 연동 시에는 폴더 응답에 author 객체가 같이 내려올 거라, 이 매핑은 mock 단계에서만 쓰입니다.
 */
export const USER_NAMES: Record<string, string> = {
  u_amy: '에이미',
  u_bora: '보라',
  u_jin: '진우',
  u_minji: '민지',
  u_chae: '채림',
};

/**
 * 현재 viewer(=로그인 사용자) 기준으로 "맞은편 사람"의 이름.
 * mock 단계에선 viewer = 에이미(u_amy)로 고정. 추후 store 의 currentUser 와 결합.
 *  - viewer 가 owner   → partner 이름을 돌려줌
 *  - viewer 가 partner → owner 이름을 돌려줌
 *  - 짝이 없으면(partnerId === null) null
 */
const VIEWER_ID = 'u_amy';

export function partnerNameOf(folder: {
  ownerId: string;
  partnerId: string | null;
}): string | null {
  if (folder.ownerId !== VIEWER_ID) {
    return USER_NAMES[folder.ownerId] ?? null;
  }
  if (folder.partnerId) {
    return USER_NAMES[folder.partnerId] ?? null;
  }
  return null;
}

function isoFrom(daysAgo: number, hour = 14, minute = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

interface LinkSeed {
  url: string;
  title: string;
  category: CategoryId;
  daysAgo: number;
  hour: number;
  by: 'amy' | 'bora';
  reactions?: { by: 'amy' | 'bora'; type: ReactionId }[];
}

const SEEDS: LinkSeed[] = [
  // Article — 가장 많이 모은 주제
  { url: 'https://www.theverge.com/tech', title: 'The Verge Tech', category: 'article', daysAgo: 28, hour: 14, by: 'amy', reactions: [{ by: 'amy', type: 'inspire' }, { by: 'bora', type: 'curious' }] },
  { url: 'https://www.theverge.com/news', title: 'Daily News Brief', category: 'article', daysAgo: 25, hour: 15, by: 'bora', reactions: [{ by: 'amy', type: 'inspire' }] },
  { url: 'https://www.theverge.com/longform', title: 'Long Read · Future', category: 'article', daysAgo: 22, hour: 14, by: 'amy', reactions: [{ by: 'bora', type: 'inspire' }, { by: 'amy', type: 'inspire' }] },
  { url: 'https://stratechery.com/2026/ai', title: 'Stratechery on AI', category: 'article', daysAgo: 20, hour: 22, by: 'amy', reactions: [{ by: 'bora', type: 'wow' }] },
  { url: 'https://en.wikipedia.org/wiki/Memory', title: 'Wikipedia · Memory', category: 'article', daysAgo: 18, hour: 14, by: 'bora', reactions: [{ by: 'amy', type: 'curious' }] },
  { url: 'https://www.nytimes.com/article', title: 'NYT Feature', category: 'article', daysAgo: 14, hour: 9, by: 'amy', reactions: [{ by: 'bora', type: 'inspire' }] },

  // Travel
  { url: 'https://airbnb.com/jeju', title: '제주 한달살기 숙소', category: 'travel', daysAgo: 26, hour: 23, by: 'bora', reactions: [{ by: 'amy', type: 'love' }, { by: 'bora', type: 'love' }] },
  { url: 'https://booking.com/tokyo', title: '도쿄 골목 료칸', category: 'travel', daysAgo: 21, hour: 13, by: 'amy', reactions: [{ by: 'bora', type: 'love' }] },
  { url: 'https://atlasobscura.com/lisbon', title: 'Lisbon Hidden Spots', category: 'travel', daysAgo: 16, hour: 14, by: 'amy', reactions: [{ by: 'amy', type: 'inspire' }] },
  { url: 'https://nationalgeographic.com/iceland', title: 'Iceland Northern Lights', category: 'travel', daysAgo: 12, hour: 20, by: 'bora', reactions: [{ by: 'amy', type: 'wow' }, { by: 'bora', type: 'wow' }] },
  { url: 'https://maps.google.com/seoul', title: '서울 한적한 골목', category: 'travel', daysAgo: 8, hour: 14, by: 'amy' },

  // Cafe
  { url: 'https://instagram.com/cafe_yangsoo', title: '양수리 카페 야상', category: 'cafe', daysAgo: 24, hour: 15, by: 'bora', reactions: [{ by: 'amy', type: 'warm' }, { by: 'bora', type: 'warm' }] },
  { url: 'https://instagram.com/cafe_hannam', title: '한남동 디저트 카페', category: 'cafe', daysAgo: 19, hour: 14, by: 'amy', reactions: [{ by: 'bora', type: 'warm' }] },
  { url: 'https://blog.naver.com/cafe-songdo', title: '송도 베이커리', category: 'cafe', daysAgo: 11, hour: 16, by: 'amy', reactions: [{ by: 'bora', type: 'warm' }] },
  { url: 'https://instagram.com/cafe_seongsu', title: '성수 카페 오후', category: 'cafe', daysAgo: 6, hour: 14, by: 'bora' },

  // Reference
  { url: 'https://refactoring.guru', title: 'Refactoring Guru', category: 'reference', daysAgo: 27, hour: 14, by: 'amy', reactions: [{ by: 'amy', type: 'inspire' }] },
  { url: 'https://www.smashingmagazine.com', title: 'Smashing Magazine', category: 'reference', daysAgo: 17, hour: 14, by: 'amy', reactions: [{ by: 'bora', type: 'inspire' }] },
  { url: 'https://www.refstreet.com', title: 'RefStreet', category: 'reference', daysAgo: 10, hour: 21, by: 'bora' },

  // Music
  { url: 'https://open.spotify.com/playlist/1', title: 'Slow Sunday', category: 'music', daysAgo: 23, hour: 22, by: 'bora', reactions: [{ by: 'amy', type: 'calm' }, { by: 'bora', type: 'calm' }] },
  { url: 'https://open.spotify.com/playlist/2', title: 'City Pop Mix', category: 'music', daysAgo: 13, hour: 23, by: 'amy', reactions: [{ by: 'bora', type: 'fun' }] },

  // Quote
  { url: 'https://twitter.com/quote/1', title: '오늘의 글귀', category: 'quote', daysAgo: 9, hour: 7, by: 'amy', reactions: [{ by: 'bora', type: 'warm' }] },
  { url: 'https://twitter.com/quote/2', title: '짧은 문장 모음', category: 'quote', daysAgo: 4, hour: 14, by: 'bora' },
];

const links: Link[] = SEEDS.map((seed, i) => ({
  id: `l_${i}`,
  url: seed.url,
  title: seed.title,
  category: seed.category,
  tags: [],
  addedById: PARTNERS[seed.by].id,
  addedAt: isoFrom(seed.daysAgo, seed.hour),
  reactions: (seed.reactions ?? []).map((r) => ({
    userId: PARTNERS[r.by].id,
    type: r.type,
    reactedAt: isoFrom(seed.daysAgo, seed.hour + 1),
  })),
}));

export const mockFolder: PairFolder = {
  id: 'pf_demo',
  title: '여름의 페어',
  description: '에이미와 보라의 한 달',
  ownerId: PARTNERS.amy.id,
  partnerId: PARTNERS.bora.id,
  status: 'expired',
  createdAt: isoFrom(30),
  expiresAt: isoFrom(0),
  cover: {
    status: 'illustrated',
    colorId: 'index', // 브랜드 그린 — Article이 1등 카테고리
    topic: 'article',
  },
  links,
};

export const mockPartnerNames: [string, string] = [
  PARTNERS.amy.name,
  PARTNERS.bora.name,
];

/**
 * 홈 화면(=/pair) 의 "진행 중인 책" 책장 시각화에 사용하는 더미 폴더들.
 * 다양한 cover color / 만료까지 남은 일수 / 링크 수를 섞어 책장 메타포가 살아나게 했어요.
 *
 * 첫 번째는 항상 **"나의 책"** — 모든 사용자에게 기본 제공되는 솔로 폴더.
 *   - partnerId: null (페어 없음 = 혼자 쓰는 책)
 *   - 표지는 brand(index) 색으로 두어 메인 책장에서 가장 먼저 시선이 닿게 함
 *   - 책등에서 자동으로 저자 라인이 사라짐 (BookSpine 의 partnerNameOf 결과 null)
 */
export const mockActiveFolders: PairFolder[] = [
  {
    id: 'pf_active_me',
    title: '나의 책',
    ownerId: PARTNERS.amy.id,
    partnerId: null,
    status: 'active',
    createdAt: isoFrom(30),
    expiresAt: isoFrom(0),
    cover: { status: 'solid', colorId: 'index', topic: null },
    links: links.slice(0, 18),
  },
  {
    id: 'pf_active_1',
    title: '주말 동선',
    ownerId: PARTNERS.amy.id,
    partnerId: PARTNERS.bora.id,
    status: 'active',
    createdAt: isoFrom(18),
    expiresAt: isoFrom(-12),
    cover: { status: 'solid', colorId: 'archive', topic: null },
    links: links.slice(0, 8),
  },
  {
    id: 'pf_active_2',
    title: '깊은 밤의 글',
    ownerId: PARTNERS.bora.id,
    partnerId: PARTNERS.amy.id,
    status: 'active',
    createdAt: isoFrom(14),
    expiresAt: isoFrom(-16),
    cover: { status: 'solid', colorId: 'deep', topic: null },
    links: links.slice(0, 5),
  },
  {
    id: 'pf_active_3',
    title: '레시피 노트',
    ownerId: PARTNERS.amy.id,
    partnerId: null,
    status: 'active',
    createdAt: isoFrom(9),
    expiresAt: isoFrom(-21),
    cover: { status: 'solid', colorId: 'story', topic: null },
    links: links.slice(0, 12),
  },
  {
    id: 'pf_active_4',
    title: 'Reference Box',
    ownerId: PARTNERS.bora.id,
    partnerId: PARTNERS.amy.id,
    status: 'active',
    createdAt: isoFrom(5),
    expiresAt: isoFrom(-25),
    cover: { status: 'solid', colorId: 'index', topic: null },
    links: links.slice(0, 3),
  },
  {
    id: 'pf_active_5',
    title: '오늘의 한 줄',
    ownerId: PARTNERS.amy.id,
    partnerId: PARTNERS.bora.id,
    status: 'active',
    createdAt: isoFrom(2),
    expiresAt: isoFrom(-28),
    cover: { status: 'solid', colorId: 'pear', topic: null },
    links: links.slice(0, 6),
  },
];

/**
 * 홈 화면 2층 — 한 달이 지나 닫힌 "간직한 책" 책장 시각화용 더미 폴더들.
 * 모두 `status: 'expired'` + `cover.status: 'illustrated'` 로, 주제 일러스트가 입혀진 상태.
 * 1층(진행 중)과 같은 cover color preset 풀에서 색이 빠짐 (액센트 컬러 = 책 표지 전용).
 *
 * 라이브러리 페이지의 책장 진화(방안 → 하늘 → 배나무 → 밤의 정원 → 우주) 시연을 위해
 * 25권 가량을 여러 달에 걸쳐 흩어 두었습니다.
 * 최신 책이 위에 쌓이는 메타포라, 가까운 expiresAt 이 더 "위층".
 */
const LIBRARY_SEEDS: Array<{
  title: string;
  daysAgo: number;
  colorId: 'pear' | 'archive' | 'index' | 'story' | 'deep';
  topic: CategoryId;
  linkCount: number;
  owner: 'amy' | 'bora';
}> = [
  // 가장 최근(=책장 꼭대기)부터
  { title: '봄의 산책', daysAgo: 5, colorId: 'index', topic: 'travel', linkCount: 12, owner: 'amy' },
  { title: '4월의 카페', daysAgo: 18, colorId: 'archive', topic: 'cafe', linkCount: 9, owner: 'bora' },
  { title: '주말 영감', daysAgo: 22, colorId: 'pear', topic: 'article', linkCount: 14, owner: 'amy' },
  { title: '아침의 글귀', daysAgo: 40, colorId: 'story', topic: 'quote', linkCount: 7, owner: 'bora' },
  { title: '3월의 식탁', daysAgo: 52, colorId: 'pear', topic: 'recipe', linkCount: 11, owner: 'amy' },
  { title: '도시 음악', daysAgo: 68, colorId: 'deep', topic: 'music', linkCount: 8, owner: 'amy' },
  { title: '2월의 책상', daysAgo: 82, colorId: 'index', topic: 'reference', linkCount: 15, owner: 'bora' },
  { title: '겨울 산책', daysAgo: 105, colorId: 'deep', topic: 'travel', linkCount: 11, owner: 'amy' },
  { title: '1월의 새벽', daysAgo: 118, colorId: 'archive', topic: 'quote', linkCount: 6, owner: 'bora' },
  { title: '연말 결산', daysAgo: 142, colorId: 'story', topic: 'article', linkCount: 18, owner: 'amy' },
  { title: '12월 캐롤', daysAgo: 158, colorId: 'pear', topic: 'music', linkCount: 9, owner: 'bora' },
  { title: '11월의 빛', daysAgo: 175, colorId: 'story', topic: 'travel', linkCount: 13, owner: 'amy' },
  { title: '가을의 글', daysAgo: 195, colorId: 'archive', topic: 'article', linkCount: 16, owner: 'bora' },
  { title: '10월의 향', daysAgo: 215, colorId: 'pear', topic: 'cafe', linkCount: 8, owner: 'amy' },
  { title: '9월의 시', daysAgo: 240, colorId: 'deep', topic: 'quote', linkCount: 7, owner: 'bora' },
  { title: '여름의 페어', daysAgo: 268, colorId: 'index', topic: 'travel', linkCount: 17, owner: 'amy' },
  { title: '8월의 길', daysAgo: 285, colorId: 'archive', topic: 'travel', linkCount: 10, owner: 'amy' },
  { title: '7월의 비', daysAgo: 305, colorId: 'deep', topic: 'article', linkCount: 6, owner: 'bora' },
  { title: 'Slow Sunday', daysAgo: 325, colorId: 'story', topic: 'music', linkCount: 9, owner: 'amy' },
  { title: '6월의 정원', daysAgo: 348, colorId: 'pear', topic: 'recipe', linkCount: 14, owner: 'bora' },
  { title: '5월의 산', daysAgo: 372, colorId: 'index', topic: 'travel', linkCount: 11, owner: 'amy' },
  { title: '봄의 입장', daysAgo: 395, colorId: 'archive', topic: 'article', linkCount: 8, owner: 'amy' },
  { title: '시작의 책', daysAgo: 420, colorId: 'deep', topic: 'reference', linkCount: 19, owner: 'bora' },
  { title: '겨울의 첫 챕터', daysAgo: 450, colorId: 'story', topic: 'quote', linkCount: 5, owner: 'amy' },
  { title: '첫 페어', daysAgo: 480, colorId: 'index', topic: 'article', linkCount: 22, owner: 'amy' },
];

export const mockLibraryFolders: PairFolder[] = LIBRARY_SEEDS.map((seed, i) => ({
  id: `pf_lib_${i}`,
  title: seed.title,
  ownerId: PARTNERS[seed.owner].id,
  partnerId:
    seed.owner === 'amy' ? PARTNERS.bora.id : PARTNERS.amy.id,
  status: 'expired',
  createdAt: isoFrom(seed.daysAgo + 30),
  expiresAt: isoFrom(seed.daysAgo),
  cover: { status: 'illustrated', colorId: seed.colorId, topic: seed.topic },
  links: links.slice(0, seed.linkCount),
}));

/**
 * 페어 친구 mock — 페어 탭의 친구 목록에 표시.
 * bookCount 는 mockActiveFolders + mockLibraryFolders 에서 partnerId 기준으로
 * 추후 계산되겠지만, 데모 단계에선 직접 박아둡니다.
 */
export const mockPartners: PairPartner[] = [
  {
    id: PARTNERS.bora.id,
    name: PARTNERS.bora.name,
    avatarHex: '#FFB300',
    bookCount: 6,
    lastActiveAt: isoFrom(0, 14),
  },
  {
    id: 'u_jin',
    name: '진우',
    avatarHex: '#7C9CFF',
    bookCount: 2,
    lastActiveAt: isoFrom(3, 21),
  },
  {
    id: 'u_minji',
    name: '민지',
    avatarHex: '#F37C7C',
    bookCount: 1,
    lastActiveAt: isoFrom(12, 11),
  },
];

/**
 * 받은 초대장 mock — 페어 탭 "받은 초대함" + 알림 인박스 두 곳에 같이 노출됨.
 * 두 곳이 한 데이터 소스를 공유하기 때문에 한쪽에서 수락/거절하면 다른 쪽도 같이 변함.
 * 실제 구현에선 zustand store 로 끌어올릴 예정 — 지금은 컴포넌트 useState 로 가져갑니다.
 */
export const mockReceivedInvites: Invite[] = [
  {
    id: 'inv_1',
    fromUserId: PARTNERS.amy.id,
    fromUserName: PARTNERS.amy.name,
    toContact: 'me@example.com',
    bookTitle: '여름의 페어',
    message: '같이 여름을 한 권에 모아볼래?',
    sentAt: isoFrom(0, 11),
    status: 'pending',
  },
  {
    id: 'inv_2',
    fromUserId: 'u_chae',
    fromUserName: '채림',
    toContact: 'me@example.com',
    bookTitle: '주말 산책 노트',
    sentAt: isoFrom(2, 19),
    status: 'pending',
  },
];
