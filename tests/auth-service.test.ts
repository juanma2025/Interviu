import { describe, it, expect, vi } from 'vitest'

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendEmailVerification: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}))

import { AuthService } from '../src/features/auth/domain/auth-service.js'
import { ApiClient } from '../src/lib/api-client.js'
import {
  UserProfile,
  ValidationError,
  AuthError,
  SecondFactorRequiredError,
  UsageLimitError,
} from '../shared/domain/index.js'

describe('AuthService: Validación de Registro', () => {
  it('acepta contraseñas válidas con al menos 8 caracteres, letras y números', () => {
    expect(() => {
      AuthService.validateRegistration('dev@intervu.app', 'Password123')
    }).not.toThrow()

    expect(() => {
      AuthService.validateRegistration('usuario.test@gmail.com', 'secreto2025')
    }).not.toThrow()
  })

  it('rechaza correos electrónicos inválidos', () => {
    expect(() => {
      AuthService.validateRegistration('correo-invalido', 'Password123')
    }).toThrow(ValidationError)

    expect(() => {
      AuthService.validateRegistration('sin-arroba.com', 'Password123')
    }).toThrow(ValidationError)
  })

  it('rechaza contraseñas con menos de 8 caracteres', () => {
    expect(() => {
      AuthService.validateRegistration('dev@intervu.app', 'Pass1')
    }).toThrow('La contraseña debe tener al menos 8 caracteres')
  })

  it('rechaza contraseñas sin números o sin letras', () => {
    expect(() => {
      AuthService.validateRegistration('dev@intervu.app', 'sololetraslargas')
    }).toThrow('La contraseña debe contener al menos una letra y un número')

    expect(() => {
      AuthService.validateRegistration('dev@intervu.app', '1234567890')
    }).toThrow('La contraseña debe contener al menos una letra y un número')
  })
})

describe('UserProfile: Gestión de Perfil y Consentimiento', () => {
  it('inicializa y permite actualizar rol objetivo y nivel', () => {
    const profile = new UserProfile({
      uid: 'u_123',
      email: 'dev@intervu.app',
      displayName: 'Ana Gómez',
      targetRole: 'backend',
      level: 'junior',
      onboardingDone: false,
    })

    expect(profile.targetRole).toBe('backend')
    expect(profile.level).toBe('junior')
    expect(profile.onboardingDone).toBe(false)

    profile.updateRoleAndLevel('fullstack', 'senior')
    expect(profile.targetRole).toBe('fullstack')
    expect(profile.level).toBe('senior')

    profile.completeOnboarding()
    expect(profile.onboardingDone).toBe(true)
  })

  it('permite revocar y actualizar consentimientos de analítica y entrenamiento', () => {
    const profile = new UserProfile({
      uid: 'u_123',
      email: 'dev@intervu.app',
      displayName: 'Ana Gómez',
      targetRole: 'backend',
      level: 'junior',
      onboardingDone: false,
      consent: {
        analytics: true,
        trainingData: true,
      },
    })

    expect(profile.consent.analytics).toBe(true)
    expect(profile.consent.trainingData).toBe(true)

    // Revocar trainingData
    profile.updateConsent(true, false)
    expect(profile.consent.analytics).toBe(true)
    expect(profile.consent.trainingData).toBe(false)
  })
})

describe('ApiClient (Patrón Facade): Mapeo de Errores', () => {
  it('mapea código 400 a ValidationError', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 400,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({ error: { code: 'VALIDATION_ERROR', message: 'Datos incompletos' } }),
    })
    globalThis.fetch = mockFetch

    const client = new ApiClient('/api')
    await expect(client.get('/test')).rejects.toBeInstanceOf(ValidationError)
  })

  it('mapea código 401 a AuthError', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 401,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({ error: { code: 'AUTH_ERROR', message: 'Token expirado' } }),
    })
    globalThis.fetch = mockFetch

    const client = new ApiClient('/api')
    await expect(client.get('/test')).rejects.toBeInstanceOf(AuthError)
  })

  it('mapea 403 con SECOND_FACTOR_REQUIRED a SecondFactorRequiredError', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 403,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({
        error: { code: 'SECOND_FACTOR_REQUIRED', message: 'Se requiere 2FA' },
      }),
    })
    globalThis.fetch = mockFetch

    const client = new ApiClient('/api')
    await expect(client.get('/test')).rejects.toBeInstanceOf(SecondFactorRequiredError)
  })

  it('mapea 429 a UsageLimitError', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 429,
      ok: false,
      headers: { get: () => 'application/json' },
      json: async () => ({
        error: { code: 'USAGE_LIMIT_EXCEEDED', message: 'Límite mensual superado' },
      }),
    })
    globalThis.fetch = mockFetch

    const client = new ApiClient('/api')
    await expect(client.get('/test')).rejects.toBeInstanceOf(UsageLimitError)
  })
})
