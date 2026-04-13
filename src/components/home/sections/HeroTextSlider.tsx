'use client'

import type { FocusEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { HeroSlideData } from '@/lib/home/types'

type HeroTextSliderProps = {
  activeIndex: number
  onSlideChange: (index: number) => void
  slides: HeroSlideData[]
}

const SLIDE_INTERVAL_MS = 9200

function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function formatSlideNumber(value: number) {
  return String(value).padStart(2, '0')
}

export function HeroTextSlider({ activeIndex, onSlideChange, slides }: HeroTextSliderProps) {
  const [isPaused, setIsPaused] = useState(false)
  const activeSlide = useMemo(() => slides[activeIndex] || slides[0], [activeIndex, slides])
  const hasMultipleSlides = slides.length > 1

  useEffect(() => {
    if (!hasMultipleSlides || prefersReducedMotion() || isPaused) {
      return
    }

    const timer = window.setTimeout(() => {
      onSlideChange((activeIndex + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, hasMultipleSlides, isPaused, onSlideChange, slides.length])

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return
    }

    setIsPaused(false)
  }

  return (
    <div
      className="hero-slider"
      data-hero-slider="true"
      aria-roledescription="carousel"
      aria-label="Capacidades destacadas del hero"
      onBlurCapture={handleBlur}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider__meta">
        <div className="hero-slider__meta-copy" aria-live="polite" aria-atomic="true">
          <p className="hero-slider__eyebrow">Capacidades de taller</p>
          {activeSlide?.title ? <p className="hero-slider__headline">{activeSlide.title}</p> : null}
          {activeSlide?.description ? <p className="hero-slider__summary">{activeSlide.description}</p> : null}
        </div>

        {hasMultipleSlides ? (
          <div className="hero-slider__meta-controls">
            <p
              aria-label={`Capacidad ${activeIndex + 1} de ${slides.length}`}
              className="hero-slider__counter"
            >
              {formatSlideNumber(activeIndex + 1)}/{formatSlideNumber(slides.length)}
            </p>

            <div className="hero-slider__arrows" aria-label="Controles del slider">
              <button
                aria-label="Ver capacidad anterior"
                className="hero-slider__arrow"
                onClick={() => onSlideChange((activeIndex - 1 + slides.length) % slides.length)}
                type="button"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                aria-label="Ver capacidad siguiente"
                className="hero-slider__arrow"
                onClick={() => onSlideChange((activeIndex + 1) % slides.length)}
                type="button"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hero-slider__cards" aria-label="Capacidades destacadas del hero">
        {slides.map((slide, index) => (
          <button
            aria-label={`Ver capacidad ${index + 1}: ${slide.label}`}
            aria-pressed={activeIndex === index}
            className={activeIndex === index ? 'hero-slider__card is-active' : 'hero-slider__card'}
            key={`${slide.label}-${slide.title}`}
            onClick={() => onSlideChange(index)}
            type="button"
          >
            <span className="hero-slider__card-kicker">{slide.label}</span>
            <strong className="hero-slider__card-title">{slide.title}</strong>
            <span className="hero-slider__card-description">{slide.visualBadge || slide.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
