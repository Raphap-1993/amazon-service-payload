import type { HomePageData } from '@/lib/home/types'

import { SectionHeading } from '../primitives/SectionHeading'

type ValuesSectionProps = {
  section: HomePageData['valuesSection']
}

export function ValuesSection({ section }: ValuesSectionProps) {
  return (
    <section className="section section--tinted section--values" id="valores">
      <div className="container">
        <SectionHeading
          align="left"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="values-grid">
          {section.items.map((item, index) => (
            <article className="value-card" key={item.title}>
              <div className="value-card__icon" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3>{item.title}</h3>
              <p className="card-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
