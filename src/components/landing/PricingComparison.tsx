import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { COMPARISON_ROWS, PLANS } from '../../data/plans'

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto size-4 text-emerald-400" aria-label="Incluido" />
  if (value === false) return <Minus className="mx-auto size-4 text-slate-600" aria-label="No incluido" />
  return <span className="text-xs text-slate-300">{value}</span>
}

export function PricingComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 overflow-hidden"
    >
      {/* Tabla en desktop */}
      <div className="card hidden overflow-x-auto p-2 md:block slim-scroll">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Funcionalidad</th>
              {PLANS.map((p) => (
                <th
                  key={p.id}
                  className={`px-4 py-3 text-center text-sm font-bold ${p.recommended ? 'text-accent-300' : 'text-white'}`}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                <td className="px-4 py-2.5 text-xs text-slate-300">{row.label}</td>
                {row.values.map((v, j) => (
                  <td key={j} className={`px-4 py-2.5 text-center ${PLANS[j].recommended ? 'bg-accent-400/[0.04]' : ''}`}>
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards comparativas en mobile */}
      <div className="grid gap-4 md:hidden">
        {PLANS.map((p, planIdx) => (
          <div key={p.id} className={`card p-4 ${p.recommended ? 'border-accent-400/40' : ''}`}>
            <p className={`mb-3 text-sm font-bold ${p.recommended ? 'text-accent-300' : 'text-white'}`}>{p.name}</p>
            <dl className="space-y-1.5">
              {COMPARISON_ROWS.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-slate-500">{row.label}</dt>
                  <dd className="text-right">
                    <Cell value={row.values[planIdx]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
