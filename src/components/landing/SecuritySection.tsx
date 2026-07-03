import { Lock, KeyRound, Settings2, TrendingUp } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../effects/Reveal'
import { Badge } from '../ui/Badge'

const PILLARS = [
  {
    icon: Lock,
    title: 'Datos aislados',
    text: 'Cada negocio funciona como un espacio privado: sus productos, ventas y clientes no aparecen en ningún otro negocio.',
  },
  {
    icon: KeyRound,
    title: 'Roles y permisos',
    text: 'Los usuarios pertenecen a su negocio y acceden solo a lo que su rol permite. Cada operación queda asociada a su autor.',
  },
  {
    icon: Settings2,
    title: 'Configuración por negocio',
    text: 'Métodos de pago, preferencias del POS y datos propios: cada comercio ajusta el sistema sin afectar a los demás.',
  },
  {
    icon: TrendingUp,
    title: 'Diseñado para escalar',
    text: 'La arquitectura está preparada para sumar negocios nuevos sin tocar los existentes ni degradar la experiencia.',
  },
]

export function SecuritySection() {
  return (
    <Section id="seguridad" className="bg-ink-900/30">
      <SectionHeader
        eyebrow="Seguridad y separación de datos"
        title="Cada negocio tiene sus datos separados"
        lead="La plataforma está pensada para que múltiples comercios usen el sistema sin mezclar información."
      />

      <Stagger className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title}>
            <div className="card card-hover h-full p-6">
              <span className="inline-grid size-11 place-items-center rounded-xl bg-accent-400/10">
                <p.icon className="size-5 text-accent-300" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-2">
        <Badge tone="accent">Datos aislados por negocio</Badge>
        <Badge tone="accent">Roles y permisos</Badge>
        <Badge tone="accent">Configuración independiente</Badge>
        <Badge tone="accent">Preparado para escalar</Badge>
      </Reveal>
    </Section>
  )
}
