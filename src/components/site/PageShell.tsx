import type { CSSProperties } from 'react'
import type { HomePageData } from '@/lib/home/types'
import { getPublicThemeVars } from '@/lib/theme/publicTheme'

import { SiteFooter } from '@/components/home/sections/SiteFooter'
import { SiteHeader } from '@/components/home/sections/SiteHeader'
import { Topbar } from '@/components/home/sections/Topbar'

type SiteChromeData = Pick<
  HomePageData,
  'brand' | 'footer' | 'headerCta' | 'navItems' | 'supportLabel' | 'supportValue' | 'theme' | 'topbarText'
>

type PageShellProps = {
  children: React.ReactNode
  chrome: SiteChromeData
  className?: string
  mainClassName?: string
  shellTone?: 'default' | 'premium'
}

export function PageShell({ children, chrome, className, mainClassName, shellTone = 'default' }: PageShellProps) {
  return (
    <div
      className={['site-page-shell', `site-page-shell--${shellTone}`, className || '']
        .filter(Boolean)
        .join(' ')}
      data-shell-tone={shellTone}
      style={getPublicThemeVars(chrome.theme) as CSSProperties}
    >
      <Topbar
        supportLabel={chrome.supportLabel}
        supportValue={chrome.supportValue}
        topbarText={chrome.topbarText}
      />
      <SiteHeader brand={chrome.brand} cta={chrome.headerCta} navItems={chrome.navItems} />
      <main
        className={['site-page-main', mainClassName || ''].filter(Boolean).join(' ')}
        id="contenido-principal"
        tabIndex={-1}
      >
        {children}
      </main>
      <SiteFooter brand={chrome.brand} footer={chrome.footer} />
    </div>
  )
}
