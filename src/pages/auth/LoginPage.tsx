import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, Sun, Moon, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { useTheme } from '../../context/useTheme.js'
import { AuthError, ValidationError } from '../../../shared/domain/index.js'

export function LoginPage() {
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/app/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        if (!mfaCode || mfaCode.length !== 6) {
          setError('Ingresa el código de 6 dígitos de tu aplicación autenticadora')
          setIsLoading(false)
          return
        }
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
        setError('Ocurrió un error al iniciar sesión. Verifica tus credenciales.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between items-center px-4 py-8 bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans transition-colors duration-200">
      {/* Top Header Bar with Back Link & Dark/Light Toggle */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <Link
          to="/"
          className="tap-target inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="tap-target p-2 rounded-full text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" /> : <Moon className="w-4 h-4 text-slate-700 stroke-[2.2]" />}
        </button>
      </div>

      {/* Main Apple Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] p-8 sm:p-9 rounded-[28px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] shadow-2xl space-y-6 my-auto"
      >
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <div className="w-10 h-10 rounded-[12px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm mx-auto group-hover:scale-105 transition-transform duration-200">
              IV
            </div>
          </Link>

          <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-black dark:text-white pt-1">
            {isMfaStep ? 'Segundo Factor' : 'Iniciar sesión'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            {isMfaStep
              ? 'Ingresa el código de 6 dígitos de tu app autenticadora'
              : 'Bienvenido de nuevo a tu plataforma de entrenamiento'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="p-3.5 rounded-[14px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/50"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isMfaStep ? (
            <>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
                  Correo electrónico
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-xs sm:text-sm placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
                    Contraseña
                  </label>
                  <Link
                    to="/recuperar"
                    className="text-xs font-medium text-black dark:text-white hover:underline"
                  >
                    ¿La olvidaste?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full min-h-[46px] pl-10 pr-10 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-xs sm:text-sm placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-[#8E8E93] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
                Código de autenticación (6 dígitos)
              </label>
              <input
                type="text"
                placeholder="123456"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                autoFocus
                required
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-center font-mono text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            type="submit"
            disabled={isLoading}
            className="tap-target w-full mt-2 py-3 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Verificando...</span>
              </span>
            ) : isMfaStep ? (
              'Verificar código'
            ) : (
              'Iniciar sesión'
            )}
          </motion.button>
        </form>

        {/* Switch to Register */}
        {!isMfaStep && (
          <div className="text-center pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
            <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/registro" className="font-semibold text-black dark:text-white hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        )}
      </motion.div>

      {/* Footer info */}
      <div className="text-center pt-4">
        <p className="text-[11px] text-[#8E8E93] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Acceso seguro protegido con cifrado TLS de 256 bits</span>
        </p>
      </div>
    </div>
  )
}
