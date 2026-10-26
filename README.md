# Christian Wallace — christianjwallace.com

Personal portfolio for **Christian Wallace**. The front end is template letter **E (Kinetic Craft Chromatic)**: a dark cinematic craft site, solid gold calls to action, an ink-wash accent, and a Selected Work rail.

Forked from Reskin Base (Payload CMS + Next.js App Router + Tailwind CSS + shadcn/ui). **Extra $0** — SQLite on disk, no hosted database, no paid email, no paid services. Host the repo on free GitHub. Do not deploy or change DNS from this codebase; `christianjwallace.com` is DNS-only until you point it yourself.

Payload admin stays the stock Payload UI at `/admin`. The Kinetic Craft theme applies to the public site only.

## Stack

- Payload 3.x (TypeScript)
- Next.js App Router
- SQLite via `@payloadcms/db-sqlite`
- Tailwind CSS v4 + shadcn/ui (base-nova) on the front end

## Run locally

Requires **Node 20+** and **pnpm**.

```bash
pnpm install
cp .env.example .env   # set PAYLOAD_SECRET to a long random string
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Create the first admin user on the first visit to `/admin`. The public copy is seeded on server start when the collections are empty. Later edits in admin are kept.

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

Indexing follows `VERCEL_ENV`. A preview deployment (`VERCEL_ENV=preview`) sends `noindex`, disallows `/` in `/robots.txt`, hides the sitemap, and shows the “Private preview” badge. Any other environment, including a DreamHost production build, allows crawling, publishes `/sitemap.xml`, and hides that badge. Leave the switch in place.

## Edit content

Sign in at `/admin`. Portfolio collections:

- **Site settings** — name, email (`xtionace@gmail.com`), LinkedIn, location, nav, footer, the sticky “Get in touch” label. Do not add a personal phone.
- **Pages** — Home, Work, About, and Contact copy. Open the **Home** page. Blocks are keyed (`hero-line-1`, `log-heading`, `scroll-cue`, `selected`, `process`, `process-prefix`, `form-01`, `closing`, …). Change the words; leave the keys in place so the layout can find them. The homepage hero, session log, selected-work heading, process forms, and closing call to action all read these blocks.
- **Projects** — the work index. BioBuild, AT&T, and T-Mobile are filled case studies. Earlier roles are short cards with coded illustrations, not photos. Cards with **Show on rail** appear in the homepage Selected Work rail.
- **Inquiries** — messages from the contact form. Nothing is emailed (no paid mail service). Reply yourself from the address in Site settings.
- **Media** — optional uploads. The BioBuild plates are files in `public/media`. Do not invent logos or stock photos.

Seed copy lives in `src/content/portfolio.ts` and is inserted only when a collection is empty. It comes from the E scrape plus the résumé and BioBuild facts in the content pack. It does not invent metrics, client case studies, or a phone number.

## Environment

| Variable         | Purpose                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| `PAYLOAD_SECRET` | Required. Secret for Payload auth and encryption. Read only from the environment. |
| `DATABASE_URL`   | Optional SQLite file URL. Local default is `file:./reskin-base.db`.               |

Copy `.env.example` to `.env`. Never commit `.env` or `*.db`. `PAYLOAD_SECRET` has no hard-coded fallback.

### Vercel preview

A preview deployment (`VERCEL_ENV=preview`) does not need a hosted database. If `DATABASE_URL` is unset, Payload uses `file:/tmp/portfolio.db`, runs the SQL migrations, and seeds the public copy on startup. That file is temporary. Do not set domain or redirect rules in `vercel.json` for this.

Preview responses send `noindex, nofollow` when `VERCEL_ENV` is `preview` (robots metadata, `/robots.txt`, and `X-Robots-Tag`). Leave `VERCEL_ENV` unset in production so the site can be indexed.

Set this on the Vercel project for Preview:

| Variable         | Required | Notes                                   |
| ---------------- | -------- | --------------------------------------- |
| `PAYLOAD_SECRET` | Yes      | Long random string. Not committed.      |
| `DATABASE_URL`   | No       | Leave unset so the preview uses `/tmp`. |

`VERCEL_ENV` is set by Vercel. Do not add it yourself.

Production boot runs the SQL migration in `src/migrations` so a fresh SQLite file gets its tables. Development still syncs the schema on startup.

## Scripts

| Command               | Description                |
| --------------------- | -------------------------- |
| `pnpm dev`            | Dev server                 |
| `pnpm build`          | Production build           |
| `pnpm start`          | Serve the production build |
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
- Contact form stores inquiries in SQLite. It does not send mail.
- Earlier résumé roles and education are on About as lineage, not as case studies.
- Search indexing is off only while `VERCEL_ENV=preview`. Before a public launch: set a real `PAYLOAD_SECRET`, point `DATABASE_URL` at a persistent database (not SQLite in `/tmp`), and create the first user at `/admin`.

## License

MIT
