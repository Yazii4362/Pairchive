import { Link } from 'react-router-dom';
import { GrainOverlay } from '@/components/visual/GrainOverlay';
import { COVER_COLORS } from '@/lib/coverColors';
import { coverSpineBackground } from '@/lib/coverGradients';
import { partnerNameOf } from '@/lib/mockData';
import { paths } from '@/routes/paths';
import type { PairFolder } from '@/types';

/**
 * 책꽂이에 꽂힌 한 권의 "책등(spine)" 표현.
 *
 * tone:
 *   - 'primary' : 1층 — 지금 함께 쌓는 중. 채도 가득, 활기찬 hover, D-day 표시.
 *   - 'muted'   : 2층 — 다 읽고 간직한 책. 살짝 채도/밝기를 낮춰 시간이 지난 톤,
 *                       hover 도 정중하게 한 칸만 들림. D-day 대신 만료 월(月) 라벨.
 *
 *  - 책마다 폭/높이가 살짝 달라지도록 folder.id 의 해시로 결정적 계산.
 *    같은 폴더는 항상 같은 두께/키 → 시각이 안정적.
 */
export function BookSpine({
  folder,
  tone = 'primary',
}: {
  folder: PairFolder;
  tone?: 'primary' | 'muted';
}) {
  const preset = COVER_COLORS[folder.cover.colorId];
  const width = spineWidth(folder.id);
  const height = spineHeight(folder.id);
  const muted = tone === 'muted';
  const coAuthor = partnerNameOf(folder);

  return (
    <Link
      to={paths.pairFolder(folder.id)}
      aria-label={`${folder.title} 책 열기`}
      className={
        'book-spine group relative block shrink-0 overflow-hidden rounded-t-md shadow-cover transition-transform duration-300 ease-out focus-visible:outline-none ' +
        (muted
          ? 'hover:-translate-y-1.5 focus-visible:-translate-y-1.5'
          : 'hover:-translate-y-3 focus-visible:-translate-y-3')
      }
      style={{
        // hue 가족 fallback — gradient 가 그려지기 전 한 호흡의 단색.
        backgroundColor: preset.cssVar,
        // Grainy gradient illustration — 좌상 글로우 + 위→아래 3-stop 그라디언트.
        backgroundImage: coverSpineBackground(folder.cover.colorId),
        width: `${width}px`,
        height: `${height}px`,
        // 2층 책은 살짝 시간이 지난 톤 — 색의 정체성은 살리되 무게감을 더함
        filter: muted ? 'saturate(0.78) brightness(0.94)' : undefined,
        opacity: muted ? 0.92 : 1,
      }}
    >
      {/* 좌측 책등 안쪽 어두운 띠 */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[5px] rounded-l-md"
        style={{ backgroundColor: 'rgba(0,0,0,0.22)' }}
        aria-hidden
      />
      {/* 우측 페이지 단면 톤 */}
      <span
        className="pointer-events-none absolute inset-y-2 right-0 w-[3px] rounded-r-md bg-white/60"
        aria-hidden
      />
      {/* 상단 미세 하이라이트 */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-md bg-white/30"
        aria-hidden
      />

      {/* 책등 제목 — 세로쓰기. 저자명 영역을 비워두기 위해 하단 여백을 조금 더 둠. */}
      <span
        className="absolute inset-x-0 top-0 flex items-start justify-center pt-5"
        style={{
          writingMode: 'vertical-rl',
          height: `${Math.max(0, height - 78)}px`,
        }}
      >
        <span className="font-serif text-[14px] font-semibold tracking-tight text-white">
          {folder.title}
        </span>
      </span>

      {/* 책등 하단 메타 — 책 표지의 '저자 띠지' 처럼 두 줄 구성.
          1행: 디데이(또는 끝난 월) — 책의 시간
          2행: 저자명(맞은편 친구) — 책의 사람                           */}
      <span className="absolute inset-x-0 bottom-2.5 flex flex-col items-center gap-0.5">
        <span className="font-mono text-[10px] leading-none tracking-wider text-white/80">
          {muted
            ? endedMonthLabel(folder.expiresAt)
            : `D-${daysUntilExpiry(folder.expiresAt)}`}
        </span>
        {coAuthor && (
          <span
            className="max-w-[80%] truncate font-serif text-[10px] italic leading-none text-white/65"
            aria-label={`저자 ${coAuthor}`}
          >
            {coAuthor}
          </span>
        )}
      </span>

      {/* Grainy gradient illustration 결 — 책 표지 한 면에 자글자글한 인쇄 텍스처 한 장.
          멀티스톱 그라디언트의 평평함을 깨주는 미세한 노이즈로, 종이/포스터 인쇄 느낌. */}
      <GrainOverlay scope="absolute" opacity={muted ? 0.26 : 0.32} seed={folder.id} />
    </Link>
  );
}

/**
 * 폴더 id 의 단순 해시 (자열 합) — 결정적으로 책의 폭과 키를 결정합니다.
 * 같은 책은 항상 같은 모양으로 그려져, 다시 들어와도 책장의 풍경이 같습니다.
 */
function hashOf(id: string, salt = 1): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h * salt) >>> 0;
}

const WIDTHS = [60, 64, 68, 72, 76] as const;
const HEIGHTS = [290, 300, 310, 320, 330] as const;

function spineWidth(id: string): number {
  return WIDTHS[hashOf(id, 1) % WIDTHS.length]!;
}

function spineHeight(id: string): number {
  return HEIGHTS[hashOf(id, 7) % HEIGHTS.length]!;
}

function daysUntilExpiry(expiresAt: string): number {
  const now = Date.now();
  const exp = new Date(expiresAt).getTime();
  if (!Number.isFinite(exp)) return 0;
  return Math.max(0, Math.round((exp - now) / (1000 * 60 * 60 * 24)));
}

function endedMonthLabel(expiresAt: string): string {
  const d = new Date(expiresAt);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
}
