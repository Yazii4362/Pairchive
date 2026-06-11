import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 결합 유틸. clsx로 조건 클래스를 합치고
 * tailwind-merge로 충돌나는 유틸리티(예: px-2 vs px-4)를 정리합니다.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
