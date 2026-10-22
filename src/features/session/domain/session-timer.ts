export type TimerListener = (seconds: number) => void

export interface TimerSnapshot {
  seconds: number
  isRunning: boolean
  formatted: string
}

/**
 * SessionTimer: Cronómetro de sesión implementado con el patrón Observer.
 * Desacoplado de React para permitir pruebas unitarias precisas.
 */
export class SessionTimer {
  #seconds = 0
  #isRunning = false
  #intervalId: ReturnType<typeof setInterval> | null = null
  readonly #listeners: Set<TimerListener> = new Set()

  constructor(initialSeconds = 0) {
    this.#seconds = Math.max(0, initialSeconds)
  }

  get seconds(): number {
    return this.#seconds
  }

  get isRunning(): boolean {
    return this.#isRunning
  }

  get formatted(): string {
    return SessionTimer.format(this.#seconds)
  }

  public static format(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  public start(): void {
    if (this.#isRunning) return
    this.#isRunning = true

    this.#intervalId = setInterval(() => {
      this.#seconds++
      this.#notify()
    }, 1000)
    this.#notify()
  }

  public pause(): void {
    if (!this.#isRunning) return
    this.#isRunning = false
    if (this.#intervalId) {
      clearInterval(this.#intervalId)
      this.#intervalId = null
    }
    this.#notify()
  }

  public reset(toSeconds = 0): void {
    this.pause()
    this.#seconds = Math.max(0, toSeconds)
    this.#notify()
  }

  public subscribe(listener: TimerListener): () => void {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }

  public getSnapshot(): TimerSnapshot {
    return {
      seconds: this.#seconds,
      isRunning: this.#isRunning,
      formatted: this.formatted,
    }
  }

  #notify(): void {
    for (const listener of this.#listeners) {
      listener(this.#seconds)
    }
  }
}
