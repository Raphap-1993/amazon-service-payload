'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import type { HeroSlideData } from '@/lib/home/types'

type HeroTextSliderProps = {
  activeIndex: number
  onSlideChange: (index: number) => void
  slides: HeroSlideData[]
}

const SLIDE_INTERVAL_MS = 9880
const SLIDER_SLOWDOWN_FACTOR = 1.3

function slow(value: number) {
  return Number((value * SLIDER_SLOWDOWN_FACTOR).toFixed(2))
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function HeroTextSlider({ activeIndex, onSlideChange, slides }: HeroTextSliderProps) {
  const initializedRef = useRef(false)
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion()) {
      return
    }

    const timer = window.setInterval(() => {
      onSlideChange((activeIndex + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [activeIndex, onSlideChange, slides.length])

  useGSAP(
    () => {
      const activeSlide = stageRef.current?.querySelector<HTMLElement>('.hero-slider__slide.is-active')
      const targets = activeSlide
        ? Array.from(
            activeSlide.querySelectorAll<HTMLElement>(
              '.hero-slider__label, .hero-slider__title, .hero-slider__description',
            ),
          )
        : []

      if (targets.length === 0) {
        return
      }

      if (!initializedRef.current || prefersReducedMotion()) {
        initializedRef.current = true
        return
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: slow(0.82),
          stagger: slow(0.08),
          ease: 'power3.out',
          clearProps: 'transform',
        },
      )
    },
    { dependencies: [activeIndex], scope: stageRef },
  )

  return (
    <div className="hero-slider" data-hero-slider="true">
      <div className="hero-slider__stage" ref={stageRef}>
        {slides.map((slide, index) => (
          <article
            aria-hidden={activeIndex !== index}
            className={activeIndex === index ? 'hero-slider__slide is-active' : 'hero-slider__slide'}
            key={`${slide.label}-${slide.title}-${index}`}
          >
            <p className="hero-subtitle hero-slider__label">{slide.label}</p>
            <h1 className="hero-slider__title">{slide.title}</h1>
            <p className="body-copy hero-slider__description">{slide.description}</p>
          </article>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="hero-slider__nav" aria-label="Mensajes destacados del hero">
          {slides.map((slide, index) => (
            <button
              aria-label={`Ver mensaje ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={activeIndex === index ? 'hero-slider__dot is-active' : 'hero-slider__dot'}
              key={`${slide.label}-${slide.title}`}
              onClick={() => onSlideChange(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
