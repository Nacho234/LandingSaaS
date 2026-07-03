import { useState } from 'react'
import { WindowFrame, Stat, MiniBars } from './shared'
import { Button } from '../ui/Button'
import { useApp } from '../../app/providers'
import { formatCurrency } from '../../utils/formatCurrency'

const RANGES = {
  Hoy: { sales: 187300, ticket: 8940, count: 21, bars: [40, 65, 45, 80, 95, 70, 55] },
  Semana: { sales: 1243800, ticket: 9210, count: 135, bars: [55, 70, 62, 88, 81, 100, 74] },
  Mes: { sales: 4871200, ticket: 9480, count: 514, bars: [60, 72, 85, 78, 92, 88, 100] },
} as const

type RangeKey = keyof typeof RANGES

const TOP = [
  { name: 'Alimento premium 15kg', pct: 100 },
  { name: 'Piedras sanitarias', pct: 74 },
  { name: 'Snacks dentales', pct: 58 },
]

export function ReportsMockup() {
  const { toast } = useApp()
  const [range, setRange] = useState<RangeKey>('Semana')
  const data = RANGES[range]

  return (
    <WindowFrame
      title="Reportes"
      badge={
        <div className="flex gap-1">
          {(Object.keys(RANGES) as RangeKey[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors cursor-pointer ${
                range === r ? 'bg-accent-400/15 text-accent-300' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2.5">
          <Stat label="Ventas" value={formatCurrency(data.sales)} />
          <Stat label="Ticket promedio" value={formatCurrency(data.ticket)} />
          <Stat label="Operaciones" value={data.count} />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <p className="mb-3 text-[11px] font-medium text-slate-500">Evolución de ventas</p>
            <MiniBars values={[...data.bars]} animateKey={range} />
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <p className="mb-3 text-[11px] font-medium text-slate-500">Más vendidos</p>
            <div className="space-y-2.5">
              {TOP.map((t) => (
                <div key={t.name}>
                  <p className="mb-1 text-xs text-slate-300">{t.name}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 to-blue-500 transition-all duration-700"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end border-t border-white/8 pt-4">
          <Button size="sm" variant="secondary" onClick={() => toast('Exportación simulada: acá se descargaría el reporte.', 'info')}>
            Exportar reporte
          </Button>
        </div>
      </div>
    </WindowFrame>
  )
}
