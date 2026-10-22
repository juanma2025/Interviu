import React, { useSyncExternalStore, useCallback, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router'
import { defaultAuthService } from '../services/auth-instance.js'
import type { AuthService } from '../domain/auth-service.js'
import { AuthContext, type AuthContextValue } from './auth-context-def.js'
import { useAuth } from '../hooks/useAuth.js'

export function AuthProvider({
  children,
  authService = defaultAuthService,
}: {
  children: React.ReactNode
  authService?: AuthService
}) {
  const snapshot = useSyncExternalStore(
    useCallback((onStoreChange) => authService.subscribe(onStoreChange), [authService]),
    useCallback(() => authService.getSnapshot(), [authService])
  )

  const value: AuthContextValue = useMemo(
    () => ({
      ...snapshot,
      service: authService,
      register: (email, pass, name) => authService.register(email, pass, name),
      login: (email, pass) => authService.login(email, pass),
      logout: () => authService.logout(),
      sendPasswordReset: (email) => authService.sendPasswordReset(email),
    }),
    [snapshot, authService]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--text-muted)] font-medium">Verificando sesión...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
