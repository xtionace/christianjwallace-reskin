import type { MetadataRoute } from 'next'

import { isPreviewDeployment } from '@/lib/preview'

export const dynamic = 'force-dynamic'

const paths = ['/', '/work', '/work/biobuild', '/work/att', '/work/t-mobile', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment()) return []

  return paths.map((path) => ({
    url: path === '/' ? 'https://christianjwallace.com' : `https://christianjwallace.com${path}`,
    lastModified: new Date(),
  }))
}
