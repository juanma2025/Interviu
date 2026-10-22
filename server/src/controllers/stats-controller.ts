import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { StatsService } from '../services/stats-service.js'
import { AuthError } from '../../../shared/domain/index.js'

export class StatsController extends BaseController {
  readonly #statsService: StatsService

  constructor(statsService: StatsService) {
    super()
    this.#statsService = statsService
  }

  public getStats = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    const stats = await this.#statsService.getUserStats(req.user.uid)
    return this.ok(res, stats)
  })
}
