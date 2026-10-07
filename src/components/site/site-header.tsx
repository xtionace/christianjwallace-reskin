'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'

import { CtaLink } from '@/components/site/cta-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { SiteSettingsContent } from '@/content/types'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader({ settings }: { settings: SiteSettingsContent }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="site-container flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`${settings.name} — home`}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-primary/30 bg-primary/10 font-display text-sm font-bold text-primary transition-colors group-hover:border-primary/60">
            CW
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-semibold text-foreground">
              {settings.name}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
              {settings.roleLine}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {settings.navLinks.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
                {active ? (
                  <span
                    className="absolute inset-x-4 -bottom-px h-px bg-primary"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {settings.previewBadge ? (
            <Badge
              variant="outline"
              className="hidden h-auto border-violet/30 bg-violet/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-violet uppercase lg:inline-flex"
            >
              {settings.previewBadge}
            </Badge>
          ) : null}
          <CtaLink href={settings.primaryCtaHref} className="hidden sm:inline-flex">
            {settings.primaryCtaLabel}
          </CtaLink>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="top" className="bg-background">
              <SheetHeader>
                <SheetTitle className="font-display">{settings.name}</SheetTitle>
                <SheetDescription>{settings.roleLine}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-6">
                {settings.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'rounded-lg px-3 py-3 font-display text-lg',
                      isActive(pathname, link.href)
                        ? 'bg-secondary text-primary'
                        : 'text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <CtaLink href={settings.primaryCtaHref} className="mt-3">
                  {settings.primaryCtaLabel}
                </CtaLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
