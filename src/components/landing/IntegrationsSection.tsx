import { Plug } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem } from '../effects/Reveal'
import { Badge } from '../ui/Badge'
import { INTEGRATIONS, type Integration } from '../../data/integrations'

function statusTone(s: Integration['status']) {
  switch (s) {
    case 'Preparado para integrar':
      return 'success' as const
    case 'Según plan':
      return 'accent' as const
    case 'Personalizado':
      return 'warning' as const
    default:
      return 'neutral' as const
  }
}

export function IntegrationsSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionHeader
        title="Preparado para conectarse con tu operación"
        lead="Ninguna integración está activa en esta demo, pero la arquitectura ya está diseñada para incorporarlas por etapas."
      />

      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
        {INTEGRATIONS.map((i) => (
          <StaggerItem key={i.name}>
            <div className="card card-hover flex h-full items-start gap-3.5 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.05]">
                <Plug className="size-4.5 text-accent-300" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{i.name}</h3>
                  <Badge tone={statusTone(i.status)} className="!px-2 !py-0.5 !text-[10px]">
                    {i.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{i.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
