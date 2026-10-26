import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/site/case-study'
import { caseProject } from '@/content/portfolio'
import type { ProjectContent } from '@/content/types'
import { getPortfolio } from '@/lib/get-portfolio'
import { pageMetadata } from '@/lib/page-metadata'

function publishedCase(project: ProjectContent | undefined) {
  return project && project.kind !== 'reserved' && project.kind !== 'card' ? project : undefined
}

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const portfolio = await getPortfolio()
  const project = publishedCase(caseProject(portfolio.projects, slug))
  if (!project) return pageMetadata('Not found')
  return pageMetadata(project.title, project.summary)
}

export default async function WorkCasePage({ params }: Args) {
  const { slug } = await params
  const portfolio = await getPortfolio()
  const project = publishedCase(caseProject(portfolio.projects, slug))
  if (!project) notFound()

  return <CaseStudy portfolio={portfolio} project={project} />
}
