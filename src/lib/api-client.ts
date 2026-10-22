import {
  ValidationError,
  AuthError,
  ForbiddenError,
  SecondFactorRequiredError,
  UsageLimitError,
  ProviderError,
  NotFoundError,
  AppError,
} from '../../shared/domain/index.js'

export class ApiError extends AppError {
  readonly #code: string
  readonly #statusCode: number

  constructor(message: string, code = 'API_ERROR', statusCode = 500, details?: unknown) {
    super(message, details)
    this.#code = code
    this.#statusCode = statusCode
  }

  get code(): string {
    return this.#code
  }

  get statusCode(): number {
    return this.#statusCode
  }
}

export type TokenProvider = () => Promise<string | null>

/**
 * ApiClient (Patrón Facade):
 * Simplifica y centraliza todas las llamadas HTTP al backend de Interviu (/api),
 * inyectando de forma transparente el token JWT de autenticación y mapeando
 * los códigos de error HTTP a la jerarquía de errores de dominio de la aplicación.
 */
export class ApiClient {
  readonly #baseUrl: string
  readonly #getToken: TokenProvider

  constructor(baseUrl = '/api', getToken: TokenProvider = async () => null) {
    this.#baseUrl = baseUrl.replace(/\/$/, '')
    this.#getToken = getToken
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.#request<T>('GET', endpoint)
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.#request<T>('POST', endpoint, body)
  }

  public async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.#request<T>('PUT', endpoint, body)
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.#request<T>('DELETE', endpoint)
  }

  async #request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${this.#baseUrl}${cleanEndpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = await this.#getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    let response: Response
    try {
      response = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      })
    } catch (networkErr: any) {
      throw new ApiError(
        `Error de red al conectar con el servidor: ${networkErr?.message || 'Servidor no disponible'}`,
        'NETWORK_ERROR',
        0
      )
    }

    if (response.status === 204) {
      return null as T
    }

    let data: any = null
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json().catch(() => null)
    }

    if (!response.ok) {
      const errorPayload = data?.error || {}
      const message = errorPayload.message || response.statusText || 'Error en la solicitud'
      const code = errorPayload.code || 'UNKNOWN_ERROR'
      const details = errorPayload.details

      switch (response.status) {
        case 400:
          throw new ValidationError(message, details)
        case 401:
          throw new AuthError(message, details)
        case 403:
          if (code === 'SECOND_FACTOR_REQUIRED') {
            throw new SecondFactorRequiredError(message, details)
          }
          throw new ForbiddenError(message, details)
        case 404:
          throw new NotFoundError(message, details)
        case 429:
          throw new UsageLimitError(message, details)
        case 502:
          throw new ProviderError(message, details)
        default:
          throw new ApiError(message, code, response.status, details)
      }
    }

    return data as T
  }
}
