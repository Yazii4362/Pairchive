import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import PairFolderListPage from '@/pages/PairFolderListPage';
import PairFolderDetailPage from '@/pages/PairFolderDetailPage';
import PairsPage from '@/pages/PairsPage';
import PairFriendDetailPage from '@/pages/PairFriendDetailPage';
import LibraryPage from '@/pages/LibraryPage';
import LibraryFolderDetailPage from '@/pages/LibraryFolderDetailPage';
import ReportsListPage from '@/pages/ReportsListPage';
import NotificationsPage from '@/pages/NotificationsPage';
import SettingsPage from '@/pages/SettingsPage';
import ReportPage from '@/pages/ReportPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { paths } from './paths';

export const router = createBrowserRouter([
  { path: paths.landing, element: <LandingPage /> },
  { path: paths.auth, element: <AuthPage /> },

  // 단일 리포트(매거진 톤)는 AppShell 밖에서 단독 라우트.
  { path: paths.pairReport(), element: <ReportPage /> },
  { path: paths.libraryReport(), element: <ReportPage /> },

  // AppShell 하위 — 상단 TopBar(알림/설정) + 하단 Dock(4-탭) 공통 적용
  {
    element: <AppShell />,
    children: [
      // 책장 (진행 중 페어 폴더)
      { path: paths.pair, element: <PairFolderListPage /> },
      { path: paths.pairFolder(), element: <PairFolderDetailPage /> },

      // 페어 (친구 관리)
      { path: paths.pairs, element: <PairsPage /> },
      { path: paths.pairFriend(), element: <PairFriendDetailPage /> },

      // 라이브러리 (닫힌 책 보관)
      { path: paths.library, element: <LibraryPage /> },
      { path: paths.libraryFolder(), element: <LibraryFolderDetailPage /> },

      // 리포트 인덱스
      { path: paths.reports, element: <ReportsListPage /> },

      // 헤더 진입 페이지
      { path: paths.notifications, element: <NotificationsPage /> },
      { path: paths.settings, element: <SettingsPage /> },
    ],
  },

  { path: paths.notFound, element: <NotFoundPage /> },
]);
