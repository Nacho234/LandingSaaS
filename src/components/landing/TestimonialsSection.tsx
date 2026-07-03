import { Star } from 'lucide-react'
import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem, Reveal } from '../effects/Reveal'
import { TESTIMONIALS } from '../../data/testimonials'
import { cn } from '../../utils/cn'

export function TestimonialsSection() {
  return (
    <Section>
      <SectionHeader
        title="Comercios que ya operan con el sistema"
        lead="Historias de ejemplo que muestran cómo se siente pasar el negocio a la plataforma."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <StaggerItem key={t.name} className={cn(i === 0 && 'lg:row-span-1', i === 4 && 'sm:col-span-2 lg:col-span-1')}>
            <figure className="card card-hover flex h-full flex-col p-6">
              <div className="flex gap-0.5" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={cn('size-4', s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700')}
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                {'“'}{t.text}{'”'}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/6 pt-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-500/25 to-blue-500/25 text-xs font-bold text-accent-300">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role}, {t.business}
                  </p>
                </div>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <p className="mt-6 text-center text-xs text-slate-500">
          Testimonios ficticios con fines demostrativos.
        </p>
      </Reveal>
    </Section>
  )
}
