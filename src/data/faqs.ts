export interface FAQ {
  q: string
  a: string
}

export const FAQS: FAQ[] = [
  {
    q: '¿Qué es exactamente este sistema?',
    a: 'Es una plataforma SaaS de gestión y ventas para comercios: punto de venta, caja, stock, clientes, usuarios y reportes en un solo lugar. Te suscribís a un plan mensual, creás tu negocio dentro de la plataforma y empezás a operar.',
  },
  {
    q: '¿Qué significa que sea multitenant?',
    a: 'Significa que muchos negocios usan la misma plataforma al mismo tiempo, pero cada uno tiene su propio espacio privado: sus productos, sus ventas, sus clientes y sus usuarios. Los datos de un negocio nunca se cruzan con los de otro.',
  },
  {
    q: '¿Mis datos se mezclan con los de otros negocios?',
    a: 'No. Cada negocio funciona como un espacio aislado dentro del sistema. Tus productos, ventas, clientes y reportes son tuyos y solo los ven los usuarios de tu negocio.',
  },
  {
    q: '¿Puedo crear mi propio negocio dentro del sistema?',
    a: 'Sí, ese es el flujo normal: te registrás, creás tu negocio con nombre y rubro, elegís un plan, cargás tus productos y empezás a vender.',
  },
  {
    q: '¿Sirve para un local físico?',
    a: 'Está pensado justamente para eso: el POS funciona en la PC o tablet del mostrador, la caja acompaña el día del local y el stock se descuenta con cada venta.',
  },
  {
    q: '¿Puedo usarlo desde el celular o la tablet?',
    a: 'Sí. La plataforma es responsive y se instala como PWA en cualquier dispositivo: PC para el mostrador, tablet para el salón y celular para mirar reportes desde donde estés.',
  },
  {
    q: '¿Puedo tener varios usuarios?',
    a: 'Sí, según el plan. Cada usuario tiene su acceso y su rol: vendedor, cajero o administrador. Las operaciones quedan asociadas a quien las hizo.',
  },
  {
    q: '¿Puedo abrir y cerrar caja?',
    a: 'Sí. Abrís caja con un monto inicial, el sistema registra ventas, ingresos, egresos y gastos, y al cerrar te muestra el resumen por método de pago y la diferencia.',
  },
  {
    q: '¿Puedo cambiar de plan más adelante?',
    a: 'Sí, los planes acompañan el crecimiento del negocio. Podés subir de plan cuando necesites más usuarios, más productos o funciones avanzadas.',
  },
  {
    q: '¿Puedo cancelar la suscripción?',
    a: 'Sí, la suscripción es mensual y podés darla de baja cuando quieras. No hay permanencia obligatoria.',
  },
  {
    q: '¿Puedo tener varias sucursales?',
    a: 'La arquitectura está preparada para multi-sucursal. En los planes Business y Enterprise se habilita según el alcance que necesites.',
  },
  {
    q: '¿Puedo integrar Mercado Pago o AFIP más adelante?',
    a: 'La plataforma está diseñada para incorporar integraciones como Mercado Pago, facturación y otras herramientas. Se habilitan según plan y etapa del producto.',
  },
  {
    q: '¿Necesito instalar algo?',
    a: 'No hace falta instalar nada especial: funciona desde el navegador y, si querés, la instalás como app (PWA) en un clic. Sin descargas de tienda ni servidores propios.',
  },
  {
    q: '¿Sirve tanto para negocios chicos como para comercios grandes?',
    a: 'Sí. Un kiosco con un solo usuario arranca con Starter, y un comercio con equipo, proveedores y más volumen opera con Business o Enterprise. El sistema escala por etapas.',
  },
]
