import { promises as fs } from 'node:fs'
import path from 'node:path'

const UNDICI_PATCH_MARKER = 'amazon-service-payload-undici-cache-storage-patch'
const PAYLOAD_ENV_PATCH_MARKER = 'amazon-service-payload-payload-loadenv-patch'
const pnpmDir = path.resolve(process.cwd(), 'node_modules/.pnpm')

const undiciTargetSnippet = `const { CacheStorage } = require('./lib/web/cache/cachestorage')
const { kConstruct } = require('./lib/core/symbols')

module.exports.caches = new CacheStorage(kConstruct)
`

const undiciReplacementSnippet = `const { CacheStorage } = require('./lib/web/cache/cachestorage')
const { kConstruct } = require('./lib/core/symbols')

function createFallbackCacheStorage () {
  if (globalThis.caches && typeof globalThis.caches === 'object') {
    return globalThis.caches
  }

  const emptyCache = {
    add: async () => undefined,
    addAll: async () => undefined,
    delete: async () => false,
    keys: async () => [],
    match: async () => undefined,
    matchAll: async () => [],
    put: async () => undefined
  }

  return {
    // ${UNDICI_PATCH_MARKER}
    delete: async () => false,
    has: async () => false,
    keys: async () => [],
    match: async () => undefined,
    open: async () => emptyCache
  }
}

let cachesExport

try {
  cachesExport = new CacheStorage(kConstruct)
} catch (error) {
  if (error instanceof TypeError && /Illegal constructor/.test(error.message)) {
    cachesExport = createFallbackCacheStorage()
  } else {
    throw error
  }
}

module.exports.caches = cachesExport
`

const payloadLoadEnvTargetSnippet = `import nextEnvImport from '@next/env';
import { findUpSync } from '../utilities/findUp.js';
const { loadEnvConfig } = nextEnvImport;
`

const payloadLoadEnvReplacementSnippet = `import * as nextEnvImport from '@next/env';
import { findUpSync } from '../utilities/findUp.js';
const nextEnvModule = nextEnvImport?.default ?? nextEnvImport;
const { loadEnvConfig } = nextEnvModule;
// ${PAYLOAD_ENV_PATCH_MARKER}
`

async function getPackageFiles(filter, relativePath) {
  try {
    const entries = await fs.readdir(pnpmDir, { withFileTypes: true })

    return entries
      .filter((entry) => entry.isDirectory() && filter(entry.name))
      .map((entry) => path.join(pnpmDir, entry.name, ...relativePath))
  } catch {
    return []
  }
}

async function patchFile({ filePath, marker, replacementSnippet, targetSnippet }) {
  let source

  try {
    source = await fs.readFile(filePath, 'utf8')
  } catch {
    return false
  }

  if (source.includes(marker)) {
    return false
  }

  if (!source.includes(targetSnippet)) {
    return false
  }

  await fs.writeFile(filePath, source.replace(targetSnippet, replacementSnippet), 'utf8')
  return true
}

const undiciFiles = await getPackageFiles(
  (name) => name.startsWith('undici@'),
  ['node_modules', 'undici', 'index.js'],
)
const payloadLoadEnvFiles = await getPackageFiles(
  (name) => name.startsWith('payload@'),
  ['node_modules', 'payload', 'dist', 'bin', 'loadEnv.js'],
)

const [undiciResults, payloadLoadEnvResults] = await Promise.all([
  Promise.all(
    undiciFiles.map((filePath) =>
      patchFile({
        filePath,
        marker: UNDICI_PATCH_MARKER,
        replacementSnippet: undiciReplacementSnippet,
        targetSnippet: undiciTargetSnippet,
      }),
    ),
  ),
  Promise.all(
    payloadLoadEnvFiles.map((filePath) =>
      patchFile({
        filePath,
        marker: PAYLOAD_ENV_PATCH_MARKER,
        replacementSnippet: payloadLoadEnvReplacementSnippet,
        targetSnippet: payloadLoadEnvTargetSnippet,
      }),
    ),
  ),
])

const undiciPatchedCount = undiciResults.filter(Boolean).length
const payloadLoadEnvPatchedCount = payloadLoadEnvResults.filter(Boolean).length

if (undiciPatchedCount > 0) {
  console.log(
    `[runtime-patch] Applied undici CacheStorage workaround to ${undiciPatchedCount} installation(s).`,
  )
}

if (payloadLoadEnvPatchedCount > 0) {
  console.log(
    `[runtime-patch] Applied Payload loadEnv interop workaround to ${payloadLoadEnvPatchedCount} installation(s).`,
  )
}
