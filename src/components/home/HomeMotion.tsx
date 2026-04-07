'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HOME_ROOT_SELECTOR = '[data-home-motion="true"]'
const SLOWDOWN_FACTOR = 1.56

function slow(value: number) {
  return Number((value * SLOWDOWN_FACTOR).toFixed(2))
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function HomeMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(HOME_ROOT_SELECTOR)

    if (!root || prefersReducedMotion()) {
      return
    }

    const introTargets = [
      root.querySelector('.topbar'),
      root.querySelector('.site-header'),
      root.querySelector('.hero .eyebrow'),
      root.querySelector('.hero-slider__slide.is-active .hero-slider__title'),
      root.querySelector('.hero-slider__slide.is-active .hero-slider__label'),
      root.querySelector('.hero-slider__slide.is-active .hero-slider__description'),
      root.querySelector('.hero-actions'),
      root.querySelector('.hero-trust'),
      root.querySelector('.hero-visual'),
    ].filter(Boolean) as Element[]

    const statItems = Array.from(root.querySelectorAll('.stats-bar .metric'))
    const cards = Array.from(
      root.querySelectorAll(
        [
          '.service-card',
          '.cert-card',
          '.pricing-card',
          '.industry-card',
          '.value-card',
          '.contact-card',
          '.contact-form',
          '.page-card',
        ].join(', '),
      ),
    )
    const sectionBlocks = Array.from(root.querySelectorAll('.stats-bar, .section, .cta-wrap'))

    const ctx = gsap.context(() => {
      gsap.set(introTargets, { autoAlpha: 0, y: 18 })
      gsap.set(root.querySelector('.hero-visual'), { scale: 0.985, y: 14 })
      gsap.set(root.querySelector('.hero-frame'), { scale: 1.02 })

      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      introTl
        .to(root.querySelector('.topbar'), { autoAlpha: 1, y: 0, duration: slow(0.4) }, 0)
        .to(root.querySelector('.site-header'), { autoAlpha: 1, y: 0, duration: slow(0.45) }, 0.04)
        .to(root.querySelector('.hero .eyebrow'), { autoAlpha: 1, y: 0, duration: slow(0.45) }, 0.12)
        .to(root.querySelector('.hero-slider__slide.is-active .hero-slider__title'), { autoAlpha: 1, y: 0, duration: slow(0.7) }, 0.18)
        .to(root.querySelector('.hero-slider__slide.is-active .hero-slider__label'), { autoAlpha: 1, y: 0, duration: slow(0.5) }, 0.28)
        .to(root.querySelector('.hero-slider__slide.is-active .hero-slider__description'), { autoAlpha: 1, y: 0, duration: slow(0.5) }, 0.34)
        .to(
          root.querySelector('.hero-actions'),
          { autoAlpha: 1, y: 0, duration: slow(0.5), clearProps: 'transform' },
          0.4,
        )
        .to(root.querySelector('.hero-trust'), { autoAlpha: 1, y: 0, duration: slow(0.5) }, 0.48)
        .to(
          root.querySelector('.hero-visual'),
          { autoAlpha: 1, y: 0, scale: 1, duration: slow(0.85), ease: 'power2.out' },
          0.22,
        )
        .to(root.querySelector('.hero-frame'), { scale: 1, duration: slow(0.7) }, 0.28)

      if (statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: slow(0.7),
            stagger: slow(0.08),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root.querySelector('.stats-bar'),
              start: 'top 82%',
            },
          },
        )
      }

      sectionBlocks
        .filter((block) => !block.classList.contains('stats-bar'))
        .forEach((block) => {
          gsap.fromTo(
            block,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: slow(0.8),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 84%',
                once: true,
              },
            },
          )
        })

      gsap
        .utils.toArray<HTMLElement>(
          '.section-heading, .cta-banner h2, .contact-form h3, .page-card h3',
        )
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: slow(0.65),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                once: true,
              },
            },
          )
        })

      if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 20, scale: 0.985 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: slow(0.65),
                ease: 'power3.out',
                stagger: slow(0.08),
                overwrite: true,
              },
            )
          },
        })
      }

      const heroVisual = root.querySelector('.hero-visual')
      if (heroVisual) {
        gsap.to(heroVisual, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.querySelector('.hero'),
            start: 'top top',
            end: 'bottom top',
            scrub: slow(0.7),
          },
        })
      }
    }, root)

    return () => ctx.revert()
  })

  return null
}
