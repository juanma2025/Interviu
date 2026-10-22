import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { easings } from '../../motion/easings.js'

export interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Sheet({ isOpen, onClose, title, children }: SheetProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Telón translúcido de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Hoja modal inferior */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.35, ease: easings.ios }}
            drag={shouldReduceMotion ? false : 'y'}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
            }}
            className="relative w-full max-w-xl max-h-[85dvh] bg-[var(--surface)] rounded-t-[28px] border-t border-[var(--line)] shadow-2xl flex flex-col z-10 overflow-hidden pb-[env(safe-area-inset-bottom)]"
          >
            {/* Manija de arrastre */}
            <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-full bg-[var(--line)]" />
            </div>

            {title && (
              <div className="px-6 pb-3 pt-1 border-b border-[var(--line-subtle)] flex items-center justify-between">
                <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar hoja"
                  className="tap-target text-[var(--text-muted)] hover:text-[var(--text)] text-sm rounded-full"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
