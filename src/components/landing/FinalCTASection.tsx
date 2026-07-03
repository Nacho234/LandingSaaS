import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { Button } from '../ui/Button'
import { useApp } from '../../app/providers'

export function FinalCTASection() {
  const { openModal } = useApp()
  const reduce = useReducedMotion()

  return (
    <Section className="overflow-hidden">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent-400/25 px-6 py-16 text-center md:px-16 md:py-20">
          {/* Fondo animado */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10"
            animate={
              reduce
                ? undefined
                : {
                    background: [
                      'radial-gradient(ellipse 90% 80% at 20% 20%, rgba(6,182,212,0.14), rgba(5,8,15,0.9))',
                      'radial-gradient(ellipse 90% 80% at 80% 70%, rgba(59,130,246,0.14), rgba(5,8,15,0.9))',
                      'radial-gradient(ellipse 90% 80% at 20% 20%, rgba(6,182,212,0.14), rgba(5,8,15,0.9))',
                    ],
                  }
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={
              reduce
                ? { background: 'radial-gradient(ellipse 90% 80% at 50% 30%, rgba(6,182,212,0.12), rgba(5,8,15,0.9))' }
                : undefined
            }
          />
          <div aria-hidden className="tech-grid absolute inset-0 -z-10 opacity-60" />

          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.1]">
            Tu negocio puede <span className="text-gradient">vender mejor</span> desde hoy
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            Creá tu espacio dentro de la plataforma y empezá a ordenar ventas, caja, stock, clientes y reportes con un
            sistema moderno y simple de usar.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openModal({ type: 'business' })}>
              Crear mi negocio
            </Button>
            <Button size="lg" variant="secondary" onClick={() => openModal({ type: 'demo' })}>
              Pedir demo
            </Button>
            <Button size="lg" variant="ghost" onClick={() => openModal({ type: 'whatsapp' })}>
              <MessageCircle className="size-4" aria-hidden />
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
