import type { MetadataRoute } from 'next'

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://placeholder.local:3000'
const siteUrl = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
const metadataBase = new URL(siteUrl)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/api/*'],
      },
    ],
    sitemap: new URL('/sitemap.xml', metadataBase).toString(),
    host: metadataBase.origin,
  }
}
