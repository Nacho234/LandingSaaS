import type { LucideIcon } from 'lucide-react'
import {
  PawPrint, Shirt, Store, ShoppingBasket, Sparkles, Truck, Dumbbell, Hammer,
} from 'lucide-react'

export interface Industry {
  id: string
  icon: LucideIcon
  name: string
  problem: string
  solution: string
  modules: string[]
  plan: string
  cta: string
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'petshop',
    icon: PawPrint,
    name: 'Petshops',
    problem: 'Stock de alimento y accesorios, ventas de mostrador y clientes frecuentes que compran fiado.',
    solution: 'POS rápido, stock con alertas de reposición, ficha de clientes y cuenta corriente para los habituales.',
    modules: ['POS', 'Stock', 'Clientes', 'Cuenta corriente', 'Reportes'],
    plan: 'Pro',
    cta: 'Quiero usarlo en mi petshop',
  },
  {
    id: 'ropa',
    icon: Shirt,
    name: 'Tiendas de ropa',
    problem: 'Productos por talle y color, temporadas, promociones y ventas diarias difíciles de seguir.',
    solution: 'Catálogo organizado por categoría, stock actualizado por venta, promos desde el POS y reportes por producto.',
    modules: ['Productos', 'Stock', 'Promociones', 'Caja', 'Reportes'],
    plan: 'Pro',
    cta: 'Quiero usarlo en mi tienda',
  },
  {
    id: 'kiosco',
    icon: Store,
    name: 'Kioscos',
    problem: 'Cientos de ventas chicas por día, mucho efectivo y cero registro de lo que pasa en la caja.',
    solution: 'POS ultra rápido, caja diaria con apertura y cierre, y reportes que muestran qué se vende de verdad.',
    modules: ['POS', 'Caja', 'Stock básico', 'Reportes'],
    plan: 'Starter',
    cta: 'Quiero usarlo en mi kiosco',
  },
  {
    id: 'minimarket',
    icon: ShoppingBasket,
    name: 'Minimarkets',
    problem: 'Mucho volumen de productos, reposición constante y varios empleados tocando la caja.',
    solution: 'Stock con mínimos y alertas, compras a proveedores, usuarios con permisos y cierres de caja por turno.',
    modules: ['Stock', 'Compras', 'Usuarios', 'Caja', 'Reportes'],
    plan: 'Business',
    cta: 'Quiero usarlo en mi minimarket',
  },
  {
    id: 'cosmetica',
    icon: Sparkles,
    name: 'Cosmética y perfumerías',
    problem: 'Clientas frecuentes, productos de rotación variada y promos que cambian todo el tiempo.',
    solution: 'Ficha de clientes con historial, promociones aplicables desde el POS y reportes de los más vendidos.',
    modules: ['Clientes', 'Promociones', 'POS', 'Reportes'],
    plan: 'Pro',
    cta: 'Quiero usarlo en mi perfumería',
  },
  {
    id: 'distribuidora',
    icon: Truck,
    name: 'Distribuidoras',
    problem: 'Pedidos grandes, cuenta corriente con comercios y un inventario que se mueve por bultos.',
    solution: 'Cuenta corriente por cliente, compras y proveedores, stock por volumen y equipo con permisos.',
    modules: ['Cuenta corriente', 'Proveedores', 'Compras', 'Usuarios', 'Reportes'],
    plan: 'Business',
    cta: 'Quiero usarlo en mi distribuidora',
  },
  {
    id: 'gimnasio',
    icon: Dumbbell,
    name: 'Gimnasios y estudios',
    problem: 'Cobros mensuales, venta de suplementos en recepción y clientes que pagan en fechas distintas.',
    solution: 'Clientes con historial de pagos, POS para el mostrador y reportes de ingresos por período.',
    modules: ['Clientes', 'POS', 'Caja', 'Reportes'],
    plan: 'Pro',
    cta: 'Quiero usarlo en mi gimnasio',
  },
  {
    id: 'ferreteria',
    icon: Hammer,
    name: 'Ferreterías',
    problem: 'Miles de artículos chicos, precios que cambian seguido y stock imposible de seguir a mano.',
    solution: 'Catálogo grande con búsqueda rápida, actualización de precios, stock con mínimos y compras a proveedores.',
    modules: ['Productos', 'Stock', 'Compras', 'POS', 'Reportes'],
    plan: 'Business',
    cta: 'Quiero usarlo en mi ferretería',
  },
]
