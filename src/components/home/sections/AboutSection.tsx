import Image from 'next/image'

import type { HomePageData } from '@/lib/home/types'

import { buildMediaObjectPosition } from '../primitives/mediaObjectPosition'
import { SectionHeading } from '../primitives/SectionHeading'

type AboutSectionProps = {
  section: HomePageData['aboutSection']
}

export function AboutSection({ section }: AboutSectionProps) {
  const featuredHighlight = section.highlights[0]
  const supportingHighlights = section.highlights.slice(1)
  const imageStyle = buildMediaObjectPosition(section.imageFocalX, section.imageFocalY)

  return (
    <section className="section section--light section--about" id="nosotros">
      <div className="container about-grid page-section__grid--media-centered">
        <div className="page-section__content page-section__content--about page-section__content--secondary">
          <div className="page-rich-copy page-rich-copy--intro page-rich-copy--about page-rich-copy--justified">
            <SectionHeading
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </div>

          {featuredHighlight ? (
            <div className="page-strip page-strip--about">
              <div className="page-strip__content page-strip__content--justified">
                <div className="page-strip__label">Perfil institucional</div>
                <p>{featuredHighlight}</p>
              </div>
            </div>
          ) : null}

          {supportingHighlights.length > 0 ? (
            <div className="page-card-grid page-card-grid--about-highlights">
              {supportingHighlights.map((item, index) => (
                <article className="page-card page-card--proof" key={item}>
                  <header>
                    <div className="card-meta">{String(index + 2).padStart(2, '0')}</div>
                  </header>
                  <p className="card-copy">{item}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>

        <figure className="about-media" aria-label={section.imageAlt}>
          {section.imageUrl ? (
            <Image
              alt={section.imageAlt}
              className="about-media__image"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
              style={imageStyle}
              src={section.imageUrl}
            />
          ) : (
            <div className="about-placeholder">{section.placeholderLabel}</div>
          )}
        </figure>
      </div>
    </section>
  )
}
