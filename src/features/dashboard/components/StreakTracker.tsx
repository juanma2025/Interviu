import { motion } from 'motion/react'
import { Flame, Check, Award } from 'lucide-react'

export interface StreakTrackerProps {
  streakDays?: number
  activeDays?: string[] // e.g. ['L', 'M', 'X', 'J', 'V', 'S']
  nextMilestone?: string
}

export function StreakTracker({
  streakDays = 6,
  activeDays = ['L', 'M', 'X', 'J', 'V', 'S'],
  nextMilestone = '7 días (Medalla bronce)',
}: StreakTrackerProps) {
  const days = [
    { label: 'L', key: 'L' },
    { label: 'M', key: 'M' },
    { label: 'X', key: 'X' },
    { label: 'J', key: 'J' },
    { label: 'V', key: 'V' },
    { label: 'S', key: 'S' },
    { label: 'D', key: 'D' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.05 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4 transition-shadow hover:shadow-md cursor-pointer group"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-muted)] tracking-tight">
            Racha de preparación
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            Activa
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Flame className="w-4 h-4 fill-amber-500/20" />
        </div>
      </div>

      {/* Main Metric */}
      <div>
        <div className="text-2xl font-bold tracking-tight text-[var(--text)]">
          {streakDays} días <span className="text-base font-normal text-[var(--text-muted)]">seguidos</span>
        </div>

        {/* Days Row */}
        <div className="flex items-center justify-between gap-1 mt-3">
          {days.map((d, idx) => {
            const isCompleted = activeDays.includes(d.key)
            const isSunday = d.key === 'D'

            return (
              <motion.div
                key={d.key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + idx * 0.04 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                  {d.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : isSunday
                      ? 'border-2 border-dashed border-amber-500/60 text-amber-600 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'bg-[var(--surface-subtle)] text-[var(--text-muted)]'
                  }`}
                  title={isCompleted ? `${d.label}: Práctica completada` : `${d.label}: Pendiente`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : isSunday ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  ) : (
                    <span>•</span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer Milestone */}
      <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-medium">
        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Próximo hito: <strong className="text-[var(--text)]">{nextMilestone}</strong></span>
      </div>
    </motion.div>
  )
}
