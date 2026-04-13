import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type ServicesSectionProps = {
  section: HomePageData['servicesSection']
  services: HomePageData['services']
}

export function ServicesSection({ section, services }: ServicesSectionProps) {
  const visibleServices = services.slice(0, 3)

  return (
    <section className="section section--light section--services" id="servicios">
      <div className="container">
        <header className="page-rich-copy page-rich-copy--intro page-rich-copy--services page-rich-copy--justified">
          <SectionHeading
            align="left"
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />
        </header>

        {visibleServices.length > 0 ? (
          <div className="services-grid services-grid--home-reference">
            {visibleServices.map((service) => (
              <article className="service-card service-card--home" key={service.title}>
                <header>
                  <div className="card-meta">{service.meta}</div>
                  <h3>{service.title}</h3>
                </header>
                <p className="card-copy">{service.description}</p>
                {service.href ? (
                  <ActionLink
                    className="card-link service-card__action"
                    link={{ href: service.href, label: 'Ver servicio', variant: 'secondary' }}
                    size="sm"
                    tone="subtle"
                  />
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
