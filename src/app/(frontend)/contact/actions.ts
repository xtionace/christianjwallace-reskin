'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type InquiryState = {
  status: 'idle' | 'error' | 'sent'
  errors: { name?: string; email?: string; message?: string }
  formError?: string
}

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const projectType = String(formData.get('projectType') ?? '').trim()
  const errors: InquiryState['errors'] = {}

  if (!name) errors.name = 'Please add your name.'
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Please enter a valid email.'
  if (message.length < 10) errors.message = 'A sentence or two helps me prepare.'
  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, formError: 'Please fix the highlighted fields.' }
  }

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    await payload.create({
      collection: 'inquiries',
      data: { name, email, message, projectType },
    })
    return { status: 'sent', errors: {} }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      errors: {},
      formError: 'Could not save the message. Email xtionace@gmail.com directly.',
    }
  }
}
