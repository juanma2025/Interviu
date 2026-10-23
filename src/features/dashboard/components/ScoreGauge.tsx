import { motion } from 'motion/react'
import { Target, TrendingUp } from 'lucide-react'

export interface ScoreGaugeProps {
  score?: number
  maxScore?: number
  targetScore?: number
  trend?: string
  status?: string
}

export function ScoreGauge({
  score = 8.4,
  maxScore = 10,
  targetScore = 9.0,
  trend = '+0.8 este mes',
  status = 'Estructura sólida',
}: ScoreGaugeProps) {
  // SVG gauge constants
  const size = 100
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progressRatio = Math.min(Math.max(score / maxScore, 0), 1)
  const strokeDashoffset = circumference - progressRatio * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4 transition-shadow hover:shadow-md relative overflow-hidden group cursor-pointer"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-muted)] tracking-tight">
          Puntaje STAR Global
        </span>
        <div className="w-7 h-7 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <Target className="w-4 h-4" />
        </div>
      </div>

      {/* Main Gauge & Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-[84px] h-[84px] shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--line-subtle)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--accent)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
              className="text-2xl font-bold tracking-tight text-[var(--text)] font-mono"
            >
              {score.toFixed(1)}
            </motion.span>
          </div>
        </div>

        {/* Labels & Trend */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-sm font-semibold text-[var(--text)] leading-tight">
            {status}
          </span>
          <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>{trend}</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-medium">
        <span>Escala 1 - {maxScore}</span>
        <span className="font-semibold text-[var(--text)]">Meta: {targetScore.toFixed(1)}</span>
      </div>
    </motion.div>
  )
}
