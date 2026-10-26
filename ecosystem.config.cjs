const path = require('path')

require('dotenv').config({ path: path.join('/srv/christianjwallace/app', '.env') })

// Run this process as the portfolio user. Nginx proxies to 127.0.0.1:3001.
module.exports = {
  apps: [
    {
      name: 'christianjwallace',
      cwd: '/srv/christianjwallace/app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1',
      interpreter: 'node',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
        PAYLOAD_MEDIA_DIR: '/srv/christianjwallace/media',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
        DATABASE_URI: process.env.DATABASE_URI,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
      },
    },
  ],
}
