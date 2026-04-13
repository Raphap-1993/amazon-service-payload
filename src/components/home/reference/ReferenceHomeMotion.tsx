'use client'

import { useEffect } from 'react'

export function ReferenceHomeMotion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-fade-up]'))

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return null
}
