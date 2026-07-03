export interface TenantBusiness {
  id: string
  name: string
  industry: string
  plan: string
  users: number
  monthSales: number
  products: number
  cashOpen: boolean
  topProducts: { name: string; sold: number }[]
  weekSales: number[]
  payMix: { method: string; pct: number }[]
}

export const BUSINESSES: TenantBusiness[] = [
  {
    id: 'petshop-luna',
    name: 'Petshop Luna',
    industry: 'Petshop',
    plan: 'Pro',
    users: 3,
    monthSales: 1284500,
    products: 412,
    cashOpen: true,
    topProducts: [
      { name: 'Alimento premium 15kg', sold: 47 },
      { name: 'Piedras sanitarias', sold: 39 },
      { name: 'Snacks dentales', sold: 31 },
    ],
    weekSales: [42, 58, 51, 74, 69, 92, 63],
    payMix: [
      { method: 'Efectivo', pct: 38 },
      { method: 'Transferencia', pct: 34 },
      { method: 'Tarjeta', pct: 28 },
    ],
  },
  {
    id: 'kiosco-centro',
    name: 'Kiosco Centro',
    industry: 'Kiosco',
    plan: 'Starter',
    users: 1,
    monthSales: 763200,
    products: 96,
    cashOpen: true,
    topProducts: [
      { name: 'Gaseosa 500ml', sold: 218 },
      { name: 'Alfajor triple', sold: 174 },
      { name: 'Cargador USB-C', sold: 42 },
    ],
    weekSales: [88, 75, 81, 96, 104, 121, 97],
    payMix: [
      { method: 'Efectivo', pct: 61 },
      { method: 'Billetera', pct: 24 },
      { method: 'Tarjeta', pct: 15 },
    ],
  },
  {
    id: 'tienda-norte',
    name: 'Tienda Norte',
    industry: 'Indumentaria',
    plan: 'Business',
    users: 6,
    monthSales: 2417800,
    products: 838,
    cashOpen: false,
    topProducts: [
      { name: 'Campera puffer', sold: 26 },
      { name: 'Jean recto', sold: 24 },
      { name: 'Buzo oversize', sold: 21 },
    ],
    weekSales: [31, 27, 35, 44, 52, 78, 61],
    payMix: [
      { method: 'Tarjeta', pct: 47 },
      { method: 'Transferencia', pct: 33 },
      { method: 'Efectivo', pct: 20 },
    ],
  },
  {
    id: 'perfumeria-bella',
    name: 'Perfumería Bella',
    industry: 'Cosmética',
    plan: 'Pro',
    users: 2,
    monthSales: 1092400,
    products: 267,
    cashOpen: true,
    topProducts: [
      { name: 'Crema facial', sold: 34 },
      { name: 'Perfume 100ml', sold: 22 },
      { name: 'Protector solar', sold: 19 },
    ],
    weekSales: [22, 31, 28, 39, 41, 57, 45],
    payMix: [
      { method: 'Transferencia', pct: 41 },
      { method: 'Tarjeta', pct: 37 },
      { method: 'Efectivo', pct: 22 },
    ],
  },
  {
    id: 'distribuidora-sur',
    name: 'Distribuidora Sur',
    industry: 'Distribuidora',
    plan: 'Business',
    users: 8,
    monthSales: 5831600,
    products: 1240,
    cashOpen: true,
    topProducts: [
      { name: 'Pack bebidas x12', sold: 132 },
      { name: 'Caja limpieza mixta', sold: 87 },
      { name: 'Papel x8 bulto', sold: 76 },
    ],
    weekSales: [64, 71, 83, 92, 88, 47, 12],
    payMix: [
      { method: 'Transferencia', pct: 58 },
      { method: 'Cuenta corriente', pct: 27 },
      { method: 'Efectivo', pct: 15 },
    ],
  },
  {
    id: 'ferreteria-roma',
    name: 'Ferretería Roma',
    industry: 'Ferretería',
    plan: 'Pro',
    users: 2,
    monthSales: 948700,
    products: 1580,
    cashOpen: false,
    topProducts: [
      { name: 'Tornillos x100', sold: 96 },
      { name: 'Cinta aisladora', sold: 71 },
      { name: 'Pintura látex 4L', sold: 18 },
    ],
    weekSales: [37, 42, 39, 48, 51, 66, 21],
    payMix: [
      { method: 'Efectivo', pct: 49 },
      { method: 'Tarjeta', pct: 29 },
      { method: 'Transferencia', pct: 22 },
    ],
  },
]

export const INDUSTRIES_MARQUEE = [
  'Petshops', 'Tiendas de ropa', 'Kioscos', 'Minimarkets', 'Perfumerías', 'Ferreterías',
  'Bazares', 'Distribuidoras', 'Salones de belleza', 'Cosmética', 'Librerías',
  'Tiendas con local físico', 'Emprendimientos', 'Comercios de barrio',
]
