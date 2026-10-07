'use client'

import { useMemo, useState } from 'react'

import { Reveal } from '@/components/site/reveal'
import { WorkCard } from '@/components/site/work-card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { PageDoc, ProjectContent, WorkStatus } from '@/content/types'
import { block } from '@/content/types'
import { cn } from '@/lib/utils'

type Filter = 'all' | WorkStatus

export function WorkIndex({
  page,
  projects,
}: {
  page: PageDoc | undefined
  projects: ProjectContent[]
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: block(page, 'filter-all')?.label ?? 'All' },
    { id: 'filled', label: block(page, 'filter-filled')?.label ?? 'Case studies' },
    { id: 'tbd', label: block(page, 'filter-tbd')?.label ?? 'Pending clearance' },
    { id: 'reserved', label: block(page, 'filter-reserved')?.label ?? 'Reserved' },
  ]
  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.status === filter)),
    [filter, projects],
  )
  const count = (id: Filter) =>
    id === 'all' ? projects.length : projects.filter((project) => project.status === id).length

  return (
    <section aria-label="Work grid" className="site-container py-16 md:py-20">
      <ToggleGroup
        variant="outline"
        spacing={2}
        value={[filter]}
        onValueChange={(groupValue) => {
          const next = groupValue[groupValue.length - 1] as Filter | undefined
          if (next) setFilter(next)
        }}
        aria-label="Filter work"
        className="mb-10 flex w-full flex-wrap"
      >
        {filters.map((item) => (
          <ToggleGroupItem
            key={item.id}
            value={item.id}
            className="h-auto rounded-full px-4 py-2 data-[state=on]:border-primary/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
          >
            {item.label}
            <span className="font-mono text-[11px] opacity-70">
              {String(count(item.id)).padStart(2, '0')}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <Reveal
            key={item.index}
            as="li"
            delay={(index % 3) * 0.06}
            className={cn(
              item.status === 'filled' && filter === 'all' ? 'sm:col-span-2' : undefined,
            )}
          >
            <WorkCard
              item={item}
              layout={item.status === 'filled' && filter === 'all' ? 'rail' : 'grid'}
            />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
