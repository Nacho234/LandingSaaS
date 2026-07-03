import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Wallet, TrendingUp, ShieldCheck } from 'lucide-react'
import { useApp } from '../../app/providers'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { GlowBackground } from '../effects/GlowBackground'
import { CodeTerminal } from '../mockups/CodeTerminal'
import { WindowFrame, Stat, MiniBars, Dot } from '../mockups/shared'
import { Counter } from '../effects/Counter'
import { formatCurrency } from '../../utils/formatCurrency'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export function HeroSection() {
  const { openModal } = useApp()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // Spotlight + parallax sutil que sigue al mouse (motion values, sin re-renders)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spotX = useSpring(useTransform(mx, [0, 1], ['20%', '80%']), { stiffness: 60, damping: 20 })
  const spotY = useSpring(useTransform(my, [0, 1], ['10%', '70%']), { stiffness: 60, damping: 20 })
  const parX = useSpring(useTransform(mx, [0, 1], [8, -8]), { stiffness: 60, damping: 20 })
  const parY = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 60, damping: 20 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16"
    >
      <GlowBackground grid />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(34,211,238,0.07), transparent 60%)`,
            ),
          }}
        />
      )}

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        {/* Copy */}
        <motion.div variants={containerVariants} initial={reduce ? false : 'hidden'} animate="show">
          <motion.div variants={itemVariants}>
            <Badge tone="accent">POS · Caja · Stock · Clientes · Reportes · Multi-negocio</Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl"
          >
            Un <span className="text-gradient">sistema de ventas completo</span> para manejar tu negocio
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Creá tu negocio en la plataforma y manejá ventas, caja, stock, clientes y reportes desde una PWA moderna.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openModal({ type: 'business' })}>
              Crear mi negocio
            </Button>
            <Button size="lg" variant="secondary" onClick={() => openModal({ type: 'demo' })}>
              Pedir demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden sm:block"
        >
          <motion.div style={reduce ? undefined : { x: parX, y: parY }} className="animate-float">
            <WindowFrame
              title="Panel · Petshop Luna"
              badge={
                <Badge tone="success">
                  <Dot /> Online
                </Badge>
              }
            >
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2.5">
                  <Stat
                    label="Ventas del mes"
                    value={<Counter to={1284500} format={(n) => formatCurrency(Math.round(n))} />}
                    hint="+128 operaciones"
                  />
                  <Stat label="Stock" value={<Counter to={412} />} hint="Actualizado" />
                  <Stat label="Usuarios" value={<Counter to={3} />} hint="Activos ahora" />
                </div>
                <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-medium text-slate-500">Ventas de la semana</p>
                    <Badge tone="accent">Plan Pro activo</Badge>
                  </div>
                  <MiniBars values={[42, 58, 51, 74, 69, 92, 63]} />
                </div>
              </div>
            </WindowFrame>
          </motion.div>

          {/* Cards flotantes */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-3 -top-8 xl:-right-8"
            style={reduce ? undefined : { x: parX, y: parY }}
          >
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/12 px-3.5 py-2.5 shadow-xl">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-400/15">
                <TrendingUp className="size-4 text-emerald-400" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">Venta registrada</p>
                <p className="font-mono text-[11px] text-emerald-400 tabular-nums">+$18.400</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 top-[58%] xl:-left-10"
          >
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/12 px-3.5 py-2.5 shadow-xl">
              <span className="grid size-8 place-items-center rounded-lg bg-accent-400/15">
                <Wallet className="size-4 text-accent-400" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">Caja abierta</p>
                <p className="text-[11px] text-slate-400">Sucursal Centro</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 -left-2 xl:-left-6"
          >
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/12 px-3.5 py-2.5 shadow-xl">
              <span className="grid size-8 place-items-center rounded-lg bg-blue-400/15">
                <ShieldCheck className="size-4 text-blue-400" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">Datos aislados por negocio</p>
                <p className="text-[11px] text-slate-400">Workspace privado</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-24 -right-2 hidden w-64 xl:block"
          >
            <CodeTerminal />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
