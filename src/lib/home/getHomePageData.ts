import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { getAboutPageData } from '../about/getAboutPageData'
import type {
  ContactCardData,
  FooterContactLinkData,
  HeroSlideData,
  HomeLeadershipMemberData,
  HomePageData,
  LinkData,
  MissionVisionItemData,
} from './types'
import { defaultHomeData } from './defaultHomeData'
import { buildPublicTheme } from '../theme/publicTheme'

type RawLink = {
  label?: string | null
  url?: string | null
  variant?: string | null
}

type RawValueLabelItem = {
  value?: string | null
  label?: string | null
}

type RawHeroSlide = {
  alt?: string | null
  cornerLabel?: string | null
  description?: string | null
  image?: unknown
  label?: string | null
  title?: string | null
  visualBadge?: string | null
}

type RawCertificationItem = {
  description?: string | null
  document?: unknown
  icon?: string | null
  linkLabel?: string | null
  linkUrl?: string | null
  meta?: string | null
  title?: string | null
}

type RawIconCardItem = {
  description?: string | null
  icon?: string | null
  title?: string | null
}

type RawPricingItem = {
  badge?: string | null
  cta?: RawLink | null
  description?: string | null
  title?: string | null
}

type RawSimpleCardItem = {
  description?: string | null
  meta?: string | null
  title?: string | null
}

type RawProjectItem = {
  detail?: string | null
  icon?: string | null
  title?: string | null
}

type RawFormFieldItem = {
  label?: string | null
  name?: string | null
  placeholder?: string | null
  type?: string | null
}

type RawMissionVisionItem = {
  icon?: string | null
  label?: string | null
  text?: string | null
}

type RawLeadershipMember = {
  description?: string | null
  meta?: string | null
  photo?: unknown
  photoAlt?: string | null
  title?: string | null
}

type RawContactCard = {
  href?: string | null
  hrefLabel?: string | null
  icon?: string | null
  label?: string | null
  url?: string | null
  value?: string | null
}

type RawSiteSettings = {
  address?: string | null
  branding?: {
    accentColor?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
  } | null
  contactEmail?: string | null
  contactPhone?: string | null
  footerSubline?: string | null
  logo?: unknown
  logoAlt?: string | null
  shortName?: string | null
  siteDescription?: string | null
  siteName?: string | null
  siteTagline?: string | null
}

type RawHeader = {
  cta?: RawLink | null
  navItems?: RawLink[] | null
  supportLabel?: string | null
  supportValue?: string | null
  topbarText?: string | null
}

type RawFooter = {
  contactLinks?: RawContactCard[] | null
  copyright?: string | null
  footerBadge?: string | null
  legalCta?: RawLink | null
  legalLinks?: RawLink[] | null
  navigationLinks?: RawLink[] | null
  summary?: string | null
}

type RawHomePage = {
  aboutSection?: {
    description?: string | null
    eyebrow?: string | null
    highlights?: RawValueLabelItem[] | null
    image?: unknown
    imageCaption?: string | null
    secondaryImage?: unknown
    secondaryDescription?: string | null
    title?: string | null
  } | null
  capabilitiesSection?: {
    description?: string | null
    eyebrow?: string | null
    items?: RawValueLabelItem[] | null
    omaBody?: string | null
    omaLabel?: string | null
    omaNumber?: string | null
    regulations?: RawValueLabelItem[] | null
    regulationsLabel?: string | null
    title?: string | null
  } | null
  certificationsSection?: {
    description?: string | null
    eyebrow?: string | null
    items?: RawCertificationItem[] | null
    title?: string | null
  } | null
  contactSection?: {
    cards?: RawContactCard[] | null
    description?: string | null
    eyebrow?: string | null
    floatingActions?: {
      phone?: RawLink | null
      whatsapp?: RawLink | null
    } | null
    formButtonLabel?: string | null
    formDescription?: string | null
    formFields?: RawFormFieldItem[] | null
    formSuccessMessage?: string | null
    formTitle?: string | null
    title?: string | null
  } | null
  ctaBanner?: {
    description?: string | null
    primaryCta?: RawLink | null
    secondaryCta?: RawLink | null
    title?: string | null
  } | null
  hero?: {
    cornerLabel?: string | null
    description?: string | null
    eyebrow?: string | null
    heroMedia?: unknown
    badgeNumber?: string | null
    badgeText?: string | null
    primaryCta?: RawLink | null
    regulations?: RawValueLabelItem[] | null
    regulationsLabel?: string | null
    secondaryCta?: RawLink | null
    slides?: RawHeroSlide[] | null
    subtitle?: string | null
    title?: string | null
    trustItems?: RawValueLabelItem[] | null
    visualBadge?: string | null
  } | null
  industriesSection?: {
    description?: string | null
    eyebrow?: string | null
    items?: RawSimpleCardItem[] | null
    title?: string | null
  } | null
  leadershipSection?: {
    eyebrow?: string | null
    members?: RawLeadershipMember[] | null
    title?: string | null
  } | null
  missionVisionSection?: {
    items?: RawMissionVisionItem[] | null
  } | null
  pricingSection?: {
    description?: string | null
    eyebrow?: string | null
    items?: RawPricingItem[] | null
    title?: string | null
  } | null
  servicesSection?: {
    description?: string | null
    eyebrow?: string | null
    image?: unknown
    imageCaption?: string | null
    items?: RawIconCardItem[] | null
    secondaryDescription?: string | null
    title?: string | null
  } | null
  statsBar?: {
    items?: RawValueLabelItem[] | null
  } | null
  projectsSection?: {
    eyebrow?: string | null
    items?: RawProjectItem[] | null
    stages?: RawValueLabelItem[] | null
    stagesLabel?: string | null
    title?: string | null
  } | null
  tickerSection?: {
    items?: Array<{ icon?: string | null; value?: string | null }> | null
  } | null
  valuesSection?: {
    description?: string | null
    eyebrow?: string | null
    items?: RawSimpleCardItem[] | null
    title?: string | null
  } | null
}

type RawContactPage = {
  contactCards?: RawContactCard[] | null
  formButtonLabel?: string | null
  formDescription?: string | null
  formTitle?: string | null
}

type RawService = {
  cardMeta?: string | null
  homeOrder?: number | null
  icon?: string | null
  summary?: string | null
  title?: string | null
}

type RawCollectionResult<TItem> = {
  docs?: TItem[] | null
}

const legacyRouteMap: Record<string, string> = {
  '#inicio': '/',
  '#servicios': '/servicios',
  '#capacidades': '/servicios',
  '#nosotros': '/nosotros',
  '#proyectos': '/proyectos',
  '#certificaciones': '/certificaciones',
  '#contacto': '/contacto',
}

const legacyHeaderTexts = ['Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa con respaldo OMA N°078']
const legacySupportLabels = ['Canales directos']
const legacySupportValues = ['Correo y telefonos']
const legacyHeroVisualBadges = ['Capacidad regional en Ucayali']
const legacyHeroCornerLabels = ['Aeronaves hasta 5700 kg']
const legacyContactFormTitles = ['Solicita una cotizacion tecnica']
const legacyContactFormDescriptions = [
  'Comparte la necesidad de tu aeronave y te responderemos con alcance inicial y proximos pasos.',
]
const legacyContactFormButtons = ['Enviar solicitud']

function buildPhoneHref(phone: string): string | undefined {
  const primaryPhone = phone.split('/')[0]?.trim() || phone.trim()
  const normalizedPhone = primaryPhone.replace(/[^\d+]/g, '')

  return normalizedPhone ? `tel:${normalizedPhone}` : undefined
}

function normalizeHref(href: string): string {
  return legacyRouteMap[href] || href
}

function mapLink(link: unknown, fallback: LinkData): LinkData {
  if (!link || typeof link !== 'object') {
    return fallback
  }

  const rawLabel = 'label' in link ? link.label : undefined
  const rawUrl = 'url' in link ? link.url : undefined
  const hasLabel = typeof rawLabel === 'string' && rawLabel.trim().length > 0
  const hasUrl = typeof rawUrl === 'string' && rawUrl.trim().length > 0

  if (!hasLabel && !hasUrl) {
    return fallback
  }

  const label = hasLabel ? rawLabel.trim() : fallback.label
  const href = hasUrl ? normalizeHref(rawUrl.trim()) : normalizeHref(fallback.href)
  const variant =
    'variant' in link && (link.variant === 'primary' || link.variant === 'secondary')
      ? link.variant
      : fallback.variant

  return { label, href, variant }
}

function preferCuratedText(
  value: string | null | undefined,
  fallback: string,
  legacyValues: string[] = [],
): string {
  if (typeof value !== 'string') {
    return fallback
  }

  const trimmedValue = value.trim()

  if (!trimmedValue || legacyValues.includes(trimmedValue)) {
    return fallback
  }

  return trimmedValue
}

function isMeaningfulAltText(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false
  }

  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return false
  }

  if (/^[\d\s()._-]+$/.test(trimmedValue)) {
    return false
  }

  if (/\.(avif|gif|jpe?g|pdf|png|svg|webp)$/i.test(trimmedValue)) {
    return false
  }

  return true
}

function resolveAltText(...candidates: Array<string | null | undefined>): string {
  for (const candidate of candidates) {
    if (isMeaningfulAltText(candidate)) {
      return candidate.trim()
    }
  }

  return ''
}

function normalizeFocalPoint(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return undefined
  }

  return Math.min(100, Math.max(0, value))
}

function mapMedia(
  media: unknown,
  fallbackAlt?: string,
): { alt: string; focalX?: number; focalY?: number; url?: string } {
  if (!media || typeof media !== 'object') {
    return { alt: resolveAltText(fallbackAlt) }
  }

  const url = 'url' in media && typeof media.url === 'string' ? media.url : undefined
  const rawAlt = 'alt' in media && typeof media.alt === 'string' ? media.alt : undefined
  const alt = resolveAltText(rawAlt, fallbackAlt)
  const focalX = 'focalX' in media ? normalizeFocalPoint(media.focalX) : undefined
  const focalY = 'focalY' in media ? normalizeFocalPoint(media.focalY) : undefined

  return { alt, focalX, focalY, url }
}

function mapHeroSlide(item: RawHeroSlide | null | undefined, fallback: HeroSlideData): HeroSlideData {
  if (!item) {
    return fallback
  }

  const image = mapMedia(item.image, fallback.imageAlt)

  return {
    label: 'label' in item && typeof item.label === 'string' && item.label ? item.label : fallback.label,
    title: 'title' in item && typeof item.title === 'string' && item.title ? item.title : fallback.title,
    description:
      'description' in item && typeof item.description === 'string' && item.description
        ? item.description
        : fallback.description,
    imageAlt: resolveAltText(
      'alt' in item && typeof item.alt === 'string' ? item.alt : undefined,
      image.alt,
      fallback.imageAlt,
    ),
    imageUrl: image.url || fallback.imageUrl,
    imageFocalX: image.focalX ?? fallback.imageFocalX,
    imageFocalY: image.focalY ?? fallback.imageFocalY,
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

function buildDefaultContactCards(siteSettings?: RawSiteSettings | null): ContactCardData[] {
  const defaults = defaultHomeData.contactSection.cards
  const email =
    typeof siteSettings?.contactEmail === 'string' && siteSettings.contactEmail.trim()
      ? siteSettings.contactEmail.trim()
      : defaults.find((item) => item.href?.startsWith('mailto:'))?.value || defaults[0].value
  const phone =
    typeof siteSettings?.contactPhone === 'string' && siteSettings.contactPhone.trim()
      ? siteSettings.contactPhone.trim()
      : defaults.find((item) => item.href?.startsWith('tel:'))?.value || defaults[0].value
  const address =
    typeof siteSettings?.address === 'string' && siteSettings.address.trim()
      ? siteSettings.address.trim()
      : defaults.find((item) => !item.href)?.value || defaults[0].value

  return defaults.map((item) => {
    if (item.href?.startsWith('mailto:')) {
      return {
        ...item,
        href: `mailto:${email}`,
        value: email,
      }
    }

    if (item.href?.startsWith('tel:')) {
      return {
        ...item,
        href: buildPhoneHref(phone),
        value: phone,
      }
    }

    return {
      ...item,
      value: address,
    }
  })
}

function mapContactCard(item: unknown, fallback: ContactCardData): ContactCardData {
  if (!item || typeof item !== 'object') {
    return fallback
  }

  const href =
    ('href' in item && typeof item.href === 'string' && item.href) ||
    ('url' in item && typeof item.url === 'string' && item.url)
      ? normalizeHref(
          ('href' in item && typeof item.href === 'string' && item.href) ||
            ('url' in item && typeof item.url === 'string' && item.url) ||
            '',
        )
      : fallback.href

  const label =
    'label' in item && typeof item.label === 'string' && item.label ? item.label : fallback.label
  const rawValue =
    'value' in item && typeof item.value === 'string' && item.value ? item.value : fallback.value
  const isPhoneCard = label.toLowerCase().includes('tel') || href?.startsWith('tel:')
  const value = isPhoneCard ? rawValue.split('\n').map((line) => line.trim()).filter(Boolean)[0] || rawValue : rawValue
  const normalizedHref = isPhoneCard ? buildPhoneHref(value) : href

  return {
    icon: 'icon' in item && typeof item.icon === 'string' && item.icon ? item.icon : fallback.icon,
    label,
    value,
    href: normalizedHref,
    hrefLabel:
      ('hrefLabel' in item && typeof item.hrefLabel === 'string' && item.hrefLabel) ||
      ('ctaLabel' in item && typeof item.ctaLabel === 'string' && item.ctaLabel)
        ? (('hrefLabel' in item && typeof item.hrefLabel === 'string' && item.hrefLabel) ||
            ('ctaLabel' in item && typeof item.ctaLabel === 'string' && item.ctaLabel)) as string
        : normalizedHref
          ? fallback.hrefLabel
          : '',
  }
}

function buildDefaultFooterContact(siteSettings?: RawSiteSettings | null): FooterContactLinkData[] {
  const defaults = defaultHomeData.footer.contact
  const derivedEmail =
    typeof siteSettings?.contactEmail === 'string' && siteSettings.contactEmail.trim()
      ? siteSettings.contactEmail.trim()
      : defaults.find((item) => item.href?.startsWith('mailto:'))?.value || defaults[0].value
  const derivedPhone =
    typeof siteSettings?.contactPhone === 'string' && siteSettings.contactPhone.trim()
      ? siteSettings.contactPhone.trim()
      : defaults.find((item) => item.href?.startsWith('tel:'))?.value || defaults[0].value
  const derivedAddress =
    typeof siteSettings?.address === 'string' && siteSettings.address.trim()
      ? siteSettings.address.trim()
      : defaults.find((item) => !item.href)?.value || defaults[0].value

  return defaults.map((item: FooterContactLinkData) => {
    if (item.href?.startsWith('mailto:')) {
      return {
        ...item,
        href: `mailto:${derivedEmail}`,
        value: derivedEmail,
      }
    }

    if (item.href?.startsWith('tel:')) {
      return {
        ...item,
        href: buildPhoneHref(derivedPhone),
        value: derivedPhone,
      }
    }

    return {
      ...item,
      value: derivedAddress,
    }
  })
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

function mapValueList(
  items: Array<RawValueLabelItem | null | undefined> | null | undefined,
  fallback: string[],
): string[] {
  if (!Array.isArray(items) || items.length === 0) {
    return fallback
  }

  return items
    .map((item) =>
      typeof item?.value === 'string'
        ? item.value
        : typeof item?.label === 'string'
          ? item.label
          : '',
    )
    .map((item) => item.trim())
    .filter(Boolean)
}

function mapMissionVisionItems(
  items: Array<RawMissionVisionItem | null | undefined> | null | undefined,
  fallback: MissionVisionItemData[],
): MissionVisionItemData[] {
  if (!Array.isArray(items) || items.length === 0) {
    return fallback
  }

  return items.map((item, index) => ({
    icon:
      (typeof item?.icon === 'string' && item.icon.trim()) ||
      fallback[index]?.icon ||
      fallback[0]?.icon ||
      '•',
    label:
      (typeof item?.label === 'string' && item.label.trim()) ||
      fallback[index]?.label ||
      fallback[0]?.label ||
      '',
    text:
      (typeof item?.text === 'string' && item.text.trim()) ||
      fallback[index]?.text ||
      fallback[0]?.text ||
      '',
  }))
}

function mapLeadershipMember(
  member: RawLeadershipMember | null | undefined,
  fallback: HomeLeadershipMemberData,
): HomeLeadershipMemberData {
  if (!member) {
    return fallback
  }

  const photo = mapMedia(member.photo, fallback.photoAlt)

  return {
    title:
      (typeof member.title === 'string' && member.title.trim()) || fallback.title,
    meta:
      (typeof member.meta === 'string' && member.meta.trim()) || fallback.meta,
    description:
      (typeof member.description === 'string' && member.description.trim()) || fallback.description,
    photoAlt:
      (typeof member.photoAlt === 'string' && member.photoAlt.trim()) ||
      photo.alt ||
      fallback.photoAlt,
    photoUrl: photo.url || fallback.photoUrl,
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const [payload, aboutPage] = await Promise.all([
      getPayload({ config: await configPromise }),
      getAboutPageData(),
    ])

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

    const siteSettings = rawSiteSettings as RawSiteSettings | null
    const header = rawHeader as RawHeader | null
    const footer = rawFooter as RawFooter | null
    const homePage = rawHomePage as RawHomePage | null
    const contactPage = rawContactPage as RawContactPage | null
    const servicesResult = rawServices as RawCollectionResult<RawService>
    const servicesDocs = Array.isArray(servicesResult.docs) ? servicesResult.docs : []

    const heroMedia = mapMedia(homePage?.hero?.heroMedia, defaultHomeData.hero.imageAlt)
    const servicesMedia = mapMedia(
      homePage?.servicesSection?.image,
      defaultHomeData.servicesSection.imageAlt,
    )
    const aboutMedia = mapMedia(homePage?.aboutSection?.image, defaultHomeData.aboutSection.imageAlt)
    const aboutSecondaryMedia = mapMedia(
      homePage?.aboutSection?.secondaryImage,
      defaultHomeData.aboutSection.secondaryImageAlt,
    )
    const logoMedia = mapMedia(siteSettings?.logo, defaultHomeData.brand.logoAlt)
    const defaultContactCards = buildDefaultContactCards(siteSettings)
    const defaultFooterContact = buildDefaultFooterContact(siteSettings)
    const theme = buildPublicTheme(siteSettings?.branding)
    const heroSlides: HeroSlideData[] =
      Array.isArray(homePage?.hero?.slides) && homePage.hero.slides.length > 0
        ? homePage.hero.slides.map((item, index) =>
            mapHeroSlide(item, {
              label: defaultHomeData.hero.slides[index]?.label || defaultHomeData.hero.eyebrow,
              title: defaultHomeData.hero.slides[index]?.title || defaultHomeData.hero.title,
              description:
                defaultHomeData.hero.slides[index]?.description || defaultHomeData.hero.description,
              imageAlt:
                defaultHomeData.hero.slides[index]?.imageAlt || defaultHomeData.hero.imageAlt,
              imageUrl: heroMedia.url,
              visualBadge:
                defaultHomeData.hero.slides[index]?.visualBadge ||
                defaultHomeData.hero.visualBadge,
              cornerLabel:
                defaultHomeData.hero.slides[index]?.cornerLabel ||
                defaultHomeData.hero.cornerLabel,
            }),
          )
        : []
    const resolvedHeroSlides =
      heroMedia.url && heroSlides.length > 0
        ? heroSlides.map((slide, index) =>
            index === 0
              ? {
                  ...slide,
                  imageAlt: heroMedia.alt || slide.imageAlt,
                  imageFocalX: heroMedia.focalX ?? slide.imageFocalX,
                  imageFocalY: heroMedia.focalY ?? slide.imageFocalY,
                  imageUrl: heroMedia.url,
                }
              : slide,
          )
        : heroSlides
    const orderedServices = [...servicesDocs].sort((left, right) => {
      const leftOrder = typeof left.homeOrder === 'number' ? left.homeOrder : Number.MAX_SAFE_INTEGER
      const rightOrder =
        typeof right.homeOrder === 'number' ? right.homeOrder : Number.MAX_SAFE_INTEGER

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return (left.title || '').localeCompare(right.title || '')
    })
    const primaryContactEmail =
      typeof siteSettings?.contactEmail === 'string' && siteSettings.contactEmail.trim()
        ? siteSettings.contactEmail.trim()
        : defaultHomeData.contactSection.cards.find((item) => item.href?.startsWith('mailto:'))?.value ||
          'aasperu@amazonaviationservice.com'
    const primaryContactHref = `mailto:${primaryContactEmail}`
    const headerPhone =
      typeof siteSettings?.contactPhone === 'string' && siteSettings.contactPhone.trim()
        ? siteSettings.contactPhone.trim().split('/')[0]?.trim() || siteSettings.contactPhone.trim()
        : defaultHomeData.headerPhone

    return {
      topbarText: preferCuratedText(header?.topbarText, defaultHomeData.topbarText, legacyHeaderTexts),
      supportLabel: preferCuratedText(
        header?.supportLabel,
        defaultHomeData.supportLabel,
        legacySupportLabels,
      ),
      supportValue: preferCuratedText(
        header?.supportValue,
        defaultHomeData.supportValue,
        legacySupportValues,
      ),
      brand: {
        footerSubline:
          (typeof siteSettings?.footerSubline === 'string' && siteSettings.footerSubline) ||
          defaultHomeData.brand.footerSubline,
        name:
          (typeof siteSettings?.siteName === 'string' && siteSettings.siteName) ||
          defaultHomeData.brand.name,
        logoAlt:
          logoMedia.alt ||
          (typeof siteSettings?.logoAlt === 'string' && siteSettings.logoAlt) ||
          defaultHomeData.brand.logoAlt,
        logoUrl: logoMedia.url || defaultHomeData.brand.logoUrl,
        shortName:
          (typeof siteSettings?.shortName === 'string' && siteSettings.shortName) ||
          defaultHomeData.brand.shortName,
        tagline:
          (typeof siteSettings?.siteTagline === 'string' && siteSettings.siteTagline) ||
          defaultHomeData.brand.tagline,
      },
      theme,
      navItems:
        Array.isArray(header?.navItems) && header.navItems.length > 0
          ? header.navItems.map((item, index) =>
              mapLink(item, defaultHomeData.navItems[index] || defaultHomeData.navItems[0]),
            )
          : defaultHomeData.navItems,
      headerCta: mapLink(header?.cta, defaultHomeData.headerCta),
      headerPhone,
      hero: {
        eyebrow: homePage?.hero?.eyebrow || defaultHomeData.hero.eyebrow,
        title: homePage?.hero?.title || defaultHomeData.hero.title,
        subtitle: homePage?.hero?.subtitle || defaultHomeData.hero.subtitle,
        description: homePage?.hero?.description || defaultHomeData.hero.description,
        actions: [mapLink(homePage?.hero?.primaryCta, defaultHomeData.hero.actions[0]), mapLink(homePage?.hero?.secondaryCta, defaultHomeData.hero.actions[1])],
        trustItems:
          Array.isArray(homePage?.hero?.trustItems) && homePage.hero.trustItems.length > 0
            ? homePage.hero.trustItems.map((item, index) => ({
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
        badgeNumber:
          (typeof homePage?.hero?.badgeNumber === 'string' && homePage.hero.badgeNumber) ||
          defaultHomeData.hero.badgeNumber,
        badgeText:
          (typeof homePage?.hero?.badgeText === 'string' && homePage.hero.badgeText) ||
          defaultHomeData.hero.badgeText,
        regulationsLabel:
          (typeof homePage?.hero?.regulationsLabel === 'string' && homePage.hero.regulationsLabel) ||
          defaultHomeData.hero.regulationsLabel,
        regulations: mapValueList(homePage?.hero?.regulations, defaultHomeData.hero.regulations),
        visualBadge: preferCuratedText(
          homePage?.hero?.visualBadge,
          defaultHomeData.hero.visualBadge,
          legacyHeroVisualBadges,
        ),
        cornerLabel: preferCuratedText(
          homePage?.hero?.cornerLabel,
          defaultHomeData.hero.cornerLabel,
          legacyHeroCornerLabels,
        ),
        imageAlt: heroMedia.alt || defaultHomeData.hero.imageAlt,
        imageFocalX: heroMedia.focalX,
        imageFocalY: heroMedia.focalY,
        imageUrl: heroMedia.url,
        slides: resolvedHeroSlides,
      },
      tickerItems:
        Array.isArray(homePage?.tickerSection?.items) && homePage.tickerSection.items.length > 0
          ? homePage.tickerSection.items.map((item, index) => ({
              icon:
                (typeof item?.icon === 'string' && item.icon) ||
                defaultHomeData.tickerItems[index]?.icon ||
                defaultHomeData.tickerItems[0].icon,
              value:
                (typeof item?.value === 'string' && item.value) ||
                defaultHomeData.tickerItems[index]?.value ||
                defaultHomeData.tickerItems[0].value,
            }))
          : defaultHomeData.tickerItems,
      stats:
        Array.isArray(homePage?.statsBar?.items) && homePage.statsBar.items.length > 0
          ? homePage.statsBar.items.map((item, index) => ({
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
        secondaryDescription:
          homePage?.servicesSection?.secondaryDescription ||
          defaultHomeData.servicesSection.secondaryDescription,
        imageAlt: servicesMedia.alt || defaultHomeData.servicesSection.imageAlt,
        imageFocalX: servicesMedia.focalX,
        imageFocalY: servicesMedia.focalY,
        imageUrl: servicesMedia.url,
        imageCaption:
          homePage?.servicesSection?.imageCaption || defaultHomeData.servicesSection.imageCaption,
        items:
          Array.isArray(homePage?.servicesSection?.items) && homePage.servicesSection.items.length > 0
            ? homePage.servicesSection.items.map((item, index) => ({
                icon:
                  (typeof item?.icon === 'string' && item.icon) ||
                  defaultHomeData.servicesSection.items[index]?.icon ||
                  defaultHomeData.servicesSection.items[0].icon,
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.servicesSection.items[index]?.title ||
                  defaultHomeData.servicesSection.items[0].title,
                description:
                  (typeof item?.description === 'string' && item.description) ||
                  defaultHomeData.servicesSection.items[index]?.description ||
                  defaultHomeData.servicesSection.items[0].description,
              }))
            : defaultHomeData.servicesSection.items,
        placeholderLabel: defaultHomeData.servicesSection.placeholderLabel,
      },
      services:
        orderedServices.length > 0
          ? orderedServices.map((service, index) => ({
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
        secondaryDescription:
          homePage?.aboutSection?.secondaryDescription ||
          defaultHomeData.aboutSection.secondaryDescription,
        imageCaption:
          homePage?.aboutSection?.imageCaption || defaultHomeData.aboutSection.imageCaption,
        highlights: mapValueList(homePage?.aboutSection?.highlights, defaultHomeData.aboutSection.highlights),
        imageAlt: aboutMedia.alt || defaultHomeData.aboutSection.imageAlt,
        imageFocalX: aboutMedia.focalX,
        imageFocalY: aboutMedia.focalY,
        imageUrl: aboutMedia.url,
        placeholderLabel: defaultHomeData.aboutSection.placeholderLabel,
        secondaryImageAlt:
          aboutSecondaryMedia.alt ||
          heroMedia.alt ||
          servicesMedia.alt ||
          defaultHomeData.aboutSection.secondaryImageAlt,
        secondaryImageFocalX: aboutSecondaryMedia.focalX ?? heroMedia.focalX ?? servicesMedia.focalX,
        secondaryImageFocalY: aboutSecondaryMedia.focalY ?? heroMedia.focalY ?? servicesMedia.focalY,
        secondaryImageUrl: aboutSecondaryMedia.url || heroMedia.url || servicesMedia.url,
      },
      capabilitiesSection: {
        eyebrow:
          homePage?.capabilitiesSection?.eyebrow || defaultHomeData.capabilitiesSection.eyebrow,
        title: homePage?.capabilitiesSection?.title || defaultHomeData.capabilitiesSection.title,
        description:
          homePage?.capabilitiesSection?.description ||
          defaultHomeData.capabilitiesSection.description,
        items: mapValueList(homePage?.capabilitiesSection?.items, defaultHomeData.capabilitiesSection.items),
        omaNumber:
          homePage?.capabilitiesSection?.omaNumber || defaultHomeData.capabilitiesSection.omaNumber,
        omaLabel:
          homePage?.capabilitiesSection?.omaLabel || defaultHomeData.capabilitiesSection.omaLabel,
        omaBody:
          homePage?.capabilitiesSection?.omaBody || defaultHomeData.capabilitiesSection.omaBody,
        regulationsLabel:
          homePage?.capabilitiesSection?.regulationsLabel ||
          defaultHomeData.capabilitiesSection.regulationsLabel,
        regulations: mapValueList(
          homePage?.capabilitiesSection?.regulations,
          defaultHomeData.capabilitiesSection.regulations,
        ),
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
            ? homePage.certificationsSection.items.map((item, index) => {
                const document = mapMedia(item?.document)

                return {
                  icon:
                    (typeof item?.icon === 'string' && item.icon) ||
                    defaultHomeData.certificationsSection.items[index]?.icon ||
                    defaultHomeData.certificationsSection.items[0].icon,
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
                    document.url ||
                    (typeof item?.linkUrl === 'string' && item.linkUrl) ||
                    defaultHomeData.certificationsSection.items[index]?.linkUrl ||
                    defaultHomeData.certificationsSection.items[0].linkUrl,
                }
              })
            : defaultHomeData.certificationsSection.items,
      },
      projectsSection: {
        eyebrow: homePage?.projectsSection?.eyebrow || defaultHomeData.projectsSection.eyebrow,
        title: homePage?.projectsSection?.title || defaultHomeData.projectsSection.title,
        items:
          Array.isArray(homePage?.projectsSection?.items) && homePage.projectsSection.items.length > 0
            ? homePage.projectsSection.items.map((item, index) => ({
                icon:
                  (typeof item?.icon === 'string' && item.icon) ||
                  defaultHomeData.projectsSection.items[index]?.icon ||
                  defaultHomeData.projectsSection.items[0].icon,
                title:
                  (typeof item?.title === 'string' && item.title) ||
                  defaultHomeData.projectsSection.items[index]?.title ||
                  defaultHomeData.projectsSection.items[0].title,
                detail:
                  (typeof item?.detail === 'string' && item.detail) ||
                  defaultHomeData.projectsSection.items[index]?.detail ||
                  defaultHomeData.projectsSection.items[0].detail,
              }))
            : defaultHomeData.projectsSection.items,
        stagesLabel:
          homePage?.projectsSection?.stagesLabel || defaultHomeData.projectsSection.stagesLabel,
        stages: mapValueList(homePage?.projectsSection?.stages, defaultHomeData.projectsSection.stages),
      },
      pricingSection: {
        eyebrow: homePage?.pricingSection?.eyebrow || defaultHomeData.pricingSection.eyebrow,
        title: homePage?.pricingSection?.title || defaultHomeData.pricingSection.title,
        description:
          homePage?.pricingSection?.description || defaultHomeData.pricingSection.description,
        items:
          Array.isArray(homePage?.pricingSection?.items) && homePage.pricingSection.items.length > 0
            ? homePage.pricingSection.items.map((item, index) => ({
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
            ? homePage.industriesSection.items.map((item, index) => ({
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
      missionVisionSection: {
        items: mapMissionVisionItems(
          homePage?.missionVisionSection?.items,
          defaultHomeData.missionVisionSection.items,
        ),
      },
      leadershipSection: {
        eyebrow:
          homePage?.leadershipSection?.eyebrow ||
          aboutPage.leadershipSection.eyebrow ||
          defaultHomeData.leadershipSection.eyebrow,
        title:
          homePage?.leadershipSection?.title ||
          aboutPage.leadershipSection.title ||
          defaultHomeData.leadershipSection.title,
        members: Array.from({
          length: Math.max(
            Array.isArray(homePage?.leadershipSection?.members)
              ? homePage.leadershipSection.members.length
              : 0,
            aboutPage.leadershipSection.members.length,
            defaultHomeData.leadershipSection.members.length,
          ),
        }).map((_, index) => {
          const defaultMember =
            defaultHomeData.leadershipSection.members[index] ||
            defaultHomeData.leadershipSection.members[0]
          const aboutMember = aboutPage.leadershipSection.members[index]
          const homeMember = Array.isArray(homePage?.leadershipSection?.members)
            ? homePage.leadershipSection.members[index]
            : undefined
          const mergedFallback = mapLeadershipMember(aboutMember, defaultMember)

          return mapLeadershipMember(homeMember || aboutMember || defaultMember, mergedFallback)
        }),
      },
      valuesSection: {
        eyebrow: homePage?.valuesSection?.eyebrow || defaultHomeData.valuesSection.eyebrow,
        title: homePage?.valuesSection?.title || defaultHomeData.valuesSection.title,
        description:
          homePage?.valuesSection?.description || defaultHomeData.valuesSection.description,
        items:
          Array.isArray(homePage?.valuesSection?.items) && homePage.valuesSection.items.length > 0
            ? homePage.valuesSection.items.map((item, index) => ({
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
          mapLink(homePage?.ctaBanner?.primaryCta, {
            ...defaultHomeData.ctaBanner.actions[0],
            href: primaryContactHref,
          }),
          mapLink(homePage?.ctaBanner?.secondaryCta, defaultHomeData.ctaBanner.actions[1]),
        ],
      },
      contactSection: {
        eyebrow: homePage?.contactSection?.eyebrow || defaultHomeData.contactSection.eyebrow,
        title: homePage?.contactSection?.title || defaultHomeData.contactSection.title,
        description:
          homePage?.contactSection?.description || defaultHomeData.contactSection.description,
        formTitle:
          homePage?.contactSection?.formTitle ||
          preferCuratedText(contactPage?.formTitle, defaultHomeData.contactSection.formTitle, legacyContactFormTitles),
        formDescription:
          homePage?.contactSection?.formDescription ||
          preferCuratedText(
            contactPage?.formDescription,
            defaultHomeData.contactSection.formDescription,
            legacyContactFormDescriptions,
          ),
        formButtonLabel:
          homePage?.contactSection?.formButtonLabel ||
          preferCuratedText(
            contactPage?.formButtonLabel,
            defaultHomeData.contactSection.formButtonLabel,
            legacyContactFormButtons,
          ),
        formSuccessMessage:
          homePage?.contactSection?.formSuccessMessage ||
          defaultHomeData.contactSection.formSuccessMessage,
        formFields:
          Array.isArray(homePage?.contactSection?.formFields) &&
          homePage.contactSection.formFields.length > 0
            ? homePage.contactSection.formFields.map((field, index) => ({
                label:
                  (typeof field?.label === 'string' && field.label) ||
                  defaultHomeData.contactSection.formFields[index]?.label ||
                  defaultHomeData.contactSection.formFields[0].label,
                name:
                  (typeof field?.name === 'string' && field.name) ||
                  defaultHomeData.contactSection.formFields[index]?.name ||
                  defaultHomeData.contactSection.formFields[0].name,
                placeholder:
                  (typeof field?.placeholder === 'string' && field.placeholder) ||
                  defaultHomeData.contactSection.formFields[index]?.placeholder ||
                  defaultHomeData.contactSection.formFields[0].placeholder,
                type:
                  field?.type === 'email' || field?.type === 'textarea' || field?.type === 'text'
                    ? field.type
                    : defaultHomeData.contactSection.formFields[index]?.type ||
                      defaultHomeData.contactSection.formFields[0].type,
              }))
            : defaultHomeData.contactSection.formFields,
        cards:
          Array.isArray(homePage?.contactSection?.cards) && homePage.contactSection.cards.length > 0
            ? homePage.contactSection.cards.map((item, index) =>
                mapContactCard(item, defaultContactCards[index] || defaultContactCards[0]),
              )
            : defaultContactCards,
        floatingActions: {
          whatsapp: mapLink(
            homePage?.contactSection?.floatingActions?.whatsapp,
            defaultHomeData.contactSection.floatingActions.whatsapp,
          ),
          phone: mapLink(
            homePage?.contactSection?.floatingActions?.phone,
            defaultHomeData.contactSection.floatingActions.phone,
          ),
        },
      },
      footer: {
        summary:
          footer?.summary || siteSettings?.siteDescription || defaultHomeData.footer.summary,
        navigation:
          Array.isArray(footer?.navigationLinks) && footer.navigationLinks.length > 0
            ? footer.navigationLinks.map((item, index) =>
                mapLink(
                  item,
                  defaultHomeData.footer.navigation[index] || defaultHomeData.footer.navigation[0],
                ),
              )
            : defaultHomeData.footer.navigation,
        contact:
          Array.isArray(footer?.contactLinks) && footer.contactLinks.length > 0
            ? footer.contactLinks.map((item, index) =>
                mapFooterContactLink(item, defaultFooterContact[index] || defaultFooterContact[0]),
              )
            : defaultFooterContact,
        legal:
          Array.isArray(footer?.legalLinks) && footer.legalLinks.length > 0
            ? footer.legalLinks.map((item, index) =>
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
