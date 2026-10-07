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
  secret: process.env.PAYLOAD_SECRET || 'local-build-only-set-PAYLOAD_SECRET',
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
      url: process.env.DATABASE_URL || 'file:./reskin-base.db',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
