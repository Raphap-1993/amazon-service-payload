import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isEditorOrAbove } from '../lib/payload/access.ts'
import { seoGroup } from '../lib/payload/fields.ts'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: publicRead,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Estemos en contacto',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Contactenos en Amazon Aviation Service para consultas o servicios. Estamos disponibles para atender sus necesidades de mantenimiento y soporte de aeronaves.',
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Solicita una cotizacion tecnica',
    },
    {
      name: 'formDescription',
      type: 'textarea',
      defaultValue:
        'Comparte la necesidad de tu aeronave y te responderemos con alcance inicial y proximos pasos.',
    },
    {
      name: 'formButtonLabel',
      type: 'text',
      defaultValue: 'Enviar solicitud',
    },
    {
      name: 'contactCards',
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
        {
          name: 'ctaLabel',
          type: 'text',
        },
      ],
    },
    seoGroup(),
  ],
}
