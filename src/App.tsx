import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router'
import { AuthProvider, ProtectedRoute } from './features/auth/context/AuthContext.js'
import { useAuth } from './features/auth/hooks/useAuth.js'
import { AppShell } from './components/layout/AppShell.js'
import { RegisterPage } from './pages/auth/RegisterPage.js'
import { LoginPage } from './pages/auth/LoginPage.js'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage.js'
import { OnboardingPage } from './pages/onboarding/OnboardingPage.js'
import { ProfilePage } from './pages/profile/ProfilePage.js'
import { DesignCatalog } from './pages/dev/DesignCatalog.js'
import { MotionCatalog } from './pages/dev/MotionCatalog.js'
import { QuestionCard } from './components/patterns/QuestionCard.js'
import { StatCard } from './components/patterns/StatCard.js'
import { Tabs } from './features/tabs/components/Tabs.js'
import { Button } from './components/ui/Button.js'

function AppShellWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <AppShell
      currentPath={location.pathname}
      onNavigate={(href) => navigate(href)}
      userDisplayName={user?.displayName || 'Candidato'}
    >
      {children}
    </AppShell>
  )
}

function PracticePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Simulador de Entrevistas</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Selecciona una sesión guiada o practica preguntas individuales enfocadas en tu rol.
          </p>
        </div>
        <Button variant="primary" size="md">
          Iniciar Nueva Sesión (5 preguntas) →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <QuestionCard
          id="q1"
          category="comportamiento"
          text="Cuéntame sobre una ocasión en la que tuviste que aprender una nueva tecnología en poco tiempo."
          estimatedSeconds={180}
          tip="Usa la estructura STAR: contexto, objetivo, estrategia de aprendizaje y resultado medible."
          onSelect={() => alert('Sesión iniciada')}
        />
        <QuestionCard
          id="q2"
          category="sistemas"
          text="¿Cómo diseñarías una cola de mensajes distribuida tolerante a fallos y con entrega al menos una vez?"
          estimatedSeconds={300}
          tip="Aborda replicación, particionado, acuses de recibo (ACKs) y deduplicación."
          onSelect={() => alert('Sesión iniciada')}
        />
      </div>
    </div>
  )
}

function ProgressPage() {
  const progressTabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'historial', label: 'Historial' },
    { id: 'categorias', label: 'Categorías' },
  ]

  const progressPanels = [
    {
      id: 'resumen',
      content: (
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="Total Practicado" value={28} unit="preguntas" trend={{ value: '+6 esta semana', isPositive: true }} />
            <StatCard label="Puntaje Promedio" value="8.6" unit="/ 10" trend={{ value: 'Alto dominio', isPositive: true }} />
            <StatCard label="Racha Activa" value={4} unit="días" trend={{ value: 'Continuar hoy', isPositive: true }} />
          </div>
        </div>
      ),
    },
    {
      id: 'historial',
      content: (
        <div className="pt-4 text-sm text-[var(--text-muted)]">
          Listado de sesiones anteriores y respuestas evaluadas por Claude.
        </div>
      ),
    },
    {
      id: 'categorias',
      content: (
        <div className="pt-4 text-sm text-[var(--text-muted)]">
          Desglose por categoría: Comportamiento (88%), Técnica (82%), Sistemas (75%), Cierre (90%).
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text)]">Tu Progreso</h1>
      <Tabs tabs={progressTabs} panels={progressPanels} syncUrlParam="view" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas de Autenticación */}
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar" element={<ForgotPasswordPage />} />
          <Route path="/bienvenida" element={<OnboardingPage />} />

          {/* Catálogos de Desarrollo */}
          <Route
            path="/dev/design"
            element={
              <AppShellWrapper>
                <DesignCatalog />
              </AppShellWrapper>
            }
          />
          <Route
            path="/dev/motion"
            element={
              <AppShellWrapper>
                <MotionCatalog />
              </AppShellWrapper>
            }
          />

          {/* Rutas Protegidas de la Aplicación */}
          <Route
            path="/app/practicar"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <PracticePage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/progreso"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <ProgressPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/perfil"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <ProfilePage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />

          {/* Redirecciones por defecto */}
          <Route path="/" element={<Navigate to="/dev/design" replace />} />
          <Route path="/app" element={<Navigate to="/app/practicar" replace />} />
          <Route path="*" element={<Navigate to="/dev/design" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
