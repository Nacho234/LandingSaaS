export interface Testimonial {
  name: string
  role: string
  business: string
  text: string
  rating: number
  initials: string
}

/** Testimonios ficticios de demostración */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marcela Oyarzún',
    role: 'Dueña',
    business: 'Petshop ficticio',
    text: 'Antes anotábamos las ventas en papel. Ahora tenemos caja, stock y clientes en un solo lugar, y el cierre del día tarda cinco minutos.',
    rating: 5,
    initials: 'MO',
  },
  {
    name: 'Federico Zampini',
    role: 'Encargado',
    business: 'Minimarket ficticio',
    text: 'Nos sirvió para ordenar el mostrador y saber qué productos se venden más. La reposición dejó de ser a ojo.',
    rating: 5,
    initials: 'FZ',
  },
  {
    name: 'Carolina Brizuela',
    role: 'Dueña',
    business: 'Tienda de ropa ficticia',
    text: 'Es simple para vender y completo para administrar. Las chicas del local lo aprendieron en una tarde.',
    rating: 5,
    initials: 'CB',
  },
  {
    name: 'Gustavo Leguizamón',
    role: 'Socio',
    business: 'Distribuidora ficticia',
    text: 'Pudimos sumar usuarios y controlar mejor quién hace cada operación. La cuenta corriente de los clientes ahora está siempre al día.',
    rating: 4,
    initials: 'GL',
  },
  {
    name: 'Antonella Ferreyra',
    role: 'Dueña',
    business: 'Perfumería ficticia',
    text: 'Nos gustó que funcione como una app y que sea fácil de usar desde la tablet. Los reportes del mes me llegan a donde esté.',
    rating: 5,
    initials: 'AF',
  },
]
