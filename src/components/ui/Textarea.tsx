import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  minWords?: number
  maxWords?: number
  showWordCount?: boolean
  onWordCountChange?: (count: number) => void
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      minWords = 3,
      maxWords,
      showWordCount = true,
      onWordCountChange,
      value,
      id,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

    const textValue = typeof value === 'string' ? value : ''
    const wordCount = textValue.trim().length === 0 ? 0 : textValue.trim().split(/\s+/).filter(Boolean).length

    const isBelowMin = minWords ? wordCount < minWords && wordCount > 0 : false
    const isAboveMax = maxWords ? wordCount > maxWords : false

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      const count = e.target.value.trim().length === 0 ? 0 : e.target.value.trim().split(/\s+/).filter(Boolean).length
      onWordCountChange?.(count)
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold text-[var(--text-muted)] select-none">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            ref={ref}
            id={textareaId}
            value={value}
            onChange={handleChange}
            rows={5}
            aria-invalid={Boolean(error || isAboveMax)}
            className={`w-full p-3.5 rounded-[16px] bg-[var(--surface)] border text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-y min-h-[120px] transition-all leading-relaxed ${
              error || isAboveMax
                ? 'border-[var(--danger)] focus:ring-[var(--danger)]'
                : 'border-[var(--line)]'
            } ${className}`}
            {...props}
          />
        </div>

        <div className="flex justify-between items-center text-xs mt-0.5">
          {error ? (
            <span role="alert" className="text-[var(--danger)] font-medium">
              {error}
            </span>
          ) : isBelowMin ? (
            <span className="text-[var(--highlight)]">
              Mínimo requerido: {minWords} palabras (actual: {wordCount})
            </span>
          ) : (
            <span></span>
          )}

          {showWordCount && (
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono ml-auto">
              <span className={wordCount >= minWords ? 'text-[var(--accent)] font-semibold' : ''}>
                {wordCount}
              </span>
              {maxWords && <span>/ {maxWords}</span>}
              <span>palabras</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
