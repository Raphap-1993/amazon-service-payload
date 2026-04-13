import path from 'node:path'
import { pathToFileURL } from 'node:url'

const appRoot = process.env.PAYLOAD_ROOT || process.cwd()
const userID = process.env.USER_ID
const userEmail = process.env.USER_EMAIL
const newPassword = process.env.NEW_PASSWORD

if (!newPassword) {
  throw new Error('NEW_PASSWORD is required')
}

if (!userID && !userEmail) {
  throw new Error('USER_ID or USER_EMAIL is required')
}

const payloadModule = await import(
  pathToFileURL(path.join(appRoot, 'node_modules/payload/dist/index.js')).href,
)
const configModule = await import(pathToFileURL(path.join(appRoot, 'payload.config.ts')).href)

const { getPayload } = payloadModule
const config = configModule.default

console.log(
  JSON.stringify({
    step: 'reset-user:start',
    appRoot,
    userID: userID || null,
    userEmail: userEmail || null,
    timestamp: new Date().toISOString(),
  }),
)

const payload = await getPayload({ config, disableOnInit: true })

let targetID = userID

if (!targetID) {
  const result = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      email: {
        equals: userEmail,
      },
    },
  })

  targetID = result.docs[0]?.id
}

if (!targetID) {
  throw new Error('Target user not found')
}

const updated = await payload.update({
  collection: 'users',
  id: targetID,
  overrideAccess: true,
  depth: 0,
  data: {
    password: newPassword,
    loginAttempts: 0,
    lockUntil: null,
    resetPasswordToken: null,
    resetPasswordExpiration: null,
  },
})

const loginResult = await payload.login({
  collection: 'users',
  data: {
    email: updated.email,
    password: newPassword,
  },
})

await payload.destroy()

console.log(
  JSON.stringify({
    step: 'reset-user:done',
    userID: updated.id,
    email: updated.email,
    loginValidated: Boolean(loginResult.token),
    timestamp: new Date().toISOString(),
  }),
)
