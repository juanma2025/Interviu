import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { easings } from '../../motion/easings.js'

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  const typeStyles = {
    success: 'bg-[var(--accent)] text-white',
    error: 'bg-[var(--danger)] text-white',
    info: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--line)] shadow-lg',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: easings.out }}
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-[16px] text-sm font-medium shadow-xl tap-target ${typeStyles[type]}`}
        >
          <span>{message}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-current opacity-70 hover:opacity-100 text-xs ml-2 cursor-pointer"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
