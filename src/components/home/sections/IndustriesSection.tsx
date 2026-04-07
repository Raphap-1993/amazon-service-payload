import type { HomePageData } from '@/lib/home/types'

import { SectionHeading } from '../primitives/SectionHeading'

type IndustriesSectionProps = {
  section: HomePageData['industriesSection']
}

export function IndustriesSection({ section }: IndustriesSectionProps) {
  return (
    <section className="section section--light section--industries" id="capacidades">
      <div className="container">
        <SectionHeading
          align="center"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="industries-grid">
          {section.items.map((item) => (
            <article className="industry-card" key={item.title}>
              <div className="card-meta">{item.meta}</div>
              <h3>{item.title}</h3>
              <p className="card-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
