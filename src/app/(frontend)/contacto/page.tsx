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
export const revalidate = 60

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

export default async function ContactPage() {
  const chrome = await getHomePageData()
  const page = staticPages.contact
  const contactCards = getContactCards(chrome.contactSection.cards)
  const primaryContact = getPrimaryContactCard(contactCards)
  const primaryEmail = primaryContact?.value || 'aasperu@amazonaviationservice.com'
  const primaryHref = primaryContact?.href || `mailto:${primaryEmail}`

  return (
    <PageShell chrome={chrome}>
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
      />

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="El correo principal es el canal preferente para consultas comerciales y tecnicas, con respuesta ordenada y respaldo documental."
              eyebrow="Canales"
              title="Informacion de contacto"
            />
            <div className="page-card-stack">
              {contactCards.map((item) => (
                <article className="page-card" key={`${item.label}-${item.value}`}>
                  <div className="card-meta">{item.label}</div>
                  <h3>{item.value}</h3>
                  <p className="card-copy">
                    {item.href?.startsWith('mailto:')
                      ? 'Correo principal administrable desde Backoffice.'
                      : item.href?.startsWith('tel:')
                        ? 'Canal telefonico de soporte y contacto directo.'
                        : 'Base operativa y direccion de referencia.'}
                  </p>
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

          <div>
            <SectionHeading
              description="Completa el formulario para preparar el correo. El boton ya abre el cliente de correo con el mensaje armado."
              eyebrow="Formulario"
              title="Solicitud inicial"
            />
            <ContactMailtoForm recipientEmail={primaryEmail} submitLabel={chrome.contactSection.formButtonLabel} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-strip">
            <div>
              <div className="page-strip__label">Antes de enviar</div>
              <h2>Comparte la informacion clave para orientar mejor la primera respuesta por correo.</h2>
            </div>
            <ul className="page-list page-list--compact">
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
