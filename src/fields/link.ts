import type { Field } from 'payload'

export const createLinkGroup = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
  ],
})

