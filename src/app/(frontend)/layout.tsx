import React from 'react'
import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getPortfolio } from '@/lib/get-portfolio'

import '../globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://christianjwallace.com'),
  title: {
    default: 'Christian Wallace — Web design & frontend craft',
    template: '%s · Christian Wallace',
  },
  description:
    'Christian Wallace designs and builds websites with enterprise discipline and craftsperson’s care. BioBuild Systems is the filled case; carrier work stays pending clearance.',
  robots: { index: false, follow: false },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const portfolio = await getPortfolio()

  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader settings={portfolio.settings} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={portfolio.settings} />
      </body>
    </html>
  )
}
