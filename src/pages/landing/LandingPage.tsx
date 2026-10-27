import { useState } from 'react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router'
import {
  ArrowRight,
  Sparkles,
  Volume2,
  Mic,
  Brain,
  Layers,
  Activity,
  UserCheck,
  Code2,
  CheckCircle2,
  HelpCircle,
  CreditCard,
  BookOpen,
} from 'lucide-react'
import { PublicNavbar } from '../../components/layout/PublicNavbar.js'
import { PublicFooter } from '../../components/layout/PublicFooter.js'

export function LandingPage() {
  const navigate = useNavigate()
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [audioProgress, setAudioProgress] = useState(42)

  const toggleSimulatedAudio = () => {
    setIsPlayingAudio((prev) => !prev)
    if (!isPlayingAudio) {
      setAudioProgress(65)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      {/* 1. APPLE HIG TOPBAR */}
      <PublicNavbar />

      {/* 2. HERO SECTION - Apple Minimalist Aesthetic with Abundant Whitespace */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white border border-black/[0.06] dark:border-white/[0.08]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span className="tracking-wide uppercase text-[11px] font-bold">Simulación de Entrevistas Tech con IA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.06] text-black dark:text-white"
            >
              Llega a tu próxima entrevista sabiendo exactamente qué responder.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed max-w-xl font-normal"
            >
              Simulaciones adaptativas con IA en tiempo real. Diagnóstico STAR 360, análisis de ritmo verbal y retroalimentación instantánea calibrada para ingenieros de software.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigate('/registro')}
                className="tap-target px-7 py-3.5 rounded-full bg-black hover:bg-[#2C2C2E] dark:bg-white dark:hover:bg-[#E5E5EA] text-white dark:text-black text-xs sm:text-sm font-bold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Empezar gratis</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <Link
                to="/metodologia"
                className="tap-target px-5 py-3.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-xs font-semibold text-black dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93]" />
                <span>Conocer Metodología STAR</span>
              </Link>
            </motion.div>

            {/* Social Proof Badges */}
            <div className="pt-2 flex items-center gap-6 text-xs text-[#8E8E93] dark:text-[#6E6E73]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Sin tarjeta de crédito</span>
              </span>
              <span>•</span>
              <span>Rúbricas FAANG</span>
              <span>•</span>
              <span>Modo Voz y Texto</span>
            </div>
          </div>

          {/* Right Hero Interactive Simulation Card (Apple Glass Card) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, type: 'spring', stiffness: 350, damping: 28 }}
              className="p-6 sm:p-7 rounded-[28px] bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.10] shadow-xl space-y-5 relative select-none"
            >
              {/* Top Status */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-tight text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-300/30">
                  Simulación Activa
                </span>
                <span className="text-xs font-medium text-[#6E6E73] dark:text-[#8E8E93]">
                  Senior Fullstack
                </span>
              </div>

              {/* Prompt Card */}
              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93]">
                  <span>Comportamiento STAR</span>
                  <span className="text-emerald-600 dark:text-emerald-400">100 Pts</span>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white leading-snug">
                  “Describe una ocasión en que tuviste que tomar una decisión de arquitectura difícil con tiempo límite.”
                </p>
              </div>

              {/* Audio Waveform Interactive Preview */}
              <div className="p-4 rounded-[18px] bg-[#FAFBFB] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-black dark:text-white">
                    <button
                      type="button"
                      onClick={toggleSimulatedAudio}
                      className="tap-target w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center cursor-pointer hover:opacity-90"
                      title={isPlayingAudio ? 'Pausar audio' : 'Reproducir respuesta de prueba'}
                    >
                      {isPlayingAudio ? (
                        <span className="text-[10px] font-bold">||</span>
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-xs font-semibold">Respuesta del Candidato</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#6E6E73] dark:text-[#8E8E93]">
                    00:{audioProgress} / 02:30
                  </span>
                </div>

                {/* Animated Waveform */}
                <div className="flex items-center gap-1 h-9 px-1">
                  {[25, 45, 75, 40, 90, 60, 100, 70, 50, 85, 35, 95, 45, 65, 30, 80, 50, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={isPlayingAudio ? { height: [`${Math.max(20, (h * 0.7))}%`, `${h}%`, `${Math.max(25, (h * 0.5))}%`] } : { height: `${h}%` }}
                      transition={{ duration: 0.6, repeat: isPlayingAudio ? Infinity : 0, delay: i * 0.04 }}
                      className="flex-1 bg-black dark:bg-white rounded-full opacity-80"
                    />
                  ))}
                </div>
              </div>

              {/* Live Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-center border border-black/[0.03] dark:border-white/[0.05]">
                  <span className="text-[10px] text-[#6E6E73] dark:text-[#8E8E93] block">STAR Global</span>
                  <span className="text-xs font-bold text-black dark:text-white font-mono">9.4 / 10</span>
                </div>
                <div className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-center border border-black/[0.03] dark:border-white/[0.05]">
                  <span className="text-[10px] text-[#6E6E73] dark:text-[#8E8E93] block">Cadencia</span>
                  <span className="text-xs font-bold text-black dark:text-white font-mono">134 ppm</span>
                </div>
                <div className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-center border border-black/[0.03] dark:border-white/[0.05]">
                  <span className="text-[10px] text-[#6E6E73] dark:text-[#8E8E93] block">Muletillas</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">0 detectadas</span>
                </div>
              </div>

              <div className="text-center pt-1">
                <Link
                  to="/metodologia"
                  className="text-[11px] font-semibold text-black dark:text-white hover:underline inline-flex items-center gap-1"
                >
                  <span>Ver cómo se calibra esta evaluación</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID SHOWCASE - Apple Style Modular Features Showcase */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
              ARQUITECTURA DE LA PLATAFORMA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
              Todo lo que necesitas para asegurar tu oferta tech.
            </h2>
            <p className="text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Herramientas de nivel profesional diseñadas para diagnosticar puntos ciegos técnicos y conductuales antes de tu entrevista final.
            </p>
          </div>

          {/* Asymmetric Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Bento Card 1: Simulación de Voz en Tiempo Real (Span 7) */}
            <div className="md:col-span-12 lg:col-span-7 p-7 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[14px] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">Voz y Lenguaje Natural</span>
                  <h3 className="text-xl font-bold text-black dark:text-white">Simulación Adaptativa por Voz con IA</h3>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                    Conversa como en una llamada real de Google Meet o Zoom. El motor analiza tu respuesta, evalúa tu estructura y repregunta inmediatamente si detecta lagunas técnicas.
                  </p>
                </div>
              </div>

              {/* Visual preview */}
              <div className="p-4 rounded-[18px] bg-[#F5F5F7] dark:bg-[#1A1A1C] border border-black/[0.03] dark:border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#6E6E73] dark:text-[#8E8E93]">
                  <span className="font-semibold text-black dark:text-white">Transcripción Continua</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">Latencia &lt; 140ms</span>
                </div>
                <p className="text-xs text-black dark:text-white font-mono bg-white dark:bg-black p-3 rounded-[12px] border border-black/[0.04] dark:border-white/[0.06]">
                  “Decidimos aislar la partición afectada en Kafka y desacoplar los workers de pago con idempotencia...”
                </p>
              </div>
            </div>

            {/* Bento Card 2: Diagnóstico STAR 360 (Span 5) */}
            <div className="md:col-span-12 lg:col-span-5 p-7 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[14px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">Evaluación Rápida</span>
                  <h3 className="text-xl font-bold text-black dark:text-white">Desglose STAR 360</h3>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                    Medición milimétrica de cuatro dimensiones indispensables: Situación, Tarea, Acción y Resultado cuantificable.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { letter: 'S', title: 'Situación', score: '98%' },
                  { letter: 'T', title: 'Tarea', score: '95%' },
                  { letter: 'A', title: 'Acción', score: '99%' },
                  { letter: 'R', title: 'Resultado', score: '92%' },
                ].map((item) => (
                  <div key={item.letter} className="p-2.5 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1A1A1C] flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-black dark:text-white">{item.letter}</span>
                    <span className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">{item.title}</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Cadencia y Ritmo (Span 4) */}
            <div className="md:col-span-12 lg:col-span-4 p-6 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-black dark:text-white flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-black dark:text-white">Ritmo Verbal y Pausas</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Evita sonar apresurado o inseguro. El velocímetro calibrado te guía hacia el rango óptimo de 120-140 palabras por minuto.
                </p>
              </div>
              <div className="p-3 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1A1A1C] text-center">
                <span className="text-[10px] text-[#8E8E93] block">Velocidad Ideal</span>
                <span className="text-base font-mono font-extrabold text-black dark:text-white">128 - 138 ppm</span>
              </div>
            </div>

            {/* Bento Card 4: Entrevistadores Especializados (Span 4) */}
            <div className="md:col-span-12 lg:col-span-4 p-6 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-black dark:text-white flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-black dark:text-white">Perfiles de Reclutadores</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Elige simular con Valeria S. (evaluadora técnica implacable) o Carlos M. (especialista en cultura de liderazgo).
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white">
                  Valeria (Staff)
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white">
                  Carlos (Director)
                </span>
              </div>
            </div>

            {/* Bento Card 5: Banco de Preguntas Calibradas (Span 4) */}
            <div className="md:col-span-12 lg:col-span-4 p-6 rounded-[26px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-[14px] bg-[#F5F5F7] dark:bg-[#1C1C1E] text-black dark:text-white flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-black dark:text-white">Frontend, Backend & DevOps</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  Banco vivo de más de 400 preguntas extraídas de entrevistas reales en MercadoLibre, Stripe, Meta y Amazon.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React', 'PostgreSQL', 'Docker', 'System Design'].map((tech) => (
                  <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#6E6E73] dark:text-[#8E8E93]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW - CÓMO FUNCIONA EL ENTRENAMIENTO EN 3 PASOS */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8E8E93]">
              FLUJO DE PREPARACIÓN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
              Cómo funciona Intervu en tu día a día
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Configura tu objetivo',
                desc: 'Indica tu rol principal (Frontend, Backend, DevOps, Data) y tu nivel de seniority deseado.',
                icon: <Brain className="w-5 h-5" />,
              },
              {
                step: '02',
                title: 'Entrena con casos reales',
                desc: 'Responde verbalmente a preguntas técnicas complejas en un entorno privado y sin presiones.',
                icon: <Volume2 className="w-5 h-5" />,
              },
              {
                step: '03',
                title: 'Analiza tus métricas',
                desc: 'Recibe diagnósticos milimétricos al terminar cada simulación para perfeccionar tu dicción y tus trade-offs.',
                icon: <Activity className="w-5 h-5" />,
              },
            ].map((card) => (
              <div
                key={card.step}
                className="p-7 rounded-[24px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-[14px] bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white flex items-center justify-center font-bold">
                    {card.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8E8E93]">{card.step}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-black dark:text-white">{card.title}</h3>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NAVIGATION BRIDGE CARDS - Apple Style Clean Links to Dedicated Pages */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/metodologia"
            className="p-6 rounded-[24px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[12px] bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-black dark:text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Metodología STAR 360
              </h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                Descubre cómo funciona la rúbrica científica que evalúa la coherencia de tus respuestas técnicas.
              </p>
            </div>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 pt-2">
              <span>Explorar metodología</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/preguntas"
            className="p-6 rounded-[24px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[12px] bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-black dark:text-white">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Buzón de Preguntas con IA
              </h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                ¿Dudas sobre negociación o cómo responder preguntas difíciles? Consulta a nuestro agente de IA 24/7.
              </p>
            </div>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 pt-2">
              <span>Abrir Buzón de Ayuda</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/planes"
            className="p-6 rounded-[24px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[12px] bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-black dark:text-white">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Planes y Tarifas
              </h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                Comienza gratis con el plan Explorador o desbloquea simulaciones ilimitadas con Candidato Pro.
              </p>
            </div>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 pt-2">
              <span>Ver opciones y precios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* 6. CALL TO ACTION - Solid Black & White Apple Container */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="p-8 sm:p-14 rounded-[32px] bg-black text-white dark:bg-[#121214] dark:border dark:border-white/[0.12] text-center space-y-6 shadow-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E93]">
            COMIENZA HOY MISMO
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Tu próxima gran oferta técnica empieza con una buena preparación.
          </h2>

          <p className="text-xs sm:text-sm text-[#A1A1A6] max-w-lg mx-auto leading-relaxed">
            Sin presiones innecesarias. Domina tus respuestas con simulaciones adaptativas y la serenidad que buscan las mejores compañías.
          </p>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => navigate('/registro')}
              className="tap-target px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#E5E5EA] text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
            >
              Empezar a entrenar gratis
            </motion.button>
          </div>
        </div>
      </section>

      {/* 7. SHARED FOOTER */}
      <PublicFooter />
    </div>
  )
}
