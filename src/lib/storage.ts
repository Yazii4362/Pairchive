/**
 * 타입 안전 localStorage 헬퍼.
 * 백엔드가 붙기 전까지 mock 영속화 계층으로 사용됩니다.
 *
 * 주의: SSR 환경이 아니므로 window 가드는 생략. 추후 도입 시 추가하세요.
 */

const STORAGE_PREFIX = 'pairchive:v1:';

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] failed to read "${key}"`, err);
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] failed to write "${key}"`, err);
  }
}

export function removeStorage(key: string): void {
  window.localStorage.removeItem(STORAGE_PREFIX + key);
}

export const STORAGE_KEYS = {
  currentUser: 'current-user',
  pairFolders: 'pair-folders',
  shelfFolders: 'shelf-folders',
} as const;
