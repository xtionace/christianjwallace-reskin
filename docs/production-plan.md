# Production plan

Checked 26 October 2026. This is a plan and config only. No Vercel project settings, domains, databases, Blob stores, billing, or DreamHost DNS records were changed from this repo.

On 26 October 2026 Christian moved the database plan off Turso. Turso was never created, and there is no production data to copy. The site seeds MongoDB from `src/content/portfolio.ts` and runs on a DreamHost VPS. The commands, PM2 file, and Nginx example are in `docs/self-hosting.md`. The Vercel and Turso steps below are the earlier notes. Do not create a Turso database from them.

Christian decided on 25 October 2026, 11:15 PM PT, to host the portfolio on Vercel for now:

- Team: `matrix-studio1`
- Project: `christianjwallace-portfolio`
- Plan: Vercel Hobby (free)

DreamHost keeps DNS and email for `christianjwallace.com`. Do not move the nameservers to Vercel. That would take the mail records with them.

The Hobby plan is for personal, non-commercial use ([Vercel Hobby](https://vercel.com/docs/plans/hobby)). Stay on Hobby. Do not start a Pro trial and do not add a payment method.

## Recommendation

Superseded. Use MongoDB and the DreamHost VPS in `docs/self-hosting.md`. The notes that follow described **Turso (libSQL)** with `@payloadcms/db-sqlite`. That adapter is no longer installed, `src/migrations` is gone, and `DATABASE_URI` is a MongoDB connection string.

The abandoned plan treated the SQL in `src/migrations` as SQLite (`strftime`, backtick identifiers, integer primary keys), which libSQL can run and Postgres cannot. Local development kept `file:./reskin-base.db`. A remote database was a `libsql://` URL plus a token, the setup in [Payload’s SQLite docs](https://payloadcms.com/docs/database/sqlite).

Neon was the later Postgres option if the schema were regenerated for `@payloadcms/db-postgres`. It was not wired up. Under that SQLite adapter, a `postgres://` or `postgresql://` string in `DATABASE_URL` or `DATABASE_URI` was ignored so it could not be passed to the SQLite client. That guard is gone with the adapter.

Keep uploads out of object storage for launch. The BioBuild plates and the card video already live in `public/` and ship with the deployment. Add Vercel Blob only if the Payload Media collection needs to store new files.

## Database comparison

Figures below are from the vendors’ pages on 26 October 2026. Confirm them on the install screen before creating anything. The free plans can change.

| | Neon Postgres | Turso / libSQL |
| --- | --- | --- |
| Payload adapter | `@payloadcms/db-postgres` | `@payloadcms/db-sqlite` (already installed). `client.url` is a `libsql://` URL and `client.authToken` is the token. |
| Fits this repo | No, until migrations are regenerated. Current migrations will not run. | Yes. Same adapter and the same migration files. |
| Vercel Marketplace | Yes. [Neon](https://vercel.com/marketplace/neon) is a native integration. `vercel install neon` is documented. It writes `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED`. | Yes. [Turso Cloud](https://vercel.com/marketplace/tursocloud) is a native integration. It writes `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. |
| Free storage | 1 GB Postgres storage per project, 20 GB across all projects ([Neon plans](https://neon.com/docs/introduction/plans)). | 5 GB ([Turso pricing](https://turso.tech/pricing)). |
| Free usage | 100 CU-hours per project per month (about 400 hours at 0.25 CU). Compute scales to zero after 5 minutes and that sleep cannot be turned off. 5 GB public network transfer per project per month. 100 projects, 10 branches per project. | 100 databases, 500 million rows read per month, 10 million rows written per month, 3 GB sync per month. The Marketplace card also says “500 Free” databases. Treat 100 as the pricing-page limit until the install screen says otherwise. |
| What happens at the cap | Compute suspends until the next month, or writes fail when storage is over the cap. Data is not deleted. | Free plan must be upgraded. Databases are blocked at the cap. Data is not described as deleted. |
| Cold start | A visitor after 5 idle minutes waits for the compute to wake. This site reads Payload on each request. | Queries go over HTTP. There is no documented 5-minute compute sleep on the free plan. |
| Cost to start | $0, no credit card on Neon’s own free plan. Marketplace billing is through Vercel. Choose the $0 plan and stop if a card is required. | $0, no credit card on Turso’s free plan. The paid Developer plan starts at $4.99/month. Do not select it. |

A portfolio database (pages, projects, inquiries, one admin user) stays far under either storage cap. The reasons to pick Turso are the existing SQLite migrations and the lack of a forced compute sleep.

## Uploads

Do not create a Blob store for launch.

| | `public/` (chosen) | Vercel Blob |
| --- | --- | --- |
| What it holds | BioBuild images, the card loop, the poster. They are already in the repo. | Files uploaded later through Payload Media. |
| Hobby allowance | Counts toward the deployment, not Blob. | 1 GB storage, 10,000 simple operations, 2,000 advanced operations, and 10 GB data transfer per month ([Blob pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing)). Over the cap, Blob stops until the next 30 days. Hobby cannot buy more. |
| Package | None. | `@payloadcms/storage-vercel-blob`, same Payload version as the app (3.90.2), enabled only when `BLOB_READ_WRITE_TOKEN` is set. |
| Env | None. | `BLOB_READ_WRITE_TOKEN` |

The plugin is not installed. Local Media uploads still use Payload’s default disk storage.

## Environment variables

The names in this table were for the Vercel and Turso plan. The running app reads `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `PORT`, and `PAYLOAD_MEDIA_DIR` instead. See `docs/self-hosting.md`. Names only. Do not commit values. `VERCEL_ENV` is set by Vercel. Do not add it yourself.

| Name | Where | Purpose |
| --- | --- | --- |
| `PAYLOAD_SECRET` | Production and Preview | Payload auth and encryption. A long random string. Use a different value per environment. |
| `DATABASE_URL` | Production | libSQL URL (`libsql://…`). Local default remains `file:./reskin-base.db`. |
| `DATABASE_AUTH_TOKEN` | Production, only with a remote URL | Token for that database. Omit it for a `file:` URL. |
| `TURSO_DATABASE_URL` | Optional alias | Read when `DATABASE_URL` is empty. This is the name the Turso Marketplace integration writes. |
| `TURSO_AUTH_TOKEN` | Optional alias | Read when `DATABASE_AUTH_TOKEN` is empty. Marketplace name for the token. |
| `DATABASE_URI` | Was not the Mongo name | Under the SQLite adapter this was accepted only as a `file:` or `libsql:` URL. It is now the required MongoDB connection string. See `docs/self-hosting.md`. |
| `NEXT_PUBLIC_SERVER_URL` | Production | Canonical origin, `https://christianjwallace.com`, with no trailing slash. Leave unset locally and on Preview so those deployments do not advertise the production origin. |
| `VERCEL_ENV` | Set by Vercel | Indexing switch. `preview` is noindex (robots meta, `/robots.txt`, empty sitemap, preview badge). `production` is indexable. |
| `BLOB_READ_WRITE_TOKEN` | Only if Blob is added later | Vercel Blob read/write token. Not required now. |
| `RESEND_API_KEY` | Only if notification mail is added later | Resend API key. The contact form does not send mail today. |
| `CONTACT_NOTIFY_TO` | With the mail feature | Default `contact@christianjwallace.com`. |
| `CONTACT_FROM_EMAIL` | With the mail feature | A sender on a domain the mail provider has verified. |

Preview can leave `DATABASE_URL` unset. The app then uses `file:/tmp/portfolio.db`, migrates, and seeds. That file disappears with the instance. Do not point Preview at the production database.

## Launch steps

Do not run these Turso steps. The VPS steps are in `docs/self-hosting.md`. The list below is the earlier Hobby-plan sequence. None of these steps were run.

1. Create one Turso database on the free plan (Turso’s dashboard or the Marketplace integration on team `matrix-studio1`). Name it for this project. If the screen asks for a paid plan or a card, stop.
2. In the Vercel project `christianjwallace-portfolio`, set Production `PAYLOAD_SECRET`, `DATABASE_URL` (the `libsql://` URL), and `DATABASE_AUTH_TOKEN`. If the integration already created `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`, those names work and you can skip duplicating them.
3. Set Production `NEXT_PUBLIC_SERVER_URL` to `https://christianjwallace.com`.
4. Deploy Production. On production boot, Payload runs `prodMigrations` from `src/migrations` against that database. To run them once by hand instead, from a machine that has the same two database variables and `PAYLOAD_SECRET`:

   ```bash
   pnpm payload migrate
   ```

   Do not run that against the local file unless you mean to.
5. Open `https://<the-production-host>/admin` and create the first user. The public copy seeds when the collections are empty. Later edits in admin are kept.
6. Confirm indexing on the production deployment. `VERCEL_ENV` will be `production`. `/robots.txt` should allow `/` and list the sitemap. The HTML should not contain `noindex`. The “Private preview” badge should be absent. Preview deployments stay noindex. Do not delete that branch of the code.
7. Add the domains in the Vercel project (Settings → Domains): `christianjwallace.com` and `www.christianjwallace.com`. Make the apex the primary domain and redirect `www` to it. The site’s canonical URL is already `https://christianjwallace.com`. Read the domain card before touching DNS. The card is the source of truth for the record values.
8. At DreamHost, add only the records in the next section. Then use the Vercel domain card to confirm the configuration is valid and the certificate was issued.

## DNS at DreamHost

These Vercel record examples are not applied by this branch. Leave the nameservers at DreamHost. Do not edit MX, SPF, DKIM, DMARC, or any other mail TXT records. The public address is `contact@christianjwallace.com`.

Vercel’s current docs (26 October 2026):

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel) says the general-purpose apex address is `76.76.21.21`. Newer projects can be assigned a different anycast address. The article’s example is `216.198.79.1`. Use the address on this project’s domain card.
- The same article’s `www` CNAME is project-specific. Its example is `d1d4fc829fe7bc7c.vercel-dns-017.com`.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns) uses `76.76.21.21` and `cname.vercel-dns-0.com` as the examples of an A value and a CNAME target.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) says to copy `your_project_ip` and `your_project_cname_target` from the domain card when DNS is hosted outside Vercel.

| Type | Host at DreamHost | Documented value | Confirm |
| --- | --- | --- | --- |
| A | `@` (apex) | `76.76.21.21` | Replace with the A value on the Vercel domain card if it differs. |
| CNAME | `www` | `cname.vercel-dns-0.com` | Replace with the CNAME target on the Vercel domain card. It is often a project-specific host ending in `.vercel-dns-017.com` or similar. |

Before saving the A record, remove other A and AAAA records on the apex that point somewhere else. Vercel does not support IPv6 for a custom domain on third-party DNS, and a leftover AAAA record can block the certificate. Do not remove MX records while doing that.

After DreamHost saves the records, check the Vercel domain card until it reports a valid configuration. The certificate is issued after that. Propagation is not instant.

DreamHost mail for the domain stays as it is. The public address is `contact@christianjwallace.com`, so the existing MX records are what deliver that mail. Do not replace them when the A record is added.
