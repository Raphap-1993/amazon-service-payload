import type { CollectionConfig } from 'payload'

import { isAdminOrSuperAdmin, publicSpecialModuleRead } from '../lib/payload/access.ts'

export const SpecialModuleEntries: CollectionConfig = {
  slug: 'special-module-entries',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: publicSpecialModuleRead,
    update: isAdminOrSuperAdmin,
  },
  admin: {
    defaultColumns: ['title', 'publicCode', 'moduleStatus', 'isPublic'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'publicCode',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'documentType',
      type: 'text',
    },
    {
      name: 'documentNumber',
      type: 'text',
    },
    {
      name: 'moduleStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Expired', value: 'expired' },
      ],
      required: true,
    },
    {
      name: 'issuedAt',
      type: 'date',
    },
    {
      name: 'expiresAt',
      type: 'date',
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'publicNotes',
      type: 'textarea',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
    },
    {
      name: 'attachment',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'ownerName',
      type: 'text',
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
