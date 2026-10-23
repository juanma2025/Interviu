import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone } from 'lucide-react'
import { LiveSimulationModal } from '../../features/dashboard/components/LiveSimulationModal.js'
import type { InterviewerProfile } from '../../features/dashboard/components/AiInterviewers.js'

export function SimulationsPage() {
  const [selectedInterviewer, setSelectedInterviewer] = useState<InterviewerProfile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const interviewers: InterviewerProfile[] = [
    {
      id: 'valeria',
      name: 'Valeria S.',
      role: 'Staff Frontend Engineer & Tech Lead',
      avatar: 'VS',
      bgGradient: 'from-emerald-700 to-teal-800',
    },
    {
      id: 'carlos',
      name: 'Carlos M.',
      role: 'Engineering Manager (Behavioral & STAR)',
      avatar: 'CM',
      bgGradient: 'from-slate-700 to-zinc-900',
    },
    {
      id: 'elena',
      name: 'Elena R.',
      role: 'Principal Systems Architect (Cloud & Scale)',
      avatar: 'ER',
      bgGradient: 'from-sky-700 to-indigo-900',
    },
  ]

  const handleStartCall = (interviewer: InterviewerProfile) => {
    setSelectedInterviewer(interviewer)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text)] tracking-tight">
          Simulaciones en Vivo
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
          Entrevistas simuladas en tiempo real mediante audio asistido por IA, con evaluación STAR instantánea.
        </p>
      </div>

      {/* Main Interactive Call Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] bg-gradient-to-br from-[#1B362D] to-[#12241E] text-white p-6 sm:p-8 shadow-md relative overflow-hidden"
      >
        <div className="max-w-xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Sala de simulación lista</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Practica con entrevistadores entrenados con perfiles de Google, Meta y startups
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Nuestros agentes analizan tu tono, pausas, estructura STAR y profundidad conceptual con retroalimentación sin juicio.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleStartCall(interviewers[0])}
              className="tap-target px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E201A] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Llamar a Valeria S. (Frontend)</span>
            </motion.button>
          </div>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      </motion.div>

      {/* Interviewers Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[var(--text)]">
          Elige a tu evaluador según la especialidad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {interviewers.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="p-5 rounded-[22px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.bgGradient} text-white font-bold text-sm flex items-center justify-center shadow-md`}
                  >
                    {item.avatar}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Disponible</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[var(--text)]">{item.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.role}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--line-subtle)] flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-muted)]">Modalidad voz / audio</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartCall(item)}
                  className="tap-target px-4 py-1.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>Iniciar sesión</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LiveSimulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        interviewer={selectedInterviewer}
        questionText="¿Cómo abordarías una regresión crítica de rendimiento en producción tras un despliegue masivo?"
      />
    </div>
  )
}
