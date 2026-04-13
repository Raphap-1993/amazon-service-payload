'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { HomePageData } from '@/lib/home/types'

type ReferenceHomeHeaderProps = {
  brand: HomePageData['brand']
  cta: HomePageData['headerCta']
  phone: HomePageData['headerPhone']
  navItems: HomePageData['navItems']
}

const anchorMap: Record<string, string> = {
  '/': '#inicio',
  '/certificaciones': '#certificaciones',
  '/contacto': '#contacto',
  '/nosotros': '#nosotros',
  '/proyectos': '#proyectos',
  '/servicios': '#servicios',
}

function toHomeHref(href: string) {
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    return href
  }

  return anchorMap[href] || href
}

function renderLink(className: string, href: string, label: string, onClick?: () => void) {
  const resolvedHref = toHomeHref(href)

  if (resolvedHref.startsWith('/')) {
    return (
      <Link className={className} href={resolvedHref} onClick={onClick}>
        {label}
      </Link>
    )
  }

  return (
    <a className={className} href={resolvedHref} onClick={onClick}>
      {label}
    </a>
  )
}

export function ReferenceHomeHeader({ brand, cta, navItems, phone }: ReferenceHomeHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const primaryNavItems = navItems.filter((item) => item.label.toLowerCase() !== 'inicio').slice(0, 5)
  const ctaHref = toHomeHref(cta.href.startsWith('mailto:') ? '#contacto' : cta.href)

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`ref-nav ${isScrolled ? 'is-scrolled' : ''}`}
        id="main-nav"
      >
        <div className="ref-nav-inner">
          <a aria-label={`${brand.name} — Inicio`} className="ref-nav-logo" href="#inicio">
            {brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={brand.logoAlt || brand.name} src={brand.logoUrl} />
            ) : null}
          </a>

          <ul className="ref-nav-links" role="list">
            {primaryNavItems.map((item) => (
              <li key={`${item.label}-${item.href}`}>{renderLink('', item.href, item.label)}</li>
            ))}
          </ul>

          <div className="ref-nav-right">
            <span className="ref-nav-phone">{phone}</span>
            {renderLink('ref-btn ref-btn-primary ref-nav-cta', ctaHref, cta.label)}
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            className="ref-menu-toggle"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            <span>{isMenuOpen ? 'Cerrar' : 'Menú'}</span>
            <span aria-hidden="true" className="ref-menu-toggle-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!isMenuOpen}
        className={`ref-mobile-menu-backdrop ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div aria-hidden={!isMenuOpen} className={`ref-mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="ref-mobile-menu-header">
          <a aria-label={`${brand.name} — Inicio`} className="ref-mobile-menu-logo" href="#inicio" onClick={() => setIsMenuOpen(false)}>
            {brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={brand.logoAlt || brand.name} src={brand.logoUrl} />
            ) : null}
          </a>
          <button className="ref-mobile-menu-close" onClick={() => setIsMenuOpen(false)} type="button">
            Cerrar
          </button>
        </div>
        <nav className="ref-mobile-menu-nav" onClickCapture={() => setIsMenuOpen(false)}>
          {primaryNavItems.map((item) => (
            <div key={`${item.label}-${item.href}`}>{renderLink('ref-mobile-menu-link', item.href, item.label)}</div>
          ))}
        </nav>
        <div className="ref-mobile-menu-footer" onClickCapture={() => setIsMenuOpen(false)}>
          {renderLink('ref-btn ref-btn-primary ref-mobile-menu-cta', ctaHref, cta.label)}
        </div>
      </div>
    </>
  )
}
