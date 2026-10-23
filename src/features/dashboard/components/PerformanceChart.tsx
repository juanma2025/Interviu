import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

interface WeekData {
  label: string
  score: number
  isCurrent?: boolean
}

export function PerformanceChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const data: WeekData[] = [
    { label: 'S-1', score: 6.8 },
    { label: 'S-2', score: 7.2 },
    { label: 'S-3', score: 7.5 },
    { label: 'S-4', score: 7.8 },
    { label: 'S-5', score: 8.1 },
    { label: 'Actual', score: 8.4, isCurrent: true },
  ]

  const maxScore = 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.2 }}
      className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs p-5 flex flex-col justify-between gap-5"
    >
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-[var(--text)] tracking-tight">
            Evolución de Desempeño
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Puntaje global consolidado en las últimas 6 semanas
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8D3C4] dark:bg-[#487B6C]" />
            <span>Promedio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--text)]">Tu puntaje</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="h-48 pt-6 pb-2 px-2 flex items-end justify-between gap-3 sm:gap-6 border-b border-[var(--line-subtle)] relative">
        {data.map((item, idx) => {
          const heightPercent = (item.score / maxScore) * 100
          const isHovered = hoveredIndex === idx

          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
            >
              {/* Tooltip / Value on top */}
              {item.isCurrent || isHovered ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute -top-7 px-2 py-0.5 rounded-full text-[11px] font-bold font-mono shadow-xs pointer-events-none transition-colors ${
                    item.isCurrent
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--surface-subtle)] text-[var(--text)] border border-[var(--line)]'
                  }`}
                >
                  {item.score.toFixed(1)}
                </motion.div>
              ) : null}

              {/* Bar */}
              <div className="w-full max-w-[48px] h-full flex items-end justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                    delay: 0.1 + idx * 0.05,
                  }}
                  className={`w-full rounded-t-[10px] transition-all duration-200 ${
                    item.isCurrent
                      ? 'bg-[var(--accent)] shadow-xs group-hover:bg-[var(--accent-hover)]'
                      : 'bg-[#B4D7CC] dark:bg-[#345A4F] group-hover:bg-[#97C5B6] dark:group-hover:bg-[#437466]'
                  } ${isHovered ? 'scale-y-[1.02] origin-bottom' : ''}`}
                />
              </div>

              {/* X-Axis Label */}
              <span
                className={`text-xs mt-2 transition-colors ${
                  item.isCurrent
                    ? 'font-bold text-[var(--accent)]'
                    : 'font-medium text-[var(--text-muted)] group-hover:text-[var(--text)]'
                }`}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer Navigation & Trend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium text-[var(--text-muted)]">
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
          Ritmo ascendente sostenido (+61% acumulado)
        </span>
        <Link
          to="/app/progreso"
          className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold"
        >
          <span>Ver reporte detallado</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}
