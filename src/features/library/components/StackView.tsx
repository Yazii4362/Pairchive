import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes/paths';
import type { PairFolder } from '@/types';
import { BookStackBar } from './BookStackBar';

interface StackViewProps {
  folders: PairFolder[];
}

/**
 * 책장 메타포 — 책이 시간순으로 아래에서 위로 쌓이는 뷰.
 *
 * 레이아웃 약속:
 *   - 이 컴포넌트는 자기 자신을 페이지 하단에 붙이려 하지 않습니다.
 *     "하단 고정"은 상위 페이지의 main(flex-col + justify-end) 가 책임집니다.
 *   - 자기 자신은 그저 "위에서 아래로 흐르는 한 칼럼"입니다.
 *     DOM 첫 번째 = 가장 최근 책 (시각적으로 스택 꼭대기)
 *     DOM 마지막 = 가장 오래된 책 (시각적으로 스택 발밑, GNB 위에 겹치는 자리)
 *   - pb-0 — 마지막 책은 viewport 바닥에 닿아야 함. 도크가 그 위로 떠서 자연스럽게 "겹쳐짐".
 *
 * 정렬: expiresAt 내림차순.
 *
 * 앵커: 각 책 행에 id="book-{folderId}" → 우측 ScrollDial 이 클릭/포커스 시 직접 조준.
 */
export function StackView({ folders }: StackViewProps) {
  const navigate = useNavigate();

  const rows = useMemo(() => {
    const sorted = [...folders].sort(
      (a, b) => +new Date(b.expiresAt) - +new Date(a.expiresAt),
    );
    return sorted.map((folder) => ({
      folder,
      widthScale: linkCountToWidth(folder.links.length),
    }));
  }, [folders]);

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] flex-col items-start gap-[6px] px-5 pt-4 lg:max-w-[760px] lg:px-8">
      {rows.map(({ folder, widthScale }) => (
        <div
          key={folder.id}
          id={`book-${folder.id}`}
          className="w-full scroll-mt-24"
        >
          <BookStackBar
            folder={folder}
            widthScale={widthScale}
            onClick={() => navigate(paths.libraryFolder(folder.id))}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * 링크 5권 → 80%, 22권 → 100%, 그 사이 선형.
 * 변동 폭은 약 20%p — 자연스러운 윤곽만 만들고 너무 들쭉날쭉 하지 않도록.
 */
function linkCountToWidth(count: number): number {
  const min = 5;
  const max = 22;
  const clamped = Math.min(Math.max(count, min), max);
  return 0.8 + ((clamped - min) / (max - min)) * 0.2;
}
