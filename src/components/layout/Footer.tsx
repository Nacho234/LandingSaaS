import { Zap, Mail, MessageCircle, MapPin } from 'lucide-react'
import { BRAND } from '../../config/brand'
import { useApp } from '../../app/providers'
import { Badge } from '../ui/Badge'

const NAV = [
  { id: 'funcionalidades', label: 'Funcionalidades' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'planes', label: 'Planes' },
  { id: 'rubros', label: 'Rubros' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'contacto', label: 'Contacto' },
]

const MODULES = ['POS', 'Caja', 'Stock', 'Clientes', 'Reportes', 'Usuarios']

export function Footer() {
  const { openModal, toast } = useApp()

  return (
    <footer className="relative border-t border-white/8 bg-ink-900/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-blue-600">
                <Zap className="size-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-bold text-white">{BRAND.product}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Un sistema de ventas completo para que cualquier negocio pueda operar desde una sola plataforma.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Un producto de <span className="font-semibold text-slate-300">{BRAND.company}</span>
            </p>
          </div>

          <nav aria-label="Secciones">
            <h4 className="text-sm font-semibold text-white">Secciones</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-300 cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold text-white">Módulos</h4>
            <ul className="mt-4 space-y-2.5">
              {MODULES.map((m) => (
                <li key={m}>
                  <button
                    onClick={() => document.getElementById('funcionalidades')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-300 cursor-pointer"
                  >
                    {m}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent-400" aria-hidden />
                {BRAND.contactEmail}
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="size-4 shrink-0 text-accent-400" aria-hidden />
                <button
                  onClick={() => openModal({ type: 'whatsapp' })}
                  className="hover:text-accent-300 cursor-pointer"
                >
                  WhatsApp comercial
                </button>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-accent-400" aria-hidden />
                {BRAND.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.company}. Todos los derechos reservados.
          </p>
          <button
            onDoubleClick={() => openModal({ type: 'leads' })}
            onClick={() => toast('Landing en modo demo: sin pagos ni integraciones reales. Doble clic para ver leads simulados.', 'info')}
            className="cursor-pointer"
            aria-label="Modo demo, doble clic para ver leads simulados"
          >
            <Badge tone="accent">Modo demo, sin integraciones reales</Badge>
          </button>
        </div>
      </div>
    </footer>
  )
}
