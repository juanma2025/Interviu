import { useState } from 'react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router'
import {
  ArrowRight,
  Sparkles,
  Volume2,
  Play,
  LayoutDashboard,
} from 'lucide-react'
import { AiHelpDesk } from '../../features/helpdesk/components/AiHelpDesk.js'
import { PricingPlans } from '../../features/pricing/components/PricingPlans.js'

export function LandingPage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#121E1A] font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E2EBE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo -> Directly links to /app/dashboard */}
          <Link
            to="/app/dashboard"
            className="flex items-center gap-2.5 cursor-pointer group"
            title="Ir al Dashboard principal"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#2D5A4C] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              IV
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#121E1A] flex items-center gap-1">
              <span>Intervu</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5A6F67]">
            <a href="#metodologia" className="hover:text-[#121E1A] transition-colors">
              Metodología
            </a>
            <a href="#preguntas" className="hover:text-[#121E1A] transition-colors">
              Preguntas & Buzón AI
            </a>
            <a href="#planes" className="hover:text-[#121E1A] transition-colors">
              Planes
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/app/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 rounded-full hover:bg-emerald-200/50 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/login"
              className="text-xs font-bold text-[#5A6F67] hover:text-[#121E1A] transition-colors px-2 py-1"
            >
              Iniciar sesión
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/app/dashboard')}
              className="tap-target px-4 py-2 rounded-full bg-[#2D5A4C] hover:bg-[#23493D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Empezar gratis
            </motion.button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F0EA] text-[#1E4336] border border-emerald-300/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>PREPARACIÓN INTELIGENTE CON IA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121E1A] tracking-tight leading-[1.08]">
              Llega a tu entrevista sabiendo qué esperar.
            </h1>

            <p className="text-base sm:text-lg text-[#5A6F67] leading-relaxed max-w-xl">
              Simulamos técnicas y de comportamiento con retroalimentación instantánea para asegurar tu próximo paso tech.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/app/dashboard')}
                className="tap-target px-6 py-3.5 rounded-full bg-[#2D5A4C] hover:bg-[#23493D] text-white text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Empezar gratis</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                type="button"
                onClick={() => navigate('/app/dashboard')}
                className="tap-target px-5 py-3 rounded-full bg-white border border-[#D5E1DC] text-xs font-bold text-[#121E1A] hover:bg-[#F0F5F2] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#2D5A4C]" />
                <span>Ver Dashboard en vivo</span>
              </button>
            </div>
          </div>

          {/* Right Hero Preview Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 350, damping: 28 }}
              className="p-6 rounded-[28px] bg-white border border-[#E0EBE5] shadow-xl space-y-5 relative cursor-pointer"
              onClick={() => navigate('/app/dashboard')}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Pregunta técnica y de voz
                </span>
                <span className="text-xs font-semibold text-[#5A6F67]">100% de los puntos</span>
              </div>

              <div className="p-4 rounded-[18px] bg-[#F5F8F7] border border-[#E4EDE8] space-y-1">
                <span className="text-[10px] font-bold text-[#2D5A4C] uppercase tracking-wider">
                  Comportamiento (STAR)
                </span>
                <p className="text-sm font-bold text-[#121E1A] leading-snug">
                  “Cuéntame de una vez que aprendiste algo nuevo bajo presión.”
                </p>
              </div>

              {/* Audio Waveform Simulator */}
              <div className="p-4 rounded-[18px] bg-[#FAFBFB] border border-[#E9F0EC] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6F67]">
                  <span className="font-semibold text-[#121E1A] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Respuesta en curso</span>
                  </span>
                  <span className="font-mono">00:42 / 03:00</span>
                </div>
                <div className="flex items-center gap-1 h-8 pt-1">
                  {[20, 35, 60, 40, 80, 50, 95, 65, 45, 75, 30, 85, 40, 60, 25].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-[#2D5A4C] rounded-full opacity-80"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PAIN POINTS / CONTRAST SECTION (From Image 1) */}
      <section className="py-20 px-4 sm:px-8 border-y border-[#E2EBE6] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-bold tracking-widest uppercase text-[#5A6F67]">
            LA BRECHA HABITUAL
          </span>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121E1A] tracking-tight">
              “No sabes qué te van a preguntar.”
            </h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121E1A] tracking-tight">
              “Practicar solo no te dice si respondes bien.”
            </h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121E1A] tracking-tight">
              “No ves si mejoras.”
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#5A6F67] max-w-xl mx-auto leading-relaxed">
            La preparación técnica tradicional no es realista y desconcierta. Intervu sustituye la incertidumbre por práctica guiada, precisa y medible.
          </p>
        </div>
      </section>

      {/* 4. METHODOLOGY 3 STEPS (From Image 1) */}
      <section id="metodologia" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A4C]">
              RUTA DE APRENDIZAJE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121E1A] tracking-tight mt-1">
              Un método diseñado para darte certeza.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Steps list */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  id: 1,
                  num: '01',
                  title: 'Practica',
                  desc: 'Inicia entrevistas sobre adaptabilidad técnica en Frontend, Backend, Datos y Arquitectura en un entorno sin juicios.',
                },
                {
                  id: 2,
                  num: '02',
                  title: 'Recibe feedback — STAR 360',
                  desc: 'Diagnóstico automático por competencias: desglose STAR, tono, cadencia y sugerencias precisas.',
                },
                {
                  id: 3,
                  num: '03',
                  title: 'Mide tu progreso',
                  desc: 'Compara tu evolución semanal frente a la curva media de candidatos tech y consolida hábitos.',
                },
              ].map((step) => (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-5 rounded-[20px] border transition-all cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-[#2D5A4C] text-white border-[#2D5A4C] shadow-md'
                      : 'bg-white text-[#121E1A] border-[#E2EBE6] hover:bg-[#F3F7F5]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        activeStep === step.id ? 'text-emerald-300' : 'text-[#5A6F67]'
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      activeStep === step.id ? 'text-emerald-100/90' : 'text-[#5A6F67]'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Step Visual Preview Card */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-[28px] bg-white border border-[#E0EBE5] shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEF3F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-[#5A6F67]">
                    Sesión STAR y Evaluación en Tiempo Real
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-[16px] bg-[#F4F8F6] border border-[#E2ECE8] text-xs font-medium text-[#121E1A]">
                    “Rediseñamos la capa de procesamiento de eventos en kafka reduciendo latencia de 1.8s a 90ms...”
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-[14px] bg-[#FAFBFB] border border-[#E9F0EC]">
                      <span className="text-[10px] text-[#5A6F67] block">Precisión Técnica</span>
                      <strong className="text-xs font-mono text-[#2D5A4C]">Sobresaliente (9.2)</strong>
                    </div>
                    <div className="p-3 rounded-[14px] bg-[#FAFBFB] border border-[#E9F0EC]">
                      <span className="text-[10px] text-[#5A6F67] block">Estructura STAR</span>
                      <strong className="text-xs font-mono text-[#2D5A4C]">Completa (100%)</strong>
                    </div>
                    <div className="p-3 rounded-[14px] bg-[#FAFBFB] border border-[#E9F0EC]">
                      <span className="text-[10px] text-[#5A6F67] block">Ritmo Verbal</span>
                      <strong className="text-xs font-mono text-[#2D5A4C]">132 ppm</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PREGUNTAS: BUZÓN DE AYUDA CON AGENTE AI (Requerimiento explícito del usuario) */}
      <section id="preguntas" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#E2EBE6]">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A4C]">
              RESOLUCIÓN DE DUDAS EN TIEMPO REAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121E1A] tracking-tight">
              Buzón de Preguntas con Agente de IA
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6F67]">
              Consulta cualquier duda sobre estructuración STAR, preguntas difíciles o negociación con nuestro agente especializado.
            </p>
          </div>

          <AiHelpDesk />
        </div>
      </section>

      {/* 6. PLANES: PLANES QUE EL USUARIO PUEDE COMPRAR (Requerimiento explícito del usuario) */}
      <section id="planes" className="py-24 px-4 sm:px-8 border-t border-[#E2EBE6] bg-white">
        <div className="max-w-7xl mx-auto">
          <PricingPlans onPlanPurchased={() => navigate('/app/dashboard')} />
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-[#F6F8F7] border-t border-[#E2EBE6]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A4C]">
            COMIENZA HOY MISMO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121E1A] tracking-tight">
            Tu próxima entrevista empieza hoy.
          </h2>
          <p className="text-sm sm:text-base text-[#5A6F67]">
            Sin presiones innecesarias. Domina tus respuestas con casos reales y el rigor que buscan las mejores compañías.
          </p>
          <div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/app/dashboard')}
              className="tap-target px-8 py-3.5 rounded-full bg-[#2D5A4C] hover:bg-[#23493D] text-white text-sm font-bold shadow-md cursor-pointer"
            >
              Empezar gratis
            </motion.button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-8 px-4 sm:px-8 border-t border-[#E2EBE6] text-xs text-[#5A6F67] max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/app/dashboard"
          className="flex items-center gap-2 font-bold text-[#121E1A] hover:underline"
          title="Ir al Dashboard principal"
        >
          <span>Intervu</span>
          <span>— Preparación técnica con serenidad y rigor.</span>
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <a href="#preguntas" className="hover:text-[#121E1A]">Buzón AI</a>
          <a href="#planes" className="hover:text-[#121E1A]">Planes</a>
          <Link to="/app/dashboard" className="text-[var(--accent)] font-bold hover:underline">
            Ir al Dashboard
          </Link>
          <span>© 2026 Intervu Inc.</span>
        </div>
      </footer>
    </div>
  )
}
