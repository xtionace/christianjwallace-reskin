'use client'

import { useActionState, useEffect, useState } from 'react'
import { AlertCircle, Check } from 'lucide-react'

import { submitInquiry, type InquiryState } from '@/app/(frontend)/contact/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type ContactFormProps = {
  projectTypes: string[]
  title: string
  description: string
  note: string
  successTitle: string
  successBody: string
  email: string
}

export function ContactForm({
  projectTypes,
  title,
  description,
  note,
  successTitle,
  successBody,
  email,
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitInquiry, {
    status: 'idle',
    errors: {},
  } satisfies InquiryState)
  const [type, setType] = useState(projectTypes[0] ?? 'New website')
  const [dismissed, setDismissed] = useState(false)
  const sent = state.status === 'sent' && !dismissed && !pending

  useEffect(() => {
    if (pending) setDismissed(false)
  }, [pending])

  return (
    <section aria-labelledby="form-title" className="luminous rounded-3xl bg-card p-7 md:p-9">
      <h2 id="form-title" className="font-display text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {sent ? (
        <Alert className="mt-8 border-moss/40 bg-moss/10 p-6">
          <span className="grid size-10 place-items-center rounded-full bg-moss text-background">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <AlertTitle className="mt-4 font-display text-xl">{successTitle}</AlertTitle>
          <AlertDescription>
            {successBody} {email}.
          </AlertDescription>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={() => setDismissed(true)}
          >
            Send another
          </Button>
        </Alert>
      ) : (
        <form action={formAction} noValidate className="mt-8">
          <FieldGroup>
            {state.formError ? (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Check the form</AlertTitle>
                <AlertDescription>{state.formError}</AlertDescription>
              </Alert>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={Boolean(state.errors?.name) || undefined}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={Boolean(state.errors?.name)}
                  placeholder="Your name"
                  className="h-11"
                />
                <FieldError>{state.errors?.name}</FieldError>
              </Field>
              <Field data-invalid={Boolean(state.errors?.email) || undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(state.errors?.email)}
                  placeholder="you@company.com"
                  className="h-11"
                />
                <FieldError>{state.errors?.email}</FieldError>
              </Field>
            </div>
            <FieldSet>
              <FieldLegend variant="label">Project type</FieldLegend>
              <input type="hidden" name="projectType" value={type} />
              <ToggleGroup
                variant="outline"
                spacing={2}
                value={[type]}
                onValueChange={(groupValue) => {
                  const next = groupValue[groupValue.length - 1]
                  if (next) setType(next)
                }}
                aria-label="Project type"
                className="flex w-full flex-wrap"
              >
                {projectTypes.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    value={item}
                    className="h-auto rounded-full px-3.5 py-2 data-[state=on]:border-primary/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                  >
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FieldSet>
            <Field data-invalid={Boolean(state.errors?.message) || undefined}>
              <FieldLabel htmlFor="message">What are you building?</FieldLabel>
              <Textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={Boolean(state.errors?.message)}
                placeholder="A few sentences about the project, timing, and goals."
              />
              <FieldError>{state.errors?.message}</FieldError>
            </Field>
            <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-muted-foreground/70">{note}</p>
              <Button type="submit" size="cta" disabled={pending}>
                {pending ? <Spinner data-icon="inline-start" /> : null}
                {pending ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      )}
    </section>
  )
}
