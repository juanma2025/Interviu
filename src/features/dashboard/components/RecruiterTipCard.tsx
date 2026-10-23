import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

export function RecruiterTipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.25 }}
      whileHover={{ y: -2 }}
      className="rounded-[20px] bg-gradient-to-br from-emerald-50/60 to-teal-50/40 dark:from-[#172E27]/50 dark:to-[#11241E]/30 border border-emerald-900/10 dark:border-emerald-800/30 p-5 shadow-xs flex flex-col justify-between gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
        <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-900 dark:text-emerald-300">
          Consejo del día de reclutadores
        </span>
      </div>

      {/* Quote */}
      <p className="text-xs leading-relaxed text-[var(--text)] italic font-medium">
        “Si no sabes la solución exacta al instante, verbaliza tu razonamiento en voz alta. Los evaluadores senior valoran la transparencia del proceso mental por encima del código memorizado.”
      </p>

      {/* Footer */}
      <div className="pt-2 border-t border-emerald-900/10 dark:border-emerald-800/20 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-medium">
        <span>Fuente: Staff Eng Panel 2025</span>
        <button
          onClick={() => alert('Próximamente: Archivo completo de consejos de reclutadores')}
          className="text-[var(--accent)] font-semibold hover:underline cursor-pointer"
        >
          Ver más consejos
        </button>
      </div>
    </motion.div>
  )
}
