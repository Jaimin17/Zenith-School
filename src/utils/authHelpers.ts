/**
 * Authentication helper utilities
 * Common functions used across auth-related code
 * Now includes both client and server-side utilities
 */

import { getAuthTokens, clearAuthTokens, getServerCookie, getServerAuthTokens, clearServerAuthTokens } from './cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, LOGGED_IN_USER_DATA } from '../constants/appConstants'
import type { cookies } from 'next/headers'
import type { TokenResponse, Tokens } from '../types/auth'

type CookieStore = Awaited<ReturnType<typeof cookies>>

/**
 * CLIENT-SIDE HELPERS
 */

/**
 * Gets the access token from cookies or localStorage (client-side)
 * @returns Access token or null
 */
export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null

    const { accessToken } = getAuthTokens()
    const localToken = localStorage.getItem(ACCESS_TOKEN)

    return accessToken || localToken || null
}

/**
 * Gets the refresh token from cookies or localStorage (client-side)
 * @returns Refresh token or null
 */
export const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null

    const { refreshToken } = getAuthTokens()
    const localToken = localStorage.getItem(REFRESH_TOKEN)

    return refreshToken || localToken || null
}

/**
 * Clears all authentication data (client-side)
 * Removes tokens and user data from cookies and localStorage
 */
export const clearAllAuthData = (): void => {
    if (typeof window !== 'undefined') {
        // Clear localStorage
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        localStorage.removeItem(LOGGED_IN_USER_DATA)
        localStorage.removeItem('USER')
        localStorage.removeItem('ROLE')
    }

    // Clear cookies
    clearAuthTokens()
}

/**
 * SERVER-SIDE HELPERS
 */

/**
 * Gets the access token from server-side cookies
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns Access token or null
 */
export const getServerAccessToken = (cookieStore: CookieStore): string | null => {
    const { accessToken } = getServerAuthTokens(cookieStore)
    return accessToken || null
}

/**
 * Gets the refresh token from server-side cookies
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns Refresh token or null
 */
export const getServerRefreshToken = (cookieStore: CookieStore): string | null => {
    const { refreshToken } = getServerAuthTokens(cookieStore)
    return refreshToken || null
}

/**
 * Gets user role from server-side cookies
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns User role or null
 */
export const getServerUserRole = (cookieStore: CookieStore): string | null => {
    return getServerCookie(cookieStore, 'ROLE') || null
}

/**
 * Gets user data from server-side cookies
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns Parsed user data or null
 */
export const getServerUserData = (cookieStore: CookieStore): any | null => {
    const userData = getServerCookie(cookieStore, 'USER') || getServerCookie(cookieStore, LOGGED_IN_USER_DATA)

    if (!userData) return null

    try {
        return JSON.parse(userData)
    } catch (error) {
        console.error('Error parsing user data from cookie:', error)
        return null
    }
}

/**
 * Checks if user is authenticated on server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 * @returns True if authenticated, false otherwise
 */
export const isServerAuthenticated = (cookieStore: CookieStore): boolean => {
    const accessToken = getServerAccessToken(cookieStore)
    return !!accessToken
}

/**
 * Checks if user has specific role on server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 * @param allowedRoles - Array of allowed roles or single role
 * @returns True if user has one of the allowed roles
 */
export const hasServerRole = (
    cookieStore: CookieStore,
    allowedRoles: string | string[]
): boolean => {
    const userRole = getServerUserRole(cookieStore)

    if (!userRole) return false

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    return roles.includes(userRole)
}

/**
 * Clears all authentication data on server-side
 * @param cookieStore - Cookie store from Next.js cookies()
 */
export const clearServerAuthData = (cookieStore: CookieStore): void => {
    clearServerAuthTokens(cookieStore)

    // Also clear user-related cookies
    try {
        cookieStore.delete('USER')
        cookieStore.delete('ROLE')
        cookieStore.delete(LOGGED_IN_USER_DATA)
    } catch (error) {
        console.error('Error clearing server auth data:', error)
    }
}

/**
 * UNIVERSAL HELPERS
 */

/**
 * Extracts tokens from API response
 * Handles multiple response formats:
 * 1. Nested format: { data: { tokens: { accessToken, refreshToken } } }
 * 2. Direct data format: { data: { access_token, refresh_token } }
 * 3. Flat format: { access, refresh } or { access_token, refresh_token }
 */
export const extractTokens = (data: TokenResponse | any): Tokens | null => {
    // Handle nested structure: data.data.tokens
    if (data?.data?.tokens) {
        const { accessToken, refreshToken } = data.data.tokens

        if (accessToken && refreshToken) {
            return { accessToken, refreshToken }
        }
    }

    // Handle data structure: data.data with snake_case
    if (data?.data?.access_token && data?.data?.refresh_token) {
        return {
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token
        }
    }

    // Handle flat structure: access/refresh or access_token/refresh_token
    const accessToken = data?.access || data?.access_token || data?.accessToken
    const refreshToken = data?.refresh || data?.refresh_token || data?.refreshToken

    if (accessToken && refreshToken) {
        return { accessToken, refreshToken }
    }

    return null
}

/**
 * Validates token format (basic check)
 * @param token - Token to validate
 * @returns True if token looks valid
 */
export const isValidTokenFormat = (token: string | null | undefined): boolean => {
    if (!token) return false

    // Basic validation: token should be a non-empty string
    // You can add more sophisticated validation (e.g., JWT format check)
    return typeof token === 'string' && token.length > 0
}

/**
 * Checks if token is expired (for JWT tokens)
 * @param token - JWT token to check
 * @returns True if token is expired or invalid
 */
export const isTokenExpired = (token: string | null | undefined): boolean => {
    if (!token) return true

    try {
        // Parse JWT token (format: header.payload.signature)
        const parts = token.split('.')
        if (parts.length !== 3) return true

        // Decode payload (base64)
        const payload = JSON.parse(atob(parts[1]))

        // Check expiration (exp is in seconds, Date.now() is in milliseconds)
        if (!payload.exp) return false // No expiration claim

        return payload.exp * 1000 < Date.now()
    } catch (error) {
        // If parsing fails, consider token invalid/expired
        return true
    }
}