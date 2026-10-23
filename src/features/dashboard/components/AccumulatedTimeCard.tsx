import { motion } from 'motion/react'
import { Clock } from 'lucide-react'

export interface AccumulatedTimeCardProps {
  totalHours?: number
  totalSessions?: number
  currentWeeklyHours?: number
  targetWeeklyHours?: number
}

export function AccumulatedTimeCard({
  totalHours = 14.5,
  totalSessions = 28,
  currentWeeklyHours = 3.6,
  targetWeeklyHours = 5.0,
}: AccumulatedTimeCardProps) {
  const percentage = Math.min(Math.round((currentWeeklyHours / targetWeeklyHours) * 100), 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.1 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4 transition-shadow hover:shadow-md cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-muted)] tracking-tight">
          Tiempo Acumulado
        </span>
        <div className="w-7 h-7 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Main Metric */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight text-[var(--text)] font-mono">
            {totalHours.toFixed(1)}
          </span>
          <span className="text-sm font-semibold text-[var(--text-muted)]">hrs</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>{totalSessions} sesiones completadas en total</span>
        </div>
      </div>

      {/* Weekly Progress Bar */}
      <div className="pt-2 border-t border-[var(--line-subtle)] space-y-1.5">
        <div className="flex justify-between items-center text-[11px] font-medium text-[var(--text-muted)]">
          <span>{currentWeeklyHours} / {targetWeeklyHours} hrs semanales</span>
          <span className="font-semibold text-[var(--text)]">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--surface-subtle)] rounded-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="h-full bg-[var(--accent)] rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
