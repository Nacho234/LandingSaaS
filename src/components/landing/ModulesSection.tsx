import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, Wallet, Boxes, Users, BarChart3, Check } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { POSMockup } from '../mockups/POSMockup'
import { CashMockup } from '../mockups/CashMockup'
import { StockMockup } from '../mockups/StockMockup'
import { CustomersMockup } from '../mockups/CustomersMockup'
import { ReportsMockup } from '../mockups/ReportsMockup'
import { cn } from '../../utils/cn'

const MODULES = [
  {
    id: 'pos',
    icon: ShoppingCart,
    label: 'POS',
    title: 'Vendé rápido desde un POS simple y moderno',
    points: [
      'Buscá productos y agregalos al carrito en segundos',
      'Aplicá descuentos y elegí cliente si hace falta',
      'Cobrá con el método de pago que corresponda',
      'El stock y la caja se actualizan solos con cada venta',
    ],
    mockup: <POSMockup />,
  },
  {
    id: 'caja',
    icon: Wallet,
    label: 'Caja',
    title: 'Controlá cada apertura, cierre y movimiento de caja',
    points: [
      'Apertura con monto inicial y cierre con diferencia',
      'Ingresos, egresos y gastos registrados en el momento',
      'Resumen por efectivo, transferencia, tarjeta y billeteras',
      'Historial completo de cajas anteriores',
    ],
    mockup: <CashMockup />,
  },
  {
    id: 'stock',
    icon: Boxes,
    label: 'Stock',
    title: 'Stock actualizado con cada venta',
    points: [
      'Cada venta descuenta inventario en tiempo real',
      'Stock mínimo por producto con alertas de reposición',
      'Movimientos, ingresos, egresos y ajustes trazados',
      'Compras a proveedores que suman stock solas',
    ],
    mockup: <StockMockup />,
  },
  {
    id: 'clientes',
    icon: Users,
    label: 'Clientes',
    title: 'Clientes organizados, historial claro y cuenta corriente',
    points: [
      'Ficha por cliente con contacto, notas y última compra',
      'Historial de compras completo',
      'Deuda pendiente y pagos parciales de cuenta corriente',
      'Total comprado para detectar a tus mejores clientes',
    ],
    mockup: <CustomersMockup />,
  },
  {
    id: 'reportes',
    icon: BarChart3,
    label: 'Reportes',
    title: 'Reportes simples para entender cómo va tu negocio',
    points: [
      'Ventas del día, la semana y el mes',
      'Ticket promedio y productos más vendidos',
      'Ingresos por método de pago y por vendedor',
      'Ganancia estimada y cierres de caja',
    ],
    mockup: <ReportsMockup />,
  },
]

export function ModulesSection() {
  const [active, setActive] = useState(0)
  const mod = MODULES[active]

  return (
    <Section>
      <SectionHeader
        title="Recorré los módulos del sistema"
        lead="Cada mockup es interactivo: tocá botones, simulá ventas, abrí y cerrá la caja."
      />

      <Reveal>
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Módulos del sistema">
          {MODULES.map((m, i) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer',
                active === i
                  ? 'border-accent-400/50 bg-accent-400/12 text-accent-300'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200',
              )}
            >
              <m.icon className="size-4" strokeWidth={1.75} aria-hidden />
              {m.label}
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{mod.title}</h3>
            <ul className="mt-6 space-y-3">
              {mod.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/12">
                    <Check className="size-3 text-emerald-400" aria-hidden />
                  </span>
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>{mod.mockup}</div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
