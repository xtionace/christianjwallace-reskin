import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CtaLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  showIcon?: boolean
  external?: boolean
}

export function CtaLink({
  href,
  children,
  variant = 'primary',
  className,
  showIcon = true,
  external = false,
}: CtaLinkProps) {
  const classes = cn(variant === 'primary' ? 'cta-solid' : undefined, className)
  const content = (
    <>
      {children}
      {showIcon ? <ArrowUpRight data-icon="inline-end" /> : null}
    </>
  )

  if (external) {
    return (
      <Button
        nativeButton={false}
        variant={variant === 'primary' ? 'default' : 'outline'}
        size="cta"
        className={classes}
        render={<a href={href} target="_blank" rel="noreferrer" />}
      >
        {content}
      </Button>
    )
  }

  return (
    <Button
      nativeButton={false}
      variant={variant === 'primary' ? 'default' : 'outline'}
      size="cta"
      className={classes}
      render={<Link href={href} />}
    >
      {content}
    </Button>
  )
}
