import type { Metadata } from 'next'

import { ActionLink } from '@/components/home/primitives/ActionLink'
import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.services.metadata
export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const chrome = await getHomePageData()
  const page = staticPages.services
  const featuredService = page.coreServices[0]
  const featuredServiceHref =
    featuredService && 'href' in featuredService && typeof featuredService.href === 'string'
      ? featuredService.href
      : undefined
  const supportingServices = page.coreServices.slice(1)
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
        panelLabel="Cobertura tecnica"
        panelTone="glass"
        variant="feature"
      />

      <section className="section section--light page-section page-section--services-core" aria-label="Servicios principales">
        <div className="container page-section__grid page-section__grid--services">
          <div className="page-section__content page-section__content--services page-section__content--primary">
            <header className="page-rich-copy page-rich-copy--intro page-rich-copy--services page-rich-copy--justified">
              <SectionHeading
                description="Amazon Aviation Service concentra su propuesta en mantenimiento de aeronaves y la complementa con inspeccion, reparacion y soporte tecnico documentado."
                eyebrow="Oferta tecnica"
                title="Servicios alineados a continuidad operativa y cumplimiento tecnico"
              />
            </header>

            {featuredService ? (
              <div className="page-strip page-strip--services page-strip--services-core">
                <div className="page-strip__content page-strip__content--justified">
                  <div className="page-strip__label">Servicio principal</div>
                  <h2>{featuredService.title}</h2>
                  <p>{featuredService.description}</p>
                </div>
                <div className="page-hero__actions page-hero__actions--strip page-strip__actions">
                  <ActionLink
                    link={{ label: 'Escribir por correo', href: primaryContactHref, variant: 'primary' }}
                  />
                  {featuredServiceHref ? (
                    <ActionLink
                      link={{ label: 'Ver servicio', href: featuredServiceHref, variant: 'secondary' }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="page-card-grid page-card-grid--services">
              {supportingServices.length > 0
                ? supportingServices.map((item, index) => (
                <article
                  className={`page-card ${index === 0 ? 'page-card--feature' : 'page-card--support'}`}
                  key={item.title}
                >
                  <header>
                    <div className="card-meta">{String(index + 1).padStart(2, '0')} · {item.meta}</div>
                    <h3>{item.title}</h3>
                  </header>
                  <p className="card-copy">{item.description}</p>
                </article>
                ))
                : page.coreServices.map((item, index) => (
                    <article
                      className={`page-card ${index === 0 ? 'page-card--feature' : 'page-card--support'}`}
                      key={item.title}
                    >
                      <header>
                        <div className="card-meta">
                          {String(index + 1).padStart(2, '0')} · {item.meta}
                        </div>
                        <h3>{item.title}</h3>
                      </header>
                      <p className="card-copy">{item.description}</p>
                    </article>
                  ))}
            </div>
          </div>

          <aside className="page-side-panel page-side-panel--services page-side-panel--featured" aria-label="Enfoque operativo">
            <div className="page-side-panel__label">Enfoque operativo</div>
            <div className="page-card-stack page-card-stack--services">
              <article className="page-card page-card--proof">
                <h3>Mantenimiento como frente principal</h3>
                <p className="card-copy">
                  El mantenimiento concentra la relacion de servicio porque responde a continuidad operativa, aeronavegabilidad y control documental.
                </p>
              </article>
              <article className="page-card page-card--proof">
                <h3>Inspeccion y reparacion como continuidad del servicio</h3>
                <p className="card-copy">
                  Las capacidades complementarias permiten diagnosticar, intervenir y documentar el trabajo dentro del alcance visible de la organizacion.
                </p>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="section page-section page-section--capabilities" aria-label="Capacidades tecnicas">
        <div className="container page-section__grid page-section__grid--capabilities">
          <div className="page-section__content page-section__content--services-secondary page-section__content--secondary">
            <header className="page-rich-copy page-rich-copy--intro page-rich-copy--services-secondary page-rich-copy--justified">
              <SectionHeading
                description="Estas capacidades refuerzan que la empresa puede atender requerimientos tecnicos concretos con respaldo documental visible."
                eyebrow="Capacidades"
                title="Capacidades tecnicas dentro del alcance publicado"
              />
            </header>
            <ul className="page-list">
              {page.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="page-side-panel page-side-panel--differentiators page-side-panel--featured" aria-label="Diferenciales del servicio">
            <div className="page-side-panel__label">Diferenciales</div>
            <div className="page-card-stack page-card-stack--differentiators">
              {page.differentiators.map((item) => (
                <article className="page-card page-card--support" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--light page-section page-section--cta" aria-label="Llamado a contacto">
        <div className="container">
          <div className="page-strip page-strip--services">
            <div className="page-strip__content">
              <div className="page-strip__label">Siguiente paso</div>
              <h2>Si tu operacion necesita mantenimiento, inspeccion o reparacion, escribe por correo con el tipo de aeronave y el alcance requerido.</h2>
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
