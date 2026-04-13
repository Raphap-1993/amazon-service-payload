'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HOME_ROOT_SELECTOR = '[data-home-motion="true"]'
const INTRO_EASE = 'power2.out'
const SCROLL_EASE = 'power2.out'
const HOVER_EASE = 'power1.out'

function slow(value: number) {
  return Number(value.toFixed(2))
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
      root.querySelector('.hero-kicker'),
      root.querySelector('.hero-copy h1'),
      root.querySelector('.hero-copy__intro'),
      root.querySelector('.hero-copy__description'),
      root.querySelector('.hero-trust'),
      root.querySelector('.hero-actions'),
      root.querySelector('.hero-slider__meta-copy'),
      root.querySelector('.hero-slider__meta-controls'),
      root.querySelector('.hero-slider__card.is-active'),
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
    const ctx = gsap.context(() => {
      gsap.set(introTargets, { autoAlpha: 0, y: 6 })
      gsap.set(root.querySelector('.hero-visual'), { autoAlpha: 0, scale: 0.992, y: 10 })
      gsap.set(root.querySelector('.hero-frame'), { scale: 1.008 })

      const introTl = gsap.timeline({ defaults: { ease: INTRO_EASE } })

      introTl
        .to(root.querySelector('.topbar'), { autoAlpha: 1, y: 0, duration: slow(0.3) }, 0)
        .to(root.querySelector('.site-header'), { autoAlpha: 1, y: 0, duration: slow(0.34) }, 0.03)
        .to(root.querySelector('.hero-kicker'), { autoAlpha: 1, y: 0, duration: slow(0.34) }, 0.1)
        .to(root.querySelector('.hero-copy h1'), { autoAlpha: 1, y: 0, duration: slow(0.5) }, 0.14)
        .to(root.querySelector('.hero-copy__intro'), { autoAlpha: 1, y: 0, duration: slow(0.34) }, 0.2)
        .to(root.querySelector('.hero-copy__description'), { autoAlpha: 1, y: 0, duration: slow(0.34) }, 0.24)
        .to(root.querySelector('.hero-trust'), { autoAlpha: 1, y: 0, duration: slow(0.36) }, 0.28)
        .to(
          root.querySelector('.hero-actions'),
          { autoAlpha: 1, y: 0, duration: slow(0.36), clearProps: 'transform' },
          0.32,
        )
        .to(root.querySelector('.hero-slider__meta-copy'), { autoAlpha: 1, y: 0, duration: slow(0.38) }, 0.38)
        .to(root.querySelector('.hero-slider__meta-controls'), { autoAlpha: 1, y: 0, duration: slow(0.32) }, 0.42)
        .to(root.querySelector('.hero-slider__card.is-active'), { autoAlpha: 1, y: 0, duration: slow(0.38) }, 0.46)
        .to(
          root.querySelector('.hero-visual'),
          { autoAlpha: 1, y: 0, scale: 1, duration: slow(0.56), ease: INTRO_EASE },
          0.18,
        )
        .to(root.querySelector('.hero-frame'), { scale: 1, duration: slow(0.46), ease: INTRO_EASE }, 0.24)

      if (statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: slow(0.36),
            stagger: slow(0.04),
            ease: SCROLL_EASE,
            scrollTrigger: {
              trigger: root.querySelector('.stats-bar'),
              start: 'top 86%',
              once: true,
            },
          },
        )
      }

      gsap
        .utils.toArray<HTMLElement>(
          '.section-heading, .cta-banner h2, .contact-form h3, .page-card h3',
        )
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 6 },
            {
              autoAlpha: 1,
              y: 0,
              duration: slow(0.34),
              ease: SCROLL_EASE,
              scrollTrigger: {
                trigger: heading,
                start: 'top 90%',
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
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: slow(0.38),
                ease: SCROLL_EASE,
                stagger: slow(0.04),
                overwrite: true,
              },
            )
          },
        })
      }

      const heroVisual = root.querySelector('.hero-visual')
      if (heroVisual) {
        gsap.to(heroVisual, {
          yPercent: -0.7,
          ease: HOVER_EASE,
          scrollTrigger: {
            trigger: root.querySelector('.hero'),
            start: 'top top',
            end: 'bottom top',
            scrub: slow(0.55),
          },
        })
      }
    }, root)

    return () => ctx.revert()
  })

  return null
}
