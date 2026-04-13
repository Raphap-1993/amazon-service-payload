const localBaseURL = process.env.LOCAL_BASE_URL || 'http://localhost:3004'

async function fetchJSON(pathname) {
  const response = await fetch(`${localBaseURL}${pathname}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${pathname}: ${response.status}`)
  }

  return response.json()
}

function relationID(value) {
  if (value && typeof value === 'object' && 'id' in value) {
    return value.id ?? null
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  return null
}

function mapLink(value) {
  if (!value) {
    return null
  }

  return {
    label: typeof value.label === 'string' ? value.label : '',
    url: typeof value.url === 'string' ? value.url : '',
    variant: typeof value.variant === 'string' ? value.variant : 'primary',
  }
}

function mapValueItems(items, withLabel = false) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => {
    const base = {
      value: typeof item?.value === 'string' ? item.value : '',
    }

    if (!withLabel) {
      return base
    }

    return {
      ...base,
      label: typeof item?.label === 'string' ? item.label : '',
    }
  })
}

function mapSimpleArray(items, mapper) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map(mapper)
}

function normalizeSiteSettings(raw) {
  return {
    siteName: raw.siteName || '',
    siteTagline: raw.siteTagline || '',
    shortName: raw.shortName || '',
    footerSubline: raw.footerSubline || '',
    logo: relationID(raw.logo),
    logoAlt: raw.logoAlt || '',
    siteDescription: raw.siteDescription || '',
    domain: raw.domain || '',
    contactEmail: raw.contactEmail || '',
    contactPhone: raw.contactPhone || '',
    address: raw.address || '',
    socialLinks: mapSimpleArray(raw.socialLinks, (item) => ({
      platform: typeof item?.platform === 'string' ? item.platform : '',
      url: typeof item?.url === 'string' ? item.url : '',
    })),
    branding: {
      primaryColor: raw.branding?.primaryColor || '',
      secondaryColor: raw.branding?.secondaryColor || '',
      accentColor: raw.branding?.accentColor || '',
    },
  }
}

function normalizeHeader(raw) {
  return {
    topbarText: raw.topbarText || '',
    navItems: mapSimpleArray(raw.navItems, (item) => ({
      label: typeof item?.label === 'string' ? item.label : '',
      url: typeof item?.url === 'string' ? item.url : '',
    })),
    supportLabel: raw.supportLabel || '',
    supportValue: raw.supportValue || '',
    cta: mapLink(raw.cta),
  }
}

function normalizeHomePage(raw) {
  return {
    hero: {
      eyebrow: raw.hero?.eyebrow || '',
      title: raw.hero?.title || '',
      subtitle: raw.hero?.subtitle || '',
      description: raw.hero?.description || '',
      regulationsLabel: raw.hero?.regulationsLabel || '',
      regulations: mapValueItems(raw.hero?.regulations),
      badgeNumber: raw.hero?.badgeNumber || '',
      badgeText: raw.hero?.badgeText || '',
      heroMedia: relationID(raw.hero?.heroMedia),
      primaryCta: mapLink(raw.hero?.primaryCta),
      secondaryCta: mapLink(raw.hero?.secondaryCta),
      trustItems: mapValueItems(raw.hero?.trustItems, true),
      slides: mapSimpleArray(raw.hero?.slides, (item) => ({
        label: typeof item?.label === 'string' ? item.label : '',
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        image: relationID(item?.image),
        alt: typeof item?.alt === 'string' ? item.alt : '',
        visualBadge: typeof item?.visualBadge === 'string' ? item.visualBadge : '',
        cornerLabel: typeof item?.cornerLabel === 'string' ? item.cornerLabel : '',
      })),
      visualBadge: raw.hero?.visualBadge || '',
      cornerLabel: raw.hero?.cornerLabel || '',
    },
    tickerSection: {
      items: mapSimpleArray(raw.tickerSection?.items, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        value: typeof item?.value === 'string' ? item.value : '',
      })),
    },
    statsBar: {
      items: mapValueItems(raw.statsBar?.items, true),
    },
    servicesSection: {
      eyebrow: raw.servicesSection?.eyebrow || '',
      title: raw.servicesSection?.title || '',
      description: raw.servicesSection?.description || '',
      secondaryDescription: raw.servicesSection?.secondaryDescription || '',
      imageCaption: raw.servicesSection?.imageCaption || '',
      image: relationID(raw.servicesSection?.image),
      items: mapSimpleArray(raw.servicesSection?.items, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
      })),
    },
    aboutSection: {
      eyebrow: raw.aboutSection?.eyebrow || '',
      title: raw.aboutSection?.title || '',
      description: raw.aboutSection?.description || '',
      secondaryDescription: raw.aboutSection?.secondaryDescription || '',
      imageCaption: raw.aboutSection?.imageCaption || '',
      image: relationID(raw.aboutSection?.image),
      secondaryImage: relationID(raw.aboutSection?.secondaryImage),
      highlights: mapValueItems(raw.aboutSection?.highlights),
    },
    capabilitiesSection: {
      eyebrow: raw.capabilitiesSection?.eyebrow || '',
      title: raw.capabilitiesSection?.title || '',
      description: raw.capabilitiesSection?.description || '',
      items: mapValueItems(raw.capabilitiesSection?.items),
      omaNumber: raw.capabilitiesSection?.omaNumber || '',
      omaLabel: raw.capabilitiesSection?.omaLabel || '',
      omaBody: raw.capabilitiesSection?.omaBody || '',
      regulationsLabel: raw.capabilitiesSection?.regulationsLabel || '',
      regulations: mapValueItems(raw.capabilitiesSection?.regulations),
    },
    missionVisionSection: {
      items: mapSimpleArray(raw.missionVisionSection?.items, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        label: typeof item?.label === 'string' ? item.label : '',
        text: typeof item?.text === 'string' ? item.text : '',
      })),
    },
    leadershipSection: {
      eyebrow: raw.leadershipSection?.eyebrow || '',
      title: raw.leadershipSection?.title || '',
      members: mapSimpleArray(raw.leadershipSection?.members, (item) => ({
        title: typeof item?.title === 'string' ? item.title : '',
        meta: typeof item?.meta === 'string' ? item.meta : '',
        description: typeof item?.description === 'string' ? item.description : '',
        photo: relationID(item?.photo),
        photoAlt: typeof item?.photoAlt === 'string' ? item.photoAlt : '',
      })),
    },
    certificationsSection: {
      eyebrow: raw.certificationsSection?.eyebrow || '',
      title: raw.certificationsSection?.title || '',
      description: raw.certificationsSection?.description || '',
      items: mapSimpleArray(raw.certificationsSection?.items, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        meta: typeof item?.meta === 'string' ? item.meta : '',
        linkLabel: typeof item?.linkLabel === 'string' ? item.linkLabel : '',
        document: relationID(item?.document),
        linkUrl: typeof item?.linkUrl === 'string' ? item.linkUrl : '',
      })),
    },
    projectsSection: {
      eyebrow: raw.projectsSection?.eyebrow || '',
      title: raw.projectsSection?.title || '',
      items: mapSimpleArray(raw.projectsSection?.items, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        title: typeof item?.title === 'string' ? item.title : '',
        detail: typeof item?.detail === 'string' ? item.detail : '',
      })),
      stagesLabel: raw.projectsSection?.stagesLabel || '',
      stages: mapValueItems(raw.projectsSection?.stages),
    },
    pricingSection: {
      eyebrow: raw.pricingSection?.eyebrow || '',
      title: raw.pricingSection?.title || '',
      description: raw.pricingSection?.description || '',
      items: mapSimpleArray(raw.pricingSection?.items, (item) => ({
        badge: typeof item?.badge === 'string' ? item.badge : '',
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        cta: mapLink(item?.cta),
      })),
    },
    industriesSection: {
      eyebrow: raw.industriesSection?.eyebrow || '',
      title: raw.industriesSection?.title || '',
      description: raw.industriesSection?.description || '',
      items: mapSimpleArray(raw.industriesSection?.items, (item) => ({
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        meta: typeof item?.meta === 'string' ? item.meta : '',
      })),
    },
    valuesSection: {
      eyebrow: raw.valuesSection?.eyebrow || '',
      title: raw.valuesSection?.title || '',
      description: raw.valuesSection?.description || '',
      items: mapSimpleArray(raw.valuesSection?.items, (item) => ({
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
      })),
    },
    ctaBanner: {
      title: raw.ctaBanner?.title || '',
      description: raw.ctaBanner?.description || '',
      primaryCta: mapLink(raw.ctaBanner?.primaryCta),
      secondaryCta: mapLink(raw.ctaBanner?.secondaryCta),
    },
    contactSection: {
      eyebrow: raw.contactSection?.eyebrow || '',
      title: raw.contactSection?.title || '',
      description: raw.contactSection?.description || '',
      formTitle: raw.contactSection?.formTitle || '',
      formDescription: raw.contactSection?.formDescription || '',
      formButtonLabel: raw.contactSection?.formButtonLabel || '',
      formSuccessMessage: raw.contactSection?.formSuccessMessage || '',
      cards: mapSimpleArray(raw.contactSection?.cards, (item) => ({
        icon: typeof item?.icon === 'string' ? item.icon : '',
        label: typeof item?.label === 'string' ? item.label : '',
        value: typeof item?.value === 'string' ? item.value : '',
        href: typeof item?.href === 'string' ? item.href : '',
        hrefLabel: typeof item?.hrefLabel === 'string' ? item.hrefLabel : '',
      })),
      formFields: mapSimpleArray(raw.contactSection?.formFields, (item) => ({
        label: typeof item?.label === 'string' ? item.label : '',
        name: typeof item?.name === 'string' ? item.name : '',
        placeholder: typeof item?.placeholder === 'string' ? item.placeholder : '',
        type: typeof item?.type === 'string' ? item.type : '',
      })),
      floatingActions: {
        whatsapp: mapLink(raw.contactSection?.floatingActions?.whatsapp),
        phone: mapLink(raw.contactSection?.floatingActions?.phone),
      },
    },
    seo: {
      metaTitle: raw.seo?.metaTitle || '',
      metaDescription: raw.seo?.metaDescription || '',
      canonicalUrl: raw.seo?.canonicalUrl || '',
      ogImage: relationID(raw.seo?.ogImage),
      noIndex: Boolean(raw.seo?.noIndex),
      schemaType: raw.seo?.schemaType || '',
    },
  }
}

const [siteSettings, header, homePage] = await Promise.all([
  fetchJSON('/api/globals/site-settings?depth=1'),
  fetchJSON('/api/globals/header?depth=1'),
  fetchJSON('/api/globals/home-page?depth=2'),
])

process.stdout.write(
  JSON.stringify(
    {
      siteSettings: normalizeSiteSettings(siteSettings),
      header: normalizeHeader(header),
      homePage: normalizeHomePage(homePage),
    },
    null,
    2,
  ),
)
