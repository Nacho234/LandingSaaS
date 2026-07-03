export interface CalculatorAnswers {
  users: string
  products: string
  branches: boolean
  currentAccount: boolean
  advancedReports: boolean
  integrations: boolean
}

export interface Recommendation {
  planId: 'starter' | 'pro' | 'business' | 'enterprise'
  reason: string
}

export function recommendPlan(a: CalculatorAnswers): Recommendation {
  if (a.integrations || (a.branches && a.users === '10+')) {
    return {
      planId: 'enterprise',
      reason:
        'Necesitás límites personalizados, varias sucursales o integraciones. Enterprise se configura a medida de tu operación.',
    }
  }
  if (a.branches || a.users === '4-10' || a.users === '10+' || a.products === '1000+') {
    return {
      planId: 'business',
      reason:
        'Con equipo de trabajo, mayor volumen de productos o más de una sucursal, Business te da usuarios con permisos, compras, proveedores y auditoría.',
    }
  }
  if (a.currentAccount || a.advancedReports || a.users === '2-3' || a.products === '100-1000') {
    return {
      planId: 'pro',
      reason:
        'Vendés todos los días y necesitás control operativo: cuenta corriente, gastos, promociones y reportes completos. Pro es el equilibrio justo.',
    }
  }
  return {
    planId: 'starter',
    reason:
      'Estás empezando a ordenar el negocio. Starter cubre POS, caja diaria, clientes y stock básico a un costo mínimo.',
  }
}
