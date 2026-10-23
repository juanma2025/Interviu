import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Send,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Search,
} from 'lucide-react'

export interface HelpQuery {
  id: string
  question: string
  category: 'star' | 'tecnica' | 'sistemas' | 'carrera'
  answer: string
  date: string
  suggestedAction?: string
}

const PRESET_DOUBTS: HelpQuery[] = [
  {
    id: 'h1',
    question: '¿Cómo estructuro una respuesta STAR si no tengo métricas numéricas exactas del resultado?',
    category: 'star',
    answer:
      'Cuando no dispongas de números precisos, enfócate en el impacto cualitativo y el cambio de estado: (1) Adopción interna por el equipo, (2) Reducción de fricción o quejas de soporte, (3) Eliminación de bloqueos técnicos, o (4) Aprobación en auditoría sin observaciones. Describe el "antes vs después" con honestidad profesional.',
    date: 'Hace 10 min',
    suggestedAction: 'Practica el módulo de "Manejo de preguntas sobre fallos pasados"',
  },
  {
    id: 'h2',
    question: '¿Qué diferencia a un candidato Mid de uno Senior en la entrevista de diseño de sistemas?',
    category: 'sistemas',
    answer:
      'Un candidato Mid suele centrarse en elegir componentes (ej. "usamos Kafka y Redis"). Un candidato Senior inicia clarificando requisitos funcionales y no funcionales (SLAs, throughput, RPO/RTO), discute trade-offs (consistencia eventual vs fuerte), justifica costos operativos y diseña considerando modos de falla y degradación elegante.',
    date: 'Hace 1 hora',
    suggestedAction: 'Revisa la simulación con Elena R. sobre arquitectura distribuida',
  },
  {
    id: 'h3',
    question: '¿Cómo responder a la pregunta: "¿Cuál es tu mayor debilidad técnica?" sin sonar cliché?',
    category: 'carrera',
    answer:
      'Aplica el principio de vulnerabilidad constructiva: Elige una competencia técnica real pero no descalificante para el rol actual, explica cuándo te diste cuenta de esa limitación y demuestra qué plan deliberado estás ejecutando para solventarla (cursos, proyectos laterales, lecturas de documentación profunda).',
    date: 'Ayer',
    suggestedAction: 'Usa el simulador comportamental con Carlos M.',
  },
]

export function AiHelpDesk() {
  const [queries, setQueries] = useState<HelpQuery[]>(PRESET_DOUBTS)
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'star' | 'tecnica' | 'sistemas' | 'carrera'>('star')
  const [isThinking, setIsThinking] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const quickPrompts = [
    '¿Cómo responder si no sé la solución exacta en vivo?',
    '¿Cómo abordar un caso de indexación lenta en PostgreSQL?',
    '¿Qué preguntas debo hacerle al entrevistador al final?',
    '¿Cómo justificar un cambio de trabajo tras pocos meses?',
  ]

  const handleAskAI = (questionToAsk?: string) => {
    const text = questionToAsk || inputText
    if (!text.trim()) return

    setIsThinking(true)

    // Simulate AI Agent reasoning & response
    setTimeout(() => {
      let customAnswer = ''
      let action = 'Explora los módulos guiados en la sección de Prácticas'

      if (text.toLowerCase().includes('no sé') || text.toLowerCase().includes('solución')) {
        customAnswer =
          'Aplica la regla de oro de la honestidad transparente: (1) Reconoce con calma que no has utilizado esa API o solución específica recientemente, (2) Explica qué fundamentos transferibles utilizarías para deducirla, (3) Haz preguntas aclaratorias al entrevistador y verbaliza tu razonamiento en voz alta. Los evaluadores senior valoran mucho más un proceso deductivo estructurado que una respuesta memorizada.'
        action = 'Ver consejo del día de reclutadores en tu Dashboard'
      } else if (text.toLowerCase().includes('pregunta') && text.toLowerCase().includes('final')) {
        customAnswer =
          'Evita preguntas genéricas de RRHH. Haz preguntas de alto impacto técnico: "1) ¿Cuál es el mayor reto técnico o deuda de arquitectura que enfrentará el equipo este trimestre?", "2) ¿Cómo es su ciclo de despliegue a producción y qué sucede cuando un test falla?", "3) ¿Qué métricas definen el éxito para esta posición en los primeros 90 días?".'
        action = 'Practica la categoría Cierre en el banco de preguntas'
      } else if (text.toLowerCase().includes('postgresql') || text.toLowerCase().includes('lenta')) {
        customAnswer =
          'Pasos sistemáticos para optimizar: (1) Ejecuta EXPLAIN (ANALYZE, BUFFERS) para detectar sequential scans, (2) Analiza índices B-Tree vs GIN/BRIN según el tipo de dato, (3) Revisa bloat y estadísticas con VACUUM ANALYZE, (4) Aplica caché con Redis para consultas de solo lectura con alta concurrencia.'
        action = 'Revisa tu última simulación evaluada en el Dashboard'
      } else {
        customAnswer = `El agente de IA de Interviu ha analizado tu duda: "${text}". Para abordar esta situación en tu entrevista, estructura tu respuesta con serenidad y base técnica. Comunica con el método STAR (Situación, Tarea, Acción y Resultado), destaca las decisiones arquitectónicas que tomaste y los aprendizajes que enriquecen tu perfil profesional.`
      }

      const newQuery: HelpQuery = {
        id: `h-${Date.now()}`,
        question: text,
        category: selectedCategory,
        answer: customAnswer,
        date: 'Recién respondido por Agente IA',
        suggestedAction: action,
      }

      setQueries([newQuery, ...queries])
      setInputText('')
      setIsThinking(false)
    }, 1200)
  }

  const filteredQueries = queries.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] bg-gradient-to-br from-[#1F4337] to-[#122A22] text-white p-6 sm:p-8 shadow-md relative overflow-hidden"
      >
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            <Bot className="w-3.5 h-3.5" />
            <span>Agente de Inteligencia Artificial Activo 24/7</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Buzón de Ayuda y Resolución de Dudas Técnicas
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Plantea cualquier inquietud sobre preparación de entrevistas, estructuración STAR, dudas conceptuales o situaciones laborales. El agente de IA te responderá con criterio de comités de contratación senior.
          </p>
        </div>

        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </motion.div>

      {/* Input Box to Ask the AI Agent */}
      <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span>Hacer una consulta al Agente de IA</span>
          </span>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">Categoría:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--line-subtle)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              <option value="star">Estructura STAR</option>
              <option value="tecnica">Pregunta Técnica</option>
              <option value="sistemas">Diseño de Sistemas</option>
              <option value="carrera">Estrategia & Carrera</option>
            </select>
          </div>
        </div>

        {/* Input Textarea & Submit */}
        <div className="relative">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAskAI()
              }
            }}
            placeholder="Escribe aquí tu duda (ej: ¿Cómo responder a una pregunta sobre un error grave en producción?)..."
            className="w-full p-4 rounded-[16px] bg-[var(--surface-subtle)]/40 border border-[var(--line-subtle)] text-xs sm:text-sm text-[var(--text)] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-[var(--text-muted)] font-medium mr-1">Sugerencias rápidas:</span>
              {quickPrompts.slice(0, 2).map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAskAI(prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--accent-soft)] transition-colors cursor-pointer text-left truncate max-w-[280px]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isThinking || !inputText.trim()}
              onClick={() => handleAskAI()}
              className="tap-target px-5 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all shrink-0"
            >
              {isThinking ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>El agente está respondiendo...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar consulta</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Doubts and AI Answers Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
            <h3 className="text-base font-bold text-[var(--text)]">
              Consultas y Resoluciones del Agente ({filteredQueries.length})
            </h3>
          </div>

          {/* Search bar inside queries */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el buzón..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-[var(--surface)] border border-[var(--line-subtle)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
        </div>

        {/* List of answered doubts */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredQueries.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] shadow-xs p-5 sm:p-6 space-y-4"
              >
                {/* User's question box */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-[var(--accent)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        {item.category.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text)] leading-snug">
                      “{item.question}”
                    </h4>
                  </div>
                </div>

                {/* AI Agent's structured resolution */}
                <div className="p-4 rounded-[18px] bg-[#F7FAF9] dark:bg-[#162722] border border-emerald-900/10 dark:border-emerald-800/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent)]">
                      <span>Resolución del Agente de IA</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text)] font-normal">
                      {item.answer}
                    </p>

                    {item.suggestedAction && (
                      <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                        <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>Sugerencia práctica: {item.suggestedAction}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
