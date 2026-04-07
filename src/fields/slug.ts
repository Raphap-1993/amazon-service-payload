import type { Field } from 'payload'

import { formatSlug } from '@/lib/formatSlug'

export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const sourceValue = data?.[sourceField]

        if (typeof sourceValue === 'string' && sourceValue.length > 0) {
          return formatSlug(sourceValue)
        }

        return value
      },
    ],
  },
})

