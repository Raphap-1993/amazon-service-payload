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

  return (
    <PageShell chrome={chrome}>
      <PageHero {...page.hero} />

      <section className="section section--light">
        <div className="container page-section__grid">
          <div>
            <SectionHeading
              description="El objetivo es hacer visible y verificable el respaldo documental antes del contacto comercial."
              eyebrow="Documentos"
              title="Respaldo regulatorio visible y util"
            />
            <div className="page-rich-copy">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="page-side-panel">
            <div className="page-side-panel__label">Claves de consulta</div>
            <ul className="page-list">
              {page.guardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
    </PageShell>
  )
}
