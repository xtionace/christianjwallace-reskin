import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'

import { CaseMeta } from '@/components/site/case-meta'
import { ClosingCta } from '@/components/site/closing-cta'
import { CtaLink } from '@/components/site/cta-link'
import { Reveal } from '@/components/site/reveal'
import { ScreenshotPlate } from '@/components/site/screenshot-plate'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { caseSlots } from '@/content/portfolio'
import { paragraphs } from '@/content/types'
import type { Portfolio, ProjectContent } from '@/content/types'

function galleryFor(
  project: ProjectContent,
  placement: ProjectContent['gallery'][number]['placement'],
) {
  return project.gallery.find((item) => item.placement === placement)
}

export function CaseStudy({
  portfolio,
  project,
}: {
  portfolio: Portfolio
  project: ProjectContent
}) {
  const slots = caseSlots(portfolio.projects, project.caseSlug)
  const hero = galleryFor(project, 'hero')
  const problem = galleryFor(project, 'problem')
  const approach = galleryFor(project, 'approach')
  const sections = project.sections.map((section) => ({
    id: section.anchor,
    label: section.eyebrow || section.title,
  }))

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,var(--card),var(--background))]">
        <div className="site-container pt-12 pb-12 md:pt-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Work index
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
            <span className="text-primary">
              {project.kind === 'case' ? `Case ${project.index}` : `Slots ${slots.join(' · ')}`}
            </span>
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            {project.kind === 'case' ? (
              <Badge
                variant="moss"
                className="h-auto px-2.5 py-1 font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                <span className="size-1.5 rounded-full bg-moss" aria-hidden="true" /> Live
              </Badge>
            ) : (
              <Badge
                variant="crimson"
                className="h-auto px-2.5 py-1 font-mono text-[11px] tracking-[0.16em] uppercase"
              >
                Case study TBD
              </Badge>
            )}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.03em] text-foreground md:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {project.kind === 'case' ? (
              <>
                <span className="text-foreground">Natural Building · Philippine-Made.</span> Bamboo,
                ecocrete, and rice-husk blocks — explained plainly, from San Carlos City.
              </>
            ) : (
              'Case study in preparation. Content and screenshots will be published only after employer clearance.'
            )}
          </p>
        </div>
        {hero ? (
          <div className="site-container pb-16">
            <div className="relative overflow-hidden rounded-3xl border border-moss/30 shadow-[0_40px_120px_-50px_rgba(42,157,143,0.6)]">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={hero.url}
                  alt={hero.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1320px) 1272px, 100vw"
                />
              </div>
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,8,12,0.85))]"
                aria-hidden="true"
              />
              {hero.caption ? (
                <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.2em] text-foreground/80 uppercase">
                  {hero.caption}
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="pb-4" />
        )}
      </section>

      <div className="site-container grid gap-12 py-20 lg:grid-cols-[300px_1fr] lg:gap-16">
        <CaseMeta
          rows={
            project.kind === 'case'
              ? [
                  { label: 'Role', value: project.role },
                  { label: 'Year', value: project.year },
                  { label: 'Location', value: project.location },
                ]
              : [
                  { label: 'Role', value: project.role },
                  { label: 'Dates', value: project.dates },
                  { label: 'Status', value: 'Pending clearance' },
                ]
          }
          tags={project.stack}
          liveUrl={project.liveUrl}
          liveLabel={project.liveLabel}
          log={project.log}
          accent={project.accent}
          sections={sections}
        />

        <div className="flex min-w-0 flex-col gap-24">
          {project.kind === 'corporate' && project.ndaNote ? (
            <Reveal>
              <Alert className="border-primary/20 bg-primary/5">
                <ShieldCheck className="text-primary" />
                <AlertTitle>NDA-safe stub</AlertTitle>
                <AlertDescription>{project.ndaNote}</AlertDescription>
              </Alert>
            </Reveal>
          ) : null}

          {project.sections.map((section, index) => (
            <section
              key={section.anchor}
              id={section.anchor}
              aria-labelledby={`${section.anchor}-title`}
              className="scroll-mt-24"
            >
              <Reveal>
                <p className="mb-4 font-mono text-xs tracking-[0.2em] text-primary uppercase">
                  {section.eyebrow}
                </p>
                <h2
                  id={`${section.anchor}-title`}
                  className={
                    project.kind === 'corporate'
                      ? 'font-display text-3xl font-semibold tracking-tight text-muted-foreground/70 md:text-4xl'
                      : 'max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl'
                  }
                >
                  {section.title}
                </h2>
                {paragraphs(section.body).length > 0 ? (
                  <div className="mt-6 flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {paragraphs(section.body).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 flex max-w-2xl flex-col gap-3" aria-hidden="true">
                    <div className="h-3 w-full rounded-full bg-white/4" />
                    <div className="h-3 w-11/12 rounded-full bg-white/4" />
                    <div className="h-3 w-3/4 rounded-full bg-white/4" />
                  </div>
                )}
              </Reveal>

              {index === 0 && problem ? (
                <Reveal delay={0.1} className="mt-10">
                  <figure className="overflow-hidden rounded-2xl border border-border">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={problem.url}
                        alt={problem.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 720px, 100vw"
                      />
                    </div>
                    {problem.caption ? (
                      <figcaption className="border-t border-border bg-card px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground/70 uppercase">
                        {problem.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ) : null}

              {index === 1 && approach ? (
                <Reveal delay={0.1} className="mt-10 grid gap-5 md:grid-cols-[1.2fr_1fr]">
                  <figure className="relative min-h-64 overflow-hidden rounded-2xl border border-border">
                    <Image
                      src={approach.url}
                      alt={approach.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </figure>
                  <ul className="grid gap-3">
                    {project.highlights.map((highlight) => (
                      <li key={highlight.title} className="luminous rounded-2xl bg-card p-5">
                        <p className="font-display text-lg font-semibold text-foreground">
                          {highlight.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{highlight.body}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {index === 2 && project.facts.length > 0 ? (
                <Reveal delay={0.1} className="mt-10">
                  <div className="relative overflow-hidden rounded-2xl border border-moss/30 bg-card p-6 md:p-8">
                    <span
                      className="absolute inset-y-0 left-0 w-[3px] bg-moss"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-[11px] tracking-[0.2em] text-moss uppercase">
                      Site facts
                    </p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {project.facts.map((fact) => (
                        <li key={fact} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-moss" aria-hidden="true" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                    {project.liveUrl ? (
                      <div className="mt-8">
                        <CtaLink href={project.liveUrl} external variant="ghost">
                          Visit {project.liveLabel || 'the live site'}
                        </CtaLink>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              ) : null}
            </section>
          ))}

          {project.plates.length > 0 ? (
            <section aria-labelledby="plates-title">
              <Reveal>
                <h2
                  id="plates-title"
                  className="mb-6 font-mono text-xs tracking-[0.2em] text-primary uppercase"
                >
                  Screenshot plates
                </h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {project.plates.map((plate) => (
                    <ScreenshotPlate key={plate.label} label={plate.label} aspect={plate.aspect} />
                  ))}
                </div>
              </Reveal>
            </section>
          ) : null}

          {project.nextHref ? (
            <Link
              href={project.nextHref}
              className="group flex items-center justify-between rounded-2xl border border-border p-6 transition-colors hover:border-crimson/50"
            >
              <span>
                <span className="block font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
                  Next — {project.nextIndex}
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold text-foreground">
                  {project.nextTitle}
                </span>
              </span>
              <ArrowRight
                className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-crimson-soft motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </div>
      </div>

      <ClosingCta closing={project.closing} email={portfolio.settings.email} />
    </>
  )
}
