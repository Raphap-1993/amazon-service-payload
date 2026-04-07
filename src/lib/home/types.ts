export type LinkVariant = 'primary' | 'secondary'

export type LinkData = {
  href: string
  label: string
  variant?: LinkVariant
}

export type StatData = {
  label: string
  value: string
}

export type HeroSlideData = {
  cornerLabel: string
  description: string
  imageAlt: string
  imageUrl?: string
  label: string
  title: string
  visualBadge: string
}

export type ServiceData = {
  description: string
  href?: string
  meta: string
  title: string
}

export type GenericCardData = {
  description: string
  linkLabel?: string
  linkUrl?: string
  meta: string
  title: string
}

export type PricingCardData = {
  badge: string
  cta: LinkData
  description: string
  title: string
}

export type ContactCardData = {
  href?: string
  hrefLabel: string
  label: string
  value: string
}

export type FooterContactLinkData = {
  href?: string
  label: string
  value: string
}

export type HomePageData = {
  aboutSection: {
    description: string
    eyebrow: string
    highlights: string[]
    imageAlt: string
    imageUrl?: string
    placeholderLabel: string
    title: string
  }
  brand: {
    name: string
    logoAlt?: string
    logoUrl?: string
    tagline: string
  }
  certificationsSection: {
    description: string
    eyebrow: string
    items: GenericCardData[]
    title: string
  }
  ctaBanner: {
    actions: LinkData[]
    description: string
    title: string
  }
  footer: {
    badge: string
    contact: FooterContactLinkData[]
    copy: string
    legal: LinkData[]
    navigation: LinkData[]
    summary: string
  }
  headerCta: LinkData
  hero: {
    actions: LinkData[]
    cornerLabel: string
    description: string
    eyebrow: string
    imageAlt: string
    imageUrl?: string
    slides: HeroSlideData[]
    subtitle: string
    title: string
    trustItems: StatData[]
    visualBadge: string
  }
  industriesSection: {
    description: string
    eyebrow: string
    items: GenericCardData[]
    title: string
  }
  navItems: LinkData[]
  pricingSection: {
    description: string
    eyebrow: string
    items: PricingCardData[]
    title: string
  }
  services: ServiceData[]
  servicesSection: {
    description: string
    eyebrow: string
    title: string
  }
  stats: StatData[]
  supportLabel: string
  supportValue: string
  topbarText: string
  valuesSection: {
    description: string
    eyebrow: string
    items: {
      description: string
      title: string
    }[]
    title: string
  }
  contactSection: {
    cards: ContactCardData[]
    description: string
    eyebrow: string
    formButtonLabel: string
    formDescription: string
    formTitle: string
    title: string
  }
}
