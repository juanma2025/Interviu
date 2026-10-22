import { ValidationError } from '../errors/index.js'

export interface ConsentProps {
  analytics: boolean
  trainingData: boolean
  updatedAt?: string
}

export class Consent {
  readonly #analytics: boolean
  readonly #trainingData: boolean
  readonly #updatedAt: string

  constructor(props?: Partial<ConsentProps>) {
    this.#analytics = Boolean(props?.analytics)
    this.#trainingData = Boolean(props?.trainingData)
    this.#updatedAt = props?.updatedAt || new Date().toISOString()
  }

  get analytics(): boolean {
    return this.#analytics
  }

  get trainingData(): boolean {
    return this.#trainingData
  }

  get updatedAt(): string {
    return this.#updatedAt
  }

  public withUpdated(updates: Partial<ConsentProps>): Consent {
    return new Consent({
      analytics: updates.analytics !== undefined ? updates.analytics : this.#analytics,
      trainingData: updates.trainingData !== undefined ? updates.trainingData : this.#trainingData,
      updatedAt: new Date().toISOString(),
    })
  }

  public toJSON(): ConsentProps {
    return {
      analytics: this.#analytics,
      trainingData: this.#trainingData,
      updatedAt: this.#updatedAt,
    }
  }
}

export interface UserRemindersProps {
  enabled: boolean
}

export interface UserProfileProps {
  uid: string
  displayName: string
  email: string
  targetRole: string
  level: string
  onboardingDone: boolean
  consent?: ConsentProps
  reminders?: UserRemindersProps
  createdAt?: string
}

export class UserProfile {
  readonly #uid: string
  #displayName: string
  readonly #email: string
  #targetRole: string
  #level: string
  #onboardingDone: boolean
  #consent: Consent
  #remindersEnabled: boolean
  readonly #createdAt: string

  constructor(props: UserProfileProps) {
    if (!props.uid || props.uid.trim().length === 0) {
      throw new ValidationError('El UID de usuario no puede estar vacío')
    }
    if (!props.email || !props.email.includes('@')) {
      throw new ValidationError(`Correo electrónico inválido: ${props.email}`)
    }

    this.#uid = props.uid.trim()
    this.#displayName = props.displayName ? props.displayName.trim() : ''
    this.#email = props.email.trim().toLowerCase()
    this.#targetRole = props.targetRole || 'fullstack'
    this.#level = props.level || 'semi-senior'
    this.#onboardingDone = Boolean(props.onboardingDone)
    this.#consent = new Consent(props.consent)
    this.#remindersEnabled = props.reminders ? Boolean(props.reminders.enabled) : true
    this.#createdAt = props.createdAt || new Date().toISOString()
  }

  get uid(): string {
    return this.#uid
  }

  get displayName(): string {
    return this.#displayName
  }

  get email(): string {
    return this.#email
  }

  get targetRole(): string {
    return this.#targetRole
  }

  get level(): string {
    return this.#level
  }

  get onboardingDone(): boolean {
    return this.#onboardingDone
  }

  get consent(): Consent {
    return this.#consent
  }

  get remindersEnabled(): boolean {
    return this.#remindersEnabled
  }

  get createdAt(): string {
    return this.#createdAt
  }

  public updateRoleAndLevel(targetRole: string, level: string): void {
    if (!targetRole || targetRole.trim().length === 0) {
      throw new ValidationError('El rol objetivo no puede estar vacío')
    }
    if (!level || level.trim().length === 0) {
      throw new ValidationError('El nivel no puede estar vacío')
    }
    this.#targetRole = targetRole.trim()
    this.#level = level.trim()
  }

  public completeOnboarding(): void {
    this.#onboardingDone = true
  }

  public updateConsent(analytics: boolean, trainingData: boolean): void {
    this.#consent = this.#consent.withUpdated({ analytics, trainingData })
  }

  public setReminders(enabled: boolean): void {
    this.#remindersEnabled = Boolean(enabled)
  }

  public toJSON() {
    return {
      uid: this.#uid,
      displayName: this.#displayName,
      email: this.#email,
      targetRole: this.#targetRole,
      level: this.#level,
      onboardingDone: this.#onboardingDone,
      consent: this.#consent.toJSON(),
      reminders: {
        enabled: this.#remindersEnabled,
      },
      createdAt: this.#createdAt,
    }
  }
}
