import type { GlobalConfig } from 'payload'

import { isAdminOrSuperAdmin, publicRead } from '../lib/access.ts'
import { seoFields } from '../lib/seoFields.ts'

export const SpecialModulePage: GlobalConfig = {
  slug: 'special-module-page',
  access: {
    read: publicRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Módulo público especial',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Pendiente, dejar estructura reusable. Esta global define la landing y los mensajes base del módulo especial.',
    },
    {
      name: 'inputLabel',
      type: 'text',
      defaultValue: 'Código o identificador',
    },
    {
      name: 'searchButtonLabel',
      type: 'text',
      defaultValue: 'Consultar',
    },
    {
      name: 'emptyStateMessage',
      type: 'textarea',
      defaultValue: 'No se encontraron resultados con los datos proporcionados.',
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
}
