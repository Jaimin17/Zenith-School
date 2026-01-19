/**
 * Server-Side Authentication Utilities
 * Use these in Server Components, Server Actions, and Route Handlers
 * 
 * Place this file at: src/lib/auth/serverAuth.ts
 */

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
    getServerAuthTokens,
    getServerCookie,
    isServerAuthenticated
} from '@/utils/cookie'
import { USER_ROLES } from '@/constants/appConstants'

/**
 * Server-side auth context type
 */
export interface ServerAuthContext {
    isAuthenticated: boolean
    accessToken: string | null
    refreshToken: string | null
    role: string | null
    userId: string | null
    userData: any | null
}

/**
 * Gets complete authentication context on server-side
 * @returns Server auth context with all user data
 */
export async function getServerAuth(): Promise<ServerAuthContext> {
    const cookieStore = await cookies()
    const tokens = getServerAuthTokens(cookieStore)
    const role = getServerCookie(cookieStore, 'ROLE')
    const userDataStr = getServerCookie(cookieStore, 'USER')

    let userData = null
    let userId = null

    if (userDataStr) {
        try {
            userData = JSON.parse(userDataStr)
            userId = userData?.id || null
        } catch (error) {
            console.error('Error parsing user data:', error)
        }
    }

    return {
        isAuthenticated: isServerAuthenticated(cookieStore),
        accessToken: tokens.accessToken || null,
        refreshToken: tokens.refreshToken || null,
        role: role || null,
        userId,
        userData
    }
}

/**
 * Requires authentication - redirects to login if not authenticated
 * Use this at the top of server components that require auth
 * 
 * @param redirectTo - Optional custom redirect path after login
 * @returns Server auth context
 * 
 * @example
 * ```typescript
 * export default async function ProtectedPage() {
 *   const auth = await requireAuth()
 *   // User is authenticated, proceed with page logic
 * }
 * ```
 */
export async function requireAuth(redirectTo?: string): Promise<ServerAuthContext> {
    const auth = await getServerAuth()

    if (!auth.isAuthenticated) {
        const loginUrl = redirectTo
            ? `/login?from=${encodeURIComponent(redirectTo)}`
            : '/login'
        redirect(loginUrl)
    }

    return auth
}

/**
 * Requires specific role(s) - redirects if user doesn't have required role
 * 
 * @param allowedRoles - Single role or array of allowed roles
 * @param redirectTo - Optional custom redirect path for unauthorized access
 * @returns Server auth context
 * 
 * @example
 * ```typescript
 * export default async function AdminPage() {
 *   const auth = await requireRole('admin')
 *   // User is admin, proceed with page logic
 * }
 * ```
 */
export async function requireRole(
    allowedRoles: string | string[],
    redirectTo?: string
): Promise<ServerAuthContext> {
    const auth = await requireAuth()

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    if (!auth.role || !roles.includes(auth.role)) {
        // Redirect to unauthorized page or user's default page
        const defaultPath = getDefaultPathForRole(auth.role)
        redirect(redirectTo || defaultPath || '/unauthorized')
    }

    return auth
}

/**
 * Requires admin role - convenience wrapper around requireRole
 * 
 * @example
 * ```typescript
 * export default async function AdminDashboard() {
 *   const auth = await requireAdmin()
 *   // User is admin
 * }
 * ```
 */
export async function requireAdmin(): Promise<ServerAuthContext> {
    return requireRole(USER_ROLES.ADMIN)
}

/**
 * Checks if user has specific role without redirecting
 * 
 * @param allowedRoles - Single role or array of allowed roles
 * @returns True if user has one of the allowed roles
 */
export async function hasRole(allowedRoles: string | string[]): Promise<boolean> {
    const auth = await getServerAuth()

    if (!auth.isAuthenticated || !auth.role) return false

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    return roles.includes(auth.role)
}

/**
 * Gets default redirect path based on user role
 */
function getDefaultPathForRole(role: string | null): string {
    switch (role) {
        case USER_ROLES.ADMIN:
            return '/admin'
        case USER_ROLES.TEACHER:
            return '/teacher'
        case USER_ROLES.PARENT:
            return '/parent'
        case USER_ROLES.STUDENT:
            return '/student'
        default:
            return '/'
    }
}

/**
 * Utility to get user ID from server-side auth
 * @returns User ID or null
 */
export async function getUserId(): Promise<string | null> {
    const auth = await getServerAuth()
    return auth.userId
}

/**
 * Utility to get user role from server-side auth
 * @returns User role or null
 */
export async function getUserRole(): Promise<string | null> {
    const auth = await getServerAuth()
    return auth.role
}

/**
 * Utility to get full user data from server-side auth
 * @returns User data object or null
 */
export async function getUserData(): Promise<any | null> {
    const auth = await getServerAuth()
    return auth.userData
}

/**
 * Type guard for checking admin role
 */
export async function isAdmin(): Promise<boolean> {
    return hasRole(USER_ROLES.ADMIN)
}

/**
 * Type guard for checking teacher role
 */
export async function isTeacher(): Promise<boolean> {
    return hasRole(USER_ROLES.TEACHER)
}

/**
 * Type guard for checking parent role
 */
export async function isParent(): Promise<boolean> {
    return hasRole(USER_ROLES.PARENT)
}

/**
 * Type guard for checking student role
 */
export async function isStudent(): Promise<boolean> {
    return hasRole(USER_ROLES.STUDENT)
}