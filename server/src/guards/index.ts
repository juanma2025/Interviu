import type { Request, Response, NextFunction } from 'express'
import type { Auth } from 'firebase-admin/auth'
import {
  AuthError,
  SecondFactorRequiredError,
  UsageLimitError,
} from '../../../shared/domain/index.js'
import type { IUsageRepository } from '../repositories/interfaces.js'

export interface AuthenticatedUser {
  uid: string
  email?: string
  hasSecondFactor: boolean
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}

export class AuthGuard {
  readonly #auth: Auth

  constructor(auth: Auth) {
    this.#auth = auth
  }

  public middleware() {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AuthError('Token de autorización ausente o con formato inválido'))
      }

      const idToken = authHeader.split('Bearer ')[1].trim()

      try {
        const decoded = await this.#auth.verifyIdToken(idToken)
        const hasSecondFactor = Boolean((decoded as any)?.firebase?.sign_in_second_factor)

        req.user = {
          uid: decoded.uid,
          email: decoded.email,
          hasSecondFactor,
        }
        next()
      } catch (err: any) {
        return next(new AuthError(`Token de autorización no válido: ${err?.message || 'Error de verificación'}`))
      }
    }
  }
}

export class SecondFactorGuard {
  public middleware() {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(new AuthError('Usuario no autenticado'))
      }

      if (!req.user.hasSecondFactor) {
        return next(
          new SecondFactorRequiredError('Se requiere autenticación de dos factores (2FA) para realizar esta operación sensible')
        )
      }

      next()
    }
  }
}

export class UsageGuard {
  readonly #usageRepo: IUsageRepository
  readonly #monthlyLimit: number

  constructor(usageRepo: IUsageRepository, monthlyLimit: number) {
    this.#usageRepo = usageRepo
    this.#monthlyLimit = monthlyLimit
  }

  public middleware() {
    return async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(new AuthError('Usuario no autenticado'))
      }

      const now = new Date()
      const monthYear = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`

      const usage = await this.#usageRepo.getUsage(req.user.uid, monthYear)

      if (usage.aiCalls >= this.#monthlyLimit) {
        return next(
          new UsageLimitError(
            `Has alcanzado el límite mensual de ${this.#monthlyLimit} evaluaciones de IA. Se restablecerá el próximo mes.`
          )
        )
      }

      next()
    }
  }
}

export class RateLimiter {
  readonly #maxRequests: number
  readonly #windowMs: number
  readonly #requests: Map<string, number[]> = new Map()

  constructor(maxRequests = 60, windowMs = 60 * 1000) {
    this.#maxRequests = maxRequests
    this.#windowMs = windowMs
  }

  public middleware() {
    return (req: Request, _res: Response, next: NextFunction) => {
      const clientKey = req.user?.uid || req.ip || 'anonymous'
      const now = Date.now()

      let timestamps = this.#requests.get(clientKey) || []
      // Filtrar marcas de tiempo fuera de la ventana
      timestamps = timestamps.filter((t) => now - t < this.#windowMs)

      if (timestamps.length >= this.#maxRequests) {
        return next(new UsageLimitError('Límite de solicitudes por minuto excedido. Intenta de nuevo en unos momentos.'))
      }

      timestamps.push(now)
      this.#requests.set(clientKey, timestamps)
      next()
    }
  }
}
