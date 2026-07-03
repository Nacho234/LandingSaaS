# IF POS - Landing SaaS multitenant para comercios

Landing comercial de un SaaS de gestión y ventas para comercios (POS, caja, stock, clientes y reportes).
100% frontend, en modo demo: sin backend, sin pagos reales, sin integraciones activas.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción
```

## Cambiar el nombre del producto

Todo sale de `src/config/brand.ts`:

```ts
export const BRAND = {
  product: 'IF POS',        // ← cambiá acá (IF Commerce, IF Ventas, etc.)
  company: 'IF SOFTWARE',
  ...
}
```

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (animaciones, scroll reveals, contadores)
- lucide-react (íconos) · clsx
- React Hook Form + Zod (formularios con validación)
- localStorage para leads y negocios demo simulados

## Estructura

```
src/
  config/brand.ts        Nombre del producto y datos de marca
  data/                  Planes, features, rubros, FAQs, testimonios, negocios demo
  utils/                 cn, formato moneda, storage de leads, recomendador de plan
  hooks/                 useActiveSection
  app/providers.tsx      Contexto global: toasts + modales
  components/
    ui/                  Button, Badge, Modal, Toaster, Field, Accordion, Section
    effects/             Reveal, Counter, Marquee, ScrollProgress, Glow, Tilt
    layout/              Navbar, Footer, acciones flotantes
    mockups/             Dashboard, POS, Caja, Stock, Clientes, Reportes, Terminal
    landing/             Las ~23 secciones de la página
    modals/ModalRoot.tsx Plan, demo, alta de negocio, llamada, WhatsApp, leads
```

## Notas de la demo

- Los formularios guardan leads simulados en `localStorage` (`ifpos_demo_leads`).
- "Crear mi negocio" guarda negocios demo (`ifpos_demo_businesses`).
- Doble clic en el badge "Modo demo" del footer abre el visor de leads simulados.
- Todas las animaciones respetan `prefers-reduced-motion`.
