'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1800)
        } catch {
          setCopied(false)
        }
      }}
    >
      {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
