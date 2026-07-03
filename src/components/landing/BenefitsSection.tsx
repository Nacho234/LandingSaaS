import { Gauge, Wallet, Boxes, Users, BarChart3, MonitorSmartphone, ShieldCheck, Layers } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../effects/Reveal'
import { Button } from '../ui/Button'
import { useApp } from '../../app/providers'

const BENEFITS = [
  { icon: Wallet, text: 'Caja más ordenada, con apertura, cierre y diferencia visible' },
  { icon: Boxes, text: 'Stock actualizado sin planillas paralelas' },
  { icon: Users, text: 'Clientes organizados, con historial y cuenta corriente' },
  { icon: BarChart3, text: 'Reportes claros para decidir con números' },
  { icon: MonitorSmartphone, text: 'Acceso desde cualquier dispositivo, instalable como app' },
  { icon: ShieldCheck, text: 'Usuarios con permisos y operaciones auditadas' },
  { icon: Layers, text: 'Datos separados por negocio, siempre' },
]

export function BenefitsSection() {
  const { openModal } = useApp()

  return (
    <Section className="bg-ink-900/30">
      <SectionHeader
        title="Lo que gana tu negocio desde el primer mes"
        lead="Menos tareas manuales, más control y una operación que se entiende de un vistazo."
      />

      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Card destacada */}
        <Reveal>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-accent-400/30 bg-gradient-to-br from-accent-500/[0.08] to-blue-600/[0.06] p-8">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-56 rounded-full bg-accent-400/10 blur-3xl"
            />
            <div>
              <span className="inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-blue-600 shadow-[0_8px_30px_-8px_rgba(6,182,212,0.6)]">
                <Gauge className="size-6 text-white" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
                Más control de ventas, sin trabajar más horas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Tu negocio no necesita más planillas: necesita un sistema claro para vender y controlar. Cada venta
                alimenta la caja, el stock y los reportes sin pasos extra. Simple para el vendedor, completo para el
                administrador.
              </p>
            </div>
            <div className="mt-6">
              <Button onClick={() => openModal({ type: 'business' })}>Crear mi negocio</Button>
            </div>
          </div>
        </Reveal>

        {/* Lista de beneficios */}
        <Stagger className="grid gap-3">
          {BENEFITS.map((b) => (
            <StaggerItem key={b.text}>
              <div className="card card-hover flex items-center gap-3.5 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-400/10">
                  <b.icon className="size-4.5 text-accent-300" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="text-sm text-slate-300">{b.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
