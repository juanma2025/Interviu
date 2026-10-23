import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, RotateCcw, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'
import { Timer } from '../../components/patterns/Timer.js'
import { Toast } from '../../components/ui/Toast.js'

interface PracticeQuestion {
  id: string
  category: 'comportamiento' | 'tecnica' | 'sistemas' | 'cierre'
  text: string
  estimatedSeconds: number
  tip: string
  role: string
}

export function PracticePage() {
  const questions: PracticeQuestion[] = [
    {
      id: 'q1',
      category: 'tecnica',
      role: 'Frontend / Fullstack',
      text: '¿Cómo explicarías qué es una API a una persona no técnica y cómo optimizas una consulta lenta?',
      estimatedSeconds: 180,
      tip: 'Usa una analogía cotidiana para la API y principios concretos de indexación o caché para la optimización.',
    },
    {
      id: 'q2',
      category: 'comportamiento',
      role: 'General Tech',
      text: 'Cuéntame sobre una ocasión en la que tuviste que aprender una nueva tecnología en poco tiempo para cumplir con un plazo.',
      estimatedSeconds: 180,
      tip: 'Estructura con el método STAR: situación de inicio, objetivo concreto, pasos tomados y métrica de éxito alcanzada.',
    },
    {
      id: 'q3',
      category: 'sistemas',
      role: 'Backend / Infra',
      text: '¿Cómo diseñarías una cola de mensajes distribuida tolerante a fallos y con entrega al menos una vez?',
      estimatedSeconds: 300,
      tip: 'Aborda particionado de particiones, replicación de brokers, confirmaciones ACK y descarte de duplicados.',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerText, setAnswerText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number
    star: { situation: string; task: string; action: string; result: string }
    advice: string
  } | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const activeQuestion = questions[currentIndex]

  const handleEvaluate = () => {
    if (!answerText.trim() || answerText.length < 20) {
      setToastMessage('Escribe una respuesta más desarrollada antes de evaluar.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setEvaluationResult({
        score: 8.8,
        star: {
          situation: 'Contexto claro definiendo la necesidad técnica inmediata.',
          task: 'Responsabilidad asignada con métricas de objetivo explícitas.',
          action: 'Estrategia de arquitectura fundamentada en estándares modernos.',
          result: 'Entrega en tiempo con reducción medible de latencia y riesgo.',
        },
        advice: 'Gran estructuración. Considera agregar una breve mención al impacto en la experiencia del cliente final.',
      })
      setToastMessage('¡Respuesta evaluada exitosamente con el método STAR!')
    }, 1500)
  }

  const handleNext = () => {
    setEvaluationResult(null)
    setAnswerText('')
    setCurrentIndex((prev) => (prev + 1) % questions.length)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text)] tracking-tight">
            Prácticas Guiadas
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Pregunta {currentIndex + 1} de {questions.length} • Formato estándar STAR
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Timer formattedTime="02:45" isRunning={true} />
        </div>
      </div>

      {/* Active Question Box */}
      <motion.div
        key={activeQuestion.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
            {activeQuestion.category}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            • {activeQuestion.role} • Tiempo sugerido: {activeQuestion.estimatedSeconds / 60} min
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-snug">
          “{activeQuestion.text}”
        </h2>

        <div className="p-3.5 rounded-[16px] bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-900/10 dark:border-emerald-800/30 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p><strong>Consejo de respuesta:</strong> {activeQuestion.tip}</p>
        </div>
      </motion.div>

      {/* Answer Workspace & Evaluation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">
                Tu Respuesta
              </label>
              <button
                type="button"
                onClick={() =>
                  setAnswerText(
                    'En mi último proyecto como Frontend Lead, detectamos que la latencia en las vistas analíticas excedía 3 segundos. Mi objetivo fue optimizar el renderizado sin comprometer la precisión. Implementé virtualización de listas con @tanstack/virtual y memoricé selectores con Reselect. El resultado fue una reducción del 70% en tiempo de carga inicial y cero quejas de los usuarios en el siguiente release.'
                  )
                }
                className="text-xs text-[var(--accent)] font-semibold hover:underline cursor-pointer"
              >
                Cargar respuesta de ejemplo
              </button>
            </div>

            <textarea
              rows={8}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Escribe tu respuesta estructurada (describe la Situación, Tarea, Acción y Resultado)..."
              className="w-full p-4 rounded-[16px] bg-[var(--surface-subtle)]/40 border border-[var(--line-subtle)] text-xs sm:text-sm text-[var(--text)] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[var(--text-muted)]">
                {answerText.split(/\s+/).filter(Boolean).length} palabras
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAnswerText('')}
                  className="tap-target px-3 py-2 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  onClick={handleEvaluate}
                  className="tap-target px-5 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Evaluando con Claude...' : 'Evaluar con IA (STAR)'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant STAR Evaluation Feedback */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--line)] p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
              <span>Diagnóstico STAR de IA</span>
            </h3>

            {evaluationResult ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-[16px] bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Puntaje Obtenido
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    {evaluationResult.score} / 10
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-[12px] bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                    <strong className="text-sky-800 dark:text-sky-300 block mb-0.5">S • Situación:</strong>
                    <span className="text-[var(--text)]">{evaluationResult.star.situation}</span>
                  </div>
                  <div className="p-2.5 rounded-[12px] bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                    <strong className="text-amber-800 dark:text-amber-300 block mb-0.5">T • Tarea:</strong>
                    <span className="text-[var(--text)]">{evaluationResult.star.task}</span>
                  </div>
                  <div className="p-2.5 rounded-[12px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                    <strong className="text-emerald-800 dark:text-emerald-300 block mb-0.5">A • Acción:</strong>
                    <span className="text-[var(--text)]">{evaluationResult.star.action}</span>
                  </div>
                  <div className="p-2.5 rounded-[12px] bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                    <strong className="text-purple-800 dark:text-purple-300 block mb-0.5">R • Resultado:</strong>
                    <span className="text-[var(--text)]">{evaluationResult.star.result}</span>
                  </div>
                </div>

                <div className="p-3 rounded-[14px] bg-[#FFF8F0] dark:bg-[#2B2319] border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
                  <strong>Recomendación:</strong> {evaluationResult.advice}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full tap-target py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Siguiente Pregunta</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 text-[var(--text-muted)]">
                <Sparkles className="w-8 h-8 text-[var(--accent)]/50 animate-pulse" />
                <p className="text-xs font-medium max-w-xs">
                  Redacta tu respuesta y pulsa "Evaluar con IA" para recibir el desglose modular y sugerencias de mejora.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage || ''}
        isVisible={Boolean(toastMessage)}
        onClose={() => setToastMessage(null)}
        type="success"
      />
    </div>
  )
}
