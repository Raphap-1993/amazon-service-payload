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
          align="left"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="industries-grid industries-grid--capabilities">
          {section.items.map((item, index) => (
            <article className="industry-card industry-card--numbered" key={item.title}>
              <div className="industry-card__index">{String(index + 1).padStart(2, '0')}</div>
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
