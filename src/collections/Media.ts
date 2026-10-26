import type { CollectionConfig } from 'payload'

import { payloadMediaDir } from '@/lib/media-dir'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: payloadMediaDir(),
  },
}
