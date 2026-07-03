import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { UserPlus, Building2, BadgeCheck, Package, Wallet, ShoppingCart, BarChart3 } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'

const STEPS = [
  { icon: UserPlus, title: 'Creá tu cuenta', text: 'Te registrás con tus datos o solicitás acceso a la plataforma.' },
  { icon: Building2, title: 'Creá tu negocio', text: 'Cargás nombre, rubro, logo y la configuración inicial de tu espacio.' },
  { icon: BadgeCheck, title: 'Elegí tu plan', text: 'Seleccionás el plan según el tamaño y las necesidades del negocio.' },
  { icon: Package, title: 'Cargá tus productos', text: 'Productos, categorías, precios y stock inicial. Podés arrancar con lo esencial.' },
  { icon: Wallet, title: 'Abrí la caja', text: 'Iniciás la caja del día con su monto inicial y todo queda trazado.' },
  { icon: ShoppingCart, title: 'Empezá a vender', text: 'Usás el POS, registrás ventas y generás comprobantes desde el mostrador.' },
  { icon: BarChart3, title: 'Mirá tus reportes', text: 'Controlás ventas, stock, caja y clientes con números claros.' },
]

export function OnboardingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 65%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <Section id="como-funciona" className="bg-ink-900/30">
      <SectionHeader
        eyebrow="Cómo funciona"
        title="De registrarte a vender, en minutos"
        lead="El alta de un negocio es un camino corto y guiado. Los tiempos dependen de cuántos productos cargues, pero el flujo siempre es este."
      />

      <div ref={ref} className="relative mx-auto max-w-2xl">
        {/* Línea que se dibuja con el scroll */}
        <div aria-hidden className="absolute left-[22px] top-2 bottom-2 w-px bg-white/8 md:left-1/2">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent-400 to-blue-500"
          />
        </div>

        <div className="space-y-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={0.05}>
              <div
                className={`relative flex items-start gap-5 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-10' : 'md:ml-auto md:flex-row-reverse md:pl-10 md:text-right'
                }`}
              >
                <span className="z-10 grid size-11 shrink-0 place-items-center rounded-xl border border-accent-400/30 bg-ink-800 shadow-[0_0_24px_-6px_rgba(34,211,238,0.35)]">
                  <s.icon className="size-5 text-accent-300" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="card card-hover flex-1 p-4">
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
