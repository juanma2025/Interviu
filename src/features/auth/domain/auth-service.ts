import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
  type Auth,
} from 'firebase/auth'
import {
  UserProfile,
  ValidationError,
  AuthError,
} from '../../../../shared/domain/index.js'
import type { ApiClient } from '../../../lib/api-client.js'

export interface AuthState {
  user: UserProfile | null
  firebaseUser: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export type AuthListener = () => void

export class AuthService {
  readonly #auth: Auth
  readonly #apiClient: ApiClient
  #currentUser: UserProfile | null = null
  #firebaseUser: User | null = null
  #isLoading = true
  readonly #listeners: Set<AuthListener> = new Set()
  #snapshot: AuthState

  constructor(auth: Auth, apiClient: ApiClient) {
    this.#auth = auth
    this.#apiClient = apiClient

    this.#snapshot = Object.freeze({
      user: null,
      firebaseUser: null,
      isLoading: true,
      isAuthenticated: false,
    })

    // Escuchar cambios de autenticación persistente
    onAuthStateChanged(this.#auth, async (firebaseUser) => {
      this.#firebaseUser = firebaseUser
      if (firebaseUser) {
        this.#currentUser = new UserProfile({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          targetRole: 'fullstack',
          level: 'semi-senior',
          onboardingDone: false,
        })
      } else {
        this.#currentUser = null
      }
      this.#isLoading = false
      this.#updateSnapshotAndNotify()
    })
  }

  public get user(): UserProfile | null {
    return this.#currentUser
  }

  public get firebaseUser(): User | null {
    return this.#firebaseUser
  }

  public get isLoading(): boolean {
    return this.#isLoading
  }

  public get isAuthenticated(): boolean {
    return this.#currentUser !== null
  }

  public get apiClient(): ApiClient {
    return this.#apiClient
  }

  public static validateRegistration(email: string, password: string): void {
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new ValidationError('Ingresa un correo electrónico válido')
    }

    if (!password || password.length < 8) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres')
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (!hasLetter || !hasNumber) {
      throw new ValidationError('La contraseña debe contener al menos una letra y un número')
    }
  }

  public async register(
    email: string,
    password: string,
    displayName = ''
  ): Promise<UserProfile> {
    AuthService.validateRegistration(email, password)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.#auth,
        email.trim().toLowerCase(),
        password
      )

      // Enviar correo de verificación
      await sendEmailVerification(userCredential.user).catch((err) => {
        console.warn('[EmailVerificationWarning]', err)
      })

      const profile = new UserProfile({
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        displayName: displayName.trim(),
        targetRole: 'fullstack',
        level: 'semi-senior',
        onboardingDone: false,
      })

      this.#currentUser = profile
      this.#firebaseUser = userCredential.user
      this.#updateSnapshotAndNotify()

      return profile
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        throw new ValidationError('Este correo electrónico ya está registrado. Por favor, inicia sesión.')
      }
      throw new AuthError(`Error al registrar usuario: ${err.message || 'Inténtalo de nuevo'}`)
    }
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ user: UserProfile; mfaRequired: boolean; resolver?: unknown }> {
    if (!email || !password) {
      throw new ValidationError('El correo y la contraseña son requeridos')
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.#auth,
        email.trim().toLowerCase(),
        password
      )

      const profile = new UserProfile({
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        displayName: userCredential.user.displayName || '',
        targetRole: 'fullstack',
        level: 'semi-senior',
        onboardingDone: false,
      })

      this.#currentUser = profile
      this.#firebaseUser = userCredential.user
      this.#updateSnapshotAndNotify()

      return { user: profile, mfaRequired: false }
    } catch (err: any) {
      // Capturar requisito de MFA (Fase 5)
      if (err.code === 'auth/multi-factor-auth-required') {
        return {
          user: null as any,
          mfaRequired: true,
          resolver: err.resolver,
        }
      }

      // Mensaje genérico ante credenciales incorrectas para evitar enumeración de correos
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/invalid-login-credentials'
      ) {
        throw new AuthError('Correo electrónico o contraseña incorrectos')
      }

      throw new AuthError(`Error de autenticación: ${err.message || 'Verifica tus credenciales'}`)
    }
  }

  public async logout(): Promise<void> {
    await signOut(this.#auth)
    this.#currentUser = null
    this.#firebaseUser = null
    this.#updateSnapshotAndNotify()
  }

  public async sendPasswordReset(email: string): Promise<void> {
    if (!email || !email.includes('@')) {
      throw new ValidationError('Ingresa un correo electrónico válido para restablecer la contraseña')
    }

    try {
      await sendPasswordResetEmail(this.#auth, email.trim().toLowerCase())
    } catch {
      // Por seguridad y anti-enumeración, no revelar si el correo existe o no
    }
  }

  public async getIdToken(): Promise<string | null> {
    if (!this.#firebaseUser) return null
    return this.#firebaseUser.getIdToken()
  }

  public subscribe(listener: AuthListener): () => void {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }

  public getSnapshot(): AuthState {
    return this.#snapshot
  }

  #updateSnapshotAndNotify(): void {
    this.#snapshot = Object.freeze({
      user: this.#currentUser,
      firebaseUser: this.#firebaseUser,
      isLoading: this.#isLoading,
      isAuthenticated: this.#currentUser !== null,
    })
    for (const listener of this.#listeners) {
      listener()
    }
  }
}
