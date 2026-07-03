import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface MarqueeProps {
  children: ReactNode
  className?: string
}

/** Marquee infinito con pausa al hover. Se desactiva con prefers-reduced-motion (CSS). */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
