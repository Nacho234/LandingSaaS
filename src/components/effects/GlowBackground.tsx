import { cn } from '../../utils/cn'

interface GlowBackgroundProps {
  className?: string
  grid?: boolean
}

/** Fondo con gradientes suaves del acento y grid tecnológico opcional. Sin JS, solo CSS. */
export function GlowBackground({ className, grid = false }: GlowBackgroundProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {grid && <div className="tech-grid absolute inset-0" />}
      <div
        className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(34,211,238,0.28) 0%, rgba(59,130,246,0.14) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-56 -right-40 h-[480px] w-[640px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
