/**
 * Configuración central de marca.
 * Cambiá el nombre del producto desde acá y se actualiza toda la landing.
 */
export const BRAND = {
  /** Nombre del producto SaaS (placeholder configurable) */
  product: 'IF POS',
  /** Empresa detrás del producto */
  company: 'IF SOFTWARE',
  tagline: 'SaaS para comercios',
  /** Contactos placeholder, sin integraciones reales */
  contactEmail: 'hola@ifsoftware.com.ar',
  whatsappPlaceholder: '+54 9 341 000 0000',
  location: 'Argentina',
} as const

export const STORAGE_KEYS = {
  leads: 'ifpos_demo_leads',
  businesses: 'ifpos_demo_businesses',
} as const
