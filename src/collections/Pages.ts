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
          'Homepage keys: hero-eyebrow, hero-line-1, hero-line-2, hero-line-3, hero-body, hero-primary, hero-secondary, hero-status, log-heading, scroll-cue, session-01…04, selected, process, process-prefix, form-01…05, closing. Keep keys stable and edit the text fields.',
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
