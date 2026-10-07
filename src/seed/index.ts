import type { Payload } from 'payload'

import { defaultPortfolio } from '@/content/portfolio'
import type { PageDoc, ProjectContent, SiteSettingsContent } from '@/content/types'

function labels(values: string[]) {
  return values.map((label) => ({ label }))
}

function mapPage(page: PageDoc) {
  return {
    title: page.title,
    slug: page.slug,
    eyebrow: page.eyebrow,
    headline: page.headline,
    headlineAccent: page.headlineAccent,
    lede: page.lede,
    blocks: page.blocks.map((item) => ({
      key: item.key,
      label: item.label,
      title: item.title,
      kicker: item.kicker,
      meta: item.meta,
      href: item.href,
      body: item.body,
    })),
  }
}

function mapProject(project: ProjectContent) {
  return {
    index: project.index,
    title: project.title,
    client: project.client,
    status: project.status,
    kind: project.kind,
    caseSlug: project.caseSlug,
    summary: project.summary,
    tags: labels(project.tags),
    href: project.href,
    imageUrl: project.imageUrl,
    imageAlt: project.imageAlt,
    liveUrl: project.liveUrl,
    liveLabel: project.liveLabel,
    showOnRail: project.showOnRail,
    railOrder: project.railOrder,
    role: project.role,
    year: project.year,
    dates: project.dates,
    location: project.location,
    stack: labels(project.stack),
    accent: project.accent,
    log: project.log,
    sections: project.sections,
    highlights: project.highlights,
    facts: project.facts.map((text) => ({ text })),
    gallery: project.gallery,
    plates: project.plates,
    nextHref: project.nextHref,
    nextIndex: project.nextIndex,
    nextTitle: project.nextTitle,
    ndaNote: project.ndaNote,
    closing: project.closing,
  }
}

function mapSettings(settings: SiteSettingsContent) {
  return {
    name: settings.name,
    roleLine: settings.roleLine,
    email: settings.email,
    linkedinUrl: settings.linkedinUrl,
    linkedinLabel: settings.linkedinLabel,
    location: settings.location,
    previewBadge: settings.previewBadge,
    primaryCtaLabel: settings.primaryCtaLabel,
    primaryCtaHref: settings.primaryCtaHref,
    footerBlurb: settings.footerBlurb,
    copyright: settings.copyright,
    footerNote: settings.footerNote,
    navLinks: settings.navLinks,
    footerLinks: settings.footerLinks,
  }
}

export async function seedPortfolio(payload: Payload) {
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings.name) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: mapSettings(defaultPortfolio.settings),
    })
    payload.logger.info('Seeded site settings')
  }

  const pages = await payload.find({ collection: 'pages', limit: 1 })
  if (pages.totalDocs === 0) {
    for (const page of defaultPortfolio.pages) {
      await payload.create({ collection: 'pages', data: mapPage(page) })
    }
    payload.logger.info('Seeded pages')
  }

  const projects = await payload.find({ collection: 'projects', limit: 1 })
  if (projects.totalDocs === 0) {
    for (const project of defaultPortfolio.projects) {
      await payload.create({ collection: 'projects', data: mapProject(project) })
    }
    payload.logger.info('Seeded projects')
  }
}
