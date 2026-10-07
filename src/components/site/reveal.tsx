import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag className={cn('reveal', className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </Tag>
  )
}
