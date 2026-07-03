export interface Plan {
  id: 'starter' | 'pro' | 'business' | 'enterprise'
  name: string
  badge: string
  monthly: number | null
  description: string
  features: string[]
  cta: string
  recommended?: boolean
}

export const ANNUAL_DISCOUNT = 0.15

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para empezar',
    monthly: 29000,
    description: 'Ideal para negocios chicos que quieren empezar a ordenar ventas, caja y productos.',
    features: [
      '1 negocio',
      '1 usuario',
      'Hasta 100 productos',
      'POS básico',
      'Caja diaria',
      'Clientes',
      'Stock básico',
      'Reportes básicos',
      'Soporte básico',
    ],
    cta: 'Empezar con Starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Más elegido',
    monthly: 59000,
    description: 'Para comercios que venden todos los días y necesitan más control operativo.',
    features: [
      '1 negocio',
      'Hasta 3 usuarios',
      'Hasta 1.000 productos',
      'POS completo',
      'Caja completa',
      'Stock avanzado',
      'Cuenta corriente',
      'Gastos y promociones',
      'Reportes completos',
      'Soporte prioritario',
    ],
    cta: 'Elegir Pro',
    recommended: true,
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Para crecer',
    monthly: 99000,
    description: 'Para negocios con equipo, mayor volumen o necesidad de control avanzado.',
    features: [
      '1 negocio',
      'Hasta 10 usuarios',
      'Productos sin límite práctico',
      'POS completo',
      'Caja avanzada',
      'Usuarios y permisos',
      'Proveedores y compras',
      'Auditoría de operaciones',
      'Multi-sucursal preparado',
      'Soporte prioritario',
    ],
    cta: 'Quiero Business',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'A medida',
    monthly: null,
    description: 'Para empresas o cadenas que necesitan límites personalizados e integraciones.',
    features: [
      'Usuarios personalizados',
      'Sucursales personalizadas',
      'Límites personalizados',
      'Integraciones preparadas',
      'Onboarding avanzado',
      'Seguridad avanzada',
      'Roadmap personalizado',
      'Soporte premium',
    ],
    cta: 'Hablar con un asesor',
  },
]

export const PRICE_DISCLAIMER =
  'Los valores son referenciales y pueden ajustarse según cantidad de usuarios, sucursales, integraciones y alcance.'

type CellValue = string | boolean

export interface ComparisonRow {
  label: string
  values: [CellValue, CellValue, CellValue, CellValue]
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { label: 'Negocios incluidos', values: ['1', '1', '1', 'Personalizado'] },
  { label: 'Usuarios', values: ['1', 'Hasta 3', 'Hasta 10', 'Personalizado'] },
  { label: 'Productos', values: ['100', '1.000', 'Sin límite práctico', 'Personalizado'] },
  { label: 'POS', values: ['Básico', 'Completo', 'Completo', 'Completo'] },
  { label: 'Caja', values: ['Diaria', 'Completa', 'Avanzada', 'Avanzada'] },
  { label: 'Stock', values: ['Básico', 'Avanzado', 'Avanzado', 'Avanzado'] },
  { label: 'Clientes', values: [true, true, true, true] },
  { label: 'Cuenta corriente', values: [false, true, true, true] },
  { label: 'Reportes', values: ['Básicos', 'Completos', 'Avanzados', 'Avanzados'] },
  { label: 'Gastos', values: [false, true, true, true] },
  { label: 'Proveedores y compras', values: [false, false, true, true] },
  { label: 'Promociones', values: [false, true, true, true] },
  { label: 'Usuarios y permisos', values: [false, false, true, true] },
  { label: 'Auditoría', values: [false, false, true, true] },
  { label: 'Multi-sucursal', values: [false, false, 'Preparado', 'Personalizado'] },
  { label: 'Integraciones', values: [false, false, 'Preparado', 'Según alcance'] },
  { label: 'PWA instalable', values: [true, true, true, true] },
  { label: 'Soporte', values: ['Básico', 'Prioritario', 'Prioritario', 'Premium'] },
  { label: 'Onboarding', values: ['Guías', 'Guías', 'Asistido', 'Avanzado'] },
]
