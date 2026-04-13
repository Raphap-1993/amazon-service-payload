import type { PublicThemeData } from '../theme/publicTheme'

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
  imageFocalX?: number
  imageFocalY?: number
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
  icon?: string
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
  icon?: string
  label: string
  value: string
}

export type HomeServiceCardData = {
  description: string
  icon: string
  title: string
}

export type CapabilitySectionData = {
  description: string
  eyebrow: string
  items: string[]
  omaBody: string
  omaLabel: string
  omaNumber: string
  regulations: string[]
  regulationsLabel: string
  title: string
}

export type ProjectTileData = {
  detail: string
  icon: string
  title: string
}

export type ContactFormFieldData = {
  label: string
  name: string
  placeholder: string
  type: 'email' | 'text' | 'textarea'
}

export type FloatingActionData = {
  href: string
  label: string
}

export type FooterContactLinkData = {
  href?: string
  label: string
  value: string
}

export type MissionVisionItemData = {
  icon: string
  label: string
  text: string
}

export type HomeLeadershipMemberData = {
  description: string
  meta: string
  photoAlt: string
  photoUrl?: string
  title: string
}

export type HomePageData = {
  aboutSection: {
    description: string
    eyebrow: string
    highlights: string[]
    imageAlt: string
    imageCaption: string
    imageFocalX?: number
    imageFocalY?: number
    imageUrl?: string
    placeholderLabel: string
    secondaryImageAlt: string
    secondaryImageFocalX?: number
    secondaryImageFocalY?: number
    secondaryImageUrl?: string
    secondaryDescription: string
    title: string
  }
  brand: {
    footerSubline: string
    name: string
    logoAlt?: string
    logoUrl?: string
    shortName: string
    tagline: string
  }
  theme: PublicThemeData
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
  headerPhone: string
  hero: {
    actions: LinkData[]
    badgeNumber: string
    badgeText: string
    cornerLabel: string
    description: string
    eyebrow: string
    imageAlt: string
    imageFocalX?: number
    imageFocalY?: number
    imageUrl?: string
    regulations: string[]
    regulationsLabel: string
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
  leadershipSection: {
    eyebrow: string
    members: HomeLeadershipMemberData[]
    title: string
  }
  missionVisionSection: {
    items: MissionVisionItemData[]
  }
  capabilitiesSection: CapabilitySectionData
  navItems: LinkData[]
  pricingSection: {
    description: string
    eyebrow: string
    items: PricingCardData[]
    title: string
  }
  projectsSection: {
    eyebrow: string
    items: ProjectTileData[]
    stages: string[]
    stagesLabel: string
    title: string
  }
  services: ServiceData[]
  servicesSection: {
    description: string
    eyebrow: string
    imageAlt: string
    imageFocalX?: number
    imageFocalY?: number
    imageUrl?: string
    imageCaption: string
    items: HomeServiceCardData[]
    placeholderLabel: string
    secondaryDescription: string
    title: string
  }
  stats: StatData[]
  supportLabel: string
  supportValue: string
  tickerItems: {
    icon: string
    value: string
  }[]
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
    floatingActions: {
      phone: FloatingActionData
      whatsapp: FloatingActionData
    }
    formFields: ContactFormFieldData[]
    eyebrow: string
    formButtonLabel: string
    formDescription: string
    formTitle: string
    formSuccessMessage: string
    title: string
  }
}
