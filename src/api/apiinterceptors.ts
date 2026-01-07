import https from 'https'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'

import { clearAuthTokens, createCookie, getCookieValue } from '../utils/cookie'
import { ACCESS_TOKEN } from '../constants/appConstants'
// import { ACCESS_TOKEN } from '@/constants/appConstants'

// TODO: IN PRODUCTION CHANGE IT TO COOKIE BASED AUTHENTICATION (i.e. withcredentials: true)
export const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

/* ---------------------- Attach Access Token to Every Request ---------------------- */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      getCookieValue(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN)

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return config
  },
  error => Promise.reject(error)
)

/* -------------------------- Handle 401 → Clear & Logout -------------------------- */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      await handleAuthFailure()
    }

    return Promise.reject(error)
  }
)

/* --------------------------- Auth Failure → Logout --------------------------- */
const handleAuthFailure = async () => {
  try {
    clearAuthTokens()
    localStorage.removeItem(ACCESS_TOKEN)
  } catch (error) {
    // Failed to clear tokens
  }

  if (typeof window !== 'undefined') {
    window.location.replace(`${window.location.origin}/`)
  }
}
