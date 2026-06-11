import { Outlet } from 'react-router-dom';
import { FirstBookCompletionModal } from '@/features/pair-folder/components/FirstBookCompletionModal';
import { PairBondCelebration } from '@/features/pair/components/PairBondCelebration';
import { TopBar } from './TopBar';
import { Dock } from './Dock';

/**
 * 인증 후 진입하는 메인 레이아웃.
 *
 * 구성:
 *   1) 상단 sticky TopBar — 좌측 로고 / 우측 알림·설정
 *   2) 본 콘텐츠 (페이지 컴포넌트가 모바일/홈 캔버스를 직접 지정)
 *   3) 하단 floating Dock — 책장 · 페어 · 라이브러리 · 리포트 4-탭
 *
 * 전역 오버레이 (어디서 트리거되어도 동일하게 떠올라야 하는 것들):
 *   - FirstBookCompletionModal — 책이 처음 완성된 순간의 즉시 축하 모달.
 *   - PairBondCelebration — 초대장 수락 직후 "두 분의 책이 시작되었어요" 셀러브레이션.
 *   둘 다 각자의 store 토큰(showFirstBookModal / pairCelebrationFor)에만 반응.
 *
 * 리포트 페이지(/pair/:id/report 등)는 immersive 매거진 톤이라
 * 이 레이아웃 밖에서 단독 라우트로 동작합니다.
 */
export function AppShell() {
  return (
    <div className="min-h-screen pb-dock">
      <TopBar />
      <Outlet />
      <Dock />
      <FirstBookCompletionModal />
      <PairBondCelebration />
    </div>
  );
}
