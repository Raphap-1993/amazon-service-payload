import Link from 'next/link'

import type { HomePageData } from '@/lib/home/types'

import { ActionLink } from '../primitives/ActionLink'

type SiteHeaderProps = {
  brand: HomePageData['brand']
  cta: HomePageData['headerCta']
  navItems: HomePageData['navItems']
}

export function SiteHeader({ brand, cta, navItems }: SiteHeaderProps) {
  const hasLogo = Boolean(brand.logoUrl)
  const initials = brand.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3)

  return (
    <header className="site-header">
      <div className="container">
        <Link aria-label={brand.name} className={hasLogo ? 'brand-logo-link' : 'brand-lockup'} href="/">
          {brand.logoUrl ? (
            <img alt={brand.logoAlt || brand.name} className="brand-logo" src={brand.logoUrl} />
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

        <div className="site-nav">
          <nav className="site-nav-links" aria-label="Principal">
            {navItems.map((item) => (
              <ActionLink className="site-nav-link" key={`${item.label}-${item.href}`} link={item} />
            ))}
          </nav>

          <ActionLink link={cta} />
        </div>
      </div>
    </header>
  )
}
