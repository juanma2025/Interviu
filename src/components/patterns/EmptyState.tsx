import React from 'react'
import { Button } from '../ui/Button.js'

export interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`p-10 rounded-[24px] border border-dashed border-[var(--line)] bg-[var(--surface-subtle)]/40 flex flex-col items-center justify-center text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-2xl text-[var(--accent)] mb-4 shadow-xs">
        {icon || '🎯'}
      </div>

      <h3 className="text-lg font-bold text-[var(--text)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xs">{description}</p>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
