import { describe, it, expect, vi } from 'vitest'
import { AuthGuard, SecondFactorGuard } from '../server/src/guards/index.js'
import {
  AuthError,
  SecondFactorRequiredError,
} from '../shared/domain/index.js'

describe('AuthGuard Middleware', () => {
  it('lanza AuthError si falta la cabecera Authorization', async () => {
    const mockAuth = { verifyIdToken: vi.fn() } as any
    const guard = new AuthGuard(mockAuth)
    const middleware = guard.middleware()

    const req = { headers: {} } as any
    const res = {} as any
    let caughtError: any = null

    await middleware(req, res, (err) => {
      caughtError = err
    })

    expect(caughtError).toBeInstanceOf(AuthError)
  })

  it('autentica y detecta si el token contiene segundo factor (2FA)', async () => {
    const mockAuth = {
      verifyIdToken: vi.fn().mockResolvedValue({
        uid: 'user_mfa_123',
        email: 'dev@intervu.app',
        firebase: {
          sign_in_second_factor: 'totp',
        },
      }),
    } as any

    const guard = new AuthGuard(mockAuth)
    const middleware = guard.middleware()

    const req = { headers: { authorization: 'Bearer valid_mfa_token' } } as any
    const res = {} as any
    let calledNext = false

    await middleware(req, res, () => {
      calledNext = true
    })

    expect(calledNext).toBe(true)
    expect(req.user).toEqual({
      uid: 'user_mfa_123',
      email: 'dev@intervu.app',
      hasSecondFactor: true,
    })
  })

  it('autentica y detecta si el token NO contiene segundo factor', async () => {
    const mockAuth = {
      verifyIdToken: vi.fn().mockResolvedValue({
        uid: 'user_no_mfa',
        email: 'user@intervu.app',
        firebase: {},
      }),
    } as any

    const guard = new AuthGuard(mockAuth)
    const middleware = guard.middleware()

    const req = { headers: { authorization: 'Bearer token_no_mfa' } } as any
    const res = {} as any
    let calledNext = false

    await middleware(req, res, () => {
      calledNext = true
    })

    expect(calledNext).toBe(true)
    expect(req.user).toEqual({
      uid: 'user_no_mfa',
      email: 'user@intervu.app',
      hasSecondFactor: false,
    })
  })
})

describe('SecondFactorGuard Middleware', () => {
  const guard = new SecondFactorGuard()
  const middleware = guard.middleware()

  it('permite el paso si el usuario autenticado tiene segundo factor', () => {
    const req = {
      user: {
        uid: 'user_1',
        email: 'dev@intervu.app',
        hasSecondFactor: true,
      },
    } as any
    const res = {} as any
    let calledNext = false

    middleware(req, res, () => {
      calledNext = true
    })

    expect(calledNext).toBe(true)
  })

  it('bloquea con SecondFactorRequiredError (403) si el usuario NO tiene segundo factor', () => {
    const req = {
      user: {
        uid: 'user_2',
        email: 'dev@intervu.app',
        hasSecondFactor: false,
      },
    } as any
    const res = {} as any
    let caughtError: any = null

    middleware(req, res, (err) => {
      caughtError = err
    })

    expect(caughtError).toBeInstanceOf(SecondFactorRequiredError)
    expect(caughtError.statusCode).toBe(403)
    expect(caughtError.code).toBe('SECOND_FACTOR_REQUIRED')
  })
})
