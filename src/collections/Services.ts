import type { CollectionConfig } from 'payload'

import {
  isAdminOrSuperAdmin,
  isEditorOrAbove,
  publishedOrAuthenticated,
} from '../lib/payload/access.ts'
import { seoGroup } from '../lib/payload/fields.ts'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: isEditorOrAbove,
    delete: isAdminOrSuperAdmin,
    read: publishedOrAuthenticated,
    update: isEditorOrAbove,
  },
  admin: {
    defaultColumns: ['title', 'homeOrder', 'slug', 'published', 'isFeatured'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'homeOrder',
      type: 'number',
      defaultValue: 100,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'cardMeta',
      type: 'text',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    seoGroup(),
  ],
}
