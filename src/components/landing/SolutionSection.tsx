import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Package, Wallet, ShoppingCart, Boxes, Users, BarChart3 } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { cn } from '../../utils/cn'

const FLOW = [
  { icon: Building2, label: 'Negocio', detail: 'Creás tu espacio privado con nombre, rubro y configuración propia.' },
  { icon: Package, label: 'Productos', detail: 'Cargás tu catálogo con precios, costos, categorías y stock mínimo.' },
  { icon: Wallet, label: 'Caja', detail: 'Abrís la caja del día con monto inicial y todo queda trazado.' },
  { icon: ShoppingCart, label: 'Ventas', detail: 'Vendés desde el POS: rápido para el mostrador, completo por detrás.' },
  { icon: Boxes, label: 'Stock', detail: 'Cada venta descuenta inventario en tiempo real, con alertas de reposición.' },
  { icon: Users, label: 'Clientes', detail: 'Historial, deuda y cuenta corriente por cliente, siempre al día.' },
  { icon: BarChart3, label: 'Reportes', detail: 'Ves cuánto vendiste, qué se vende más y cómo entra la plata.' },
]

export function SolutionSection() {
  const [active, setActive] = useState(3)

  return (
    <Section className="bg-ink-900/30">
      <SectionHeader
        title="Todo el negocio, ordenado en un sistema simple y moderno"
        lead="Centralizá ventas, caja, productos, clientes y reportes en un flujo que cierra solo: simple para el vendedor, completo para el administrador."
      />

      <Reveal>
        <div className="relative">
          {/* Línea conectora animada */}
          <div aria-hidden className="absolute left-0 right-0 top-[34px] hidden h-px lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left bg-gradient-to-r from-accent-400/50 via-accent-400/25 to-blue-500/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {FLOW.map((f, i) => (
              <button
                key={f.label}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300 cursor-pointer',
                  active === i
                    ? 'border-accent-400/40 bg-accent-400/8 -translate-y-1'
                    : 'border-white/8 bg-white/[0.02] hover:border-white/15',
                )}
              >
                <span
                  className={cn(
                    'grid size-9 place-items-center rounded-xl transition-colors',
                    active === i ? 'bg-accent-400/20' : 'bg-white/[0.05]',
                  )}
                >
                  <f.icon
                    className={cn('size-4.5 transition-colors', active === i ? 'text-accent-300' : 'text-slate-400')}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <span className={cn('text-xs font-semibold', active === i ? 'text-white' : 'text-slate-400')}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4 text-center"
          >
            <p className="text-sm leading-relaxed text-slate-300">{FLOW[active].detail}</p>
          </motion.div>
        </div>
      </Reveal>
    </Section>
  )
}
