import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, Sun, Moon, Eye, EyeOff, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { useTheme } from '../../context/useTheme.js'
import { ValidationError, AuthError } from '../../../shared/domain/index.js'

export function RegisterPage() {
  const { register } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

  const hasLength = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

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
        className="w-full max-w-[440px] p-8 sm:p-9 rounded-[28px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] shadow-2xl space-y-6 my-auto"
      >
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <div className="w-10 h-10 rounded-[12px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm mx-auto group-hover:scale-105 transition-transform duration-200">
              IV
            </div>
          </Link>

          <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-black dark:text-white pt-1">
            Crea tu cuenta
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            Comienza gratis tu preparación con IA y calibración STAR 360
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
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
              Nombre completo
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Sofía Ramírez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-xs sm:text-sm placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
              Correo electrónico
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                placeholder="sofia@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-xs sm:text-sm placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 8 caracteres"
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

            {/* Micro requirements indicator */}
            <div className="flex items-center gap-3 pt-1 text-[11px] text-[#8E8E93]">
              <span className={`flex items-center gap-1 ${hasLength ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> 8+ caracteres
              </span>
              <span className={`flex items-center gap-1 ${hasLetter && hasNumber ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> Letra y número
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] select-none">
              Confirmar contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 pointer-events-none" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full min-h-[46px] pl-10 pr-10 py-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] text-black dark:text-white text-xs sm:text-sm placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-[#8E8E93] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

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
                <span>Creando cuenta...</span>
              </span>
            ) : (
              'Crear mi cuenta gratis'
            )}
          </motion.button>
        </form>

        {/* Switch to Login */}
        <div className="text-center pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
          <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-semibold text-black dark:text-white hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="text-center pt-4">
        <p className="text-[11px] text-[#8E8E93] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Tus datos están protegidos bajo estándares RGPD y cifrado TLS</span>
        </p>
      </div>
    </div>
  )
}
