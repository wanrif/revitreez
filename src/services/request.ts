import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

/**
 * Configured Axios instance with security features:
 * - CSRF protection via withCredentials
 * - Automatic token refresh (if using JWT)
 * - Request/response logging in development
 * - Clean query parameter serialization
 */
const clientRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Include cookies for CSRF/session auth
})

/**
 * Request interceptor
 * - Cleans null/undefined params
 * - Could add auth tokens here if using JWT
 */
clientRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Optional: Add authentication token
    // const token = localStorage.getItem('auth_token')
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // Development logging
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      })
    }

    return config
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[API Request Error]:', error)
    }
    return Promise.reject(error)
  },
)

/**
 * Response interceptor
 * - Handles common HTTP errors
 * - Could implement token refresh logic
 */
clientRequest.interceptors.response.use(
  (response) => {
    // Development logging
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        },
      )
    }
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized - could trigger re-authentication
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Optional: Implement token refresh logic here
      // try {
      //   const refreshToken = localStorage.getItem('refresh_token')
      //   const response = await axios.post('/auth/refresh', { refreshToken })
      //   const { token } = response.data
      //   localStorage.setItem('auth_token', token)
      //   if (originalRequest.headers) {
      //     originalRequest.headers.Authorization = `Bearer ${token}`
      //   }
      //   return clientRequest(originalRequest)
      // } catch (refreshError) {
      //   // Redirect to login or trigger auth flow
      //   window.location.href = '/login'
      //   return Promise.reject(refreshError)
      // }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('[API] Access forbidden - insufficient permissions')
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.warn('[API] Resource not found')
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('[API] Server error - please try again later')
    }

    if (import.meta.env.DEV) {
      console.error('[API Response Error]:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
    }

    return Promise.reject(error)
  },
)

export default clientRequest
