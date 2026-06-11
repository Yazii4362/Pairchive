/**
 * ID 생성 유틸. 브라우저 native crypto.randomUUID()를 우선 사용하고
 * 미지원 환경에 한해 폴백을 사용합니다.
 */
export function createId(prefix?: string): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${uuid}` : uuid;
}
