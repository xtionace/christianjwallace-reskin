import { ArrowDown } from 'lucide-react'

import { CtaLink } from '@/components/site/cta-link'
import { InkWash } from '@/components/site/ink-wash'
import { block, blocksByPrefix } from '@/content/types'
import type { Block, PageDoc } from '@/content/types'

function HeroLine({
  line,
  delay,
  muted = false,
}: {
  line: Block | undefined
  delay: string
  muted?: boolean
}) {
  if (!line?.title && !line?.kicker && !line?.meta) return null
  return (
    <span
      className={muted ? 'hero-line block text-muted-foreground' : 'hero-line block'}
      style={{ animationDelay: delay }}
    >
      {line.title}
      {line.kicker ? <span className="text-primary"> {line.kicker}</span> : null}
      {line.meta ? ` ${line.meta}` : null}
    </span>
  )
}

export function HomeHero({ page }: { page: PageDoc | undefined }) {
  const eyebrow = block(page, 'hero-eyebrow')
  const line1 = block(page, 'hero-line-1')
  const line2 = block(page, 'hero-line-2')
  const line3 = block(page, 'hero-line-3')
  const body = block(page, 'hero-body')
  const primary = block(page, 'hero-primary')
  const secondary = block(page, 'hero-secondary')
  const status = block(page, 'hero-status')
  const logHeading = block(page, 'log-heading')
  const scrollCue = block(page, 'scroll-cue')
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

      <div className="site-container relative pt-16 pb-16 md:pt-24 lg:pb-24">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-primary uppercase">
          <span className="rule-in h-px w-10 bg-primary" aria-hidden="true" />
          {eyebrow?.label}
        </p>
        <h1
          id="hero-title"
          className="max-w-[16em] font-display text-[1.7rem] leading-[1.15] font-semibold tracking-[-0.03em] text-foreground sm:max-w-[20em] sm:text-5xl sm:leading-[1.08] lg:max-w-[22em] lg:text-[3.5rem] lg:leading-[1.06]"
        >
          <HeroLine line={line1} delay="0s" />
          <HeroLine line={line2} delay="0.12s" />
          <HeroLine line={line3} delay="0.24s" />
        </h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{body?.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primary?.href ? <CtaLink href={primary.href}>{primary.title}</CtaLink> : null}
              {secondary?.href ? (
                <CtaLink href={secondary.href} variant="ghost" showIcon={false}>
                  {secondary.title}
                </CtaLink>
              ) : null}
            </div>
          </div>

          <aside aria-label={logHeading?.label} className="glass luminous rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase">
                {logHeading?.label}
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
      </div>

      <div className="site-container relative flex items-center gap-3 pb-8 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        <ArrowDown className="size-3.5" aria-hidden="true" /> {scrollCue?.label}
      </div>
    </section>
  )
}
