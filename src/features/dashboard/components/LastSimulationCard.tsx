import { useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, Clock, HelpCircle, Lightbulb, Sparkles } from 'lucide-react'

export interface StarSegment {
  key: 'S' | 'T' | 'A' | 'R'
  title: string
  badge: string
  text: string
  color: {
    bg: string
    badgeBg: string
    badgeText: string
    border: string
    dot: string
  }
}

export function LastSimulationCard() {
  const [activeStarKey, setActiveStarKey] = useState<string | null>(null)

  const starSegments: StarSegment[] = [
    {
      key: 'S',
      title: 'Situación',
      badge: 'Contexto rápido',
      text: 'En nuestra app de pagos recibíamos quejas recurrentes sobre tiempos de espera altos en el panel principal durante horas pico...',
      color: {
        bg: 'hover:bg-sky-50/60 dark:hover:bg-sky-950/20',
        badgeBg: 'bg-sky-100 dark:bg-sky-950/70',
        badgeText: 'text-sky-800 dark:text-sky-300',
        border: 'border-sky-200 dark:border-sky-900/50',
        dot: 'bg-sky-500',
      },
    },
    {
      key: 'T',
      title: 'Tarea',
      badge: 'Objetivo técnico individual',
      text: 'Mi responsabilidad fue identificar el cuello de botella exacto en los endpoints críticos sin interrumpir el flujo constante de transacciones.',
      color: {
        bg: 'hover:bg-amber-50/60 dark:hover:bg-amber-950/20',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/70',
        badgeText: 'text-amber-800 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-900/50',
        dot: 'bg-amber-500',
      },
    },
    {
      key: 'A',
      title: 'Acción',
      badge: 'Resolución de ingeniería',
      text: 'Implementé un índice compuesto en PostgreSQL analizando con EXPLAIN ANALYZE y sumé una capa de caché Redis para consultas idempotentes.',
      color: {
        bg: 'hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70',
        badgeText: 'text-emerald-800 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-900/50',
        dot: 'bg-emerald-500',
      },
    },
    {
      key: 'R',
      title: 'Resultado',
      badge: 'Impacto medible',
      text: 'Redujimos la latencia del percentil 95 (P95) de 2.4 segundos a 180ms de forma continua y estable.',
      color: {
        bg: 'hover:bg-purple-50/60 dark:hover:bg-purple-950/20',
        badgeBg: 'bg-purple-100 dark:bg-purple-950/70',
        badgeText: 'text-purple-800 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-900/50',
        dot: 'bg-purple-500',
      },
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.15 }}
      className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs overflow-hidden flex flex-col"
    >
      {/* Top Header */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-[var(--line-subtle)]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-base font-bold text-[var(--text)] tracking-tight">
            Última simulación evaluada
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-subtle)] border border-[var(--line-subtle)]">
          <Clock className="w-3.5 h-3.5" />
          <span>Ayer a las 18:40</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Question Header Card */}
        <div className="rounded-[16px] border border-emerald-900/10 dark:border-emerald-800/30 overflow-hidden bg-white dark:bg-[#172522]">
          <div className="bg-[#EAF3EE] dark:bg-[#1E342D] px-4 py-2 flex items-center gap-2 text-[11px] font-bold text-[var(--accent)] tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pregunta técnica y de comunicación</span>
          </div>
          <div className="p-4">
            <p className="text-base font-semibold text-[var(--text)] leading-snug">
              “¿Cómo explicarías qué es una API a una persona no técnica y cómo optimizas una consulta lenta?”
            </p>
          </div>
        </div>

        {/* Section Subhead */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-[var(--text-muted)] tracking-wider uppercase">
            Desglose frase a frase (Método STAR)
          </span>
          <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full">
            Calificación modular: 9.1 / 10
          </span>
        </div>

        {/* 4 STAR Breakdown Cards */}
        <div className="space-y-2.5">
          {starSegments.map((segment) => {
            const isHovered = activeStarKey === segment.key

            return (
              <motion.div
                key={segment.key}
                onMouseEnter={() => setActiveStarKey(segment.key)}
                onMouseLeave={() => setActiveStarKey(null)}
                whileHover={{ scale: 1.006, transition: { duration: 0.15 } }}
                className={`p-3.5 rounded-[14px] border border-[var(--line)] bg-[var(--surface-subtle)]/40 transition-colors ${
                  segment.color.bg
                } ${isHovered ? 'shadow-xs border-slate-300 dark:border-slate-700' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text)]">
                      {segment.key} • {segment.title}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${segment.color.badgeBg} ${segment.color.badgeText}`}
                    >
                      {segment.badge}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${segment.color.dot}`} />
                </div>
                <p className="text-xs leading-relaxed text-[var(--text)] font-normal">
                  {segment.text}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Feedback Opportunity Highlight Box */}
        <motion.div
          whileHover={{ scale: 1.008 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-4 rounded-[16px] bg-[#FFF8F0] dark:bg-[#2B2319] border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3 shadow-xs"
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Oportunidad de mejora identificada
              </span>
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <p className="text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              Excelente cadencia y claridad técnica. Podrías reforzar el impacto de negocio final: ¿cómo se tradujo esa reducción de latencia en menor abandono del carrito o ahorro en costos de infraestructura?
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
