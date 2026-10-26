# Christian Wallace — christianjwallace.com

Personal portfolio for **Christian Wallace**. The front end is template letter **E (Kinetic Craft Chromatic)**: a dark cinematic craft site, solid gold calls to action, an ink-wash accent, and a Selected Work rail.

Forked from Reskin Base (Payload CMS + Next.js App Router + Tailwind CSS + shadcn/ui). Content is seeded from `src/content/portfolio.ts` into MongoDB. Shipped media stays in `public/media`. Self-hosting on the DreamHost VPS is `docs/self-hosting.md`. Do not deploy or change DNS from this codebase.

Payload admin stays the stock Payload UI at `/admin`. The Kinetic Craft theme applies to the public site only.

## Stack

- Payload 3.x (TypeScript)
- Next.js App Router
- MongoDB via `@payloadcms/db-mongodb`
- Tailwind CSS v4 + shadcn/ui (base-nova) on the front end

## Run locally

Requires **Node 20+** and **pnpm**.

```bash
pnpm install
cp .env.example .env   # set PAYLOAD_SECRET and DATABASE_URI
pnpm migrate:mongo
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

The public copy is seeded from `src/content/portfolio.ts` when the collections are empty. Later edits in admin are kept. Create the first admin user on the first visit to `/admin`, or set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before `pnpm migrate:mongo`.

```bash
pnpm build
pnpm start
```

## Template

Locked design: **E — Kinetic Craft Chromatic** (Round 2, artifact v3, solid gold CTAs).

- Editor: https://www.magicpatterns.com/c/2gaw495c1akfgcmj8engha
- Artifact: `00601bd3-f015-45fe-a210-62f5e6017246`

Public pages: Home, Work index, About, Contact, and case studies for BioBuild, AT&T, and T-Mobile. The nav keeps a **Get in touch** link.

## Routes

| Path             | What it is                                                |
| ---------------- | --------------------------------------------------------- |
| `/`              | Hero, Selected Work rail, process forms, closing CTA      |
| `/work`          | Work index of real roles                                  |
| `/work/biobuild` | BioBuild case study                                       |
| `/work/att`      | AT&T case study                                           |
| `/work/t-mobile` | T-Mobile case study                                       |
| `/about`         | Lineage from the résumé, plus study notes                 |
| `/contact`       | A short call (mailto) and a note saved in admin           |
| `/admin`         | Stock Payload admin                                       |

Indexing follows `VERCEL_ENV`. A preview deployment (`VERCEL_ENV=preview`) sends `noindex`, disallows `/` in `/robots.txt`, hides the sitemap, and shows the “Private preview” badge. Production (`VERCEL_ENV=production`, which Vercel sets itself) allows crawling, publishes `/sitemap.xml`, and hides that badge. Leave the switch in place. The launch plan is `docs/production-plan.md`.

## Edit content

Sign in at `/admin`. Portfolio collections:

- **Site settings** — name, email (`contact@christianjwallace.com`), LinkedIn, location, nav, footer, the sticky “Get in touch” label. Do not add a personal phone.
- **Pages** — Home, Work, About, and Contact copy. Open the **Home** page. Blocks are keyed (`hero-line-1`, `log-heading`, `scroll-cue`, `selected`, `process`, `process-prefix`, `form-01`, `closing`, …). Change the words; leave the keys in place so the layout can find them. The homepage hero, session log, selected-work heading, process forms, and closing call to action all read these blocks.
- **Projects** — the work index. BioBuild, AT&T, and T-Mobile are filled case studies. Earlier roles are short cards with coded illustrations, not photos. Cards with **Show on rail** appear in the homepage Selected Work rail.
- **Inquiries** — messages from the contact form. Nothing is emailed (no paid mail service). Reply yourself from the address in Site settings.
- **Media** — new admin uploads, stored on disk in `PAYLOAD_MEDIA_DIR` (local default `./media`, VPS `/srv/christianjwallace/media`). The BioBuild plates and card video are files in `public/media`. Do not invent logos or stock photos.

Seed copy lives in `src/content/portfolio.ts` and is inserted only when a collection is empty. It comes from the E scrape plus the résumé and BioBuild facts in the content pack. It does not invent metrics, client case studies, or a phone number.

## Environment

| Variable                  | Purpose                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `PAYLOAD_SECRET`          | Required. Secret for Payload auth and encryption. Read only from the environment.                |
| `DATABASE_URI`            | Required MongoDB connection string.                                                              |
| `NEXT_PUBLIC_SERVER_URL`  | Canonical origin in production.                                                                  |
| `PORT`                    | Port for `next start`. The VPS uses `3001`.                                                      |
| `PAYLOAD_MEDIA_DIR`       | Directory for new admin uploads. Default `./media`.                                              |
| `SEED_ADMIN_EMAIL`        | Optional. With `SEED_ADMIN_PASSWORD`, the migrate script creates one admin.                      |
| `SEED_ADMIN_PASSWORD`     | Optional. Used only by `pnpm migrate:mongo`.                                                     |

Copy `.env.example` to `.env`. Never commit `.env`. `PAYLOAD_SECRET` has no hard-coded fallback. The VPS commands are in `docs/self-hosting.md`.

Preview responses send `noindex, nofollow` when `VERCEL_ENV` is `preview` (robots metadata, `/robots.txt`, and `X-Robots-Tag`). Leave `VERCEL_ENV` unset when the site should be indexed. `VERCEL_ENV` is set by Vercel. Do not add it yourself.

## Scripts

| Command               | Description                |
| --------------------- | -------------------------- |
| `pnpm dev`            | Dev server                 |
| `pnpm build`          | Production build           |
| `pnpm start`          | Serve the production build |
| `pnpm migrate:mongo`  | Seed MongoDB from `src/content/portfolio.ts` |
| `pnpm payload`        | Payload CLI                |
| `pnpm generate:types` | Regenerate Payload types   |
| `pnpm lint`           | ESLint                     |

## Intentional gaps

- AT&T is a case study from the interview notes: two AI toolkits, a coded gated-loop diagram, and shipping velocity written as 5-10 PRs a month to 40. No internal screenshots or internal tool names.
- T-Mobile is a case study from the interview notes: consumer design system, a Metro theme on the same components, and color tokens for iOS, Android, and web. The diagram is coded. No screenshots and no internal tool names.
- Earlier employers are short cards. The Xbox card illustrates four public 2017 titles (Halo Wars 2, Cuphead, Forza Motorsport 7, Super Lucky's Tale) with release dates checked against Wikipedia and Xbox Wire. The statuses are illustration labels.
- There are no reserved slots. Tru-Line is not listed.
- BioBuild images are the three plates from the E scrape, stored in `public/media`, not photos from the Fibercrete archive.
- No public phone number.
- Contact form stores inquiries in MongoDB. It does not send mail.
- Earlier résumé roles and education are on About as lineage, not as case studies.
- Search indexing is off only while `VERCEL_ENV=preview`. Self-hosting is `docs/self-hosting.md`. `docs/production-plan.md` keeps the earlier Vercel notes; Turso was never created.

## License

MIT
