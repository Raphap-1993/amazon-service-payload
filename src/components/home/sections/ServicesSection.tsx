import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type ServicesSectionProps = {
  section: HomePageData['servicesSection']
  services: HomePageData['services']
}

export function ServicesSection({ section, services }: ServicesSectionProps) {
  return (
    <section className="section section--dark section--services" id="servicios">
      <div className="container">
        <SectionHeading
          align="center"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="card-meta">{service.meta}</div>
              <h3>{service.title}</h3>
              <p className="card-copy">{service.description}</p>
              {service.href ? (
                <ActionLink
                  className="button-link button-link--secondary service-card__action"
                  link={{ href: service.href, label: 'Ver servicio', variant: 'secondary' }}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
