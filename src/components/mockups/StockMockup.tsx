import { useState } from 'react'
import { WindowFrame } from './shared'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'

interface Row {
  name: string
  category: string
  stock: number
  min: number
}

const INITIAL: Row[] = [
  { name: 'Alimento premium 15kg', category: 'Alimentos', stock: 8, min: 10 },
  { name: 'Piedras sanitarias 4kg', category: 'Higiene', stock: 26, min: 8 },
  { name: 'Snacks dentales', category: 'Alimentos', stock: 3, min: 6 },
  { name: 'Correa retráctil', category: 'Accesorios', stock: 14, min: 4 },
]

function stockBadge(r: Row) {
  if (r.stock === 0) return <Badge tone="warning">Sin stock</Badge>
  if (r.stock < r.min) return <Badge tone="warning">Bajo stock</Badge>
  return <Badge tone="success">OK</Badge>
}

export function StockMockup() {
  const { toast } = useApp()
  const [rows, setRows] = useState(INITIAL)

  const sell = () => {
    setRows((prev) => prev.map((r, i) => (i === 0 ? { ...r, stock: Math.max(0, r.stock - 1) } : r)))
    toast('Venta simulada: se descontó 1 unidad de "Alimento premium 15kg".', 'info')
  }

  const restock = () => {
    setRows((prev) => prev.map((r) => (r.stock < r.min ? { ...r, stock: r.stock + 12 } : r)))
    toast('Ingreso de stock registrado. Alertas de reposición resueltas.')
  }

  const lowCount = rows.filter((r) => r.stock < r.min).length

  return (
    <WindowFrame
      title="Inventario"
      badge={lowCount > 0 ? <Badge tone="warning">{lowCount} en alerta</Badge> : <Badge tone="success">Al día</Badge>}
    >
      <div className="p-4">
        <div className="overflow-x-auto slim-scroll">
          <table className="w-full min-w-[420px] text-left">
            <thead>
              <tr className="text-[11px] text-slate-500">
                <th className="pb-2 font-medium">Producto</th>
                <th className="pb-2 font-medium">Categoría</th>
                <th className="pb-2 font-medium text-right">Stock</th>
                <th className="pb-2 pl-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-white/6 text-sm">
                  <td className="py-2.5 pr-3 text-slate-200">{r.name}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{r.category}</td>
                  <td className="py-2.5 text-right font-mono text-slate-100 tabular-nums">{r.stock}</td>
                  <td className="py-2.5 pl-4">{stockBadge(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/8 pt-4">
          <Button size="sm" variant="secondary" onClick={sell}>
            Simular venta
          </Button>
          <Button size="sm" onClick={restock}>
            Simular ingreso de stock
          </Button>
        </div>
      </div>
    </WindowFrame>
  )
}
