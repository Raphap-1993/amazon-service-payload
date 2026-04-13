import type { GlobalConfig } from 'payload'

import { publicRead } from '../lib/access.ts'
import { defaultHomeData } from '../lib/home/defaultHomeData.ts'
import { isAdminOrSuperAdmin } from '../lib/payload/access.ts'

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

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: publicRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'topbarText',
      type: 'text',
      defaultValue: defaultHomeData.topbarText,
    },
    {
      name: 'navItems',
      type: 'array',
      defaultValue: defaultHomeData.navItems.map((item) => ({
        label: item.label,
        url: item.href,
      })),
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
      ],
    },
    {
      name: 'supportLabel',
      type: 'text',
      defaultValue: defaultHomeData.supportLabel,
    },
    {
      name: 'supportValue',
      type: 'text',
      defaultValue: defaultHomeData.supportValue,
    },
    defaultLinkGroup('cta', 'Header CTA', defaultHomeData.headerCta),
  ],
}
