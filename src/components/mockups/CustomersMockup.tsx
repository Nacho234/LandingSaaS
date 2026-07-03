import { useState } from 'react'
import { WindowFrame, Stat } from './shared'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { formatCurrency } from '../../utils/formatCurrency'

const HISTORY = [
  { date: '28 jun', detail: 'Alimento premium 15kg + snacks', amount: 21300 },
  { date: '14 jun', detail: 'Piedras sanitarias x2', amount: 9800 },
  { date: '02 jun', detail: 'Compra a cuenta corriente', amount: 42000 },
]

export function CustomersMockup() {
  const { toast } = useApp()
  const [debt, setDebt] = useState(42000)
  const [paying, setPaying] = useState(false)

  const pay = () => {
    if (debt === 0) {
      toast('El cliente no tiene deuda pendiente.', 'info')
      return
    }
    setPaying(true)
    window.setTimeout(() => {
      setDebt((d) => Math.max(0, d - 15000))
      setPaying(false)
      toast('Pago de $15.000 registrado en cuenta corriente.')
    }, 800)
  }

  return (
    <WindowFrame
      title="Ficha de cliente"
      badge={debt > 0 ? <Badge tone="warning">Con deuda</Badge> : <Badge tone="success">Al día</Badge>}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-500/30 to-blue-500/30 font-semibold text-accent-300">
            RN
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Rocío Navarrete</p>
            <p className="text-xs text-slate-500">Cliente frecuente desde 2024</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <Stat label="Total comprado" value={formatCurrency(287400)} />
          <Stat label="Última compra" value="28 jun" />
          <Stat
            label="Deuda pendiente"
            value={<span className={debt > 0 ? 'text-amber-300' : 'text-emerald-400'}>{formatCurrency(debt)}</span>}
          />
        </div>

        <p className="mb-2 mt-4 text-xs font-medium text-slate-500">Historial reciente</p>
        <div className="space-y-1.5">
          {HISTORY.map((h) => (
            <div
              key={h.date}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2"
            >
              <div>
                <p className="text-xs text-slate-200">{h.detail}</p>
                <p className="text-[11px] text-slate-500">{h.date}</p>
              </div>
              <span className="font-mono text-sm text-slate-100 tabular-nums">{formatCurrency(h.amount)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-white/8 pt-4">
          <Button className="w-full" loading={paying} onClick={pay}>
            Registrar pago de {formatCurrency(15000)}
          </Button>
        </div>
      </div>
    </WindowFrame>
  )
}
