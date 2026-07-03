import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { MiniBars, Stat } from '../mockups/shared'
import { Badge } from '../ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'
import { cn } from '../../utils/cn'

const DEVICES = [
  {
    id: 'pc',
    icon: Monitor,
    label: 'PC del mostrador',
    role: 'POS para el vendedor',
    text: 'El punto de venta instalado como app en la computadora del local: pantalla completa, acceso directo y venta rápida.',
  },
  {
    id: 'tablet',
    icon: Tablet,
    label: 'Tablet del salón',
    role: 'Panel para el encargado',
    text: 'El dashboard en la tablet: caja, stock y ventas del día a mano, sin encerrarse en la oficina.',
  },
  {
    id: 'phone',
    icon: Smartphone,
    label: 'Celular del dueño',
    role: 'Reportes desde cualquier lado',
    text: 'Los números del negocio en el bolsillo: ventas, caja y alertas de stock estés donde estés.',
  },
]

export function PWASection() {
  const [device, setDevice] = useState(0)
  const d = DEVICES[device]

  return (
    <Section>
      <SectionHeader
        title="Usalo desde PC, tablet o celular, como una app"
        lead="La plataforma es una PWA instalable: sin descargas de tienda, sin servidores propios, pensada para el flujo real de un local físico."
      />

      <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-3">
            {DEVICES.map((dev, i) => (
              <button
                key={dev.id}
                onClick={() => setDevice(i)}
                className={cn(
                  'flex items-start gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer',
                  device === i
                    ? 'border-accent-400/40 bg-accent-400/[0.06]'
                    : 'border-white/8 bg-white/[0.02] hover:border-white/15',
                )}
              >
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl',
                    device === i ? 'bg-accent-400/15' : 'bg-white/[0.05]',
                  )}
                >
                  <dev.icon className={cn('size-5', device === i ? 'text-accent-300' : 'text-slate-400')} strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className={cn('block text-sm font-semibold', device === i ? 'text-white' : 'text-slate-300')}>
                    {dev.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">{dev.role}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={d.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={cn(
                  'mx-auto overflow-hidden rounded-2xl border border-white/12 bg-ink-900 shadow-2xl',
                  d.id === 'pc' && 'aspect-video max-w-md',
                  d.id === 'tablet' && 'aspect-[4/3] max-w-sm',
                  d.id === 'phone' && 'aspect-[9/16] max-w-[220px]',
                )}
              >
                <div className="flex items-center justify-between border-b border-white/8 bg-ink-800/70 px-3 py-2">
                  <span className="text-[10px] text-slate-500">{d.label}</span>
                  <Badge tone="success" className="!px-2 !py-0.5 !text-[9px]">
                    PWA instalada
                  </Badge>
                </div>
                <div className="p-3">
                  <div className={cn('grid gap-2', d.id === 'phone' ? 'grid-cols-1' : 'grid-cols-2')}>
                    <Stat label="Ventas de hoy" value={formatCurrency(187300)} />
                    {d.id !== 'phone' && <Stat label="Caja" value="Abierta" />}
                  </div>
                  <div className="mt-2 rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
                    <p className="mb-2 text-[10px] text-slate-500">Semana</p>
                    <MiniBars values={[40, 62, 51, 78, 70, 95, 66]} className="h-12" animateKey={d.id} />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-sm leading-relaxed text-slate-400">{d.text}</p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  )
}
