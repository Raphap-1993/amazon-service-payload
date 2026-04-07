import type { HomePageData } from '@/lib/home/types'

import { AboutSection } from './sections/AboutSection'
import { CertificationsSection } from './sections/CertificationsSection'
import { ContactSection } from './sections/ContactSection'
import { CtaBanner } from './sections/CtaBanner'
import { HeroSection } from './sections/HeroSection'
import { IndustriesSection } from './sections/IndustriesSection'
import { PricingSection } from './sections/PricingSection'
import { ServicesSection } from './sections/ServicesSection'
import { SiteFooter } from './sections/SiteFooter'
import { SiteHeader } from './sections/SiteHeader'
import { StatsBar } from './sections/StatsBar'
import { Topbar } from './sections/Topbar'
import { ValuesSection } from './sections/ValuesSection'
import { HomeMotion } from './HomeMotion'

type HomePageViewProps = {
  data: HomePageData
}

export function HomePageView({ data }: HomePageViewProps) {
  return (
    <main className="home-shell" data-home-motion="true">
      <HomeMotion />
      <Topbar
        supportLabel={data.supportLabel}
        supportValue={data.supportValue}
        topbarText={data.topbarText}
      />
      <SiteHeader brand={data.brand} cta={data.headerCta} navItems={data.navItems} />
      <HeroSection hero={data.hero} />
      <StatsBar items={data.stats} />
      <ServicesSection section={data.servicesSection} services={data.services} />
      <AboutSection section={data.aboutSection} />
      <CertificationsSection section={data.certificationsSection} />
      <PricingSection section={data.pricingSection} />
      <IndustriesSection section={data.industriesSection} />
      <ValuesSection section={data.valuesSection} />
      <CtaBanner section={data.ctaBanner} />
      <ContactSection section={data.contactSection} />
      <SiteFooter brand={data.brand} footer={data.footer} />
    </main>
  )
}
