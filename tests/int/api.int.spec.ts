import { describe, it, expect } from 'vitest'

describe('API', () => {
  it('fetches users when DATABASE_URI is set', async () => {
    if (!process.env.DATABASE_URI) return
    const { getPayload } = await import('payload')
    const { default: config } = await import('@/payload.config')
    const payload = await getPayload({ config })
    const users = await payload.find({ collection: 'users' })
    expect(users).toBeDefined()
  })
})
