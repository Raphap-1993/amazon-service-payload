import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { ContactSubmissions } from './src/collections/ContactSubmissions.ts'
import { FAQs } from './src/collections/FAQs.ts'
import { Media } from './src/collections/Media.ts'
import { Services } from './src/collections/Services.ts'
import { SpecialModuleEntries } from './src/collections/SpecialModuleEntries.ts'
import { Testimonials } from './src/collections/Testimonials.ts'
import { Users } from './src/collections/Users.ts'
import { AboutPage } from './src/globals/AboutPage.ts'
import { ContactPage } from './src/globals/ContactPage.ts'
import { Footer } from './src/globals/Footer.ts'
import { Header } from './src/globals/Header.ts'
import { HomePage } from './src/globals/HomePage.ts'
import { ServicesPage } from './src/globals/ServicesPage.ts'
import { SpecialModulePage } from './src/globals/SpecialModulePage.ts'
import { SiteSettings } from './src/globals/SiteSettings.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    ContactSubmissions,
    FAQs,
    Testimonials,
    SpecialModuleEntries,
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    SpecialModulePage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-payload-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
