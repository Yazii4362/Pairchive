/**
 * PAirchive 도메인 타입
 *
 * 도메인 개념 요약:
 * - User        : 서비스 사용자
 * - Link        : 폴더 안에 저장되는 단위 콘텐츠 (URL + 메타 + category)
 * - PairFolder  : 두 사람이 함께 모으는 한 달짜리 협업 폴더 (책 한 권)
 *                 - 진행 중: 단색 솔리드 책 커버
 *                 - 만료(expiresAt) 후: 가장 많이 저장된 카테고리 기반
 *                   일러스트 커버가 입혀지고 read-only로 전환
 * - ShelfFolder : 만료된 PairFolder를 사용자가 자신의 책장에 꽂은 스냅샷
 */

import type { CategoryId } from '@/lib/categories';
import type { CoverColorId } from '@/lib/coverColors';
import type { ReactionId } from '@/lib/reactions';

export type ID = string;
export type ISODateString = string;

export interface User {
  id: ID;
  name: string;
  email?: string;
  /** 아바타에 사용할 단색 (커버 컬러 시스템과 무관) */
  avatarHex: string;
}

export interface LinkReaction {
  userId: ID;
  type: ReactionId;
  reactedAt: ISODateString;
}

export interface Link {
  id: ID;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  category: CategoryId;
  tags: string[];
  addedById: ID;
  addedAt: ISODateString;
  memo?: string;
  /** 페어 양쪽이 각자 남길 수 있는 리액션. 한 명이 여러 개 가능. */
  reactions: LinkReaction[];
}

export type PairFolderStatus = 'active' | 'expired';

/**
 * 책 커버 상태.
 * - 'solid'       : 단색 솔리드 커버 (진행 중 기본값)
 * - 'illustrated' : 만료 후 일러스트 커버가 입혀진 상태
 */
export type CoverStatus = 'solid' | 'illustrated';

export interface FolderCover {
  status: CoverStatus;
  colorId: CoverColorId;
  /**
   * 일러스트 커버에 적용된 주제. status='solid' 일 때는 null.
   * 만료 시점에 pickDominantCategory()의 결과로 결정됩니다.
   */
  topic: CategoryId | null;
}

export interface PairFolder {
  id: ID;
  title: string;
  description?: string;

  ownerId: ID;
  partnerId: ID | null;

  status: PairFolderStatus;
  createdAt: ISODateString;
  expiresAt: ISODateString;

  cover: FolderCover;
  links: Link[];
}

/**
 * 페어 친구 — 함께 책을 쓰는 한 사람 + 그 관계의 메타.
 * (User 의 단순 확장이라 추후 백엔드와 합칠 때 조인 결과로 빠질 수도 있음.)
 */
export interface PairPartner extends User {
  /** 함께 만든 책(폴더) 수. 진행 중 + 간직한 책 모두 합산. */
  bookCount: number;
  /** 가장 최근 활동 (링크 추가/리액션 등) 시각. */
  lastActiveAt: ISODateString;
}

export type InviteStatus = 'pending' | 'accepted' | 'declined';

/**
 * 초대장 — "한 권의 책을 같이 채워가자" 라는 요청.
 *
 * 보내는 쪽:
 *   - 페어 탭에서 [친구에게 초대장 보내기] 진입 → 받는 사람/첫 책 제목/띠지 메시지 입력
 *   - 보내고 잊는다(plant-and-forget). 수락된 경우만 알림으로 회신.
 *
 * 받는 쪽:
 *   - 알림 인박스 + 페어 탭 "받은 초대함" 두 곳에 동시 노출
 *   - 두 곳 어디서든 수락/거절 인라인 액션 가능
 *   - 수락 → 두 사람의 1F 책장에 첫 책이 꽂힘
 */
export interface Invite {
  id: ID;
  fromUserId: ID;
  fromUserName: string;
  /** 받는 사람의 식별자 — 데모 단계에선 이메일/닉네임 문자열로 통일. */
  toContact: string;
  /** 첫 책 제목 (선택 입력. 비우면 "우리의 첫 책" 으로 채워짐). */
  bookTitle: string;
  /** 띠지에 새겨질 한 줄 메시지 (선택). */
  message?: string;
  sentAt: ISODateString;
  status: InviteStatus;
}

export interface ShelfFolder {
  id: ID;
  sourcePairFolderId: ID;
  title: string;
  description?: string;

  ownerId: ID;
  partnerName: string;

  archivedAt: ISODateString;
  startedAt: ISODateString;
  endedAt: ISODateString;

  /** 책장에 꽂힌 시점에는 항상 illustrated 상태입니다. */
  cover: FolderCover;
  links: Link[];
}
