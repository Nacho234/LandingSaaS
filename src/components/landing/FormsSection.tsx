import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, ClipboardList, PlayCircle } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { Input, Select, Textarea } from '../ui/Field'
import { Button } from '../ui/Button'
import { useApp } from '../../app/providers'
import { saveLead } from '../../utils/leadStorage'
import { PLANS } from '../../data/plans'
import { cn } from '../../utils/cn'

const RUBROS = [
  'Petshop', 'Tienda de ropa', 'Kiosco', 'Minimarket', 'Perfumería / cosmética',
  'Distribuidora', 'Ferretería', 'Librería', 'Gimnasio', 'Otro',
].map((r) => ({ value: r, label: r }))

const subSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().min(6, 'Ingresá un teléfono de contacto'),
  businessName: z.string().min(2, 'Ingresá el nombre de tu negocio'),
  industry: z.string().min(1, 'Elegí un rubro'),
  plan: z.string().min(1, 'Elegí un plan'),
  users: z.string().optional(),
  products: z.string().optional(),
  branches: z.string().optional(),
  contactPref: z.string().optional(),
  message: z.string().optional(),
})
type SubForm = z.infer<typeof subSchema>

const demoSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().min(6, 'Ingresá un teléfono de contacto'),
  industry: z.string().min(1, 'Elegí un rubro'),
  users: z.string().optional(),
  products: z.string().optional(),
  message: z.string().optional(),
})
type DemoForm = z.infer<typeof demoSchema>

const QUICK = ['Quiero ver el POS', 'Quiero ver la caja', 'Quiero ver el stock', 'Quiero ver los reportes', 'Quiero saber qué plan necesito']

function SuccessPanel({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.05] p-10 text-center"
    >
      <CheckCircle2 className="size-12 text-emerald-400" aria-hidden />
      <h3 className="mt-4 text-xl font-bold text-white">Solicitud recibida</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">{text}</p>
      <Button variant="secondary" className="mt-6" onClick={onReset}>
        Enviar otra solicitud
      </Button>
    </motion.div>
  )
}

export function FormsSection() {
  const { toast } = useApp()
  const [tab, setTab] = useState<'sub' | 'demo'>('sub')
  const [subDone, setSubDone] = useState(false)
  const [demoDone, setDemoDone] = useState(false)

  const sub = useForm<SubForm>({ resolver: zodResolver(subSchema) })
  const demo = useForm<DemoForm>({ resolver: zodResolver(demoSchema) })

  // Si otro componente eligió un plan, lo precargamos al llegar acá
  useEffect(() => {
    const handler = (e: Event) => {
      const planName = (e as CustomEvent<string>).detail
      setTab('sub')
      sub.setValue('plan', planName)
    }
    window.addEventListener('prefill-plan', handler)
    return () => window.removeEventListener('prefill-plan', handler)
  }, [sub])

  const submitSub = async (data: SubForm) => {
    await new Promise((r) => setTimeout(r, 900))
    saveLead({ type: 'suscripcion', ...data })
    toast('Solicitud de suscripción registrada en modo demo.')
    setSubDone(true)
    sub.reset()
  }

  const submitDemo = async (data: DemoForm) => {
    await new Promise((r) => setTimeout(r, 900))
    saveLead({ type: 'demo', ...data })
    toast('Pedido de demo registrado en modo demo.')
    setDemoDone(true)
    demo.reset()
  }

  return (
    <Section id="contacto">
      <SectionHeader
        eyebrow="Empezá hoy"
        title="Activá tu negocio dentro de la plataforma"
        lead="Contanos qué necesitás y te contactamos para dejar tu espacio funcionando. Sin pagos reales en esta demo."
      />

      <Reveal className="mx-auto max-w-3xl">
        <div className="mb-6 grid grid-cols-2 gap-2" role="tablist" aria-label="Tipo de solicitud">
          <button
            role="tab"
            aria-selected={tab === 'sub'}
            onClick={() => setTab('sub')}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all cursor-pointer',
              tab === 'sub'
                ? 'border-accent-400/50 bg-accent-400/10 text-accent-300'
                : 'border-white/10 text-slate-400 hover:text-slate-200',
            )}
          >
            <ClipboardList className="size-4" aria-hidden />
            Quiero suscribirme
          </button>
          <button
            role="tab"
            aria-selected={tab === 'demo'}
            onClick={() => setTab('demo')}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all cursor-pointer',
              tab === 'demo'
                ? 'border-accent-400/50 bg-accent-400/10 text-accent-300'
                : 'border-white/10 text-slate-400 hover:text-slate-200',
            )}
          >
            <PlayCircle className="size-4" aria-hidden />
            Quiero una demo
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'sub' ? (
            <motion.div key="sub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {subDone ? (
                <SuccessPanel
                  text="Te contactaremos para activar tu negocio dentro del sistema y dejar todo configurado con tu plan."
                  onReset={() => setSubDone(false)}
                />
              ) : (
                <form onSubmit={sub.handleSubmit(submitSub)} className="card grid gap-4 p-6 sm:grid-cols-2" noValidate>
                  <Input label="Nombre" required placeholder="Tu nombre" error={sub.formState.errors.name?.message} {...sub.register('name')} />
                  <Input label="Email" required type="email" autoComplete="email" placeholder="tu@email.com" error={sub.formState.errors.email?.message} {...sub.register('email')} />
                  <Input label="Teléfono" required type="tel" autoComplete="tel" placeholder="+54 9 ..." error={sub.formState.errors.phone?.message} {...sub.register('phone')} />
                  <Input label="Nombre del negocio" required placeholder="Mi comercio" error={sub.formState.errors.businessName?.message} {...sub.register('businessName')} />
                  <Select label="Rubro" required options={RUBROS} placeholder="Elegí tu rubro" error={sub.formState.errors.industry?.message} {...sub.register('industry')} />
                  <Select
                    label="Plan elegido"
                    required
                    options={PLANS.map((p) => ({ value: p.name, label: p.name }))}
                    placeholder="Elegí un plan"
                    error={sub.formState.errors.plan?.message}
                    {...sub.register('plan')}
                  />
                  <Select
                    label="Usuarios estimados"
                    options={['1', '2-3', '4-10', 'Más de 10'].map((v) => ({ value: v, label: v }))}
                    placeholder="Cantidad de usuarios"
                    {...sub.register('users')}
                  />
                  <Select
                    label="Productos estimados"
                    options={['Hasta 100', '100-1000', 'Más de 1000'].map((v) => ({ value: v, label: v }))}
                    placeholder="Cantidad de productos"
                    {...sub.register('products')}
                  />
                  <Select
                    label="¿Tenés sucursales?"
                    options={['No', 'Sí, 2', 'Sí, 3 o más'].map((v) => ({ value: v, label: v }))}
                    placeholder="Elegí una opción"
                    {...sub.register('branches')}
                  />
                  <Select
                    label="Preferencia de contacto"
                    options={['WhatsApp', 'Email', 'Llamada'].map((v) => ({ value: v, label: v }))}
                    placeholder="¿Cómo te contactamos?"
                    {...sub.register('contactPref')}
                  />
                  <div className="sm:col-span-2">
                    <Textarea
                      label="¿Qué necesitás controlar?"
                      hint="Opcional, pero nos ayuda a preparar tu espacio: caja, stock, fiado, sucursales..."
                      placeholder="Contanos brevemente cómo trabaja tu negocio"
                      {...sub.register('message')}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full" loading={sub.formState.isSubmitting}>
                      Enviar solicitud de suscripción
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div key="demo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {demoDone ? (
                <SuccessPanel
                  text="Te contactaremos para coordinar la demo con las partes del sistema que quieras ver."
                  onReset={() => setDemoDone(false)}
                />
              ) : (
                <form onSubmit={demo.handleSubmit(submitDemo)} className="card grid gap-4 p-6 sm:grid-cols-2" noValidate>
                  <div className="sm:col-span-2">
                    <p className="mb-2 text-sm font-medium text-slate-200">Accesos rápidos</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => demo.setValue('message', q)}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-accent-400/40 hover:text-accent-300 cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input label="Nombre" required placeholder="Tu nombre" error={demo.formState.errors.name?.message} {...demo.register('name')} />
                  <Input label="Email" required type="email" autoComplete="email" placeholder="tu@email.com" error={demo.formState.errors.email?.message} {...demo.register('email')} />
                  <Input label="Teléfono" required type="tel" autoComplete="tel" placeholder="+54 9 ..." error={demo.formState.errors.phone?.message} {...demo.register('phone')} />
                  <Select label="Rubro" required options={RUBROS} placeholder="Elegí tu rubro" error={demo.formState.errors.industry?.message} {...demo.register('industry')} />
                  <Select
                    label="Usuarios estimados"
                    options={['1', '2-3', '4-10', 'Más de 10'].map((v) => ({ value: v, label: v }))}
                    placeholder="Cantidad de usuarios"
                    {...demo.register('users')}
                  />
                  <Select
                    label="Productos estimados"
                    options={['Hasta 100', '100-1000', 'Más de 1000'].map((v) => ({ value: v, label: v }))}
                    placeholder="Cantidad de productos"
                    {...demo.register('products')}
                  />
                  <div className="sm:col-span-2">
                    <Textarea label="¿Qué te gustaría ver?" placeholder="POS, caja, stock, reportes..." {...demo.register('message')} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full" loading={demo.formState.isSubmitting}>
                      Pedir demo
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </Section>
  )
}
