import type { Metadata } from 'next'

import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.about.metadata
export const revalidate = 60

export default async function AboutPage() {
  const chrome = await getHomePageData()
  const page = staticPages.about

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="Perfil corporativo, respaldo regulatorio y lectura empresarial para una operacion seria del rubro aeronautico."
              eyebrow="Perfil"
              title="Amazon Aviation Service como operacion tecnica y regulada"
            />
            <div className="page-rich-copy">
              {page.profile.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="page-side-panel">
            <div className="page-side-panel__label">Sistema de calidad y experiencia</div>
            <div className="page-card-stack">
              {page.qualityBlocks.map((item) => (
                <article className="page-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            description="Liderazgo visible y alineado con la percepcion de una empresa seria del rubro aeronautico."
            eyebrow="Liderazgo"
            title="Personas que sostienen la credibilidad de la marca"
          />
          <div className="page-card-grid">
            {page.leadership.map((item) => (
              <article className="page-card" key={item.title}>
                <div className="card-meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p className="card-copy">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="Las habilitaciones pesan tanto en conversion como en reputacion. Aqui se presentan de forma clara y ordenada."
              eyebrow="Habilitaciones"
              title="Capacidades visibles del negocio"
            />
            <ul className="page-list page-list--columns">
              {page.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              description="Mision y vision expresadas con tono tecnico, sobrio y coherente con la actividad del taller."
              eyebrow="Identidad"
              title="Mision y vision"
            />
            <div className="page-card-stack">
              {page.missionVision.map((item) => (
                <article className="page-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
