import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'projectType', 'createdAt'],
    group: 'Portfolio',
    description:
      'Messages saved from the public contact form. Nothing is emailed automatically — reply from the address in Site settings. Extra $0, no mail provider.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'projectType', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
}
