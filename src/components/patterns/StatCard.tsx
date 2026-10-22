import React from 'react'

export interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: {
    value: string
    isPositive?: boolean
  }
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ label, value, unit, trend, icon, className = '' }: StatCardProps) {
  return (
    <div
      className={`p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col justify-between gap-3 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-[var(--accent)] text-lg">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-[var(--text)] font-mono">{value}</span>
        {unit && <span className="text-sm font-medium text-[var(--text-muted)]">{unit}</span>}
      </div>

      {trend && (
        <div className="flex items-center gap-1 text-xs">
          <span
            className={`font-semibold ${
              trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-[var(--text-muted)]">vs. periodo anterior</span>
        </div>
      )}
    </div>
  )
}
