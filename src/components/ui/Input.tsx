import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, startIcon, endIcon, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[var(--text-muted)] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {startIcon && (
            <span className="absolute left-3.5 text-[var(--text-muted)] flex items-center pointer-events-none">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`w-full min-h-[44px] px-3.5 py-2 rounded-[12px] bg-[var(--surface)] border text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
              startIcon ? 'pl-10' : ''
            } ${endIcon ? 'pr-10' : ''} ${
              error ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--line)]'
            } ${className}`}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-3.5 text-[var(--text-muted)] flex items-center pointer-events-none">
              {endIcon}
            </span>
          )}
        </div>
        {error && (
          <span id={`${inputId}-error`} role="alert" className="text-xs text-[var(--danger)] font-medium">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={`${inputId}-helper`} className="text-xs text-[var(--text-muted)]">
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
