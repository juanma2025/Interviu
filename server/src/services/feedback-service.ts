import { ValidationError } from '../../../shared/domain/index.js'
import type { IFeedbackRepository, FeedbackRecord } from '../repositories/interfaces.js'

export class FeedbackService {
  readonly #feedbackRepo: IFeedbackRepository

  constructor(feedbackRepo: IFeedbackRepository) {
    this.#feedbackRepo = feedbackRepo
  }

  public async submitFeedback(
    userId: string,
    type: 'suggestion' | 'nps',
    message: string,
    score?: number | null
  ): Promise<FeedbackRecord> {
    if (type === 'nps' && (typeof score !== 'number' || score < 0 || score > 10)) {
      throw new ValidationError('El puntaje NPS debe estar entre 0 y 10')
    }
    if (type === 'suggestion' && (!message || message.trim().length < 5)) {
      throw new ValidationError('La sugerencia debe contener al menos 5 caracteres')
    }

    const record: FeedbackRecord = {
      id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      uid: userId,
      type,
      message: message ? message.trim() : '',
      score: score ?? null,
      createdAt: new Date().toISOString(),
    }

    await this.#feedbackRepo.save(record)
    return record
  }

  public async calculateNpsSummary(): Promise<{ nps: number; total: number; promoters: number; detractors: number }> {
    const list = await this.#feedbackRepo.list()
    const npsRecords = list.filter((f) => f.type === 'nps' && typeof f.score === 'number')

    if (npsRecords.length === 0) {
      return { nps: 0, total: 0, promoters: 0, detractors: 0 }
    }

    let promoters = 0 // 9-10
    let detractors = 0 // 0-6

    for (const r of npsRecords) {
      const s = r.score!
      if (s >= 9) promoters++
      else if (s <= 6) detractors++
    }

    const total = npsRecords.length
    const nps = Math.round(((promoters - detractors) / total) * 100)

    return { nps, total, promoters, detractors }
  }
}
