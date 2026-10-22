import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { EvaluationService } from '../services/evaluation-service.js'
import { AuthError } from '../../../shared/domain/index.js'

export class EvaluationController extends BaseController {
  readonly #evaluationService: EvaluationService

  constructor(evaluationService: EvaluationService) {
    super()
    this.#evaluationService = evaluationService
  }

  public evaluate = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const sessionId = String(req.params.sessionId)
    const answerId = String(req.params.answerId)
    const evaluation = await this.#evaluationService.evaluateAnswer(req.user.uid, sessionId, answerId)
    return this.ok(res, evaluation.toJSON())
  })
}
