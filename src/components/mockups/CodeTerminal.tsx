import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const LINES = [
  { text: 'tenant.create("mi-negocio")', color: 'text-accent-300' },
  { text: 'business.workspace.ready', color: 'text-emerald-400' },
  { text: 'stock.synced (412 productos)', color: 'text-slate-400' },
  { text: 'cash.register.opened', color: 'text-slate-400' },
  { text: 'sale.created  +$18.400', color: 'text-emerald-400' },
  { text: 'report.updated', color: 'text-slate-400' },
  { text: 'system online', color: 'text-accent-300' },
]

/** Terminal con líneas que aparecen en loop. Estática con prefers-reduced-motion. */
export function CodeTerminal({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? LINES.length : 1)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setCount((c) => (c >= LINES.length ? 1 : c + 1))
    }, 1400)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className={className} aria-hidden>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-950/95 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
          <span className="size-2 rounded-full bg-rose-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[10px] text-slate-500">plataforma</span>
        </div>
        <div className="min-h-[132px] px-3.5 py-3 font-mono text-[11px] leading-relaxed">
          {LINES.slice(0, count).map((l) => (
            <p key={l.text} className={l.color}>
              <span className="text-slate-600">$ </span>
              {l.text}
            </p>
          ))}
          <span className="inline-block h-3 w-1.5 animate-pulse-soft bg-accent-400" />
        </div>
      </div>
    </div>
  )
}
