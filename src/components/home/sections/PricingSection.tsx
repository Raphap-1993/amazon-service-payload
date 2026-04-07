import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type PricingSectionProps = {
  section: HomePageData['pricingSection']
}

export function PricingSection({ section }: PricingSectionProps) {
  return (
    <section className="section section--dark section--pricing" id="proyectos">
      <div className="container">
        <SectionHeading
          align="center"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="pricing-grid">
          {section.items.map((item) => (
            <article className="pricing-card" key={item.title}>
              <span className="pricing-card__badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <p className="card-copy">{item.description}</p>
              <ActionLink
                className={`button-link ${
                  item.cta.variant === 'secondary' ? 'button-link--secondary' : 'button-link--primary'
                } pricing-card__action`}
                link={item.cta}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
