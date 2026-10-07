import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { block, blocksByPrefix } from '@/content/types'
import type { PageDoc } from '@/content/types'

export function ProcessForms({ page }: { page: PageDoc | undefined }) {
  const heading = block(page, 'process')
  const forms = blocksByPrefix(page, 'form-')

  return (
    <section aria-labelledby="process-title" className="relative border-y border-border bg-card">
      <div className="site-container py-24 md:py-32">
        <SectionHeading
          id="process-title"
          eyebrow={heading?.label ?? 'Process'}
          title={
            <>
              {heading?.title} <span className="text-muted-foreground">{heading?.kicker}</span>
            </>
          }
          description={heading?.body}
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-white/6 md:grid-cols-5">
          {forms.map((form, index) => (
            <Reveal key={form.key} as="li" delay={index * 0.08} className="group relative bg-card">
              <div className="relative flex h-full flex-col p-6 transition-colors duration-500 hover:bg-secondary motion-reduce:transition-none lg:p-7">
                <span
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                  Form {form.label}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  {form.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-violet-soft">{form.kicker}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{form.body}</p>
                <span
                  className="mt-auto pt-8 font-display text-6xl leading-none font-bold text-white/4"
                  aria-hidden="true"
                >
                  {form.label}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
