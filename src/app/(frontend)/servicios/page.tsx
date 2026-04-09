import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.services.metadata
export const revalidate = 60

export default async function ServicesPage() {
  const chrome = await getHomePageData()
  const page = staticPages.services
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
              description="La oferta se lee en el orden real del negocio: mantenimiento como eje principal, luego inspeccion, reparacion y soporte documental."
              eyebrow="Oferta tecnica"
              title="Servicios organizados por prioridad operativa"
            />
            <div className="page-card-grid">
              {page.coreServices.map((item) => (
                <article className="page-card" key={item.title}>
                  <div className="card-meta">{item.meta}</div>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="page-side-panel">
            <div className="page-side-panel__label">Como leer esta oferta</div>
            <div className="page-card-stack">
              <article className="page-card">
                <h3>Mantenimiento como servicio central</h3>
                <p className="card-copy">
                  La pagina prioriza el trabajo de mantenimiento porque es el punto de entrada mas fuerte para operadores que buscan continuidad y seguridad operacional.
                </p>
              </article>
              <article className="page-card">
                <h3>Capacidades y certificacion como respaldo</h3>
                <p className="card-copy">
                  El resto de servicios funciona como soporte para validar alcance tecnico, orden documental y capacidad de respuesta.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="Las capacidades visibles permiten entender el alcance tecnico real y bajar incertidumbre antes de la consulta formal."
              eyebrow="Capacidades"
              title="Capacidades que respaldan el servicio"
            />
            <ul className="page-list">
              {page.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="page-side-panel">
            <div className="page-side-panel__label">Diferenciales</div>
            <div className="page-card-stack">
              {page.differentiators.map((item) => (
                <article className="page-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="page-strip">
            <div>
              <div className="page-strip__label">Siguiente paso</div>
              <h2>Si necesitas una evaluacion inicial, escribe por correo con el tipo de aeronave y el requerimiento principal.</h2>
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
