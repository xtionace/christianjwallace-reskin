import { ImageOff } from 'lucide-react'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import type { PlateAspect } from '@/content/types'
import { cn } from '@/lib/utils'

const aspects: Record<PlateAspect, string> = {
  wide: 'aspect-[21/9]',
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[4/5]',
}

export function ScreenshotPlate({
  label,
  aspect = 'landscape',
}: {
  label: string
  aspect?: PlateAspect
}) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-2xl',
        aspects[aspect],
        aspect === 'wide' && 'md:col-span-2',
      )}
    >
      <Empty className="absolute inset-0 size-full rounded-2xl border-dashed border-white/14 bg-card">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 16px)',
          }}
          aria-hidden="true"
        />
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="border border-crimson/30 bg-crimson/10 text-crimson-soft"
          >
            <ImageOff />
          </EmptyMedia>
          <EmptyTitle>Screenshots pending clearance</EmptyTitle>
          <EmptyDescription className="font-mono text-[10px] tracking-[0.18em] uppercase">
            NDA-safe upload slot
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <figcaption className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60 uppercase">
        {label}
      </figcaption>
    </figure>
  )
}
