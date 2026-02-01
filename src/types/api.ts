/**
 * Standard API response wrapper
 */
export interface ResponseData<T> {
  data: T
  message: string
  status: string
}

/**
 * Paginated API response wrapper
 */
export interface PaginatedResponseData<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  message: string
  status: string
}

/**
 * Standard error response from API
 */
export interface ErrorResponse {
  error: string
  message: string
  status: string
  details?: Record<string, string[]> // Validation errors
}

/**
 * Common pagination parameters
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Common ID parameter for routes
 */
export interface IdParam {
  id: string
}

/**
 * Standard timestamp fields for entities
 */
export interface Timestamps {
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

/**
 * Helper type for Create DTOs (excludes id and timestamps)
 */
export type CreateDto<T> = Omit<T, 'id' | keyof Timestamps>

/**
 * Helper type for Update DTOs (partial entity without id and timestamps)
 */
export type UpdateDto<T> = Partial<Omit<T, 'id' | keyof Timestamps>>

/**
 * Helper for API list responses
 */
export type ApiList<T> = ResponseData<T[]>

/**
 * Helper for API single item response
 */
export type ApiItem<T> = ResponseData<T>

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}
