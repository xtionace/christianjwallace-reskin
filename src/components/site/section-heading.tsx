import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  action?: React.ReactNode
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}
    >
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
