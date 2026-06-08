# Pairchive · Static Prototype (HIG)

React 없이 **HTML + CSS + JS + GSAP + Tailwind CSS** 만으로 만든
Pairchive 디자인 프로토타입입니다.
실제 앱이 **iOS App Store** 출시를 전제로 하기 때문에 정적 단계부터
**Apple Human Interface Guidelines (iOS / iPadOS / macOS)** 기준에 맞춰
구성했습니다.

## 폴더 구조

```
static/
├── index.html        # 엔트리 (Tailwind CDN · GSAP CDN)
├── README.md
├── css/
│   ├── tokens.css    # HIG 시스템 컴러 + 시스템 폰트 + 다크모드 + 모션
│   ├── common.css    # 네비바 · 탭바 · 시트 · 44pt 버튼 · 포커스 링
│   └── screens.css   # 화면별 전용 스타일
└── js/
    ├── data.js       # 더미 데이터
    ├── screens.js    # 14개 화면 HTML 템플릿 (semantic + aria)
    └── app.js        # 라우팅 · 디바이스/테마 토글 · GSAP 애니메이션
```

## HIG 적용 항목

### 타이포그래피
- 폰트 스택: `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR'`
- iOS 시스템 타이포 스케일: `.title-1` (28/700) · `.title-2` (22) · `.title-3` (20) · `.headline` (17/600) · `.body` (17) · `.callout` (16) · `.subhead` (15) · `.footnote` (13) · `.caption` (12)
- 자간(letter-spacing) 은 iOS SF 메트릭에 가깝게 `-0.022em ~ -0.01em` 로 보정

### 색상 / 다크모드
- HIG **시스템 컴러 토큰**을 그대로 채택
  - `--system-background`, `--system-background-secondary`, `--system-background-tertiary`
  - `--label-primary`, `--label-secondary`, `--label-tertiary`, `--label-quaternary`
  - `--fill-primary` … `--fill-quaternary`
  - `--separator`, `--separator-opaque`
  - `--system-tint`(파란색), `--system-tint-red`(파괴적 동작) 등
- 라이트/다크 두 세트를 모두 정의
  - 자동: `@media (prefers-color-scheme: dark)`
  - 수동: `:root[data-theme="dark"]` (헤더의 테마 토글로 전환)
- `<meta name="color-scheme">` + `<meta name="theme-color">` (light/dark) 까지 선언해 OS 크롬과 일치

### 터치 타깃 / 인터랙션
- 모든 버튼·옵션 셀에 **최소 44×44pt** 보장 (`--hit-target: 44px`)
- `.btn` / `.option-item` / `.nav-bar__btn` / `.tab-bar__item` / `.tab-btn` 모두 동일 기준
- 누름 피드백: `transform: scale(0.98)` (iOS 표준 압력감)
- 그레이/틴트/필드/플레인 4 종 버튼 스타일 (HIG Buttons 가이드)
- `:focus-visible` 에만 시스템 틴트 색의 2px 포커스 링 (마우스 클릭에는 안 뜸)

### 네비게이션 패턴
- **iOS Navigation Bar (44pt)** : leading / title / trailing 3 영역
- **iOS Tab Bar (49pt + safe-area-bottom)** : 홈/서재/추가/알림/나 5탭
- **Segmented Control** : 서재 필터, 헤더의 디바이스 스위치
- **Sheet (10pt 라운드 + 36×5 드래그 핸들)** : 캡처 화면
- **Large Title (34pt 700)** : 서재 진입 시 타이틀

### Safe Area
- iPhone 프레임은 `env(safe-area-inset-top/bottom)` 을 status-bar / tab-bar / sheet 에 모두 반영
- `<meta viewport ... viewport-fit=cover>` 선언으로 PWA 풀스크린에서도 동작

### 모션
- iOS 표준 이징 토큰
  - `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`
  - `--ease-emphasized: cubic-bezier(0.2, 0, 0, 1)`
  - `--ease-enter` / `--ease-exit`
- `--dur-fast (180ms)` / `--dur-base (240ms)` / `--dur-slow (360ms)`
- `@media (prefers-reduced-motion: reduce)` 일 때 전역 트랜지션/애니메이션 자동 차단
- GSAP 진입 애니메이션도 reduced-motion 시 자동 skip

### 접근성 (VoiceOver / 키보드)
- 모든 인터랙티브 요소는 `<button type="button">` 사용
- `aria-label` / `aria-labelledby` / `aria-live="polite"`
- 화면 셀렉터 탭: `role="tablist" / role="tab" / aria-selected`
- 디바이스 셀렉터: `role="tablist"` + aria-selected
- 키보드 ←/→/Home/End 로 화면 전환 (roving tabindex)
- `.sr-only` 헬퍼 클래스로 비주얼 숨김

## 디바이스 미리보기 (ta / mo / pc)

상단 세그먼티드 컨트롤에서 한 번에 전환됩니다.

| 토글     | 디바이스         | 사이즈   | 비고                              |
| -------- | ---------------- | -------- | --------------------------------- |
| iPhone   | iPhone 15 Pro    | 390×844  | 노치 + status bar + safe area     |
| iPad     | iPad Air         | 720×880  | 노치 없음, 더 넓은 패딩            |
| Mac      | macOS Window     | 980×660  | 트래픽 라이트 (빨/노/초) titlebar |

HIG 상 같은 화면이라도 폼팩터마다 여백/네비게이션이 다르므로,
`.device--mo / --ta / --pc` 셀렉터에 맞춰 `.screen` 패딩을 조정합니다.

## 테마 토글

헤더 우측 달 아이콘을 누르면 **System → Light → Dark → System** 순으로 순환합니다.
시스템 모드일 땐 OS 의 `prefers-color-scheme` 을 그대로 따라갑니다.

## 실행 방법

```powershell
# 방법 1) Python 내장 정적 서버
cd static
python -m http.server 5173
# http://localhost:5173

# 방법 2) Node 의 npx serve
cd static
npx serve .
```

`index.html` 더블 클릭으로도 동작하지만, CDN 캐싱과 backdrop-filter
호환성을 위해 정적 서버를 권장합니다.

## 의존성 (CDN, 빌드 단계 없음)

- Tailwind CSS — `https://cdn.tailwindcss.com`
- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- 폰트는 OS 시스템 폰트(SF Pro / Segoe UI / Apple SD Gothic Neo) 사용
  → 별도 웹폰트 로드 없음
