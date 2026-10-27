import { useLocation } from 'react-router'
import { Sparkles, MessageSquare } from 'lucide-react'
import { AiHelpDesk } from '../../features/helpdesk/components/AiHelpDesk.js'
import { PublicNavbar } from '../../components/layout/PublicNavbar.js'
import { PublicFooter } from '../../components/layout/PublicFooter.js'

export function HelpDeskPage() {
  const location = useLocation()
  const isInsideApp = location.pathname.startsWith('/app')

  if (isInsideApp) {
    return (
      <div className="space-y-6 pb-12">
        <AiHelpDesk />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 flex flex-col justify-between">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-10 flex-1 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.08] text-black dark:text-white border border-black/[0.06] dark:border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="uppercase text-[11px] font-bold">Asistente de IA para Entrevistas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white leading-[1.15]">
            Preguntas & Buzón AI de Entrevistas
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
            Escribe tus dudas sobre estructuración de respuestas STAR, cómo manejar preguntas capciosas o qué responder ante situaciones complejas. Nuestro asistente responde al instante con ejemplos prácticos.
          </p>
        </div>

        {/* The interactive AI Help Desk */}
        <AiHelpDesk />

        {/* Helpful Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs">
          <div className="p-5 rounded-[22px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-black dark:text-white">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Preguntas de Comportamiento</span>
            </div>
            <p className="text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Pídele al agente cómo responder a “¿Cuál es tu mayor debilidad?” o “¿Cómo manejas desacuerdos de arquitectura?”.
            </p>
          </div>

          <div className="p-5 rounded-[22px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-black dark:text-white">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Simulación de Trade-offs</span>
            </div>
            <p className="text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Consulta trade-offs entre SQL vs NoSQL, arquitectura monolítica vs microservicios o patrones de caching en Redis.
            </p>
          </div>

          <div className="p-5 rounded-[22px] apple-card bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-black dark:text-white">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Negociación y Cierre</span>
            </div>
            <p className="text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Aprende a responder sobre expectativas salariales y preguntas inteligentes para hacerle al Hiring Manager al final.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
