import type { HomePageData } from '@/lib/home/types'

import { ContactMailtoForm } from '@/components/site/ContactMailtoForm'

import { ActionLink } from '../primitives/ActionLink'
import { SectionHeading } from '../primitives/SectionHeading'

type ContactSectionProps = {
  section: HomePageData['contactSection']
}

export function ContactSection({ section }: ContactSectionProps) {
  const featuredCard = section.cards[0]
  const supportingCards = section.cards.slice(1)

  return (
    <section className="section section--light section--contact" id="contacto">
      <div className="container contact-layout">
        <div className="page-section__content page-section__content--contact-cards page-section__content--secondary">
          <header className="page-rich-copy page-rich-copy--intro page-rich-copy--contact page-rich-copy--justified">
            <SectionHeading
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </header>

          {featuredCard ? (
            <div className="page-strip page-strip--contact page-strip--contact-home">
              <div className="page-strip__content page-strip__content--justified">
                <div className="page-strip__label">{featuredCard.label}</div>
                <h2>{featuredCard.value}</h2>
                <p>
                  {featuredCard.href?.startsWith('mailto:')
                    ? 'Canal preferente para consultas comerciales y tecnicas.'
                    : featuredCard.href?.startsWith('tel:')
                      ? 'Canal de apoyo para coordinacion directa y seguimiento inicial.'
                      : 'Referencia de ubicacion de la base operativa en Pucallpa.'}
                </p>
              </div>
              {featuredCard.href ? (
                <div className="page-hero__actions page-hero__actions--strip page-strip__actions">
                  <ActionLink
                    link={{
                      href: featuredCard.href,
                      label: featuredCard.hrefLabel || 'Ver contacto',
                      variant: 'primary',
                    }}
                    size="lg"
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="contact-card-grid contact-card-grid--premium">
            {supportingCards.map((item, index) => (
              <article
                className={`contact-card ${index === 0 ? 'contact-card--primary' : 'contact-card--support'}`}
                key={`${item.label}-${item.value}`}
              >
                <div className="card-meta">{item.label}</div>
                <strong>{item.value}</strong>
                {item.href ? (
                  <ActionLink
                    className="card-link"
                    link={{ href: item.href, label: item.hrefLabel, variant: 'secondary' }}
                    size="sm"
                    tone="subtle"
                  />
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="page-section__content page-section__content--contact-form page-section__content--secondary">
          <header className="contact-form__header">
            <h3>{section.formTitle}</h3>
            <p>{section.formDescription}</p>
          </header>
          <ContactMailtoForm
            submitLabel={section.formButtonLabel}
            successMessage={section.formSuccessMessage}
          />
        </div>
      </div>
    </section>
  )
}
