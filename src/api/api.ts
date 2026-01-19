/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios'
import axios from 'axios'

import { toast } from 'sonner'

import { axiosInstance } from './apiinterceptors'
// import { convertObjToQueryString } from '@/utils/utils'
// import { ACCESS_TOKEN } from '@/constants/appConstants'
import { convertObjToQueryString } from '../utils/utils'
import { ACCESS_TOKEN } from '../constants/appConstants'

/**
 * Interface defining the API endpoint configuration
 */
export interface ApiEndpoint {
  /**
   * HTTP method to use for the request
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

  /**
   * Whether the request contains multipart/form-data (for file uploads)
   */
  isMultipart?: boolean
  isForm?: boolean

  /**
   * The API endpoint URL path
   */
  url: string

  /**
   * Whether to show toast notifications for success/error responses
   */
  showToast?: boolean

  /**
   * Expected response type from the API
   */
  responseType?: 'json' | 'blob' | 'text'
}

/**
 * Extended API type with withToken flag
 */
export interface ApiType extends ApiEndpoint {
  withToken?: boolean
}

/**
 * Interface defining parameters for the API call
 */
export interface ApiParams {
  /**
   * Endpoint configuration (ApiEndpoint or ApiType)
   */
  endpoint: ApiEndpoint | ApiType

  /**
   * Request payload data (body for POST/PUT/PATCH, query params for GET)
   */
  payloadData?: any

  /**
   * Optional ID to append to the URL
   */
  id?: string | null | string[]

  /**
   * Query string parameters (will be converted to query string)
   */
  params?: Record<string, any> | null

  /**
   * Optional dynamic message for toast notifications
   */
  dynamicMessage?: string | null

  /**
   * Optional cancel token for request cancellation
   */
  cancelToken?: CancelTokenSource | null

  /**
   * If true, the request will be made without authentication token
   */
  withoutToken?: boolean

  /**
   * Server-side token to use when making server-side requests
   */
  serverToken?: string | null

  /**
   * If true, indicates this is a server-side request (no toast notifications)
   */
  isServer?: boolean
}

/**
 * Interface for API response structure
 */
export interface ApiResponse<T = any> {
  /**
   * Whether the request resulted in an error
   */
  error: boolean

  /**
   * HTTP status code
   */
  status?: number

  /**
   * Response data from the API
   */
  data: T | null

  /**
   * Response message from the API
   */
  message?: string

  /**
   * Total count of items (for paginated responses)
   */
  totalCount?: number
}

/**
 * Interface for error payload structure from API responses
 */
interface ErrorPayload {
  /**
   * Error message
   */
  message?: string

  /**
   * Alternative error message key
   */
  msg?: string

  /**
   * Allow any other JSON values from the backend
   */
  [key: string]: unknown
}

/**
 * HTTP status codes that trigger specific error messages
 */
enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}

/**
 * HTTP methods that typically modify data and should show success toasts
 */
const MUTATION_METHODS: ApiEndpoint['method'][] = ['POST', 'PUT', 'PATCH', 'DELETE']

/**
 * Gets a user-friendly error message based on HTTP status code
 * @param status - HTTP status code from the error response
 * @returns User-friendly error message
 */
const getStatusErrorMessage = (status?: number): string => {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return 'Bad request. Please check your input and try again.'
    case HttpStatus.UNAUTHORIZED:
      return 'Unauthorized. Please log in again.'
    case HttpStatus.FORBIDDEN:
      return "Access forbidden. You don't have permission to perform this action."
    case HttpStatus.NOT_FOUND:
      return 'Resource not found. Please check the URL and try again.'
    case HttpStatus.UNPROCESSABLE_ENTITY:
      return 'Validation error. Please check your input data.'
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return 'Internal server error. Please try again later.'
    case HttpStatus.BAD_GATEWAY:
      return 'Bad gateway. Please try again later.'
    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'Service unavailable. Please try again later.'
    default:
      return 'An error occurred. Please try again later.'
  }
}

/**
 * Extracts error message from error payload
 * Handles various error message formats from the backend
 * @param errorData - Error payload from API response
 * @returns Extracted error message string
 */
const extractErrorMessage = (errorData: ErrorPayload): string => {
  // If message is a string, return it directly
  if (typeof errorData.message === 'string') {
    return errorData.message
  }

  // Otherwise, try to extract from all values in the error object
  return Object.values(errorData)
    .map(val => (Array.isArray(val) ? val.join(', ') : String(val)))
    .join(' ')
}

/**
 * Determines the authentication token to use for the request
 * @param withoutToken - Whether to skip authentication
 * @param shouldUseServerMode - Whether this is a server-side request
 * @param serverToken - Token provided for server-side requests
 * @returns Authentication token or null
 */
const getAuthToken = (
  withoutToken: boolean,
  shouldUseServerMode: boolean,
  serverToken: string | null
): string | null => {
  // For public APIs, don't add token
  if (withoutToken) {
    return null
  }

  // For server-side calls, use serverToken if available
  if (shouldUseServerMode) {
    return serverToken
  }

  // For client-side calls, use localStorage token
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN)
  }

  return null
}

/**
 * Builds the complete URL for the API request
 * @param baseUrl - Base API URL from environment
 * @param endpointUrl - Endpoint path
 * @param id - Optional ID to append
 * @param params - Optional query parameters
 * @returns Complete URL string
 */
const buildRequestUrl = (
  baseUrl: string | undefined,
  endpointUrl: string,
  id: string | null | string[] | undefined,
  params: Record<string, any> | null | undefined
): string => {
  const idString = id || ''
  const queryString = params ? convertObjToQueryString(params) : ''

  return `${baseUrl || ''}${endpointUrl}${idString}${queryString}`
}

/**
 * Creates request headers for the API call
 * @param isMultipart - Whether request contains multipart data
 * @param token - Authentication token
 * @returns Headers object
 */
const createRequestHeaders = (isMultipart: boolean | undefined, isForm: boolean | undefined, token: string | null): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': isMultipart ? 'multipart/form-data' : isForm ? 'application/x-www-form-urlencoded' : 'application/json'
  }

  // Add authorization header if token is available
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

/**
 * Handles API error responses and returns formatted error response
 * @param error - Axios error object
 * @param isServer - Whether this is a server-side request
 * @returns Formatted error response
 */
const handleApiError = (error: AxiosError, isServer: boolean): ApiResponse => {
  const errorData: ErrorPayload = (error.response?.data as ErrorPayload) ?? {
    message: 'An error occurred.'
  }

  const errorMessage = extractErrorMessage(errorData)
  const fallbackMessage = getStatusErrorMessage(error.response?.status)

  // Show error toast only on client-side
  if (!isServer) {
    toast.error(errorMessage || fallbackMessage)
  }

  return {
    error: true,
    status: error.response?.status,
    data: null,
    message: errorMessage
  }
}

/**
 * Handles successful API responses and shows toast notifications if needed
 * @param response - Axios response object
 * @param method - HTTP method used
 * @param showToast - Whether to show success toast
 * @param isServer - Whether this is a server-side request
 * @returns Formatted success response
 */
const handleApiSuccess = (
  response: AxiosResponse,
  method: ApiEndpoint['method'],
  showToast: boolean | undefined,
  isServer: boolean
): ApiResponse => {
  // Show success toast for mutation methods on client-side
  if (!isServer && response?.data && !response?.data?.isError && showToast && MUTATION_METHODS.includes(method)) {
    const successMessage = response?.data?.message || 'Success'

    toast.success(successMessage)
  }

  return {
    error: false,
    status: response?.status,
    data: response?.data,
    message: response?.data?.message
  }
}

/**
 * Main API function to make HTTP requests
 * Handles authentication, error handling, and toast notifications
 *
 * @param params - API request parameters
 * @returns Promise resolving to API response with error flag, status, data, and message
 
 */
export const api = async <T = any>({
  endpoint,
  payloadData,
  id = null,
  params = null,
  cancelToken = null,
  serverToken = null,
  isServer = false,
  withoutToken = false
}: ApiParams): Promise<ApiResponse<T>> => {
  // Extract withToken from ApiType if present, otherwise use withoutToken param
  const apiType = endpoint as ApiType
  const shouldUseToken = apiType.withToken !== undefined ? apiType.withToken : !withoutToken
  const finalWithoutToken = !shouldUseToken

  const { url, method, isMultipart, isForm, showToast, responseType } = endpoint

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const isServerSide = typeof window === 'undefined'
  const shouldUseServerMode = isServer || isServerSide

  // Get authentication token
  const token = getAuthToken(finalWithoutToken, shouldUseServerMode, serverToken)

  try {
    // Build request configuration
    const headers = createRequestHeaders(isMultipart, isForm, token)
    const requestUrl = buildRequestUrl(baseUrl, url, id, params)

    const requestConfig: AxiosRequestConfig = {
      method,
      headers,
      url: requestUrl,
      data: method !== 'GET' && payloadData ? payloadData : undefined,
      params: method === 'GET' ? payloadData : undefined,
      responseType,
      cancelToken: cancelToken ? cancelToken.token : undefined
    }

    // Make the API request
    const response = shouldUseServerMode ? await axios(requestConfig) : await axiosInstance(requestConfig)

    // Handle successful response
    return handleApiSuccess(response, method, showToast, isServer)
  } catch (err) {
    // Handle error response
    const error = err as AxiosError

    return handleApiError(error, isServer)
  }
}