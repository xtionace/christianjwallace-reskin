import type { Metadata } from 'next'
import { CalendarClock, Check, Mail, MapPin } from 'lucide-react'

import { ContactForm } from '@/components/site/contact-form'
import { CopyEmail } from '@/components/site/copy-email'
import { CtaLink } from '@/components/site/cta-link'
import { Card } from '@/components/ui/card'
import { block, blocksByPrefix, pageBySlug } from '@/content/types'
import { getPortfolio } from '@/lib/get-portfolio'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'contact')
  return { title: page?.title ?? 'Contact' }
}

export default async function ContactPage() {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'contact')
  const book = block(page, 'book')
  const form = block(page, 'form')
  const note = block(page, 'form-note')
  const success = block(page, 'form-success')
  const points = blocksByPrefix(page, 'book-point-')
  const projectTypes = blocksByPrefix(page, 'project-type-')
    .map((item) => item.title)
    .filter((title): title is string => Boolean(title))
  const mailto = `mailto:${portfolio.settings.email}?subject=${encodeURIComponent('Book a call — christianjwallace.com')}`

  return (
    <>
      <section className="border-b border-border bg-[linear-gradient(180deg,var(--card),var(--background))]">
        <div className="site-container py-20 md:py-24">
          <p className="mb-6 font-mono text-xs tracking-[0.22em] text-primary uppercase">{page?.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1] font-semibold tracking-[-0.03em] text-foreground md:text-7xl">
            {page?.headline} <span className="text-primary">{page?.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page?.lede}</p>
        </div>
      </section>

      <div className="site-container grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-5">
          <section
            id="book"
            aria-labelledby="book-title"
            className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-primary/25 bg-card p-7 shadow-[0_30px_90px_-50px_rgba(212,175,55,0.6)]"
          >
            <div className="absolute -top-20 -right-20 size-56 rounded-full bg-violet/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <CalendarClock className="size-5" aria-hidden="true" />
              </span>
              <h2 id="book-title" className="mt-5 font-display text-3xl font-semibold text-foreground">
                {book?.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{book?.body}</p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                {points.map((point) => (
                  <li key={point.key} className="flex items-center gap-2">
                    <Check className="size-4 text-moss" aria-hidden="true" /> {point.title}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <CtaLink href={mailto} external className="w-full">
                  {book?.meta ?? 'Request a time'}
                </CtaLink>
              </div>
            </div>
          </section>

          <Card className="luminous gap-0 rounded-3xl bg-card py-0 ring-0">
            <ul className="flex flex-col gap-4 p-7">
              <li className="flex items-center justify-between gap-3">
                <a href={`mailto:${portfolio.settings.email}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                  <Mail className="size-4 text-primary" aria-hidden="true" /> {portfolio.settings.email}
                </a>
                <CopyEmail email={portfolio.settings.email} />
              </li>
              <li>
                <a
                  href={portfolio.settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                >
                  <span className="font-mono text-[11px] font-semibold text-primary" aria-hidden="true">
                    in
                  </span>{' '}
                  {portfolio.settings.linkedinUrl.replace('https://www.', '')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden="true" /> {portfolio.settings.location}
              </li>
            </ul>
          </Card>
        </div>

        <ContactForm
          projectTypes={projectTypes}
          title={form?.title ?? 'Start a project'}
          description={form?.body ?? ''}
          note={note?.body ?? 'No phone needed. Email only.'}
          successTitle={success?.title ?? 'Message saved.'}
          successBody={success?.body ?? 'Thanks — I’ll reply personally from'}
          email={portfolio.settings.email}
        />
      </div>
    </>
  )
}
