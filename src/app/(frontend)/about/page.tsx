import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'

import { ClosingCta } from '@/components/site/closing-cta'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { block, blocksByPrefix, pageBySlug } from '@/content/types'
import { getPortfolio } from '@/lib/get-portfolio'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'about')
  return { title: page?.title ?? 'About' }
}

export default async function AboutPage() {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'about')
  const current = block(page, 'currently')
  const lineage = block(page, 'lineage')
  const study = block(page, 'study')
  const experience = blocksByPrefix(page, 'exp-')
  const disciplines = blocksByPrefix(page, 'discipline-')
  const education = blocksByPrefix(page, 'education-')

  return (
    <>
      <section className="border-b border-border bg-[linear-gradient(180deg,var(--card),var(--background))]">
        <div className="site-container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.22em] text-primary uppercase">{page?.eyebrow}</p>
            <h1 className="font-display text-5xl leading-[1] font-semibold tracking-[-0.03em] text-foreground md:text-7xl">
              {page?.headline} <span className="text-muted-foreground">{page?.headlineAccent}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page?.lede}</p>
          </div>
          <Card className="luminous gap-0 rounded-2xl bg-card py-0 ring-0">
            <div className="p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">{current?.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-foreground">{current?.title}</p>
              <p className="text-muted-foreground">{current?.meta}</p>
              <Separator className="my-5" />
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">Also</p>
              <p className="mt-2 text-foreground">{current?.kicker}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden="true" /> {portfolio.settings.location}
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section aria-labelledby="lineage-title" className="site-container py-24 md:py-32">
        <SectionHeading
          id="lineage-title"
          eyebrow={lineage?.label ?? 'Lineage'}
          title={
            <>
              {lineage?.title} <span className="text-muted-foreground">{lineage?.kicker}</span>
            </>
          }
          description={lineage?.body}
        />
        <ol className="relative mt-16 border-l border-border pl-8 md:pl-12">
          {experience.map((item, index) => (
            <Reveal key={item.key} as="li" delay={index * 0.04} className="relative pb-10 last:pb-0">
              <span
                className={cn(
                  'absolute top-2 -left-[37px] size-2.5 rounded-full ring-4 ring-background md:-left-[53px]',
                  index === 0 ? 'bg-primary shadow-[0_0_14px_rgba(212,175,55,0.7)]' : 'bg-muted-foreground/40',
                )}
                aria-hidden="true"
              />
              <div className="group -m-4 grid gap-2 rounded-2xl border border-transparent p-4 transition-colors hover:border-white/6 hover:bg-card md:grid-cols-[220px_1fr] md:gap-8">
                <div>
                  <p className="font-display text-2xl font-semibold text-foreground">{item.title}</p>
                  {item.kicker ? <p className="text-sm text-violet-soft">{item.kicker}</p> : null}
                </div>
                <div>
                  {item.label ? <p className="text-base font-medium text-foreground">{item.label}</p> : null}
                  {item.meta ? <p className="font-mono text-xs tracking-[0.12em] text-primary">{item.meta}</p> : null}
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="disciplines-title" className="border-y border-border bg-card">
        <div className="site-container py-20">
          <h2 id="disciplines-title" className="sr-only">
            Disciplines
          </h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {disciplines.map((item, index) => (
              <Reveal key={item.key} as="li" delay={index * 0.08} className="luminous rounded-2xl bg-background/60 p-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary">0{index + 1}</span>
                <p className="mt-4 font-display text-xl font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {education.length > 0 ? (
        <section aria-labelledby="study-title" className="site-container py-24">
          <SectionHeading
            id="study-title"
            eyebrow={study?.label ?? 'Study'}
            title={
              <>
                {study?.title} <span className="text-muted-foreground">{study?.kicker}</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.key} className="luminous rounded-2xl bg-card p-6">
                <p className="font-display text-2xl font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 font-mono text-xs tracking-[0.12em] text-primary">{item.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ClosingCta page={page} email={portfolio.settings.email} />
    </>
  )
}
