import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` ADD \`status_label\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`media_badge\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`status_label\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`media_badge\`;`)
}
