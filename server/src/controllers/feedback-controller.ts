import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { FeedbackService } from '../services/feedback-service.js'
import { AuthError } from '../../../shared/domain/index.js'

export class FeedbackController extends BaseController {
  readonly #feedbackService: FeedbackService

  constructor(feedbackService: FeedbackService) {
    super()
    this.#feedbackService = feedbackService
  }

  public submit = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const { type, message, score } = req.body
    const result = await this.#feedbackService.submitFeedback(req.user.uid, type, message, score)
    return this.created(res, result)
  })

  public npsSummary = this.asyncHandler(async (_req: Request, res: Response) => {
    const summary = await this.#feedbackService.calculateNpsSummary()
    return this.ok(res, summary)
  })
}
