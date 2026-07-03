export interface Integration {
  name: string
  description: string
  status: 'Preparado para integrar' | 'Futuro' | 'Según plan' | 'Personalizado'
}

export const INTEGRATIONS: Integration[] = [
  { name: 'Mercado Pago', description: 'Cobros con QR y links de pago desde el POS.', status: 'Preparado para integrar' },
  { name: 'AFIP', description: 'Facturación electrónica desde cada venta.', status: 'Según plan' },
  { name: 'WhatsApp', description: 'Envío de comprobantes y avisos a clientes.', status: 'Futuro' },
  { name: 'Impresoras térmicas', description: 'Tickets físicos directo desde el mostrador.', status: 'Preparado para integrar' },
  { name: 'Lectores de código de barras', description: 'Carga y venta escaneando productos.', status: 'Preparado para integrar' },
  { name: 'Stripe', description: 'Suscripciones y cobros internacionales.', status: 'Futuro' },
  { name: 'Email', description: 'Reportes y resúmenes automáticos por correo.', status: 'Futuro' },
  { name: 'Google OAuth', description: 'Ingreso a la plataforma con tu cuenta de Google.', status: 'Preparado para integrar' },
  { name: 'Analytics', description: 'Métricas avanzadas del comportamiento de venta.', status: 'Según plan' },
  { name: 'Cloudinary', description: 'Imágenes de productos optimizadas.', status: 'Preparado para integrar' },
  { name: 'APIs externas', description: 'Conectá el sistema con otras herramientas.', status: 'Personalizado' },
  { name: 'E-commerce', description: 'Sincronización de catálogo con tu tienda online.', status: 'Futuro' },
]
