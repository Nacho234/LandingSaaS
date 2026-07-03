import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useApp, type ToastKind } from '../../app/providers'

const icons: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const colors: Record<ToastKind, string> = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  info: 'text-accent-400',
}

export function Toaster() {
  const { toasts, dismissToast } = useApp()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[110] flex flex-col gap-2 sm:w-96"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.kind]
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto glass flex items-start gap-3 rounded-xl border border-white/12 px-4 py-3 shadow-xl"
            >
              <Icon className={`mt-0.5 size-5 shrink-0 ${colors[t.kind]}`} aria-hidden />
              <p className="flex-1 text-sm text-slate-200">{t.message}</p>
              <button
                onClick={() => dismissToast(t.id)}
                aria-label="Cerrar aviso"
                className="rounded p-0.5 text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
