# Self-hosting on the DreamHost VPS

The public site reads Payload, which stores pages, projects, and site settings in MongoDB. That copy is seeded from `src/content/portfolio.ts`. Turso was never created, and there is no production database to copy.

Shipped pictures and the BioBuild card video stay in `public/media` and are served as static files. New files uploaded in the Payload admin go to `PAYLOAD_MEDIA_DIR` on disk. On the VPS that directory is `/srv/christianjwallace/media`, outside the app tree, so a rebuild does not delete them. Nothing talks to Vercel Blob at runtime.

The process listens on `127.0.0.1:3001`. Nginx on the same machine is the public entry. Run it as the `portfolio` user from `/srv/christianjwallace/app`. This document does not change DNS, Vercel, or Turso.

## Layout

| Path | What it is |
| --- | --- |
| `/srv/christianjwallace/app` | This repo. Build output lives in `.next` here. |
| `/srv/christianjwallace/app/.env` | `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SERVER_URL`. Not committed. |
| `/srv/christianjwallace/media` | Payload Media uploads. Create it and give it to `portfolio`. |

## Environment

| Name | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URI` | Yes | MongoDB connection string. |
| `PAYLOAD_SECRET` | Yes | Payload auth and encryption. A long random string. |
| `NEXT_PUBLIC_SERVER_URL` | Production | Canonical origin, `https://christianjwallace.com`, no trailing slash. |
| `PORT` | Yes on the VPS | `3001`. `next start` reads it. |
| `PAYLOAD_MEDIA_DIR` | On the VPS | `/srv/christianjwallace/media`. Local default is `./media`. |
| `SEED_ADMIN_EMAIL` | No | With `SEED_ADMIN_PASSWORD`, `pnpm migrate:mongo` creates one admin. |
| `SEED_ADMIN_PASSWORD` | No | Used only by the migrate script, and only together with the email. |

Node 24 is the target runtime. Node 20.9 or newer can build and run the same commands.

## Build, migrate, start

From `/srv/christianjwallace/app`, as `portfolio`, with MongoDB already running and `.env` in place:

```bash
pnpm install
pnpm migrate:mongo
pnpm build
pnpm start
```

`pnpm start` is `next start`. It listens on `PORT` (3001 in `ecosystem.config.cjs`).

Run the migration again any time. It inserts pages, projects, and site settings only when those collections are empty, then updates code-owned card copy in place. A second run does not add duplicate documents. It does not create an admin user unless both `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set, and it skips that user if the email already exists.

## PM2

`ecosystem.config.cjs` sets the working directory, port, and upload directory. It loads `.env` from the app directory when PM2 reads the file. Start it as `portfolio` so the process is not root:

```bash
sudo -u portfolio -H bash -lc 'cd /srv/christianjwallace/app && pm2 start ecosystem.config.cjs && pm2 save'
```

The app name is `christianjwallace`. Restart after a new build with `pm2 restart christianjwallace`.

## Nginx

Proxy the public host to the local process. Do not publish port 3001.

```nginx
server {
  listen 80;
  server_name christianjwallace.com www.christianjwallace.com;
  client_max_body_size 20m;

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

Terminate TLS in Nginx when the certificate is ready. `NEXT_PUBLIC_SERVER_URL` stays `https://christianjwallace.com`.
