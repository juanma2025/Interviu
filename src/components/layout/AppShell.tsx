import React, { useState } from 'react'
import { motion } from 'motion/react'

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
}

export interface AppShellProps {
  currentPath: string
  onNavigate: (href: string) => void
  children: React.ReactNode
  userDisplayName?: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'practicar', label: 'Practicar', icon: '⚡', href: '/app/practicar' },
  { id: 'progreso', label: 'Progreso', icon: '📊', href: '/app/progreso' },
  { id: 'perfil', label: 'Perfil', icon: '👤', href: '/app/perfil' },
]

export function AppShell({
  currentPath,
  onNavigate,
  children,
  userDisplayName = 'Candidato',
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

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-[var(--bg)] text-[var(--text)]">
      {/* 1. SIDEBAR DESKTOP (>=1024px) & LATERAL RAIL TABLET (768px - 1023px) */}
      <aside className="hidden md:flex flex-col justify-between border-r border-[var(--line)] bg-[var(--surface)] p-4 md:w-20 lg:w-64 shrink-0 h-screen sticky top-0 z-30 transition-all">
        <div className="flex flex-col gap-8">
          {/* Logo y Marca */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-[12px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              IV
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-bold text-base tracking-tight text-[var(--text)]">Interviu</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
                Simulador IA
              </span>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-1.5" role="navigation" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath.startsWith(item.href)
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`tap-target relative flex items-center gap-3.5 px-3 py-2.5 rounded-[12px] font-medium text-sm transition-colors cursor-pointer text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    isActive
                      ? 'text-[var(--accent)] font-semibold bg-[var(--accent-soft)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                  }`}
                >
                  <span className="text-xl flex items-center justify-center w-6 shrink-0">{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer Sidebar: Tema y Perfil */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[var(--line-subtle)]">
          <button
            type="button"
            onClick={toggleTheme}
            className="tap-target flex items-center justify-center lg:justify-start gap-3 p-2 rounded-[12px] text-xs text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)] transition-colors"
            title="Cambiar tema claro/oscuro"
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
            <span className="hidden lg:inline">{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>

          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-bold border border-[var(--line)]">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[var(--text)] truncate">{userDisplayName}</span>
              <span className="text-[10px] text-[var(--text-muted)]">En línea</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. HEADER MÓVIL (<768px) */}
      <header className="md:hidden sticky top-0 z-30 glass-panel border-b border-[var(--line)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm">
            IV
          </div>
          <span className="font-bold text-base tracking-tight text-[var(--text)]">Interviu</span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="tap-target text-base p-1.5 rounded-full hover:bg-[var(--surface-subtle)]"
          aria-label="Cambiar tema claro/oscuro"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 pb-24 md:pb-8 pt-4 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        {children}
      </main>

      {/* 4. TABBAR INFERIOR MÓVIL (<768px) */}
      <nav
        role="navigation"
        aria-label="Navegación inferior móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-[var(--line)] pb-[env(safe-area-inset-bottom)] px-4 py-1.5 flex justify-around items-center"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath.startsWith(item.href)
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`tap-target flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-[12px] transition-colors relative ${
                isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-muted)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tabbar-pill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-[var(--accent-soft)] rounded-[12px] -z-10"
                />
              )}
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[11px] leading-none">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
