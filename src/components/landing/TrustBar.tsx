import { Store } from 'lucide-react'
import { Marquee } from '../effects/Marquee'
import { Counter } from '../effects/Counter'
import { Reveal, Stagger, StaggerItem } from '../effects/Reveal'
import { INDUSTRIES_MARQUEE } from '../../data/businesses'

const METRICS = [
  { value: 25, prefix: '+', suffix: '', label: 'módulos de gestión en una sola plataforma' },
  { value: 7, prefix: '', suffix: ' min', label: 'para crear un negocio demo y empezar a probar' },
  { value: 24, prefix: '', suffix: '/7', label: 'acceso al sistema desde cualquier dispositivo' },
  { value: 100, prefix: '', suffix: '%', label: 'adaptable a distintos rubros y formas de vender' },
]

export function TrustBar() {
  return (
    <section className="relative border-y border-white/6 bg-ink-900/40 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-6 text-center text-sm text-slate-500">
            Una plataforma preparada para distintos tipos de comercios
          </p>
        </Reveal>

        <Marquee>
          {INDUSTRIES_MARQUEE.map((r) => (
            <span
              key={r}
              className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-slate-400"
            >
              <Store className="size-3.5 text-accent-400/70" strokeWidth={1.75} aria-hidden />
              {r}
            </span>
          ))}
        </Marquee>

        <Stagger className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m) => (
            <StaggerItem key={m.label}>
              <div className="card card-hover h-full p-5 text-center">
                <p className="font-mono text-3xl font-bold text-white tabular-nums md:text-4xl">
                  <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">{m.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
