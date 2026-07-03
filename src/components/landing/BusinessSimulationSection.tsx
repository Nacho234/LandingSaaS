import { Lock, Users, Package, Wallet } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem } from '../effects/Reveal'
import { TiltCard } from '../effects/TiltCard'
import { Badge } from '../ui/Badge'
import { MiniBars } from '../mockups/shared'
import { BUSINESSES } from '../../data/businesses'
import { formatCurrency } from '../../utils/formatCurrency'

export function BusinessSimulationSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionHeader
        title="Cada negocio tiene su propio espacio dentro del sistema"
        lead="Negocios de ejemplo conviviendo en la misma plataforma. Mismos módulos, datos completamente independientes."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BUSINESSES.map((b) => (
          <StaggerItem key={b.id}>
            <TiltCard className="h-full">
              <div className="card card-hover group h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{b.name}</h3>
                    <p className="text-xs text-slate-500">{b.industry}</p>
                  </div>
                  <Badge tone="accent">Plan {b.plan}</Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/[0.03] p-2">
                    <Users className="mx-auto size-3.5 text-slate-500" aria-hidden />
                    <p className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">{b.users}</p>
                    <p className="text-[10px] text-slate-500">usuarios</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2">
                    <Package className="mx-auto size-3.5 text-slate-500" aria-hidden />
                    <p className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">{b.products}</p>
                    <p className="text-[10px] text-slate-500">productos</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2">
                    <Wallet className="mx-auto size-3.5 text-slate-500" aria-hidden />
                    <p className={`mt-1 text-sm font-semibold ${b.cashOpen ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {b.cashOpen ? 'Abierta' : 'Cerrada'}
                    </p>
                    <p className="text-[10px] text-slate-500">caja</p>
                  </div>
                </div>

                {/* Mini dashboard visible al hover */}
                <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-slate-500">Ventas del mes</p>
                      <p className="font-mono text-xs font-semibold text-white tabular-nums">
                        {formatCurrency(b.monthSales)}
                      </p>
                    </div>
                    <MiniBars values={b.weekSales} className="mt-2 h-10" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-white/6 pt-3 text-[11px] text-slate-500">
                  <Lock className="size-3 text-accent-400" aria-hidden />
                  Datos privados: ningún otro negocio puede verlos
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
