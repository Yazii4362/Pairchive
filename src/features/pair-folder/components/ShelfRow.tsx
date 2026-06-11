import { ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GrainOverlay } from '@/components/visual/GrainOverlay';
import { paths } from '@/routes/paths';
import type { PairFolder } from '@/types';
import { BookSpine } from './BookSpine';

/**
 * 책꽂이의 한 단(段).
 *
 * 디자인 컨셉:
 *   - 한 단의 선반(shelf) 위에 책등(spine)이 가로로 일렬로 꽂혀있는 모습.
 *   - 모바일·PC 모두 동일하게 이 책꽂이 뷰가 메인. 폭이 넓을수록 더 많은 책이
 *     한눈에 보이고, 좁으면 가로 스크롤로 이어집니다.
 *   - 책 발밑에는 따뜻한 wood/cream 톤의 두툼한 "선반판(plate)" 한 장이 깔립니다.
 *     얇은 선 대신 plate 한 면으로 책상/책장의 두께감을 표현. 라이브러리의
 *     파스텔 톤과 호흡을 맞춰 한 가족의 책장처럼 보이도록.
 *   - plate 위에 인쇄 결(grain)을 살짝 얹어 라이브러리 책 막대와 같은 결.
 *   - 두 단을 위아래로 쌓으면 같은 plate 두 장이 호흡 간격을 두고 정렬됨.
 *
 * tone:
 *   - 'primary' : 1층 — 진행 중인 책, 책등 채도 가득.
 *   - 'muted'   : 2층 — 간직한 책, 채도/투명도 살짝 떨어진 톤.
 *
 * trailingSlot:
 *   - 'invite' : "초대장" 점선 슬롯 (친구 초대 진입).
 *   - 'more'   : "더 보기" 점선 슬롯 (라이브러리 전체로 이동).
 *   - 'none'   : 슬롯 없음.
 */
export function ShelfRow({
  folders,
  tone = 'primary',
  trailingSlot = 'invite',
  floorLabel,
  caption,
}: {
  folders: readonly PairFolder[];
  tone?: 'primary' | 'muted';
  trailingSlot?: 'invite' | 'more' | 'none';
  /** 책장 좌측에 작게 새기는 층 표시. 예: "1F", "2F". */
  floorLabel?: string;
  /** 좌측 floorLabel 옆에 같이 새기는 짧은 설명. 예: "함께 쌓는 중". */
  caption?: string;
}) {
  return (
    <div className="relative">
      {/* 좌측 명패 (floor label + caption) — 책장 위에 작은 인쇄처럼 */}
      {(floorLabel || caption) && (
        <div className="mb-3 flex items-baseline justify-between px-1 lg:mb-4">
          <div className="flex items-baseline gap-2 lg:gap-3">
            {floorLabel && (
              <span className="font-serif text-[11px] uppercase tracking-[0.16em] text-fg-subtle lg:text-[12px] lg:tracking-[0.22em]">
                {floorLabel}
              </span>
            )}
            {caption && (
              <span className="text-[12px] text-fg-muted lg:text-[13px]">
                {caption}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] tracking-wider text-fg-subtle lg:text-[11px]">
            {folders.length}권
          </span>
        </div>
      )}

      {/* lg 전용 — 책장 좌측 vertical 명판. "FLOOR · 1F" 같은 새김 인쇄. */}
      {floorLabel && (
        <div className="pointer-events-none absolute -left-10 bottom-3 top-12 hidden items-end lg:flex">
          <span
            className="pb-1 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle"
            style={{ writingMode: 'vertical-rl' }}
          >
            FLOOR · {floorLabel}
          </span>
        </div>
      )}

      {/* 책꽂이 가로 스크롤 영역 — 선반의 한 단.
          PC: gap/padding 한 호흡 더 넓혀 책 사이 여유를 줌.
          pb-14/lg:pb-16 으로 책 발밑에 plate 가 들어갈 두께를 확보합니다. */}
      <div
        className="flex items-end gap-2 overflow-x-auto pb-14 pl-3 pr-3 pt-8 lg:gap-3 lg:pb-16 lg:pl-6 lg:pr-6 lg:pt-10"
        style={{ scrollPaddingInline: '0.75rem' }}
      >
        {folders.length === 0 ? (
          <EmptyShelfHint tone={tone} />
        ) : (
          folders.map((folder) => (
            <BookSpine key={folder.id} folder={folder} tone={tone} />
          ))
        )}
        {trailingSlot === 'invite' && <InviteSlot />}
        {trailingSlot === 'more' && <MoreSlot />}
      </div>

      {/* 책장 선반판(plate) — 책 발밑에 깔리는 두툼한 wood/cream 면.
          얇은 1px 선 대신 부피감 있는 한 면으로 "책상 / 선반" 메타포를 살림.
          • 상단 라인: 옅은 highlight 로 윗면의 모서리 빛.
          • 하단 라인: 짙은 edge 로 두께의 끝선.
          • 외부 그림자: plate 가 페이지 위에 살짝 떠 있는 무게감.
          • grain : 라이브러리 책 막대와 같은 인쇄 결. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-2 h-12 overflow-hidden rounded-md lg:bottom-3 lg:h-14"
        style={{
          background:
            'linear-gradient(180deg, var(--shelf-plate-top) 0%, var(--shelf-plate-mid) 55%, var(--shelf-plate-bot) 100%)',
          boxShadow:
            'inset 0 1px 0 var(--shelf-plate-highlight), inset 0 -1px 0 var(--shelf-plate-edge), 0 14px 26px -14px var(--shelf-plate-shadow)',
          filter: tone === 'muted' ? 'saturate(0.85) brightness(0.97)' : undefined,
        }}
        aria-hidden
      >
        <GrainOverlay scope="absolute" opacity={0.16} seed={`shelf-plate-${tone}`} />
      </div>
    </div>
  );
}

/**
 * 1층 책꽂이 끝의 "초대장" 슬롯 — 친구 초대 진입점.
 */
function InviteSlot() {
  return (
    <button
      type="button"
      title="친구에게 초대장 보내기"
      aria-label="새 책을 함께 쓸 친구에게 초대장 보내기"
      className="group flex h-[320px] w-[64px] shrink-0 flex-col items-center rounded-t-md border border-dashed border-border-strong pt-5 text-fg-subtle transition-colors hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:text-brand focus-visible:outline-none"
    >
      <Mail
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
      <span
        className="mt-4 font-serif text-[13px] tracking-wide"
        style={{ writingMode: 'vertical-rl' }}
      >
        초대장
      </span>
    </button>
  );
}

/**
 * 2층 책꽂이 끝의 "더 보기" 슬롯 — 간직한 책 전체(/library) 로 이동.
 */
function MoreSlot() {
  return (
    <Link
      to={paths.library}
      title="간직한 책 전체 보기"
      aria-label="간직한 책 전체 라이브러리로 이동"
      className="group flex h-[280px] w-[56px] shrink-0 flex-col items-center rounded-t-md border border-dashed border-border pt-5 text-fg-subtle transition-colors hover:border-fg-muted hover:text-fg focus-visible:border-fg-muted focus-visible:text-fg focus-visible:outline-none"
    >
      <ChevronRight
        size={14}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      />
      <span
        className="mt-4 font-serif text-[12px] tracking-wide"
        style={{ writingMode: 'vertical-rl' }}
      >
        더 보기
      </span>
    </Link>
  );
}

function EmptyShelfHint({ tone }: { tone: 'primary' | 'muted' }) {
  return (
    <div className="flex h-[320px] flex-1 items-center justify-center px-6 text-center text-sm text-fg-subtle">
      {tone === 'muted' ? (
        <span>
          아직 간직한 책이 없어요.
          <br />
          한 달이 지나면 이곳에 한 권씩 꽂혀요.
        </span>
      ) : (
        <span>
          아직 함께 쓰는 책이 없어요.
          <br />
          옆의 초대장 슬롯으로 친구를 불러보세요.
        </span>
      )}
    </div>
  );
}
