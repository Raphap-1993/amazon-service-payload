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

function hasRole(user: unknown, roles: SupportedRole[]): boolean {
  const role = getUserRole(user)

  return role ? roles.includes(role) : false
}

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)
export const isEditorOrAbove: Access = ({ req }) => hasRole(req.user, ['superadmin', 'admin', 'editor'])
export const isAdminOrSuperAdmin: Access = ({ req }) => hasRole(req.user, ['superadmin', 'admin'])
export const isSuperAdmin: Access = ({ req }) => hasRole(req.user, ['superadmin'])
export const isEditorOrAdmin: Access = ({ req }) => hasRole(req.user, ['admin', 'editor'])
export const isAdminOnly: Access = ({ req }) => hasRole(req.user, ['admin'])
export const publicRead: Access = () => true
