import Image from 'next/image'
import type { Metadata } from 'next'

import { SectionHeading } from '@/components/home/primitives/SectionHeading'
import { PageHero } from '@/components/site/PageHero'
import { getAboutPageData } from '@/lib/about/getAboutPageData'
import { PageShell } from '@/components/site/PageShell'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { staticPages } from '@/lib/site-content/staticPages'

export const metadata: Metadata = staticPages.about.metadata
export const dynamic = 'force-dynamic'

type AboutIconName =
  | 'book'
  | 'certificate'
  | 'compass'
  | 'eye'
  | 'shield'
  | 'team'
  | 'tool'

const profileNarrativeMeta: Array<{ icon: AboutIconName; label: string }> = [
  { icon: 'shield', label: 'Base certificada' },
  { icon: 'certificate', label: 'Legado fundador' },
  { icon: 'book', label: 'Certificacion OMA' },
  { icon: 'compass', label: 'Direccion actual' },
  { icon: 'team', label: 'Equipo tecnico' },
]

const pillarHighlights: Array<{ icon: AboutIconName; label: string }> = [
  { icon: 'team', label: 'Personal capacitado y con experiencia' },
  { icon: 'book', label: 'Informacion tecnica actualizada' },
  { icon: 'tool', label: 'Equipos y herramientas' },
]

function buildInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

function AboutIcon({ kind }: { kind: AboutIconName }) {
  switch (kind) {
    case 'certificate':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="M7 4.75h8.5L19.25 8.5V18A1.75 1.75 0 0 1 17.5 19.75h-10A1.75 1.75 0 0 1 5.75 18V6.5A1.75 1.75 0 0 1 7.5 4.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M15.25 4.75V8.5H19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M8.75 12h7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M8.75 15.5h4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      )
    case 'book':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="M7 5.25h9.25A2.5 2.5 0 0 1 18.75 7.75v10.5H8.5A2.75 2.75 0 0 0 5.75 21V7.5A2.25 2.25 0 0 1 8 5.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M8.75 9h6.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M8.75 12.5h6.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M8.5 18.25H18.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      )
    case 'compass':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m14.9 9.1-1.7 5.1-5.1 1.7 1.7-5.1 5.1-1.7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M12 4.75V6.5M12 17.5v1.75M19.25 12H17.5M6.5 12H4.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      )
    case 'eye':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="M3.75 12s2.8-5 8.25-5 8.25 5 8.25 5-2.8 5-8.25 5-8.25-5-8.25-5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'team':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="M8.5 13.75a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM15.75 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4.5 18.75c.7-2.1 2.4-3.5 4.75-3.5 2.35 0 4.05 1.4 4.75 3.5M13.25 18.75c.45-1.45 1.6-2.5 3.35-2.5 1.4 0 2.45.75 3.15 2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      )
    case 'tool':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="m13.9 6.2 1.7-1.7a3.25 3.25 0 0 1 3.9 4.95l-8.8 8.8a2.5 2.5 0 1 1-3.55-3.55l8.8-8.8Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="7.4" cy="16.6" r="0.9" fill="currentColor" />
        </svg>
      )
    case 'shield':
    default:
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 4 18 6.4v4.9c0 3.8-2.35 7.2-6 8.7-3.65-1.5-6-4.9-6-8.7V6.4L12 4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="m9.4 12.15 1.65 1.65 3.55-3.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )
  }
}

function getQualityIcon(title: string): AboutIconName {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('personal')) {
    return 'team'
  }

  if (normalizedTitle.includes('pilares')) {
    return 'tool'
  }

  return 'shield'
}

function getIdentityIcon(title: string): AboutIconName {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('vision')) {
    return 'eye'
  }

  if (normalizedTitle.includes('mision')) {
    return 'compass'
  }

  return 'certificate'
}

export default async function AboutPage() {
  const [chrome, aboutPage] = await Promise.all([getHomePageData(), getAboutPageData()])
  const page = staticPages.about
  const pillarsBlock = page.qualityBlocks.find((item) => item.title === 'Nuestros pilares')
  const qualityBlocks = page.qualityBlocks.filter((item) => item.title !== 'Nuestros pilares')

  return (
    <PageShell chrome={chrome} className="about-page-shell">
      <PageHero {...page.hero} description={aboutPage.hero.description} title={aboutPage.hero.title} />

      <section className="section section--light page-section page-section--profile" aria-label="Perfil corporativo">
        <div className="container page-section__grid page-section__grid--profile">
          <div className="page-section__content">
            <SectionHeading
              className="section-heading--narrative"
              description={aboutPage.profileSection.description}
              eyebrow={aboutPage.profileSection.eyebrow}
              title={aboutPage.profileSection.title}
            />
            <div className="about-story-flow" aria-label="Historia institucional">
              {aboutPage.profileSection.paragraphs.map((paragraph, index) => {
                const step = profileNarrativeMeta[index] || {
                  icon: 'shield' as const,
                  label: `Hito ${String(index + 1).padStart(2, '0')}`,
                }

                return (
                  <article className="about-story-card" key={paragraph}>
                    <div className="about-story-card__icon" aria-hidden="true">
                      <AboutIcon kind={step.icon} />
                    </div>
                    <div className="about-story-card__body">
                      <div className="about-story-card__label">{step.label}</div>
                      <p className="about-story-card__copy">{paragraph}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="page-side-panel page-side-panel--profile" aria-label="Sistema de calidad y experiencia">
            <div className="page-side-panel__label">Sistema de calidad y experiencia</div>
            <div className="page-card-stack">
              {qualityBlocks.map((item) => (
                <article
                  className="page-card page-card--about-focus"
                  key={item.title}
                >
                  <div className="about-card-heading">
                    <div className="about-icon-badge" aria-hidden="true">
                      <AboutIcon kind={getQualityIcon(item.title)} />
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <p className="card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {pillarsBlock ? (
        <section className="section page-section page-section--pillars" aria-label="Nuestros pilares">
          <div className="container">
            <SectionHeading
              align="center"
              className="section-heading--narrative"
              description={pillarsBlock.description}
              eyebrow="Pilares"
              title={pillarsBlock.title}
            />
            <div className="about-pillars-grid about-pillars-grid--feature">
              {pillarHighlights.map((pillar) => (
                <article className="about-pillar-card" key={pillar.label}>
                  <div className="about-pillar-card__icon" aria-hidden="true">
                    <AboutIcon kind={pillar.icon} />
                  </div>
                  <h3>{pillar.label}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section page-section page-section--leadership" aria-label="Liderazgo">
        <div className="container">
          <SectionHeading
            align="center"
            className="section-heading--narrative"
            description={aboutPage.leadershipSection.description}
            eyebrow={aboutPage.leadershipSection.eyebrow}
            title={aboutPage.leadershipSection.title}
          />
          <div className="page-card-grid page-card-grid--leadership">
            {aboutPage.leadershipSection.members.map((item) => (
              <article className="page-card page-card--leadership" key={`${item.meta}-${item.title}`}>
                <figure className="leadership-card__media" aria-label={item.photoAlt}>
                  {item.photoUrl ? (
                    <Image
                      alt={item.photoAlt}
                      className="leadership-card__image"
                      fill
                      sizes="(max-width: 780px) 100vw, 22rem"
                      src={item.photoUrl}
                    />
                  ) : (
                    <div className="leadership-card__placeholder" aria-hidden="true">
                      <span>{buildInitials(item.title)}</span>
                    </div>
                  )}
                </figure>
                <div className="leadership-card__body">
                  <div className="card-meta">{item.meta}</div>
                  <h3>{item.title}</h3>
                  <p className="card-copy">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light page-section page-section--capabilities" aria-label="Capacidades y mision">
        <div className="container page-section__grid page-section__grid--capabilities">
          <div className="page-section__content">
            <SectionHeading
              className="section-heading--narrative"
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

          <div className="page-section__content page-section__content--secondary">
            <SectionHeading
              className="section-heading--narrative"
              description={aboutPage.identitySection.description}
              eyebrow={aboutPage.identitySection.eyebrow}
              title={aboutPage.identitySection.title}
            />
            <div className="page-card-stack">
              {aboutPage.identitySection.items.map((item) => (
                <article className="page-card page-card--about-value" key={item.title}>
                  <div className="about-card-heading">
                    <div className="about-icon-badge" aria-hidden="true">
                      <AboutIcon kind={getIdentityIcon(item.title)} />
                    </div>
                    <h3>{item.title}</h3>
                  </div>
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
