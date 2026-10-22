import { createContext } from 'react'
import type { AuthService, AuthState } from '../domain/auth-service.js'

export interface AuthContextValue extends AuthState {
  service: AuthService
  register: (email: string, pass: string, name?: string) => Promise<unknown>
  login: (email: string, pass: string) => Promise<{ user: unknown; mfaRequired: boolean; resolver?: unknown }>
  logout: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
