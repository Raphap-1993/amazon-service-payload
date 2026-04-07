import type { GlobalConfig } from 'payload'

import { publicRead } from '@/lib/access'
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
      defaultValue: 'Amazon Aviation Service',
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: 'OMA N°078 · Pucallpa, Peru',
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
      defaultValue: 'Amazon Aviation Service',
      admin: {
        description: 'Texto alternativo del logo para accesibilidad y carga SEO básica.',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue:
          'Soporte tecnico aeronautico con foco regional en Ucayali, seguridad operacional y calidad verificable.',
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
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+51 952633100',
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'Av. El Triunfo Mz. C Lote 01, Yarinacocha - Pucallpa - Peru',
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
