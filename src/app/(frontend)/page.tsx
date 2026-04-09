import type { Metadata } from 'next'

import { HomePageView } from '@/components/home/HomePageView'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { getSiteUrl } from '@/lib/site-config'

const siteUrl = getSiteUrl()

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Amazon Aviation Service | Mantenimiento aeronáutico OMA N°078 en Pucallpa',
  description:
    'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves para la Amazonia peruana, FAP del Peru y entidades privadas. Revisa servicios, proyectos y certificaciones.',
  keywords: [
    'mantenimiento aeronáutico OMA N°078',
    'mantenimiento de aeronaves en Pucallpa',
    'servicios aeronauticos en Ucayali',
    'reparacion de aeronaves en Pucallpa',
    'OMA 078',
    'DGAC Peru',
    'FAP Peru',
    'entidades privadas',
    'Amazonia peruana',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Amazon Aviation Service',
    title: 'Amazon Aviation Service | Mantenimiento aeronáutico OMA N°078 en Pucallpa',
    description:
      'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves para la Amazonia peruana, FAP del Peru y entidades privadas. Revisa servicios, proyectos y certificaciones.',
    url: new URL('/', siteUrl).toString(),
  },
  twitter: {
    card: 'summary',
    title: 'Amazon Aviation Service | Mantenimiento aeronáutico OMA N°078 en Pucallpa',
    description:
      'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves para la Amazonia peruana, FAP del Peru y entidades privadas. Revisa servicios, proyectos y certificaciones.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HomePage() {
  const data = await getHomePageData()

  return <HomePageView data={data} />
}
