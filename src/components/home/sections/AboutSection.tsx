import Image from 'next/image'

import type { HomePageData } from '@/lib/home/types'

import { SectionHeading } from '../primitives/SectionHeading'

type AboutSectionProps = {
  section: HomePageData['aboutSection']
}

export function AboutSection({ section }: AboutSectionProps) {
  return (
    <section className="section section--light section--about" id="nosotros">
      <div className="container about-grid">
        <div>
          <SectionHeading
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />

          <ul className="bullet-list">
            {section.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="about-media">
          {section.imageUrl ? (
            <Image
              alt={section.imageAlt}
              className="about-media__image"
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
              src={section.imageUrl}
            />
          ) : (
            <div className="about-placeholder">{section.placeholderLabel}</div>
          )}
        </div>
      </div>
    </section>
  )
}
