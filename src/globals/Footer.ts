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

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publicRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'summary',
      type: 'textarea',
      defaultValue: defaultHomeData.footer.summary,
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: defaultHomeData.footer.contact.find((item) => !item.href)?.value,
    },
    {
      name: 'navigationLinks',
      type: 'array',
      defaultValue: defaultHomeData.footer.navigation.map((item) => ({
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
      name: 'contactLinks',
      type: 'array',
      defaultValue: defaultHomeData.footer.contact.map((item) => ({
        label: item.label,
        value: item.value,
        url: item.href,
      })),
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    defaultLinkGroup('legalCta', 'Legal CTA', defaultHomeData.footer.legal[0]),
    {
      name: 'legalLinks',
      type: 'array',
      defaultValue: defaultHomeData.footer.legal.map((item) => ({
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
      name: 'footerBadge',
      type: 'text',
      defaultValue: defaultHomeData.footer.badge,
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: defaultHomeData.footer.copy,
    },
  ],
}
