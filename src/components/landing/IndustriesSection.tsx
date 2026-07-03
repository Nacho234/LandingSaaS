import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { INDUSTRIES } from '../../data/industries'
import { cn } from '../../utils/cn'

export function IndustriesSection() {
  const { openModal } = useApp()
  const [active, setActive] = useState(0)
  const ind = INDUSTRIES[active]

  return (
    <Section id="rubros">
      <SectionHeader
        title="Un sistema para distintos tipos de negocios"
        lead="Mismos módulos, distinta forma de usarlos. Elegí tu rubro y mirá cómo encaja."
      />

      <Reveal>
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Rubros">
          {INDUSTRIES.map((i, idx) => (
            <button
              key={i.id}
              role="tab"
              aria-selected={active === idx}
              onClick={() => setActive(idx)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer',
                active === idx
                  ? 'border-accent-400/50 bg-accent-400/12 text-accent-300'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200',
              )}
            >
              <i.icon className="size-4" strokeWidth={1.75} aria-hidden />
              {i.name}
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={ind.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="card overflow-hidden">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-white/8 p-6 sm:border-b-0 sm:border-r">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-300/90">El problema típico</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{ind.problem}</p>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/90">Cómo lo resuelve</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{ind.solution}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 bg-white/[0.02] px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                {ind.modules.map((m) => (
                  <Badge key={m} tone="neutral">
                    {m}
                  </Badge>
                ))}
                <Badge tone="accent">Plan sugerido: {ind.plan}</Badge>
              </div>
              <Button size="sm" onClick={() => openModal({ type: 'demo', preset: ind.cta })}>
                {ind.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
