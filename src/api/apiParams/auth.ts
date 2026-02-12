/**
 * Authentication API parameters
 * Module-wise API endpoint configurations
 *
 * @example
 * // Usage in components/views:
 * const response = await api({
 *   endpoint: LOGIN_API,
 *   payloadData: { email, password }
 * })
 *
 * @example
 * // All API params follow this pattern:
 * export const API_NAME: ApiType = {
 *   url: apiUrls.API_URL,
 *   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
 *   withToken: true | false,  // true = requires auth, false = public API
 *   isMultipart: false,       // true for file uploads
 *   showToast: true | false   // show success/error toasts
 * }
 */

import type { ApiType } from '../api'
import { apiUrls } from '../../constants/apiUrls'

// Login API
export const LOGIN_API: ApiType = {
  url: apiUrls.LOGIN_URL,
  method: 'POST',
  withToken: false,
  isForm: true,
  showToast: true
}

// // Register API
// export const REGISTER_API: ApiType = {
//   url: apiUrls.REGISTER_URL,
//   method: 'POST',
//   withToken: false,
//   isMultipart: false,
//   showToast: true
// }

// Get Profile API
export const GET_PROFILE_DETAILS: ApiType = {
  url: apiUrls.USER_PROFILE_ENDPOINT,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false
}


// // Refresh Token API
// export const REFRESH_TOKEN_API: ApiType = {
//   url: apiUrls.GET_REFRESH_TOKEN_URL,
//   method: 'POST',
//   withToken: false,
//   isMultipart: false,
//   showToast: false
// }

// // Logout API
export const LOGOUT_API: ApiType = {
  url: apiUrls.LOGOUT_URL,
  method: 'POST',
  withToken: true,
  isMultipart: false,
  showToast: true
}

export const GET_LIST_OF_STUDENTS_OF_CLASS_API: ApiType = {
  url: apiUrls.GET_STUDENT_CLASS_URL,
  method: 'GET',
  withToken: true,
  isMultipart: false,
  showToast: false
}