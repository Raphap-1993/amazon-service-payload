import type { Metadata } from 'next'

import { HomePageView } from '@/components/home/HomePageView'
import { getHomePageData } from '@/lib/home/getHomePageData'
import { getSiteUrl } from '@/lib/site-config'

const siteUrl = getSiteUrl()

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Amazon Aviation Service | Reparación y Mantenimiento de Aeronaves en Pucallpa — OMA N°078',
  description:
    'Organización de Mantenimiento Aprobada por la DGAC (OMA N°078). Reparación, mantenimiento e inspección de aeronaves hasta 5700 kg en Pucallpa, Ucayali. Más de 40 años de experiencia. RAP 145 / RAP 43 / RAP 65.',
  keywords: [
    'mantenimiento aeronaves Pucallpa',
    'reparacion aeronaves Ucayali',
    'OMA 078 DGAC Peru',
    'MRO Amazonia Peru',
    'Amazon Aviation Service',
    'RAP 145 Peru',
    'mantenimiento Cessna Pilatus Pucallpa',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Amazon Aviation Service',
    title: 'Amazon Aviation Service — OMA N°078 DGAC | Mantenimiento de Aeronaves Pucallpa',
    description:
      'Organización de Mantenimiento Aprobada con OMA N°078. Reparación estructural, inspección, aviónica y más. Pucallpa, Perú.',
    url: new URL('/', siteUrl).toString(),
  },
  twitter: {
    card: 'summary',
    title: 'Amazon Aviation Service | Reparación y Mantenimiento de Aeronaves en Pucallpa',
    description:
      'OMA N°078 aprobada por la DGAC para reparación, mantenimiento e inspección de aeronaves en Pucallpa.',
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
