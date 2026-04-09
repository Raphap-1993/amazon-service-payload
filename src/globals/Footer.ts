import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isAdminOrSuperAdmin } from '../lib/payload/access.ts'
import { linkGroup } from '../lib/payload/fields.ts'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publicRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'navigationLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
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
      name: 'contactLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    linkGroup('legalCta', 'Legal CTA'),
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
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
      name: 'footerBadge',
      type: 'text',
      defaultValue: 'OMA N°078 · Pucallpa · Aeronaves hasta 5700 kg',
    },
    {
      name: 'copyright',
      type: 'text',
    },
  ],
}
