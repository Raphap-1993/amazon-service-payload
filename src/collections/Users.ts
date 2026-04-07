import type { CollectionConfig } from 'payload'

import { isSuperAdmin, userHasRole } from '../lib/payload/access.ts'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => userHasRole(req.user, ['superadmin']),
    create: isSuperAdmin,
    delete: isSuperAdmin,
    read: isSuperAdmin,
    update: isSuperAdmin,
  },
  admin: {
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'superadmin',
      options: [
        { label: 'Superadmin', value: 'superadmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
