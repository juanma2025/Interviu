import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  LayoutDashboard,
  BookOpenCheck,
  Video,
  TrendingUp,
  Settings,
  Plus,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  MessageSquare,
  CreditCard,
} from 'lucide-react'
import { NewSimulationModal } from '../../features/dashboard/components/NewSimulationModal.js'

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

export interface AppShellProps {
  currentPath: string
  onNavigate: (href: string) => void
  children: React.ReactNode
  userDisplayName?: string
}

export function AppShell({
  currentPath,
  onNavigate,
  children,
  userDisplayName = 'Sofía Ramírez',
}: AppShellProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      }
      return prefersDark
    }
    return false
  })

  const [isNewSimModalOpen, setIsNewSimModalOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Evaluación completada',
      desc: 'Tu respuesta sobre "Pregunta técnica y API" obtuvo 9.1 / 10',
      time: 'Hace 15 min',
      unread: true,
    },
    {
      id: 2,
      title: '¡Nueva racha alcanzada!',
      desc: 'Llegaste a 6 días continuos de preparación técnica.',
      time: 'Hace 2 horas',
      unread: true,
    },
    {
      id: 3,
      title: 'Módulo recomendado listo',
      desc: 'Valeria S. preparó ejercicios de memoización en React.',
      time: 'Ayer',
      unread: false,
    },
  ])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
  }

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Inicio / Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      href: '/app/dashboard',
    },
    {
      id: 'practicar',
      label: 'Prácticas',
      icon: <BookOpenCheck className="w-4 h-4" />,
      href: '/app/practicar',
    },
    {
      id: 'simulaciones',
      label: 'Simulaciones en Vivo',
      icon: <Video className="w-4 h-4" />,
      href: '/app/simulaciones',
    },
    {
      id: 'progreso',
      label: 'Métricas y Progreso',
      icon: <TrendingUp className="w-4 h-4" />,
      href: '/app/progreso',
    },
    {
      id: 'ayuda',
      label: 'Buzón AI (Dudas)',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '/app/ayuda',
    },
    {
      id: 'planes',
      label: 'Planes & Compra',
      icon: <CreditCard className="w-4 h-4" />,
      href: '/app/planes',
    },
    {
      id: 'perfil',
      label: 'Perfil y Configuración',
      icon: <Settings className="w-4 h-4" />,
      href: '/app/perfil',
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-[var(--bg)] text-[var(--text)]">
      {/* 1. SIDEBAR DESKTOP (>=768px) matching Image 2 */}
      <aside className="hidden md:flex flex-col justify-between border-r border-[var(--line)] bg-[var(--surface)] p-4 md:w-20 lg:w-64 shrink-0 h-screen sticky top-0 z-30 transition-all select-none">
        <div className="flex flex-col gap-5">
          {/* Brand Logo Header */}
          <div
            onClick={() => onNavigate('/app/dashboard')}
            className="flex items-center gap-3 px-2 py-1.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-[12px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">IV</span>
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-tight text-[var(--text)] flex items-center gap-1">
                <span>Intervu</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-medium leading-none">
                Preparación técnica
              </span>
            </div>
          </div>

          {/* Primary Action Button (+ Nueva simulación) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNewSimModalOpen(true)}
            className="tap-target w-full py-2.5 px-3 rounded-[14px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">Nueva simulación</span>
          </motion.button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1" role="navigation" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href === '/app/dashboard' && (currentPath === '/app' || currentPath === '/app/'))

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`tap-target relative flex items-center gap-3 px-3 py-2.5 rounded-[14px] text-xs font-semibold transition-all cursor-pointer text-left w-full ${
                    isActive
                      ? 'bg-[#E4F0EA] dark:bg-[#1E362E] text-[#1E4336] dark:text-[#72BCA7] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                  }`}
                >
                  <span className="flex items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Pill */}
        <div className="flex flex-col gap-2 pt-3 border-t border-[var(--line-subtle)]">
          <div
            onClick={() => onNavigate('/app/perfil')}
            className="flex items-center gap-3 p-2 rounded-[14px] hover:bg-[var(--surface-subtle)] cursor-pointer transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-700 dark:bg-emerald-800 text-white flex items-center justify-center text-xs font-bold border-2 border-emerald-400 shrink-0 shadow-xs">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-xs font-bold text-[var(--text)] truncate">Candidato Pro</span>
              <span className="text-[11px] text-[var(--text-muted)] truncate">Software Engineer</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER WITH TOPBAR */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR DESKTOP & MOBILE */}
        <header className="sticky top-0 z-30 glass-panel border-b border-[var(--line)] px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Left Status Chip */}
          <div className="flex items-center gap-3">
            {/* Mobile Logo (<768px) */}
            <div
              onClick={() => onNavigate('/app/dashboard')}
              className="md:hidden flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                IV
              </div>
              <span className="font-extrabold text-sm text-[var(--text)]">Interviu</span>
            </div>

            {/* Active Session Status Chip (Direct from screenshot) */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>Sesión guiada activa</span>
            </div>
          </div>

          {/* Right Action Icons: Notifications, Help, Theme, Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="tap-target p-2 rounded-full hover:bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] relative transition-colors cursor-pointer"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-[var(--surface)]" />
                )}
              </button>

              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-[var(--surface)] border border-[var(--line)] rounded-[20px] shadow-2xl p-4 z-50 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[var(--line-subtle)] pb-2">
                    <span className="text-xs font-bold text-[var(--text)]">Notificaciones</span>
                    <button
                      onClick={() => {
                        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
                      }}
                      className="text-[10px] text-[var(--accent)] hover:underline font-semibold"
                    >
                      Marcar leídas
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-[12px] text-xs transition-colors ${
                          n.unread ? 'bg-[var(--accent-soft)]/50' : 'bg-[var(--surface-subtle)]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-[var(--text)]">{n.title}</strong>
                          <span className="text-[10px] text-[var(--text-muted)]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] mt-1">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Help Button */}
            <button
              type="button"
              onClick={() => alert('Soporte Interviu: Escríbenos para orientación en preparación de entrevistas.')}
              className="tap-target p-2 rounded-full hover:bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              title="Ayuda y tutoriales"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="tap-target p-2 rounded-full hover:bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Avatar */}
            <button
              type="button"
              onClick={() => onNavigate('/app/perfil')}
              className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition-all cursor-pointer ml-1"
              title="Mi perfil"
            >
              {userDisplayName.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>

        {/* 3. MAIN CONTENT BODY */}
        <main className="flex-1 pb-24 md:pb-8 pt-5 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* 4. TABBAR INFERIOR MÓVIL (<768px) */}
      <nav
        role="navigation"
        aria-label="Navegación inferior móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-[var(--line)] pb-[env(safe-area-inset-bottom)] px-3 py-1.5 flex justify-around items-center"
      >
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href === '/app/dashboard' && (currentPath === '/app' || currentPath === '/app/'))

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`tap-target flex flex-col items-center justify-center gap-0.5 py-1 px-2.5 rounded-[12px] transition-colors relative ${
                isActive ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-muted)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tabbar-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute inset-0 bg-[var(--accent-soft)] rounded-[12px] -z-10"
                />
              )}
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px] leading-tight truncate max-w-[56px]">{item.label.split('/')[0]}</span>
            </button>
          )
        })}
      </nav>

      {/* Global New Simulation Modal */}
      <NewSimulationModal
        isOpen={isNewSimModalOpen}
        onClose={() => setIsNewSimModalOpen(false)}
        onStartSimulation={() => {
          onNavigate('/app/practicar')
        }}
      />
    </div>
  )
}
