import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ShoppingCart, Wallet, Boxes, Users, BarChart3, ShieldCheck } from 'lucide-react'
import { WindowFrame, Stat, MiniBars, Dot } from './shared'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { BUSINESSES } from '../../data/businesses'
import { formatCurrency } from '../../utils/formatCurrency'

const TABS = [
  { id: 'ventas', label: 'Ventas', icon: ShoppingCart },
  { id: 'caja', label: 'Caja', icon: Wallet },
  { id: 'stock', label: 'Stock', icon: Boxes },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'usuarios', label: 'Usuarios', icon: ShieldCheck },
] as const

type TabId = (typeof TABS)[number]['id']

export function DashboardMockup() {
  const { toast, openModal } = useApp()
  const [bizIndex, setBizIndex] = useState(0)
  const [tab, setTab] = useState<TabId>('ventas')
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const biz = BUSINESSES[bizIndex]

  const pickBiz = (i: number) => {
    setBizIndex(i)
    setSwitcherOpen(false)
    toast(`Cambiaste al espacio de ${BUSINESSES[i].name}. Datos 100% independientes.`, 'info')
  }

  return (
    <WindowFrame
      title="Panel del negocio"
      badge={
        <div className="hidden items-center gap-2 sm:flex">
          <Badge tone="success">
            <Dot /> Online
          </Badge>
          <Badge tone="accent">Plan {biz.plan}</Badge>
        </div>
      }
    >
      <div className="grid md:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-b border-white/8 p-3 md:border-b-0 md:border-r">
          <div className="relative">
            <button
              onClick={() => setSwitcherOpen((v) => !v)}
              aria-expanded={switcherOpen}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition-colors hover:border-accent-400/40 cursor-pointer"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{biz.name}</p>
                <p className="text-[11px] text-slate-500">{biz.industry}</p>
              </div>
              <ChevronDown
                className={`size-4 shrink-0 text-slate-400 transition-transform ${switcherOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {switcherOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-white/12 bg-ink-800 shadow-2xl"
                >
                  {BUSINESSES.slice(0, 3).map((b, i) => (
                    <li key={b.id}>
                      <button
                        onClick={() => pickBiz(i)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors hover:bg-white/6 cursor-pointer ${
                          i === bizIndex ? 'bg-accent-400/10' : ''
                        }`}
                      >
                        <span className="text-sm font-medium text-slate-100">{b.name}</span>
                        <span className="text-[11px] text-slate-500">Workspace privado</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <nav className="mt-3 flex gap-1 overflow-x-auto slim-scroll md:flex-col md:overflow-visible" aria-label="Módulos del panel">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                  tab === t.id ? 'bg-accent-400/12 text-accent-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <t.icon className="size-4" strokeWidth={1.75} aria-hidden />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-h-[320px] p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${biz.id}-${tab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === 'ventas' && (
                <div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Stat label="Ventas del mes" value={formatCurrency(biz.monthSales)} hint="+8,4% vs mes anterior" />
                    <Stat label="Productos" value={biz.products} />
                    <Stat label="Usuarios activos" value={biz.users} />
                  </div>
                  <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                    <p className="mb-3 text-[11px] font-medium text-slate-500">Ventas de la semana</p>
                    <MiniBars values={biz.weekSales} animateKey={biz.id} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => toast(`Venta registrada en ${biz.name}. Stock y caja actualizados.`)}>
                      Nueva venta
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setTab('reportes')}>
                      Ver reporte
                    </Button>
                  </div>
                </div>
              )}

              {tab === 'caja' && (
                <div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    <Stat label="Estado" value={biz.cashOpen ? 'Abierta' : 'Cerrada'} />
                    <Stat label="Ingresos de hoy" value={formatCurrency(Math.round(biz.monthSales / 26))} />
                    <Stat label="Movimientos" value={biz.cashOpen ? 14 : 0} className="col-span-2 sm:col-span-1" />
                  </div>
                  <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                    <p className="mb-3 text-[11px] font-medium text-slate-500">Métodos de pago del mes</p>
                    <div className="space-y-2.5">
                      {biz.payMix.map((p) => (
                        <div key={p.method} className="flex items-center gap-3">
                          <span className="w-32 shrink-0 text-xs text-slate-300">{p.method}</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${p.pct}%` }}
                              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-blue-500"
                            />
                          </div>
                          <span className="w-10 text-right font-mono text-xs text-slate-400 tabular-nums">{p.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'stock' && (
                <div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Stat label="Productos" value={biz.products} />
                    <Stat label="En alerta" value={<span className="text-amber-300">{Math.max(2, Math.round(biz.products * 0.02))}</span>} />
                    <Stat label="Sin stock" value={1} />
                  </div>
                  <p className="mb-2 mt-4 text-[11px] font-medium text-slate-500">Reposición sugerida</p>
                  <div className="space-y-1.5">
                    {biz.topProducts.map((p) => (
                      <div key={p.name} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2">
                        <span className="text-xs text-slate-200">{p.name}</span>
                        <Badge tone="warning">Bajo stock</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'clientes' && (
                <div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Stat label="Clientes" value={Math.round(biz.products * 0.6)} />
                    <Stat label="Con cuenta corriente" value={Math.round(biz.users * 9)} />
                    <Stat label="Nuevos este mes" value={Math.round(biz.users * 4)} hint="+12%" />
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-slate-400">
                    Cada cliente de {biz.name} tiene su ficha con historial, deuda y notas. Los clientes de este negocio
                    no existen para ningún otro negocio de la plataforma.
                  </p>
                </div>
              )}

              {tab === 'reportes' && (
                <div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                    <p className="mb-3 text-[11px] font-medium text-slate-500">Más vendidos del mes</p>
                    <div className="space-y-2.5">
                      {biz.topProducts.map((p, i) => (
                        <div key={p.name} className="flex items-center gap-3">
                          <span className="flex-1 truncate text-xs text-slate-300">{p.name}</span>
                          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/6">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${100 - i * 22}%` }}
                              transition={{ duration: 0.6, delay: i * 0.08 }}
                              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-blue-500"
                            />
                          </div>
                          <span className="w-8 text-right font-mono text-xs text-slate-400 tabular-nums">{p.sold}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-4"
                    onClick={() => toast('Reporte completo simulado: en el producto real se abre el detalle.', 'info')}
                  >
                    Abrir reporte completo
                  </Button>
                </div>
              )}

              {tab === 'usuarios' && (
                <div>
                  <div className="space-y-1.5">
                    {Array.from({ length: Math.min(biz.users, 4) }).map((_, i) => {
                      const roles = ['Administrador', 'Cajero', 'Vendedor', 'Vendedor']
                      const names = ['Titular del negocio', 'Turno mañana', 'Turno tarde', 'Fin de semana']
                      return (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
                          <div>
                            <p className="text-xs font-medium text-slate-200">{names[i]}</p>
                            <p className="text-[11px] text-slate-500">{roles[i]}</p>
                          </div>
                          <Badge tone={i === 0 ? 'accent' : 'neutral'}>{i === 0 ? 'Acceso total' : 'Permisos limitados'}</Badge>
                        </div>
                      )
                    })}
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    {biz.users} usuarios activos en este negocio. Cada operación queda auditada con su autor.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/8 bg-ink-800/50 px-4 py-2.5">
        <p className="text-[11px] text-slate-500">
          Espacio privado de <span className="font-medium text-slate-300">{biz.name}</span>. Datos aislados por negocio.
        </p>
        <button
          onClick={() => openModal({ type: 'business' })}
          className="text-[11px] font-semibold text-accent-300 hover:text-accent-400 cursor-pointer"
        >
          Quiero un panel así para mi negocio
        </button>
      </div>
    </WindowFrame>
  )
}
