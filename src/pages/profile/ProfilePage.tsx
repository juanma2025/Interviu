import React, { useState } from 'react'
import { Tabs } from '../../features/tabs/components/Tabs.js'
import { Button } from '../../components/ui/Button.js'
import { useAuth } from '../../features/auth/hooks/useAuth.js'

const ROLES = [
  { id: 'backend', name: 'Backend Developer' },
  { id: 'frontend', name: 'Frontend Developer' },
  { id: 'fullstack', name: 'Fullstack Developer' },
  { id: 'data', name: 'Data Engineer / Analyst' },
  { id: 'qa', name: 'QA Automation Engineer' },
  { id: 'devops', name: 'DevOps / Cloud Engineer' },
]

const LEVELS = [
  { id: 'junior', name: 'Junior' },
  { id: 'semi-senior', name: 'Semi-Senior' },
  { id: 'senior', name: 'Senior' },
]

export function ProfilePage() {
  const { user, logout } = useAuth()

  const [role, setRole] = useState(user?.targetRole || 'fullstack')
  const [level, setLevel] = useState(user?.level || 'semi-senior')
  const [analytics, setAnalytics] = useState(user?.consent?.analytics ?? true)
  const [trainingData, setTrainingData] = useState(user?.consent?.trainingData ?? false)
  const [reminders, setReminders] = useState(user?.remindersEnabled ?? true)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveProfile = () => {
    if (user) {
      user.updateRoleAndLevel(role, level)
      user.updateConsent(analytics, trainingData)
      user.setReminders(reminders)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }
  }

  const profileTabs = [
    { id: 'perfil', label: 'Perfil' },
    { id: 'seguridad', label: 'Seguridad' },
    { id: 'notificaciones', label: 'Notificaciones' },
    { id: 'privacidad', label: 'Privacidad' },
  ]

  const profilePanels = [
    {
      id: 'perfil',
      content: (
        <div className="space-y-6 pt-4 max-w-xl">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] block mb-1">
                Correo Electrónico
              </label>
              <div className="px-3.5 py-2.5 rounded-[12px] bg-[var(--surface-subtle)] text-sm text-[var(--text)] border border-[var(--line)]">
                {user?.email || 'usuario@intervu.app'}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] block mb-1">
                Rol Objetivo
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] block mb-1">
                Nivel de Seniority
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="primary" onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
            {isSaved && <span className="text-xs text-[var(--accent)] font-medium">✓ Cambios guardados</span>}
          </div>
        </div>
      ),
    },
    {
      id: 'seguridad',
      content: (
        <div className="space-y-6 pt-4 max-w-xl">
          <div className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] space-y-3">
            <h3 className="text-sm font-bold text-[var(--text)]">Autenticación en Dos Pasos (TOTP)</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Configura tu aplicación autenticadora (Google Authenticator, 1Password o Authy) para proteger tu cuenta y tus datos de entrevista.
            </p>
            <Button variant="secondary" size="sm">
              Configurar Aplicación Autenticadora
            </Button>
          </div>

          <div className="pt-4 border-t border-[var(--line-subtle)]">
            <Button variant="danger" size="sm" onClick={() => logout()}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'notificaciones',
      content: (
        <div className="space-y-6 pt-4 max-w-xl">
          <label className="p-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="mt-1 h-5 w-5 rounded-[6px] accent-[var(--accent)]"
            />
            <div className="space-y-1">
              <span className="text-sm font-bold text-[var(--text)] block">
                Recordatorios de inactividad
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Recibe un aviso discreto por correo si pasan más de 3 días sin practicar para no perder tu racha.
              </p>
            </div>
          </label>
        </div>
      ),
    },
    {
      id: 'privacidad',
      content: (
        <div className="space-y-6 pt-4 max-w-xl">
          <div className="space-y-4">
            <label className="p-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-5 w-5 rounded-[6px] accent-[var(--accent)]"
              />
              <div className="space-y-1">
                <span className="text-sm font-bold text-[var(--text)] block">
                  Analítica de uso y rendimiento
                </span>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Permite recolectar métricas agregadas de tus prácticas para calcular rachas y series semanales.
                </p>
              </div>
            </label>

            <label className="p-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={trainingData}
                onChange={(e) => setTrainingData(e.target.checked)}
                className="mt-1 h-5 w-5 rounded-[6px] accent-[var(--accent)]"
              />
              <div className="space-y-1">
                <span className="text-sm font-bold text-[var(--text)] block">
                  Mejora continua del modelo de evaluación
                </span>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Permite conservar transcripciones de forma anónima para calibrar la precisión de las rúbricas STAR.
                </p>
              </div>
            </label>
          </div>

          <Button variant="primary" onClick={handleSaveProfile}>
            Actualizar Preferencias de Privacidad
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Ajustes y Perfil</h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Gestiona tu información profesional, seguridad y preferencias de privacidad.
        </p>
      </div>

      <Tabs tabs={profileTabs} panels={profilePanels} syncUrlParam="tab" />
    </div>
  )
}
