const path = require('node:path')

const deployUser = process.env.DEPLOY_USER || 'amazonaviationservice'
const deployRootDir =
  process.env.DEPLOY_ROOT_DIR ||
  process.env.DOMAIN_DIR ||
  path.join('/home', deployUser, 'apps', 'amazonaviationservice.com')
const sharedDir = path.join(deployRootDir, 'shared')
const host = process.env.APP_HOST || '127.0.0.1'
const port = process.env.PORT || '3004'

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'amazon-service-payload',
      cwd: path.join(deployRootDir, 'current'),
      script: 'node_modules/next/dist/bin/next',
      args: `start -H ${host} -p ${port}`,
      env_file: path.join(sharedDir, '.env'),
      out_file: path.join(sharedDir, 'logs', 'app.out.log'),
      error_file: path.join(sharedDir, 'logs', 'app.err.log'),
      time: true,
      env: {
        APP_HOST: host,
        NODE_ENV: 'production',
        PORT: port,
      },
    },
  ],
}
