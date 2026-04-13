import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.certifications.metadata
export const dynamic = 'force-dynamic'

export default async function CertificationsPage() {
  const chrome = await getHomePageData()
  const page = staticPages.certifications
  const pageDocuments =
    chrome.certificationsSection.items.length > 0
      ? chrome.certificationsSection.items.map((item) => ({
          description: item.description,
          link:
            item.linkLabel && item.linkUrl
              ? {
                  href: item.linkUrl,
                  label: item.linkLabel,
                  variant: 'secondary' as const,
                }
              : undefined,
          meta: item.meta,
          title: item.title,
        }))
      : page.documents
  const featuredDocument = pageDocuments[0]
  const supportingDocuments = pageDocuments.slice(1)
  const primaryContactHref =
    chrome.contactSection.cards.find((card) => card.href?.startsWith('mailto:'))?.href ||
    'mailto:aasperu@amazonaviationservice.com'

  return (
    <PageShell chrome={chrome} shellTone="premium">
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
        panelLabel="Pruebas institucionales"
        panelTone="glass"
        variant="compact"
      />

      <section className="section section--light page-section page-section--documents" aria-label="Documentacion y respaldo">
        <div className="container page-section__grid page-section__grid--documents">
          <div className="page-section__content page-section__content--documents">
            <header className="page-rich-copy page-rich-copy--intro page-rich-copy--documents page-rich-copy--justified">
              <SectionHeading
                description="La documentacion disponible permite validar primero la condicion de OMA, despues el alcance tecnico y finalmente el soporte para una consulta formal."
                eyebrow="Documentos"
                title="Certificaciones y capacidades presentadas como prueba institucional"
              />
            </header>

            {featuredDocument ? (
              <div className="page-strip page-strip--certifications page-strip--certifications-core">
                <div className="page-strip__content page-strip__content--justified">
                  <div className="page-strip__label">{featuredDocument.meta}</div>
                  <h2>{featuredDocument.title}</h2>
                  <p>{featuredDocument.description}</p>
                </div>
                {featuredDocument.link ? (
                  <div className="page-hero__actions page-hero__actions--strip page-strip__actions">
                    <ActionLink className="card-link" link={featuredDocument.link} />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="page-rich-copy page-rich-copy--documents page-rich-copy--justified">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="page-card-stack page-card-stack--documents">
              <article className="page-card page-card--proof">
                <h3>Ruta sugerida de revision</h3>
                <ul className="page-list page-list--compact">
                  <li>Verifica primero la condicion OMA N°078 ante la DGAC.</li>
                  <li>Revisa la lista de capacidades para validar el alcance tecnico.</li>
                  <li>Contrasta el documento con el servicio o proyecto que buscas resolver.</li>
                </ul>
              </article>
            </div>
          </div>

          <aside className="page-side-panel page-side-panel--documents page-side-panel--featured" aria-label="Puntos de validacion">
            <div className="page-side-panel__label">Puntos de validacion</div>
            <div className="page-card-stack page-card-stack--documents-support">
              <article className="page-card page-card--support">
                <h3>Que valida esta documentacion</h3>
                <ul className="page-list page-list--compact">
                  {page.guardrails.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="page-card page-card--proof">
                <h3>Por que importa antes de consultar</h3>
                <p className="card-copy">
                  Estos documentos ayudan a entender alcance, reducir incertidumbre y preparar una consulta por correo con mejor contexto tecnico.
                </p>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="section page-section page-section--resources" aria-label="Documentos de referencia">
        <div className="container">
          <div className="page-card-grid page-card-grid--documents">
            {supportingDocuments.length > 0
              ? supportingDocuments.map((item) => (
                  <article className="page-card page-card--document" key={item.title}>
                    <header>
                      <div className="card-meta">Documento · {item.meta}</div>
                      <h3>{item.title}</h3>
                    </header>
                    <p className="card-copy">{item.description}</p>
                    {item.link ? <ActionLink className="card-link" link={item.link} /> : null}
                  </article>
                ))
              : pageDocuments.map((item) => (
                  <article className="page-card page-card--document" key={item.title}>
                    <header>
                      <div className="card-meta">Documento · {item.meta}</div>
                      <h3>{item.title}</h3>
                    </header>
                    <p className="card-copy">{item.description}</p>
                    {item.link ? <ActionLink className="card-link" link={item.link} /> : null}
                  </article>
                ))}
          </div>
        </div>
      </section>

      <section className="section section--light page-section page-section--cta" aria-label="Llamado a contacto">
        <div className="container">
          <div className="page-strip page-strip--certifications">
            <div className="page-strip__content">
              <div className="page-strip__label">Siguiente paso</div>
              <h2>Si la documentacion confirma el alcance que necesitas, el siguiente paso es enviar tu consulta por correo.</h2>
            </div>
            <div className="page-hero__actions page-hero__actions--strip page-strip__actions">
              <ActionLink link={{ label: 'Escribir por correo', href: primaryContactHref, variant: 'primary' }} />
              <ActionLink link={{ label: 'Ir a contacto', href: '/contacto', variant: 'secondary' }} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
