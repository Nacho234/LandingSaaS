import { Section, SectionHeader } from '../ui/Section'
import { Stagger, StaggerItem } from '../effects/Reveal'
import { AccordionItem } from '../ui/Accordion'
import { FAQS } from '../../data/faqs'

export function FAQSection() {
  const mid = Math.ceil(FAQS.length / 2)
  const cols = [FAQS.slice(0, mid), FAQS.slice(mid)]

  return (
    <Section className="bg-ink-900/30">
      <SectionHeader
        title="Preguntas frecuentes"
        lead="Todo lo que suelen preguntar los comercios antes de crear su negocio en la plataforma."
      />
      <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-2 lg:items-start">
        {cols.map((col, i) => (
          <Stagger key={i} className="grid gap-3" gap={0.05}>
            {col.map((f, j) => (
              <StaggerItem key={f.q}>
                <AccordionItem question={f.q} answer={f.a} defaultOpen={i === 0 && j === 0} />
              </StaggerItem>
            ))}
          </Stagger>
        ))}
      </div>
    </Section>
  )
}
