/**
 * Authentication helper utilities
 * Common functions used across auth-related code
 */

import { getAuthTokens, clearAuthTokens } from './cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/appConstants'
import type { TokenResponse, Tokens } from '@/types/auth'

/**
 * Gets the access token from cookies or localStorage
 * @returns Access token or null
 */
export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null

    const { accessToken } = getAuthTokens()
    const localToken = localStorage.getItem(ACCESS_TOKEN)

    return accessToken || localToken || null
}

/**
 * Clears all authentication data
 */
export const clearAllAuthData = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
    }

    clearAuthTokens()
}

/**
 * Extracts tokens from API response
 * Handles multiple response formats:
 * 1. Nested format: { data: { tokens: { accessToken, refreshToken } } }
 * 2. Flat format: { access, refresh } or { access_token, refresh_token }
 */
export const extractTokens = (data: TokenResponse | any): Tokens | null => {
    // Handle nested structure: data.data.tokens
    if (data?.data?.tokens) {
        const { accessToken, refreshToken } = data.data.tokens

        if (accessToken && refreshToken) {
            return { accessToken, refreshToken }
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
