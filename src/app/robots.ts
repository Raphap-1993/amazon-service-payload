import type { MetadataRoute } from 'next'

import { getMetadataBase } from '@/lib/site-config'

const metadataBase = getMetadataBase()

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
