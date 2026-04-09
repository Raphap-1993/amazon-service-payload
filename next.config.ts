import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/es', destination: '/', permanent: true },
      { source: '/es/', destination: '/', permanent: true },
      { source: '/es/servicios', destination: '/servicios', permanent: true },
      { source: '/es/nosotros', destination: '/nosotros', permanent: true },
      { source: '/es/proyectos', destination: '/proyectos', permanent: true },
      { source: '/es/certificaciones', destination: '/certificaciones', permanent: true },
      { source: '/es/contacto', destination: '/contacto', permanent: true },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
