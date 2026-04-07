import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type CertificationsSectionProps = {
  section: HomePageData['certificationsSection']
}

export function CertificationsSection({ section }: CertificationsSectionProps) {
  return (
    <section className="section section--tinted section--certifications" id="certificaciones">
      <div className="container">
        <SectionHeading
          align="center"
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />

        <div className="cert-grid">
          {section.items.map((item) => (
            <article className="cert-card" key={item.title}>
              <div className="card-meta">{item.meta}</div>
              <h3>{item.title}</h3>
              <p className="card-copy">{item.description}</p>
              {item.linkLabel && item.linkUrl ? (
                <ActionLink
                  className="card-link"
                  link={{ href: item.linkUrl, label: item.linkLabel, variant: 'secondary' }}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
