import type { GlobalConfig } from 'payload'

import { isEditorOrAbove, publicRead } from '../lib/access.ts'
import { seoFields } from '../lib/seoFields.ts'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: {
    read: publicRead,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Servicios',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Página índice de servicios para la futura fase de frontend. Debe conectar con cards, detalle por servicio y CTA comercial.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
}
