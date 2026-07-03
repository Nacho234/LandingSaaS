import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Reveal } from '../effects/Reveal'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-20 md:py-28', className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  lead?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, lead, align = 'center', className }: SectionHeaderProps) {
  return (
    <Reveal className={cn('mb-12 md:mb-16', align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl', className)}>
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-[2.6rem] md:leading-[1.12]">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{lead}</p>}
    </Reveal>
  )
}
