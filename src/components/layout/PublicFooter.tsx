import { Link } from 'react-router'
import { Sparkles, ShieldCheck } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-[#F5F5F7] dark:bg-black text-[#6E6E73] dark:text-[#8E8E93] text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Logo & Slogan */}
          <div className="space-y-2.5 max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group select-none">
              <div className="w-8 h-8 rounded-[10px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm">
                IV
              </div>
              <span className="font-extrabold text-[15px] tracking-tight text-black dark:text-white flex items-center gap-1.5">
                <span>Intervu</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
            </Link>
            <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
              Plataforma de preparación técnica y de comportamiento con IA adaptativa, calibración STAR 360 y retroalimentación en tiempo real.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white block">
                Explorar
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/metodologia" className="hover:text-black dark:hover:text-white transition-colors">
                    Metodología STAR
                  </Link>
                </li>
                <li>
                  <Link to="/preguntas" className="hover:text-black dark:hover:text-white transition-colors">
                    Preguntas & Buzón AI
                  </Link>
                </li>
                <li>
                  <Link to="/planes" className="hover:text-black dark:hover:text-white transition-colors">
                    Planes y Tarifas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white block">
                Comenzar
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/login" className="hover:text-black dark:hover:text-white transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to="/registro" className="hover:text-black dark:hover:text-white transition-colors">
                    Crear cuenta gratis
                  </Link>
                </li>
                <li>
                  <Link to="/recuperar" className="hover:text-black dark:hover:text-white transition-colors">
                    Recuperar acceso
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white block">
                Privacidad
              </span>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-black dark:text-white font-semibold bg-black/[0.04] dark:bg-white/[0.08] px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cifrado de extremo a extremo</span>
              </div>
              <p className="text-[11px] leading-snug text-[#8E8E93]">
                Tus respuestas son estrictamente confidenciales y nunca se comparten con terceros.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>© 2026 Intervu. Diseñado con precisión y serenidad para entrevistas de ingeniería.</span>
          </div>

          <div className="flex items-center gap-4 text-[#8E8E93]">
            <span>Estándar STAR 360</span>
            <span>•</span>
            <span>Apple HIG Design</span>
            <span>•</span>
            <span>España & Latinoamérica</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
