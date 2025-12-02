'use client'

// React Imports
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// API Imports
import { api } from '@/api/api'
import { LOGIN_API, REGISTER_API, GET_PROFILE_DETAILS, LOGOUT_API } from '@/api/apiParams/auth'

// Utils Imports
import { setAuthTokens, createCookie } from '@/utils/cookie'
import { clearAllAuthData, getAccessToken, extractTokens } from '@/utils/authHelpers'
import { ENGLO_USER, ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/appConstants'

// Type Imports
import type { User, LoginResponse, AuthContextType } from '@/types/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    try {
      const response = await api<User | LoginResponse>({
        endpoint: GET_PROFILE_DETAILS,
        payloadData: {}
      })

      if (!response?.error && response?.data) {
        const userData = (response.data?.data as User) || null

        if (userData) {
          setUser(userData as User)
          createCookie(ENGLO_USER, JSON.stringify(userData), { path: '/' })

          return userData as User
        }
      }

      throw new Error('Failed to fetch user data')
    } catch (error) {
      console.error('Error fetching user:', error)
      clearAllAuthData()
      setUser(null)

      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken()

      if (token) {
        await fetchUser()
      } else {
        setLoading(false)
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout-event' || (e.key === 'access_token' && e.newValue === null)) {
        setUser(null)
        clearAllAuthData()
      }
    }

    const handleLogoutEvent = () => {
      setUser(null)
      clearAllAuthData()
    }

    initAuth()

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('logout', handleLogoutEvent)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('logout', handleLogoutEvent)
      }
    }
  }, [fetchUser])

  // Login function (legacy - kept for backward compatibility)
  const login = useCallback(async (email: string, password: string): Promise<boolean | object> => {
    try {
      setLoading(true)

      const response = await api({
        endpoint: LOGIN_API,
        payloadData: { email, password }
      })

      if (!response?.error && response?.data) {
        const tokens = extractTokens(response.data)

        if (!tokens) {
          throw new Error('Invalid response format: missing tokens')
        }

        const userData = response.data
        console.log('UserData', userData)

        if (userData) {
          setUser(userData as User)
          createCookie("TOKEN", JSON.stringify(userData), { path: '/' })
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
          localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
        }

        setAuthTokens(tokens.accessToken, tokens.refreshToken)

        return response.status === 200
      }

      return false
    } catch (error) {
      console.error('Login failed:', error)

      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Register function
  const register = useCallback(
    async (email: string, password: string, full_name: string, phone_number: string): Promise<boolean> => {
      try {
        setLoading(true)

        const response = await api({
          endpoint: REGISTER_API,
          payloadData: { email, password, full_name, phone_number }
        })

        if (!response?.error && response?.data) {
          // Check if registration response includes tokens (auto-login)
          const tokens = extractTokens(response.data)
          const userData = response.data

          if (tokens && userData) {
            // Auto-login after registration
            if (userData) {
              setUser(userData as User)
              createCookie(ENGLO_USER, JSON.stringify(userData), { path: '/' })
            }

            if (typeof window !== 'undefined') {
              localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
              localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
            }

            setAuthTokens(tokens.accessToken, tokens.refreshToken)

            return response.status === 200 || response.status === 201
          }

          return response.status === 200 || response.status === 201
        }

        return false
      } catch (error) {
        console.error('Registration failed:', error)

        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api({
        endpoint: LOGOUT_API,
        payloadData: {}
      })
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      clearAllAuthData()
      setUser(null)

      if (typeof window !== 'undefined') {
        localStorage.clear()
        localStorage.setItem('logout-event', Date.now().toString())
        localStorage.removeItem('logout-event')
      }

      router.push('/login')
    }
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        fetchUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}