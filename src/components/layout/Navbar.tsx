import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { BRAND } from '../../config/brand'
import { useApp } from '../../app/providers'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const LINKS = [
  { id: 'funcionalidades', label: 'Funcionalidades' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'planes', label: 'Planes' },
  { id: 'rubros', label: 'Rubros' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'contacto', label: 'Contacto' },
]

export function Navbar() {
  const { openModal } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ids = useMemo(() => LINKS.map((l) => l.id), [])
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[80] transition-all duration-300',
        scrolled ? 'glass border-b border-white/8 shadow-lg shadow-ink-950/40' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5"
          aria-label={`${BRAND.product}, ir al inicio`}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-blue-600 shadow-[0_4px_20px_-4px_rgba(6,182,212,0.5)]">
            <Zap className="size-5 text-white" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-white">{BRAND.product}</span>
            <span className="text-[10px] font-medium text-slate-500">{BRAND.tagline}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={cn(
                'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                active === l.id ? 'text-white' : 'text-slate-400 hover:text-white',
              )}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="secondary" size="sm" onClick={() => openModal({ type: 'demo' })}>
            Pedir demo
          </Button>
          <Button size="sm" onClick={() => openModal({ type: 'business' })}>
            Crear mi negocio
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-white/8 lg:hidden cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden border-b border-white/8 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-xl px-4 py-3 text-left text-base font-medium text-slate-200 hover:bg-white/6 cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    setOpen(false)
                    openModal({ type: 'business' })
                  }}
                  size="lg"
                  className="w-full"
                >
                  Crear mi negocio
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setOpen(false)
                    openModal({ type: 'demo' })
                  }}
                >
                  Pedir demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
