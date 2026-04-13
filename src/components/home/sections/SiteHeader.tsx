'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'

import styles from './SiteHeader.module.css'

type SiteHeaderProps = {
  brand: HomePageData['brand']
  cta: HomePageData['headerCta']
  navItems: HomePageData['navItems']
}

function buildInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3)
}

function normalizePathname(pathname: string) {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

function isCurrentNavItem(pathname: string, href: string) {
  if (!href.startsWith('/')) {
    return false
  }

  const currentPath = normalizePathname(pathname)
  const itemPath = normalizePathname(href)

  if (itemPath === '/') {
    return currentPath === '/'
  }

  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}

export function SiteHeader({ brand, cta, navItems }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const hasLogo = Boolean(brand.logoUrl)
  const initials = buildInitials(brand.name)

  useEffect(() => {
    const closeMenuFrame = window.requestAnimationFrame(() => {
      setIsMenuOpen(false)
    })

    return () => window.cancelAnimationFrame(closeMenuFrame)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen || typeof document === 'undefined') {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    closeButtonRef.current?.focus()
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 781px)')
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    if (mediaQuery.matches) {
      window.requestAnimationFrame(() => {
        setIsMenuOpen(false)
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container ${styles.inner}`}>
        <Link
          aria-label={brand.name}
          className={hasLogo ? `brand-logo-link ${styles.brandLink}` : `brand-lockup ${styles.brandLink}`}
          href="/"
        >
          {brand.logoUrl ? (
            <Image
              alt={brand.logoAlt || brand.name}
              className="brand-logo"
              height={74}
              sizes="(max-width: 768px) 13rem, 17rem"
              src={brand.logoUrl}
              width={272}
            />
          ) : (
            <div className="brand-lockup__mark" aria-hidden="true">
              <span>{initials}</span>
            </div>
          )}

          {!hasLogo ? (
            <div className="brand-lockup__text">
              <strong>{brand.name}</strong>
              <span>{brand.tagline}</span>
            </div>
          ) : null}
        </Link>

        <div className={`site-nav ${styles.desktopNav}`}>
          <nav className="site-nav-links" aria-label="Principal">
            {navItems.map((item) => {
              const isActive = isCurrentNavItem(pathname, item.href)

              return (
                <ActionLink
                  ariaCurrent={isActive ? 'page' : undefined}
                  className="site-nav-link"
                  key={`${item.label}-${item.href}`}
                  link={item}
                />
              )
            })}
          </nav>

          <ActionLink link={cta} />
        </div>

        <button
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menu principal' : 'Abrir menu principal'}
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type="button"
        >
          <span className={styles.menuToggle__text}>{isMenuOpen ? 'Cerrar' : 'Menu'}</span>
          <span className={styles.menuToggle__icon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={styles.backdrop}
        data-open={isMenuOpen ? 'true' : 'false'}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        className={styles.mobileMenu}
        data-open={isMenuOpen ? 'true' : 'false'}
        id={menuId}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenu__header}>
          <div>
            <strong>{brand.name}</strong>
            <p>{brand.tagline}</p>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.mobileMenu__close}
            onClick={closeMenu}
            type="button"
          >
            Cerrar
          </button>
        </div>

        <nav className={styles.mobileMenu__nav} aria-label="Principal en mobile" onClickCapture={closeMenu}>
          {navItems.map((item) => {
            const isActive = isCurrentNavItem(pathname, item.href)

            return (
              <ActionLink
                ariaCurrent={isActive ? 'page' : undefined}
                className={styles.mobileMenu__link}
                key={`${item.label}-${item.href}`}
                link={item}
              />
            )
          })}
        </nav>

        <div className={styles.mobileMenu__footer} onClickCapture={closeMenu}>
          <ActionLink className={styles.mobileMenu__cta} link={cta} />
        </div>
      </div>
    </header>
  )
}
