import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/site/case-study'
import { caseProject } from '@/content/portfolio'
import { getPortfolio } from '@/lib/get-portfolio'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const portfolio = await getPortfolio()
  const project = caseProject(portfolio.projects, slug)
  if (!project) return { title: 'Work' }
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function WorkCasePage({ params }: Args) {
  const { slug } = await params
  const portfolio = await getPortfolio()
  const project = caseProject(portfolio.projects, slug)
  if (!project || project.kind === 'reserved') notFound()

  return <CaseStudy portfolio={portfolio} project={project} />
}
