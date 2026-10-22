import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'

export interface PinnedStoryStep {
  id: string
  title: string
  description: string
  badge?: string
}

export interface PinnedStoryProps {
  steps: PinnedStoryStep[]
  renderVisual: (activeStepIndex: number) => ReactNode
  className?: string
}

function PinnedStoryStepItem({
  step,
  idx,
  totalSteps,
  scrollYProgress,
  shouldReduceMotion,
}: {
  step: PinnedStoryStep
  idx: number
  totalSteps: number
  scrollYProgress: MotionValue<number>
  shouldReduceMotion: boolean | null
}) {
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, (idx - 0.4) / totalSteps),
      idx / totalSteps,
      Math.min(1, (idx + 0.6) / totalSteps),
    ],
    [0.35, 1, 0.35]
  )

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, (idx - 0.4) / totalSteps),
      idx / totalSteps,
      Math.min(1, (idx + 0.6) / totalSteps),
    ],
    [0.96, 1, 0.96]
  )

  return (
    <motion.div
      className="p-6 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] transition-all"
      style={shouldReduceMotion ? undefined : { opacity, scale }}
    >
      {step.badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] mb-3">
          {step.badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-[var(--text)] mb-2">{step.title}</h3>
      <p className="text-[var(--text-muted)] text-base leading-relaxed">{step.description}</p>
    </motion.div>
  )
}

export function PinnedStory({ steps, renderVisual, className = '' }: PinnedStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Mapear el progreso (0 a 1) al índice de pasos
  const stepIndexFloat = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${steps.length * 90}vh` }}>
      <div className="sticky top-20 flex flex-col md:flex-row gap-8 items-center min-h-[70vh] py-8">
        {/* Lado izquierdo: Pasos narrativos */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-12">
          {steps.map((step, idx) => (
            <PinnedStoryStepItem
              key={step.id}
              step={step}
              idx={idx}
              totalSteps={steps.length}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Lado derecho: Tarjeta visual animada pegada */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <motion.div className="w-full max-w-md p-6 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-sm">
            {renderVisual(Math.round(stepIndexFloat.get()))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
