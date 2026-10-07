import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Portfolio',
    description:
      'Page copy for Home, Work, About, and Contact. Edit text here — the front end reads these documents.',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'home, work, about, or contact. Used as the route key.',
      },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    {
      name: 'headlineAccent',
      type: 'text',
      admin: { description: 'Muted or gold second half of the headline.' },
    },
    { name: 'lede', type: 'textarea' },
    {
      name: 'blocks',
      type: 'array',
      labels: { singular: 'Block', plural: 'Blocks' },
      admin: {
        description:
          'Structured bits of copy (hero lines, process forms, résumé rows). The key field is how the page finds each block — keep keys stable.',
      },
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'kicker', type: 'text' },
        { name: 'meta', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
