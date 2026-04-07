import type { HomePageData } from '@/lib/home/types'

import { SiteFooter } from '@/components/home/sections/SiteFooter'
import { SiteHeader } from '@/components/home/sections/SiteHeader'
import { Topbar } from '@/components/home/sections/Topbar'

type SiteChromeData = Pick<
  HomePageData,
  'brand' | 'footer' | 'headerCta' | 'navItems' | 'supportLabel' | 'supportValue' | 'topbarText'
>

type PageShellProps = {
  children: React.ReactNode
  chrome: SiteChromeData
}

export function PageShell({ children, chrome }: PageShellProps) {
  return (
    <main className="site-page-shell">
      <Topbar
        supportLabel={chrome.supportLabel}
        supportValue={chrome.supportValue}
        topbarText={chrome.topbarText}
      />
      <SiteHeader brand={chrome.brand} cta={chrome.headerCta} navItems={chrome.navItems} />
      {children}
      <SiteFooter brand={chrome.brand} footer={chrome.footer} />
    </main>
  )
}
