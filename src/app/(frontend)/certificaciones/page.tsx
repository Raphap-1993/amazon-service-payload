import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.certifications.metadata
export const revalidate = 60

export default async function CertificationsPage() {
  const chrome = await getHomePageData()
  const page = staticPages.certifications
  const primaryContactHref =
    chrome.contactSection.cards.find((card) => card.href?.startsWith('mailto:'))?.href ||
    'mailto:aasperu@amazonaviationservice.com'

  return (
    <PageShell chrome={chrome}>
      <PageHero
        {...page.hero}
        actions={[
          {
            label: 'Escribir por correo',
            href: primaryContactHref,
            variant: 'primary',
          },
          page.hero.actions[1],
        ]}
      />

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="El respaldo documental se presenta para que un visitante entienda primero el alcance, luego la evidencia y por ultimo el siguiente paso."
              eyebrow="Documentos"
              title="Respaldo regulatorio visible y util"
            />
            <div className="page-rich-copy">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="page-card-stack">
              <article className="page-card">
                <h3>Orden de revision recomendado</h3>
                <ul className="page-list page-list--compact">
                  <li>Confirma primero la certificacion OMA N.° 078.</li>
                  <li>Revisa la lista de capacidades para validar el alcance tecnico.</li>
                  <li>Contrasta el documento con el servicio o proyecto que buscas resolver.</li>
                </ul>
              </article>
            </div>
          </div>

          <div className="page-side-panel">
            <div className="page-side-panel__label">Claves de consulta</div>
            <div className="page-card-stack">
              <article className="page-card">
                <h3>Lo que debes buscar</h3>
                <ul className="page-list page-list--compact">
                  {page.guardrails.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="page-card">
                <h3>Uso comercial del respaldo</h3>
                <p className="card-copy">
                  Estos documentos ayudan a reducir riesgo percibido y sirven para confirmar que el canal correcto sigue siendo el correo antes de avanzar con una consulta.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-card-grid">
            {page.documents.map((item) => (
              <article className="page-card" key={item.title}>
                <div className="card-meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p className="card-copy">{item.description}</p>
                {item.link ? <ActionLink className="card-link" link={item.link} /> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="page-strip">
            <div>
              <div className="page-strip__label">Siguiente paso</div>
              <h2>Si la documentacion ya te da confianza, el siguiente paso es escribir por correo con tu requerimiento.</h2>
            </div>
            <div className="page-hero__actions">
              <ActionLink link={{ label: 'Escribir por correo', href: primaryContactHref, variant: 'primary' }} />
              <ActionLink link={{ label: 'Ir a contacto', href: '/contacto', variant: 'secondary' }} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
