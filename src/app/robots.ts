import type { MetadataRoute } from 'next'

import { isPreviewDeployment } from '@/lib/preview'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://christianjwallace.com/sitemap.xml',
  }
}
