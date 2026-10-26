'use client'

import { useId, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const releaseRows = [
  { title: 'Title A', platform: 'Platform A', date: 'Date A', status: 'Status A' },
  { title: 'Title B', platform: 'Platform B', date: 'Date B', status: 'Status B' },
  { title: 'Title C', platform: 'Platform C', date: 'Date C', status: 'Status C' },
  { title: 'Title D', platform: 'Platform D', date: 'Date D', status: 'Status D' },
]

function VisualFrame({
  kicker,
  detail,
  description,
  children,
}: {
  kicker: string
  detail: string
  description: string
  children: ReactNode
}) {
  return (
    <figure className="flex h-full flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3">
      <figcaption className="mb-2 flex items-baseline justify-between gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="text-primary">{kicker}</span>
        <span className="truncate text-muted-foreground/80">{detail}</span>
        <span className="sr-only">{description}</span>
      </figcaption>
      <div className="min-h-0 flex-1">{children}</div>
    </figure>
  )
}

function ReleaseTableVisual() {
  return (
    <VisualFrame
      kicker="Illustration"
      detail="Placeholder titles only"
      description="Sample game release tracking table. Every cell is a placeholder. This is not real Xbox data and not a list of real games."
    >
      <div className="h-full overflow-auto rounded-md border border-white/10">
        <table className="h-full w-full min-w-[280px] border-collapse text-left text-xs">
          <caption className="sr-only">
            Illustration of a release-tracking table with placeholder rows Title A through Title D.
            Not real release data.
          </caption>
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-muted-foreground">
              <th scope="col" className="px-2 py-1.5 align-middle font-medium whitespace-nowrap">
                Title
              </th>
              <th scope="col" className="px-2 py-1.5 align-middle font-medium whitespace-nowrap">
                Platform
              </th>
              <th scope="col" className="px-2 py-1.5 align-middle font-medium whitespace-nowrap">
                Release date
              </th>
              <th scope="col" className="px-2 py-1.5 align-middle font-medium whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {releaseRows.map((row) => (
              <tr key={row.title} className="border-b border-white/8 last:border-0">
                <th
                  scope="row"
                  className="px-2 py-1.5 align-middle font-medium whitespace-nowrap text-foreground"
                >
                  {row.title}
                </th>
                <td className="px-2 py-1.5 align-middle whitespace-nowrap text-muted-foreground">
                  {row.platform}
                </td>
                <td className="px-2 py-1.5 align-middle whitespace-nowrap text-muted-foreground">
                  {row.date}
                </td>
                <td className="px-2 py-1.5 align-middle whitespace-nowrap text-primary">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </VisualFrame>
  )
}

const tokenOutputs = [
  { name: 'iOS', detail: 'Native color' },
  { name: 'Android', detail: 'Native color' },
  { name: 'Web', detail: 'CSS color' },
] as const

function TokenFan({ compact }: { compact: boolean }) {
  return (
    <div className={compact ? 'flex min-h-0 flex-1 flex-col gap-1.5' : 'flex flex-col'}>
      {compact ? null : (
        <>
          <h3 className="font-display text-xl font-semibold text-foreground">
            One color token, three platforms
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A color token is written once, then output for iOS, Android, and web.
          </p>
        </>
      )}
      <p
        className={cn(
          'w-fit rounded-full border border-primary/40 bg-primary/10 font-mono tracking-[0.12em] text-primary uppercase',
          compact ? 'px-2 py-1 text-[11px]' : 'mt-5 px-3 py-1.5 text-xs',
        )}
      >
        color.brand
      </p>
      <ul
        aria-label="Where the color token is output"
        className={cn('grid grid-cols-3', compact ? 'min-h-0 flex-1 gap-1.5' : 'mt-3 gap-3')}
      >
        {tokenOutputs.map((output) => (
          <li
            key={output.name}
            className="flex flex-col justify-end rounded-md border border-primary/30 bg-primary/[0.06] p-2"
          >
            <span
              className={
                compact
                  ? 'font-display text-sm font-semibold text-foreground'
                  : 'font-display text-lg font-semibold text-foreground'
              }
            >
              {output.name}
            </span>
            {compact ? null : (
              <span className="mt-1 text-xs text-muted-foreground">{output.detail}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ThemePair() {
  return (
    <ul
      aria-label="Same component in the T-Mobile and Metro themes"
      className="grid grid-cols-2 gap-1.5"
    >
      <li className="rounded-md border border-primary/40 bg-primary/10 p-2">
        <span className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
          T-Mobile
        </span>
        <span className="mt-2 block h-5 rounded-full bg-primary" aria-hidden="true" />
      </li>
      <li className="rounded-md border border-violet/40 bg-violet/10 p-2">
        <span className="font-mono text-[11px] tracking-[0.12em] text-violet-soft uppercase">
          Metro
        </span>
        <span className="mt-2 block h-5 rounded-full bg-violet" aria-hidden="true" />
      </li>
    </ul>
  )
}

function ThemeSwitch() {
  const [theme, setTheme] = useState<'tmobile' | 'metro'>('tmobile')
  const name = useId()
  const metro = theme === 'metro'

  return (
    <fieldset className="min-w-0">
      <legend className="font-display text-xl font-semibold text-foreground">
        Same component, two themes
      </legend>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Metro by T-Mobile reuses the same component set. Switch the theme to change the brand.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ['tmobile', 'T-Mobile'],
            ['metro', 'Metro'],
          ] as const
        ).map(([value, label]) => {
          const selected = theme === value
          return (
            <label
              key={value}
              className={cn(
                'cursor-pointer rounded-full border px-3 py-1.5 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                selected
                  ? value === 'metro'
                    ? 'border-violet text-violet-soft'
                    : 'border-primary text-primary'
                  : 'border-white/15 text-muted-foreground',
              )}
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={theme === value}
                onChange={() => setTheme(value)}
                className="sr-only"
              />
              {label}
            </label>
          )
        })}
      </div>
      <div
        className={cn(
          'mt-4 rounded-2xl border p-4',
          metro ? 'border-violet/50 bg-violet/10' : 'border-primary/40 bg-primary/10',
        )}
        aria-live="polite"
      >
        <p
          className={cn(
            'font-mono text-[11px] tracking-[0.14em] uppercase',
            metro ? 'text-violet-soft' : 'text-primary',
          )}
        >
          {metro ? 'Metro theme' : 'T-Mobile theme'}
        </p>
        <p className="mt-3 font-display text-2xl font-semibold text-foreground">Shared button</p>
        <span
          className={cn(
            'mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium',
            metro ? 'bg-violet text-white' : 'bg-primary text-primary-foreground',
          )}
        >
          Continue
        </span>
      </div>
    </fieldset>
  )
}

export function TokenThemeDiagram({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const compact = variant === 'compact'

  return (
    <figure
      className={
        compact
          ? 'flex h-full flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3'
          : 'rounded-3xl border border-primary/30 bg-card p-5 shadow-[0_40px_120px_-50px_rgba(212,175,55,0.35)] md:p-8'
      }
    >
      <figcaption className="mb-3 flex items-baseline justify-between gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="text-primary">Illustration</span>
        <span className="text-muted-foreground/80">
          {compact ? 'Tokens and themes' : 'Shared system'}
        </span>
        <span className="sr-only">
          Illustration of a color token output for iOS, Android, and web, and the same component in
          a T-Mobile theme and a Metro theme. Not a screenshot. The colors stand in for the two
          themes and are not official brand values.
        </span>
      </figcaption>
      {compact ? (
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          <TokenFan compact />
          <ThemePair />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <TokenFan compact={false} />
          <ThemeSwitch />
        </div>
      )}
      {compact ? null : (
        <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          Illustration, not a screenshot. Colors stand in for the two themes.
        </p>
      )}
    </figure>
  )
}

function DashboardVisual() {
  const tiles = [
    { label: 'Tile A', bars: ['h-2', 'h-4', 'h-3', 'h-5'] },
    { label: 'Tile B', bars: ['h-3', 'h-2', 'h-5', 'h-4'] },
    { label: 'Tile C', bars: ['h-5', 'h-3', 'h-2', 'h-4'] },
    { label: 'Tile D', bars: ['h-4', 'h-5', 'h-3', 'h-2'] },
  ] as const
  return (
    <VisualFrame
      kicker="Illustration"
      detail="Dashboard tiles"
      description="Illustration of dashboard tiles. The bars are decorative and do not represent real metrics."
    >
      <ul aria-hidden="true" className="grid h-full grid-cols-2 gap-1.5">
        {tiles.map((tile) => (
          <li key={tile.label} className="rounded-md border border-white/10 bg-white/[0.03] p-2">
            <p className="font-mono text-[11px] text-muted-foreground">{tile.label}</p>
            <div className="mt-2 flex h-8 items-end gap-0.5">
              {tile.bars.map((height, index) => (
                <span
                  key={`${tile.label}-${index}`}
                  className={`flex-1 rounded-sm bg-primary/80 ${height}`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </VisualFrame>
  )
}

function StackVisual() {
  const layers = ['React', 'Redux']
  return (
    <VisualFrame
      kicker="From the résumé"
      detail="Front-end stack"
      description="React and Redux, the front-end stack named on the résumé for this role."
    >
      <ul className="flex h-full flex-col justify-center gap-1.5">
        {layers.map((layer) => (
          <li
            key={layer}
            className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-center font-mono text-xs tracking-[0.14em] text-primary uppercase"
          >
            {layer}
          </li>
        ))}
      </ul>
    </VisualFrame>
  )
}

function PortalVisual() {
  return (
    <VisualFrame
      kicker="Illustration"
      detail="Portal layout"
      description="Illustration of a provider portal layout. It is not a screenshot of the OptumCare product."
    >
      <div aria-hidden="true" className="grid h-full grid-cols-[30%_1fr] gap-1.5">
        <div className="flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2">
          <span className="h-1.5 w-3/4 rounded-full bg-primary/80" />
          <span className="h-1.5 w-full rounded-full bg-white/15" />
          <span className="h-1.5 w-5/6 rounded-full bg-white/10" />
          <span className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
        <div className="flex flex-col gap-1.5 rounded-md border border-white/10 p-2">
          <span className="h-2 w-1/2 rounded-full bg-primary/60" />
          <span className="h-1.5 w-full rounded-full bg-white/15" />
          <span className="h-1.5 w-11/12 rounded-full bg-white/10" />
          <span className="h-1.5 w-4/5 rounded-full bg-white/10" />
          <span className="mt-auto h-6 rounded-sm border border-primary/20 bg-primary/5" />
        </div>
      </div>
    </VisualFrame>
  )
}

function DeviceVisual() {
  return (
    <VisualFrame
      kicker="Illustration"
      detail="Hand-coded screen"
      description="Illustration of a hand-coded screen layout. It is not a Kindle Fire screenshot."
    >
      <div aria-hidden="true" className="grid h-full place-items-center">
        <div className="w-[46%] max-w-28 rounded-lg border border-primary/40 bg-background p-2 shadow-[0_0_0_4px_rgba(212,175,55,0.08)]">
          <span className="mb-1.5 block h-1.5 w-2/3 rounded-full bg-primary/80" />
          <span className="mb-1 block h-1 w-full rounded-full bg-white/15" />
          <span className="mb-1.5 block h-1 w-10/12 rounded-full bg-white/10" />
          <span className="block h-8 rounded-sm bg-white/[0.06]" />
        </div>
      </div>
    </VisualFrame>
  )
}

function HomesVisual() {
  return (
    <VisualFrame
      kicker="From the résumé"
      detail="Opening weekend"
      description="Seattle Housing Authority campaign result from the résumé: 19 homes sold opening weekend."
    >
      <div className="flex h-full flex-col items-start justify-center">
        <p className="font-display text-4xl leading-none font-semibold text-primary">19</p>
        <p className="mt-2 text-sm text-foreground">homes sold</p>
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          Seattle Housing Authority
        </p>
      </div>
    </VisualFrame>
  )
}

const loopSteps = [
  {
    title: 'Spec',
    short: 'Executable specs',
    detail: 'Features and stories, written as executable specs.',
  },
  {
    title: 'Parallel build',
    short: 'Specs build the code',
    detail: 'Those specs run in parallel and build the code.',
  },
  {
    title: 'Gates',
    short: 'Brand and validation',
    detail: 'Brand rules, plus accessibility, responsive, and lint.',
  },
  { title: 'Human approval', short: 'Every final PR', detail: 'A person approves every final PR.' },
]

export function GatedLoopDiagram({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const compact = variant === 'compact'
  return (
    <figure
      className={
        compact
          ? 'flex h-full flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3'
          : 'rounded-3xl border border-primary/30 bg-card p-5 shadow-[0_40px_120px_-50px_rgba(212,175,55,0.35)] md:p-8'
      }
    >
      <figcaption className="mb-3 flex items-baseline justify-between gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="text-primary">Workflow</span>
        <span className="text-muted-foreground/80">Gated loop</span>
        <span className="sr-only">
          Illustration of the workflow toolkit, not a screenshot of an internal tool. The loop is
          spec, parallel build, brand and validation gates, then human approval of every final pull
          request.
        </span>
      </figcaption>
      <ol
        aria-label="Gated workflow loop"
        className={
          compact ? 'grid min-h-0 flex-1 grid-cols-2 gap-1.5' : 'grid gap-3 md:grid-cols-4'
        }
      >
        {loopSteps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col rounded-md border border-primary/30 bg-primary/[0.06] p-2 md:p-4"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-primary">
              0{index + 1}
            </span>
            <span
              className={
                compact
                  ? 'mt-1 font-display text-sm font-semibold text-foreground'
                  : 'mt-3 font-display text-xl font-semibold text-foreground'
              }
            >
              {step.title}
            </span>
            <span
              className={
                compact
                  ? 'mt-1 text-[11px] leading-snug text-muted-foreground'
                  : 'mt-2 text-sm leading-relaxed text-muted-foreground'
              }
            >
              {compact ? step.short : step.detail}
            </span>
          </li>
        ))}
      </ol>
      {compact ? null : (
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          Loop. A human approves every final PR
        </p>
      )}
    </figure>
  )
}

const visuals: Record<string, () => ReactNode> = {
  xbox: ReleaseTableVisual,
  att: () => <GatedLoopDiagram variant="compact" />,
  't-mobile': () => <TokenThemeDiagram variant="compact" />,
  winshuttle: StackVisual,
  optumcare: PortalVisual,
  'mcgraw-hill': DashboardVisual,
  kindle: DeviceVisual,
  fusion: HomesVisual,
}

export function hasCardVisual(slug: string) {
  return Object.prototype.hasOwnProperty.call(visuals, slug)
}

export function CardVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug]
  if (!Visual) return null
  return <Visual />
}
