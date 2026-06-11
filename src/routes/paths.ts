/**
 * 라우트 경로 상수.
 * 페이지 추가 시 여기 한 곳에 모아 관리하세요.
 *
 * GNB 4-탭 매핑:
 *   책장      → pair      (진행 중 페어 폴더 — 메인 책장)
 *   페어      → pairs     (페어 친구 관리)
 *   라이브러리 → library   (한 달이 지나 닫힌 책 보관소)
 *   리포트    → reports   (모든 리포트 인덱스)
 *
 * 상단 헤더:
 *   알림 → notifications
 *   설정 → settings (테마 토글 포함)
 */
export const paths = {
  landing: '/',
  auth: '/auth',

  // ── Dock 4-tab ───────────────────────────
  pair: '/pair',
  pairFolder: (id: string = ':folderId') => `/pair/${id}`,
  pairReport: (id: string = ':folderId') => `/pair/${id}/report`,

  pairs: '/pairs',
  pairFriend: (id: string = ':friendId') => `/pairs/${id}`,

  library: '/library',
  libraryFolder: (id: string = ':folderId') => `/library/${id}`,
  libraryReport: (id: string = ':folderId') => `/library/${id}/report`,

  reports: '/reports',

  // ── Header ───────────────────────────────
  notifications: '/notifications',
  settings: '/settings',

  notFound: '*',
} as const;
