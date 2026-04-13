import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.projects.metadata
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const chrome = await getHomePageData()
  const page = staticPages.projects

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light page-section page-section--intro" aria-label="Introduccion al portafolio">
        <div className="container">
          <SectionHeading
            className="section-heading--narrative"
            description="Casos reales organizados para demostrar experiencia de taller, orden operativo y capacidad tecnica visible antes del contacto."
            eyebrow="Portafolio"
            title="Casos documentados que respaldan mantenimiento, inspeccion y reparacion"
          />
          <div className="page-rich-copy page-rich-copy--intro page-rich-copy--justified">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-section page-section--signals" aria-label="Señales del portafolio">
        <div className="container page-section__grid page-section__grid--signals">
          <div className="page-section__content">
            <SectionHeading
              className="section-heading--narrative"
              description="La pagina de proyectos debe ayudar a un visitante institucional o privado a entender por que la empresa merece una consulta formal."
              eyebrow="Lectura comercial"
              title="Lo que este portafolio demuestra"
            />
            <ul className="page-list">
              {page.portfolioSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="page-side-panel page-side-panel--portfolio" aria-label="Enfoque del portafolio">
            <div className="page-side-panel__label">Enfoque del portafolio</div>
            <div className="page-card-stack">
              <article className="page-card">
                <h3>Confianza para clientes institucionales y privados</h3>
                <p className="card-copy">
                  La seleccion de casos busca reforzar seriedad, continuidad operativa y una lectura comercial alineada con una OMA certificada.
                </p>
                <ul className="page-list page-list--compact">
                  {page.hero.badges.map((badge) => (
                    <li key={badge}>{badge}</li>
                  ))}
                </ul>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--light page-section page-section--cases" aria-label="Casos destacados">
        <div className="container">
          <div className="page-card-grid">
            {page.cases.map((item) => (
              <article className="page-card" key={item.title}>
                <div className="card-meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p className="card-copy">{item.description}</p>
                {item.bullets ? (
                  <ul className="page-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light page-section page-section--cta" aria-label="Llamado a contacto">
        <div className="container">
          <div className="page-strip page-strip--projects">
            <div className="page-strip__content">
              <div className="page-strip__label">Siguiente paso</div>
              <h2>Si tu operacion necesita una referencia similar, el siguiente paso es una consulta por correo.</h2>
            </div>
            <ActionLink link={{ label: 'Ir a contacto', href: '/contacto', variant: 'primary' }} />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
