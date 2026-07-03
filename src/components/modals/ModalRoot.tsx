import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Copy, CalendarDays, Clock, Building2, Inbox } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input, Select, Textarea } from '../ui/Field'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useApp } from '../../app/providers'
import { BRAND } from '../../config/brand'
import { PLANS, type Plan } from '../../data/plans'
import type { Feature } from '../../data/features'
import { saveLead, saveDemoBusiness, getLeads, getDemoBusinesses } from '../../utils/leadStorage'
import { formatCurrency } from '../../utils/formatCurrency'
import { cn } from '../../utils/cn'

const RUBROS = [
  'Petshop', 'Tienda de ropa', 'Kiosco', 'Minimarket', 'Perfumería / cosmética',
  'Distribuidora', 'Ferretería', 'Librería', 'Gimnasio', 'Otro',
].map((r) => ({ value: r, label: r }))

/* ---------- Suscripción a un plan ---------- */

const planSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().min(6, 'Ingresá un teléfono'),
  businessName: z.string().min(2, 'Ingresá el nombre del negocio'),
})

function PlanModalBody({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { toast } = useApp()
  const [done, setDone] = useState(false)
  const form = useForm<z.infer<typeof planSchema>>({ resolver: zodResolver(planSchema) })

  const submit = async (data: z.infer<typeof planSchema>) => {
    await new Promise((r) => setTimeout(r, 900))
    saveLead({ type: 'suscripcion', plan: plan.name, ...data })
    toast(`Solicitud del plan ${plan.name} registrada en modo demo.`)
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="size-12 text-emerald-400" aria-hidden />
        <h4 className="mt-4 text-lg font-bold text-white">Solicitud recibida</h4>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
          Te contactaremos para activar tu negocio dentro del sistema con el plan {plan.name}.
        </p>
        <Button className="mt-6" onClick={onClose}>
          Listo
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between rounded-xl border border-accent-400/25 bg-accent-400/[0.06] px-4 py-3">
        <div>
          <p className="text-sm font-bold text-white">Plan {plan.name}</p>
          <p className="text-xs text-slate-400">{plan.badge}</p>
        </div>
        <p className="font-mono text-lg font-bold text-accent-300 tabular-nums">
          {plan.monthly !== null ? `${formatCurrency(plan.monthly)}/mes` : 'A medida'}
        </p>
      </div>
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-4" noValidate>
        <Input label="Nombre" required error={form.formState.errors.name?.message} {...form.register('name')} />
        <Input label="Email" required type="email" error={form.formState.errors.email?.message} {...form.register('email')} />
        <Input label="Teléfono" required type="tel" error={form.formState.errors.phone?.message} {...form.register('phone')} />
        <Input label="Nombre del negocio" required error={form.formState.errors.businessName?.message} {...form.register('businessName')} />
        <Button type="submit" size="lg" loading={form.formState.isSubmitting}>
          {plan.cta}
        </Button>
        <p className="text-center text-xs text-slate-500">Modo demo: no se realiza ningún cobro real.</p>
      </form>
    </div>
  )
}

/* ---------- Pedir demo ---------- */

const demoSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  industry: z.string().min(1, 'Elegí un rubro'),
  message: z.string().optional(),
})

function DemoModalBody({ preset, onClose }: { preset?: string; onClose: () => void }) {
  const { toast } = useApp()
  const [done, setDone] = useState(false)
  const form = useForm<z.infer<typeof demoSchema>>({
    resolver: zodResolver(demoSchema),
    defaultValues: { message: preset ?? '' },
  })

  const submit = async (data: z.infer<typeof demoSchema>) => {
    await new Promise((r) => setTimeout(r, 900))
    saveLead({ type: 'demo', ...data })
    toast('Pedido de demo registrado en modo demo.')
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="size-12 text-emerald-400" aria-hidden />
        <h4 className="mt-4 text-lg font-bold text-white">Demo solicitada</h4>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
          Te contactaremos para coordinar un recorrido por el sistema enfocado en lo que necesitás ver.
        </p>
        <Button className="mt-6" onClick={onClose}>
          Listo
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="grid gap-4" noValidate>
      <Input label="Nombre" required error={form.formState.errors.name?.message} {...form.register('name')} />
      <Input label="Email" required type="email" error={form.formState.errors.email?.message} {...form.register('email')} />
      <Select label="Rubro" required options={RUBROS} placeholder="Elegí tu rubro" error={form.formState.errors.industry?.message} {...form.register('industry')} />
      <Textarea label="¿Qué te gustaría ver?" placeholder="POS, caja, stock, reportes..." {...form.register('message')} />
      <Button type="submit" size="lg" loading={form.formState.isSubmitting}>
        Pedir demo
      </Button>
    </form>
  )
}

/* ---------- Crear negocio demo ---------- */

const bizSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  businessName: z.string().min(2, 'Ingresá el nombre del negocio'),
  industry: z.string().min(1, 'Elegí un rubro'),
  plan: z.string().min(1, 'Elegí un plan'),
})

function BusinessModalBody({ presetPlan, onClose }: { presetPlan?: string; onClose: () => void }) {
  const { toast } = useApp()
  const [created, setCreated] = useState<string | null>(null)
  const form = useForm<z.infer<typeof bizSchema>>({
    resolver: zodResolver(bizSchema),
    defaultValues: { plan: presetPlan ?? 'Pro' },
  })

  const submit = async (data: z.infer<typeof bizSchema>) => {
    await new Promise((r) => setTimeout(r, 1100))
    saveDemoBusiness({ name: data.businessName, industry: data.industry, plan: data.plan, owner: data.name })
    saveLead({ type: 'negocio_demo', name: data.name, email: data.email, businessName: data.businessName, industry: data.industry, plan: data.plan })
    toast(`Negocio "${data.businessName}" creado en modo demo.`)
    setCreated(data.businessName)
  }

  if (created) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-blue-600 shadow-[0_8px_30px_-8px_rgba(6,182,212,0.6)]">
          <Building2 className="size-7 text-white" aria-hidden />
        </span>
        <h4 className="mt-4 text-lg font-bold text-white">{created} ya tiene su espacio</h4>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
          Tu negocio quedó creado en modo demo, con su workspace privado y sus datos aislados. En el producto real, acá
          empezarías a cargar productos y abrir tu primera caja.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge tone="success">Workspace listo</Badge>
          <Badge tone="accent">Datos aislados</Badge>
        </div>
        <Button className="mt-6" onClick={onClose}>
          Entendido
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="grid gap-4" noValidate>
      <Input label="Tu nombre" required error={form.formState.errors.name?.message} {...form.register('name')} />
      <Input label="Email" required type="email" error={form.formState.errors.email?.message} {...form.register('email')} />
      <Input label="Nombre del negocio" required placeholder="Ej: Petshop Luna" error={form.formState.errors.businessName?.message} {...form.register('businessName')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Rubro" required options={RUBROS} placeholder="Elegí tu rubro" error={form.formState.errors.industry?.message} {...form.register('industry')} />
        <Select
          label="Plan"
          required
          options={PLANS.map((p) => ({ value: p.name, label: p.name }))}
          error={form.formState.errors.plan?.message}
          {...form.register('plan')}
        />
      </div>
      <Button type="submit" size="lg" loading={form.formState.isSubmitting}>
        Crear negocio demo
      </Button>
      <p className="text-center text-xs text-slate-500">Simulación local: no se crean cuentas ni datos reales.</p>
    </form>
  )
}

/* ---------- Agendar llamada ---------- */

function CallModalBody({ onClose }: { onClose: () => void }) {
  const { toast } = useApp()
  const [day, setDay] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const days = useMemo(() => {
    const out: string[] = []
    const d = new Date()
    while (out.length < 5) {
      d.setDate(d.getDate() + 1)
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        out.push(d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }))
      }
    }
    return out
  }, [])

  const times = ['09:30', '11:00', '14:30', '16:00', '17:30']

  const confirm = () => {
    if (!day || !time) {
      toast('Elegí un día y un horario.', 'error')
      return
    }
    saveLead({ type: 'llamada', name: 'Llamada agendada', email: '', message: `${day} ${time}` })
    toast(`Llamada simulada agendada para el ${day} a las ${time}.`)
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 className="size-12 text-emerald-400" aria-hidden />
        <h4 className="mt-4 text-lg font-bold text-white">Llamada agendada</h4>
        <p className="mt-2 text-sm text-slate-300">
          {day} a las {time}. En el producto real esto se sincronizaría con un calendario.
        </p>
        <Button className="mt-6" onClick={onClose}>
          Listo
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
        <CalendarDays className="size-4 text-accent-400" aria-hidden /> Elegí un día
      </p>
      <div className="flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={cn(
              'rounded-xl border px-3.5 py-2 text-sm transition-colors cursor-pointer',
              day === d ? 'border-accent-400/50 bg-accent-400/12 text-accent-300' : 'border-white/10 text-slate-400 hover:text-slate-200',
            )}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="mb-2 mt-5 flex items-center gap-2 text-sm font-medium text-slate-200">
        <Clock className="size-4 text-accent-400" aria-hidden /> Elegí un horario
      </p>
      <div className="flex flex-wrap gap-2">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => setTime(t)}
            className={cn(
              'rounded-xl border px-3.5 py-2 font-mono text-sm tabular-nums transition-colors cursor-pointer',
              time === t ? 'border-accent-400/50 bg-accent-400/12 text-accent-300' : 'border-white/10 text-slate-400 hover:text-slate-200',
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <Button size="lg" className="mt-6 w-full" onClick={confirm}>
        Confirmar llamada
      </Button>
    </div>
  )
}

/* ---------- WhatsApp simulado ---------- */

function WhatsappModalBody() {
  const { toast } = useApp()
  const message = `Hola ${BRAND.company}. Quiero saber más sobre ${BRAND.product} para mi negocio. ¿Me cuentan cómo funciona y qué plan me conviene?`

  return (
    <div>
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
        <p className="text-xs font-medium text-emerald-300">Mensaje prearmado</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{message}</p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button
          variant="secondary"
          onClick={() => {
            navigator.clipboard?.writeText(message)
            toast('Mensaje copiado al portapapeles.')
          }}
        >
          <Copy className="size-4" aria-hidden />
          Copiar mensaje
        </Button>
        <Button onClick={() => toast('Acción simulada: acá se abriría WhatsApp con el mensaje prearmado.', 'info')}>
          Abrir WhatsApp
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Número placeholder: {BRAND.whatsappPlaceholder}. Sin conexión real en esta demo.
      </p>
    </div>
  )
}

/* ---------- Detalle de funcionalidad ---------- */

function FeatureModalBody({ feature, onTry }: { feature: Feature; onTry: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-400/15 to-blue-500/15">
          <feature.icon className="size-6 text-accent-300" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="text-sm text-slate-400">{feature.description}</p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">{feature.detail}</p>
      <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold text-accent-300">Ejemplo de uso</p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{feature.example}</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {feature.benefits.map((b) => (
          <li key={b}>
            <Badge tone="neutral">{b}</Badge>
          </li>
        ))}
      </ul>
      <Button size="lg" className="mt-6 w-full" onClick={onTry}>
        Quiero probar esta función
      </Button>
    </div>
  )
}

/* ---------- Leads simulados (modo demo oculto) ---------- */

function LeadsModalBody() {
  const leads = getLeads()
  const businesses = getDemoBusinesses()

  if (leads.length === 0 && businesses.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <Inbox className="size-10 text-slate-600" aria-hidden />
        <p className="mt-3 text-sm text-slate-400">Todavía no hay leads ni negocios demo guardados.</p>
        <p className="mt-1 text-xs text-slate-500">Completá un formulario o creá un negocio para verlos acá.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {businesses.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Negocios demo</p>
          <div className="space-y-2">
            {businesses.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <p className="text-xs text-slate-500">
                    {b.industry} · {b.owner}
                  </p>
                </div>
                <Badge tone="accent">Plan {b.plan}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
      {leads.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Leads</p>
          <div className="space-y-2">
            {leads.map((l) => (
              <div key={l.id} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{l.name}</p>
                  <Badge tone="neutral">{l.type}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {[l.email, l.plan && `Plan ${l.plan}`, l.industry].filter(Boolean).join(' · ')}
                </p>
                {l.message && <p className="mt-1 text-xs text-slate-400">{l.message}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Root ---------- */

export function ModalRoot() {
  const { modal, closeModal, openModal } = useApp()

  return (
    <>
      <Modal
        open={modal?.type === 'plan'}
        onClose={closeModal}
        title="Suscribirme"
        subtitle="Dejanos tus datos y activamos tu negocio con este plan."
      >
        {modal?.type === 'plan' && <PlanModalBody plan={modal.plan} onClose={closeModal} />}
      </Modal>

      <Modal
        open={modal?.type === 'demo'}
        onClose={closeModal}
        title="Pedir una demo"
        subtitle="Coordinamos un recorrido guiado por el sistema."
      >
        {modal?.type === 'demo' && <DemoModalBody preset={modal.preset} onClose={closeModal} />}
      </Modal>

      <Modal
        open={modal?.type === 'business'}
        onClose={closeModal}
        title="Crear mi negocio"
        subtitle="Simulá el alta de tu comercio dentro de la plataforma."
      >
        {modal?.type === 'business' && <BusinessModalBody presetPlan={modal.plan} onClose={closeModal} />}
      </Modal>

      <Modal
        open={modal?.type === 'call'}
        onClose={closeModal}
        title="Agendar una llamada"
        subtitle="Elegí día y horario. Agenda simulada, sin calendario real."
      >
        {modal?.type === 'call' && <CallModalBody onClose={closeModal} />}
      </Modal>

      <Modal open={modal?.type === 'whatsapp'} onClose={closeModal} title="Hablar por WhatsApp">
        {modal?.type === 'whatsapp' && <WhatsappModalBody />}
      </Modal>

      <Modal
        open={modal?.type === 'feature'}
        onClose={closeModal}
        title={modal?.type === 'feature' ? modal.feature.title : ''}
      >
        {modal?.type === 'feature' && (
          <FeatureModalBody feature={modal.feature} onTry={() => openModal({ type: 'demo', preset: `Quiero ver: ${modal.feature.title}` })} />
        )}
      </Modal>

      <Modal
        open={modal?.type === 'leads'}
        onClose={closeModal}
        title="Leads y negocios simulados"
        subtitle="Datos guardados localmente en este navegador (localStorage)."
        wide
      >
        {modal?.type === 'leads' && <LeadsModalBody />}
      </Modal>
    </>
  )
}
