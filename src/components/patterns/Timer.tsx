
export interface TimerProps {
  formattedTime: string
  isRunning?: boolean
  onToggle?: () => void
  onReset?: () => void
  className?: string
}

export function Timer({
  formattedTime,
  isRunning = true,
  onToggle,
  onReset,
  className = '',
}: TimerProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-[var(--surface-subtle)] border border-[var(--line)] ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isRunning && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isRunning ? 'bg-[var(--accent)]' : 'bg-[var(--text-muted)]'
          }`}
        ></span>
      </span>

      <span className="font-mono text-sm font-semibold tracking-wider text-[var(--text)] select-none">
        {formattedTime}
      </span>

      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] tap-target p-1 cursor-pointer"
          title={isRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
        >
          {isRunning ? '⏸' : '▶'}
        </button>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] tap-target p-1 cursor-pointer"
          title="Reiniciar cronómetro"
        >
          ↺
        </button>
      )}
    </div>
  )
}
