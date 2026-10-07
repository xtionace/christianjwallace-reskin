'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { WorkCard } from '@/components/site/work-card'
import { Button } from '@/components/ui/button'
import type { ProjectContent } from '@/content/types'
import { cn } from '@/lib/utils'

const railPadding = 'max(1.5rem, calc((100vw - 1320px) / 2 + 1.5rem))'

export function WorkRail({ items }: { items: ProjectContent[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const updateActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const children = Array.from(track.children) as HTMLElement[]
    const first = children[0]
    if (!first) return
    let nearest = 0
    let best = Infinity
    children.forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - first.offsetLeft - track.scrollLeft)
      if (distance < best) {
        best = distance
        nearest = index
      }
    })
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) nearest = children.length - 1
    setActive(nearest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateActive, { passive: true })
    return () => track.removeEventListener('scroll', updateActive)
  }, [updateActive])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const children = Array.from(track.children) as HTMLElement[]
    const clamped = Math.max(0, Math.min(children.length - 1, index))
    const first = children[0]
    const target = children[clamped]
    if (!first || !target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="rail flex gap-5 overflow-x-auto pt-2 pb-6"
        style={{ paddingInline: railPadding, scrollPaddingInline: railPadding }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            goTo(active + 1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goTo(active - 1)
          }
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.index}
            className={cn(
              'shrink-0',
              index === 0 ? 'w-[86%] sm:w-[64%] lg:w-[46%]' : 'w-[80%] sm:w-[48%] lg:w-[32%]',
            )}
            aria-label={`Slide ${index + 1} of ${items.length}`}
          >
            <WorkCard item={item} layout="rail" />
          </div>
        ))}
      </div>

      <div className="site-container mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {items.map((item, index) => (
            <button
              key={item.index}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Go to ${item.title} ${item.index}`}
              onClick={() => goTo(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none',
                active === index
                  ? 'w-10 bg-primary shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'w-4 bg-muted-foreground/25 hover:bg-muted-foreground/50',
              )}
            />
          ))}
          <span className="ml-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground/70">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => goTo(active + 1)}
            disabled={active === items.length - 1}
            aria-label="Next project"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
