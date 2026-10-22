import { ValidationError } from '../errors/index.js'

export interface RubricCriterionConfig {
  key: string
  name: string
  description: string
  weight: number // Peso relativo (ej. 0.20 para 20%)
}

export interface RubricProps {
  version: string
  criteria: RubricCriterionConfig[]
}

export class Rubric {
  readonly #version: string
  readonly #criteria: readonly RubricCriterionConfig[]

  constructor(props: RubricProps) {
    if (!props.version || props.version.trim().length === 0) {
      throw new ValidationError('La versión de la rúbrica no puede estar vacía')
    }
    if (!props.criteria || props.criteria.length === 0) {
      throw new ValidationError('La rúbrica debe contener al menos un criterio')
    }

    const totalWeight = props.criteria.reduce((sum, c) => sum + c.weight, 0)
    // Validar suma de pesos aproximada a 1 (tolerancia a float)
    if (Math.abs(totalWeight - 1.0) > 0.01) {
      throw new ValidationError(`La suma de los pesos de la rúbrica debe ser 1.0, suma actual: ${totalWeight.toFixed(2)}`)
    }

    this.#version = props.version.trim()
    this.#criteria = Object.freeze(props.criteria.map((c) => ({ ...c })))
  }

  get version(): string {
    return this.#version
  }

  get criteria(): readonly RubricCriterionConfig[] {
    return this.#criteria
  }

  public getCriterion(key: string): RubricCriterionConfig | undefined {
    return this.#criteria.find((c) => c.key === key)
  }

  /**
   * Rúbrica oficial estándar STAR para Interviu (v1.0)
   */
  public static createDefault(): Rubric {
    return new Rubric({
      version: 'v1.0',
      criteria: [
        {
          key: 'adequate_length',
          name: 'Extensión adecuada',
          description: 'La respuesta tiene la profundidad y detalle necesarios sin divagar.',
          weight: 0.15,
        },
        {
          key: 'concrete_example',
          name: 'Ejemplo concreto o medible',
          description: 'Aporta métricas, datos precisos o situaciones reales de proyectos anteriores.',
          weight: 0.25,
        },
        {
          key: 'result_mentioned',
          name: 'Resultado mencionado',
          description: 'Detalla con claridad el impacto, desenlace o beneficio obtenido de la acción.',
          weight: 0.20,
        },
        {
          key: 'star_structure',
          name: 'Estructura STAR',
          description: 'Sigue una secuencia lógica de Situación, Tarea, Acción y Resultado.',
          weight: 0.25,
        },
        {
          key: 'learning_reflection',
          name: 'Reflexión y aprendizaje',
          description: 'Identifica aprendizajes obtenidos y qué haría diferente en el futuro.',
          weight: 0.15,
        },
      ],
    })
  }

  public toJSON(): RubricProps {
    return {
      version: this.#version,
      criteria: [...this.#criteria],
    }
  }
}
