import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { defaultHomeData } from '../lib/home/defaultHomeData.ts'
import { isEditorOrAbove } from '../lib/payload/access.ts'
import { linkGroup, seoGroup } from '../lib/payload/fields.ts'

const mediaLibraryHelperComponent = {
  path: './src/components/payload/MediaLibraryHelper.tsx#MediaLibraryHelper',
}

const mapLinkDefault = (link: { href: string; label: string; variant?: 'primary' | 'secondary' }) => ({
  label: link.label,
  url: link.href,
  variant: link.variant ?? 'primary',
})

const defaultLinkGroup = (
  name: string,
  label: string,
  link: { href: string; label: string; variant?: 'primary' | 'secondary' },
) => ({
  name,
  label,
  type: 'group' as const,
  defaultValue: mapLinkDefault(link),
  fields: [
    {
      name: 'label',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'url',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'variant',
      type: 'select' as const,
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      required: true,
    },
  ],
})

const mediaRelationshipField = (
  name: string,
  label: string,
  description: string,
  mimeContains = 'image',
  hasMany = false,
) => ({
  name,
  type: 'relationship' as const,
  relationTo: 'media' as const,
  hasMany,
  label,
  filterOptions: {
    mimeType: {
      contains: mimeContains,
    },
  },
  admin: {
    allowCreate: true,
    appearance: 'drawer' as const,
    components: {
      afterInput: [mediaLibraryHelperComponent],
    },
    description,
  },
})

const simpleValueArrayField = (name: string, label: string, values: string[]) => ({
  name,
  label,
  type: 'array' as const,
  defaultValue: values.map((value) => ({ value })),
  fields: [
    {
      name: 'value',
      type: 'text' as const,
      required: true,
    },
  ],
})

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
          defaultValue: defaultHomeData.hero.eyebrow,
        },
        {
          name: 'title',
          type: 'textarea',
          required: true,
          defaultValue: defaultHomeData.hero.title,
          admin: {
            description: 'Admite saltos de línea para replicar el hero del HTML de referencia.',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: defaultHomeData.hero.subtitle,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.hero.description,
        },
        {
          name: 'regulationsLabel',
          type: 'text',
          defaultValue: defaultHomeData.hero.regulationsLabel,
        },
        simpleValueArrayField('regulations', 'Regulations', defaultHomeData.hero.regulations),
        {
          name: 'badgeNumber',
          type: 'text',
          defaultValue: defaultHomeData.hero.badgeNumber,
        },
        {
          name: 'badgeText',
          type: 'text',
          defaultValue: defaultHomeData.hero.badgeText,
        },
        mediaRelationshipField(
          'heroMedia',
          'Hero Image',
          'Imagen principal del hero. Si se deja vacía, el frontend usará el logo o un placeholder.',
        ),
        defaultLinkGroup('primaryCta', 'Primary CTA', defaultHomeData.hero.actions[0]),
        defaultLinkGroup('secondaryCta', 'Secondary CTA', defaultHomeData.hero.actions[1]),
        {
          name: 'trustItems',
          type: 'array',
          defaultValue: defaultHomeData.hero.trustItems.map((item) => ({
            label: item.label,
            value: item.value,
          })),
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
        {
          name: 'slides',
          type: 'array',
          defaultValue: defaultHomeData.hero.slides.map((slide) => ({
            alt: slide.imageAlt,
            cornerLabel: slide.cornerLabel,
            description: slide.description,
            label: slide.label,
            title: slide.title,
            visualBadge: slide.visualBadge,
          })),
          admin: {
            description:
              'Slides opcionales del hero. Para la referencia HTML se usa la lectura estática, pero puedes mantener variantes editoriales.',
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
            mediaRelationshipField(
              'image',
              'Slide Image',
              'Imagen opcional para este slide del hero.',
            ),
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
          defaultValue: defaultHomeData.hero.visualBadge,
        },
        {
          name: 'cornerLabel',
          type: 'text',
          defaultValue: defaultHomeData.hero.cornerLabel,
        },
      ],
    },
    {
      name: 'tickerSection',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.tickerItems.map((item) => ({
            icon: item.icon,
            value: item.value,
          })),
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
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
      name: 'statsBar',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.stats.map((item) => ({
            label: item.label,
            value: item.value,
          })),
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
          defaultValue: defaultHomeData.servicesSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.servicesSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.servicesSection.description,
        },
        {
          name: 'secondaryDescription',
          type: 'textarea',
          defaultValue: defaultHomeData.servicesSection.secondaryDescription,
        },
        {
          name: 'imageCaption',
          type: 'text',
          defaultValue: defaultHomeData.servicesSection.imageCaption,
        },
        mediaRelationshipField(
          'image',
          'Services Image',
          'Imagen opcional del bloque introductorio del home.',
        ),
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.servicesSection.items.map((item) => ({
            description: item.description,
            icon: item.icon,
            title: item.title,
          })),
          fields: [
            {
              name: 'icon',
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
          ],
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
          defaultValue: defaultHomeData.aboutSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.aboutSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.aboutSection.description,
        },
        {
          name: 'secondaryDescription',
          type: 'textarea',
          defaultValue: defaultHomeData.aboutSection.secondaryDescription,
        },
        {
          name: 'imageCaption',
          type: 'text',
          defaultValue: defaultHomeData.aboutSection.imageCaption,
        },
        mediaRelationshipField(
          'image',
          'About Image',
          'Imagen institucional del bloque nosotros del home.',
        ),
        mediaRelationshipField(
          'secondaryImage',
          'About Secondary Image',
          'Imagen secundaria para reforzar la composicion visual del bloque nosotros del home.',
        ),
        {
          name: 'highlights',
          type: 'array',
          defaultValue: defaultHomeData.aboutSection.highlights.map((value) => ({
            value,
          })),
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
      name: 'capabilitiesSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: defaultHomeData.capabilitiesSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.capabilitiesSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.capabilitiesSection.description,
        },
        simpleValueArrayField('items', 'Capabilities', defaultHomeData.capabilitiesSection.items),
        {
          name: 'omaNumber',
          type: 'text',
          defaultValue: defaultHomeData.capabilitiesSection.omaNumber,
        },
        {
          name: 'omaLabel',
          type: 'text',
          defaultValue: defaultHomeData.capabilitiesSection.omaLabel,
        },
        {
          name: 'omaBody',
          type: 'textarea',
          defaultValue: defaultHomeData.capabilitiesSection.omaBody,
        },
        {
          name: 'regulationsLabel',
          type: 'text',
          defaultValue: defaultHomeData.capabilitiesSection.regulationsLabel,
        },
        simpleValueArrayField(
          'regulations',
          'Capability Regulations',
          defaultHomeData.capabilitiesSection.regulations,
        ),
      ],
    },
    {
      name: 'missionVisionSection',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          minRows: 2,
          maxRows: 2,
          defaultValue: defaultHomeData.missionVisionSection.items.map((item) => ({
            icon: item.icon,
            label: item.label,
            text: item.text,
          })),
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'leadershipSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: defaultHomeData.leadershipSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.leadershipSection.title,
        },
        {
          name: 'members',
          type: 'array',
          defaultValue: defaultHomeData.leadershipSection.members.map((member) => ({
            description: member.description,
            meta: member.meta,
            photoAlt: member.photoAlt,
            title: member.title,
          })),
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'meta',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            mediaRelationshipField(
              'photo',
              'Leader Photo',
              'Foto del líder para el bloque de liderazgo del home.',
            ),
            {
              name: 'photoAlt',
              type: 'text',
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
          defaultValue: defaultHomeData.certificationsSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.certificationsSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.certificationsSection.description,
        },
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.certificationsSection.items.map((item) => ({
            description: item.description,
            icon: item.icon,
            linkLabel: item.linkLabel,
            linkUrl: item.linkUrl,
            meta: item.meta,
            title: item.title,
          })),
          fields: [
            {
              name: 'icon',
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
            {
              name: 'meta',
              type: 'text',
            },
            {
              name: 'linkLabel',
              type: 'text',
            },
            mediaRelationshipField(
              'document',
              'Certification PDF',
              'Documento PDF gestionado desde Media Library para esta certificación.',
              'pdf',
            ),
            {
              name: 'linkUrl',
              type: 'text',
              admin: {
                description:
                  'Fallback externo opcional. Si seleccionas un PDF en Media Library, el frontend prioriza ese documento.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'projectsSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: defaultHomeData.projectsSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.projectsSection.title,
        },
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.projectsSection.items.map((item) => ({
            detail: item.detail,
            gallery: item.gallery,
            icon: item.icon,
            title: item.title,
          })),
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'detail',
              type: 'text',
              required: true,
            },
            mediaRelationshipField(
              'gallery',
              'Galería del proyecto',
              'Selecciona una o más imágenes desde Media Library. El orden define la secuencia del popup.',
              'image',
              true,
            ),
          ],
        },
        {
          name: 'stagesLabel',
          type: 'text',
          defaultValue: defaultHomeData.projectsSection.stagesLabel,
        },
        simpleValueArrayField('stages', 'Stages', defaultHomeData.projectsSection.stages),
      ],
    },
    {
      name: 'pricingSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: defaultHomeData.pricingSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.pricingSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.pricingSection.description,
        },
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.pricingSection.items.map((item) => ({
            badge: item.badge,
            cta: mapLinkDefault(item.cta),
            description: item.description,
            title: item.title,
          })),
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
          defaultValue: defaultHomeData.industriesSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.industriesSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.industriesSection.description,
        },
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.industriesSection.items.map((item) => ({
            description: item.description,
            icon: item.icon,
            meta: item.meta,
            title: item.title,
          })),
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
          defaultValue: defaultHomeData.valuesSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.valuesSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.valuesSection.description,
        },
        {
          name: 'items',
          type: 'array',
          defaultValue: defaultHomeData.valuesSection.items.map((item) => ({
            description: item.description,
            title: item.title,
          })),
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
          defaultValue: defaultHomeData.ctaBanner.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.ctaBanner.description,
        },
        defaultLinkGroup('primaryCta', 'Primary CTA', defaultHomeData.ctaBanner.actions[0]),
        defaultLinkGroup('secondaryCta', 'Secondary CTA', defaultHomeData.ctaBanner.actions[1]),
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: defaultHomeData.contactSection.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultHomeData.contactSection.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: defaultHomeData.contactSection.description,
        },
        {
          name: 'formTitle',
          type: 'text',
          defaultValue: defaultHomeData.contactSection.formTitle,
        },
        {
          name: 'formDescription',
          type: 'textarea',
          defaultValue: defaultHomeData.contactSection.formDescription,
        },
        {
          name: 'formButtonLabel',
          type: 'text',
          defaultValue: defaultHomeData.contactSection.formButtonLabel,
        },
        {
          name: 'formSuccessMessage',
          type: 'text',
          defaultValue: defaultHomeData.contactSection.formSuccessMessage,
        },
        {
          name: 'cards',
          type: 'array',
          defaultValue: defaultHomeData.contactSection.cards.map((card) => ({
            href: card.href,
            hrefLabel: card.hrefLabel,
            icon: card.icon,
            label: card.label,
            value: card.value,
          })),
          fields: [
            {
              name: 'icon',
              type: 'text',
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'textarea',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
            },
            {
              name: 'hrefLabel',
              type: 'text',
            },
          ],
        },
        {
          name: 'formFields',
          type: 'array',
          defaultValue: defaultHomeData.contactSection.formFields.map((field) => ({
            label: field.label,
            name: field.name,
            placeholder: field.placeholder,
            type: field.type,
          })),
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'placeholder',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'text',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Textarea', value: 'textarea' },
              ],
              required: true,
            },
          ],
        },
        {
          name: 'floatingActions',
          type: 'group',
          fields: [
            {
              name: 'whatsapp',
              type: 'group',
              defaultValue: {
                label: defaultHomeData.contactSection.floatingActions.whatsapp.label,
                url: defaultHomeData.contactSection.floatingActions.whatsapp.href,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: defaultHomeData.contactSection.floatingActions.whatsapp.label,
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  defaultValue: defaultHomeData.contactSection.floatingActions.whatsapp.href,
                  required: true,
                },
              ],
            },
            {
              name: 'phone',
              type: 'group',
              defaultValue: {
                label: defaultHomeData.contactSection.floatingActions.phone.label,
                url: defaultHomeData.contactSection.floatingActions.phone.href,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: defaultHomeData.contactSection.floatingActions.phone.label,
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  defaultValue: defaultHomeData.contactSection.floatingActions.phone.href,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    seoGroup(),
  ],
}
