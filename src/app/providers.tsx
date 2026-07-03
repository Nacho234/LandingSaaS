import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Plan } from '../data/plans'
import type { Feature } from '../data/features'

export type ToastKind = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  kind: ToastKind
  message: string
}

export type ModalState =
  | { type: 'plan'; plan: Plan }
  | { type: 'demo'; preset?: string }
  | { type: 'business'; plan?: string }
  | { type: 'call' }
  | { type: 'whatsapp' }
  | { type: 'feature'; feature: Feature }
  | { type: 'leads' }
  | null

interface AppContextValue {
  toasts: ToastItem[]
  toast: (message: string, kind?: ToastKind) => void
  dismissToast: (id: number) => void
  modal: ModalState
  openModal: (m: Exclude<ModalState, null>) => void
  closeModal: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

let toastSeq = 0

export function AppProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [modal, setModal] = useState<ModalState>(null)

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, kind: ToastKind = 'success') => {
      const id = ++toastSeq
      setToasts((prev) => [...prev.slice(-3), { id, kind, message }])
      window.setTimeout(() => dismissToast(id), 4200)
    },
    [dismissToast],
  )

  const openModal = useCallback((m: Exclude<ModalState, null>) => setModal(m), [])
  const closeModal = useCallback(() => setModal(null), [])

  const value = useMemo(
    () => ({ toasts, toast, dismissToast, modal, openModal, closeModal }),
    [toasts, toast, dismissToast, modal, openModal, closeModal],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}
