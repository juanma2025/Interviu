import { z } from 'zod'

export const EnvSchema = z.object({
  PORT: z.coerce.number().default(8080),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY es obligatoria para las evaluaciones con Claude'),
  CLAUDE_MODEL: z.string().default('claude-3-5-haiku-20241022'),
  GOOGLE_AI_API_KEY: z.string().optional().default(''),
  FIREBASE_SERVICE_ACCOUNT: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional().default('intervu-preview'),
  AI_MONTHLY_LIMIT_PER_USER: z.coerce.number().default(50),
  REMINDER_INACTIVE_DAYS: z.coerce.number().default(3),
})

export type EnvConfig = z.infer<typeof EnvSchema>

export class EnvironmentConfig {
  readonly #config: EnvConfig

  constructor(rawEnv: Record<string, unknown> = process.env) {
    const result = EnvSchema.safeParse(rawEnv)
    if (!result.success) {
      const issues = result.error.issues || []
      const formattedErrors = issues.map((e) => `[${e.path.join('.')}]: ${e.message}`).join(', ')
      throw new Error(`Error de configuración de variables de entorno: ${formattedErrors}`)
    }
    this.#config = result.data
  }

  get port(): number {
    return this.#config.PORT
  }

  get corsOrigin(): string {
    return this.#config.CORS_ORIGIN
  }

  get anthropicApiKey(): string {
    return this.#config.ANTHROPIC_API_KEY
  }

  get claudeModel(): string {
    return this.#config.CLAUDE_MODEL
  }

  get googleAiApiKey(): string {
    return this.#config.GOOGLE_AI_API_KEY
  }

  get firebaseServiceAccount(): string | undefined {
    return this.#config.FIREBASE_SERVICE_ACCOUNT
  }

  get firebaseProjectId(): string {
    return this.#config.FIREBASE_PROJECT_ID
  }

  get aiMonthlyLimitPerUser(): number {
    return this.#config.AI_MONTHLY_LIMIT_PER_USER
  }

  get reminderInactiveDays(): number {
    return this.#config.REMINDER_INACTIVE_DAYS
  }

  public toJSON(): EnvConfig {
    return { ...this.#config }
  }
}
