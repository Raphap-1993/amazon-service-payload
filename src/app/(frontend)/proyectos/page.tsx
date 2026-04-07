import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.projects.metadata
export const revalidate = 60

export default async function ProjectsPage() {
  const chrome = await getHomePageData()
  const page = staticPages.projects

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light">
        <div className="container">
          <SectionHeading
            description="Los proyectos visibles ayudan a validar experiencia, secuencia operativa y capacidad de ejecucion real."
            eyebrow="Casos documentados"
            title="Portafolio tecnico y evidencia operativa"
          />
          <div className="page-rich-copy">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section section--light">
        <div className="container">
          <div className="page-strip">
            <div>
              <div className="page-strip__label">Comercial</div>
              <h2>Esta pagina refuerza confianza antes de una consulta o cotizacion.</h2>
            </div>
            <ActionLink link={{ label: 'Solicitar referencia', href: '/contacto', variant: 'primary' }} />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
