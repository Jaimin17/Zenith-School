'use client'

// React Imports
import { createContext, useState, useEffect, useCallback, useRef, useContext } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// API Imports
import { api } from '../api/api'






// Type Imports
import { createCookie, getAuthTokens, getClientCookie, setAuthTokens } from '../utils/cookie'

// import type { Locale } from '@/configs/'
import { LOGED_IN_USER_DATA, USER_ROLES } from '../constants/appConstants';
import { GET_PROFILE_DETAILS, LOGIN_API, LOGOUT_API } from '../api/apiParams/auth';
import { clearAllAuthData, getAccessToken } from '../utils/authHelpers'

interface User {
  id: string | number
  username: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  role: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<User | false>
  logout: () => Promise<void>
  isAuthenticated: boolean
  fetchUser: () => Promise<User | null>
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isInitialized = useRef(false)

  const fetchUser = useCallback(async () => {
    try {
      const response = await api({
        endpoint: GET_PROFILE_DETAILS,

      })
      if (!response?.error) {
        const userData = (response?.data) || null

        if (userData) {
          setUser(userData)
          createCookie(LOGED_IN_USER_DATA, JSON.stringify(userData), { path: '/' })


          return userData
        }
      }

      throw new Error('Failed to fetch user data')
    } catch (error) {
      // Error fetching user data


      // clearAllAuthData()
      // setUser(null)

      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const initAuth = useCallback(async () => {
    const token = getAccessToken()

    if (token) {
      // Check if user data exists in cookie first (only for initial load)
      if (!isInitialized.current) {
        const cachedUser = getClientCookie(LOGED_IN_USER_DATA)
        const cachedRole = getClientCookie('ROLE')

        if (cachedUser && cachedRole) {
          try {
            const userData = JSON.parse(cachedUser)

            setUser(userData)
            setRole(cachedRole)


            setLoading(false)
            isInitialized.current = true

            return
          } catch (error) {
            // Error parsing cached user data
          }
        }
      }

      // Fetch from API
      const res = await fetchUser()

      if (res) {
        isInitialized.current = true
      }
    } else {
      setLoading(false)
      router.push('/')
    }
  }, [])

  useEffect(() => {

    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAuth])


  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true)

        // Build payload based on mode
        const payload = {
          username, // you said you pass challenge_id as email in MFA screen
          password
        }

        const response = await api({
          endpoint: LOGIN_API,
          payloadData: payload
        })
        // Response structure
        const res2 = {
          data: {
            access_token: '',
            refresh_token: '',
            role: '',
            token_type: '',
            user: {
              id: '',
              username: ''
            }

          },
          error: '',
          message: '',
          status: ''
        }
        if (response?.error) {
          return false
        }

        const tokens = {
          accessToken: response?.data?.access_token,
          refreshToken: response?.data?.refresh_token
        }


        const userData = response?.data?.user

        if (userData) {
          setUser(userData)
          setRole(response?.data?.role)
          createCookie('USER', JSON.stringify(userData), { path: '/' })
          createCookie('ROLE', response?.data?.role, { path: '/' })
        }

        setAuthTokens(tokens.accessToken, tokens.refreshToken)

        if (response.data?.role === USER_ROLES.ADMIN) {

          router.push('/admin')
        } else if (response.data?.role === USER_ROLES.TEACHER) {
          router.push('/teacher')
        } else if (response.data?.role === USER_ROLES.PARENT) {
          router.push('/parent')
        } else if (response.data?.role === USER_ROLES.STUDENT) {
          router.push('/student')
        } else {
          router.push('/')
        }

        return userData ?? false
      } catch (error) {
        // Login failed
        return false
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const { refreshToken } = getAuthTokens()

      const res = await api({
        endpoint: LOGOUT_API,
        payloadData: { refresh: refreshToken }
      })

      if (!res?.error) {
        clearAllAuthData()
        setUser(null)

        isInitialized.current = false // Reset initialization flag for next login

        router.push('/login')
      }
    } catch (error) {
      // Logout API error
    } finally {
      setLoading(false)
    }
  }, [router])

  return (

    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        fetchUser,
        setUser,

      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
