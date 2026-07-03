import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem, Reveal } from '../effects/Reveal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { PLANS, ANNUAL_DISCOUNT, PRICE_DISCLAIMER } from '../../data/plans'
import { formatCurrency } from '../../utils/formatCurrency'
import { cn } from '../../utils/cn'
import { PricingComparison } from './PricingComparison'

export function PricingSection() {
  const { openModal } = useApp()
  const [annual, setAnnual] = useState(false)
  const [showTable, setShowTable] = useState(false)

  return (
    <Section id="planes" className="bg-ink-900/30">
      <SectionHeader
        eyebrow="Planes de suscripción"
        title="Planes para cada etapa de tu negocio"
        lead="Elegí un plan mensual y empezá a usar ventas, caja, stock y reportes desde una plataforma preparada para crecer."
      />

      {/* Toggle mensual/anual */}
      <Reveal className="mb-10 flex items-center justify-center gap-3">
        <span className={cn('text-sm', !annual ? 'font-semibold text-white' : 'text-slate-500')}>Mensual</span>
        <button
          role="switch"
          aria-checked={annual}
          aria-label="Cambiar a facturación anual"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            'relative h-7 w-13 rounded-full border transition-colors cursor-pointer',
            annual ? 'border-accent-400/50 bg-accent-500/30' : 'border-white/15 bg-white/[0.06]',
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className={cn(
              'absolute top-0.5 size-5.5 rounded-full bg-gradient-to-br from-accent-400 to-blue-500 shadow',
              annual ? 'right-0.5' : 'left-0.5',
            )}
          />
        </button>
        <span className={cn('text-sm', annual ? 'font-semibold text-white' : 'text-slate-500')}>
          Anual <span className="text-emerald-400">(15% off)</span>
        </span>
      </Reveal>

      <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const price = plan.monthly !== null ? (annual ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly) : null
          return (
            <StaggerItem key={plan.id} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-6',
                  plan.recommended
                    ? 'border-accent-400/50 bg-accent-400/[0.05] shadow-[0_0_60px_-18px_rgba(34,211,238,0.45)]'
                    : 'border-white/10 bg-white/[0.03]',
                )}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="accent" className="border-accent-400/60 bg-ink-900">
                      Recomendado
                    </Badge>
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <Badge tone={plan.recommended ? 'accent' : 'neutral'}>{plan.badge}</Badge>
                </div>

                <div className="mt-4 min-h-[64px]">
                  {price !== null ? (
                    <>
                      <p className="font-mono text-3xl font-bold text-white tabular-nums">
                        {formatCurrency(price)}
                        <span className="text-sm font-normal text-slate-500">/mes</span>
                      </p>
                      {annual && (
                        <p className="mt-1 text-xs text-emerald-400">
                          Ahorrás {formatCurrency((plan.monthly! - price) * 12)} al año
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-white">Personalizado</p>
                  )}
                </div>

                <p className="mt-1 text-xs leading-relaxed text-slate-400">{plan.description}</p>

                <ul className="mt-5 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-400" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-6 w-full"
                  variant={plan.recommended ? 'primary' : 'secondary'}
                  onClick={() => openModal({ type: 'plan', plan })}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            </StaggerItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-8 text-center">
        <p className="text-xs text-slate-500">{PRICE_DISCLAIMER}</p>
        <button
          onClick={() => setShowTable((v) => !v)}
          className="mt-4 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-400 cursor-pointer"
        >
          {showTable ? 'Ocultar comparación de planes' : 'Comparar planes en detalle'}
        </button>
      </Reveal>

      {showTable && <PricingComparison />}
    </Section>
  )
}
