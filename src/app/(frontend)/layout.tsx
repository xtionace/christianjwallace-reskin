import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'

import '../globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  description:
    'Reskin Base — Payload CMS blank template with shadcn/ui. Fork this to start every client website reskin.',
  title: 'Reskin Base',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-svh font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
