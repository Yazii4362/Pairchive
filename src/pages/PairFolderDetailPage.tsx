import { useParams } from 'react-router-dom';

/**
 * 페어 폴더(=책 한 권) 상세. 링크 목록 + 카테고리 필터 + 링크 추가 바텀시트가 들어옵니다.
 */
export default function PairFolderDetailPage() {
  const { folderId } = useParams();

  return (
    <div className="mobile-canvas pt-8 pb-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
        Pair folder
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
        폴더 #{folderId}
      </h1>
      <p className="mt-1.5 text-sm text-fg-muted">
        다음 스텝에서 링크 카드 리스트 + 카테고리 필터 + 링크 추가 바텀시트가 채워집니다.
      </p>
    </div>
  );
}
