import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata: Metadata = pageMetadata('Not found')

export default function NotFound() {
  return (
    <div className="site-container py-28">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
        That page is not in the index.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        The link does not match a page on this site.
      </p>
      <Button nativeButton={false} size="cta" className="mt-8" render={<Link href="/" />}>
        Back home
      </Button>
    </div>
  )
}
