import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { WindowFrame } from './shared'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { formatCurrency } from '../../utils/formatCurrency'

const PRODUCTS = [
  { id: 1, name: 'Alimento premium 3kg', price: 12800, stock: 24 },
  { id: 2, name: 'Snacks dentales', price: 3400, stock: 51 },
  { id: 3, name: 'Shampoo pelaje', price: 5900, stock: 17 },
  { id: 4, name: 'Juguete cuerda', price: 2700, stock: 33 },
]

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

export function POSMockup() {
  const { toast } = useApp()
  const [cart, setCart] = useState<CartItem[]>([{ id: 1, name: 'Alimento premium 3kg', price: 12800, qty: 1 }])
  const [method, setMethod] = useState('Efectivo')
  const [charging, setCharging] = useState(false)

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0)

  const add = (p: (typeof PRODUCTS)[number]) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id)
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }]
    })
  }

  const remove = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id))

  const charge = () => {
    if (cart.length === 0) {
      toast('Agregá al menos un producto al carrito.', 'error')
      return
    }
    setCharging(true)
    window.setTimeout(() => {
      setCharging(false)
      toast(`Venta registrada por ${formatCurrency(total)} (${method}). Stock descontado.`)
      setCart([])
    }, 900)
  }

  return (
    <WindowFrame title="Punto de venta" badge={<Badge tone="success">Caja abierta</Badge>}>
      <div className="grid gap-0 sm:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-white/8 p-4 sm:border-b-0 sm:border-r">
          <p className="mb-3 text-xs font-medium text-slate-500">Productos</p>
          <div className="grid grid-cols-2 gap-2.5">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => add(p)}
                className="group rounded-xl border border-white/8 bg-white/[0.03] p-3 text-left transition-all hover:border-accent-400/40 hover:bg-white/[0.06] cursor-pointer"
              >
                <p className="text-xs font-medium text-slate-200 leading-snug">{p.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white tabular-nums">
                    {formatCurrency(p.price)}
                  </span>
                  <Plus className="size-4 text-accent-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-4">
          <p className="mb-3 text-xs font-medium text-slate-500">Carrito</p>
          <div className="min-h-[96px] flex-1 space-y-2">
            <AnimatePresence initial={false}>
              {cart.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-600">
                  Tocá un producto para agregarlo.
                </motion.p>
              )}
              {cart.map((i) => (
                <motion.div
                  key={i.id}
                  layout
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs text-slate-200">{i.name}</p>
                    <p className="font-mono text-[11px] text-slate-500 tabular-nums">
                      {i.qty} x {formatCurrency(i.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    aria-label={`Quitar ${i.name}`}
                    className="text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-3 space-y-3 border-t border-white/8 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {['Efectivo', 'Transferencia', 'Tarjeta'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    method === m
                      ? 'border-accent-400/50 bg-accent-400/15 text-accent-300'
                      : 'border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Total</span>
              <span className="font-mono text-xl font-bold text-white tabular-nums">{formatCurrency(total)}</span>
            </div>
            <Button className="w-full" loading={charging} onClick={charge}>
              Cobrar
            </Button>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}
