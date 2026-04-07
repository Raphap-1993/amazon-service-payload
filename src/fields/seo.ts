import type { Field } from 'payload'

export const createSeoGroup = (): Field => ({
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
})

