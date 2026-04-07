import type { CollectionConfig } from 'payload'

import {
  isAdminOrSuperAdmin,
  isEditorOrAbove,
  publishedOrAuthenticated,
} from '../lib/payload/access.ts'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: isEditorOrAbove,
    delete: isAdminOrSuperAdmin,
    read: publishedOrAuthenticated,
    update: isEditorOrAbove,
  },
  admin: {
    defaultColumns: ['question', 'category', 'published'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
    },
  ],
}
