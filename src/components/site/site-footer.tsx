import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import type { SiteSettingsContent } from '@/content/types'

export function SiteFooter({ settings }: { settings: SiteSettingsContent }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">{settings.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {settings.footerBlurb}
          </p>
        </div>
        <div>
          <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase">
            Pages
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {settings.footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase">
            Reach
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="size-4" aria-hidden="true" /> {settings.email}
              </a>
            </li>
            <li>
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <span className="font-mono text-[11px] font-semibold" aria-hidden="true">
                  in
                </span>{' '}
                {settings.linkedinLabel}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" /> {settings.location}
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="site-container flex flex-col gap-2 py-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground/60 uppercase sm:flex-row sm:justify-between">
        <span>{settings.copyright}</span>
        <span>{settings.footerNote}</span>
      </div>
    </footer>
  )
}
