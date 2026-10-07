import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Portfolio',
    description:
      'Name, email, LinkedIn, navigation, and footer. Do not add a personal phone number.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'roleLine', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'linkedinLabel', type: 'text' },
    { name: 'location', type: 'text' },
    {
      name: 'previewBadge',
      type: 'text',
      admin: {
        description:
          'Shown in the header. Clear this when the site should no longer say private preview.',
      },
    },
    { name: 'primaryCtaLabel', type: 'text' },
    { name: 'primaryCtaHref', type: 'text' },
    { name: 'footerBlurb', type: 'textarea' },
    { name: 'copyright', type: 'text' },
    { name: 'footerNote', type: 'text' },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
