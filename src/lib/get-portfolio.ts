import { cache } from 'react'
import { getPayload } from 'payload'

import { defaultPortfolio } from '@/content/portfolio'
import type {
  Accent,
  Block,
  GalleryPlacement,
  PageDoc,
  PlateAspect,
  Portfolio,
  ProjectContent,
  ProjectKind,
  SiteSettingsContent,
  WorkStatus,
} from '@/content/types'
import config from '@/payload.config'

function str(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function bool(value: unknown) {
  return value === true
}

function num(value: unknown) {
  return typeof value === 'number' ? value : 0
}

function rows(value: unknown) {
  return Array.isArray(value) ? value : []
}

function labels(value: unknown) {
  return rows(value)
    .map((item) => {
      if (!item || typeof item !== 'object' || !('label' in item)) return ''
      return str(item.label)
    })
    .filter(Boolean)
}

function texts(value: unknown) {
  return rows(value)
    .map((item) => {
      if (!item || typeof item !== 'object' || !('text' in item)) return ''
      return str(item.text)
    })
    .filter(Boolean)
}

function asStatus(value: unknown): WorkStatus {
  if (value === 'filled' || value === 'tbd' || value === 'reserved') return value
  return 'reserved'
}

function asKind(value: unknown): ProjectKind {
  if (value === 'case' || value === 'corporate' || value === 'reserved') return value
  return 'reserved'
}

function asAccent(value: unknown): Accent {
  if (value === 'moss' || value === 'crimson' || value === 'gold') return value
  return 'gold'
}

function asPlacement(value: unknown): GalleryPlacement {
  if (value === 'hero' || value === 'problem' || value === 'approach') return value
  return 'hero'
}

function asAspect(value: unknown): PlateAspect {
  if (value === 'wide' || value === 'landscape' || value === 'portrait') return value
  return 'landscape'
}

function mapBlock(value: unknown): Block | undefined {
  if (!value || typeof value !== 'object') return undefined
  const record = value as Record<string, unknown>
  const key = str(record.key)
  if (!key) return undefined
  return {
    key,
    label: str(record.label) || undefined,
    title: str(record.title) || undefined,
    kicker: str(record.kicker) || undefined,
    meta: str(record.meta) || undefined,
    href: str(record.href) || undefined,
    body: str(record.body) || undefined,
  }
}

function mapPage(value: unknown): PageDoc | undefined {
  if (!value || typeof value !== 'object') return undefined
  const record = value as Record<string, unknown>
  const slug = str(record.slug)
  if (!slug) return undefined
  return {
    slug,
    title: str(record.title, slug),
    eyebrow: str(record.eyebrow) || undefined,
    headline: str(record.headline) || undefined,
    headlineAccent: str(record.headlineAccent) || undefined,
    lede: str(record.lede) || undefined,
    blocks: rows(record.blocks).flatMap((item) => {
      const block = mapBlock(item)
      return block ? [block] : []
    }),
  }
}

function mapProject(value: unknown): ProjectContent | undefined {
  if (!value || typeof value !== 'object') return undefined
  const record = value as Record<string, unknown>
  const closing = (record.closing ?? {}) as Record<string, unknown>
  return {
    index: str(record.index),
    title: str(record.title),
    client: str(record.client),
    status: asStatus(record.status),
    kind: asKind(record.kind),
    caseSlug: str(record.caseSlug),
    summary: str(record.summary),
    tags: labels(record.tags),
    href: str(record.href, '/contact'),
    imageUrl: str(record.imageUrl),
    imageAlt: str(record.imageAlt),
    liveUrl: str(record.liveUrl),
    liveLabel: str(record.liveLabel),
    statusLabel: str(record.statusLabel),
    mediaBadge: str(record.mediaBadge),
    showOnRail: bool(record.showOnRail),
    railOrder: num(record.railOrder),
    role: str(record.role),
    year: str(record.year),
    dates: str(record.dates),
    location: str(record.location),
    stack: labels(record.stack),
    accent: asAccent(record.accent),
    log: rows(record.log).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const stamp = str(row.stamp)
      const label = str(row.label)
      return stamp && label ? [{ stamp, label }] : []
    }),
    sections: rows(record.sections).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const anchor = str(row.anchor)
      const title = str(row.title)
      if (!anchor || !title) return []
      return [{ anchor, eyebrow: str(row.eyebrow), title, body: str(row.body) }]
    }),
    highlights: rows(record.highlights).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const title = str(row.title)
      const body = str(row.body)
      return title && body ? [{ title, body }] : []
    }),
    facts: texts(record.facts),
    gallery: rows(record.gallery).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const url = str(row.url)
      const alt = str(row.alt)
      if (!url || !alt) return []
      return [{ url, alt, caption: str(row.caption), placement: asPlacement(row.placement) }]
    }),
    plates: rows(record.plates).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const label = str(row.label)
      if (!label) return []
      return [{ label, aspect: asAspect(row.aspect) }]
    }),
    nextHref: str(record.nextHref),
    nextIndex: str(record.nextIndex),
    nextTitle: str(record.nextTitle),
    ndaNote: str(record.ndaNote),
    closing: {
      eyebrow: str(closing.eyebrow),
      title: str(closing.title),
      accent: str(closing.accent),
      body: str(closing.body),
      primaryLabel: str(closing.primaryLabel),
      primaryHref: str(closing.primaryHref),
      secondaryLabel: str(closing.secondaryLabel),
      secondaryHref: str(closing.secondaryHref),
    },
  }
}

function mapSettings(value: unknown): SiteSettingsContent | undefined {
  if (!value || typeof value !== 'object') return undefined
  const record = value as Record<string, unknown>
  const name = str(record.name)
  const email = str(record.email)
  if (!name || !email) return undefined
  const links = (key: string) =>
    rows(record[key]).flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as Record<string, unknown>
      const label = str(row.label)
      const href = str(row.href)
      return label && href ? [{ label, href }] : []
    })
  return {
    name,
    roleLine: str(record.roleLine),
    email,
    linkedinUrl: str(record.linkedinUrl),
    linkedinLabel: str(record.linkedinLabel),
    location: str(record.location),
    previewBadge: str(record.previewBadge),
    primaryCtaLabel: str(record.primaryCtaLabel, 'Book a call'),
    primaryCtaHref: str(record.primaryCtaHref, '/contact#book'),
    footerBlurb: str(record.footerBlurb),
    copyright: str(record.copyright),
    footerNote: str(record.footerNote),
    navLinks: links('navLinks'),
    footerLinks: links('footerLinks'),
  }
}

export const getPortfolio = cache(async (): Promise<Portfolio> => {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const settingsDoc = await payload.findGlobal({ slug: 'site-settings' })
    const settings = mapSettings(settingsDoc)
    if (!settings) return defaultPortfolio

    const pageResult = await payload.find({ collection: 'pages', limit: 20, depth: 0 })
    const projectResult = await payload.find({
      collection: 'projects',
      limit: 50,
      depth: 0,
      sort: 'index',
    })

    const pages = pageResult.docs.flatMap((doc) => {
      const page = mapPage(doc)
      return page ? [page] : []
    })
    const projects = projectResult.docs.flatMap((doc) => {
      const project = mapProject(doc)
      return project ? [project] : []
    })

    if (pages.length === 0 || projects.length === 0) return defaultPortfolio

    return { settings, pages, projects }
  } catch (error) {
    console.error('Portfolio content fell back to seed copy.', error)
    return defaultPortfolio
  }
})
