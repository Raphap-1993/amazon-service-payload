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

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light">
        <div className="container">
          <SectionHeading
            description="Servicios principales presentados con lenguaje claro, respaldo visible y foco en continuidad operacional."
            eyebrow="Servicios principales"
            title="Servicios principales"
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
      </section>

      <section className="section">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="Las capacidades visibles ayudan a entender el alcance tecnico y a reducir incertidumbre antes del contacto."
              eyebrow="Capacidades"
              title="Capacidades que fortalecen la confianza comercial"
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
              <h2>Si necesitas una evaluacion inicial, el siguiente paso es una consulta directa.</h2>
            </div>
            <ActionLink link={{ label: 'Solicitar cotizacion', href: '/contacto', variant: 'primary' }} />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
