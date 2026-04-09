import type { MetadataRoute } from 'next'

import { getMetadataBase } from '@/lib/site-config'

const metadataBase = getMetadataBase()

const routes = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/servicios', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/contacto', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/nosotros', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/proyectos', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/certificaciones', changeFrequency: 'monthly' as const, priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, metadataBase).toString(),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
