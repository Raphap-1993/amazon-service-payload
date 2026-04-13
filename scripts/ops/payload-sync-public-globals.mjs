import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const appRoot = process.env.PAYLOAD_ROOT || process.cwd()
const sourceBaseURL = (process.env.SOURCE_BASE_URL || '').replace(/\/+$/, '')
const localBaseURL = (process.env.LOCAL_BASE_URL || 'http://127.0.0.1:3004').replace(/\/+$/, '')
const applyChanges = process.env.APPLY === 'true'
const globalSlugs = (process.env.GLOBAL_SLUGS ||
  'site-settings,header,footer,home-page,about-page,services-page,contact-page')
  .split(',')
  .map((slug) => slug.trim())
  .filter(Boolean)

if (!sourceBaseURL) {
  throw new Error('SOURCE_BASE_URL is required')
}

async function loadEnvFile(filePath) {
  let content

  try {
    content = await fs.readFile(filePath, 'utf8')
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return
    }

    throw error
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')

    if (separatorIndex < 0) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

await loadEnvFile(path.join(appRoot, '.env.local'))
await loadEnvFile(path.join(appRoot, '.env'))

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const outputDir = process.env.OUTPUT_DIR || path.join('/tmp', `amazon-service-payload-sync-${timestamp}`)

const payloadModule = await import(
  pathToFileURL(path.join(appRoot, 'node_modules/payload/dist/index.js')).href,
)
const configModule = await import(pathToFileURL(path.join(appRoot, 'payload.config.ts')).href)
const siteSettingsModule = await import(
  pathToFileURL(path.join(appRoot, 'src/globals/SiteSettings.ts')).href,
)
const headerModule = await import(pathToFileURL(path.join(appRoot, 'src/globals/Header.ts')).href)
const footerModule = await import(pathToFileURL(path.join(appRoot, 'src/globals/Footer.ts')).href)
const homePageModule = await import(pathToFileURL(path.join(appRoot, 'src/globals/HomePage.ts')).href)
const aboutPageModule = await import(pathToFileURL(path.join(appRoot, 'src/globals/AboutPage.ts')).href)
const servicesPageModule = await import(
  pathToFileURL(path.join(appRoot, 'src/globals/ServicesPage.ts')).href,
)
const contactPageModule = await import(
  pathToFileURL(path.join(appRoot, 'src/globals/ContactPage.ts')).href,
)

const { getPayload } = payloadModule
const config = configModule.default
const globalMap = new Map([
  ['site-settings', siteSettingsModule.SiteSettings],
  ['header', headerModule.Header],
  ['footer', footerModule.Footer],
  ['home-page', homePageModule.HomePage],
  ['about-page', aboutPageModule.AboutPage],
  ['services-page', servicesPageModule.ServicesPage],
  ['contact-page', contactPageModule.ContactPage],
])

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function relationID(value) {
  if (value == null) {
    return null
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (isObject(value) && 'id' in value) {
    return value.id ?? null
  }

  return null
}

function isMediaField(field) {
  if (field.type !== 'relationship' && field.type !== 'upload') {
    return false
  }

  if (Array.isArray(field.relationTo)) {
    return field.relationTo.includes('media')
  }

  return field.relationTo === 'media'
}

function sanitizeFields(fields, source) {
  const result = {}

  for (const field of fields || []) {
    const sanitized = sanitizeField(field, source)

    if (field.name) {
      if (sanitized !== undefined) {
        result[field.name] = sanitized
      }

      continue
    }

    if (isObject(sanitized)) {
      Object.assign(result, sanitized)
    }
  }

  return result
}

function sanitizeTabs(field, value) {
  const result = {}

  for (const tab of field.tabs || []) {
    const tabValue = tab.name ? value?.[tab.name] : value
    const sanitized = sanitizeFields(tab.fields || [], tabValue)

    if (tab.name) {
      if (Object.keys(sanitized).length > 0) {
        result[tab.name] = sanitized
      }

      continue
    }

    Object.assign(result, sanitized)
  }

  return result
}

function sanitizeArray(field, value) {
  if (!Array.isArray(value)) {
    return value == null ? undefined : []
  }

  if (field.type === 'blocks') {
    return value
      .map((item) => {
        if (!isObject(item) || typeof item.blockType !== 'string') {
          return undefined
        }

        const blockConfig = (field.blocks || []).find((block) => block.slug === item.blockType)

        if (!blockConfig) {
          return undefined
        }

        return {
          blockType: item.blockType,
          ...sanitizeFields(blockConfig.fields || [], item),
        }
      })
      .filter(Boolean)
  }

  return value.map((item) => sanitizeFields(field.fields || [], item))
}

function sanitizeField(field, source) {
  const value = field.name ? source?.[field.name] : source

  switch (field.type) {
    case 'array':
    case 'blocks':
      return sanitizeArray(field, value)
    case 'checkbox':
      return typeof value === 'boolean' ? value : value == null ? undefined : Boolean(value)
    case 'collapsible':
    case 'group':
      if (value == null) {
        return undefined
      }

      return sanitizeFields(field.fields || [], value)
    case 'json':
    case 'code':
      return value === undefined ? undefined : value
    case 'number':
      return typeof value === 'number' ? value : value == null || value === '' ? undefined : Number(value)
    case 'relationship':
    case 'upload':
      if (field.hasMany) {
        if (!Array.isArray(value)) {
          return value == null ? undefined : []
        }

        return value.map((item) => relationID(item)).filter((item) => item != null)
      }

      return relationID(value)
    case 'row':
      return sanitizeFields(field.fields || [], value)
    case 'tabs':
      return sanitizeTabs(field, value)
    default:
      return value === undefined ? undefined : value
  }
}

function trackMediaRef(value, refs) {
  if (!isObject(value)) {
    return
  }

  const id = relationID(value)

  if (id == null || refs.has(id)) {
    return
  }

  refs.set(id, {
    id,
    alt: typeof value.alt === 'string' ? value.alt : '',
    caption: typeof value.caption === 'string' ? value.caption : null,
    filename: typeof value.filename === 'string' ? value.filename : '',
    folder: typeof value.folder === 'string' ? value.folder : 'general',
    mimeType: typeof value.mimeType === 'string' ? value.mimeType : '',
    url: typeof value.url === 'string' ? value.url : '',
    visibility: typeof value.visibility === 'string' ? value.visibility : 'public',
  })
}

function collectMediaRefs(fields, source, refs) {
  for (const field of fields || []) {
    const value = field.name ? source?.[field.name] : source

    switch (field.type) {
      case 'array':
        if (Array.isArray(value)) {
          for (const item of value) {
            collectMediaRefs(field.fields || [], item, refs)
          }
        }
        break
      case 'blocks':
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!isObject(item) || typeof item.blockType !== 'string') {
              continue
            }

            const blockConfig = (field.blocks || []).find((block) => block.slug === item.blockType)

            if (blockConfig) {
              collectMediaRefs(blockConfig.fields || [], item, refs)
            }
          }
        }
        break
      case 'collapsible':
      case 'group':
      case 'row':
        if (value != null) {
          collectMediaRefs(field.fields || [], value, refs)
        }
        break
      case 'tabs':
        for (const tab of field.tabs || []) {
          const tabValue = tab.name ? value?.[tab.name] : value
          if (tabValue != null) {
            collectMediaRefs(tab.fields || [], tabValue, refs)
          }
        }
        break
      default:
        if (!isMediaField(field)) {
          break
        }

        if (field.hasMany) {
          if (Array.isArray(value)) {
            for (const item of value) {
              trackMediaRef(item, refs)
            }
          }
        } else {
          trackMediaRef(value, refs)
        }
    }
  }
}

function mapMediaIDs(fields, source, mediaIDMap) {
  const result = {}

  for (const field of fields || []) {
    const value = field.name ? source?.[field.name] : source

    if (!field.name) {
      if (field.type === 'tabs') {
        Object.assign(result, mapTabMediaIDs(field, value, mediaIDMap))
      } else if (field.fields) {
        Object.assign(result, mapMediaIDs(field.fields || [], value, mediaIDMap))
      }

      continue
    }

    switch (field.type) {
      case 'array':
        result[field.name] = Array.isArray(value)
          ? value.map((item) => mapMediaIDs(field.fields || [], item, mediaIDMap))
          : value
        break
      case 'blocks':
        result[field.name] = Array.isArray(value)
          ? value.map((item) => {
              if (!isObject(item) || typeof item.blockType !== 'string') {
                return item
              }

              const blockConfig = (field.blocks || []).find((block) => block.slug === item.blockType)

              if (!blockConfig) {
                return item
              }

              return {
                blockType: item.blockType,
                ...mapMediaIDs(blockConfig.fields || [], item, mediaIDMap),
              }
            })
          : value
        break
      case 'collapsible':
      case 'group':
      case 'row':
        result[field.name] = isObject(value) ? mapMediaIDs(field.fields || [], value, mediaIDMap) : value
        break
      case 'relationship':
      case 'upload':
        if (!isMediaField(field)) {
          result[field.name] = value
          break
        }

        if (field.hasMany) {
          result[field.name] = Array.isArray(value)
            ? value.map((item) => mediaIDMap.get(item) ?? item)
            : value
        } else {
          result[field.name] = mediaIDMap.get(value) ?? value
        }
        break
      case 'tabs':
        result[field.name] = mapTabMediaIDs(field, value, mediaIDMap)
        break
      default:
        result[field.name] = value
    }
  }

  return result
}

function mapTabMediaIDs(field, value, mediaIDMap) {
  const result = {}

  for (const tab of field.tabs || []) {
    const tabValue = tab.name ? value?.[tab.name] : value
    const mappedTabValue = mapMediaIDs(tab.fields || [], tabValue, mediaIDMap)

    if (tab.name) {
      result[tab.name] = mappedTabValue
    } else {
      Object.assign(result, mappedTabValue)
    }
  }

  return result
}

function equivalent(left, right) {
  if (left == null && right == null) {
    return true
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
      return false
    }

    return left.every((item, index) => equivalent(item, right[index]))
  }

  if (isObject(left) || isObject(right)) {
    if (!isObject(left) || !isObject(right)) {
      return false
    }

    const keys = new Set([...Object.keys(left), ...Object.keys(right)])

    for (const key of keys) {
      if (!equivalent(left[key], right[key])) {
        return false
      }
    }

    return true
  }

  return left === right
}

function collectDiffs(left, right, currentPath = '', diffs = []) {
  if (equivalent(left, right)) {
    return diffs
  }

  if (left == null || right == null) {
    diffs.push({
      path: currentPath || '(root)',
      local: left,
      source: right,
    })

    return diffs
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) {
      diffs.push({
        path: currentPath || '(root)',
        local: left,
        source: right,
      })

      return diffs
    }

    const maxLength = Math.max(left.length, right.length)

    for (let index = 0; index < maxLength; index += 1) {
      collectDiffs(left[index], right[index], `${currentPath}[${index}]`, diffs)
    }

    return diffs
  }

  if (isObject(left) || isObject(right)) {
    if (!isObject(left) || !isObject(right)) {
      diffs.push({
        path: currentPath || '(root)',
        local: left,
        source: right,
      })

      return diffs
    }

    const keys = new Set([...Object.keys(left), ...Object.keys(right)])

    for (const key of keys) {
      collectDiffs(left[key], right[key], currentPath ? `${currentPath}.${key}` : key, diffs)
    }

    return diffs
  }

  diffs.push({
    path: currentPath || '(root)',
    local: left,
    source: right,
  })

  return diffs
}

async function fetchGlobal(baseURL, slug) {
  const response = await fetch(`${baseURL}/api/globals/${slug}?depth=2`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${slug} from ${baseURL}: ${response.status}`)
  }

  return response.json()
}

async function writeJSON(fileName, data) {
  await fs.writeFile(path.join(outputDir, fileName), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

async function downloadFile(url, fileName) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download media file ${url}: ${response.status}`)
  }

  const targetPath = path.join(outputDir, 'downloads', fileName)

  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, Buffer.from(await response.arrayBuffer()))

  return targetPath
}

async function ensureMediaRefs(payload, mediaRefs) {
  const mediaIDMap = new Map()

  for (const ref of mediaRefs.values()) {
    const localByID = await payload.findByID({
      collection: 'media',
      id: ref.id,
      depth: 0,
      disableErrors: true,
      overrideAccess: true,
    })

    if (localByID?.id && (!ref.filename || localByID.filename === ref.filename)) {
      mediaIDMap.set(ref.id, localByID.id)
      continue
    }

    const localByFilename = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        filename: {
          equals: ref.filename,
        },
      },
    })

    if (localByFilename.docs[0]?.id) {
      mediaIDMap.set(ref.id, localByFilename.docs[0].id)
      continue
    }

    const fileURL = new URL(ref.url, sourceBaseURL).toString()
    const filePath = await downloadFile(fileURL, ref.filename || `media-${ref.id}`)
    const created = await payload.create({
      collection: 'media',
      data: {
        alt: ref.alt || ref.filename || `Imported media ${ref.id}`,
        caption: ref.caption,
        folder: ref.folder || 'general',
        visibility: ref.visibility || 'public',
      },
      filePath,
      overrideAccess: true,
    })

    mediaIDMap.set(ref.id, created.id)
  }

  return mediaIDMap
}

await fs.mkdir(outputDir, { recursive: true })

const localBefore = {}
const sourceData = {}
const sourceRawData = {}
const diffSummary = []
const mediaRefs = new Map()

for (const slug of globalSlugs) {
  const globalConfig = globalMap.get(slug)

  if (!globalConfig) {
    throw new Error(`Global config not found for slug "${slug}"`)
  }

  const [localRaw, sourceRaw] = await Promise.all([
    fetchGlobal(localBaseURL, slug),
    fetchGlobal(sourceBaseURL, slug),
  ])

  sourceRawData[slug] = sourceRaw
  const localSanitized = sanitizeFields(globalConfig.fields || [], localRaw)
  const sourceSanitized = sanitizeFields(globalConfig.fields || [], sourceRaw)
  const diffs = collectDiffs(localSanitized, sourceSanitized).slice(0, 20)

  collectMediaRefs(globalConfig.fields || [], sourceRaw, mediaRefs)

  localBefore[slug] = localSanitized
  sourceData[slug] = sourceSanitized
  diffSummary.push({
    slug,
    matches: equivalent(localSanitized, sourceSanitized),
    diffCount: diffs.length,
    sampleDiffs: diffs,
  })
}

await writeJSON('local-before.json', localBefore)
await writeJSON('source.json', sourceData)
await writeJSON('source-raw.json', sourceRawData)
await writeJSON('diff-before.json', diffSummary)
await writeJSON('media-refs.json', Array.from(mediaRefs.values()))

console.log(
  JSON.stringify({
    step: 'payload-sync:prepared',
    outputDir,
    applyChanges,
    sourceBaseURL,
    localBaseURL,
    globalSlugs,
    diffSummary: diffSummary.map(({ slug, matches, diffCount }) => ({ slug, matches, diffCount })),
  }),
)

if (applyChanges) {
  const payload = await getPayload({ config, disableOnInit: true })

  try {
    const mediaIDMap = await ensureMediaRefs(payload, mediaRefs)
    await writeJSON('media-id-map.json', Object.fromEntries(mediaIDMap))

    for (const slug of globalSlugs) {
      const currentSummary = diffSummary.find((item) => item.slug === slug)

      if (!currentSummary || currentSummary.matches) {
        continue
      }

      await payload.updateGlobal({
        slug,
        data: mapMediaIDs(globalMap.get(slug).fields || [], sourceData[slug], mediaIDMap),
        depth: 0,
        overrideAccess: true,
      })
    }
  } finally {
    await payload.destroy()
  }

  const localAfter = {}
  const afterSummary = []

  for (const slug of globalSlugs) {
    const globalConfig = globalMap.get(slug)
    const [localRaw, sourceRaw] = await Promise.all([
      fetchGlobal(localBaseURL, slug),
      fetchGlobal(sourceBaseURL, slug),
    ])

    const localSanitized = sanitizeFields(globalConfig.fields || [], localRaw)
    const sourceSanitized = sanitizeFields(globalConfig.fields || [], sourceRaw)
    const diffs = collectDiffs(localSanitized, sourceSanitized).slice(0, 20)

    localAfter[slug] = localSanitized
    afterSummary.push({
      slug,
      matches: equivalent(localSanitized, sourceSanitized),
      diffCount: diffs.length,
      sampleDiffs: diffs,
    })
  }

  await writeJSON('local-after.json', localAfter)
  await writeJSON('diff-after.json', afterSummary)

  console.log(
    JSON.stringify({
      step: 'payload-sync:applied',
      outputDir,
      diffSummary: afterSummary.map(({ slug, matches, diffCount }) => ({ slug, matches, diffCount })),
    }),
  )
}
