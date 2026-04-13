import { getPayload } from 'payload'

import configPromise from '@payload-config'

import { staticPages } from '@/lib/site-content/staticPages'

type RawLeadershipMember = {
  description?: string | null
  meta?: string | null
  photo?: unknown
  photoAlt?: string | null
  title?: string | null
}

type RawAboutValue = {
  description?: string | null
  title?: string | null
}

type RawAboutPage = {
  heroDescription?: string | null
  heroTitle?: string | null
  leadershipSection?: {
    description?: string | null
    eyebrow?: string | null
    members?: RawLeadershipMember[] | null
    title?: string | null
  } | null
  storyBody?: string | null
  storyTitle?: string | null
  values?: RawAboutValue[] | null
}

export type LeadershipMemberData = {
  description: string
  meta: string
  photoAlt: string
  photoUrl?: string
  title: string
}

export type AboutPageData = {
  hero: {
    description: string
    eyebrow: string
    title: string
  }
  identitySection: {
    description: string
    eyebrow: string
    items: {
      description: string
      title: string
    }[]
    title: string
  }
  leadershipSection: {
    description: string
    eyebrow: string
    members: LeadershipMemberData[]
    title: string
  }
  profileSection: {
    description: string
    eyebrow: string
    paragraphs: string[]
    title: string
  }
}

const defaultHeroSection: AboutPageData['hero'] = {
  description: staticPages.about.hero.description,
  eyebrow: staticPages.about.hero.eyebrow,
  title: staticPages.about.hero.title,
}

const defaultProfileSection: AboutPageData['profileSection'] = {
  description:
    'Perfil corporativo, respaldo regulatorio y lectura empresarial para una operacion seria del rubro aeronautico.',
  eyebrow: 'Perfil',
  paragraphs: staticPages.about.profile,
  title: 'Amazon Aviation Service como operacion tecnica y regulada',
}

const defaultIdentitySection: AboutPageData['identitySection'] = {
  description: 'Mision y vision expresadas con tono tecnico, sobrio y coherente con la actividad del taller.',
  eyebrow: 'Identidad',
  items: staticPages.about.missionVision.map((item) => ({
    description: item.description,
    title: item.title,
  })),
  title: 'Mision y vision',
}

const defaultLeadershipSection: AboutPageData['leadershipSection'] = {
  description:
    'La conduccion actual y el legado fundacional se presentan con una lectura sobria, respetuosa y alineada con la trayectoria de la empresa.',
  eyebrow: 'Liderazgo',
  members: staticPages.about.leadership.map((member) => ({
    description: member.description,
    meta: member.meta || '',
    photoAlt: member.title,
    title: member.title,
  })),
  title: 'Continuidad institucional y liderazgo visible',
}

const legacyLeadershipSectionTitles = ['Personas que sostienen la credibilidad de la marca']
const legacyLeadershipSectionDescriptions = [
  'Liderazgo visible y alineado con la percepcion de una empresa seria del rubro aeronautico.',
]
const legacyLeadershipMemberMetas = ['Fundador', 'Direccion']
const legacyLeadershipMemberDescriptions = [
  'Especialista tecnico con trayectoria en mantenimiento aeronautico y consolidacion del taller como base de trabajo certificada.',
  'Responsable de la continuidad institucional, el cumplimiento normativo y la conduccion de la organizacion ante la DGAC.',
]
const legacyHeroTitles = ['Sobre la empresa']
const legacyStoryTitles = ['Nuestra historia']

function preferText(
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

function splitParagraphs(value: string | null | undefined): string[] {
  if (typeof value !== 'string' || !value.trim()) {
    return []
  }

  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function mapMedia(media: unknown): { alt: string; url?: string } {
  if (!media || typeof media !== 'object') {
    return { alt: '' }
  }

  const url = 'url' in media && typeof media.url === 'string' ? media.url : undefined
  const alt = 'alt' in media && typeof media.alt === 'string' ? media.alt : ''

  return { alt, url }
}

function mapValueItem(
  item: RawAboutValue | null | undefined,
  fallback: { description: string; title: string },
): { description: string; title: string } {
  if (!item) {
    return fallback
  }

  return {
    description: preferText(item.description, fallback.description),
    title: preferText(item.title, fallback.title),
  }
}

function mapLeadershipMember(
  member: RawLeadershipMember | null | undefined,
  fallback: LeadershipMemberData,
): LeadershipMemberData {
  if (!member) {
    return fallback
  }

  const photo = mapMedia(member.photo)

  return {
    description: preferText(
      member.description,
      fallback.description,
      legacyLeadershipMemberDescriptions,
    ),
    meta: preferText(member.meta, fallback.meta, legacyLeadershipMemberMetas),
    photoAlt: preferText(member.photoAlt, photo.alt || fallback.photoAlt),
    photoUrl: photo.url || fallback.photoUrl,
    title: preferText(member.title, fallback.title),
  }
}

export async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const payload = await getPayload({ config: await configPromise })
    const rawAboutPage = (await payload.findGlobal({
      slug: 'about-page',
      depth: 1,
    })) as RawAboutPage | null

    const rawLeadershipMembers = rawAboutPage?.leadershipSection?.members
    const members =
      Array.isArray(rawLeadershipMembers) && rawLeadershipMembers.length > 0
        ? rawLeadershipMembers.map((member, index) =>
            mapLeadershipMember(member, defaultLeadershipSection.members[index] || {
              description: '',
              meta: '',
              photoAlt: '',
              title: `Miembro ${index + 1}`,
            }),
          )
        : defaultLeadershipSection.members
    const profileParagraphs = splitParagraphs(rawAboutPage?.storyBody)
    const identityItems =
      Array.isArray(rawAboutPage?.values) && rawAboutPage.values.length > 0
        ? rawAboutPage.values.map((item, index) =>
            mapValueItem(item, defaultIdentitySection.items[index] || defaultIdentitySection.items[0]),
          )
        : defaultIdentitySection.items

    return {
      hero: {
        description: preferText(rawAboutPage?.heroDescription, defaultHeroSection.description),
        eyebrow: defaultHeroSection.eyebrow,
        title: preferText(rawAboutPage?.heroTitle, defaultHeroSection.title, legacyHeroTitles),
      },
      identitySection: {
        description: defaultIdentitySection.description,
        eyebrow: defaultIdentitySection.eyebrow,
        items: identityItems,
        title: defaultIdentitySection.title,
      },
      leadershipSection: {
        description: preferText(
          rawAboutPage?.leadershipSection?.description,
          defaultLeadershipSection.description,
          legacyLeadershipSectionDescriptions,
        ),
        eyebrow: preferText(rawAboutPage?.leadershipSection?.eyebrow, defaultLeadershipSection.eyebrow),
        members,
        title: preferText(
          rawAboutPage?.leadershipSection?.title,
          defaultLeadershipSection.title,
          legacyLeadershipSectionTitles,
        ),
      },
      profileSection: {
        description: defaultProfileSection.description,
        eyebrow: defaultProfileSection.eyebrow,
        paragraphs: profileParagraphs.length > 0 ? profileParagraphs : defaultProfileSection.paragraphs,
        title: preferText(rawAboutPage?.storyTitle, defaultProfileSection.title, legacyStoryTitles),
      },
    }
  } catch {
    return {
      hero: defaultHeroSection,
      identitySection: defaultIdentitySection,
      leadershipSection: defaultLeadershipSection,
      profileSection: defaultProfileSection,
    }
  }
}
