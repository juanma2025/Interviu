import React, { useState } from 'react'
import { Link } from 'react-router'
import { Input } from '../../components/ui/Input.js'
import { Button } from '../../components/ui/Button.js'
import { useAuth } from '../../features/auth/hooks/useAuth.js'

export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await sendPasswordReset(email)
      setIsSubmitted(true)
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
            Recuperar contraseña
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Te enviaremos un enlace seguro para restablecer tu acceso.
          </p>
        </div>

        <div className="p-8 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] shadow-sm space-y-6">
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-[16px] bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium">
                Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un correo con las instrucciones de recuperación.
              </div>
              <Link to="/login">
                <Button variant="primary" className="w-full mt-4">
                  Volver a iniciar sesión
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
                Enviar enlace de recuperación
              </Button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[var(--line-subtle)]">
            <Link to="/login" className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]">
              ← Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
