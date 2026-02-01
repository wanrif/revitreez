import type { AxiosRequestConfig } from 'axios'
import { isAxiosError } from 'axios'

import clientRequest from '@/services/request'
import type { ErrorResponse, PaginatedResponseData, ResponseData } from '@/types/api'

/**
 * Base API error class with typed response
 */
export class ApiError extends Error {
  status?: number
  code?: string
  data?: unknown

  constructor(message: string, status?: number, code?: string, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.data = data
  }
}

/**
 * Generic GET request
 * @param url - The URL to send the GET request to
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 * @example
 * const response = await get<User>('/users/123')
 * console.log('User data:', response.data)
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.get<ResponseData<T>>(url, config)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Generic POST request
 * @param url - The URL to send the POST request to
 * @param data - The data to send in the request body
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 * @example
 * const response = await post<User, CreateUserDto>('/users', { name: 'John Doe', email: 'john@example.com' })
 * console.log('Created user:', response.data)
 */
export async function post<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.post<ResponseData<T>>(url, data, config)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Generic PUT request
 * @param url - The URL to send the PUT request to
 * @param data - The data to be sent in the request body
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 * @example
 * const response = await put<User, UpdateUserDto>('/users/123', { name: 'Jane Doe' })
 * console.log('Updated user:', response.data)
 */
export async function put<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.put<ResponseData<T>>(url, data, config)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Generic PATCH request
 * @param url - The URL to send the PATCH request to
 * @param data - The data to be sent in the request body
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 * @example
 * const response = await patch<User, Partial<UpdateUserDto>>('/users/123', { name: 'New Name' })
 * console.log('Updated user:', response.data)
 */
export async function patch<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.patch<ResponseData<T>>(url, data, config)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Generic DELETE request
 * @param url - The URL to send the DELETE request to
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to the response data
 * @example
 * const response = await del<{ success: boolean }>('/items/123')
 * console.log('Delete successful:', response.data.success)
 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.delete<ResponseData<T>>(url, config)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Paginated GET request
 * @param url - The URL to send the GET request to
 * @param params - Query parameters for pagination, search, and sorting
 * @param config - Optional Axios request configuration
 * @returns Promise resolving to paginated response data
 * @example
 * const response = await getPaginated<User>('/users', { page: 2, pageSize: 20, search: 'john', sortBy: 'name', sortOrder: 'asc' })
 * console.log('Users:', response.data)
 */
export async function getPaginated<T>(
  url: string,
  params?: {
    page?: number
    pageSize?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    [key: string]: unknown
  },
  config?: AxiosRequestConfig,
): Promise<PaginatedResponseData<T>> {
  try {
    const response = await clientRequest.get<PaginatedResponseData<T>>(url, {
      ...config,
      params: {
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? 10,
        ...params,
      },
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Upload file(s) with multipart/form-data
 * @param url - The URL to upload the file(s) to
 * @param formData - The FormData object containing the file(s) and other data
 * @param onUploadProgress - Optional callback for upload progress events
 * @returns Promise resolving to the response data
 * @example
 * const formData = new FormData()
 * formData.append('file', selectedFile)
 * const response = await upload<{ url: string }>('/upload', formData, (progressEvent) => {
 *   const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 100
 *   console.log(`Upload progress: ${progress}%`)
 * })
 * console.log('File uploaded to:', response.data.url)
 */
export async function upload<T>(
  url: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: { loaded: number; total?: number }) => void,
): Promise<ResponseData<T>> {
  try {
    const response = await clientRequest.post<ResponseData<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Download file as blob
 * @param url - The URL to download the file from
 * @param filename - Optional filename for the downloaded file
 * @param config - Optional Axios request configuration
 * @returns Promise that resolves when the download is initiated
 * @example
 * await download('/files/report.pdf', 'monthly-report.pdf')
 */
export async function download(
  url: string,
  filename?: string,
  config?: AxiosRequestConfig,
): Promise<void> {
  try {
    const response = await clientRequest.get(url, {
      ...config,
      responseType: 'blob',
    })

    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl

    // Use provided filename or extract from Content-Disposition header
    const contentDisposition = response.headers['content-disposition']
    const extractedFilename = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : filename || 'download'

    link.download = extractedFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    throw handleApiError(error)
  }
}

/**
 * Centralized error handler
 * @returns ApiError instance with relevant information
 * @param error - The error object to handle
 */
function handleApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const errorData = error.response?.data as ErrorResponse | undefined

    const message = errorData?.message || error.message || 'An unexpected error occurred'
    const status = error.response?.status
    const code = errorData?.error || error.code

    return new ApiError(message, status, code, errorData)
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('An unexpected error occurred')
}

/**
 * Helper to build query string from params object
 * @example
 * const queryString = buildQueryString({ page: 1, search: 'test' })
 * // queryString = '?page=1&search=test'
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Type-safe API client object
 */
export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  getPaginated,
  upload,
  download,
  buildQueryString,
} as const
