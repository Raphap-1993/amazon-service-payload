import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isAdminOrSuperAdmin } from '../lib/payload/access.ts'
import { linkGroup } from '../lib/payload/fields.ts'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: publicRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'topbarText',
      type: 'text',
      defaultValue: 'Mantenimiento, inspeccion y reparacion de aeronaves en Pucallpa con respaldo OMA N°078',
    },
    {
      name: 'navItems',
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
      name: 'supportLabel',
      type: 'text',
      defaultValue: 'Canales directos',
    },
    {
      name: 'supportValue',
      type: 'text',
      defaultValue: 'Correo y telefonos',
    },
    linkGroup('cta', 'Header CTA'),
  ],
}
