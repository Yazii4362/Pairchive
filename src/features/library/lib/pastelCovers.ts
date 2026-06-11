/**
 * 라이브러리 책장 한정 — 책 표지 색을 "파스텔 톤"으로 한 단계 더 부드럽게 풀어주는 매핑.
 *
 * 같은 책의 정체성(노란 책은 노랑, 분홍 책은 분홍)은 보존하지만,
 *   - 메인 책장(=BookSpine)에서는 ​​**600 단계의 채도 가득한 톤** 으로 활기차게,
 *   - 라이브러리 책장(=BookStackBar)에서는 **200 단계의 파스텔 톤** 으로 시간이 지난 무게감을 표현.
 *
 * 텍스트는 같은 색 패밀리의 900 단계로 — 한 가족 안에서의 대비로 시선을 끔.
 */
import type { CoverColorId } from '@/lib/coverColors';

export interface PastelCoverPreset {
  /** 책 막대 배경 — pastel 200 */
  bgClass: string;
  /** 책 막대 메인 텍스트 — 같은 색 패밀리의 900 */
  fgClass: string;
  /** 책 막대 보조(메타) 텍스트 — 700 단계로 한 톤 muted */
  metaClass: string;
  /** 호버 시 슬쩍 드러나는 inner page 띠 — 300 단계로 한 톤 진하게 */
  edgeClass: string;
}

export const PASTEL_COVERS: Readonly<Record<CoverColorId, PastelCoverPreset>> = {
  pear: {
    bgClass: 'bg-yellow-200',
    fgClass: 'text-yellow-900',
    metaClass: 'text-yellow-800/75',
    edgeClass: 'bg-yellow-300',
  },
  archive: {
    bgClass: 'bg-pink-200',
    fgClass: 'text-pink-900',
    metaClass: 'text-pink-800/75',
    edgeClass: 'bg-pink-300',
  },
  index: {
    bgClass: 'bg-green-200',
    fgClass: 'text-green-900',
    metaClass: 'text-green-800/75',
    edgeClass: 'bg-green-300',
  },
  story: {
    bgClass: 'bg-orange-200',
    fgClass: 'text-orange-900',
    metaClass: 'text-orange-800/75',
    edgeClass: 'bg-orange-300',
  },
  deep: {
    bgClass: 'bg-blue-200',
    fgClass: 'text-blue-900',
    metaClass: 'text-blue-800/75',
    edgeClass: 'bg-blue-300',
  },
} as const;
