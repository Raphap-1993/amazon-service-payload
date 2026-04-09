'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { HeroTextSlider } from './HeroTextSlider'

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
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
    {
      label: 'Capacidad técnica',
      title: hero.subtitle || hero.cornerLabel,
      description: trustSummary || hero.description,
      imageAlt: hero.imageAlt,
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
    {
      label: 'Cobertura operativa',
      title: hero.visualBadge,
      description: hero.cornerLabel,
      imageAlt: hero.imageAlt,
      imageUrl: hero.imageUrl,
      visualBadge: hero.visualBadge,
      cornerLabel: hero.cornerLabel,
    },
  ].filter((slide) => slide.title && slide.description)
}

export function HeroSection({ hero }: HeroSectionProps) {
  const slides = useMemo(
    () => (Array.isArray(hero.slides) && hero.slides.length > 0 ? hero.slides : buildFallbackSlides(hero)),
    [hero],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex] || slides[0]

  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <HeroTextSlider activeIndex={activeIndex} onSlideChange={setActiveIndex} slides={slides} />

          <div className="hero-actions">
            {hero.actions.map((link) => (
              <ActionLink key={`${link.label}-${link.href}`} link={link} />
            ))}
          </div>

          <div className="hero-trust">
            {hero.trustItems.map((item) => (
              <div className="trust-chip" key={`${item.label}-${item.value}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual__badge">{activeSlide?.visualBadge || hero.visualBadge}</div>
          <div className="hero-frame">
            {slides.some((slide) => slide.imageUrl) ? (
              <div className="hero-media-stack">
                {slides.map((slide, index) =>
                  slide.imageUrl ? (
                    <div
                      className={activeIndex === index ? 'hero-media--layer is-active' : 'hero-media--layer'}
                      key={`${slide.title}-${index}`}
                    >
                      <Image
                        alt={slide.imageAlt || hero.imageAlt}
                        className="hero-media"
                        fill
                        sizes="(max-width: 960px) 100vw, 46vw"
                        src={slide.imageUrl}
                      />
                    </div>
                  ) : (
                    <div
                      className={activeIndex === index ? 'hero-placeholder hero-placeholder--layer is-active' : 'hero-placeholder hero-placeholder--layer'}
                      key={`${slide.title}-${index}`}
                      role="presentation"
                    >
                      <div className="hero-placeholder-grid">
                        <div className="hero-panel hero-panel--strong" />
                        <div className="hero-panel" />
                        <div className="hero-panel" />
                        <div className="hero-panel hero-panel--strong" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="hero-placeholder" role="presentation">
                <div className="hero-placeholder-grid">
                  <div className="hero-panel hero-panel--strong" />
                  <div className="hero-panel" />
                  <div className="hero-panel" />
                  <div className="hero-panel hero-panel--strong" />
                </div>
              </div>
            )}
          </div>
          <div className="hero-visual__corner">{activeSlide?.cornerLabel || hero.cornerLabel}</div>
        </div>
      </div>
    </section>
  )
}
