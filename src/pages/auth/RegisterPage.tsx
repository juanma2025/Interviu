import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Input } from '../../components/ui/Input.js'
import { Button } from '../../components/ui/Button.js'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { ValidationError, AuthError } from '../../../shared/domain/index.js'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setIsLoading(true)
    try {
      await register(email, password, name)
      // Redirigir al onboarding de bienvenida
      navigate('/bienvenida')
    } catch (err: any) {
      if (err instanceof ValidationError || err instanceof AuthError) {
        setError(err.message)
      } else {
        setError('Ocurrió un error al crear la cuenta. Inténtalo de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center px-4 py-12 bg-[var(--bg)]">
      <div className="w-full max-w-md space-y-8">
        {/* Marca y encabezado */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-[16px] bg-[var(--accent)] text-white items-center justify-center font-bold text-xl mb-2 shadow-sm">
            IV
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Crea tu cuenta en Interviu
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Simulador de entrevistas de ingeniería de software con IA
          </p>
        </div>

        {/* Formulario */}
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
            <Input
              label="Nombre completo"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Mínimo 8 caracteres, letra y número"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Mínimo 8 caracteres con al menos una letra y un número"
              required
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              Registrarme
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-[var(--line-subtle)]">
            <p className="text-xs text-[var(--text-muted)]">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-[var(--accent)] hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
