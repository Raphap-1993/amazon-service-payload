import type { Metadata } from 'next'

import { HomePageView } from '@/components/home/HomePageView'
import { getHomePageData } from '@/lib/home/getHomePageData'

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://placeholder.local:3000'
const siteUrl = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
  description:
    'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves con enfoque en continuidad operacional. Revisa servicios, proyectos y certificaciones.',
  keywords: [
    'mantenimiento de aeronaves en Pucallpa',
    'reparacion de aeronaves en Pucallpa',
    'OMA 078',
    'DGAC Peru',
    'mantenimiento aeronautico en Peru',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Amazon Aviation Service',
    title: 'Mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
    description:
      'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves con enfoque en continuidad operacional. Revisa servicios, proyectos y certificaciones.',
    url: new URL('/', siteUrl).toString(),
  },
  twitter: {
    card: 'summary',
    title: 'Mantenimiento y reparacion de aeronaves en Pucallpa | Amazon Aviation Service',
    description:
      'Amazon Aviation Service opera en Pucallpa como OMA N°078 aprobada por la DGAC. Mantenimiento, inspeccion y reparacion de aeronaves con enfoque en continuidad operacional. Revisa servicios, proyectos y certificaciones.',
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
