import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isEditorOrAbove } from '../lib/payload/access.ts'
import { seoGroup } from '../lib/payload/fields.ts'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: publicRead,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Sobre la empresa',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'Nuestra historia',
    },
    {
      name: 'storyBody',
      type: 'textarea',
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    seoGroup(),
  ],
}
