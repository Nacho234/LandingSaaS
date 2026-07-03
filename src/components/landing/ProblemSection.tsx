import { FileWarning, PackageX, Vault, UserX, MessagesSquare, EyeOff, SplitSquareHorizontal, CircleDollarSign } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem } from '../effects/Reveal'

const PROBLEMS = [
  { icon: FileWarning, title: 'Ventas anotadas en papel', text: 'Cuadernos, tickets sueltos y planillas que nadie actualiza.' },
  { icon: PackageX, title: 'Stock desactualizado', text: 'Te enterás de que falta mercadería cuando el cliente la pide.' },
  { icon: Vault, title: 'Caja difícil de controlar', text: 'Sin apertura ni cierre claro, la diferencia aparece a fin de mes.' },
  { icon: UserX, title: 'Clientes sin historial', text: 'El fiado vive en la memoria y las deudas se pierden.' },
  { icon: MessagesSquare, title: 'Pedidos mezclados en WhatsApp', text: 'Ventas, consultas y reclamos en el mismo chat interminable.' },
  { icon: EyeOff, title: 'Cero visibilidad', text: 'No sabés qué producto se vende más ni cuánto entró por cada método de pago.' },
  { icon: SplitSquareHorizontal, title: 'Sin control por vendedor', text: 'Todos tocan la caja y nadie sabe quién hizo qué operación.' },
  { icon: CircleDollarSign, title: 'Crecer se vuelve difícil', text: 'Sin números claros, sumar gente o sucursales es apostar a ciegas.' },
]

export function ProblemSection() {
  return (
    <Section>
      <SectionHeader
        title="Muchos comercios venden todos los días, pero no tienen un sistema claro para controlar lo que pasa"
        lead="Tu negocio puede vender bien y aun así perder plata por desorden: caja sin control, stock a ojo y clientes sin registro."
      />
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map((p) => (
          <StaggerItem key={p.title}>
            <div className="card card-hover group h-full p-5">
              <span className="inline-grid size-10 place-items-center rounded-xl bg-rose-400/10 transition-colors group-hover:bg-rose-400/15">
                <p.icon className="size-5 text-rose-400" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{p.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
