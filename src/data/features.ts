import type { LucideIcon } from 'lucide-react'
import {
  ShoppingCart, Wallet, Package, Boxes, Users, Receipt, BarChart3, ShieldCheck,
  FileText, CreditCard, TrendingDown, Truck, ShoppingBag, Percent, MonitorSmartphone,
  Building2, GitBranch, Settings2,
} from 'lucide-react'

export interface Feature {
  id: string
  icon: LucideIcon
  title: string
  description: string
  benefits: string[]
  detail: string
  example: string
}

export const FEATURES: Feature[] = [
  {
    id: 'pos',
    icon: ShoppingCart,
    title: 'Punto de venta POS',
    description: 'Vendé rápido desde el mostrador: buscás, agregás al carrito y cobrás.',
    benefits: ['Búsqueda instantánea', 'Descuentos por venta', 'Múltiples métodos de pago'],
    detail:
      'El POS está pensado para el ritmo real de un mostrador: buscar producto, agregar al carrito, aplicar descuento si hace falta, elegir cliente y cobrar. Cada venta descuenta stock y registra el movimiento en caja automáticamente.',
    example: 'Un kiosco cobra una venta de 5 productos en menos de 20 segundos, con ticket visual incluido.',
  },
  {
    id: 'caja',
    icon: Wallet,
    title: 'Caja diaria',
    description: 'Apertura, cierre, ingresos, egresos y diferencia. Todo trazado.',
    benefits: ['Monto inicial y cierre con diferencia', 'Resumen por método de pago', 'Historial de cajas'],
    detail:
      'Abrís caja con un monto inicial, el sistema registra cada venta, ingreso, egreso y gasto. Al cerrar te muestra el total esperado, lo contado y la diferencia, separado por efectivo, transferencia, tarjeta y billeteras.',
    example: 'Al cierre del día ves que efectivo cuadra y que hubo una diferencia de $1.200 en tarjeta, con el detalle de qué operación la generó.',
  },
  {
    id: 'productos',
    icon: Package,
    title: 'Productos',
    description: 'Catálogo ordenado con categorías, precios, costos y códigos.',
    benefits: ['Categorías y variantes', 'Precio y costo por producto', 'Carga rápida masiva'],
    detail:
      'Cada negocio carga su propio catálogo: nombre, categoría, precio, costo, código de barras y stock mínimo. El catálogo de un negocio nunca se mezcla con el de otro.',
    example: 'Una tienda de ropa organiza 800 productos por categoría y talle, y encuentra cualquiera en segundos desde el POS.',
  },
  {
    id: 'stock',
    icon: Boxes,
    title: 'Stock',
    description: 'Inventario que se actualiza solo con cada venta y cada compra.',
    benefits: ['Alertas de stock bajo', 'Movimientos e historial', 'Ajustes manuales'],
    detail:
      'Cada venta descuenta stock en tiempo real. Los ingresos por compra lo suman. Definís stock mínimo por producto y el sistema te avisa antes de quedarte sin mercadería.',
    example: 'Un petshop recibe una alerta cuando el alimento más vendido baja de 10 unidades y repone antes del fin de semana.',
  },
  {
    id: 'clientes',
    icon: Users,
    title: 'Clientes',
    description: 'Historial de compras, datos de contacto y deuda pendiente.',
    benefits: ['Ficha completa por cliente', 'Historial de compras', 'Notas internas'],
    detail:
      'Cada cliente tiene su ficha con teléfono, email, historial de compras, total comprado y última visita. Ideal para clientes frecuentes y ventas con cuenta corriente.',
    example: 'Una distribuidora consulta la ficha de un cliente antes de entregarle un pedido y ve que tiene saldo pendiente.',
  },
  {
    id: 'ventas',
    icon: Receipt,
    title: 'Ventas',
    description: 'Registro completo de cada operación con su vendedor y su método de pago.',
    benefits: ['Detalle por venta', 'Filtros por fecha y vendedor', 'Comprobantes visuales'],
    detail:
      'Todas las ventas quedan registradas con productos, montos, descuentos, vendedor y método de pago. Podés filtrar por día, semana, mes o por usuario.',
    example: 'El dueño revisa desde el celular las ventas del sábado sin haber pisado el local.',
  },
  {
    id: 'reportes',
    icon: BarChart3,
    title: 'Reportes',
    description: 'Los números del negocio, claros: ventas, ticket promedio, top productos.',
    benefits: ['Ventas por período', 'Productos más vendidos', 'Métodos de pago'],
    detail:
      'Reportes simples que responden preguntas concretas: cuánto vendí, qué se vende más, cómo entra la plata y qué vendedor concreta más operaciones.',
    example: 'Una perfumería descubre que el 40% de sus ventas entra por transferencia y ajusta su operatoria de caja.',
  },
  {
    id: 'usuarios',
    icon: ShieldCheck,
    title: 'Usuarios y permisos',
    description: 'Cada persona con su acceso y su rol. Vendedor no ve lo que ve el dueño.',
    benefits: ['Roles por usuario', 'Acciones auditadas', 'Accesos revocables'],
    detail:
      'Sumás usuarios a tu negocio con roles: vendedor, cajero, administrador. Cada operación queda asociada a quien la hizo, y los permisos limitan qué puede ver y tocar cada uno.',
    example: 'Un negocio con 4 empleados sabe exactamente quién hizo cada descuento y quién cerró la caja.',
  },
  {
    id: 'comprobantes',
    icon: FileText,
    title: 'Comprobantes visuales',
    description: 'Ticket claro por cada venta, listo para compartir o imprimir.',
    benefits: ['Ticket por venta', 'Datos del negocio', 'Formato imprimible'],
    detail:
      'Cada venta genera un comprobante visual con el detalle de productos, totales y método de pago, con los datos de tu negocio.',
    example: 'El cliente pide el detalle de su compra y el vendedor se lo comparte en el momento.',
  },
  {
    id: 'ctacte',
    icon: CreditCard,
    title: 'Cuenta corriente',
    description: 'Fiado con control: deuda por cliente, pagos parciales y saldos claros.',
    benefits: ['Saldo por cliente', 'Registro de pagos', 'Historial de movimientos'],
    detail:
      'Para negocios que venden a cuenta: cada cliente tiene su saldo, registrás pagos parciales y el sistema mantiene el historial completo de movimientos.',
    example: 'Un almacén de barrio cobra $15.000 de una deuda de $42.000 y el saldo se actualiza al instante.',
  },
  {
    id: 'gastos',
    icon: TrendingDown,
    title: 'Gastos',
    description: 'Registrá los gastos del negocio y vinculalos a la caja del día.',
    benefits: ['Categorías de gasto', 'Impacto en caja', 'Historial mensual'],
    detail:
      'Los gastos del local (proveedores, servicios, compras menores) se registran con categoría y quedan reflejados en la caja y en los reportes.',
    example: 'El cierre de caja muestra $8.500 de gastos del día con su detalle, sin papeles sueltos.',
  },
  {
    id: 'proveedores',
    icon: Truck,
    title: 'Proveedores',
    description: 'Agenda de proveedores con historial de compras asociado.',
    benefits: ['Ficha por proveedor', 'Compras vinculadas', 'Datos de contacto'],
    detail: 'Cada proveedor tiene su ficha y su historial de compras, para saber a quién le compraste qué y cuándo.',
    example: 'Antes de reponer, la ferretería revisa a qué proveedor le compró ese lote y a qué precio.',
  },
  {
    id: 'compras',
    icon: ShoppingBag,
    title: 'Compras',
    description: 'Ingresos de mercadería que actualizan stock y costos.',
    benefits: ['Ingreso por compra', 'Actualiza stock', 'Costo por lote'],
    detail: 'Registrás la compra a un proveedor y el stock se actualiza solo, con el costo de cada ingreso.',
    example: 'Llegan 200 unidades del distribuidor: una sola carga y todo el inventario queda al día.',
  },
  {
    id: 'promos',
    icon: Percent,
    title: 'Promociones',
    description: 'Descuentos y promos aplicables directo desde el POS.',
    benefits: ['Descuentos por producto', 'Promos por período', 'Aplicación en un toque'],
    detail: 'Definís promociones y descuentos, y el vendedor los aplica desde el POS sin calculadora ni errores.',
    example: 'La tienda lanza 20% en la línea de invierno y el POS lo aplica automáticamente toda la semana.',
  },
  {
    id: 'pwa',
    icon: MonitorSmartphone,
    title: 'PWA instalable',
    description: 'Se instala como app en PC, tablet y celular. Sin descargas de tienda.',
    benefits: ['Acceso directo tipo app', 'Interfaz responsive', 'Ideal para mostrador'],
    detail:
      'La plataforma funciona como una PWA: la instalás en la compu del mostrador, en la tablet o en tu celular, y se siente como una app nativa.',
    example: 'El local tiene el POS instalado en la PC del mostrador y el dueño mira reportes desde su celular.',
  },
  {
    id: 'multinegocio',
    icon: Building2,
    title: 'Multi-negocio',
    description: 'Muchos negocios en la misma plataforma, cada uno con su espacio privado.',
    benefits: ['Datos aislados por negocio', 'Configuración propia', 'Escala sin fricción'],
    detail:
      'La plataforma es multitenant: cada negocio que se registra tiene su propio espacio con sus productos, ventas, usuarios y reportes. Nada se mezcla entre negocios.',
    example: 'Un petshop y un kiosco usan el mismo sistema al mismo tiempo, sin ver jamás datos del otro.',
  },
  {
    id: 'sucursales',
    icon: GitBranch,
    title: 'Multi-sucursal preparado',
    description: 'Arquitectura pensada para crecer a más de un local.',
    benefits: ['Estructura preparada', 'Visión por sucursal', 'Escala por etapas'],
    detail:
      'La arquitectura está preparada para operar varias sucursales dentro del mismo negocio, con stock y cajas diferenciadas según el plan.',
    example: 'Una cadena de 3 locales planifica su expansión sabiendo que el sistema acompaña.',
  },
  {
    id: 'config',
    icon: Settings2,
    title: 'Configuración por negocio',
    description: 'Cada negocio ajusta el sistema a su forma de trabajar.',
    benefits: ['Datos y logo propios', 'Preferencias de venta', 'Ajustes por rubro'],
    detail: 'Nombre, logo, métodos de pago habilitados, preferencias del POS: cada negocio configura su espacio.',
    example: 'La perfumería habilita transferencia y billeteras, el kiosco trabaja solo con efectivo y tarjeta.',
  },
]
