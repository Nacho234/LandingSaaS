import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { WindowFrame, Stat } from './shared'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { formatCurrency } from '../../utils/formatCurrency'

const MOVES = [
  { label: 'Venta #1042', amount: 18400, in: true, method: 'Efectivo' },
  { label: 'Venta #1043', amount: 32700, in: true, method: 'Transferencia' },
  { label: 'Gasto: proveedor limpieza', amount: 8500, in: false, method: 'Efectivo' },
  { label: 'Venta #1044', amount: 12900, in: true, method: 'Tarjeta' },
]

export function CashMockup() {
  const { toast } = useApp()
  const [open, setOpen] = useState(true)

  const toggle = () => {
    if (open) {
      toast('Caja cerrada. Total esperado: $155.500. Diferencia: $0.')
    } else {
      toast('Caja abierta con monto inicial de $20.000.')
    }
    setOpen((v) => !v)
  }

  return (
    <WindowFrame
      title="Caja diaria"
      badge={open ? <Badge tone="success">Abierta</Badge> : <Badge tone="warning">Cerrada</Badge>}
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2.5">
          <Stat label="Monto inicial" value={formatCurrency(20000)} />
          <Stat label="Ingresos" value={formatCurrency(144000)} hint="+12 operaciones" />
          <Stat label="Egresos" value={formatCurrency(8500)} />
        </div>

        <p className="mb-2 mt-4 text-xs font-medium text-slate-500">Movimientos de hoy</p>
        <div className="space-y-1.5">
          {MOVES.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                {m.in ? (
                  <ArrowDownLeft className="size-4 text-emerald-400" aria-hidden />
                ) : (
                  <ArrowUpRight className="size-4 text-rose-400" aria-hidden />
                )}
                <div>
                  <p className="text-xs text-slate-200">{m.label}</p>
                  <p className="text-[11px] text-slate-500">{m.method}</p>
                </div>
              </div>
              <span
                className={`font-mono text-sm font-semibold tabular-nums ${m.in ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {m.in ? '+' : '-'}
                {formatCurrency(m.amount)}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <div>
            <p className="text-xs text-slate-500">Total en caja</p>
            <p className="font-mono text-xl font-bold text-white tabular-nums">{formatCurrency(155500)}</p>
          </div>
          <Button variant={open ? 'secondary' : 'primary'} onClick={toggle}>
            {open ? 'Simular cierre' : 'Simular apertura'}
          </Button>
        </div>
      </div>
    </WindowFrame>
  )
}
