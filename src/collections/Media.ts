import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  isAdminOrSuperAdmin,
  isEditorOrAbove,
  publicMediaRead,
} from '../lib/payload/access.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isEditorOrAbove,
    delete: isAdminOrSuperAdmin,
    read: publicMediaRead,
    update: isEditorOrAbove,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'visibility', 'updatedAt'],
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'folder',
      type: 'text',
      defaultValue: 'general',
    },
    {
      name: 'visibility',
      type: 'select',
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
      required: true,
    },
  ],
  upload: {
    staticDir: process.env.MEDIA_ROOT_DIR || path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
