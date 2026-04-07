import type { Field } from 'payload'

export const seoFields: Field[] = [
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
    name: 'ogImage',
    type: 'relationship',
    relationTo: 'media',
  },
  {
    name: 'noIndex',
    type: 'checkbox',
    defaultValue: false,
  },
]

