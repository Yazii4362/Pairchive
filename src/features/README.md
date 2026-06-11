# features/

도메인 단위로 묶이는 코드를 둡니다. 한 feature는 보통 다음 구조를 가집니다.

```
features/<domain>/
  components/   - 이 도메인에서만 쓰는 UI 컴포넌트
  hooks/        - 이 도메인에서만 쓰는 커스텀 훅
  api/          - 데이터 fetching / mock 호출
  utils.ts      - 도메인 전용 유틸
  index.ts      - 외부에 노출할 표면 (배럴)
```

## 예정된 features

- `auth/` — 로그인/회원가입 mock 플로우
- `pair-folder/` — 페어 폴더 생성, 초대, 만료 처리
- `link/` — 링크 추가/수정, OG 메타 파싱(mock)
- `archive/` — 만료된 폴더의 책장 보관, 검색, 카테고리 필터
