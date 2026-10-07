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

Hierarchy matches that scrape: Home, Work index, About, Contact, the BioBuild case, and corporate placeholders. One primary **Book a call** above the fold; the nav keeps a sticky hire button.

## Routes

| Path             | What it is                                                |
| ---------------- | --------------------------------------------------------- |
| `/`              | Hero, Selected Work rail, process forms, closing CTA      |
| `/work`          | 12-slot index with filters                                |
| `/work/biobuild` | The only filled case study                                |
| `/work/att`      | AT&T placeholder (slots 02 and 03)                        |
| `/work/t-mobile` | T-Mobile placeholder (slots 04 and 05)                    |
| `/about`         | Lineage from the résumé, plus study notes                 |
| `/contact`       | Book a call (mailto) and Start a project (saved in admin) |
| `/admin`         | Stock Payload admin                                       |

`/robots.txt` disallows indexing, matching the footer line “Private prototype — not indexed.” Remove that disallow in `src/app/robots.ts`, and clear the preview badge and footer note in Site settings, when the site should be public.

## Edit content

Sign in at `/admin`. Portfolio collections:

- **Site settings** — name, email (`xtionace@gmail.com`), LinkedIn, location, nav, footer, the sticky “Book a call” label. Do not add a personal phone.
- **Pages** — Home, Work, About, and Contact copy. Blocks are keyed (`hero-line-1`, `form-01`, `exp-01`, …). Change the words; leave the keys in place so the layout can find them.
- **Projects** — the 12 work slots. BioBuild is filled. AT&T and T-Mobile stay “pending clearance” until real screenshots exist. Reserved slots are empty on purpose.
- **Inquiries** — messages from the contact form. Nothing is emailed (no paid mail service). Reply yourself from the address in Site settings.
- **Media** — optional uploads. The BioBuild plates currently use the CDN URLs already in the E scrape. Do not invent logos or stock photos.

Seed copy lives in `src/content/portfolio.ts` and is inserted only when a collection is empty. It comes from the E scrape plus the résumé and BioBuild facts in the content pack. It does not invent metrics, client case studies, or a phone number.

## Environment

| Variable         | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `DATABASE_URL`   | SQLite file URL, e.g. `file:./reskin-base.db` |
| `PAYLOAD_SECRET` | Secret for Payload auth and encryption        |

Copy `.env.example` to `.env`. Never commit `.env` or `*.db`. If those variables are missing, the app falls back to `file:./reskin-base.db` and a local-only secret so `pnpm build` can run. Set a real `PAYLOAD_SECRET` before anyone else uses `/admin`.

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

- AT&T and T-Mobile have no screenshots, product names, or metrics. Those pages are NDA-safe stubs.
- Slots 06–12 are reserved. Tru-Line is not listed.
- BioBuild images are the three Magic Patterns CDN plates from the E scrape, not photos from the Fibercrete archive.
- No public phone number.
- Contact form stores inquiries in SQLite. It does not send mail.
- Earlier résumé roles and education are on About as lineage, not as case studies.
- The site is `noindex` until you change `src/app/robots.ts` and the footer note.

## License

MIT
