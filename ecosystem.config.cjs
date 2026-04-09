/* eslint-disable @typescript-eslint/no-require-imports -- PM2 loads this file as CommonJS. */
const path = require('node:path')

const deployRootDir =
  process.env.DEPLOY_ROOT_DIR || process.env.DOMAIN_DIR || '/var/www/amazon-service-payload'
const host = process.env.APP_HOST || '127.0.0.1'
const port = process.env.PORT || '3004'

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'amazon-service-payload',
      cwd: path.join(deployRootDir, 'current'),
      script: 'node_modules/next/dist/bin/next',
      args: `start -H ${host} -p ${port}`,
      env_file: path.join(deployRootDir, 'shared', '.env'),
      env: {
        APP_HOST: host,
        NODE_ENV: 'production',
        PORT: port,
      },
    },
  ],
}
