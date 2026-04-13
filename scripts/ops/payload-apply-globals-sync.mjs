import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const appRoot = process.env.PAYLOAD_ROOT || process.cwd()
const syncFile = process.env.SYNC_JSON

if (!syncFile) {
  throw new Error('SYNC_JSON is required')
}

const payloadModule = await import(
  pathToFileURL(path.join(appRoot, 'node_modules/payload/dist/index.js')).href,
)
const configModule = await import(pathToFileURL(path.join(appRoot, 'payload.config.ts')).href)
const syncData = JSON.parse(await fs.readFile(syncFile, 'utf8'))

const { getPayload } = payloadModule
const config = configModule.default

console.log(
  JSON.stringify({
    step: 'globals-sync:start',
    appRoot,
    syncFile,
    timestamp: new Date().toISOString(),
  }),
)

const payload = await getPayload({ config, disableOnInit: true })

await payload.updateGlobal({
  slug: 'site-settings',
  data: syncData.siteSettings,
  depth: 0,
  overrideAccess: true,
})

await payload.updateGlobal({
  slug: 'header',
  data: syncData.header,
  depth: 0,
  overrideAccess: true,
})

await payload.updateGlobal({
  slug: 'home-page',
  data: syncData.homePage,
  depth: 0,
  overrideAccess: true,
})

await payload.destroy()

console.log(
  JSON.stringify({
    step: 'globals-sync:done',
    timestamp: new Date().toISOString(),
  }),
)
