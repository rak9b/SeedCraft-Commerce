// Error handling utilities for the frontend

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 503)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHORIZATION_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND_ERROR', 404)
    this.name = 'NotFoundError'
  }
}

export const handleApiError = (error: any): AppError => {
  if (error instanceof AppError) {
    return error
  }

  // Handle network errors
  if (!error.response) {
    return new NetworkError('Network error - please check your connection')
  }

  // Handle HTTP errors
  const { status, data } = error.response
  const message = data?.error || data?.message || 'An unexpected error occurred'

  switch (status) {
    case 400:
      return new ValidationError(message)
    case 401:
      return new AuthenticationError(message)
    case 403:
      return new AuthorizationError(message)
    case 404:
      return new NotFoundError(message)
    case 500:
      return new AppError('Internal server error', 'SERVER_ERROR', 500)
    default:
      return new AppError(message, 'UNKNOWN_ERROR', status)
  }
}

export const handleApiErrorSilently = (error: any): void => {
  const appError = handleApiError(error)
  console.error('API Error:', appError)
  // In a real app, you might want to log this to a monitoring service
}