import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface WindowFrameProps {
  title: string
  children: ReactNode
  className?: string
  badge?: ReactNode
}

/** Marco tipo ventana de app para los mockups del sistema. */
export function WindowFrame({ title, children, className, badge }: WindowFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_24px_80px_-24px_rgba(2,8,23,0.9)]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 bg-ink-800/70 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-xs font-medium text-slate-400">{title}</span>
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}

interface MiniBarsProps {
  values: number[]
  className?: string
  barClass?: string
  animateKey?: string
}

/** Mini gráfico de barras animado para paneles de mockup. */
export function MiniBars({ values, className, barClass, animateKey }: MiniBarsProps) {
  const reduce = useReducedMotion()
  const max = Math.max(...values, 1)
  return (
    <div className={cn('flex h-20 items-end gap-1.5', className)} role="img" aria-label="Gráfico de ventas de la semana">
      {values.map((v, i) => (
        <motion.div
          key={`${animateKey ?? ''}-${i}`}
          initial={reduce ? false : { height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className={cn('flex-1 rounded-sm bg-gradient-to-t from-accent-600/60 to-accent-400', barClass)}
        />
      ))}
    </div>
  )
}

interface StatProps {
  label: string
  value: ReactNode
  hint?: string
  className?: string
}

export function Stat({ label, value, hint, className }: StatProps) {
  return (
    <div className={cn('rounded-xl border border-white/8 bg-white/[0.03] p-3', className)}>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold text-white tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-emerald-400">{hint}</p>}
    </div>
  )
}

export function Dot({ tone = 'emerald' }: { tone?: 'emerald' | 'amber' | 'rose' }) {
  const map = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', rose: 'bg-rose-400' }
  return <span aria-hidden className={cn('inline-block size-1.5 rounded-full animate-pulse-soft', map[tone])} />
}
