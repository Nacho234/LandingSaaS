import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Check } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { PLANS } from '../../data/plans'
import { recommendPlan, type CalculatorAnswers } from '../../utils/planRecommendation'
import { cn } from '../../utils/cn'

const USER_OPTIONS = ['1', '2-3', '4-10', '10+']
const PRODUCT_OPTIONS = ['Hasta 100', '100-1000', '1000+']

const TOGGLES: { key: keyof Pick<CalculatorAnswers, 'branches' | 'currentAccount' | 'advancedReports' | 'integrations'>; label: string }[] = [
  { key: 'currentAccount', label: 'Necesito cuenta corriente / fiado' },
  { key: 'advancedReports', label: 'Necesito reportes avanzados' },
  { key: 'branches', label: 'Tengo más de una sucursal' },
  { key: 'integrations', label: 'Voy a necesitar integraciones' },
]

export function PlanCalculator() {
  const { openModal } = useApp()
  const [answers, setAnswers] = useState<CalculatorAnswers>({
    users: '1',
    products: 'Hasta 100',
    branches: false,
    currentAccount: false,
    advancedReports: false,
    integrations: false,
  })
  const [result, setResult] = useState<ReturnType<typeof recommendPlan> | null>(null)

  const calc = () => setResult(recommendPlan(answers))
  const plan = result ? PLANS.find((p) => p.id === result.planId)! : null

  return (
    <Section>
      <SectionHeader
        title="¿No sabés qué plan necesita tu negocio?"
        lead="Contestá cuatro preguntas y te recomendamos el plan justo. Sin compromiso, todo acá mismo."
      />

      <Reveal>
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Preguntas */}
          <div className="card p-6">
            <fieldset>
              <legend className="text-sm font-semibold text-white">¿Cuántas personas van a usar el sistema?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {USER_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setAnswers((a) => ({ ...a, users: o }))}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer',
                      answers.users === o
                        ? 'border-accent-400/50 bg-accent-400/12 text-accent-300'
                        : 'border-white/10 text-slate-400 hover:text-slate-200',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-white">¿Cuántos productos manejás?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCT_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setAnswers((a) => ({ ...a, products: o }))}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer',
                      answers.products === o
                        ? 'border-accent-400/50 bg-accent-400/12 text-accent-300'
                        : 'border-white/10 text-slate-400 hover:text-slate-200',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6 space-y-2.5">
              <legend className="mb-1 text-sm font-semibold text-white">¿Qué más necesitás?</legend>
              {TOGGLES.map((t) => (
                <label key={t.key} className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={answers[t.key]}
                    onChange={(e) => setAnswers((a) => ({ ...a, [t.key]: e.target.checked }))}
                    className="size-4 accent-cyan-400"
                  />
                  {t.label}
                </label>
              ))}
            </fieldset>

            <Button className="mt-6 w-full" onClick={calc}>
              <Sparkles className="size-4" aria-hidden />
              Recomendarme un plan
            </Button>
          </div>

          {/* Resultado */}
          <div className="flex">
            <AnimatePresence mode="wait">
              {plan && result ? (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  className="flex w-full flex-col rounded-2xl border border-accent-400/40 bg-accent-400/[0.05] p-6 shadow-[0_0_50px_-16px_rgba(34,211,238,0.4)]"
                >
                  <Badge tone="accent" className="self-start">
                    Plan recomendado
                  </Badge>
                  <h3 className="mt-3 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{result.reason}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {plan.features.slice(0, 6).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="size-3.5 text-emerald-400" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-col gap-2">
                    <Button onClick={() => openModal({ type: 'plan', plan })}>Suscribirme a este plan</Button>
                    <Button variant="secondary" onClick={() => openModal({ type: 'call' })}>
                      Pedir asesoramiento
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 p-8 text-center"
                >
                  <Sparkles className="size-8 text-slate-600" aria-hidden />
                  <p className="mt-3 text-sm text-slate-500">
                    Tu recomendación va a aparecer acá, con el porqué y los límites del plan.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
