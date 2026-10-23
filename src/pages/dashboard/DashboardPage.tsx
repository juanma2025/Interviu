import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { ScoreGauge } from '../../features/dashboard/components/ScoreGauge.js'
import { StreakTracker } from '../../features/dashboard/components/StreakTracker.js'
import { AccumulatedTimeCard } from '../../features/dashboard/components/AccumulatedTimeCard.js'
import { VerbalFluencyCard } from '../../features/dashboard/components/VerbalFluencyCard.js'
import { LastSimulationCard } from '../../features/dashboard/components/LastSimulationCard.js'
import { PerformanceChart } from '../../features/dashboard/components/PerformanceChart.js'
import { RecommendedModules } from '../../features/dashboard/components/RecommendedModules.js'
import { AiInterviewers, type InterviewerProfile } from '../../features/dashboard/components/AiInterviewers.js'
import { RecruiterTipCard } from '../../features/dashboard/components/RecruiterTipCard.js'
import { LiveSimulationModal } from '../../features/dashboard/components/LiveSimulationModal.js'
import { NewSimulationModal } from '../../features/dashboard/components/NewSimulationModal.js'
import { Toast } from '../../components/ui/Toast.js'

export function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState('Frontend Specialist (React/TS)')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [activeInterviewer, setActiveInterviewer] = useState<InterviewerProfile | null>(null)
  const [isNewSimModalOpen, setIsNewSimModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const roles = [
    'Frontend Specialist (React/TS)',
    'Backend Engineer (Node/Go)',
    'Fullstack Web Developer',
    'DevOps & Cloud Engineer',
  ]

  const handleStartCall = (interviewer: InterviewerProfile) => {
    setActiveInterviewer(interviewer)
    setIsCallModalOpen(true)
  }

  const handleStartQuickPractice = () => {
    setActiveInterviewer({
      id: 'valeria',
      name: 'Valeria S.',
      role: 'Práctica guiada STAR',
      avatar: 'VS',
      bgGradient: 'from-emerald-700 to-teal-800',
    })
    setIsCallModalOpen(true)
  }

  const handleStartConfiguredSimulation = (config: {
    role: string
    level: string
    category: string
    questionsCount: number
  }) => {
    setToastMessage(`Sesión iniciada: ${config.questionsCount} preguntas para ${config.role} (${config.level})`)
    setTimeout(() => {
      setIsCallModalOpen(true)
    }, 500)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. WELCOME HEADER BANNER (Direct reference from screenshot) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-7 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Greeting & Meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Simulación activa</span>
              </span>
              <span className="text-xs text-[var(--text-muted)] font-medium">
                Actualizado hace 12 min
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Hola de nuevo, Sofía
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
              Nivel: <strong className="text-[var(--text)]">Frontend Junior / Mid</strong> • 82% listo para tu próxima entrevista técnica
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative">
            {/* Role Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="tap-target px-4 py-2.5 rounded-[14px] bg-[var(--surface-subtle)]/70 hover:bg-[var(--surface-subtle)] border border-[var(--line)] text-xs font-bold text-[var(--text)] flex items-center justify-between gap-2.5 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <span>{selectedRole}</span>
                <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
              </button>

              {isRoleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full mt-1.5 w-64 bg-[var(--surface)] border border-[var(--line)] rounded-[16px] shadow-xl p-1.5 z-40"
                >
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setSelectedRole(r)
                        setIsRoleDropdownOpen(false)
                        setToastMessage(`Perfil cambiado a: ${r}`)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium transition-colors cursor-pointer ${
                        selectedRole === r
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-bold'
                          : 'text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Primary Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartQuickPractice}
              className="tap-target px-5 py-2.5 rounded-[14px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Comenzar práctica guiada (15 min)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 2. 4 KEY METRICS CARDS ROW (Exact match from screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <ScoreGauge />
        <StreakTracker />
        <AccumulatedTimeCard />
        <VerbalFluencyCard />
      </div>

      {/* 3. MAIN SECTION 2-COLUMN GRID (68% left / 32% right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Last Simulation Card & Performance Bar Chart */}
        <div className="lg:col-span-8 space-y-6">
          <LastSimulationCard />
          <PerformanceChart />
        </div>

        {/* Right Column (4 cols): Recommended Modules, AI Interviewers, Daily Recruiter Tip */}
        <div className="lg:col-span-4 space-y-6">
          <RecommendedModules
            onSelectModule={(id) => {
              setToastMessage(`Módulo ${id} seleccionado para práctica`)
              handleStartQuickPractice()
            }}
          />
          <AiInterviewers onCallInterviewer={handleStartCall} />
          <RecruiterTipCard />
        </div>
      </div>

      {/* Modals & Live Simulator */}
      <LiveSimulationModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        interviewer={activeInterviewer}
      />

      <NewSimulationModal
        isOpen={isNewSimModalOpen}
        onClose={() => setIsNewSimModalOpen(false)}
        onStartSimulation={handleStartConfiguredSimulation}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage || ''}
        isVisible={Boolean(toastMessage)}
        onClose={() => setToastMessage(null)}
        type="success"
      />
    </div>
  )
}
