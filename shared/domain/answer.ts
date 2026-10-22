import { ValidationError } from '../errors/index.js'
import { Evaluation } from './evaluation.js'

export type AnswerSource = 'text' | 'voice'
export type EvaluationStatus = 'pending' | 'done' | 'failed'

export interface AnswerProps {
  id: string
  questionId: string
  text: string
  seconds: number
  source: AnswerSource
  skipped: boolean
  evaluationStatus?: EvaluationStatus
  evaluation?: Evaluation | null
  createdAt?: string
}

export class Answer {
  readonly #id: string
  readonly #questionId: string
  readonly #text: string
  readonly #seconds: number
  readonly #source: AnswerSource
  readonly #skipped: boolean
  #evaluationStatus: EvaluationStatus
  #evaluation: Evaluation | null
  readonly #createdAt: string

  constructor(props: AnswerProps) {
    if (!props.id || props.id.trim().length === 0) {
      throw new ValidationError('El ID de la respuesta no puede estar vacío')
    }
    if (!props.questionId || props.questionId.trim().length === 0) {
      throw new ValidationError('El ID de la pregunta no puede estar vacío')
    }
    if (typeof props.seconds !== 'number' || props.seconds < 0) {
      throw new ValidationError('Los segundos deben ser un número no negativo')
    }
    const validSources: AnswerSource[] = ['text', 'voice']
    if (!validSources.includes(props.source)) {
      throw new ValidationError(`Fuente no válida: ${props.source}`)
    }

    const trimmedText = props.text ? props.text.trim() : ''
    const wordCount = Answer.countWords(trimmedText)

    if (!props.skipped && wordCount < 3) {
      throw new ValidationError(`La respuesta debe tener al menos 3 palabras (recibidas ${wordCount})`)
    }

    this.#id = props.id.trim()
    this.#questionId = props.questionId.trim()
    this.#text = trimmedText
    this.#seconds = Math.round(props.seconds)
    this.#source = props.source
    this.#skipped = Boolean(props.skipped)
    this.#evaluationStatus = props.evaluationStatus || 'pending'
    this.#evaluation = props.evaluation || null
    this.#createdAt = props.createdAt || new Date().toISOString()
  }

  public static countWords(text: string): number {
    if (!text || text.trim().length === 0) return 0
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  get id(): string {
    return this.#id
  }

  get questionId(): string {
    return this.#questionId
  }

  get text(): string {
    return this.#text
  }

  get seconds(): number {
    return this.#seconds
  }

  get source(): AnswerSource {
    return this.#source
  }

  get skipped(): boolean {
    return this.#skipped
  }

  get wordCount(): number {
    return Answer.countWords(this.#text)
  }

  get evaluationStatus(): EvaluationStatus {
    return this.#evaluationStatus
  }

  get evaluation(): Evaluation | null {
    return this.#evaluation
  }

  get createdAt(): string {
    return this.#createdAt
  }

  public completeEvaluation(evaluation: Evaluation): void {
    this.#evaluation = evaluation
    this.#evaluationStatus = 'done'
  }

  public markEvaluationFailed(): void {
    this.#evaluationStatus = 'failed'
  }

  public toJSON() {
    return {
      id: this.#id,
      questionId: this.#questionId,
      text: this.#text,
      seconds: this.#seconds,
      source: this.#source,
      skipped: this.#skipped,
      wordCount: this.wordCount,
      evaluationStatus: this.#evaluationStatus,
      evaluation: this.#evaluation ? this.#evaluation.toJSON() : null,
      createdAt: this.#createdAt,
    }
  }
}
