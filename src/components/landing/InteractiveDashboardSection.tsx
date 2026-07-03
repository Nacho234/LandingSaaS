import { Section, SectionHeader } from '../ui/Section'
import { Reveal } from '../effects/Reveal'
import { GlowBackground } from '../effects/GlowBackground'
import { DashboardMockup } from '../mockups/DashboardMockup'

export function InteractiveDashboardSection() {
  return (
    <Section className="overflow-hidden">
      <GlowBackground />
      <SectionHeader
        title="Así se ve el sistema por dentro"
        lead="Probalo acá mismo: cambiá de negocio, recorré los módulos y registrá una venta simulada. Cada negocio ve solo lo suyo."
      />
      <Reveal>
        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-accent-500/10 via-transparent to-blue-500/10 blur-2xl"
          />
          <DashboardMockup />
        </div>
      </Reveal>
    </Section>
  )
}
