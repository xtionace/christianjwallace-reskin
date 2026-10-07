import type { Metadata } from 'next'

import { ClosingCta } from '@/components/site/closing-cta'
import { WorkIndex } from '@/components/site/work-index'
import { block, pageBySlug } from '@/content/types'
import { getPortfolio } from '@/lib/get-portfolio'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'work')
  return { title: page?.title ?? 'Work' }
}

export default async function WorkPage() {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'work')
  const secondary = block(page, 'closing-secondary')

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--card),var(--background))]">
        <div className="site-container py-20 md:py-28">
          <p className="mb-6 font-mono text-xs tracking-[0.22em] text-primary uppercase">{page?.eyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1] font-semibold tracking-[-0.03em] text-foreground md:text-7xl">
            {page?.headline} <span className="text-muted-foreground">{page?.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page?.lede}</p>
        </div>
      </section>
      <WorkIndex page={page} projects={portfolio.projects} />
      <ClosingCta page={page} email={portfolio.settings.email} secondary={secondary} />
    </>
  )
}
