# Reskin Base

Reusable **Payload CMS** (blank / default template) + **Next.js** + **shadcn/ui** starter.

This is the fork starting point for every future client website reskin. The Website reskin skill forks this repo, then applies per-client template choices later. Do **not** treat this as a finished client site.

## Stack

- Payload 3.x blank template (TypeScript)
- Next.js App Router
- SQLite via `@payloadcms/db-sqlite` (Extra $0 local DB — no paid services)
- Tailwind CSS v4 + shadcn/ui (base-nova) on the **front end only**
- Payload admin at `/admin` keeps the built-in Payload look and feel

## Quick start

```bash
pnpm install
cp .env.example .env   # set PAYLOAD_SECRET to a long random string
pnpm dev
```

- Front end: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (create the first user on first visit)

Requires **Node 20+** and **pnpm**.

## Environment

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `DATABASE_URL`   | SQLite file URL, e.g. `file:./reskin-base.db` |
| `PAYLOAD_SECRET` | Secret for Payload auth / encryption         |

Copy `.env.example` → `.env`. Never commit `.env` or `*.db`.

## Front-end UI

shadcn components live in `src/components/ui/`:

- `button`, `card`, `badge`, `input`, `separator`, `navigation-menu`, `sheet`

Add more:

```bash
pnpm dlx shadcn@latest add <component>
```

Styles / CSS variables: `src/app/globals.css`. Front-end routes: `src/app/(frontend)/`.

## How this is meant to be used

1. Fork (or generate from) **Reskin Base** for a new client.
2. Keep Payload admin stock unless the client needs admin customization.
3. Run the Website reskin skill against the fork for client-specific front-end templates and branding.

## Scripts

| Command        | Description                |
| -------------- | -------------------------- |
| `pnpm dev`     | Dev server                 |
| `pnpm build`   | Production build           |
| `pnpm start`   | Serve production build     |
| `pnpm payload` | Payload CLI                |
| `pnpm generate:types` | Regenerate Payload types |

## License

MIT
