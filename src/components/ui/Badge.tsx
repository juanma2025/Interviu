import React from 'react'

export interface BadgeProps {
  variant?: 'default' | 'accent' | 'highlight' | 'danger' | 'category'
  category?: 'comportamiento' | 'tecnica' | 'sistemas' | 'cierre'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', category, children, className = '' }: BadgeProps) {
  let styleClasses = 'bg-[var(--surface-subtle)] text-[var(--text-muted)] border-[var(--line)]'

  if (category) {
    const categoryStyles: Record<string, string> = {
      comportamiento: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50',
      tecnica: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
      sistemas: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
      cierre: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
    }
    styleClasses = categoryStyles[category] || styleClasses
  } else if (variant === 'accent') {
    styleClasses = 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/20'
  } else if (variant === 'highlight') {
    styleClasses = 'bg-amber-50 text-[var(--highlight)] border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/40'
  } else if (variant === 'danger') {
    styleClasses = 'bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]/20'
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border select-none ${styleClasses} ${className}`}
    >
      {children}
    </span>
  )
}
