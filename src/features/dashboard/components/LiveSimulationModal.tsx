import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic, MicOff, PhoneOff, Volume2, Sparkles, CheckCircle2 } from 'lucide-react'
import type { InterviewerProfile } from './AiInterviewers.js'

export interface LiveSimulationModalProps {
  isOpen: boolean
  onClose: () => void
  interviewer?: InterviewerProfile | null
  questionText?: string
}

export function LiveSimulationModal({
  isOpen,
  onClose,
  interviewer,
  questionText = '¿Cómo abordarías una regresión crítica de rendimiento en producción tras un despliegue masivo?',
}: LiveSimulationModalProps) {
  const [seconds, setSeconds] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [status, setStatus] = useState<'speaking' | 'listening' | 'evaluating' | 'completed'>('speaking')
  const [transcription, setTranscription] = useState('')

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // Simulate AI speaking for 4 seconds, then listening to user
    const aiTimer = setTimeout(() => {
      setStatus('listening')
      setTranscription('Iniciando respuesta del candidato: Primero verificaría los dashboards de observabilidad y métricas APM para aislar los endpoints afectados...')
    }, 4000)

    return () => {
      clearInterval(timer)
      clearTimeout(aiTimer)
    }
  }, [isOpen])

  const handleClose = () => {
    setSeconds(0)
    setStatus('speaking')
    setTranscription('')
    onClose()
  }

  if (!isOpen) return null

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleFinish = () => {
    setStatus('evaluating')
    setTimeout(() => {
      setStatus('completed')
    }, 1800)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--line)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Call Header */}
          <div className="p-6 bg-gradient-to-b from-[#1C3A32] to-[#122822] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-700/80 border-2 border-emerald-400 flex items-center justify-center text-sm font-bold shadow-md">
                {interviewer?.avatar || 'IA'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{interviewer?.name || 'Valeria S.'}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-xs text-emerald-200/80">{interviewer?.role || 'Entrevistadora Técnica IA'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-black/30 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{formatTime(seconds)}</span>
            </div>
          </div>

          {/* Call Body */}
          <div className="p-6 space-y-6 flex-1">
            {status !== 'completed' ? (
              <>
                {/* Active Question Box */}
                <div className="p-4 rounded-[16px] bg-[var(--surface-subtle)] border border-[var(--line-subtle)] space-y-1.5">
                  <span className="text-[10px] font-bold text-[var(--accent)] tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pregunta en curso</span>
                  </span>
                  <p className="text-sm font-semibold text-[var(--text)] leading-snug">
                    “{questionText}”
                  </p>
                </div>

                {/* Animated Audio Waveform & Status */}
                <div className="py-6 flex flex-col items-center justify-center gap-4 bg-[var(--bg)] rounded-[20px] border border-[var(--line-subtle)]">
                  <div className="flex items-center gap-1.5 h-12">
                    {[16, 28, 44, 20, 36, 48, 24, 40, 18, 32, 46, 22].map((height, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: status === 'speaking' || status === 'listening' ? [12, height, 12] : 8,
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8 + (i % 4) * 0.2,
                          ease: 'easeInOut',
                        }}
                        className={`w-1.5 rounded-full ${
                          status === 'speaking' ? 'bg-emerald-500' : 'bg-teal-600'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                    {status === 'speaking' && (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        <span>Valeria está formulando la pregunta...</span>
                      </>
                    )}
                    {status === 'listening' && (
                      <>
                        <Mic className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                        <span>Escuchando tu respuesta (Habla con serenidad y estructura STAR)</span>
                      </>
                    )}
                    {status === 'evaluating' && <span>Analizando respuesta con rúbrica Claude STAR...</span>}
                  </span>
                </div>

                {/* Live Transcription Box */}
                {transcription && (
                  <div className="p-3.5 rounded-[14px] border border-dashed border-[var(--line)] bg-[var(--surface-subtle)]/50 text-xs text-[var(--text)]">
                    <span className="font-bold text-[var(--accent)] block mb-1">Transcripción en vivo:</span>
                    <p className="italic leading-relaxed">{transcription}</p>
                  </div>
                )}
              </>
            ) : (
              /* Completed Feedback preview */
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text)]">¡Simulación finalizada con éxito!</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-md">
                    Tu respuesta fue transcrita y evaluada con el método STAR. El puntaje preliminar calculado por el modelo es <strong>8.8 / 10</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Call Controls Footer */}
          <div className="p-5 border-t border-[var(--line-subtle)] bg-[var(--surface-subtle)]/40 flex items-center justify-between">
            {status !== 'completed' ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`tap-target px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                    isMuted
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-white dark:bg-[#1E312B] text-[var(--text)] border-[var(--line)] shadow-xs'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4 text-emerald-700" />}
                  <span>{isMuted ? 'Micrófono silenciado' : 'Silenciar'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="tap-target px-4 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Terminar respuesta
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="tap-target p-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer"
                    title="Colgar llamada"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="w-full tap-target py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Volver al Dashboard
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
