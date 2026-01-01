/**
 * Cookie utility functions following Next.js best practices
 * - Server-side: Uses Next.js cookies() from 'next/headers'
 * - Client-side: Uses js-cookie library
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies
 */

import type { cookies } from 'next/headers'

// Client-side cookie library (only imported when needed)
import Cookies from 'js-cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/appConstants'

/**
 * Type alias for Next.js cookie store
 */
type CookieStore = Awaited<ReturnType<typeof cookies>>

/**
 * Default cookie options for consistent cookie settings
 */
const defaultOptions = {
  path: '/', // Make cookies available for all paths
  sameSite: 'lax' as const, // Provides CSRF protection
  secure: process.env.NODE_ENV === 'production', // Secure in production
  expires: 7 // 7 days default (js-cookie uses days, not seconds)
}

/**
 * Server-side cookie utilities
 * Use these in Server Actions, Route Handlers, Server Components, and API Routes
 *
 * @example
 * ```typescript
 * // In a Server Action or Route Handler
 * import { getServerCookie, setServerCookie } from '@/utils/cookies'
 * import { cookies } from 'next/headers'
 *
 * export async function serverAction() {
 *   const cookieStore = await cookies()
 *   const token = getServerCookie(cookieStore, 'access_token')
 * }
 * ```
 */

/**
 * Gets a cookie value from server-side cookie store
 * @param cookieStore - Cookie store from Next.js cookies()
 * @param key - Cookie key name
 * @returns Cookie value or undefined
 */
export const getServerCookie = (cookieStore: CookieStore, key: string): string | undefined => {
  return cookieStore.get(key)?.value
}

/**
 * Sets a cookie value in server-side cookie store
 * @param cookieStore - Cookie store from Next.js cookies()
 * @param key - Cookie key name
 * @param value - Cookie value
 * @param options - Optional cookie options
 */
export const setServerCookie = (
  cookieStore: CookieStore,
  key: string,
  value: string,
  options?: {
    path?: string
    sameSite?: 'strict' | 'lax' | 'none'
    secure?: boolean
    maxAge?: number
    expires?: Date
    httpOnly?: boolean
  }
): void => {
  cookieStore.set(key, value, {
    path: options?.path || defaultOptions.path,
    sameSite: options?.sameSite || defaultOptions.sameSite,
    secure: options?.secure ?? defaultOptions.secure,
    maxAge: options?.maxAge || 60 * 60 * 24 * 7, // 7 days in seconds
    expires: options?.expires,
    httpOnly: options?.httpOnly
  })
}

/**
 * Deletes a cookie from server-side cookie store
 * @param cookieStore - Cookie store from Next.js cookies()
 * @param key - Cookie key name
 */
export const deleteServerCookie = (cookieStore: CookieStore, key: string): void => {
  cookieStore.delete(key)
}

/**
 * Client-side cookie utilities
 * Use these in Client Components, hooks, and browser-only code
 *
 * @example
 * ```typescript
 * // In a Client Component
 * 'use client'
 * import { getClientCookie, setClientCookie } from '@/utils/cookies'
 *
 * export function MyComponent() {
 *   const token = getClientCookie('access_token')
 *   setClientCookie('access_token', 'new-token')
 * }
 * ```
 */

/**
 * Gets a cookie value on the client-side
 * @param key - Cookie key name
 * @returns Cookie value or undefined
 */
export const getClientCookie = (key: string): string | undefined => {
  if (typeof window === 'undefined') {
    console.warn('getClientCookie called on server-side. Use getServerCookie instead.')

    return undefined
  }

  return Cookies.get(key)
}

/**
 * Sets a cookie value on the client-side
 * @param key - Cookie key name
 * @param value - Cookie value
 * @param options - Optional cookie options
 */
export const setClientCookie = (
  key: string,
  value: string,
  options?: {
    path?: string
    sameSite?: 'strict' | 'lax' | 'none'
    secure?: boolean
    expires?: number // Days for js-cookie
  }
): void => {
  if (typeof window === 'undefined') {
    console.warn('setClientCookie called on server-side. Use setServerCookie instead.')

    return
  }

  Cookies.set(key, value, {
    path: options?.path || defaultOptions.path,
    sameSite: options?.sameSite || defaultOptions.sameSite,
    secure: options?.secure ?? defaultOptions.secure,
    expires: options?.expires || defaultOptions.expires
  })
}

/**
 * Deletes a cookie on the client-side
 * @param key - Cookie key name
 * @param options - Optional cookie options (path, domain, etc.)
 */
export const deleteClientCookie = (
  key: string,
  options?: {
    path?: string
    domain?: string
  }
): void => {
  if (typeof window === 'undefined') {
    console.warn('deleteClientCookie called on server-side. Use deleteServerCookie instead.')

    return
  }

  Cookies.remove(key, {
    path: options?.path || defaultOptions.path,
    domain: options?.domain
  })
}

/**
 * Universal cookie utilities (auto-detects environment)
 * Use these when you need code that works in both server and client contexts
 * Note: These prioritize client-side usage and fall back to localStorage on server
 *
 * @example
 * ```typescript
 * // Works in both server and client
 * import { getCookieValue, createCookie } from '@/utils/cookies'
 *
 * const token = getCookieValue('access_token')
 * createCookie('access_token', 'new-token')
 * ```
 */

/**
 * Gets a cookie value (client-side) or falls back to localStorage
 * @param key - Cookie key name
 * @returns Cookie value, localStorage value, or undefined
 */
export const getCookieValue = (key: string): string | undefined => {
  if (typeof window === 'undefined') {
    // Server-side: return undefined (use getServerCookie in server actions)

    return undefined
  }

  // Try cookie first, then localStorage as fallback

  return getClientCookie(key) || localStorage.getItem(key) || undefined
}

/**
 * Creates/sets a cookie on client-side, also stores in localStorage as backup
 * @param key - Cookie key name
 * @param value - Cookie value
 * @param options - Optional cookie options
 */
export const createCookie = (
  key: string,
  value: string,
  options?: {
    path?: string
    sameSite?: 'strict' | 'lax' | 'none'
    secure?: boolean
    expires?: number
  }
): void => {
  if (typeof window === 'undefined') {
    console.warn('createCookie called on server-side. Use setServerCookie instead.')

    return
  }

  // Set cookie
  setClientCookie(key, value, options)

  // Also store in localStorage as backup
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error('Failed to store in localStorage:', error)
  }
}

/**
 * Clears/deletes a cookie on client-side, also removes from localStorage
 * @param key - Cookie key name
 * @param options - Optional cookie options
 */
export const clearCookie = (
  key: string,
  options?: {
    path?: string
    domain?: string
  }
): void => {
  if (typeof window === 'undefined') {
    console.warn('clearCookie called on server-side. Use deleteServerCookie instead.')

    return
  }

  // Delete cookie
  deleteClientCookie(key, options)

  // Also remove from localStorage
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

/**
 * Authentication token utilities
 * These work with both cookies and localStorage for maximum compatibility
 */

/**
 * Sets authentication tokens (both access and refresh)
 * Stores in both cookies and localStorage
 * @param accessToken - Access token value
 * @param refreshToken - Refresh token value
 */
export const setAuthTokens = (accessToken: string, refreshToken: string): void => {
  createCookie(ACCESS_TOKEN, accessToken)
  createCookie(REFRESH_TOKEN, refreshToken)
}

/**
 * Sets authentication tokens on the server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 * @param accessToken - Access token value
 * @param refreshToken - Refresh token value
 */
export const setServerAuthTokens = (cookieStore: CookieStore, accessToken: string, refreshToken: string): void => {
  setServerCookie(cookieStore, ACCESS_TOKEN, accessToken)
  setServerCookie(cookieStore, REFRESH_TOKEN, refreshToken)
}

/**
 * Clears authentication tokens
 * Removes from both cookies and localStorage
 */
export const clearAuthTokens = (): void => {
  clearCookie(ACCESS_TOKEN)
  clearCookie(REFRESH_TOKEN)
}

/**
 * Clears authentication tokens on the server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 */
export const clearServerAuthTokens = (cookieStore: CookieStore): void => {
  deleteServerCookie(cookieStore, ACCESS_TOKEN)
  deleteServerCookie(cookieStore, REFRESH_TOKEN)
}

/**
 * Gets authentication tokens
 * Returns both access and refresh tokens
 * @returns Object with accessToken and refreshToken
 */
export const getAuthTokens = (): {
  accessToken: string | undefined
  refreshToken: string | undefined
} => {
  return {
    accessToken: getCookieValue(ACCESS_TOKEN),
    refreshToken: getCookieValue(REFRESH_TOKEN)
  }
}

/**
 * Gets authentication tokens from server-side cookie store
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns Object with accessToken and refreshToken
 */
export const getServerAuthTokens = (
  cookieStore: CookieStore
): {
  accessToken: string | undefined
  refreshToken: string | undefined
} => {
  return {
    accessToken: getServerCookie(cookieStore, ACCESS_TOKEN),
    refreshToken: getServerCookie(cookieStore, REFRESH_TOKEN)
  }
}

/**
 * Checks if user is authenticated (has a valid access token)
 * @returns True if access token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return !!getCookieValue(ACCESS_TOKEN)
}

/**
 * Checks if user is authenticated on the server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns True if access token exists, false otherwise
 */
export const isServerAuthenticated = (cookieStore: CookieStore): boolean => {
  return !!getServerCookie(cookieStore, ACCESS_TOKEN)
}