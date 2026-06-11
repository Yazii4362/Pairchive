# PAirchive

> 둘이서 한 달, 링크로 남기는 작은 아카이브.

함께 폴더를 만들고 링크를 모으세요. 한 달이 지나면 폴더는 자동으로 닫히고, 그대로 책장에 꽂혀 둘만의 추억이 됩니다.

## 기술 스택

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-first `@theme` 토큰)
- **react-router-dom** v7
- **zustand** + localStorage persist (mock 영속화)
- **lucide-react** 아이콘

> 백엔드는 아직 없어요. 모든 상태는 `localStorage` 에 저장됩니다.

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 프로덕션 번들
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
├── App.tsx                  # RouterProvider
├── main.tsx                 # React 엔트리
├── index.css                # Tailwind v4 + @theme 디자인 토큰
│
├── routes/
│   ├── paths.ts             # 경로 상수
│   └── router.tsx           # createBrowserRouter
│
├── pages/                   # 라우트 단위 페이지
│   ├── LandingPage.tsx
│   ├── AuthPage.tsx
│   ├── PairFolderListPage.tsx
│   ├── PairFolderDetailPage.tsx
│   ├── ArchivePage.tsx
│   ├── ShelfFolderDetailPage.tsx
│   └── NotFoundPage.tsx
│
├── components/
│   ├── layout/              # AppShell, Sidebar, TopBar
│   └── ui/                  # 디자인 시스템 원자 (Button 등)
│
├── features/                # 도메인 단위 코드 (auth, pair-folder, link, archive)
├── hooks/                   # 전역 커스텀 훅
├── lib/
│   ├── cn.ts                # tailwind className merge
│   ├── id.ts                # UUID 생성
│   └── storage.ts           # 타입 안전 localStorage
├── store/
│   └── useAppStore.ts       # zustand 전역 스토어
└── types/
    └── index.ts             # User, Link, PairFolder, ShelfFolder
```

## 디자인 시스템

미니멀 모노톤 — Notion / Linear 무드. 모든 색/폰트/반경은 `src/index.css` 의 `@theme` 블록에서 단일 출처로 관리합니다.

| 토큰 그룹            | 키                          | 용도                          |
| -------------------- | --------------------------- | ----------------------------- |
| Ink (50 → 950)       | `--color-ink-*`             | 텍스트, 보더, 다크 톤 면      |
| Paper                | `--color-paper(-muted/-sunken)` | 배경, 카드 표면           |
| Accent (50 → 900)    | `--color-accent-*`          | 강조 컬러 (포인트 1개만 사용) |
| 폰트                 | `--font-sans`, `--font-mono` | Inter / JetBrains Mono       |
| 캔버스 폭            | `--container-canvas` = 1760 | 1920 풀스크린 기준 최대 폭    |

Tailwind v4가 `@theme` 의 변수명을 자동으로 유틸리티(`bg-paper-muted`, `text-ink-500` 등)로 매핑해줍니다.
