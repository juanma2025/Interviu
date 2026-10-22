import { ValidationError } from '../errors/index.js'

/**
 * Score: Value Object inmutable que representa un puntaje entre 0 y 10.
 * Se crea exclusivamente mediante el método estático de fábrica Score.of(n).
 */
export class Score {
  readonly #value: number

  private constructor(value: number) {
    this.#value = value
  }

  public static of(rawScore: number): Score {
    if (typeof rawScore !== 'number' || Number.isNaN(rawScore) || !Number.isFinite(rawScore)) {
      throw new ValidationError(`Puntaje inválido: debe ser un número finito, recibido ${rawScore}`)
    }
    if (rawScore < 0 || rawScore > 10) {
      throw new ValidationError(`Puntaje fuera de rango: debe estar entre 0 y 10, recibido ${rawScore}`)
    }
    // Redondear a 1 decimal para consistencia
    const rounded = Math.round(rawScore * 10) / 10
    return new Score(rounded)
  }

  get value(): number {
    return this.#value
  }

  get percentage(): number {
    return Math.round(this.#value * 10)
  }

  public isPassing(threshold = 7): boolean {
    return this.#value >= threshold
  }

  public equals(other: Score): boolean {
    if (!(other instanceof Score)) return false
    return this.#value === other.#value
  }

  public toString(): string {
    return this.#value.toFixed(1)
  }

  public toJSON(): number {
    return this.#value
  }
}
