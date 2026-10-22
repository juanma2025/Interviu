import { ValidationError } from '../errors/index.js'
import { Answer } from './answer.js'

export interface SessionQuestion {
  readonly id: string
  readonly questionId: string
  readonly text?: string
  readonly category?: string
  answer?: Answer | null
}

export abstract class SessionState {
  public abstract readonly name: 'active' | 'completed'
  public abstract start(session: InterviewSession): void
  public abstract submitAnswer(session: InterviewSession, answer: Answer): void
  public abstract skip(session: InterviewSession): void
  public abstract advance(session: InterviewSession): void
  public abstract complete(session: InterviewSession): void
}

export class ActiveState extends SessionState {
  public readonly name = 'active' as const

  public start(_session: InterviewSession): void {
    throw new ValidationError('La sesión ya se encuentra activa')
  }

  public submitAnswer(session: InterviewSession, answer: Answer): void {
    const current = session.currentQuestion
    if (!current) {
      throw new ValidationError('No hay una pregunta activa en este momento')
    }
    if (answer.questionId !== current.questionId) {
      throw new ValidationError(
        `La respuesta no coincide con la pregunta actual: esperado ${current.questionId}, recibido ${answer.questionId}`
      )
    }

    session._setAnswer(session.currentIndex, answer)
  }

  public skip(session: InterviewSession): void {
    const current = session.currentQuestion
    if (!current) {
      throw new ValidationError('No hay una pregunta para omitir')
    }

    const skippedAnswer = new Answer({
      id: `skip_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      questionId: current.questionId,
      text: '',
      seconds: 0,
      source: 'text',
      skipped: true,
    })

    session._setAnswer(session.currentIndex, skippedAnswer)
    session.advance()
  }

  public advance(session: InterviewSession): void {
    const nextIndex = session.currentIndex + 1
    if (nextIndex >= session.queue.length) {
      this.complete(session)
    } else {
      session._setCurrentIndex(nextIndex)
    }
  }

  public complete(session: InterviewSession): void {
    session._transitionTo(new CompletedState())
    session._setCompletedAt(new Date().toISOString())
  }
}

export class CompletedState extends SessionState {
  public readonly name = 'completed' as const

  public start(_session: InterviewSession): void {
    throw new ValidationError('No se puede iniciar una sesión que ya ha sido completada')
  }

  public submitAnswer(_session: InterviewSession, _answer: Answer): void {
    throw new ValidationError('No se pueden enviar respuestas en una sesión completada')
  }

  public skip(_session: InterviewSession): void {
    throw new ValidationError('No se pueden omitir preguntas en una sesión completada')
  }

  public advance(_session: InterviewSession): void {
    throw new ValidationError('No se puede avanzar en una sesión completada')
  }

  public complete(_session: InterviewSession): void {
    throw new ValidationError('La sesión ya está completada')
  }
}

export interface InterviewSessionProps {
  id: string
  userId: string
  queue: SessionQuestion[]
  currentIndex?: number
  status?: 'active' | 'completed'
  startedAt?: string
  completedAt?: string | null
}

export class InterviewSession {
  readonly #id: string
  readonly #userId: string
  readonly #queue: SessionQuestion[]
  #currentIndex: number
  #state: SessionState
  #startedAt: string
  #completedAt: string | null

  constructor(props: InterviewSessionProps) {
    if (!props.id || props.id.trim().length === 0) {
      throw new ValidationError('El ID de la sesión no puede estar vacío')
    }
    if (!props.userId || props.userId.trim().length === 0) {
      throw new ValidationError('El ID de usuario no puede estar vacío')
    }
    if (!props.queue || props.queue.length === 0) {
      throw new ValidationError('La cola de preguntas de la sesión no puede estar vacía')
    }

    this.#id = props.id.trim()
    this.#userId = props.userId.trim()
    this.#queue = props.queue.map((q) => ({
      ...q,
      answer: q.answer ? (q.answer instanceof Answer ? q.answer : new Answer(q.answer)) : null,
    }))
    this.#currentIndex = props.currentIndex ?? 0
    this.#startedAt = props.startedAt || new Date().toISOString()
    this.#completedAt = props.completedAt || null

    if (props.status === 'completed' || this.#completedAt !== null) {
      this.#state = new CompletedState()
    } else {
      this.#state = new ActiveState()
    }
  }

  get id(): string {
    return this.#id
  }

  get userId(): string {
    return this.#userId
  }

  get queue(): readonly SessionQuestion[] {
    return this.#queue
  }

  get currentIndex(): number {
    return this.#currentIndex
  }

  get status(): 'active' | 'completed' {
    return this.#state.name
  }

  get isCompleted(): boolean {
    return this.#state instanceof CompletedState
  }

  get startedAt(): string {
    return this.#startedAt
  }

  get completedAt(): string | null {
    return this.#completedAt
  }

  get currentQuestion(): SessionQuestion | null {
    if (this.#currentIndex < 0 || this.#currentIndex >= this.#queue.length) {
      return null
    }
    return this.#queue[this.#currentIndex]
  }

  public start(): void {
    this.#state.start(this)
  }

  public submitAnswer(answer: Answer): void {
    this.#state.submitAnswer(this, answer)
  }

  public skip(): void {
    this.#state.skip(this)
  }

  public advance(): void {
    this.#state.advance(this)
  }

  public complete(): void {
    this.#state.complete(this)
  }

  public progress(): {
    total: number
    currentIndex: number
    answeredCount: number
    percentage: number
    isComplete: boolean
  } {
    const total = this.#queue.length
    const answeredCount = this.#queue.filter((q) => q.answer != null).length
    const percentage = total === 0 ? 0 : Math.round((answeredCount / total) * 100)
    return {
      total,
      currentIndex: this.#currentIndex,
      answeredCount,
      percentage,
      isComplete: this.isCompleted,
    }
  }

  // Métodos de mutación interna controlados por State
  public _setCurrentIndex(index: number): void {
    if (index < 0 || index >= this.#queue.length) {
      throw new ValidationError(`Índice fuera de rango: ${index}`)
    }
    this.#currentIndex = index
  }

  public _setAnswer(index: number, answer: Answer): void {
    if (index < 0 || index >= this.#queue.length) {
      throw new ValidationError(`Índice fuera de rango: ${index}`)
    }
    this.#queue[index].answer = answer
  }

  public _transitionTo(state: SessionState): void {
    this.#state = state
  }

  public _setCompletedAt(timestamp: string): void {
    this.#completedAt = timestamp
  }

  public toJSON() {
    return {
      id: this.#id,
      userId: this.#userId,
      currentIndex: this.#currentIndex,
      status: this.status,
      questionIds: this.#queue.map((q) => q.questionId),
      queue: this.#queue.map((q) => ({
        id: q.id,
        questionId: q.questionId,
        text: q.text,
        category: q.category,
        answer: q.answer ? q.answer.toJSON() : null,
      })),
      startedAt: this.#startedAt,
      completedAt: this.#completedAt,
    }
  }
}
