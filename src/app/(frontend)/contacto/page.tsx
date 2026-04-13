import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { ContactMailtoForm } from '@/components/site/ContactMailtoForm'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import type { HomePageData } from '@/lib/home/types'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.contact.metadata
export const dynamic = 'force-dynamic'

function getPrimaryContactCard(cards: HomePageData['contactSection']['cards']) {
  return (
    cards.find((card) => card.href?.startsWith('mailto:')) ||
    cards.find((card) => card.label.toLowerCase().includes('correo')) ||
    cards[0]
  )
}

function getContactCards(cards: HomePageData['contactSection']['cards']) {
  const primary = getPrimaryContactCard(cards)
  const secondary = cards.find((card) => card.href?.startsWith('tel:'))
  const rest = cards.filter((card) => card !== primary && card !== secondary)

  return [primary, secondary, ...rest].filter(
    (card): card is HomePageData['contactSection']['cards'][number] => Boolean(card),
  )
}

function getContactCardDescription(card: HomePageData['contactSection']['cards'][number]) {
  if (card.href?.startsWith('mailto:')) {
    return 'Canal preferente para consultas comerciales y tecnicas.'
  }

  if (card.href?.startsWith('tel:')) {
    return 'Canal de apoyo para coordinacion directa y seguimiento inicial.'
  }

  return 'Referencia de ubicacion de la base operativa en Pucallpa.'
}

export default async function ContactPage() {
  const chrome = await getHomePageData()
  const page = staticPages.contact
  const contactCards = getContactCards(chrome.contactSection.cards)
  const primaryContact = getPrimaryContactCard(contactCards)
  const featuredContactCard = contactCards[0]
  const supportingContactCards = contactCards.slice(1)
  const primaryEmail = primaryContact?.value || 'aasperu@amazonaviationservice.com'
  const primaryHref = primaryContact?.href || `mailto:${primaryEmail}`

  return (
    <PageShell chrome={chrome} shellTone="premium">
      <PageHero
        {...page.hero}
        actions={[
          {
            label: 'Escribir por correo',
            href: primaryHref,
            variant: 'primary',
          },
          {
            label: 'Ver certificaciones',
            href: '/certificaciones',
            variant: 'secondary',
          },
        ]}
        panelLabel="Canales directos"
        panelTone="glass"
        variant="compact"
      />

      <section className="section section--light page-section page-section--contact" aria-label="Canales de contacto">
        <div className="container page-section__grid page-section__grid--contact">
          <div className="page-section__content page-section__content--contact-cards">
            <header className="page-rich-copy page-rich-copy--intro page-rich-copy--contact page-rich-copy--justified">
              <SectionHeading
                description="El correo oficial es el canal preferente para cotizaciones, solicitudes tecnicas y coordinacion inicial con operadores institucionales y privados."
                eyebrow="Canales"
                title="Canales de contacto"
              />
            </header>

            {featuredContactCard ? (
              <div className="page-strip page-strip--contact page-strip--contact-core">
                <div className="page-strip__content page-strip__content--justified">
                  <div className="page-strip__label">{featuredContactCard.label}</div>
                  <h2>{featuredContactCard.value}</h2>
                  <p>{getContactCardDescription(featuredContactCard)}</p>
                </div>
                {featuredContactCard.href ? (
                  <div className="page-hero__actions page-hero__actions--strip page-strip__actions">
                    <ActionLink
                      link={{
                        href: featuredContactCard.href,
                        label:
                          featuredContactCard.hrefLabel ||
                          (featuredContactCard.href.startsWith('mailto:')
                            ? 'Escribir por correo'
                            : featuredContactCard.href.startsWith('tel:')
                              ? 'Llamar ahora'
                              : 'Ver ubicacion'),
                        variant: 'primary',
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="page-card-stack page-card-stack--contact">
              {supportingContactCards.map((item, index) => (
                <article
                  className={`page-card ${index === 0 ? 'page-card--primary' : 'page-card--channel'}`}
                  key={`${item.label}-${item.value}`}
                >
                  <header>
                    <div className="card-meta">{item.label}</div>
                    <h3>{item.value}</h3>
                  </header>
                  <p className="card-copy">{getContactCardDescription(item)}</p>
                  {item.href ? (
                    <ActionLink
                      className="card-link"
                      link={{
                        href: item.href,
                        label:
                          item.hrefLabel ||
                          (item.href.startsWith('mailto:')
                            ? 'Escribir por correo'
                            : item.href.startsWith('tel:')
                              ? 'Llamar ahora'
                              : 'Ver ubicacion'),
                        variant: 'secondary',
                      }}
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="page-section__content page-section__content--contact-form">
            <header className="page-rich-copy page-rich-copy--intro page-rich-copy--contact-form page-rich-copy--justified">
              <SectionHeading
                description="Completa los datos clave para abrir tu cliente de correo con un mensaje mejor estructurado."
                eyebrow="Formulario"
                title="Consulta inicial"
              />
            </header>
            <div className="contact-form__header contact-form__header--intro">
              <h3>{chrome.contactSection.formTitle}</h3>
              <p>{chrome.contactSection.formDescription}</p>
            </div>
            <ContactMailtoForm
              submitLabel={chrome.contactSection.formButtonLabel}
              successMessage={chrome.contactSection.formSuccessMessage}
            />
          </div>
        </div>
      </section>

      <section className="section page-section page-section--notes" aria-label="Recomendaciones para el contacto">
        <div className="container">
          <div className="page-strip page-strip--contact">
            <div className="page-strip__content">
              <div className="page-strip__label">Recomendacion</div>
              <h2>Incluye la informacion minima para agilizar la primera respuesta tecnica.</h2>
            </div>
            <ul className="page-list page-list--compact page-list--contact-notes">
              {page.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
