import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem } from '../effects/Reveal'
import { useApp } from '../../app/providers'
import { FEATURES } from '../../data/features'
import { cn } from '../../utils/cn'

/** Los 6 módulos principales se muestran grandes, el resto en grilla compacta. */
const PRIMARY_IDS = ['pos', 'caja', 'stock', 'clientes', 'reportes', 'usuarios']

export function FeaturesSection() {
  const { openModal } = useApp()
  const primary = FEATURES.filter((f) => PRIMARY_IDS.includes(f.id))
  const rest = FEATURES.filter((f) => !PRIMARY_IDS.includes(f.id))

  return (
    <Section id="funcionalidades">
      <SectionHeader
        title="Todo lo que necesita un comercio para vender y gestionar mejor"
        lead="Módulos que trabajan juntos: cada venta actualiza stock, caja y reportes sin que hagas nada extra."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {primary.map((f, i) => (
          <StaggerItem key={f.id} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-1')}>
            <button
              onClick={() => openModal({ type: 'feature', feature: f })}
              className="card card-hover group flex h-full w-full flex-col p-6 text-left cursor-pointer"
            >
              <span className="inline-grid size-11 place-items-center rounded-xl bg-gradient-to-br from-accent-400/15 to-blue-500/15 transition-transform duration-300 group-hover:scale-110">
                <f.icon className="size-5.5 text-accent-300" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-400">{f.description}</p>
              <ul className="mt-4 space-y-1.5">
                {f.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-slate-400">
                    <Check className="size-3.5 shrink-0 text-emerald-400" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-300 transition-all group-hover:gap-2.5">
                Ver más <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" gap={0.05}>
        {rest.map((f) => (
          <StaggerItem key={f.id}>
            <button
              onClick={() => openModal({ type: 'feature', feature: f })}
              className="card card-hover group flex h-full w-full items-start gap-3 p-4 text-left cursor-pointer"
            >
              <f.icon className="mt-0.5 size-4.5 shrink-0 text-accent-400/80" strokeWidth={1.75} aria-hidden />
              <span>
                <span className="block text-sm font-medium text-slate-100">{f.title}</span>
                <span className="mt-0.5 hidden text-xs leading-snug text-slate-500 sm:block">{f.description}</span>
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
