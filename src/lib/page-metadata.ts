import type { Metadata } from 'next'

/** Document title and the matching social titles. The layout template adds the site suffix. */
export function pageMetadata(title: string, description?: string): Metadata {
  const social = {
    title,
    ...(description ? { description } : {}),
  }
  return {
    title,
    ...(description ? { description } : {}),
    openGraph: social,
    twitter: social,
  }
}
