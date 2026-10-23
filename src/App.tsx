import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router'
import { AuthProvider, ProtectedRoute } from './features/auth/context/AuthContext.js'
import { useAuth } from './features/auth/hooks/useAuth.js'
import { AppShell } from './components/layout/AppShell.js'
import { LandingPage } from './pages/landing/LandingPage.js'
import { DashboardPage } from './pages/dashboard/DashboardPage.js'
import { PracticePage } from './pages/practice/PracticePage.js'
import { SimulationsPage } from './pages/simulations/SimulationsPage.js'
import { ProgressPage } from './pages/progress/ProgressPage.js'
import { HelpDeskPage } from './pages/helpdesk/HelpDeskPage.js'
import { PricingPlansPage } from './pages/pricing/PricingPlansPage.js'
import { RegisterPage } from './pages/auth/RegisterPage.js'
import { LoginPage } from './pages/auth/LoginPage.js'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage.js'
import { OnboardingPage } from './pages/onboarding/OnboardingPage.js'
import { ProfilePage } from './pages/profile/ProfilePage.js'
import { DesignCatalog } from './pages/dev/DesignCatalog.js'
import { MotionCatalog } from './pages/dev/MotionCatalog.js'

function AppShellWrapper({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <AppShell
      currentPath={location.pathname}
      onNavigate={(href) => navigate(href)}
      userDisplayName={user?.displayName || 'Sofía Ramírez'}
    >
      {children}
    </AppShell>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing pública principal (referencia imagen 1) */}
          <Route path="/" element={<LandingPage />} />

          {/* Rutas de autenticación (referencia imágenes 3 y 4) */}
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar" element={<ForgotPasswordPage />} />
          <Route path="/bienvenida" element={<OnboardingPage />} />

          {/* Dashboard y aplicación protegida (referencia imagen 2) */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <DashboardPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/dashboard"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <DashboardPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
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
            path="/app/simulaciones"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <SimulationsPage />
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
            path="/app/ayuda"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <HelpDeskPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/preguntas"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <HelpDeskPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/planes"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <PricingPlansPage />
                </AppShellWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/planes"
            element={
              <ProtectedRoute>
                <AppShellWrapper>
                  <PricingPlansPage />
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

          {/* Catálogos de desarrollo */}
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

          {/* Redirecciones */}
          <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
