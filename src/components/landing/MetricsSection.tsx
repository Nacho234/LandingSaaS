import { Section } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../effects/Reveal'
import { Counter } from '../effects/Counter'
import { GlowBackground } from '../effects/GlowBackground'

const METRICS = [
  { value: 3, suffix: 'x', label: 'más orden operativo', detail: 'Ventas, caja y stock dejan de vivir en papeles.' },
  { value: 60, suffix: '%', label: 'menos tareas manuales', detail: 'El sistema registra y calcula por vos.' },
  { value: 100, suffix: '%', label: 'negocios separados', detail: 'Cero datos mezclados entre comercios.' },
  { value: 24, suffix: '/7', label: 'acceso a la plataforma', detail: 'Desde PC, tablet o celular, estés donde estés.' },
]

export function MetricsSection() {
  return (
    <Section className="overflow-hidden">
      <GlowBackground />
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-[2.6rem] md:leading-[1.12]">
          El impacto de pasar del cuaderno a un sistema
        </h2>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => (
          <StaggerItem key={m.label}>
            <div className="card card-hover h-full p-6 text-center">
              <p className="font-mono text-5xl font-bold tabular-nums text-gradient">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-3 text-sm font-semibold text-white">{m.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{m.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <p className="mt-8 text-center text-xs text-slate-500">
          Métricas estimadas con fines demostrativos: el resultado real depende de cada negocio.
        </p>
      </Reveal>
    </Section>
  )
}
