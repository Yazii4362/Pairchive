import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * PAirchive 워드마크 로고.
 *
 * 자산:
 *  - public/brand/pair-light.png : 라이트 모드용 (어두운 글씨 + 그린 배)
 *  - public/brand/pair-dark.png  : 다크 모드용  (흰 글씨 + 그린 배)
 *  - 원본 합본은 public/brand/pair-original.png
 *
 * 사용 위치: Sidebar, Landing 헤더, Auth 페이지, Report 헤더 등
 * 사이즈는 `height` 로 조절합니다. 종횡비(약 1.10:1) 가 자동 유지됩니다.
 */

interface LogoProps {
  /** 픽셀 단위 높이. 기본 28. */
  height?: number;
  className?: string;
}

export function Logo({ height = 28, className }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === 'dark' ? '/brand/pair-dark.png' : '/brand/pair-light.png';

  return (
    <img
      src={src}
      alt="PAirchive"
      height={height}
      style={{ height: `${height}px`, width: 'auto' }}
      className={cn('block select-none', className)}
      draggable={false}
    />
  );
}
