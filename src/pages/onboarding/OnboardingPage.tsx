import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button.js'
import { Textarea } from '../../components/ui/Textarea.js'
import { Badge } from '../../components/ui/Badge.js'
import { useAuth } from '../../features/auth/hooks/useAuth.js'

const ROLES = [
  { id: 'backend', name: 'Backend Developer', icon: '⚙️' },
  { id: 'frontend', name: 'Frontend Developer', icon: '🎨' },
  { id: 'fullstack', name: 'Fullstack Developer', icon: '🚀' },
  { id: 'data', name: 'Data Engineer / Analyst', icon: '📈' },
  { id: 'qa', name: 'QA Automation', icon: '🧪' },
  { id: 'devops', name: 'DevOps / Cloud', icon: '☁️' },
]

const LEVELS = [
  { id: 'junior', name: 'Junior', desc: 'Fundamentos sólidos y primeros proyectos' },
  { id: 'semi-senior', name: 'Semi-Senior', desc: 'Autonomía técnica y trabajo en equipo' },
  { id: 'senior', name: 'Senior', desc: 'Liderazgo, arquitectura e impacto global' },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [step, setStep] = useState(0) // 0, 1, 2, 3
  const [selectedRole, setSelectedRole] = useState(user?.targetRole || 'fullstack')
  const [selectedLevel, setSelectedLevel] = useState(user?.level || 'semi-senior')
  const [analyticsConsent, setAnalyticsConsent] = useState(true)
  const [trainingDataConsent, setTrainingDataConsent] = useState(false)
  const [practiceAnswer, setPracticeAnswer] = useState('')

  const handleFinish = () => {
    if (user) {
      user.updateRoleAndLevel(selectedRole, selectedLevel)
      user.updateConsent(analyticsConsent, trainingDataConsent)
      user.completeOnboarding()
    }
    navigate('/app/practicar')
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleFinish()
    }
  }

  const handleSkip = () => {
    handleFinish()
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between max-w-2xl mx-auto px-4 py-8">
      {/* Barra superior con botón Omitir */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm">
            IV
          </div>
          <span className="font-bold text-sm tracking-tight text-[var(--text)]">Bienvenida a Interviu</span>
        </div>

        {step < 3 && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] tap-target px-2 cursor-pointer"
          >
            Omitir introducción
          </button>
        )}
      </div>

      {/* Contenido principal por pantalla */}
      <div className="my-auto py-8">
        {step === 0 && (
          <div className="space-y-6 text-center">
            <div className="inline-flex w-20 h-20 rounded-[28px] bg-[var(--accent-soft)] text-[var(--accent)] items-center justify-center text-4xl mb-2 shadow-xs">
              🎯
            </div>
            <h1 className="text-fluid-headline font-bold text-[var(--text)]">
              Entrena con el estándar STAR
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto">
              Las empresas tecnológicas más competitivas evalúan tus respuestas en cuatro ejes:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
              {[
                { letter: 'S', title: 'Situación', desc: 'Contexto y escenario del problema.' },
                { letter: 'T', title: 'Tarea', desc: 'Qué reto específico debías asumir.' },
                { letter: 'A', title: 'Acción', desc: 'Tus decisiones y ejecución técnica.' },
                { letter: 'R', title: 'Resultado', desc: 'Impacto medible y aprendizaje.' },
              ].map((item) => (
                <div
                  key={item.letter}
                  className="p-4 rounded-[16px] bg-[var(--surface)] border border-[var(--line)] shadow-xs"
                >
                  <span className="text-xl font-bold text-[var(--accent)] font-mono block mb-1">
                    {item.letter}
                  </span>
                  <h4 className="text-xs font-bold text-[var(--text)] mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-[var(--text-muted)] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-fluid-headline font-bold text-[var(--text)]">
                Personaliza tu simulador
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Selecciona tu especialidad y nivel para calibrar las preguntas que recibirás.
              </p>
            </div>

            {/* Selector de Rol */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Rol Objetivo
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROLES.map((r) => {
                  const isSelected = selectedRole === r.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`tap-target p-3.5 rounded-[16px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-xs font-semibold'
                          : 'border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <span className="text-xs text-[var(--text)]">{r.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selector de Nivel */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Nivel de Seniority
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {LEVELS.map((lvl) => {
                  const isSelected = selectedLevel === lvl.id
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`tap-target p-3.5 rounded-[16px] border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-xs'
                          : 'border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[var(--text)]">{lvl.name}</span>
                      <span className="text-[11px] text-[var(--text-muted)] leading-tight">{lvl.desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-fluid-headline font-bold text-[var(--text)]">
                Privacidad y Consentimiento de Datos
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Tú decides cómo se gestionan tus respuestas. Puedes cambiar estos ajustes en cualquier momento desde tu perfil.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <label className="p-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4 cursor-pointer hover:border-[var(--accent)] transition-colors">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded-[6px] accent-[var(--accent)] cursor-pointer"
                />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[var(--text)] block">
                    Métricas de progreso y analítica de rendimiento
                  </span>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Permite calcular tus rachas de práctica, gráficos de dominio por categoría y sugerencias de mejora personalizadas.
                  </p>
                </div>
              </label>

              <label className="p-5 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] flex items-start gap-4 cursor-pointer hover:border-[var(--accent)] transition-colors">
                <input
                  type="checkbox"
                  checked={trainingDataConsent}
                  onChange={(e) => setTrainingDataConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded-[6px] accent-[var(--accent)] cursor-pointer"
                />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[var(--text)] block">
                    Mejora anónima del modelo de evaluación
                  </span>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Permite conservar transcripciones de forma estrictamente despersonalizada para calibrar y refinar las rúbricas de IA de la comunidad.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge category="comportamiento">Pregunta de prueba</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                Cuéntame sobre una ocasión en la que tuviste que resolver un problema técnico con poco tiempo.
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                💡 Consejo: Escribe al menos 3 palabras para familiarizarte con el contador de palabras.
              </p>
            </div>

            <Textarea
              label="Escribe tu borrador de respuesta"
              placeholder="En mi último proyecto, nos enfrentamos a..."
              value={practiceAnswer}
              onChange={(e) => setPracticeAnswer(e.target.value)}
              minWords={3}
            />
          </div>
        )}
      </div>

      {/* Navegación inferior con indicadores de paso y botón siguiente */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--line-subtle)]">
        {/* Indicadores de paso */}
        <div className="flex gap-2" aria-label={`Paso ${step + 1} de 4`}>
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-[var(--line)]'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Atrás
            </Button>
          )}
          <Button variant="primary" onClick={handleNext}>
            {step === 3 ? 'Finalizar y Comenzar' : 'Siguiente →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
