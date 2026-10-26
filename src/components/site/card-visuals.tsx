'use client'

import { useId, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const releaseRows = [
  { title: 'Halo Wars 2', date: 'Feb 21, 2017', status: 'Released' },
  { title: 'Cuphead', date: 'Sep 29, 2017', status: 'Released' },
  { title: 'Forza Motorsport 7', date: 'Oct 3, 2017', status: 'Certified' },
  { title: "Super Lucky's Tale", date: 'Nov 7, 2017', status: 'In review' },
]

function IllustrationCaption({ label, description }: { label: string; description?: string }) {
  return (
    <figcaption className="mb-2 min-w-0 font-mono text-[9px] tracking-[0.06em] text-primary uppercase @[16rem]:text-[10px] @[16rem]:tracking-[0.1em] @[22rem]:text-[11px] @[22rem]:tracking-[0.14em]">
      <span className="block truncate">{label}</span>
      {description ? <span className="sr-only">{description}</span> : null}
    </figcaption>
  )
}

function ReleaseTableVisual() {
  const cell =
    'px-1 py-1 align-top break-words whitespace-normal @[18rem]:px-1.5 @[18rem]:py-1.5'
  return (
    <figure className="@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-2 @[18rem]:p-3">
      <IllustrationCaption
        label="Illustration · Public 2017 titles"
        description="Illustration of a release table using public 2017 Xbox and PC titles. Dates are the public release dates. The status column is part of the illustration, not an internal dashboard."
      />
      <div className="rounded-md border border-white/10">
        <table className="w-full table-fixed border-collapse text-left text-[9px] leading-snug @[18rem]:text-[10px] @[24rem]:text-xs">
          <caption className="sr-only">
            Public 2017 titles: Halo Wars 2, Cuphead, Forza Motorsport 7, and Super Lucky&apos;s
            Tale. Each row lists Xbox One and PC, the public release date, and an illustration
            status.
          </caption>
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-muted-foreground">
              <th scope="col" className={`${cell} w-[30%] font-medium`}>
                Title
              </th>
              <th scope="col" className={`${cell} w-[22%] font-medium`}>
                Platform
              </th>
              <th scope="col" className={`${cell} w-[24%] font-medium`}>
                Release date
              </th>
              <th scope="col" className={`${cell} w-[24%] font-medium`}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {releaseRows.map((row) => (
              <tr key={row.title} className="border-b border-white/8 last:border-0">
                <th scope="row" className={`${cell} font-medium text-foreground`}>
                  {row.title}
                </th>
                <td className={`${cell} text-muted-foreground`}>
                  <span className="block">Xbox One</span>
                  <span className="block">PC</span>
                </td>
                <td className={`${cell} text-muted-foreground`}>{row.date}</td>
                <td className={`${cell} text-primary`}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

const tokenOutputs = [
  { name: 'iOS', detail: 'Native color' },
  { name: 'Android', detail: 'Native color' },
  { name: 'Web', detail: 'CSS color' },
] as const

const libraryTiles = [
  { name: 'Button', kind: 'button' },
  { name: 'Card', kind: 'card' },
  { name: 'Input', kind: 'input' },
  { name: 'Nav', kind: 'nav' },
] as const

function TileShape({ kind }: { kind: (typeof libraryTiles)[number]['kind'] }) {
  if (kind === 'button') {
    return <span className="block h-2.5 w-10 max-w-full rounded-full bg-primary" />
  }
  if (kind === 'card') {
    return (
      <span className="flex w-full flex-col gap-1 rounded-sm border border-white/15 p-1">
        <span className="block h-1 w-2/3 rounded-full bg-white/40" />
        <span className="block h-1 w-full rounded-full bg-white/15" />
      </span>
    )
  }
  if (kind === 'input') {
    return (
      <span className="flex h-5 w-full items-center rounded-sm border border-white/20 px-1">
        <span className="block h-1 w-1/2 rounded-full bg-white/25" />
      </span>
    )
  }
  return (
    <span className="flex w-full items-center gap-1">
      <span className="block h-1 w-3 rounded-full bg-primary/80" />
      <span className="block h-1 min-w-0 flex-1 rounded-full bg-white/15" />
      <span className="block h-1 w-4 rounded-full bg-white/15" />
    </span>
  )
}

function ComponentRow({ compact }: { compact: boolean }) {
  return (
    <div>
      {compact ? null : (
        <>
          <h3 className="font-display text-xl font-semibold text-foreground">Component library</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Generic stand-ins for pieces of the library. Not a T-Mobile screen.
          </p>
        </>
      )}
      <ul
        aria-label="Generic components in the library"
        className={cn(
          'grid grid-cols-[repeat(auto-fit,minmax(4.75rem,1fr))]',
          compact ? 'gap-1.5' : 'mt-5 gap-3',
        )}
      >
        {libraryTiles.map((tile) => (
          <li
            key={tile.name}
            className="flex min-w-0 flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2"
          >
            <span className="truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              {tile.name}
            </span>
            <span aria-hidden="true">
              <TileShape kind={tile.kind} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TokenFan({ compact }: { compact: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
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
        className={cn(
          'grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))]',
          compact ? 'gap-1.5' : 'mt-3 gap-3',
        )}
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
      className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-1.5"
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
          ? '@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3'
          : '@container rounded-3xl border border-primary/30 bg-card p-5 shadow-[0_40px_120px_-50px_rgba(212,175,55,0.35)] md:p-8'
      }
    >
      {compact ? (
        <IllustrationCaption
          label="Illustration · Components, tokens, themes"
          description="Illustration of generic components, a color token output for iOS, Android, and web, and the same component in a T-Mobile theme and a Metro theme. Not a screenshot. The colors stand in for the two themes and are not official brand values."
        />
      ) : (
        <figcaption className="mb-3 flex min-w-0 items-baseline gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="shrink-0 text-primary">Illustration</span>
          <span className="min-w-0 flex-1 truncate text-right text-muted-foreground/80">
            Components, tokens, themes
          </span>
          <span className="sr-only">
            Illustration of generic components, a color token output for iOS, Android, and web, and
            the same component in a T-Mobile theme and a Metro theme. Not a screenshot. The colors
            stand in for the two themes and are not official brand values.
          </span>
        </figcaption>
      )}
      {compact ? (
        <div className="flex flex-col gap-1.5">
          <ComponentRow compact />
          <TokenFan compact />
          <ThemePair />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <ComponentRow compact={false} />
          <div className="grid gap-8 lg:grid-cols-2">
            <TokenFan compact={false} />
            <ThemeSwitch />
          </div>
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

const quizAnswers = ['Mercury', 'Venus', 'Earth', 'Mars'] as const

function LearningGameVisual() {
  return (
    <figure
      aria-hidden="true"
      className="@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3"
    >
      <IllustrationCaption label="Illustration · Learning game" />
      <div className="flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2">
        <p className="text-[11px] leading-snug font-medium text-foreground">
          Which planet is closest to the sun?
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-1">
          {quizAnswers.map((answer) => (
            <span
              key={answer}
              className={cn(
                'truncate rounded-md border px-1.5 py-1 text-center font-mono text-[10px] tracking-[0.04em]',
                answer === 'Mercury'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-white/15 text-foreground/80',
              )}
            >
              {answer}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="font-mono text-[11px] tracking-[0.12em] text-primary">
            <span className="motion-safe:animate-pulse motion-reduce:animate-none">★</span>
            <span> ★</span>
            <span className="text-white/25"> ★</span>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">2 / 4</span>
        </div>
        <span className="block h-1.5 rounded-full bg-white/10">
          <span className="block h-1.5 w-1/2 rounded-full bg-primary motion-safe:animate-pulse motion-reduce:animate-none" />
        </span>
      </div>
    </figure>
  )
}

function WinshuttleSampler() {
  const actions = ['View', 'Edit', 'Share']
  return (
    <figure
      aria-hidden="true"
      className="@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3"
    >
      <IllustrationCaption label="Illustration · Component library" />
      <div className="flex flex-col gap-1.5">
        <div className="flex min-w-0">
          {actions.map((action, index) => (
            <span
              key={action}
              className={cn(
                'min-w-0 flex-1 truncate border border-primary/40 px-1.5 py-1 text-center font-mono text-[10px] tracking-[0.08em] uppercase',
                index === 0
                  ? 'rounded-l-md bg-primary text-primary-foreground'
                  : 'border-l-0 text-foreground/80',
                index === actions.length - 1 && 'rounded-r-md',
              )}
            >
              {action}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <div className="flex min-w-[7.5rem] flex-1">
            <span className="rounded-l-md border border-white/15 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-muted-foreground">
              Name
            </span>
            <span className="flex min-w-0 flex-1 items-center rounded-r-md border border-l-0 border-white/15 px-2">
              <span className="block h-1 w-2/3 max-w-16 rounded-full bg-white/25" />
            </span>
          </div>
          <div className="flex min-w-[6rem] flex-1 items-center justify-between gap-2 rounded-md border border-white/15 px-2 py-1">
            <span className="truncate font-mono text-[10px] text-muted-foreground">Choose</span>
            <span className="size-0 shrink-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-primary" />
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] p-2">
          <span className="size-7 shrink-0 rounded-md border border-primary/30 bg-primary/10" />
          <span className="min-w-0 flex-1">
            <span className="block h-1.5 w-2/3 max-w-24 rounded-full bg-foreground/75" />
            <span className="mt-1.5 block h-1 w-full max-w-32 rounded-full bg-white/15" />
          </span>
          <span className="shrink-0 rounded-sm bg-primary px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-primary-foreground uppercase">
            Tag
          </span>
        </div>
      </div>
    </figure>
  )
}

const sampleReceipts = [
  'Pharmacy, Mar 12, $24.80',
  'Clinic copay, Feb 28, $40.00',
  'Vision, Feb 3, $135.00',
]

function ReceiptVaultVisual() {
  return (
    <figure
      aria-hidden="true"
      className="@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3"
    >
      <IllustrationCaption label="Illustration · Receipt vault" />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-start gap-1.5">
          <div className="w-14 shrink-0 rounded-sm border border-primary/40 bg-[#f6f1e6] px-1.5 pt-1.5 pb-2 text-[#1c1810]">
            <span className="mx-auto mb-1 block h-1 w-8 rounded-full bg-[#1c1810]/80" />
            <span className="mb-1 block h-px w-full bg-[#1c1810]/25" />
            <span className="mb-0.5 block h-px w-full bg-[#1c1810]/20" />
            <span className="mb-0.5 block h-px w-4/5 bg-[#1c1810]/20" />
            <span className="mb-0.5 block h-px w-full bg-[#1c1810]/15" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-sm bg-primary" />
          </div>
          <ul className="flex min-w-[9rem] flex-1 flex-col gap-1">
            {sampleReceipts.map((receipt) => (
              <li
                key={receipt}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] leading-snug break-words text-foreground/90"
              >
                {receipt}
              </li>
            ))}
          </ul>
        </div>
        <span className="w-fit max-w-full rounded-full bg-primary px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-primary-foreground uppercase">
          Add receipt
        </span>
      </div>
    </figure>
  )
}

function SkylineStrip() {
  return (
    <svg viewBox="0 0 120 28" className="block h-6 w-full" preserveAspectRatio="none">
      <rect width="120" height="28" fill="#10161f" />
      <rect x="0" y="12" width="10" height="16" fill="#243044" />
      <rect x="12" y="6" width="8" height="22" fill="#1b2636" />
      <rect x="22" y="14" width="12" height="14" fill="#2a3548" />
      <rect x="36" y="4" width="7" height="24" fill="#243044" />
      <rect x="45" y="15" width="11" height="13" fill="#1b2636" />
      <rect x="58" y="2" width="9" height="26" fill="#2a3548" />
      <rect x="69" y="10" width="14" height="18" fill="#243044" />
      <rect x="85" y="7" width="8" height="21" fill="#1b2636" />
      <rect x="95" y="13" width="10" height="15" fill="#2a3548" />
      <rect x="107" y="8" width="13" height="20" fill="#243044" />
      <g fill="#d4af37">
        <rect x="14" y="10" width="1.6" height="1.6" />
        <rect x="60" y="6" width="1.6" height="1.6" />
        <rect x="88" y="11" width="1.6" height="1.6" />
      </g>
      <rect x="73" y="14" width="1.6" height="1.6" fill="#c44536" />
    </svg>
  )
}

function ComicPage() {
  return (
    <div className="grid grid-cols-2 gap-1 bg-[#1a120c] p-1">
      <div className="col-span-2 overflow-hidden rounded-sm border border-primary/40 bg-[#10161f]">
        <svg viewBox="0 0 240 118" className="block h-auto w-full">
          <rect width="240" height="118" fill="#10161f" />
          <circle cx="206" cy="22" r="12" fill="#d4af37" />
          <g fill="#243044">
            <rect x="0" y="70" width="16" height="48" />
            <rect x="18" y="56" width="14" height="62" />
            <rect x="34" y="74" width="18" height="44" />
            <rect x="54" y="48" width="12" height="70" />
            <rect x="68" y="78" width="20" height="40" />
          </g>
          <g fill="#1b2636">
            <rect x="150" y="64" width="16" height="54" />
            <rect x="168" y="50" width="12" height="68" />
            <rect x="182" y="72" width="22" height="46" />
            <rect x="206" y="58" width="14" height="60" />
            <rect x="222" y="76" width="18" height="42" />
          </g>
          <g fill="#d4af37">
            <rect x="22" y="62" width="2" height="2" />
            <rect x="58" y="54" width="2" height="2" />
            <rect x="172" y="56" width="2" height="2" />
            <rect x="210" y="64" width="2" height="2" />
          </g>
          <rect x="186" y="78" width="2" height="2" fill="#c44536" />
          <polygon points="70,96 118,84 168,98 168,118 70,118" fill="#1a140c" />
          <path d="M108 58 L86 104 L118 86 L150 104 L128 58 Z" fill="#6d5c9a" />
          <path
            d="M112 52 h16 v28 l5 18 h-7 l-6-16 l-6 16 h-7 l5-18 z"
            fill="#3d4b63"
          />
          <path d="M112 46 L117 32 L122 44 L127 32 L132 46 v12 h-20 z" fill="#3d4b63" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-col overflow-hidden rounded-sm border border-primary/30 bg-[#10161f]">
        <SkylineStrip />
        <p className="px-1.5 py-1 text-[10px] leading-snug text-[#f6f1e6]">The roofs go quiet.</p>
      </div>
      <div className="flex min-w-0 flex-col overflow-hidden rounded-sm border border-primary/30 bg-[#10161f]">
        <SkylineStrip />
        <div className="px-1 pt-1 pb-2.5">
          <div className="relative">
            <p className="rounded-lg bg-[#f6f1e6] px-1.5 py-1 text-center text-[10px] leading-snug font-semibold text-[#1c1810]">
              Next page!
            </p>
            <svg
              viewBox="0 0 16 10"
              aria-hidden="true"
              className="absolute top-full left-2.5 h-2 w-3.5"
            >
              <path d="M0 0 H12 L2 10 Z" fill="#f6f1e6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function TextBookPage() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 bg-[#f6f1e6] p-3 text-[#1c1810]">
      <p className="font-display text-sm font-semibold">Chapter 2</p>
      <p className="text-[11px] leading-relaxed">
        The lamp buzzed. She turned the page, and the room went still.
      </p>
      <p className="text-[11px] leading-relaxed">Outside, the street kept its own hours.</p>
    </div>
  )
}

function DigitalComicsVisual() {
  return (
    <figure
      aria-hidden="true"
      className="@container flex w-full flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3"
    >
      <IllustrationCaption label="Illustration · Digital comics" />
      <div className="w-full rounded-2xl border-2 border-primary/40 bg-[#0c1018] p-1.5 shadow-[0_0_0_4px_rgba(212,175,55,0.08)] @[18rem]:p-2">
        <div className="relative overflow-hidden rounded-md">
          <div className="folio-comic">
            <ComicPage />
          </div>
          <div className="folio-prose absolute inset-0">
            <TextBookPage />
          </div>
        </div>
      </div>
    </figure>
  )
}

function CommunityPlanVisual() {
  const lots = [
    { x: 108, y: 28, sold: true },
    { x: 150, y: 28, sold: false },
    { x: 192, y: 28, sold: true },
    { x: 108, y: 62, sold: false },
    { x: 150, y: 62, sold: true },
    { x: 192, y: 62, sold: false },
    { x: 108, y: 96, sold: true },
    { x: 150, y: 96, sold: false },
    { x: 192, y: 96, sold: false },
  ]
  return (
    <figure
      aria-hidden="true"
      className="@container flex w-full flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3"
    >
      <IllustrationCaption label="Illustration · Master-planned community" />
      <svg viewBox="0 0 240 150" className="block h-auto w-full">
        <rect width="240" height="150" rx="8" fill="#12161e" />
        <ellipse cx="52" cy="88" rx="40" ry="32" fill="#1a5c52" />
        <circle cx="40" cy="78" r="7" fill="#2a9d8f" />
        <circle cx="62" cy="96" r="6" fill="#2a9d8f" />
        <circle cx="48" cy="104" r="4" fill="#3db8a8" />
        <path
          d="M8 16 C 60 22, 110 12, 160 18 S 200 14, 232 20"
          fill="none"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M8 136 C 70 128, 120 142, 180 132 S 210 136, 232 128"
          fill="none"
          stroke="#3d4658"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {lots.map((lot) => (
          <g key={`${lot.x}-${lot.y}`}>
            <rect
              x={lot.x}
              y={lot.y}
              width="36"
              height="26"
              rx="2"
              fill={lot.sold ? '#d4af37' : '#1c2433'}
              stroke="#d4af37"
              strokeOpacity={lot.sold ? 1 : 0.45}
            />
            {lot.sold ? (
              <text
                x={lot.x + 18}
                y={lot.y + 16}
                textAnchor="middle"
                fill="#1c1608"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
              >
                Sold
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <p className="mt-1.5 max-w-full rounded-full bg-primary px-2.5 py-1 text-center font-mono text-[9px] leading-snug tracking-[0.06em] text-primary-foreground uppercase @[20rem]:text-[10px]">
        19 homes sold opening weekend
      </p>
    </figure>
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
          ? '@container flex flex-col bg-[linear-gradient(180deg,#12151e,#0c0e14)] p-3'
          : 'rounded-3xl border border-primary/30 bg-card p-5 shadow-[0_40px_120px_-50px_rgba(212,175,55,0.35)] md:p-8'
      }
    >
      {compact ? (
        <IllustrationCaption
          label="Workflow · Gated loop"
          description="Illustration of the workflow toolkit, not a screenshot of an internal tool. The loop is spec, parallel build, brand and validation gates, then human approval of every final pull request."
        />
      ) : (
        <figcaption className="mb-3 flex min-w-0 items-baseline gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="shrink-0 text-primary">Workflow</span>
          <span className="min-w-0 flex-1 truncate text-right text-muted-foreground/80">
            Gated loop
          </span>
          <span className="sr-only">
            Illustration of the workflow toolkit, not a screenshot of an internal tool. The loop is
            spec, parallel build, brand and validation gates, then human approval of every final
            pull request.
          </span>
        </figcaption>
      )}
      <ol
        aria-label="Gated workflow loop"
        className={
          compact
            ? 'grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-1.5'
            : 'grid gap-3 md:grid-cols-4'
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
  winshuttle: WinshuttleSampler,
  optumcare: ReceiptVaultVisual,
  'mcgraw-hill': LearningGameVisual,
  kindle: DigitalComicsVisual,
  fusion: CommunityPlanVisual,
}

export function hasCardVisual(slug: string) {
  return Object.prototype.hasOwnProperty.call(visuals, slug)
}

export function CardVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug]
  if (!Visual) return null
  return <Visual />
}
