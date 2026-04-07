import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type {
  ContactCardData,
  FooterContactLinkData,
  HeroSlideData,
  HomePageData,
  LinkData,
} from './types'
import { defaultHomeData } from './defaultHomeData'

/* eslint-disable @typescript-eslint/no-explicit-any -- Payload generated types remain pending while config ESM resolution is stabilized. */

const legacyRouteMap: Record<string, string> = {
  '#inicio': '/',
  '#servicios': '/servicios',
  '#capacidades': '/servicios',
  '#nosotros': '/nosotros',
  '#proyectos': '/proyectos',
  '#certificaciones': '/certificaciones',
  '#contacto': '/contacto',
}

function normalizeHref(href: string): string {
  return legacyRouteMap[href] || href
}

function mapLink(link: unknown, fallback: LinkData): LinkData {
  if (!link || typeof link !== 'object') {
    return fallback
  }

  const label = 'label' in link && typeof link.label === 'string' && link.label ? link.label : fallback.label
  const href =
    'url' in link && typeof link.url === 'string' && link.url
      ? normalizeHref(link.url)
      : normalizeHref(fallback.href)
  const variant =
    'variant' in link && (link.variant === 'primary' || link.variant === 'secondary')
      ? link.variant
      : fallback.variant

  return { label, href, variant }
}

function mapMedia(media: unknown): { alt: string; url?: string } {
  if (!media || typeof media !== 'object') {
    return { alt: '' }
  }

  const url = 'url' in media && typeof media.url === 'string' ? media.url : undefined
  const alt = 'alt' in media && typeof media.alt === 'string' ? media.alt : ''

  return { alt, url }
}

function mapHeroSlide(item: unknown, fallback: HeroSlideData): HeroSlideData {
  if (!item || typeof item !== 'object') {
    return fallback
  }

  const image = 'image' in item ? mapMedia(item.image) : { alt: '', url: undefined }

  return {
    label: 'label' in item && typeof item.label === 'string' && item.label ? item.label : fallback.label,
    title: 'title' in item && typeof item.title === 'string' && item.title ? item.title : fallback.title,
    description:
      'description' in item && typeof item.description === 'string' && item.description
        ? item.description
        : fallback.description,
    imageAlt:
      ('alt' in item && typeof item.alt === 'string' && item.alt && item.alt) ||
      image.alt ||
      fallback.imageAlt,
    imageUrl: image.url || fallback.imageUrl,
    visualBadge:
      'visualBadge' in item && typeof item.visualBadge === 'string' && item.visualBadge
        ? item.visualBadge
        : fallback.visualBadge,
    cornerLabel:
      'cornerLabel' in item && typeof item.cornerLabel === 'string' && item.cornerLabel
        ? item.cornerLabel
        : fallback.cornerLabel,
  }
}

function buildDefaultContactCards(siteSettings: unknown): ContactCardData[] {
  const settings = siteSettings as
    | {
        address?: unknown
        contactEmail?: unknown
        contactPhone?: unknown
      }
    | undefined

  const email =
    typeof settings?.contactEmail === 'string' && settings.contactEmail
      ? settings.contactEmail
      : defaultHomeData.contactSection.cards[0].value
  const phone =
    typeof settings?.contactPhone === 'string' && settings.contactPhone
      ? settings.contactPhone
      : defaultHomeData.contactSection.cards[1].value
  const address =
    typeof settings?.address === 'string' && settings.address
      ? settings.address
      : defaultHomeData.contactSection.cards[2].value

  return [
    {
      label: defaultHomeData.contactSection.cards[0].label,
      value: email,
      href: `mailto:${email}`,
      hrefLabel: defaultHomeData.contactSection.cards[0].hrefLabel,
    },
    {
      label: defaultHomeData.contactSection.cards[1].label,
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      hrefLabel: defaultHomeData.contactSection.cards[1].hrefLabel,
    },
    {
      label: defaultHomeData.contactSection.cards[2].label,
      value: address,
      hrefLabel: defaultHomeData.contactSection.cards[2].hrefLabel,
    },
  ]
}

function mapContactCard(item: unknown, fallback: ContactCardData): ContactCardData {
  if (!item || typeof item !== 'object') {
    return fallback
  }

  const href =
    'url' in item && typeof item.url === 'string' && item.url
      ? normalizeHref(item.url)
      : fallback.href

  return {
    label: 'label' in item && typeof item.label === 'string' && item.label ? item.label : fallback.label,
    value: 'value' in item && typeof item.value === 'string' && item.value ? item.value : fallback.value,
    href,
    hrefLabel:
      'ctaLabel' in item && typeof item.ctaLabel === 'string' && item.ctaLabel
        ? item.ctaLabel
        : href
          ? fallback.hrefLabel
          : '',
  }
}

function buildDefaultFooterContact(siteSettings: unknown): FooterContactLinkData[] {
  const defaults = defaultHomeData.footer.contact
  const derivedCards = buildDefaultContactCards(siteSettings)

  return defaults.map((item: FooterContactLinkData, index: number) => ({
    label: item.label,
    value: derivedCards[index]?.value || item.value,
    href: derivedCards[index]?.href || item.href,
  }))
}

function mapFooterContactLink(item: unknown, fallback: FooterContactLinkData): FooterContactLinkData {
  if (!item || typeof item !== 'object') {
    return fallback
  }

  return {
    label: 'label' in item && typeof item.label === 'string' && item.label ? item.label : fallback.label,
    value: 'value' in item && typeof item.value === 'string' && item.value ? item.value : fallback.value,
    href:
      'url' in item && typeof item.url === 'string' && item.url
        ? normalizeHref(item.url)
        : fallback.href,
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config: await configPromise })

    const [rawSiteSettings, rawHeader, rawFooter, rawHomePage, rawContactPage, rawServices] =
      await Promise.all([
        payload.findGlobal({ slug: 'site-settings', depth: 1 }),
        payload.findGlobal({ slug: 'header', depth: 1 }),
        payload.findGlobal({ slug: 'footer', depth: 1 }),
        payload.findGlobal({ slug: 'home-page', depth: 2 }),
        payload.findGlobal({ slug: 'contact-page', depth: 1 }),
        payload.find({
          collection: 'services',
          depth: 1,
          limit: 6,
          sort: 'title',
          where: {
            published: {
              equals: true,
            },
          },
        }),
      ])

    const siteSettings = rawSiteSettings as any
    const header = rawHeader as any
    const footer = rawFooter as any
    const homePage = rawHomePage as any
    const contactPage = rawContactPage as any
    const servicesDocs = Array.isArray((rawServices as any)?.docs) ? (rawServices as any).docs : []

    const heroMedia = mapMedia(homePage?.hero?.heroMedia)
    const aboutMedia = mapMedia(homePage?.aboutSection?.image)
    const logoMedia = mapMedia(siteSettings?.logo)
    const defaultContactCards = buildDefaultContactCards(siteSettings)
    const defaultFooterContact = buildDefaultFooterContact(siteSettings)
    const heroSlides =
      Array.isArray(homePage?.hero?.slides) && homePage.hero.slides.length > 0
        ? homePage.hero.slides.map((item: any, index: number) =>
            mapHeroSlide(item, {
              label: defaultHomeData.hero.slides[index]?.label || defaultHomeData.hero.eyebrow,
              title: defaultHomeData.hero.slides[index]?.title || defaultHomeData.hero.title,
              description:
                defaultHomeData.hero.slides[index]?.description || defaultHomeData.hero.description,
              imageAlt:
                defaultHomeData.hero.slides[index]?.imageAlt || defaultHomeData.hero.imageAlt,
              imageUrl: defaultHomeData.hero.slides[index]?.imageUrl,
              visualBadge:
                defaultHomeData.hero.slides[index]?.visualBadge ||
                defaultHomeData.hero.visualBadge,
              cornerLabel:
                defaultHomeData.hero.slides[index]?.cornerLabel ||
                defaultHomeData.hero.cornerLabel,
            }),
          )
        : defaultHomeData.hero.slides
    const aboutFallbackMedia =
      aboutMedia.url || heroSlides.find((slide) => slide.imageUrl)?.imageUrl || heroMedia.url
    const aboutFallbackAlt =
      aboutMedia.alt || heroSlides.find((slide) => slide.imageAlt)?.imageAlt || heroMedia.alt
    const orderedServices = [...servicesDocs].sort((left: any, right: any) => {
      const leftOrder = typeof left.homeOrder === 'number' ? left.homeOrder : Number.MAX_SAFE_INTEGER
      const rightOrder =
        typeof right.homeOrder === 'number' ? right.homeOrder : Number.MAX_SAFE_INTEGER

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return (left.title || '').localeCompare(right.title || '')
    })

    return {
      topbarText: header?.topbarText || defaultHomeData.topbarText,
      supportLabel:
        (typeof header?.supportLabel === 'string' && header.supportLabel) ||
        defaultHomeData.supportLabel,
      supportValue:
        (typeof header?.supportValue === 'string' && header.supportValue) ||
        defaultHomeData.supportValue,
      brand: {
        name:
          (typeof siteSettings?.siteName === 'string' && siteSettings.siteName) ||
          defaultHomeData.brand.name,
        logoAlt:
          logoMedia.alt ||
          (typeof siteSettings?.logoAlt === 'string' && siteSettings.logoAlt) ||
          defaultHomeData.brand.logoAlt,
        logoUrl: logoMedia.url,
        tagline:
          (typeof siteSettings?.siteTagline === 'string' && siteSettings.siteTagline) ||
          defaultHomeData.brand.tagline,
      },
      navItems:
        Array.isArray(header?.navItems) && header.navItems.length > 0
          ? header.navItems.map((item: any, index: number) =>
              mapLink(item, defaultHomeData.navItems[index] || defaultHomeData.navItems[0]),
            )
          : defaultHomeData.navItems,
      headerCta: mapLink(header?.cta, defaultHomeData.headerCta),
      hero: {
        eyebrow: homePage?.hero?.eyebrow || defaultHomeData.hero.eyebrow,
        title: homePage?.hero?.title || defaultHomeData.hero.title,
        subtitle: homePage?.hero?.subtitle || defaultHomeData.hero.subtitle,
        description: homePage?.hero?.description || defaultHomeData.hero.description,
        actions: [
          mapLink(homePage?.hero?.primaryCta, defaultHomeData.hero.actions[0]),
          mapLink(homePage?.hero?.secondaryCta, defaultHomeData.hero.actions[1]),
        ],
        trustItems:
          Array.isArray(homePage?.hero?.trustItems) && homePage.hero.trustItems.length > 0
            ? homePage.hero.trustItems.map((item: any, index: number) => ({
                value:
                  (typeof item?.value === 'string' && item.value) ||
                  defaultHomeData.hero.trustItems[index]?.value ||
                  defaultHomeData.hero.trustItems[0].value,
                label:
                  (typeof item?.label === 'string' && item.label) ||
                  defaultHomeData.hero.trustItems[index]?.label ||
                  defaultHomeData.hero.trustItems[0].label,
              }))
            : defaultHomeData.hero.trustItems,
        visualBadge:
          (typeof homePage?.hero?.visualBadge === 'string' && homePage.hero.visualBadge) ||
          defaultHomeData.hero.visualBadge,
        cornerLabel:
          (typeof homePage?.hero?.cornerLabel === 'string' && homePage.hero.cornerLabel) ||
          defaultHomeData.hero.cornerLabel,
        imageAlt: heroMedia.alt || defaultHomeData.hero.imageAlt,
        imageUrl: heroMedia.url,
        slides: heroSlides,
      },
      stats:
        Array.isArray(homePage?.statsBar?.items) && homePage.statsBar.items.length > 0
          ? homePage.statsBar.items.map((item: any, index: number) => ({
              value:
                (typeof item?.value === 'string' && item.value) ||
                defaultHomeData.stats[index]?.value ||
                defaultHomeData.stats[0].value,
              label:
                (typeof item?.label === 'string' && item.label) ||
                defaultHomeData.stats[index]?.label ||
                defaultHomeData.stats[0].label,
            }))
          : defaultHomeData.stats,
      servicesSection: {
        eyebrow: homePage?.servicesSection?.eyebrow || defaultHomeData.servicesSection.eyebrow,
        title: homePage?.servicesSection?.title || defaultHomeData.servicesSection.title,
        description:
          homePage?.servicesSection?.description || defaultHomeData.servicesSection.description,
      },
      services:
        orderedServices.length > 0
          ? orderedServices.map((service: any, index: number) => ({
              title: service.title || defaultHomeData.services[0].title,
              description: service.summary || defaultHomeData.services[0].description,
              meta:
                (typeof service.cardMeta === 'string' && service.cardMeta) ||
                (typeof service.icon === 'string' && service.icon) ||
                defaultHomeData.services[index]?.meta ||
                defaultHomeData.services[0].meta,
              href: '/servicios',
            }))
          : defaultHomeData.services,
      aboutSection: {
        eyebrow: homePage?.aboutSection?.eyebrow || defaultHomeData.aboutSection.eyebrow,
        title: homePage?.aboutSection?.title || defaultHomeData.aboutSection.title,
        description: homePage?.aboutSection?.description || defaultHomeData.aboutSection.description,
        highlights:
          Array.isArray(homePage?.aboutSection?.highlights) && homePage.aboutSection.highlights.length > 0
            ? homePage.aboutSection.highlights
                .map((item: any) =>
                  typeof item?.value === 'string'
                    ? item.value
                    : typeof item?.label === 'string'
                      ? item.label
                      : '',
                )
                .filter(Boolean)
            : defaultHomeData.aboutSection.highlights,
        imageAlt: aboutFallbackAlt || defaultHomeData.aboutSection.imageAlt,
        imageUrl: aboutFallbackMedia,
        placeholderLabel: defaultHomeData.aboutSection.placeholderLabel,
      },
      certificationsSection: {
        eyebrow:
          homePage?.certificationsSection?.eyebrow || defaultHomeData.certificationsSection.eyebrow,
        title: homePage?.certificationsSection?.title || defaultHomeData.certificationsSection.title,
        description:
          homePage?.certificationsSection?.description ||
          defaultHomeData.certificationsSection.description,
        items:
          Array.isArray(homePage?.certificationsSection?.items) &&
          homePage.certificationsSection.items.length > 0
            ? homePage.certificationsSection.items.map((item: any, index: number) => ({
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.certificationsSection.items[index]?.title ||
                  defaultHomeData.certificationsSection.items[0].title,
                description:
                  (typeof item?.description === 'string' && item.description) ||
                  defaultHomeData.certificationsSection.items[index]?.description ||
                  defaultHomeData.certificationsSection.items[0].description,
                meta:
                  (typeof item?.meta === 'string' && item.meta) ||
                  defaultHomeData.certificationsSection.items[index]?.meta ||
                  defaultHomeData.certificationsSection.items[0].meta,
                linkLabel:
                  (typeof item?.linkLabel === 'string' && item.linkLabel) ||
                  defaultHomeData.certificationsSection.items[index]?.linkLabel ||
                  defaultHomeData.certificationsSection.items[0].linkLabel,
                linkUrl:
                  (typeof item?.linkUrl === 'string' && item.linkUrl) ||
                  defaultHomeData.certificationsSection.items[index]?.linkUrl ||
                  defaultHomeData.certificationsSection.items[0].linkUrl,
              }))
            : defaultHomeData.certificationsSection.items,
      },
      pricingSection: {
        eyebrow: homePage?.pricingSection?.eyebrow || defaultHomeData.pricingSection.eyebrow,
        title: homePage?.pricingSection?.title || defaultHomeData.pricingSection.title,
        description:
          homePage?.pricingSection?.description || defaultHomeData.pricingSection.description,
        items:
          Array.isArray(homePage?.pricingSection?.items) && homePage.pricingSection.items.length > 0
            ? homePage.pricingSection.items.map((item: any, index: number) => ({
                badge:
                  (typeof item?.badge === 'string' && item.badge) ||
                  defaultHomeData.pricingSection.items[index]?.badge ||
                  defaultHomeData.pricingSection.items[0].badge,
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.pricingSection.items[index]?.title ||
                  defaultHomeData.pricingSection.items[0].title,
                description:
                  (typeof item?.description === 'string' && item.description) ||
                  defaultHomeData.pricingSection.items[index]?.description ||
                  defaultHomeData.pricingSection.items[0].description,
                cta: mapLink(
                  item?.cta,
                  defaultHomeData.pricingSection.items[index]?.cta ||
                    defaultHomeData.pricingSection.items[0].cta,
                ),
              }))
            : defaultHomeData.pricingSection.items,
      },
      industriesSection: {
        eyebrow: homePage?.industriesSection?.eyebrow || defaultHomeData.industriesSection.eyebrow,
        title: homePage?.industriesSection?.title || defaultHomeData.industriesSection.title,
        description:
          homePage?.industriesSection?.description || defaultHomeData.industriesSection.description,
        items:
          Array.isArray(homePage?.industriesSection?.items) &&
          homePage.industriesSection.items.length > 0
            ? homePage.industriesSection.items.map((item: any, index: number) => ({
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.industriesSection.items[index]?.title ||
                  defaultHomeData.industriesSection.items[0].title,
                description:
                  (typeof item?.description === 'string' && item.description) ||
                  defaultHomeData.industriesSection.items[index]?.description ||
                  defaultHomeData.industriesSection.items[0].description,
                meta:
                  (typeof item?.meta === 'string' && item.meta) ||
                  defaultHomeData.industriesSection.items[index]?.meta ||
                  defaultHomeData.industriesSection.items[0].meta,
              }))
            : defaultHomeData.industriesSection.items,
      },
      valuesSection: {
        eyebrow: homePage?.valuesSection?.eyebrow || defaultHomeData.valuesSection.eyebrow,
        title: homePage?.valuesSection?.title || defaultHomeData.valuesSection.title,
        description:
          homePage?.valuesSection?.description || defaultHomeData.valuesSection.description,
        items:
          Array.isArray(homePage?.valuesSection?.items) && homePage.valuesSection.items.length > 0
            ? homePage.valuesSection.items.map((item: any, index: number) => ({
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.valuesSection.items[index]?.title ||
                  defaultHomeData.valuesSection.items[0].title,
                description:
                  (typeof item?.description === 'string' && item.description) ||
                  defaultHomeData.valuesSection.items[index]?.description ||
                  defaultHomeData.valuesSection.items[0].description,
              }))
            : defaultHomeData.valuesSection.items,
      },
      ctaBanner: {
        title: homePage?.ctaBanner?.title || defaultHomeData.ctaBanner.title,
        description: homePage?.ctaBanner?.description || defaultHomeData.ctaBanner.description,
        actions: [
          mapLink(homePage?.ctaBanner?.primaryCta, defaultHomeData.ctaBanner.actions[0]),
          mapLink(homePage?.ctaBanner?.secondaryCta, defaultHomeData.ctaBanner.actions[1]),
        ],
      },
      contactSection: {
        eyebrow: homePage?.contactSection?.eyebrow || defaultHomeData.contactSection.eyebrow,
        title: homePage?.contactSection?.title || defaultHomeData.contactSection.title,
        description:
          homePage?.contactSection?.description || defaultHomeData.contactSection.description,
        formTitle: contactPage?.formTitle || defaultHomeData.contactSection.formTitle,
        formDescription:
          contactPage?.formDescription || defaultHomeData.contactSection.formDescription,
        formButtonLabel:
          contactPage?.formButtonLabel || defaultHomeData.contactSection.formButtonLabel,
        cards:
          Array.isArray(contactPage?.contactCards) && contactPage.contactCards.length > 0
            ? contactPage.contactCards.map((item: any, index: number) =>
                mapContactCard(item, defaultContactCards[index] || defaultContactCards[0]),
              )
            : defaultContactCards,
      },
      footer: {
        summary:
          footer?.summary || siteSettings?.siteDescription || defaultHomeData.footer.summary,
        navigation:
          Array.isArray(footer?.navigationLinks) && footer.navigationLinks.length > 0
            ? footer.navigationLinks.map((item: any, index: number) =>
                mapLink(
                  item,
                  defaultHomeData.footer.navigation[index] || defaultHomeData.footer.navigation[0],
                ),
              )
            : defaultHomeData.footer.navigation,
        contact:
          Array.isArray(footer?.contactLinks) && footer.contactLinks.length > 0
            ? footer.contactLinks.map((item: any, index: number) =>
                mapFooterContactLink(item, defaultFooterContact[index] || defaultFooterContact[0]),
              )
            : defaultFooterContact,
        legal:
          Array.isArray(footer?.legalLinks) && footer.legalLinks.length > 0
            ? footer.legalLinks.map((item: any, index: number) =>
                mapLink(item, defaultHomeData.footer.legal[index] || defaultHomeData.footer.legal[0]),
              )
            : footer?.legalCta
              ? [mapLink(footer.legalCta, defaultHomeData.footer.legal[0])]
            : defaultHomeData.footer.legal,
        copy:
          (typeof footer?.copyright === 'string' && footer.copyright) || defaultHomeData.footer.copy,
        badge:
          (typeof footer?.footerBadge === 'string' && footer.footerBadge) ||
          defaultHomeData.footer.badge,
      },
    }
  } catch {
    return defaultHomeData
  }
}
