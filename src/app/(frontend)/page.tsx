import { ClosingCta } from '@/components/site/closing-cta'
import { CtaLink } from '@/components/site/cta-link'
import { HomeHero } from '@/components/site/home-hero'
import { ProcessForms } from '@/components/site/process-forms'
import { SectionHeading } from '@/components/site/section-heading'
import { WorkRail } from '@/components/site/work-rail'
import { block, pageBySlug } from '@/content/types'
import { getPortfolio } from '@/lib/get-portfolio'

export default async function HomePage() {
  const portfolio = await getPortfolio()
  const page = pageBySlug(portfolio.pages, 'home')
  const selected = block(page, 'selected')
  const rail = portfolio.projects
    .filter((project) => project.showOnRail)
    .sort((a, b) => a.railOrder - b.railOrder)

  return (
    <>
      <HomeHero page={page} />
      <section aria-labelledby="selected-work-title" className="py-24 md:py-32">
        <div className="site-container mb-12">
          <SectionHeading
            id="selected-work-title"
            eyebrow={selected?.label}
            title={
              <>
                {selected?.title} <span className="text-muted-foreground">{selected?.kicker}</span>
              </>
            }
            description={selected?.body}
            action={
              selected?.href ? (
                <CtaLink href={selected.href} variant="ghost">
                  {selected.meta}
                </CtaLink>
              ) : null
            }
          />
        </div>
        <WorkRail items={rail} label={selected?.label} />
      </section>
      <ProcessForms page={page} />
      <ClosingCta page={page} email={portfolio.settings.email} />
    </>
  )
}
