import { config as loadEnv } from 'dotenv'
import { resolve } from 'path'

loadEnv({ path: resolve(process.cwd(), '.env') })

function required(name: string) {
  const value = process.env[name]?.trim()
  if (!value) {
    console.error(`${name} is required.`)
    process.exit(1)
  }
  return value
}

required('DATABASE_URI')
required('PAYLOAD_SECRET')

const { getPayload } = await import('payload')
const { default: config } = await import('@payload-config')
const { seedPortfolio } = await import('../src/seed/index')

async function ensureAdmin(payload: Awaited<ReturnType<typeof getPayload>>) {
  const email = process.env.SEED_ADMIN_EMAIL?.trim()
  const password = process.env.SEED_ADMIN_PASSWORD
  if (!email || !password) {
    console.log('SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is unset. No admin user was created.')
    return
  }
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    console.log(`Admin ${email} already exists.`)
    return
  }
  await payload.create({
    collection: 'users',
    data: { email, password },
  })
  console.log(`Created admin ${email}.`)
}

const payload = await getPayload({ config })
await seedPortfolio(payload)
await ensureAdmin(payload)

const [pages, projects, users, inquiries, media] = await Promise.all([
  payload.find({ collection: 'pages', limit: 1 }),
  payload.find({ collection: 'projects', limit: 1 }),
  payload.find({ collection: 'users', limit: 1 }),
  payload.find({ collection: 'inquiries', limit: 1 }),
  payload.find({ collection: 'media', limit: 1 }),
])
const settings = await payload.findGlobal({ slug: 'site-settings' })

console.log(
  JSON.stringify({
    settings: settings.name,
    pages: pages.totalDocs,
    projects: projects.totalDocs,
    users: users.totalDocs,
    inquiries: inquiries.totalDocs,
    media: media.totalDocs,
  }),
)

process.exit(0)
