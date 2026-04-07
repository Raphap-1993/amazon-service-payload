import type { CollectionConfig } from 'payload'

import { isAdminOrSuperAdmin } from '../lib/payload/access.ts'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
    read: isAdminOrSuperAdmin,
    update: isAdminOrSuperAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sourcePage',
      type: 'text',
      defaultValue: '/contacto',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In review', value: 'in-review' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
