import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockReceivedInvites } from '@/lib/mockData';
import type { Invite, PairFolder, ShelfFolder, User } from '@/types';

/**
 * 앱 전역 상태 — mock 단계에서는 zustand + localStorage persist 로 충분합니다.
 *
 * 영속 슬라이스:
 *   - receivedInvites       : 페어 탭 "받은 초대함" + 알림 탭 두 곳이 공유하는 단일 출처.
 *   - hasCompletedFirstBook : 첫 책(공유 폴더)을 완성해 라이브러리에 보관한 적이 있는가.
 *                             false 인 동안 홈 2F 책장은 잠긴 tease 상태.
 *   - firstBookUnlockSeen   : 잠금 해제 직후 "이제 두 번째 책장을 사용할 수 있어요" 배너를
 *                             한 번 본 적 있는가. true 가 되면 다시는 안 뜸.
 *
 * 비영속 슬라이스 (partialize 로 제외):
 *   - showFirstBookModal    : "첫 책을 완성했어요" 즉시 축하 모달의 표시 여부.
 *                             세션 단위로만 살아있어야 하므로 영속화하지 않음.
 *   - pairCelebrationFor    : 초대장 수락 직후 떠오르는 "두 분의 책이 시작되었어요"
 *                             전체 화면 셀러브레이션의 표시 컨텍스트.
 *                             null = 비표시. 객체가 들어있으면 즉시 표시.
 */
interface PairCelebrationContext {
  partnerName: string;
  bookTitle: string;
}

interface AppState {
  currentUser: User | null;
  pairFolders: PairFolder[];
  shelfFolders: ShelfFolder[];
  receivedInvites: Invite[];
  hasCompletedFirstBook: boolean;
  firstBookUnlockSeen: boolean;
  showFirstBookModal: boolean;
  pairCelebrationFor: PairCelebrationContext | null;
}

interface AppActions {
  setCurrentUser: (user: User | null) => void;

  /**
   * 초대장 수락.
   *   1) 해당 초대 status 를 'accepted' 로 전환
   *   2) 같은 트랜잭션으로 pairCelebrationFor 에 컨텍스트를 채워
   *      "두 분의 책이 시작되었어요" 전체 화면 셀러브레이션이 즉시 떠오르도록 함.
   * 호출처(페어 탭 / 알림 탭 등)는 어디서든 동일한 결과를 얻습니다.
   */
  acceptInvite: (id: string) => void;
  declineInvite: (id: string) => void;
  dismissPairCelebration: () => void;

  setHasCompletedFirstBook: (v: boolean) => void;
  setFirstBookUnlockSeen: (v: boolean) => void;
  setShowFirstBookModal: (v: boolean) => void;

  /**
   * "책이 만료되어 라이브러리에 보관" 이벤트 헬퍼.
   * 첫 책 완성 시점에 호출하면:
   *   - hasCompletedFirstBook = true   (잠금 해제)
   *   - showFirstBookModal = true      (즉시 축하 모달)
   *   - firstBookUnlockSeen = false    (다음 홈 진입 시 배너 예약)
   * 이미 첫 책이 완성된 적이 있으면 아무 일도 하지 않음.
   */
  markFirstBookCompleted: () => void;

  /** 데모/개발: 잠금 흐름을 초기 상태로 되돌리기. */
  resetOnboarding: () => void;

  reset: () => void;
}

const initialState: AppState = {
  currentUser: null,
  pairFolders: [],
  shelfFolders: [],
  receivedInvites: mockReceivedInvites,
  hasCompletedFirstBook: false,
  firstBookUnlockSeen: false,
  showFirstBookModal: false,
  pairCelebrationFor: null,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentUser: (user) => set({ currentUser: user }),
      acceptInvite: (id) =>
        set((state) => {
          const invite = state.receivedInvites.find((iv) => iv.id === id);
          // 이미 수락/거절된 초대를 다시 수락하려는 호출에는 셀러브레이션을 띄우지 않음.
          const shouldCelebrate = invite?.status === 'pending';
          return {
            receivedInvites: state.receivedInvites.map((iv) =>
              iv.id === id ? { ...iv, status: 'accepted' as const } : iv,
            ),
            pairCelebrationFor:
              shouldCelebrate && invite
                ? { partnerName: invite.fromUserName, bookTitle: invite.bookTitle }
                : state.pairCelebrationFor,
          };
        }),
      declineInvite: (id) =>
        set((state) => ({
          receivedInvites: state.receivedInvites.map((iv) =>
            iv.id === id ? { ...iv, status: 'declined' as const } : iv,
          ),
        })),
      dismissPairCelebration: () => set({ pairCelebrationFor: null }),

      setHasCompletedFirstBook: (v) => set({ hasCompletedFirstBook: v }),
      setFirstBookUnlockSeen: (v) => set({ firstBookUnlockSeen: v }),
      setShowFirstBookModal: (v) => set({ showFirstBookModal: v }),

      markFirstBookCompleted: () => {
        if (get().hasCompletedFirstBook) return;
        set({
          hasCompletedFirstBook: true,
          showFirstBookModal: true,
          firstBookUnlockSeen: false,
        });
      },

      resetOnboarding: () =>
        set({
          hasCompletedFirstBook: false,
          firstBookUnlockSeen: false,
          showFirstBookModal: false,
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'pairchive:v1:app',
      storage: createJSONStorage(() => localStorage),
      // 세션 단위 일회성 UI(showFirstBookModal, pairCelebrationFor) 는 영속화 제외.
      partialize: (state) => ({
        currentUser: state.currentUser,
        pairFolders: state.pairFolders,
        shelfFolders: state.shelfFolders,
        receivedInvites: state.receivedInvites,
        hasCompletedFirstBook: state.hasCompletedFirstBook,
        firstBookUnlockSeen: state.firstBookUnlockSeen,
      }),
    },
  ),
);
