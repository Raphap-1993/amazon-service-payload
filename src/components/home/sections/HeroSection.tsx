import type { HomePageData } from '@/lib/home/types'

import { HeroSectionInteractive } from './HeroSectionInteractive'

type HeroSectionProps = {
  hero: HomePageData['hero']
}

function buildFallbackSlides(hero: HomePageData['hero']) {
  const trustSummary = hero.trustItems
    .map((item) => `${item.value} ${item.label}`)
    .filter(Boolean)
    .join(' · ')

  return [
    {
      label: hero.eyebrow,
      title: hero.title,
      description: hero.description,
      imageAlt: hero.imageAlt,
      imageFocalX: hero.imageFocalX,
      imageFocalY: hero.imageFocalY,
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
    {
      label: 'Capacidad técnica',
      title: hero.subtitle || hero.cornerLabel,
      description: trustSummary || hero.description,
      imageAlt: hero.imageAlt,
      imageFocalX: hero.imageFocalX,
      imageFocalY: hero.imageFocalY,
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
    {
      label: 'Cobertura operativa',
      title: hero.visualBadge,
      description: hero.cornerLabel,
      imageAlt: hero.imageAlt,
      imageFocalX: hero.imageFocalX,
      imageFocalY: hero.imageFocalY,
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
  ].filter((slide) => slide.title && slide.description)
}

export function HeroSection({ hero }: HeroSectionProps) {
  const slides =
    Array.isArray(hero.slides) && hero.slides.length > 0 ? hero.slides : buildFallbackSlides(hero)

  return (
    <section className="hero" id="inicio">
      <div className="container">
        <HeroSectionInteractive hero={hero} slides={slides} />
      </div>
    </section>
  )
}
