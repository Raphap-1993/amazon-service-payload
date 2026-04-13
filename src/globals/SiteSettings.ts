import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { defaultHomeData } from '../lib/home/defaultHomeData.ts'
import { isSuperAdmin } from '../lib/payload/access.ts'

const mediaLibraryHelperComponent = {
  path: './src/components/payload/MediaLibraryHelper.tsx#MediaLibraryHelper',
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: publicRead,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: defaultHomeData.brand.name,
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: defaultHomeData.brand.tagline,
    },
    {
      name: 'shortName',
      type: 'text',
      defaultValue: defaultHomeData.brand.shortName,
      admin: {
        description: 'Versión corta de la marca para el lockup del header público.',
      },
    },
    {
      name: 'footerSubline',
      type: 'text',
      defaultValue: defaultHomeData.brand.footerSubline,
      admin: {
        description: 'Subtítulo corto mostrado bajo la marca en el footer del home.',
      },
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
      admin: {
        allowCreate: true,
        appearance: 'drawer',
        components: {
          afterInput: [mediaLibraryHelperComponent],
        },
        description:
          'Selecciona el logo desde Media Library o crea uno nuevo desde este mismo selector.',
      },
    },
    {
      name: 'logoAlt',
      type: 'text',
      defaultValue: defaultHomeData.brand.logoAlt,
      admin: {
        description: 'Texto alternativo del logo para accesibilidad y carga SEO básica.',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: defaultHomeData.footer.summary,
    },
    {
      name: 'domain',
      type: 'text',
      defaultValue: 'amazonaviationservice.com',
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'aasperu@amazonaviationservice.com',
      admin: {
        description: 'Correo principal publico para CTA, contacto y fallback editorial del sitio.',
        placeholder: 'correo@empresa.com',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: defaultHomeData.headerPhone,
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: defaultHomeData.contactSection.cards[0]?.value,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'branding',
      type: 'group',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#85dc52',
        },
        {
          name: 'secondaryColor',
          type: 'text',
          defaultValue: '#071816',
        },
        {
          name: 'accentColor',
          type: 'text',
          defaultValue: '#f7f8f5',
        },
      ],
    },
  ],
}
