import { Mail } from 'lucide-react'

import { CtaLink } from '@/components/site/cta-link'
import { InkWash } from '@/components/site/ink-wash'
import { Reveal } from '@/components/site/reveal'
import { block } from '@/content/types'
import type { PageDoc, ProjectClosing } from '@/content/types'

type ClosingCtaProps = {
  page?: PageDoc
  closing?: ProjectClosing
  email: string
  secondary?: { title?: string; href?: string }
}

export function ClosingCta({ page, closing, email, secondary }: ClosingCtaProps) {
  const fromPage = block(page, 'closing')
  const eyebrow = closing?.eyebrow || fromPage?.label
  const title = closing?.title || fromPage?.title
  const accent = closing?.accent || fromPage?.kicker
  const description = closing?.body || fromPage?.body
  const primaryLabel = closing?.primaryLabel || fromPage?.meta
  const primaryHref = closing?.primaryHref || fromPage?.href
  const secondaryLabel = closing?.secondaryLabel || secondary?.title
  const secondaryHref = closing?.secondaryHref || secondary?.href

  return (
    <section aria-labelledby="closing-cta-title" className="site-container py-24 md:py-32">
      <Reveal>
        <div className="luminous relative overflow-hidden rounded-3xl bg-card px-6 py-16 md:px-16 md:py-20">
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <InkWash id="closing-ink" />
          </div>
          <div
            className="absolute -top-24 -right-24 size-72 rounded-full bg-violet/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 size-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-xs tracking-[0.2em] text-primary uppercase">
                {eyebrow}
              </p>
              <h2
                id="closing-cta-title"
                className="font-display text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl"
              >
                {title} {accent ? <span className="text-primary">{accent}</span> : null}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              {secondaryLabel && secondaryHref ? (
                <CtaLink href={secondaryHref}>{secondaryLabel}</CtaLink>
              ) : null}
              {primaryLabel && primaryHref ? (
                <CtaLink href={primaryHref} variant={secondaryLabel ? 'ghost' : 'primary'}>
                  {primaryLabel}
                </CtaLink>
              ) : null}
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4" aria-hidden="true" /> {email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
