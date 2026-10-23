import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, Check, Play } from 'lucide-react'

export interface NewSimulationModalProps {
  isOpen: boolean
  onClose: () => void
  onStartSimulation: (config: {
    role: string
    level: string
    category: string
    questionsCount: number
  }) => void
}

export function NewSimulationModal({
  isOpen,
  onClose,
  onStartSimulation,
}: NewSimulationModalProps) {
  const [role, setRole] = useState('frontend')
  const [level, setLevel] = useState('semi-senior')
  const [category, setCategory] = useState('tecnica')
  const [questionsCount, setQuestionsCount] = useState(5)

  if (!isOpen) return null

  const roles = [
    { id: 'frontend', name: 'Frontend (React/TS)' },
    { id: 'backend', name: 'Backend (Node/Go)' },
    { id: 'fullstack', name: 'Fullstack Engineer' },
    { id: 'devops', name: 'DevOps / Cloud' },
  ]

  const levels = [
    { id: 'junior', name: 'Junior' },
    { id: 'semi-senior', name: 'Semi-Senior' },
    { id: 'senior', name: 'Senior' },
  ]

  const categories = [
    { id: 'comportamiento', name: 'Comportamiento (STAR)' },
    { id: 'tecnica', name: 'Técnica & Conceptos' },
    { id: 'sistemas', name: 'Diseño de Sistemas' },
    { id: 'cierre', name: 'Preguntas al Reclutador' },
  ]

  const handleStart = () => {
    onStartSimulation({ role, level, category, questionsCount })
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="w-full max-w-lg bg-[var(--surface)] border border-[var(--line)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--line-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text)]">Nueva Simulación de Entrevista</h3>
                <p className="text-xs text-[var(--text-muted)]">Configura el contexto adaptativo para la IA</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="tap-target p-1.5 rounded-full hover:bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-[var(--text)] mb-2 uppercase tracking-wider">
                Especialidad Técnica
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => {
                  const isSelected = role === r.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-3 rounded-[14px] text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--surface-subtle)]/30 text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      <span>{r.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Seniority */}
            <div>
              <label className="block text-xs font-bold text-[var(--text)] mb-2 uppercase tracking-wider">
                Nivel de Seniority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {levels.map((l) => {
                  const isSelected = level === l.id
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLevel(l.id)}
                      className={`py-2 px-3 rounded-[12px] text-xs font-semibold border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--surface-subtle)]/30 text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      {l.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category Focus */}
            <div>
              <label className="block text-xs font-bold text-[var(--text)] mb-2 uppercase tracking-wider">
                Enfoque de Preguntas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => {
                  const isSelected = category === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-2.5 rounded-[12px] text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--surface-subtle)]/30 text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Number of questions */}
            <div>
              <label className="block text-xs font-bold text-[var(--text)] mb-2 uppercase tracking-wider">
                Extensión de la sesión
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 8].map((count) => {
                  const isSelected = questionsCount === count
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionsCount(count)}
                      className={`py-2 px-3 rounded-[12px] text-xs font-semibold border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--surface-subtle)]/30 text-[var(--text)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      {count} preguntas
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-[var(--line-subtle)] bg-[var(--surface-subtle)]/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="tap-target px-4 py-2 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
            >
              Cancelar
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleStart}
              className="tap-target px-5 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Comenzar práctica guiada →</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
