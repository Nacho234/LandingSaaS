import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variants = {
  primary:
    'bg-gradient-to-r from-accent-500 to-blue-500 text-white font-semibold shadow-[0_8px_30px_-8px_rgba(6,182,212,0.5)] hover:shadow-[0_8px_36px_-6px_rgba(6,182,212,0.65)] hover:brightness-110',
  secondary:
    'border border-white/15 bg-white/[0.04] text-slate-100 font-medium hover:border-accent-400/40 hover:bg-white/[0.08]',
  ghost: 'text-slate-300 font-medium hover:text-white hover:bg-white/[0.06]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap cursor-pointer select-none',
        'transition-all duration-200 active:scale-[0.98]',
        'disabled:opacity-50 disabled:pointer-events-none',
        sizes[size],
        variants[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  )
}
