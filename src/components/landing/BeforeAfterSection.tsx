import { X, Check } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'

const BEFORE = [
  'Ventas anotadas a mano',
  'Stock en un cuaderno',
  'Caja sin apertura ni cierre',
  'Clientes y fiados de memoria',
  'Cero reportes',
  'Difícil sumar empleados o sucursales',
]

const AFTER = [
  'POS moderno en el mostrador',
  'Stock actualizado con cada venta',
  'Caja controlada con diferencia visible',
  'Clientes con historial y cuenta corriente',
  'Reportes claros de ventas y pagos',
  'Usuarios con permisos, listo para crecer',
]

export function BeforeAfterSection() {
  return (
    <Section>
      <SectionHeader
        title="El mismo negocio, con y sin sistema"
        lead="La diferencia no es vender más de un día para el otro: es saber exactamente qué pasa en tu negocio."
      />

      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-rose-400/15 bg-rose-400/[0.03] p-6">
            <p className="text-sm font-bold text-rose-300">Antes</p>
            <p className="mt-1 text-xs text-slate-500">Operación manual y desordenada</p>
            <ul className="mt-5 space-y-3">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-rose-400/12">
                    <X className="size-3 text-rose-400" aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-accent-400/25 bg-accent-400/[0.04] p-6 shadow-[0_0_50px_-16px_rgba(34,211,238,0.3)]">
            <p className="text-sm font-bold text-accent-300">Después</p>
            <p className="mt-1 text-xs text-slate-400">Todo el negocio dentro de la plataforma</p>
            <ul className="mt-5 space-y-3">
              {AFTER.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/12">
                    <Check className="size-3 text-emerald-400" aria-hidden />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
