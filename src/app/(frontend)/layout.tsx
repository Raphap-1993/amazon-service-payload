import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './styles.css'

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://placeholder.local:3000'
const siteUrl = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
const metadataBase = new URL(siteUrl)

const bodyFont = Barlow({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const headingFont = Barlow_Condensed({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
})

const monoFont = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Amazon Aviation Service | OMA N°078 en Pucallpa',
    template: '%s',
  },
  description:
    'Amazon Aviation Service en Pucallpa: mantenimiento, inspeccion y reparacion de aeronaves con respaldo OMA N°078, capacidad tecnica visible y enfoque en continuidad operacional.',
  metadataBase,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Amazon Aviation Service',
    title: 'Amazon Aviation Service | OMA N°078 en Pucallpa',
    description:
      'Amazon Aviation Service en Pucallpa: mantenimiento, inspeccion y reparacion de aeronaves con respaldo OMA N°078, capacidad tecnica visible y enfoque en continuidad operacional.',
    url: new URL('/', metadataBase).toString(),
  },
  twitter: {
    card: 'summary',
    title: 'Amazon Aviation Service | OMA N°078 en Pucallpa',
    description:
      'Amazon Aviation Service en Pucallpa: mantenimiento, inspeccion y reparacion de aeronaves con respaldo OMA N°078, capacidad tecnica visible y enfoque en continuidad operacional.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Amazon Aviation Service',
    url: siteUrl,
    description: 'Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa.',
    email: 'aasperu@amazonaviationservice.com',
    telephone: '+51 952 633 100',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+51 952 633 100',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+51 945 266 795',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. El Triunfo Mz. C Lt. 1',
      addressLocality: 'Yarinacocha - Pucallpa',
      addressRegion: 'Ucayali',
      addressCountry: 'PE',
    },
    areaServed: ['Pucallpa', 'Ucayali', 'Peru'],
  }

  return (
    <html lang="es-PE">
      <body className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  )
}
