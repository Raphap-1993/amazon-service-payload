import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { isEditorOrAbove } from '../lib/payload/access.ts'
import { linkGroup, seoGroup } from '../lib/payload/fields.ts'

const mediaLibraryHelperComponent = {
  path: './src/components/payload/MediaLibraryHelper.tsx#MediaLibraryHelper',
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: publicRead,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'OMA N°078 · DGAC Peru',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'slides',
          type: 'array',
          admin: {
            description:
              'Slides opcionales del hero. Si se cargan, el frontend los puede usar como alternativa editorial sin romper el modelo actual.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
              label: 'Slide Image',
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
                  'Selecciona una imagen existente desde Media Library o crea una nueva desde este mismo selector. Recomendado: formato horizontal y alta calidad.',
              },
            },
            {
              name: 'alt',
              type: 'text',
            },
            {
              name: 'visualBadge',
              type: 'text',
            },
            {
              name: 'cornerLabel',
              type: 'text',
            },
          ],
        },
        {
          name: 'visualBadge',
          type: 'text',
          defaultValue: 'Capacidad regional en Ucayali',
        },
        {
          name: 'cornerLabel',
          type: 'text',
          defaultValue: 'Aeronaves hasta 5700 kg',
        },
        {
          name: 'heroMedia',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hero Image',
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
              'Selecciona una imagen existente desde Media Library o crea una nueva desde este mismo selector. Recomendado: formato horizontal de alta calidad.',
          },
        },
        linkGroup('primaryCta', 'Primary CTA'),
        linkGroup('secondaryCta', 'Secondary CTA'),
        {
          name: 'trustItems',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'statsBar',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'servicesSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'aboutSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          label: 'About Image',
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
              'Selecciona una imagen existente desde Media Library o crea una nueva desde este mismo selector. Ideal para hangar, equipo o foto institucional.',
          },
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'certificationsSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'meta',
              type: 'text',
            },
            {
              name: 'linkLabel',
              type: 'text',
            },
            {
              name: 'linkUrl',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'pricingSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'badge',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            linkGroup('cta', 'CTA'),
          ],
        },
      ],
    },
    {
      name: 'industriesSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'meta',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'valuesSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'ctaBanner',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        linkGroup('primaryCta', 'Primary CTA'),
        linkGroup('secondaryCta', 'Secondary CTA'),
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    seoGroup(),
  ],
}
