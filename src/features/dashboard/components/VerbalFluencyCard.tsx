import { motion } from 'motion/react'
import { AudioWaveform, Check } from 'lucide-react'

export interface VerbalFluencyCardProps {
  wordsPerMinute?: number
  cadenceStatus?: string
  description?: string
}

export function VerbalFluencyCard({
  wordsPerMinute = 128,
  cadenceStatus = 'Cadencia óptima',
  description = 'Pausas controladas (<1.8s) y densidad discursiva balanceada.',
}: VerbalFluencyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.15 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4 transition-shadow hover:shadow-md cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-muted)] tracking-tight">
          Fluidez Verbal
        </span>
        <div className="w-7 h-7 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <AudioWaveform className="w-4 h-4" />
        </div>
      </div>

      {/* Main Metric & Status Badge */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-[var(--text)] font-mono">
            {wordsPerMinute}
          </span>
          <span className="text-sm font-semibold text-[var(--text-muted)]">ppm</span>
        </div>

        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <Check className="w-3 h-3 stroke-[2.5]" />
          <span>{cadenceStatus}</span>
        </div>
      </div>

      {/* Description Footer */}
      <div className="pt-2 border-t border-[var(--line-subtle)] text-[11px] leading-relaxed text-[var(--text-muted)] font-medium">
        {description}
      </div>
    </motion.div>
  )
}
