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

// Geometría del diagrama (viewBox 100x100)
const CENTER = 50
const NODE_R = 42 // radio donde se ubican los nodos
const CORE_EDGE = 16 // dónde arranca la línea (borde del núcleo)
const NODE_EDGE = 34 // dónde termina la línea (borde del nodo)

function pointAt(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

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
            {/* Glow ambiental detrás del núcleo */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)' }}
            />

            {/* Capa SVG: órbitas, radar, líneas y paquetes de datos */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="mt-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.18" />
                </linearGradient>
                <radialGradient id="mt-packet">
                  <stop offset="0%" stopColor="#a5f3fc" />
                  <stop offset="55%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </radialGradient>
                <filter id="mt-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="0.9" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Anillos de órbita que rotan lento en sentidos opuestos */}
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r="38"
                stroke="rgba(148,163,184,0.10)"
                strokeWidth="0.3"
                strokeDasharray="1 3"
                style={{ transformOrigin: '50px 50px' }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r="27"
                stroke="rgba(148,163,184,0.12)"
                strokeWidth="0.3"
                strokeDasharray="0.6 2.4"
                style={{ transformOrigin: '50px 50px' }}
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulsos tipo radar que salen del núcleo */}
              {!reduce &&
                [0, 1.6, 3.2].map((delay) => (
                  <motion.circle
                    key={delay}
                    cx={CENTER}
                    cy={CENTER}
                    stroke="#22d3ee"
                    strokeWidth="0.25"
                    fill="none"
                    style={{ transformOrigin: '50px 50px' }}
                    initial={{ opacity: 0 }}
                    animate={{ r: [14, 40], opacity: [0.5, 0], strokeWidth: [0.4, 0.1] }}
                    transition={{ duration: 4.8, delay, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}

              {/* Líneas de conexión núcleo -> nodo */}
              {TENANTS.map((t, i) => {
                const a = pointAt(t.angle, CORE_EDGE)
                const b = pointAt(t.angle, NODE_EDGE)
                return (
                  <motion.line
                    key={t.name}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#mt-line)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                  />
                )
              })}

              {/* Paquetes de datos viajando del núcleo hacia cada negocio */}
              {!reduce &&
                TENANTS.map((t, i) => {
                  const a = pointAt(t.angle, CORE_EDGE)
                  const b = pointAt(t.angle, NODE_EDGE)
                  return (
                    <motion.circle
                      key={`p-${t.name}`}
                      r="0.9"
                      fill="url(#mt-packet)"
                      filter="url(#mt-glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: [a.x, b.x],
                        cy: [a.y, b.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: 1 + i * 0.45,
                        repeat: Infinity,
                        repeatDelay: 1.4,
                        ease: 'easeInOut',
                      }}
                    />
                  )
                })}
            </svg>

            {/* Núcleo */}
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="glass relative flex flex-col items-center gap-1.5 rounded-2xl border border-accent-400/30 px-5 py-4 text-center shadow-[0_0_60px_-12px_rgba(34,211,238,0.45)]">
                {/* Halo cónico girando detrás del ícono */}
                <span className="relative grid size-10 place-items-center">
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-[-5px] rounded-xl opacity-70 blur-[2px]"
                      style={{
                        background:
                          'conic-gradient(from 0deg, transparent, rgba(34,211,238,0.55), transparent 55%, rgba(59,130,246,0.5), transparent)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 shadow-lg">
                    <Zap className="size-5 text-white" aria-hidden />
                  </span>
                </span>
                <p className="text-xs font-bold text-white">Plataforma SaaS</p>
                <p className="text-[10px] text-slate-400">Un solo sistema</p>
              </div>
            </motion.div>

            {/* Nodos de negocios flotando */}
            {TENANTS.map((t, i) => {
              const p = pointAt(t.angle, NODE_R)
              return (
                <motion.div
                  key={t.name}
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    className="group flex flex-col items-center gap-1 rounded-xl border border-white/12 bg-ink-800/95 px-3 py-2 text-center shadow-lg transition-colors hover:border-accent-400/40"
                  >
                    <p className="whitespace-nowrap text-[11px] font-semibold text-slate-100">{t.name}</p>
                    <span className="flex items-center gap-1 text-[9px] text-slate-500">
                      <span className="relative flex size-1.5">
                        {!reduce && (
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400/60" />
                        )}
                        <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
                      </span>
                      <Lock className="size-2.5 text-accent-400" aria-hidden /> Datos aislados
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
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
