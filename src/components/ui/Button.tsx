import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  /** 브랜드 CTA. UI에서 가장 강한 액션. */
  primary: 'bg-brand text-white hover:bg-brand-strong',
  /** 보조 액션. 면 없이 보더만. */
  secondary:
    'border border-border-strong bg-surface text-fg hover:bg-surface-strong',
  /** 텍스트 버튼. */
  ghost: 'text-fg-muted hover:bg-surface-strong hover:text-fg',
  /** 반전 강조 (검정 면 흰 글씨). 헤더/푸터 등 한정 사용. */
  inverse: 'bg-fg text-bg hover:opacity-90',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
};

/**
 * PAirchive 기본 버튼.
 * 디자인 원칙: UI에서는 Neutrals + Brand(green-400) + 흑백 외 컬러를 쓰지 않습니다.
 * (Yellow/Pink/Orange/Blue/non-brand Green은 책 커버 전용)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
