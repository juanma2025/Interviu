import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { SessionService } from '../services/session-service.js'
import type { EvaluationService } from '../services/evaluation-service.js'
import { AuthError, ValidationError } from '../../../shared/domain/index.js'

export class SessionController extends BaseController {
  readonly #sessionService: SessionService
  readonly #evaluationService: EvaluationService

  constructor(sessionService: SessionService, evaluationService: EvaluationService) {
    super()
    this.#sessionService = sessionService
    this.#evaluationService = evaluationService
  }

  public create = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const session = await this.#sessionService.startSession(req.user.uid)
    return this.created(res, session.toJSON())
  })

  public list = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20
    const sessions = await this.#sessionService.listSessions(req.user.uid, limit)
    return this.ok(
      res,
      sessions.map((s) => s.toJSON())
    )
  })

  public getById = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const session = await this.#sessionService.getSession(req.user.uid, req.params.id)
    return this.ok(res, session.toJSON())
  })

  public submitAnswer = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const { questionId, text, seconds, source } = req.body

    if (!questionId) throw new ValidationError('questionId es obligatorio')
    if (typeof text !== 'string') throw new ValidationError('text debe ser una cadena')

    const { session, answer } = await this.#sessionService.submitAnswer(req.user.uid, req.params.id, {
      questionId,
      text,
      seconds: typeof seconds === 'number' ? seconds : 0,
      source: source || 'text',
    })

    // Disparar evaluación en segundo plano sin bloquear la respuesta si se desea,
    // o el cliente puede consultar el estado
    this.#evaluationService
      .evaluateAnswer(req.user.uid, session.id, answer.id)
      .catch((err) => console.error('[EvaluationBackgroundError]', err))

    return this.created(res, {
      session: session.toJSON(),
      answer: answer.toJSON(),
    })
  })

  public skip = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const session = await this.#sessionService.skipQuestion(req.user.uid, req.params.id)
    return this.ok(res, session.toJSON())
  })
}
