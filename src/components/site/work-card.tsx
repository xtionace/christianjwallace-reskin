import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Lock, Plus } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { ProjectContent } from '@/content/types'
import { cn } from '@/lib/utils'

const shell = {
  filled:
    'border border-moss/40 bg-card shadow-[0_0_0_1px_rgba(42,157,143,0.08),0_30px_80px_-40px_rgba(42,157,143,0.55)]',
  tbd: 'luminous bg-card group-hover:shadow-[0_30px_80px_-40px_rgba(196,69,54,0.7)]',
  reserved: 'border border-dashed border-white/12 bg-background/60',
} as const

export function WorkCard({
  item,
  layout = 'grid',
}: {
  item: ProjectContent
  layout?: 'rail' | 'grid'
}) {
  const mediaAspect = layout === 'rail' ? 'aspect-[16/10]' : 'aspect-[4/3]'

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={item.href}
        className="group block h-full rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
        aria-label={`${item.index} ${item.title} — ${item.client}`}
      >
        <Card
          className={cn(
            'relative h-full gap-0 overflow-hidden rounded-2xl py-0 ring-0',
            shell[item.status],
          )}
        >
          {item.status === 'filled' ? (
            <span className="absolute inset-y-0 left-0 z-20 w-[3px] bg-moss" aria-hidden="true" />
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
                item.status === 'filled'
                  ? 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--moss)_18%,transparent),transparent_60%)]'
                  : 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--crimson)_18%,transparent),transparent_60%)]',
              )}
              aria-hidden="true"
            />
          ) : null}

          <div className={cn('relative overflow-hidden', mediaAspect)}>
            {item.status === 'filled' && item.imageUrl ? (
              <>
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
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,var(--card))]"
                  aria-hidden="true"
                />
                <Badge
                  variant="moss"
                  className="absolute top-4 left-4 h-auto bg-background/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur"
                >
                  <span className="size-1.5 rounded-full bg-moss" aria-hidden="true" /> Live
                </Badge>
              </>
            ) : null}
            {item.status === 'tbd' ? (
              <div className="relative size-full bg-secondary">
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
                  }}
                  aria-hidden="true"
                />
                <span className="absolute -bottom-4 right-3 font-display text-[88px] leading-none font-bold text-white/4 select-none">
                  {item.title}
                </span>
                <div className="absolute inset-0 grid place-items-center">
                  <Badge
                    variant="crimson"
                    className="h-auto px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase"
                  >
                    <Lock aria-hidden="true" /> Screenshots pending clearance
                  </Badge>
                </div>
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

          <CardHeader className="relative z-20 px-5 pt-5 md:px-6">
            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
              <span
                className={item.status === 'filled' ? 'text-primary' : 'text-muted-foreground/60'}
              >
                {item.index}
              </span>
              <span
                className={
                  item.status === 'filled'
                    ? 'text-moss'
                    : item.status === 'tbd'
                      ? 'text-crimson-soft'
                      : 'text-muted-foreground/50'
                }
              >
                {item.status === 'filled'
                  ? 'Case study'
                  : item.status === 'tbd'
                    ? 'Case study TBD'
                    : 'Reserved'}
              </span>
            </div>
            <h3
              className={cn(
                'font-display font-semibold tracking-tight',
                layout === 'rail' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
                item.status === 'reserved' ? 'text-muted-foreground' : 'text-foreground',
              )}
            >
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.client}</p>
          </CardHeader>
          <CardContent className="relative z-20 px-5 md:px-6">
            <p className="text-sm leading-relaxed text-muted-foreground/80">{item.summary}</p>
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
            <span
              className={cn(
                'grid size-9 shrink-0 place-items-center rounded-full border transition-colors',
                item.status === 'filled'
                  ? 'border-moss/40 text-moss group-hover:bg-moss group-hover:text-background'
                  : item.status === 'tbd'
                    ? 'border-border text-muted-foreground group-hover:border-crimson/60 group-hover:text-crimson-soft'
                    : 'border-border text-muted-foreground/60 group-hover:border-primary/50 group-hover:text-primary',
              )}
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}
