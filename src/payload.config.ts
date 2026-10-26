import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'
import { seedPortfolio } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Local and preview stay on a SQLite file. Production on Vercel sets DATABASE_URL
 * to a libsql:// Turso URL. A postgres URL is ignored so a Neon string cannot be
 * handed to the SQLite adapter. See docs/production-plan.md.
 */
function databaseUrl() {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.TURSO_DATABASE_URL,
    process.env.DATABASE_URI,
  ]
  for (const value of candidates) {
    const trimmed = value?.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('postgres://') || trimmed.startsWith('postgresql://')) continue
    return trimmed
  }
  if (process.env.VERCEL_ENV === 'preview') return 'file:/tmp/portfolio.db'
  return 'file:./reskin-base.db'
}

function databaseAuthToken() {
  return process.env.DATABASE_AUTH_TOKEN?.trim() || process.env.TURSO_AUTH_TOKEN?.trim() || undefined
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Projects, Inquiries],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL?.trim() || undefined,
  onInit: async (payload) => {
    if (process.env.NEXT_PHASE === 'phase-production-build') return
    if (process.env.PAYLOAD_MIGRATING === 'true') return
    try {
      await seedPortfolio(payload)
    } catch (error) {
      payload.logger.error({ err: error, msg: 'Portfolio seed skipped' })
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: databaseUrl(),
      ...(databaseAuthToken() ? { authToken: databaseAuthToken() } : {}),
    },
    prodMigrations: migrations,
    busyTimeout: process.env.VERCEL_ENV === 'preview' ? 5000 : 0,
  }),
  sharp,
  plugins: [],
})
