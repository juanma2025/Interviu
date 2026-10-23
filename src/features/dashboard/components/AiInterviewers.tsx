import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, Mic, MessageSquare } from 'lucide-react'

export interface InterviewerProfile {
  id: string
  name: string
  role: string
  avatar: string
  bgGradient: string
}

export function AiInterviewers({
  onCallInterviewer,
}: {
  onCallInterviewer?: (interviewer: InterviewerProfile) => void
}) {
  const [preferredMode, setPreferredMode] = useState<'voz' | 'texto'>('voz')

  const interviewers: InterviewerProfile[] = [
    {
      id: 'valeria',
      name: 'Valeria S.',
      role: 'Arquitectura Frontend',
      avatar: 'VS',
      bgGradient: 'from-emerald-700 to-teal-800',
    },
    {
      id: 'carlos',
      name: 'Carlos M.',
      role: 'Comportamental & Liderazgo',
      avatar: 'CM',
      bgGradient: 'from-slate-700 to-zinc-900',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.2 }}
      className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--text)] tracking-tight">
          Entrevistadores IA
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>En línea</span>
        </div>
      </div>

      {/* Interviewers List */}
      <div className="space-y-3">
        {interviewers.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-3 rounded-[16px] bg-[var(--surface-subtle)]/40 border border-[var(--line-subtle)]"
          >
            {/* Avatar & Name */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.bgGradient} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
              >
                {item.avatar}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[var(--text)] truncate">{item.name}</h4>
                <p className="text-[11px] text-[var(--text-muted)] truncate">{item.role}</p>
              </div>
            </div>

            {/* Call Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCallInterviewer?.(item)}
              className="tap-target px-3.5 py-1.5 h-8 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>Llamar</span>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Mode Switcher */}
      <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-[var(--text-muted)]">
          Modalidad preferida:
        </span>
        <div className="inline-flex p-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--line-subtle)]">
          <button
            onClick={() => setPreferredMode('voz')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              preferredMode === 'voz'
                ? 'bg-white dark:bg-[#1E312B] text-[var(--text)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <Mic className="w-3 h-3" />
            <span>Voz</span>
          </button>
          <button
            onClick={() => setPreferredMode('texto')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              preferredMode === 'texto'
                ? 'bg-white dark:bg-[#1E312B] text-[var(--text)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>Texto</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
