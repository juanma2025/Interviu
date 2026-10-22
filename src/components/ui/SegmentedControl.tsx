import { motion, useReducedMotion } from 'motion/react'
import { springConfig } from '../../motion/easings.js'

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  layoutId?: string
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId = 'segmented-control-pill',
  className = '',
}: SegmentedControlProps<T>) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      role="radiogroup"
      className={`inline-flex p-1 bg-[var(--surface-subtle)] rounded-[14px] border border-[var(--line)] ${className}`}
    >
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative tap-target px-4 py-1.5 rounded-[10px] text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              isSelected ? 'text-[var(--text)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId={layoutId}
                transition={shouldReduceMotion ? { duration: 0.1 } : springConfig.tabIndicator}
                className="absolute inset-0 bg-[var(--surface)] rounded-[10px] shadow-xs -z-10"
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
