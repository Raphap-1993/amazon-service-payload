'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { HeroSlideData, HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'
import { buildMediaObjectPosition } from '../primitives/mediaObjectPosition'
import { HeroTextSlider } from './HeroTextSlider'

type HeroSectionInteractiveProps = {
  hero: HomePageData['hero']
  slides: HeroSlideData[]
}

export function HeroSectionInteractive({ hero, slides }: HeroSectionInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasTransitioned, setHasTransitioned] = useState(false)
  const activeSlide = slides[activeIndex] || slides[0]
  const shouldAnimateCopy = hasTransitioned
  const trustItems = hero.trustItems.slice(0, 3)

  const handleSlideChange = (index: number) => {
    if (!hasTransitioned) {
      setHasTransitioned(true)
    }

    setActiveIndex(index)
  }

  return (
    <>
      <div className="hero-copy" aria-live="polite" aria-atomic="true">
        <div className="hero-kicker">
          <span className="hero-kicker__dot" aria-hidden="true" />
          <span>{hero.eyebrow}</span>
        </div>
        <h1 data-hero-swap={shouldAnimateCopy ? 'true' : undefined} key={`hero-title-${activeIndex}`}>
          {hero.title}
        </h1>
        <p
          className="hero-copy__intro"
          data-hero-swap={shouldAnimateCopy ? 'true' : undefined}
          key={`hero-intro-${activeIndex}`}
        >
          {hero.subtitle}
        </p>

        <p className="hero-copy__description">{hero.description}</p>

        {trustItems.length > 0 ? (
          <div className="hero-trust" aria-label="Pruebas de confianza">
            {trustItems.map((item) => (
              <article className="hero-trust__item" key={`${item.value}-${item.label}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        ) : null}

        <div className="hero-actions">
          {hero.actions.map((link, index) => (
            <ActionLink
              key={`${link.label}-${link.href}`}
              link={link}
              size={index === 0 ? 'lg' : 'md'}
              tone={index === 0 ? 'default' : 'subtle'}
            />
          ))}
        </div>
      </div>

      <div className="hero-visual" aria-label="Visual principal del hero">
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
                      style={buildMediaObjectPosition(slide.imageFocalX, slide.imageFocalY)}
                      src={slide.imageUrl}
                    />
                  </div>
                ) : (
                  <div
                    className={
                      activeIndex === index
                        ? 'hero-placeholder hero-placeholder--layer is-active'
                        : 'hero-placeholder hero-placeholder--layer'
                    }
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

      <div className="hero-slider-wrap">
        <HeroTextSlider activeIndex={activeIndex} onSlideChange={handleSlideChange} slides={slides} />
      </div>
    </>
  )
}
