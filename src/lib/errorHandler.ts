/**
 * Global Error Handler for frontend
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR', 0);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT', 429);
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Server error occurred') {
    super(message, 'SERVER_ERROR', 500);
  }
}

/**
 * Parse error from API response
 */
export function parseApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new NetworkError();
  }

  if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
    return new AuthenticationError();
  }

  if (error.message?.includes('404') || error.message?.includes('not found')) {
    return new NotFoundError();
  }

  if (error.message?.includes('429') || error.message?.includes('rate limit')) {
    return new RateLimitError();
  }

  if (error.message?.includes('500') || error.message?.includes('server error')) {
    return new ServerError();
  }

  return new AppError(error.message || 'An unknown error occurred');
}

/**
 * Global error handler for React components
 */
export function handleGlobalError(error: Error, errorInfo?: any): void {
  console.error('Global error caught:', error, errorInfo);
  
  // Log to error tracking service (e.g., Sentry)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: errorInfo });
  }

  // Show user-friendly error message
  if (typeof window !== 'undefined') {
    const appError = parseApiError(error);
    
    // You can integrate with a toast/notification system here
    console.error('User-facing error:', appError.message);
  }
}

/**
 * Error boundary fallback component data
 */
export interface ErrorFallbackData {
  error: AppError;
  resetError: () => void;
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: AppError): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection.';
    case 'AUTH_ERROR':
      return 'Your session has expired. Please login again.';
    case 'VALIDATION_ERROR':
      return error.message || 'Please check your input and try again.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'RATE_LIMIT':
      return 'Too many requests. Please wait a moment and try again.';
    case 'SERVER_ERROR':
      return 'Something went wrong on our end. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
