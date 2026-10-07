import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Reskin Base</Badge>
          <Badge variant="outline">Payload + shadcn/ui</Badge>
        </div>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
          {user ? `Welcome back, ${user.email}` : 'Reusable website base'}
        </h1>
        <p className="max-w-2xl text-muted-foreground text-pretty">
          Fork this repo as the starting point for every client reskin. Payload
          admin stays stock; the front end is wired with Tailwind and shadcn/ui
          so the Website reskin skill can restyle per client later.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href={payloadConfig.routes.admin}>
            <Button>Open admin</Button>
          </Link>
          <a
            href="https://payloadcms.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Payload docs</Button>
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost">shadcn/ui</Button>
          </a>
        </div>
      </header>

      <Separator />

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payload CMS</CardTitle>
            <CardDescription>
              Blank 3.x template with SQLite. Admin UI is unchanged.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Collections, auth, media, and the Lexical editor ship ready for
            content work at <code className="text-foreground">/admin</code>.
          </CardContent>
          <CardFooter>
            <Link href="/admin">
              <Button size="sm" variant="secondary">
                Go to /admin
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui</CardTitle>
            <CardDescription>
              Button, Card, Badge, Input, Separator, Navigation Menu, Sheet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input placeholder="Sample input component" aria-label="Sample" />
            <p className="text-muted-foreground text-sm">
              Add more with{' '}
              <code className="text-foreground">pnpm dlx shadcn@latest add …</code>
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-auto text-sm text-muted-foreground">
        <Separator className="mb-6" />
        Edit <code className="text-foreground">src/app/(frontend)/page.tsx</code>{' '}
        and components under <code className="text-foreground">src/components/ui</code>.
      </footer>
    </div>
  )
}
