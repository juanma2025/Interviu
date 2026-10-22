import { ValidationError } from '../errors/index.js'
import { Score } from './score.js'

export type StarType = 'situation' | 'task' | 'action' | 'result'

export interface StarSegmentProps {
  type: StarType
  start: number
  end: number
}

export class StarSegment {
  readonly #type: StarType
  readonly #start: number
  readonly #end: number

  constructor(props: StarSegmentProps) {
    const validTypes: StarType[] = ['situation', 'task', 'action', 'result']
    if (!validTypes.includes(props.type)) {
      throw new ValidationError(`Tipo de segmento STAR inválido: ${props.type}`)
    }
    if (typeof props.start !== 'number' || props.start < 0) {
      throw new ValidationError(`Índice inicial STAR inválido: ${props.start}`)
    }
    if (typeof props.end !== 'number' || props.end <= props.start) {
      throw new ValidationError(`Índice final STAR debe ser mayor al inicial: ${props.end} <= ${props.start}`)
    }
    this.#type = props.type
    this.#start = props.start
    this.#end = props.end
  }

  get type(): StarType {
    return this.#type
  }

  get start(): number {
    return this.#start
  }

  get end(): number {
    return this.#end
  }

  public toJSON(): StarSegmentProps {
    return {
      type: this.#type,
      start: this.#start,
      end: this.#end,
    }
  }
}

export interface CriterionProps {
  key: string
  met: boolean
  comment: string
  suggestion?: string | null
}

export class Criterion {
  readonly #key: string
  readonly #met: boolean
  readonly #comment: string
  readonly #suggestion: string | null

  constructor(props: CriterionProps) {
    if (!props.key || props.key.trim().length === 0) {
      throw new ValidationError('La clave del criterio no puede estar vacía')
    }
    if (!props.comment || props.comment.trim().length === 0) {
      throw new ValidationError('El comentario del criterio no puede estar vacío')
    }
    this.#key = props.key.trim()
    this.#met = Boolean(props.met)
    this.#comment = props.comment.trim()
    this.#suggestion = props.suggestion ? props.suggestion.trim() : null
  }

  get key(): string {
    return this.#key
  }

  get met(): boolean {
    return this.#met
  }

  get comment(): string {
    return this.#comment
  }

  get suggestion(): string | null {
    return this.#suggestion
  }

  public toJSON(): CriterionProps {
    return {
      key: this.#key,
      met: this.#met,
      comment: this.#comment,
      suggestion: this.#suggestion,
    }
  }
}

export interface EvaluationProps {
  score: Score | number
  criteria: CriterionProps[]
  starSegments: StarSegmentProps[]
  promptVersion: string
  rubricVersion: string
  createdAt?: string
}

export class Evaluation {
  readonly #score: Score
  readonly #criteria: readonly Criterion[]
  readonly #starSegments: readonly StarSegment[]
  readonly #promptVersion: string
  readonly #rubricVersion: string
  readonly #createdAt: string

  constructor(props: EvaluationProps) {
    this.#score = props.score instanceof Score ? props.score : Score.of(props.score)
    if (!props.criteria || props.criteria.length === 0) {
      throw new ValidationError('La evaluación debe contener al menos un criterio')
    }
    this.#criteria = Object.freeze(props.criteria.map((c) => new Criterion(c)))
    this.#starSegments = Object.freeze((props.starSegments || []).map((s) => new StarSegment(s)))
    this.#promptVersion = props.promptVersion || 'v1.0'
    this.#rubricVersion = props.rubricVersion || 'v1.0'
    this.#createdAt = props.createdAt || new Date().toISOString()
  }

  get score(): Score {
    return this.#score
  }

  get criteria(): readonly Criterion[] {
    return this.#criteria
  }

  get starSegments(): readonly StarSegment[] {
    return this.#starSegments
  }

  get promptVersion(): string {
    return this.#promptVersion
  }

  get rubricVersion(): string {
    return this.#rubricVersion
  }

  get createdAt(): string {
    return this.#createdAt
  }

  public toJSON() {
    return {
      score: this.#score.value,
      criteria: this.#criteria.map((c) => c.toJSON()),
      starSegments: this.#starSegments.map((s) => s.toJSON()),
      promptVersion: this.#promptVersion,
      rubricVersion: this.#rubricVersion,
      createdAt: this.#createdAt,
    }
  }
}
