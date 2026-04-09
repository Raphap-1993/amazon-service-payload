import type { Access } from 'payload'

type SupportedRole = 'superadmin' | 'admin' | 'editor'

function getUserRole(user: unknown): SupportedRole | null {
  if (!user || typeof user !== 'object' || !('role' in user)) {
    return null
  }

  const role = user.role

  if (role === 'superadmin' || role === 'admin' || role === 'editor') {
    return role
  }

  return null
}

export function userHasRole(user: unknown, roles: SupportedRole[]): boolean {
  const role = getUserRole(user)

  return role ? roles.includes(role) : false
}

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)
export const isEditorOrAbove: Access = ({ req: { user } }) =>
  userHasRole(user, ['superadmin', 'admin', 'editor'])
export const isAdminOrSuperAdmin: Access = ({ req: { user } }) =>
  userHasRole(user, ['superadmin', 'admin'])
export const isSuperAdmin: Access = ({ req: { user } }) => userHasRole(user, ['superadmin'])
export const isEditorOrAdmin: Access = ({ req: { user } }) =>
  userHasRole(user, ['admin', 'editor'])
export const isAdminOnly: Access = ({ req: { user } }) => userHasRole(user, ['admin'])
export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    published: {
      equals: true,
    },
  }
}

export const publicMediaRead: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    visibility: {
      equals: 'public',
    },
  }
}

export const publicSpecialModuleRead: Access = ({ req: { user } }) => {
  if (userHasRole(user, ['superadmin', 'admin'])) {
    return true
  }

  return {
    isPublic: {
      equals: true,
    },
  }
}
