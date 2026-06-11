import { useParams } from 'react-router-dom';

/**
 * 라이브러리에 꽂힌 (닫힌) 책 상세. read-only 뷰 + 일러스트 커버.
 */
export default function LibraryFolderDetailPage() {
  const { folderId } = useParams();

  return (
    <div className="mobile-canvas pt-8 pb-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
        Library folder
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
        책 #{folderId}
      </h1>
      <p className="mt-1.5 text-sm text-fg-muted">
        닫힌 페어 책의 스냅샷이 여기에 표시됩니다. (read-only)
      </p>
    </div>
  );
}
