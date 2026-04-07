import type { Field } from 'payload'

const mediaLibraryHelperComponent = {
  path: './src/components/payload/MediaLibraryHelper.tsx#MediaLibraryHelper',
}

export const linkGroup = (name: string, label = 'Link'): Field => ({
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
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      required: true,
    },
  ],
})

export const seoGroup = (): Field => ({
  name: 'seo',
  type: 'group',
  fields: [
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
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
      admin: {
        allowCreate: true,
        appearance: 'drawer',
        components: {
          afterInput: [mediaLibraryHelperComponent],
        },
        description:
          'Selecciona una imagen existente desde Media Library o crea una nueva desde este mismo selector.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'schemaType',
      type: 'text',
    },
  ],
})
