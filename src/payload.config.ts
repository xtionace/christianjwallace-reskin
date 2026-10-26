import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import fs from 'fs'
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
import { payloadMediaDir } from './lib/media-dir'
import { seedPortfolio } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function databaseUri() {
  const uri = process.env.DATABASE_URI?.trim()
  if (!uri) {
    throw new Error('DATABASE_URI is required. Set it to a MongoDB connection string.')
  }
  return uri
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
    await fs.promises.mkdir(payloadMediaDir(), { recursive: true })
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
  db: mongooseAdapter({
    url: databaseUri(),
  }),
  sharp,
  plugins: [],
})
