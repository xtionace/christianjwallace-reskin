import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Lock, Plus } from 'lucide-react'

import { CardLoop } from '@/components/site/card-loop'
import { CardVisual, hasCardVisual } from '@/components/site/card-visuals'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { ProjectContent, WorkStatus } from '@/content/types'
import { cn } from '@/lib/utils'

const shell: Record<WorkStatus, string> = {
  filled:
    'border border-moss/40 bg-card shadow-[0_0_0_1px_rgba(42,157,143,0.08),0_30px_80px_-40px_rgba(42,157,143,0.55)]',
  summary: 'luminous bg-card',
  card: 'border border-white/10 bg-card',
  tbd: 'luminous bg-card group-hover:shadow-[0_30px_80px_-40px_rgba(196,69,54,0.7)]',
  reserved: 'border border-dashed border-white/12 bg-background/60',
}

export function WorkCard({
  item,
  layout = 'grid',
  playLoop = false,
  cardBlurb,
  headingLevel = 'h3',
}: {
  item: ProjectContent
  layout?: 'rail' | 'grid'
  playLoop?: boolean
  cardBlurb?: string
  headingLevel?: 'h2' | 'h3'
}) {
  const mediaAspect = layout === 'rail' ? 'aspect-[16/10]' : 'aspect-[4/3]'
  const linked = Boolean(item.href) && item.kind !== 'card' && item.kind !== 'reserved'
  const showVisual = hasCardVisual(item.caseSlug)
  const photo = item.status === 'filled' && Boolean(item.imageUrl)
  const lockAspect = photo || !showVisual
  const goldCase = item.status === 'filled' && item.accent === 'gold'
  const showRole = item.status === 'summary' || item.status === 'card' || goldCase
  const Title = headingLevel

  const media = (
    <div className={cn('relative', lockAspect && 'overflow-hidden', lockAspect && mediaAspect)}>
      {item.status === 'filled' && item.imageUrl ? (
        <>
          {playLoop ? (
            <CardLoop
              src="/media/biobuild-card-loop.mp4"
              poster="/media/biobuild-card-poster.jpg"
              alt="BioBuild Systems homepage."
            />
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.imageAlt || item.title}
              fill
              sizes={
                layout === 'rail'
                  ? '(min-width: 1024px) 46vw, 86vw'
                  : '(min-width: 1024px) 33vw, 100vw'
              }
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
              priority={layout === 'rail'}
            />
          )}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,var(--card))]"
            aria-hidden="true"
          />
          {item.mediaBadge ? (
            <Badge
              variant="moss"
              className="absolute top-4 left-4 h-auto bg-background/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur"
            >
              <span className="size-1.5 rounded-full bg-moss" aria-hidden="true" />
              {item.mediaBadge}
            </Badge>
          ) : null}
        </>
      ) : null}
      {showVisual ? <CardVisual slug={item.caseSlug} /> : null}
      {item.status === 'tbd' && !showVisual ? (
        <div className="relative size-full bg-secondary">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
            }}
            aria-hidden="true"
          />
          <span
            className="tbd-watermark absolute -bottom-4 right-3 font-display text-[88px] leading-none font-bold select-none"
            data-title={item.title}
            aria-hidden="true"
          />
          {item.mediaBadge ? (
            <div className="absolute inset-0 grid place-items-center">
              <Badge
                variant="crimson"
                className="h-auto px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase"
              >
                <Lock aria-hidden="true" /> {item.mediaBadge}
              </Badge>
            </div>
          ) : null}
        </div>
      ) : null}
      {item.status === 'reserved' ? (
        <div className="grid size-full place-items-center">
          <span className="grid size-12 place-items-center rounded-full border border-dashed border-white/20 text-muted-foreground/70 transition-colors group-hover:border-primary/50 group-hover:text-primary">
            <Plus className="size-5" aria-hidden="true" />
          </span>
        </div>
      ) : null}
    </div>
  )

  const body = (
    <Card
      className={cn(
        'relative h-full gap-0 overflow-hidden rounded-2xl py-0 ring-0',
        shell[item.status],
        goldCase && 'luminous border-primary/30',
      )}
    >
      {item.status === 'filled' && !goldCase ? (
        <span className="absolute inset-y-0 left-0 z-20 w-[3px] bg-moss" aria-hidden="true" />
      ) : null}
      {goldCase || item.status === 'summary' || item.status === 'card' ? (
        <span className="absolute inset-y-0 left-0 z-20 w-[3px] bg-primary" aria-hidden="true" />
      ) : null}
      {item.status === 'tbd' ? (
        <span
          className="absolute inset-y-0 left-0 z-20 w-[3px] origin-top scale-y-0 bg-crimson transition-transform duration-500 group-hover:scale-y-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
      ) : null}
      {item.status !== 'reserved' ? (
        <span
          className={cn(
            'pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none',
            item.status === 'filled' && !goldCase
              ? 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--moss)_18%,transparent),transparent_60%)]'
              : item.status === 'tbd'
                ? 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--crimson)_18%,transparent),transparent_60%)]'
                : 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_60%)]',
          )}
          aria-hidden="true"
        />
      ) : null}

      {media}

      <CardHeader className="relative z-20 px-5 pt-5 md:px-6">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
          <span
            className={
              item.status === 'filled' && !goldCase
                ? 'text-moss'
                : item.status === 'filled' || item.status === 'summary' || item.status === 'card'
                  ? 'text-primary'
                  : 'text-muted-foreground/60'
            }
          >
            {item.index}
          </span>
          <span
            className={
              item.status === 'filled' && !goldCase
                ? 'text-moss'
                : item.status === 'filled' || item.status === 'summary' || item.status === 'card'
                  ? 'text-primary'
                  : item.status === 'tbd'
                    ? 'text-crimson-soft'
                    : 'text-muted-foreground/50'
            }
          >
            {item.statusLabel}
          </span>
        </div>
        <Title
          className={cn(
            'font-display font-semibold tracking-tight text-foreground',
            layout === 'rail' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
          )}
        >
          {item.title}
        </Title>
        {showRole ? (
          <div>
            <p className="text-sm text-foreground/90">{item.role}</p>
            {(item.status === 'summary' || goldCase) && (item.dates || item.year) ? (
              <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-primary">
                {item.dates || item.year}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{item.client}</p>
        )}
      </CardHeader>
      <CardContent className="relative z-20 px-5 md:px-6">
        <p className="text-sm leading-relaxed text-muted-foreground/80">
          {cardBlurb || item.summary}
        </p>
        {item.status === 'summary' ? (
          <p className="mt-3 text-xs text-primary">Full case study coming later.</p>
        ) : null}
      </CardContent>
      <CardFooter className="relative z-20 mt-auto items-end justify-between gap-3 px-5 pt-5 pb-5 md:px-6 md:pb-6">
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li key={tag}>
              <Badge
                variant="outline"
                className="h-auto px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
        {linked ? (
          <span
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-full border transition-colors',
              item.status === 'filled' && !goldCase
                ? 'border-moss/40 text-moss group-hover:bg-moss group-hover:text-background'
                : 'border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary',
            )}
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4" />
          </span>
        ) : null}
      </CardFooter>
    </Card>
  )

  return (
    <div
      id={item.caseSlug ? `work-card-${item.caseSlug}` : undefined}
      data-project={item.caseSlug || undefined}
      className={cn(
        'h-full',
        linked &&
          'transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      )}
    >
      {linked ? (
        <Link
          href={item.href}
          className="group block h-full rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          {body}
        </Link>
      ) : (
        <div className="group h-full">{body}</div>
      )}
    </div>
  )
}
