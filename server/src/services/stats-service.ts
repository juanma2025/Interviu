import { StatsCalculator } from '../../../shared/domain/index.js'
import type { ISessionRepository } from '../repositories/interfaces.js'

export class StatsService {
  readonly #sessionRepo: ISessionRepository

  constructor(sessionRepo: ISessionRepository) {
    this.#sessionRepo = sessionRepo
  }

  public async getUserStats(userId: string) {
    const records = await this.#sessionRepo.getPracticeRecords(userId)
    return StatsCalculator.compute(records)
  }
}
