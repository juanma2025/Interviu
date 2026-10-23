import { useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Award, Filter } from 'lucide-react'
import { Tabs } from '../../features/tabs/components/Tabs.js'

export function ProgressPage() {
  const [selectedFilter, setSelectedFilter] = useState<'todo' | 'comportamiento' | 'tecnica' | 'sistemas'>('todo')

  const sessionsHistory = [
    {
      id: 'ses-1',
      date: 'Hoy, 14:20',
      category: 'Técnica',
      role: 'Frontend (React/TS)',
      score: 9.1,
      passing: true,
      duration: '4m 12s',
      question: '¿Cómo explicarías qué es una API a una persona no técnica y cómo optimizas una consulta lenta?',
    },
    {
      id: 'ses-2',
      date: 'Ayer, 18:40',
      category: 'Comportamiento',
      role: 'Fullstack',
      score: 8.4,
      passing: true,
      duration: '3m 45s',
      question: 'Cuéntame sobre una ocasión en la que tuviste que aprender una nueva tecnología en poco tiempo.',
    },
    {
      id: 'ses-3',
      date: 'Hace 3 días',
      category: 'Sistemas',
      role: 'Backend',
      score: 7.8,
      passing: true,
      duration: '5m 30s',
      question: '¿Cómo diseñarías una cola de mensajes distribuida tolerante a fallos y con entrega al menos una vez?',
    },
    {
      id: 'ses-4',
      date: 'Hace 5 días',
      category: 'Técnica',
      role: 'Frontend',
      score: 7.2,
      passing: true,
      duration: '3m 10s',
      question: 'Explica el ciclo de renderizado de React y cómo evitar renders innecesarios con hooks.',
    },
    {
      id: 'ses-5',
      date: 'Hace 1 semana',
      category: 'Comportamiento',
      role: 'Leadership',
      score: 6.9,
      passing: false,
      duration: '4m 00s',
      question: 'Describe un desacuerdo técnico con un compañero y cómo llegaste a un consenso.',
    },
  ]

  const categoryAverages = [
    { name: 'Comportamiento (STAR)', score: 8.8, percentage: 88, color: 'bg-emerald-600' },
    { name: 'Técnica & Lenguajes', score: 8.2, percentage: 82, color: 'bg-teal-600' },
    { name: 'Diseño de Sistemas', score: 7.5, percentage: 75, color: 'bg-sky-600' },
    { name: 'Cierre & Preguntas', score: 9.0, percentage: 90, color: 'bg-purple-600' },
  ]

  const progressTabs = [
    { id: 'resumen', label: 'Resumen Global' },
    { id: 'historial', label: 'Historial de Simulaciones' },
    { id: 'categorias', label: 'Desglose por Categoría' },
  ]

  const filteredHistory = sessionsHistory.filter((s) => {
    if (selectedFilter === 'todo') return true
    return s.category.toLowerCase() === selectedFilter
  })

  const progressPanels = [
    {
      id: 'resumen',
      content: (
        <div className="space-y-6 pt-4">
          {/* Top 3 KPI Cards matching Image 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                <span>VOLUMEN ACUMULADO</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold font-mono text-[var(--text)]">24</span>
                <span className="text-sm font-semibold text-[var(--text-muted)]">entrevistas</span>
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                Ritmo sostenido semanal
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                <span>CALIFICACIÓN MEDIA</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold font-mono text-[var(--text)]">7.4</span>
                <span className="text-sm font-semibold text-[var(--text-muted)]">promedio / 10</span>
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                +1.2 vs tus primeras sesiones
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                <span>HABITO Y DISCIPLINA</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold font-mono text-[var(--text)]">6</span>
                <span className="text-sm font-semibold text-[var(--text-muted)]">días de racha</span>
              </div>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                La constancia genera naturalidad
              </span>
            </motion.div>
          </div>

          {/* Weekly Bar Chart & Milestone Overview */}
          <div className="p-6 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[var(--text)]">
                  Evaluaciones Semanales
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Curva de aprendizaje STAR y evolución temporal
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                +35% vs mes anterior
              </span>
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-[var(--line-subtle)] pb-2">
              {[
                { label: 'Sem 1', score: 5.2 },
                { label: 'Sem 2', score: 6.0 },
                { label: 'Sem 3', score: 6.8 },
                { label: 'Sem 4', score: 7.2 },
                { label: 'Sem 5', score: 7.8 },
                { label: 'Actual', score: 8.4, active: true },
              ].map((b, i) => (
                <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <span className="text-[11px] font-bold font-mono mb-1 text-[var(--text-muted)] group-hover:text-[var(--text)]">
                    {b.score.toFixed(1)}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(b.score / 10) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.05 }}
                    className={`w-full max-w-[44px] rounded-t-[10px] ${
                      b.active ? 'bg-[var(--accent)]' : 'bg-[#B2D8CD] dark:bg-[#2C5247]'
                    }`}
                  />
                  <span className="text-[11px] font-medium text-[var(--text-muted)] mt-2">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'historial',
      content: (
        <div className="space-y-4 pt-4">
          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrar:</span>
            </span>
            {(['todo', 'comportamiento', 'tecnica', 'sistemas'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Session Cards */}
          <div className="space-y-3">
            {filteredHistory.map((ses) => (
              <motion.div
                key={ses.id}
                whileHover={{ y: -2 }}
                className="p-4 rounded-[18px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      {ses.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">• {ses.role}</span>
                    <span className="text-xs text-[var(--text-muted)]">• {ses.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[var(--text)] leading-snug">
                    {ses.question}
                  </h4>
                  <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-2">
                    <span>Duración de respuesta: {ses.duration}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-mono text-[var(--text)]">
                      {ses.score.toFixed(1)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">/ 10</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ses.passing
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {ses.passing ? 'Aprobado' : 'Ajustar STAR'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'categorias',
      content: (
        <div className="space-y-5 pt-4">
          <div className="p-6 rounded-[24px] bg-[var(--surface)] border border-[var(--line)] shadow-xs space-y-6">
            <h3 className="text-base font-bold text-[var(--text)]">
              Dominio por Competencia
            </h3>

            <div className="space-y-4">
              {categoryAverages.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[var(--text)]">{cat.name}</span>
                    <span className="font-mono text-[var(--accent)]">{cat.percentage}% ({cat.score} / 10)</span>
                  </div>
                  <div className="h-2.5 w-full bg-[var(--surface-subtle)] rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text)] tracking-tight">
            Métricas y Progreso
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            El progreso que se ve se convierte en confianza para tu entrevista real.
          </p>
        </div>
      </div>

      <Tabs tabs={progressTabs} panels={progressPanels} syncUrlParam="view" />
    </div>
  )
}
