import { motion, useReducedMotion } from 'framer-motion'
import { Lock, Zap } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../effects/Reveal'
import { Badge } from '../ui/Badge'

const TENANTS = [
  { name: 'Petshop Luna', angle: -90 },
  { name: 'Tienda Norte', angle: -18 },
  { name: 'Kiosco Centro', angle: 54 },
  { name: 'Distribuidora Sur', angle: 126 },
  { name: 'Perfumería Bella', angle: 198 },
]

const POINTS = [
  'Cada negocio tiene su cuenta, sus usuarios y su configuración.',
  'Productos, ventas y clientes viven en el espacio de cada negocio.',
  'La caja y los reportes de un comercio no existen para otro.',
  'Los datos no se mezclan: el aislamiento es parte de la arquitectura.',
  'El sistema escala: se suman negocios sin tocar los existentes.',
]

export function MultitenantSection() {
  const reduce = useReducedMotion()

  return (
    <Section id="multitenant">
      <SectionHeader
        eyebrow="Plataforma multitenant"
        title="Un solo sistema, muchos negocios, datos separados"
        lead="Muchos comercios usan el mismo SaaS al mismo tiempo, pero cada uno opera en su propio espacio privado."
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Diagrama hub */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square max-w-md">
            {/* Anillos */}
            <div aria-hidden className="absolute inset-[12%] rounded-full border border-white/6" />
            <div aria-hidden className="absolute inset-[26%] rounded-full border border-white/8" />

            {/* Núcleo */}
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="glass flex flex-col items-center gap-1.5 rounded-2xl border border-accent-400/30 px-5 py-4 text-center shadow-[0_0_60px_-12px_rgba(34,211,238,0.4)]">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-blue-600">
                  <Zap className="size-5 text-white" aria-hidden />
                </span>
                <p className="text-xs font-bold text-white">Plataforma SaaS</p>
                <p className="text-[10px] text-slate-400">Un solo sistema</p>
              </div>
            </motion.div>

            {/* Tenants alrededor */}
            {TENANTS.map((t, i) => {
              const rad = (t.angle * Math.PI) / 180
              const x = 50 + 42 * Math.cos(rad)
              const y = 50 + 42 * Math.sin(rad)
              return (
                <motion.div
                  key={t.name}
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="flex flex-col items-center gap-1 rounded-xl border border-white/12 bg-ink-800/95 px-3 py-2 text-center shadow-lg">
                    <p className="whitespace-nowrap text-[11px] font-semibold text-slate-100">{t.name}</p>
                    <span className="flex items-center gap-1 text-[9px] text-slate-500">
                      <Lock className="size-2.5 text-accent-400" aria-hidden /> Datos aislados
                    </span>
                  </div>
                </motion.div>
              )
            })}

            {/* Líneas de conexión */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
              {TENANTS.map((t, i) => {
                const rad = (t.angle * Math.PI) / 180
                const x = 50 + 42 * Math.cos(rad)
                const y = 50 + 42 * Math.sin(rad)
                return (
                  <motion.line
                    key={t.name}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="url(#mt-grad)"
                    strokeWidth="0.35"
                    initial={reduce ? undefined : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                  />
                )
              })}
              <defs>
                <linearGradient id="mt-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Reveal>

        {/* Puntos */}
        <div className="order-1 lg:order-2">
          <Stagger className="space-y-3">
            {POINTS.map((p, i) => (
              <StaggerItem key={p}>
                <div className="card card-hover flex items-start gap-3.5 p-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-accent-400/12 font-mono text-[11px] font-bold text-accent-300">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">{p}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3} className="mt-6 flex flex-wrap gap-2">
            <Badge tone="accent">Workspace propio</Badge>
            <Badge tone="accent">Usuarios internos</Badge>
            <Badge tone="accent">Plan por negocio</Badge>
            <Badge tone="accent">Configuración independiente</Badge>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
