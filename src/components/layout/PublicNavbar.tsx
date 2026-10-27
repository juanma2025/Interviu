import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useLocation } from 'react-router'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/useTheme.js'

export function PublicNavbar() {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Metodología', href: '/metodologia' },
    { label: 'Preguntas & Buzón AI', href: '/preguntas' },
    { label: 'Planes', href: '/planes' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo -> Links to public home / */}
        <Link
          to="/"
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          title="Ir al inicio de Intervu"
        >
          <div className="w-8 h-8 rounded-[10px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform duration-200">
            IV
          </div>
          <span className="font-extrabold text-[15px] tracking-tight text-black dark:text-white flex items-center gap-1.5">
            <span>Intervu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]" aria-label="Navegación pública">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                  active
                    ? 'text-black dark:text-white font-semibold'
                    : 'text-[#6E6E73] hover:text-black dark:text-[#8E8E93] dark:hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#1C1C1E] rounded-full shadow-xs -z-10 border border-black/[0.04] dark:border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Apple Style Theme Toggle Button (Light / Dark) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
            className="tap-target p-2 rounded-full text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer border border-transparent hover:border-black/[0.04] dark:hover:border-white/[0.08]"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 stroke-[2.2]" />
            )}
          </motion.button>

          <Link
            to="/login"
            className="text-xs font-semibold text-[#6E6E73] hover:text-black dark:text-[#8E8E93] dark:hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
          >
            Iniciar sesión
          </Link>

          <Link to="/registro">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="tap-target px-4 py-2 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Empezar gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="tap-target p-2 rounded-full text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white cursor-pointer"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <Link
            to="/login"
            className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white px-2 py-1"
          >
            Entrar
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="tap-target p-2 rounded-lg text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-black/95 backdrop-blur-xl px-4 py-4 space-y-3"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive(link.href)
                      ? 'bg-black/[0.05] dark:bg-white/[0.08] text-black dark:text-white'
                      : 'text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2">
              <Link
                to="/registro"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
              >
                Empezar gratis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
