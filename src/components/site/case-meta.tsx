import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Accent } from '@/content/types'
import { cn } from '@/lib/utils'

type CaseMetaProps = {
  rows: { label: string; value: string }[]
  tags?: string[]
  liveUrl?: string
  liveLabel?: string
  log?: { stamp: string; label: string }[]
  accent?: Accent
  sections?: { id: string; label: string }[]
}

export function CaseMeta({
  rows,
  tags,
  liveUrl,
  liveLabel,
  log,
  accent = 'moss',
  sections,
}: CaseMetaProps) {
  return (
    <aside aria-label="Project details" className="lg:sticky lg:top-24">
      <Card className="luminous relative gap-0 overflow-hidden rounded-2xl bg-card py-0 ring-0">
        <span
          className={cn(
            'absolute inset-y-0 left-0 w-[3px]',
            accent === 'moss' ? 'bg-moss' : 'bg-crimson',
          )}
          aria-hidden="true"
        />
        <dl className="flex flex-col gap-4 p-6">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
        {tags && tags.length > 0 ? (
          <div className="border-t border-border px-6 pt-5 pb-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="gold" className="h-auto px-2.5 py-1 text-[11px]">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {liveUrl ? (
          <div className="px-6 pb-6">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-moss/30 bg-moss/10 px-4 py-3 text-sm text-foreground transition-colors hover:border-moss/60"
            >
              <span>
                <span className="block font-mono text-[10px] tracking-[0.2em] text-moss uppercase">
                  Live URL
                </span>
                {liveLabel || liveUrl}
              </span>
              <ExternalLink className="size-4 text-moss" aria-hidden="true" />
            </a>
          </div>
        ) : null}
        {log && log.length > 0 ? (
          <div className="border-t border-border px-6 pt-5 pb-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              Session log
            </p>
            <ol className="mt-3 flex flex-col gap-2">
              {log.map((entry) => (
                <li key={entry.stamp} className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-primary">{entry.stamp}</span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                  <span className="text-muted-foreground">{entry.label}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </Card>
      {sections ? (
        <nav
          aria-label="On this page"
          className="mt-4 hidden rounded-2xl border border-border p-4 lg:block"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/3 hover:text-primary"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </aside>
  )
}
