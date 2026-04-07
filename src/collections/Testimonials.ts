import type { CollectionConfig } from 'payload'

import {
  isAdminOrSuperAdmin,
  isEditorOrAbove,
  publishedOrAuthenticated,
} from '../lib/payload/access.ts'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: isEditorOrAbove,
    delete: isAdminOrSuperAdmin,
    read: publishedOrAuthenticated,
    update: isEditorOrAbove,
  },
  admin: {
    defaultColumns: ['name', 'company', 'published', 'isFeatured'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
