import { ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShelfRow } from '@/features/pair-folder/components/ShelfRow';
import {
  mockActiveFolders,
  mockLibraryFolders,
  mockPartners,
} from '@/lib/mockData';

/**
 * "이 친구와 함께한 책장" 필터 뷰.
 *
 * 시각 메타포:
 *   - 홈(`/pair`) 의 책장 메타포를 그대로 재사용 — 2F 간직한 책 / 1F 진행 중인 책.
 *   - 단, 이 친구와 함께 만든 책으로만 한정.
 *   - 책장 위 명패에 친구 이름 (예: "보라와의 책장").
 *
 * 라우트: `/pairs/:friendId` (paths.pairFriend)
 */
export default function PairFriendDetailPage() {
  const navigate = useNavigate();
  const { friendId } = useParams<{ friendId: string }>();

  const partner = useMemo(
    () => mockPartners.find((p) => p.id === friendId),
    [friendId],
  );

  const sharedActive = useMemo(
    () => mockActiveFolders.filter((f) => f.partnerId === friendId),
    [friendId],
  );
  const sharedLibrary = useMemo(
    () => mockLibraryFolders.filter((f) => f.partnerId === friendId),
    [friendId],
  );

  if (!partner) {
    return (
      <div className="mobile-canvas pt-8 pb-4">
        <BackButton onClick={() => navigate(-1)} />
        <p className="mt-8 text-center text-sm text-fg-muted">
          이 페어 친구를 찾을 수 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="home-canvas pt-6 pb-2">
      <BackButton onClick={() => navigate(-1)} />

      <header className="mt-4 flex items-center gap-3 px-1">
        <span
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-[18px] font-medium text-white"
          style={{ backgroundColor: partner.avatarHex }}
          aria-hidden
        >
          {partner.name.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="font-serif text-[11px] uppercase tracking-[0.16em] text-brand">
            Pair · {partner.name}
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-medium tracking-tight text-fg lg:text-[34px]">
            {partner.name}와의 <em className="italic text-brand">책장</em>
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            함께 만든 책 {sharedActive.length + sharedLibrary.length}권 · 진행 중{' '}
            {sharedActive.length}권 · 간직한 책 {sharedLibrary.length}권
          </p>
        </div>
      </header>

      <section className="mt-10">
        <ShelfRow
          folders={sharedLibrary}
          tone="muted"
          trailingSlot="none"
          floorLabel="2F"
          caption="함께 간직한 책"
        />
      </section>

      <section className="mt-8">
        <ShelfRow
          folders={sharedActive}
          tone="primary"
          trailingSlot="none"
          floorLabel="1F"
          caption="함께 쌓는 중"
        />
      </section>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="페어 목록으로"
      className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
    >
      <ArrowLeft size={18} strokeWidth={1.75} />
    </button>
  );
}
