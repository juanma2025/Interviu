import { ValidationError } from '../errors/index.js'

export type QuestionCategory = 'comportamiento' | 'tecnica' | 'sistemas' | 'cierre'

export interface QuestionProps {
  id: string
  text: string
  category: QuestionCategory
  role: string[]
  level: string[]
  estimatedSeconds: number
  tip: string
  active: boolean
}

export class Question {
  readonly #id: string
  readonly #text: string
  readonly #category: QuestionCategory
  readonly #role: readonly string[]
  readonly #level: readonly string[]
  readonly #estimatedSeconds: number
  readonly #tip: string
  readonly #active: boolean

  constructor(props: QuestionProps) {
    if (!props.id || props.id.trim().length === 0) {
      throw new ValidationError('El ID de la pregunta no puede estar vacío')
    }
    if (!props.text || props.text.trim().length < 10) {
      throw new ValidationError('El texto de la pregunta debe tener al menos 10 caracteres')
    }
    const validCategories: QuestionCategory[] = ['comportamiento', 'tecnica', 'sistemas', 'cierre']
    if (!validCategories.includes(props.category)) {
      throw new ValidationError(`Categoría no válida: ${props.category}`)
    }
    if (!props.role || props.role.length === 0) {
      throw new ValidationError('Debe asignarse al menos un rol a la pregunta')
    }
    if (!props.level || props.level.length === 0) {
      throw new ValidationError('Debe asignarse al menos un nivel a la pregunta')
    }
    if (typeof props.estimatedSeconds !== 'number' || props.estimatedSeconds <= 0) {
      throw new ValidationError('La duración estimada debe ser un número positivo de segundos')
    }
    if (!props.tip || props.tip.trim().length < 5) {
      throw new ValidationError('El consejo debe tener al menos 5 caracteres')
    }

    this.#id = props.id.trim()
    this.#text = props.text.trim()
    this.#category = props.category
    this.#role = Object.freeze([...props.role])
    this.#level = Object.freeze([...props.level])
    this.#estimatedSeconds = Math.round(props.estimatedSeconds)
    this.#tip = props.tip.trim()
    this.#active = Boolean(props.active)
  }

  get id(): string {
    return this.#id
  }

  get text(): string {
    return this.#text
  }

  get category(): QuestionCategory {
    return this.#category
  }

  get role(): readonly string[] {
    return this.#role
  }

  get level(): readonly string[] {
    return this.#level
  }

  get estimatedSeconds(): number {
    return this.#estimatedSeconds
  }

  get tip(): string {
    return this.#tip
  }

  get active(): boolean {
    return this.#active
  }

  public matches(targetRole: string, targetLevel: string): boolean {
    const roleMatch = this.#role.includes(targetRole)
    const levelMatch = this.#level.includes(targetLevel)
    return roleMatch && levelMatch
  }

  public toJSON(): QuestionProps {
    return {
      id: this.#id,
      text: this.#text,
      category: this.#category,
      role: [...this.#role],
      level: [...this.#level],
      estimatedSeconds: this.#estimatedSeconds,
      tip: this.#tip,
      active: this.#active,
    }
  }
}
