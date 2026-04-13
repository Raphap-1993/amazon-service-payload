import path from 'node:path'
import { pathToFileURL } from 'node:url'

const appRoot = process.env.PAYLOAD_ROOT || process.cwd()
const applyChanges = process.env.APPLY === 'true'

const payloadModule = await import(
  pathToFileURL(path.join(appRoot, 'node_modules/payload/dist/index.js')).href
)
const configModule = await import(pathToFileURL(path.join(appRoot, 'payload.config.ts')).href)

const { getPayload } = payloadModule
const config = configModule.default

console.log(
  JSON.stringify({
    step: 'schema-sync:start',
    appRoot,
    applyChanges,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }),
)

const payload = await getPayload({ config, disableOnInit: true })
const adapter = payload.db
const { pushSchema } = adapter.requireDrizzleKit()

const result = await pushSchema(
  adapter.schema,
  adapter.drizzle,
  adapter.schemaName ? [adapter.schemaName] : undefined,
  adapter.tablesFilter,
  adapter.extensions?.postgis ? ['postgis'] : undefined,
)

console.log(
  JSON.stringify({
    step: 'schema-sync:plan',
    hasDataLoss: result.hasDataLoss,
    warnings: result.warnings,
  }),
)

if (applyChanges) {
  await result.apply()

  const migrationsTable = adapter.schemaName
    ? `"${adapter.schemaName}"."payload_migrations"`
    : '"payload_migrations"'
  const selectSQL = `SELECT * FROM ${migrationsTable} WHERE batch = '-1'`
  const updateSQL = `UPDATE ${migrationsTable} SET updated_at = CURRENT_TIMESTAMP WHERE batch = '-1'`
  const migrationRows = await adapter.execute({ drizzle: adapter.drizzle, raw: selectSQL })

  if (!migrationRows.rows.length) {
    await adapter.drizzle.insert(adapter.tables.payload_migrations).values({ name: 'dev', batch: -1 })
  } else {
    await adapter.execute({ drizzle: adapter.drizzle, raw: updateSQL })
  }

  console.log(
    JSON.stringify({
      step: 'schema-sync:applied',
      timestamp: new Date().toISOString(),
    }),
  )
}

await payload.destroy()

console.log(
  JSON.stringify({
    step: 'schema-sync:done',
    timestamp: new Date().toISOString(),
  }),
)
