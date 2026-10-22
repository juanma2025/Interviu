import React, { useState } from 'react'
import { Badge } from '../ui/Badge.js'

export interface QuestionCardProps {
  id: string
  text: string
  category: 'comportamiento' | 'tecnica' | 'sistemas' | 'cierre'
  estimatedSeconds: number
  tip: string
  role?: string[]
  level?: string[]
  onSelect?: () => void
}

export function QuestionCard({
  text,
  category,
  estimatedSeconds,
  tip,
  onSelect,
}: QuestionCardProps) {
  const [showTip, setShowTip] = useState(false)

  const minutes = Math.floor(estimatedSeconds / 60)
  const seconds = estimatedSeconds % 60
  const timeFormatted = `${minutes > 0 ? `${minutes}m ` : ''}${seconds > 0 ? `${seconds}s` : ''}`

  return (
    <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-4 transition-all hover:border-[var(--accent)]/40">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge category={category} className="capitalize">
            {category}
          </Badge>
          <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
            ⏱ {timeFormatted}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[var(--text)] leading-snug">{text}</h3>
      </div>

      <div className="pt-2 border-t border-[var(--line-subtle)] flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowTip(!showTip)}
          className="text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1 tap-target self-start"
        >
          <span>{showTip ? 'Ocultar consejo' : 'Ver consejo del entrevistador'}</span>
          <span>{showTip ? '▲' : '▼'}</span>
        </button>

        {showTip && (
          <div className="p-3 rounded-[12px] bg-[var(--surface-subtle)] text-xs text-[var(--text-muted)] leading-relaxed border border-[var(--line)]">
            💡 {tip}
          </div>
        )}

        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="w-full mt-2 tap-target rounded-[12px] bg-[var(--surface-subtle)] hover:bg-[var(--line)] text-[var(--text)] text-xs font-semibold py-2 px-4 border border-[var(--line)] transition-colors"
          >
            Practicar esta pregunta →
          </button>
        )}
      </div>
    </div>
  )
}
