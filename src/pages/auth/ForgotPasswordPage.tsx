import React, { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, Sun, Moon, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { useTheme } from '../../context/useTheme.js'

export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth()
  const { isDark, toggleTheme } = useTheme()
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
    <div className="min-h-[100dvh] flex flex-col justify-between items-center px-4 py-8 bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans transition-colors duration-200">
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <Link
          to="/login"
          className="tap-target inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio de sesión</span>
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
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <div className="w-10 h-10 rounded-[12px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm mx-auto group-hover:scale-105 transition-transform duration-200">
              IV
            </div>
          </Link>

          <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-black dark:text-white pt-1">
            Recuperar contraseña
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            Te enviaremos un enlace seguro para restablecer tu acceso
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un correo con las instrucciones de recuperación en los próximos minutos.
            </p>
            <Link to="/login" className="block pt-2">
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="tap-target w-full py-3 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Volver a iniciar sesión
              </motion.button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={isLoading}
              className="tap-target w-full mt-2 py-3 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Enviando...</span>
                </span>
              ) : (
                'Enviar enlace de recuperación'
              )}
            </motion.button>
          </form>
        )}

        <div className="text-center pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
          <Link to="/login" className="text-xs font-semibold text-black dark:text-white hover:underline">
            Volver a iniciar sesión
          </Link>
        </div>
      </motion.div>

      <div className="text-center pt-4">
        <p className="text-[11px] text-[#8E8E93] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protección de identidad y seguridad de acceso</span>
        </p>
      </div>
    </div>
  )
}
