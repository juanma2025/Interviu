/**
 * Jerarquía de errores de la aplicación
 * Siguiendo el paradigma POO con herencia estricta para relaciones "es un"
 */

export abstract class AppError extends Error {
  public abstract readonly code: string
  public abstract readonly statusCode: number
  public readonly details?: unknown

  constructor(message: string, details?: unknown) {
    super(message)
    this.name = this.constructor.name
    this.details = details
    // Maintain prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }

  public toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details ? { details: this.details } : {}),
      },
    }
  }
}

export class ValidationError extends AppError {
  public readonly code = 'VALIDATION_ERROR'
  public readonly statusCode = 400
}

export class AuthError extends AppError {
  public readonly code = 'AUTH_ERROR'
  public readonly statusCode = 401
}

export class ForbiddenError extends AppError {
  public readonly code = 'FORBIDDEN_ERROR'
  public readonly statusCode = 403
}

export class SecondFactorRequiredError extends AppError {
  public readonly code = 'SECOND_FACTOR_REQUIRED'
  public readonly statusCode = 403
}

export class UsageLimitError extends AppError {
  public readonly code = 'USAGE_LIMIT_EXCEEDED'
  public readonly statusCode = 429
}

export class ProviderError extends AppError {
  public readonly code = 'PROVIDER_ERROR'
  public readonly statusCode = 502
}

export class NotFoundError extends AppError {
  public readonly code = 'NOT_FOUND_ERROR'
  public readonly statusCode = 404
}
