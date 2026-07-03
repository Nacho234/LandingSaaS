import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useApp } from '../../app/providers'
import { Button } from '../ui/Button'

/** Botón flotante de WhatsApp simulado + CTA sticky inferior en mobile. */
export function FloatingActions() {
  const { openModal } = useApp()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 700))

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            onClick={() => openModal({ type: 'whatsapp' })}
            aria-label="Hablar por WhatsApp (simulado)"
            className="fixed bottom-20 right-4 z-[85] grid size-13 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_-6px_rgba(16,185,129,0.6)] transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6 cursor-pointer"
          >
            <MessageCircle className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass fixed inset-x-0 bottom-0 z-[84] border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
          >
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => openModal({ type: 'business' })}>
                Crear mi negocio
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => openModal({ type: 'demo' })}>
                Pedir demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
