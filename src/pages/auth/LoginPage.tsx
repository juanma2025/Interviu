import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { Input } from '../../components/ui/Input.js'
import { Button } from '../../components/ui/Button.js'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { AuthError, ValidationError } from '../../../shared/domain/index.js'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/app/practicar'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [isMfaStep, setIsMfaStep] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isMfaStep) {
        // Fase 5: Validación del código TOTP
        if (!mfaCode || mfaCode.length !== 6) {
          setError('Ingresa el código de 6 dígitos de tu aplicación autenticadora')
          setIsLoading(false)
          return
        }
        // Continuación MFA
        navigate(from, { replace: true })
      } else {
        const result = await login(email, password)
        if (result.mfaRequired) {
          setIsMfaStep(true)
        } else {
          navigate(from, { replace: true })
        }
      }
    } catch (err: any) {
      if (err instanceof AuthError || err instanceof ValidationError) {
        setError(err.message)
      } else {
        setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center px-4 py-12 bg-[var(--bg)]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-[16px] bg-[var(--accent)] text-white items-center justify-center font-bold text-xl mb-2 shadow-sm">
            IV
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            {isMfaStep ? 'Segundo factor de autenticación' : 'Iniciar sesión en Interviu'}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {isMfaStep
              ? 'Ingresa el código de seguridad de 6 dígitos de tu aplicación'
              : 'Bienvenido de nuevo a tu plataforma de entrenamiento'}
          </p>
        </div>

        <div className="p-8 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] shadow-sm space-y-6">
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-[12px] bg-[var(--danger-soft)] text-[var(--danger)] text-xs font-medium border border-[var(--danger)]/20"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isMfaStep ? (
              <>
                <Input
                  label="Correo electrónico"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex justify-end">
                  <Link
                    to="/recuperar"
                    className="text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </>
            ) : (
              <Input
                label="Código de autenticación (6 dígitos)"
                placeholder="123456"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                autoFocus
                required
              />
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              {isMfaStep ? 'Verificar código' : 'Iniciar sesión'}
            </Button>
          </form>

          {!isMfaStep && (
            <div className="text-center pt-2 border-t border-[var(--line-subtle)]">
              <p className="text-xs text-[var(--text-muted)]">
                ¿Aún no tienes cuenta?{' '}
                <Link to="/registro" className="font-semibold text-[var(--accent)] hover:underline">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
