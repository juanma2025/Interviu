import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()

    const variantStyles = {
      primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] shadow-xs',
      secondary:
        'bg-[var(--surface-subtle)] text-[var(--text)] hover:bg-[var(--line)] border border-[var(--line)]',
      ghost: 'bg-transparent text-[var(--text)] hover:bg-[var(--surface-subtle)]',
      danger: 'bg-[var(--danger)] text-white hover:opacity-90 shadow-xs',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs min-h-[36px] rounded-[10px]',
      md: 'px-5 py-2.5 text-sm min-h-[44px] rounded-[12px]',
      lg: 'px-6 py-3.5 text-base min-h-[48px] rounded-[14px]',
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={shouldReduceMotion || disabled || isLoading ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.12 }}
        className={`tap-target inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Cargando...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {icon && <span className="inline-flex shrink-0">{icon}</span>}
            {children}
          </span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
