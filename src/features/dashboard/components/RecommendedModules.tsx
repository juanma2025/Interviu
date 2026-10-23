import { motion } from 'motion/react'
import { Sparkles, Clock, ArrowRight } from 'lucide-react'

export interface RecommendedModuleItem {
  id: string
  category: string
  durationMinutes: number
  title: string
  description: string
  badgeColor: string
}

export function RecommendedModules({ onSelectModule }: { onSelectModule?: (id: string) => void }) {
  const modules: RecommendedModuleItem[] = [
    {
      id: 'mod-1',
      category: 'Comunicación',
      durationMinutes: 5,
      title: 'Manejo de preguntas sobre fallos pasados',
      description: 'Domina la técnica de reencuadre positivo sin evadir la responsabilidad.',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
    },
    {
      id: 'mod-2',
      category: 'Arquitectura',
      durationMinutes: 15,
      title: 'Renderizado Condicional y Re-renders en React',
      description: "Estrategias de memoización limpia ('useMemo', 'useCallback') ante carga alta.",
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300',
    },
    {
      id: 'mod-3',
      category: 'Algoritmos',
      durationMinutes: 10,
      title: 'Manipulación de Árboles y DOM Virtual',
      description: 'Resolución de ejercicios prácticos de recursividad comunes en big tech.',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.15 }}
      className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--text)] tracking-tight">
          Módulos recomendados
        </h3>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Prioridad IA</span>
        </span>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onSelectModule?.(mod.id)}
            className="p-3.5 rounded-[16px] bg-[var(--surface-subtle)]/40 hover:bg-[var(--surface-subtle)] border border-[var(--line-subtle)] hover:border-emerald-700/20 transition-all cursor-pointer group"
          >
            {/* Meta badges */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${mod.badgeColor}`}>
                {mod.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-medium">
                <Clock className="w-3 h-3" />
                <span>{mod.durationMinutes} min</span>
              </span>
            </div>

            {/* Title */}
            <h4 className="text-xs font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
              {mod.title}
            </h4>

            {/* Description */}
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-1 line-clamp-2">
              {mod.description}
            </p>

            {/* Action Link */}
            <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:underline">
              <span>Practicar ahora</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
