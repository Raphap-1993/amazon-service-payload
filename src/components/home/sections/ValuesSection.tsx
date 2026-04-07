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
          align="center"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="values-grid">
          {section.items.map((item) => (
            <article className="value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="card-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
