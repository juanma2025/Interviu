import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router'
import {
  Sparkles,
  CheckCircle2,
  Volume2,
  Brain,
  Layers,
  BarChart3,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { PublicNavbar } from '../../components/layout/PublicNavbar.js'
import { PublicFooter } from '../../components/layout/PublicFooter.js'

interface StarExample {
  title: string
  role: string
  situation: string
  task: string
  action: string
  result: string
  score: number
  wpm: number
  recruiterTip: string
}

const STAR_EXAMPLES: Record<string, StarExample> = {
  backend: {
    title: 'Incidente de latencia en Kafka y Base de Datos',
    role: 'Senior Backend Engineer',
    situation: 'Durante el Black Friday, los workers de procesamiento de eventos en Kafka acumularon un retraso de 15 minutos debido a bloqueos de transacciones en PostgreSQL.',
    task: 'Mi objetivo era restablecer el procesamiento en tiempo real en menos de 30 minutos sin perder ningún evento de pago ni duplicar transacciones.',
    action: 'Aislé las particiones afectadas, escalé horizontalmente los consumidores con particionado idempotente y modifiqué el isolation level de las transacciones a READ COMMITTED con un lock timeout estricto de 2s.',
    result: 'El lag bajó a menos de 80ms en 18 minutos. Documenté un post-mortem con métricas en Grafana y creamos alertas proactivas que evitaron incidentes en los siguientes 3 trimestres.',
    score: 9.6,
    wpm: 134,
    recruiterTip: 'Excelente balance entre decisión técnica concreta e impacto cuantificable con métricas.',
  },
  frontend: {
    title: 'Optimización de Core Web Vitals en Checkout masivo',
    role: 'Staff Frontend Engineer',
    situation: 'La tasa de conversión del checkout cayó un 4% tras un rediseño que introdujo un Largest Contentful Paint (LCP) de 4.2 segundos en dispositivos móviles.',
    task: 'Debía diagnosticar los cuellos de botella de renderizado y llevar el LCP a menos de 2.0s antes de la campaña de verano.',
    action: 'Auditamos con Chrome DevTools y Lighthouse. Dividí los bundles pesados con import dinámico, extraje los CSS críticos para inlined render y reemplacé librerías pesadas de animaciones por transformaciones CSS nativas por GPU.',
    result: 'El LCP se redujo a 1.6s (-62%), el bundle inicial cayó un 45% y la conversión aumentó un 6.3% en el primer mes de despliegue.',
    score: 9.4,
    wpm: 128,
    recruiterTip: 'Mencionar herramientas específicas (DevTools, Lighthouse) y resultados de negocio da máxima credibilidad.',
  },
  architecture: {
    title: 'Desacuerdo de arquitectura con Tech Lead sobre Microservicios',
    role: 'Lead Architect',
    situation: 'El equipo de producto propuso partir un servicio de notificaciones en 6 microservicios independientes, aumentando innecesariamente la complejidad operacional y los costos en AWS.',
    task: 'Tenía que alinear al Tech Lead y a los stakeholders en una solución modular sin generar silos prematuros ni deuda técnica inmanejable.',
    action: 'Presenté un Architecture Decision Record (ADR) con pros y contras objetivos, simulando los costos de infraestructura y la sobrecarga de observabilidad. Propuse un enfoque de Monolito Modular con interfaces bien delimitadas.',
    result: 'El equipo adoptó el ADR por unanimidad. Ahorramos un estimado de $45,000 anuales en cloud y redujimos el tiempo de entrega de la feature de 8 semanas a 3 semanas.',
    score: 9.8,
    wpm: 131,
    recruiterTip: 'Uso magistral de mediación mediante ADRs y datos objetivos en lugar de opiniones personales.',
  },
}

export function MethodologyPage() {
  const [selectedExample, setSelectedExample] = useState<'backend' | 'frontend' | 'architecture'>('backend')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const currentExample = STAR_EXAMPLES[selectedExample]

  const faqs = [
    {
      q: '¿Cómo evalúa la IA la veracidad y precisión técnica de mis respuestas?',
      a: 'Nuestros modelos utilizan rúbricas calibradas con preguntas reales de evaluación de FAANG y scaleups tech. Evalúan no solo la terminología utilizada, sino la coherencia causal: cómo conectas la decisión técnica con el trade-off asumido y las métricas de impacto resultantes.',
    },
    {
      q: '¿Qué es exactamente la estructura STAR y por qué es el estándar de la industria?',
      a: 'STAR significa Situación, Tarea, Acción y Resultado. Es el formato estándar de entrevistas conductuales y técnicas en empresas de alto nivel porque permite al reclutador verificar que tus logros fueron consecuencia de tus decisiones premeditadas y no del azar.',
    },
    {
      q: '¿Cómo se miden las métricas de voz y qué pasa con mi acento o pausas?',
      a: 'El análisis de audio mide la cadencia (palabras por minuto recomendadas entre 120 y 140 ppm), la estabilidad del tono y la detección de muletillas excesivas. La plataforma no penaliza acentos nativos ni dialectos regionales: se enfoca exclusivamente en la claridad y estructuración de las ideas.',
    },
    {
      q: '¿Mis respuestas se guardan o se usan para entrenar otros modelos de IA?',
      a: 'No. En Intervu priorizamos la confidencialidad absoluta. Tus respuestas, audios y diagnósticos son privados para tu cuenta y se almacenan con cifrado de extremo a extremo, cumpliendo normativas RGPD y estándares de privacidad empresarial.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-20">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white border border-black/[0.06] dark:border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="uppercase text-[11px] font-bold">Estándar de Evaluación Intervu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white leading-[1.12]">
            El método STAR 360 diseñado para darte certeza.
          </h1>

          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
            Elimina la improvisación. Calibramos tu preparación con los mismos criterios rigurosos que utilizan los Hiring Managers y Tech Leads en las compañías más competitivas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Link to="/registro">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="tap-target px-6 py-3 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Probar una simulación gratis</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <Link to="/planes">
              <button
                type="button"
                className="tap-target px-5 py-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-xs font-bold text-black dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                Ver planes y tarifas
              </button>
            </Link>
          </div>
        </section>

        {/* 3 CORE PILLARS GRID */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
              LOS 3 PILARES DEL SISTEMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white">
              Ciencia aplicada a cada segundo de tu entrevista
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Pillar 1 */}
            <div className="p-7 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-[14px] bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-[#8E8E93]">FASE 01</span>
                <h3 className="text-base font-bold text-black dark:text-white">Simulación Adaptativa</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Las preguntas se calibran automáticamente a tu rol (Frontend, Backend, DevOps, Data) y nivel de seniority. La IA desafía tus afirmaciones con repreguntas realistas.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Casos reales de producción y arquitectura</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Entorno sin juicios para experimentar</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.12] dark:border-white/[0.18] shadow-md space-y-4 relative">
              <div className="absolute top-4 right-4 text-[10px] font-bold text-black dark:text-white bg-black/[0.04] dark:bg-white/[0.08] px-2.5 py-0.5 rounded-full">
                Esencial
              </div>
              <div className="w-10 h-10 rounded-[14px] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-[#8E8E93]">FASE 02</span>
                <h3 className="text-base font-bold text-black dark:text-white">Diagnóstico STAR 360</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Evaluamos la coherencia de Situación, Tarea, Acción y Resultado. Detectamos si hablaste en plural (“hicimos”) o si asumiste la autoría de las decisiones clave.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Desglose porcentual por cada letra STAR</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Sugerencias de fraseo de impacto</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-[14px] bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white flex items-center justify-center font-bold">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-[#8E8E93]">FASE 03</span>
                <h3 className="text-base font-bold text-black dark:text-white">Cadencia y Fluidez Verbal</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Medimos tu velocidad de habla en palabras por minuto, pausas enfáticas y muletillas repetitivas para asegurar que transmitas serenidad y seguridad absoluta.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Rango ideal calibrado: 120-140 ppm</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Detector de seguridad vs titubeo</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* INTERACTIVE STAR SIMULATION DEMO */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
                CASO DE ESTUDIO INTERACTIVO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mt-1">
                Cómo desglosa la IA una respuesta sobresaliente
              </h2>
            </div>

            {/* Example Selectors */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.08] self-start sm:self-auto">
              {(['backend', 'frontend', 'architecture'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedExample(key)}
                  className={`tap-target px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedExample === key
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                      : 'text-[#6E6E73] dark:text-[#8E8E93] hover:text-black dark:hover:text-white'
                  }`}
                >
                  {key === 'architecture' ? 'Arquitectura' : key}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-[28px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] shadow-lg space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.06] gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
                  {currentExample.role}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-black dark:text-white mt-2">
                  {currentExample.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] text-center min-w-[90px]">
                  <span className="text-[10px] text-[#6E6E73] dark:text-[#8E8E93] block">Puntaje STAR</span>
                  <span className="text-base font-extrabold text-black dark:text-white font-mono">
                    {currentExample.score} / 10
                  </span>
                </div>
                <div className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] text-center min-w-[90px]">
                  <span className="text-[10px] text-[#6E6E73] dark:text-[#8E8E93] block">Cadencia</span>
                  <span className="text-base font-extrabold text-black dark:text-white font-mono">
                    {currentExample.wpm} ppm
                  </span>
                </div>
              </div>
            </div>

            {/* STAR Breakdown 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold flex items-center justify-center">
                    S
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">Situación (Contexto)</span>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {currentExample.situation}
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold flex items-center justify-center">
                    T
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">Tarea (Desafío asumido)</span>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {currentExample.task}
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                    A
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">Acción (Tus decisiones)</span>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {currentExample.action}
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-center">
                    R
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">Resultado (Impacto y métricas)</span>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {currentExample.result}
                </p>
              </div>
            </div>

            {/* Recruiter Insight Box */}
            <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] flex items-start gap-3">
              <Zap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-black dark:text-white block">
                  Criterio de Evaluación del Reclutador:
                </strong>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {currentExample.recruiterTip}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARATIVE IMPACT TABLE */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
              DATOS Y RESULTADOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white">
              Candidato promedio vs. Candidato entrenado en Intervu
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[24px] border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F5F5F7] dark:bg-[#1A1A1C] text-[#6E6E73] dark:text-[#8E8E93]">
                  <th className="p-4 font-bold">Métrica Clave</th>
                  <th className="p-4 font-bold">Preparación Habitual</th>
                  <th className="p-4 font-bold text-black dark:text-white">
                    Con Intervu STAR 360
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                <tr>
                  <td className="p-4 font-semibold text-black dark:text-white">Tasa de aprobación técnica</td>
                  <td className="p-4 text-[#8E8E93]">34% (Alta variabilidad e incertidumbre)</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    89% (+55 puntos porcentuales)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-black dark:text-white">Estructuración STAR completa</td>
                  <td className="p-4 text-[#8E8E93]">Solo 41% de respuestas cubren Tarea y Resultado</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    98% de respuestas estructuradas al milímetro
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-black dark:text-white">Control del titubeo y muletillas</td>
                  <td className="p-4 text-[#8E8E93]">Promedio de 14 muletillas por cada 3 minutos</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    Menos de 2 muletillas con pausas estratégicas
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-black dark:text-white">Tiempo de inicio de respuesta</td>
                  <td className="p-4 text-[#8E8E93]">45 segundos de titubeo o divagación inicial</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    5 segundos de encuadre firme y directo al punto
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white">
              Todo lo que necesitas saber sobre la metodología
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-[20px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-black dark:text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6E6E73] dark:text-[#8E8E93] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 pt-0 text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed border-t border-black/[0.04] dark:border-white/[0.06]"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <section className="p-8 sm:p-14 rounded-[32px] bg-black text-white dark:bg-[#121214] dark:border dark:border-white/[0.12] text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/20">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>EMPIEZA CON 0€ Y SUBE TU NIVEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-xl mx-auto">
            ¿Listo para poner a prueba tu técnica en una simulación real?
          </h2>

          <p className="text-xs sm:text-sm text-[#A1A1A6] max-w-lg mx-auto leading-relaxed">
            Crea tu cuenta en 30 segundos, selecciona tu rol y recibe tu primera evaluación STAR 360 con métricas precisas.
          </p>

          <div className="pt-2">
            <Link to="/registro">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="tap-target px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#E5E5EA] text-xs font-bold shadow-lg cursor-pointer"
              >
                Crear mi cuenta gratis
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] text-[#8E8E93] pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sin tarjeta de crédito
            </span>
            <span>•</span>
            <span>Diagnóstico instantáneo</span>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
