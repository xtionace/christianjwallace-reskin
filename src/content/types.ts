export type WorkStatus = 'filled' | 'tbd' | 'reserved'
export type ProjectKind = 'case' | 'corporate' | 'reserved'
export type Accent = 'moss' | 'crimson' | 'gold'
export type PlateAspect = 'wide' | 'landscape' | 'portrait'
export type GalleryPlacement = 'hero' | 'problem' | 'approach'

export type Block = {
  key: string
  label?: string
  title?: string
  kicker?: string
  meta?: string
  href?: string
  body?: string
}

export type PageDoc = {
  slug: string
  title: string
  eyebrow?: string
  headline?: string
  headlineAccent?: string
  lede?: string
  blocks: Block[]
}

export type NavLink = {
  label: string
  href: string
}

export type SiteSettingsContent = {
  name: string
  roleLine: string
  email: string
  linkedinUrl: string
  linkedinLabel: string
  location: string
  previewBadge: string
  primaryCtaLabel: string
  primaryCtaHref: string
  footerBlurb: string
  copyright: string
  footerNote: string
  navLinks: NavLink[]
  footerLinks: NavLink[]
}

export type StudySection = {
  anchor: string
  eyebrow: string
  title: string
  body: string
}

export type ProjectClosing = {
  eyebrow: string
  title: string
  accent: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export type ProjectContent = {
  index: string
  title: string
  client: string
  status: WorkStatus
  kind: ProjectKind
  caseSlug: string
  summary: string
  tags: string[]
  href: string
  imageUrl: string
  imageAlt: string
  liveUrl: string
  liveLabel: string
  showOnRail: boolean
  railOrder: number
  role: string
  year: string
  dates: string
  location: string
  stack: string[]
  accent: Accent
  log: { stamp: string; label: string }[]
  sections: StudySection[]
  highlights: { title: string; body: string }[]
  facts: string[]
  gallery: { url: string; alt: string; caption: string; placement: GalleryPlacement }[]
  plates: { label: string; aspect: PlateAspect }[]
  nextHref: string
  nextIndex: string
  nextTitle: string
  ndaNote: string
  closing: ProjectClosing
}

export type Portfolio = {
  settings: SiteSettingsContent
  pages: PageDoc[]
  projects: ProjectContent[]
}

export function pageBySlug(pages: PageDoc[], slug: string) {
  return pages.find((page) => page.slug === slug)
}

export function block(page: PageDoc | undefined, key: string) {
  return page?.blocks.find((item) => item.key === key)
}

export function blocksByPrefix(page: PageDoc | undefined, prefix: string) {
  return (page?.blocks ?? [])
    .filter((item) => item.key.startsWith(prefix))
    .sort((a, b) => a.key.localeCompare(b.key))
}

export function paragraphs(body: string | undefined) {
  return (body ?? '')
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
}
