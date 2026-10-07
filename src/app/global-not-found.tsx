import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, Geist } from 'next/font/google'

import { Button } from '@/components/ui/button'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Page not found · Christian Wallace',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${display.variable}`}>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <div className="site-container py-28">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">404</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-7xl">
            That page is not in the index.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            The slot may still be reserved, or the link no longer matches a case study.
          </p>
          <Button nativeButton={false} size="cta" className="mt-8" render={<Link href="/" />}>
            Back home
          </Button>
        </div>
      </body>
    </html>
  )
}
