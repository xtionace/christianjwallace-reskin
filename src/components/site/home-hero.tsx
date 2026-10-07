import { ArrowDown } from 'lucide-react'

import { CtaLink } from '@/components/site/cta-link'
import { InkWash } from '@/components/site/ink-wash'
import { block, blocksByPrefix } from '@/content/types'
import type { PageDoc } from '@/content/types'

export function HomeHero({ page }: { page: PageDoc | undefined }) {
  const eyebrow = block(page, 'hero-eyebrow')
  const line1 = block(page, 'hero-line-1')
  const line2 = block(page, 'hero-line-2')
  const line3 = block(page, 'hero-line-3')
  const body = block(page, 'hero-body')
  const primary = block(page, 'hero-primary')
  const secondary = block(page, 'hero-secondary')
  const status = block(page, 'hero-status')
  const session = blocksByPrefix(page, 'session-')

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--card)_0%,var(--background)_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 70% at 15% 20%, color-mix(in srgb, var(--violet) 5%, transparent), transparent 70%), radial-gradient(55% 60% at 85% 75%, color-mix(in srgb, var(--primary) 5%, transparent), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="ink-in absolute inset-0" aria-hidden="true">
        <InkWash id="hero-ink" />
      </div>

      <div className="site-container relative grid gap-14 pt-20 pb-20 md:pt-28 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:pb-28">
        <div>
          <p className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-primary uppercase">
            <span className="rule-in h-px w-10 bg-primary" aria-hidden="true" />
            {eyebrow?.label}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[88px]"
          >
            <span className="hero-line block">{line1?.title}</span>
            <span className="hero-line block" style={{ animationDelay: '0.18s' }}>
              {line2?.title} <span className="text-primary">{line2?.kicker}</span> {line2?.meta}
            </span>
            <span
              className="hero-line block text-muted-foreground"
              style={{ animationDelay: '0.36s' }}
            >
              {line3?.title}
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {body?.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {primary?.href ? <CtaLink href={primary.href}>{primary.title}</CtaLink> : null}
            {secondary?.href ? (
              <CtaLink href={secondary.href} variant="ghost" showIcon={false}>
                {secondary.title}
              </CtaLink>
            ) : null}
          </div>
        </div>

        <aside aria-label="Session log" className="glass luminous rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase">
              Session log
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-moss uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-moss/60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-moss" />
              </span>
              {status?.title}
            </span>
          </div>
          <dl className="divide-y divide-border">
            {session.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-4 py-3">
                <dt className="font-mono text-[11px] tracking-[0.18em] text-primary/80">
                  {row.label}
                </dt>
                <dd className="text-right text-sm text-foreground">{row.title}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="site-container relative flex items-center gap-3 pb-8 font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
        <ArrowDown className="size-3.5" aria-hidden="true" /> Selected work
      </div>
    </section>
  )
}
