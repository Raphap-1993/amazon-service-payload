/* eslint-disable @next/next/no-img-element */
import type { HomePageData } from '@/lib/home/types'

import { buildMediaObjectPosition } from '@/components/home/primitives/mediaObjectPosition'

import { ReferenceHomeContactForm } from './ReferenceHomeContactForm'
import { ReferenceHomeHeader } from './ReferenceHomeHeader'
import { ReferenceHomeMotion } from './ReferenceHomeMotion'

import styles from './ReferenceHome.module.css'

type ReferenceHomeProps = {
  data: HomePageData
}

const anchorMap: Record<string, string> = {
  '/': '#inicio',
  '/certificaciones': '#certificaciones',
  '/contacto': '#contacto',
  '/nosotros': '#nosotros',
  '/proyectos': '#proyectos',
  '/servicios': '#servicios',
}

function toHomeHref(href: string) {
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    return href
  }

  return anchorMap[href] || href
}

function splitTextLines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
}

function splitNarrativeParagraphs(value: string) {
  const normalized = value.replace(/\r/g, '').trim()

  if (!normalized) {
    return []
  }

  const blocks = normalized
    .split(/\n+/)
    .map((item) => item.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  return blocks.flatMap((block) => {
    if (block.length <= 240) {
      return [block]
    }

    const sentences = block
      .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/u)
      .map((item) => item.trim())
      .filter(Boolean)

    if (sentences.length < 2) {
      return [block]
    }

    const paragraphs: string[] = []
    let current = ''

    sentences.forEach((sentence) => {
      const next = current ? `${current} ${sentence}` : sentence

      if (current && next.length > 230) {
        paragraphs.push(current)
        current = sentence
        return
      }

      current = next
    })

    if (current) {
      paragraphs.push(current)
    }

    return paragraphs
  })
}

function buildInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

type FlatIconName =
  | 'academy'
  | 'aircraft'
  | 'certificate'
  | 'check'
  | 'clipboard'
  | 'document'
  | 'eye'
  | 'flame'
  | 'gear'
  | 'location'
  | 'mail'
  | 'paint'
  | 'phone'
  | 'repair'
  | 'search'
  | 'shield'
  | 'target'
  | 'whatsapp'

function renderFlatIcon(name: FlatIconName, className = 'ref-flat-icon') {
  if (name === 'clipboard') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <rect height="16" rx="2" width="12" x="6" y="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 5.5h6V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 10h6M9 14h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'repair') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M14.6 5.2a3.7 3.7 0 0 0 4.1 4.1l-8.9 8.9H6.5v-3.3l8.1-8.1Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path d="m14.6 5.2 2.8-2.7 1.4 1.4-2.7 2.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'gear') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="m12 3 1 2.2 2.4.5 1.8-1.4 1.7 1.7-1.4 1.8.5 2.4L21 12l-2.2 1 .5 2.4 1.4 1.8-1.7 1.7-1.8-1.4-2.4.5L12 21l-1-2.2-2.4-.5-1.8 1.4-1.7-1.7 1.4-1.8L5.9 13 3.7 12l2.2-1-.5-2.4L4 6.8l1.7-1.7 1.8 1.4 2.4-.5L12 3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'target') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'eye') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M2.5 12S6.1 6.5 12 6.5 21.5 12 21.5 12 17.9 17.5 12 17.5 2.5 12 2.5 12Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'certificate') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9.4 12.3-1 8.2L12 18.7l3.6 1.8-1-8.2" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'document') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M8 3.5h6l4 4V20a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M14 3.5V8h4M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'mail') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <rect height="14" rx="2" width="18" x="3" y="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M6.8 4.5h2.6l1.2 4.1-1.8 1.8a14 14 0 0 0 4.8 4.8l1.8-1.8 4.1 1.2v2.6c0 .8-.7 1.5-1.5 1.5C10.8 18.7 5.3 13.2 5.3 6c0-.8.7-1.5 1.5-1.5Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (name === 'search') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'flame') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M13.5 3.5c.6 3.1-1.6 4.2-1.6 6.2 0 1.3.9 2.2 2.2 2.2 2 0 3-1.7 3-3.5 2 1.8 3 4 3 6.2 0 3.8-3 6.9-7 6.9s-7-3.1-7-6.9c0-3.1 1.9-5 4.8-7.6.5 1.9 1.6 3 2.8 3 .9 0 1.7-.8 1.7-1.9 0-1.2-.6-2.1-1-3 .7-.7 1.5-1.4 2.1-2.6Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (name === 'paint') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M5.5 8.5 14 4l4 4.1-4.5 8.4-8-8Zm-.6 1.7L3 14.6c-.4.9 0 2 .9 2.4l1.3.6c.9.4 2 0 2.4-.9l1.8-4.3"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (name === 'academy') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 3 3 7.5h18L12 3ZM5 10h14M6.5 10v8M10.5 10v8M13.5 10v8M17.5 10v8M4 20h16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 3 5 5.7v5.1c0 4.4 2.9 8.5 7 9.5 4.1-1 7-5.1 7-9.5V5.7L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="m9.2 12 1.8 1.8 3.8-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'whatsapp') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d="M20 11.8a8 8 0 0 1-11.8 7l-3.7 1 1-3.6A8 8 0 1 1 20 11.8Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M9.2 8.8c.2-.3.5-.4.8-.4h.6c.2 0 .4.1.5.3l.7 1.6c.1.3.1.5-.1.7l-.5.7c.5 1 1.3 1.8 2.3 2.3l.7-.5c.2-.2.5-.2.7-.1l1.6.7c.2.1.3.3.3.5v.6c0 .3-.1.6-.4.8-.6.4-1.2.4-2 .2-3-.9-5.4-3.3-6.3-6.3-.2-.8-.2-1.4.1-2.1Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (name === 'check') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="m5 12 4.2 4.2L19 6.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M2.5 12.2 9.3 10l3.3-5 2.1.7-1.1 4 4 2 3.3-1.1.7 2.1-5 3.3-2.2 6.8-1.8-.5.5-6.2-2-2-6.2.5-.5-1.8 6.8-2.2"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function getTickerIconName(item: HomePageData['tickerItems'][number]): FlatIconName {
  if (item.icon === '🔍' || /pruebas|inspecci[oó]n/i.test(item.value)) {
    return 'search'
  }

  if (item.icon === '🔥' || /caliente/i.test(item.value)) {
    return 'flame'
  }

  if (item.icon === '🔭' || /borosc[oó]pica/i.test(item.value)) {
    return 'eye'
  }

  if (item.icon === '🎨' || /pintura/i.test(item.value)) {
    return 'paint'
  }

  if (item.icon === '🛠' || /soldadura/i.test(item.value)) {
    return 'repair'
  }

  if (item.icon === '⚙️' || /motor/i.test(item.value)) {
    return 'gear'
  }

  return 'aircraft'
}

function getServiceIconName(item: HomePageData['servicesSection']['items'][number]): FlatIconName {
  if (item.icon === '🔧' || /reparaci[oó]n/i.test(item.title)) {
    return 'repair'
  }

  if (item.icon === '⚙️' || /preventivo/i.test(item.title)) {
    return 'gear'
  }

  return 'clipboard'
}

function getMissionVisionIconName(item: HomePageData['missionVisionSection']['items'][number]): FlatIconName {
  return /visi[oó]n/i.test(item.label) ? 'eye' : 'target'
}

function getCertificationIconName(item: HomePageData['certificationsSection']['items'][number]): FlatIconName {
  if (item.icon === '📜' || /certificado/i.test(item.title)) {
    return 'certificate'
  }

  if (item.icon === '📋' || /lista/i.test(item.title)) {
    return 'clipboard'
  }

  return 'document'
}

function getContactIconName(item: HomePageData['contactSection']['cards'][number]): FlatIconName {
  if (item.icon?.includes('✉') || /correo/i.test(item.label)) {
    return 'mail'
  }

  if (item.icon?.includes('📞') || /tel[eé]fonos/i.test(item.label)) {
    return 'phone'
  }

  return 'location'
}

function cleanActionLabel(label: string) {
  return label.replace(/^[^\p{L}\p{N}]+\s*/u, '').trim()
}

function renderProjectIcon() {
  return renderFlatIcon('aircraft', 'ref-flat-icon ref-project-icon-svg')
}

export function ReferenceHome({ data }: ReferenceHomeProps) {
  const heroImageSrc = data.hero.imageUrl || data.brand.logoUrl
  const footerSubline = data.brand.footerSubline?.trim() || 'S.A.C. · Pucallpa, Perú'
  const heroTitleLines = splitTextLines(data.hero.title)
  const heroAccentLine = heroTitleLines.at(-1) || ''
  const heroAccentPrefixLine = heroTitleLines.length > 1 ? heroTitleLines.at(-2) || '' : ''
  const heroAccentPrefixMatch = heroAccentPrefixLine.match(/\b(de|del|la|el|y)$/i)
  const heroAccentPrefix = heroAccentPrefixMatch?.[0] || ''
  const heroPenultimateLine = heroAccentPrefix
    ? heroAccentPrefixLine.slice(0, heroAccentPrefixLine.length - heroAccentPrefix.length).trimEnd()
    : heroAccentPrefixLine
  const heroTitleMainLines =
    heroAccentPrefix && heroTitleLines.length > 1
      ? [...heroTitleLines.slice(0, -2), heroPenultimateLine].filter(Boolean)
      : heroTitleLines.slice(0, -1)
  const introParagraphs = [data.aboutSection.description, data.aboutSection.secondaryDescription]
    .flatMap((paragraph) => splitNarrativeParagraphs(paragraph))
    .filter(Boolean)
  const introPrimaryImageStyle = buildMediaObjectPosition(
    data.aboutSection.imageFocalX,
    data.aboutSection.imageFocalY,
  )
  const introSecondaryImageStyle = buildMediaObjectPosition(
    data.aboutSection.secondaryImageFocalX,
    data.aboutSection.secondaryImageFocalY,
  )
  const missionVisionItems = data.missionVisionSection.items.slice(0, 2)
  const leadershipItems = data.leadershipSection.members.slice(0, 2)
  const footerNavItems = data.footer.navigation.filter((item) => item.label.toLowerCase() !== 'inicio').slice(0, 5)

  return (
    <div className={`${styles.root} ref-home`}>
      <ReferenceHomeMotion />
      <ReferenceHomeHeader brand={data.brand} cta={data.headerCta} navItems={data.navItems} phone={data.headerPhone} />

      <header className="ref-hero" id="inicio" role="banner">
        <div className="ref-hero-bg" />
        <div className="ref-hero-pattern" />
        <div className="ref-container ref-hero-inner">
          <div>
            <div className="ref-hero-oma">
              <span className="ref-hero-oma-dot" />
              {data.hero.eyebrow}
            </div>
            <h1 className="ref-hero-title">
              {heroTitleMainLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              {heroAccentLine ? (
                <span>
                  {heroAccentPrefix ? `${heroAccentPrefix} ` : null}
                  <em>{heroAccentLine}</em>
                </span>
              ) : null}
            </h1>
            <div className="ref-hero-sub">{data.hero.subtitle}</div>
            <p className="ref-hero-desc">{data.hero.description}</p>
            <div className="ref-hero-actions">
              <a className="ref-btn ref-btn-primary" href={toHomeHref(data.hero.actions[0]?.href || '#servicios')}>
                {data.hero.actions[0]?.label}
              </a>
              <a className="ref-btn ref-btn-outline" href={toHomeHref(data.hero.actions[1]?.href || '#contacto')}>
                {data.hero.actions[1]?.label}
              </a>
            </div>
            <div className="ref-hero-trust">
              {data.hero.trustItems.map((item, index) => (
                <div className="ref-hero-trust-fragment" key={`${item.value}-${item.label}`}>
                  {index > 0 ? <div className="ref-trust-divider" /> : null}
                  <div className="ref-trust-item">
                    <span className="ref-trust-val">{item.value}</span>
                    <span className="ref-trust-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ref-hero-visual" data-fade-up="true">
            <div className="ref-hero-rap">
              <div className="ref-hero-rap-label">{data.hero.regulationsLabel}</div>
              <div className="ref-hero-rap-list">
                {data.hero.regulations.map((item) => (
                  <span className="ref-hero-rap-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="ref-hero-img-wrap">
              {heroImageSrc ? (
                <img alt={data.hero.imageAlt} src={heroImageSrc} />
              ) : (
                <div className="ref-hero-img-placeholder">
                  {renderFlatIcon('aircraft', 'ref-flat-icon ref-placeholder-icon')}
                  <span className="ref-placeholder-label">{data.brand.name}</span>
                </div>
              )}
            </div>
            <div className="ref-hero-badge">
              <div className="ref-hero-badge-num">{data.hero.badgeNumber}</div>
              <div className="ref-hero-badge-text">{data.hero.badgeText}</div>
            </div>
          </div>
        </div>
      </header>

      <div aria-hidden="true" className="ref-ticker">
        <div className="ref-ticker-track">
          {[...data.tickerItems, ...data.tickerItems].map((item, index) => (
            <span className="ref-ticker-item" key={`${item.value}-${index}`}>
              {renderFlatIcon(getTickerIconName(item), 'ref-flat-icon ref-flat-icon-ticker')}
              {item.value}
              <span className="ref-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      <main id="contenido-principal" tabIndex={-1}>
        <section aria-labelledby="nosotros-h2" className="ref-intro" id="nosotros">
          <div className="ref-container">
            <div className="ref-intro-grid">
              <div className="ref-intro-copy" data-fade-up="true">
                <span className="ref-eyebrow">{data.aboutSection.eyebrow}</span>
                <h2 className="ref-section-title" id="nosotros-h2">
                  {data.aboutSection.title}
                </h2>
                {introParagraphs.map((paragraph, index) => (
                  <p className={`ref-section-body ${index > 0 ? 'ref-section-body-tight' : ''}`} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="ref-intro-media" data-fade-up="true">
                <div className="ref-intro-media-stack">
                  <div className="ref-intro-photo-cluster">
                    <div className="ref-intro-image-frame ref-intro-image-frame-primary">
                      {data.aboutSection.imageUrl ? (
                        <img
                          alt={data.aboutSection.imageAlt}
                          className="ref-intro-image ref-intro-image-primary"
                          src={data.aboutSection.imageUrl}
                          style={introPrimaryImageStyle}
                        />
                      ) : (
                        <div aria-hidden="true" className="ref-intro-image-placeholder ref-intro-image-primary">
                          {renderFlatIcon('aircraft', 'ref-flat-icon ref-placeholder-icon')}
                        </div>
                      )}
                    </div>

                    {data.aboutSection.secondaryImageUrl ? (
                      <div className="ref-intro-image-frame ref-intro-image-frame-secondary">
                        <img
                          alt={data.aboutSection.secondaryImageAlt}
                          className="ref-intro-image ref-intro-image-secondary"
                          src={data.aboutSection.secondaryImageUrl}
                          style={introSecondaryImageStyle}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="ref-cap-grid">
                    {data.aboutSection.highlights.map((item) => (
                      <div className="ref-cap-item" key={item}>
                        {renderFlatIcon('check', 'ref-flat-icon ref-flat-icon-check')}
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="servicios-h2" className="ref-services" id="servicios">
          <div className="ref-container">
            <div className="ref-services-header" data-fade-up="true">
              <span className="ref-eyebrow">{data.servicesSection.eyebrow}</span>
              <h2 className="ref-section-title" id="servicios-h2">
                {data.servicesSection.title}
              </h2>
            </div>
            <div className="ref-services-grid" role="list">
              {data.servicesSection.items.map((item) => (
                <article className="ref-service-card" data-fade-up="true" key={item.title} role="listitem">
                  <div className="ref-service-icon">{renderFlatIcon(getServiceIconName(item))}</div>
                  <h3 className="ref-service-title">{item.title}</h3>
                  <p className="ref-service-desc">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="habilitaciones-h2" className="ref-capabilities" id="habilitaciones">
          <div className="ref-container">
            <div className="ref-capabilities-grid">
              <div>
                <span className="ref-eyebrow">{data.capabilitiesSection.eyebrow}</span>
                <h2 className="ref-section-title" id="habilitaciones-h2">
                  {data.capabilitiesSection.title}
                </h2>
                <div className="ref-hab-list" role="list">
                  {data.capabilitiesSection.items.map((item, index) => (
                    <div className="ref-hab-item" data-fade-up="true" key={item} role="listitem">
                      <span className="ref-hab-num">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ref-capabilities-side" data-fade-up="true">
                <div className="ref-oma-card">
                  <div className="ref-oma-num">{data.capabilitiesSection.omaNumber}</div>
                  <div className="ref-oma-label">{data.capabilitiesSection.omaLabel}</div>
                  <p className="ref-oma-body">{data.capabilitiesSection.omaBody}</p>
                </div>
                <div className="ref-rap-card">
                  <div className="ref-rap-card-label">{data.capabilitiesSection.regulationsLabel}</div>
                  <div className="ref-rap-tags">
                    {data.capabilitiesSection.regulations.map((item) => (
                      <span className="ref-rap-tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Misión y Visión" className="ref-mv">
          <div className="ref-container">
            <div className="ref-mv-grid">
              {missionVisionItems.map((item) => (
                <div className="ref-mv-card" data-fade-up="true" key={item.label}>
                  <div className="ref-mv-icon">{renderFlatIcon(getMissionVisionIconName(item))}</div>
                  <div className="ref-mv-label">{item.label}</div>
                  <p className="ref-mv-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="lead-h2" className="ref-leadership" id="equipo">
          <div className="ref-container">
            <span className="ref-eyebrow" data-fade-up="true">
              {data.leadershipSection.eyebrow}
            </span>
            <h2 className="ref-section-title" data-fade-up="true" id="lead-h2">
              {data.leadershipSection.title}
            </h2>
            <div className="ref-leaders-grid">
              {leadershipItems.map((item) => (
                <div className="ref-leader-card" data-fade-up="true" key={item.title}>
                  <div className="ref-leader-accent" />
                  <div className="ref-leader-body">
                    <div className="ref-leader-media">
                      {item.photoUrl ? (
                        <img alt={item.photoAlt} className="ref-leader-photo" src={item.photoUrl} />
                      ) : (
                        <div aria-hidden="true" className="ref-leader-photo-placeholder">
                          {buildInitials(item.title)}
                        </div>
                      )}
                    </div>
                    <div className="ref-leader-copy">
                      <div className="ref-leader-name">{item.title}</div>
                      <div className="ref-leader-role">{item.meta}</div>
                      <p className="ref-leader-desc">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="proyectos-h2" className="ref-projects" id="proyectos">
          <div className="ref-container">
            <div className="ref-projects-header" data-fade-up="true">
              <span className="ref-eyebrow">{data.projectsSection.eyebrow}</span>
              <h2 className="ref-section-title" id="proyectos-h2">
                {data.projectsSection.title}
              </h2>
            </div>
            <div className="ref-projects-grid" role="list">
              {data.projectsSection.items.map((item) => (
                <article className="ref-project-card" data-fade-up="true" key={item.title} role="listitem">
                  <div className="ref-project-icon">{renderProjectIcon()}</div>
                  <div className="ref-project-name">{item.title}</div>
                  <div className="ref-project-detail">{item.detail}</div>
                </article>
              ))}
            </div>
            <div className="ref-stages" data-fade-up="true">
              <div className="ref-stages-label">{data.projectsSection.stagesLabel}</div>
              <div className="ref-stages-row">
                {data.projectsSection.stages.map((stage) => (
                  <div className="ref-stage" key={stage}>
                    {stage}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="certificaciones-h2" className="ref-certs" id="certificaciones">
          <div className="ref-container">
            <span className="ref-eyebrow" data-fade-up="true">
              {data.certificationsSection.eyebrow}
            </span>
            <h2 className="ref-section-title" data-fade-up="true" id="certificaciones-h2">
              {data.certificationsSection.title}
            </h2>
            <div className="ref-certs-grid">
              {data.certificationsSection.items.map((item) => (
                <article className="ref-cert-card" data-fade-up="true" key={item.title}>
                  <div className="ref-cert-icon">{renderFlatIcon(getCertificationIconName(item))}</div>
                  <div className="ref-cert-title">{item.title}</div>
                  <p className="ref-cert-desc">{item.description}</p>
                  {item.linkLabel && item.linkUrl ? (
                    <a className="ref-cert-link" href={item.linkUrl} rel="noreferrer noopener" target="_blank">
                      {item.linkLabel}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="contacto-h2" className="ref-contact" id="contacto">
          <div className="ref-container">
            <div className="ref-contact-grid">
              <div data-fade-up="true">
                <span className="ref-eyebrow">{data.contactSection.eyebrow}</span>
                <h2 className="ref-section-title" id="contacto-h2">
                  {data.contactSection.title}
                </h2>
                <div className="ref-contact-items">
                  {data.contactSection.cards.map((item) => (
                    <div className="ref-contact-item" key={`${item.label}-${item.value}`}>
                      <span className="ref-contact-icon">{renderFlatIcon(getContactIconName(item))}</span>
                      <div>
                        <div className="ref-contact-label">{item.label}</div>
                        <div className="ref-contact-value">
                          {splitTextLines(item.value).map((line, index) =>
                            item.href && (item.href.startsWith('mailto:') || item.href.startsWith('tel:')) ? (
                              <span key={`${line}-${index}`}>
                                <a href={index === 0 ? item.href : `tel:${line.replace(/[^\d+]/g, '')}`}>{line}</a>
                                {index < splitTextLines(item.value).length - 1 ? <br /> : null}
                              </span>
                            ) : (
                              <span key={`${line}-${index}`}>
                                {line}
                                {index < splitTextLines(item.value).length - 1 ? <br /> : null}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-fade-up="true">
                <div className="ref-form-wrap">
                  <div className="ref-form-title">{data.contactSection.formTitle}</div>
                  <ReferenceHomeContactForm
                    fields={data.contactSection.formFields}
                    successMessage={data.contactSection.formSuccessMessage}
                    submitLabel={data.contactSection.formButtonLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ref-footer" role="contentinfo">
        <div className="ref-container">
          <div className="ref-footer-inner">
            <div>
              <div className="ref-footer-brand-name">{data.brand.name}</div>
              <div className="ref-footer-brand-sub">{footerSubline}</div>
              <p className="ref-footer-desc">{data.footer.summary}</p>
              <div className="ref-footer-badge">{data.footer.badge}</div>
            </div>
            <div>
              <div className="ref-footer-col-title">Navegación</div>
              <ul className="ref-footer-links" role="list">
                {footerNavItems.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <a href={toHomeHref(item.href)}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ref-footer-col-title">Contacto</div>
              <ul className="ref-footer-links ref-footer-links-contact" role="list">
                {data.footer.contact.map((item) => (
                  <li key={`${item.label}-${item.value}`}>
                    {item.href ? (
                      <a href={item.href}>{item.value}</a>
                    ) : (
                      splitTextLines(item.value).map((line) => <span key={line}>{line}</span>)
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ref-footer-bottom">
            <div className="ref-footer-copy">{data.footer.copy}</div>
            <div className="ref-footer-legal">
              {data.footer.legal.map((item) => (
                <a href={toHomeHref(item.href)} key={`${item.label}-${item.href}`}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div aria-label="Contacto rápido" className="ref-float-buttons" role="complementary">
        <a
          className="ref-float-button ref-float-button-wa"
          href={data.contactSection.floatingActions.whatsapp.href}
          aria-label={data.contactSection.floatingActions.whatsapp.label}
          rel="noreferrer noopener"
          target="_blank"
        >
          {renderFlatIcon('whatsapp')}
          {cleanActionLabel(data.contactSection.floatingActions.whatsapp.label)}
        </a>
        <a
          aria-label={data.contactSection.floatingActions.phone.label}
          className="ref-float-button ref-float-button-phone"
          href={data.contactSection.floatingActions.phone.href}
        >
          {renderFlatIcon('phone')}
          {cleanActionLabel(data.contactSection.floatingActions.phone.label)}
        </a>
      </div>
    </div>
  )
}
