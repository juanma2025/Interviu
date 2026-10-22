import { InterviewSession, type SessionQuestion, type Question } from '../../../shared/domain/index.js'
import type { IQuestionRepository, ISessionRepository } from '../repositories/interfaces.js'

export class SessionFactory {
  readonly #questionRepo: IQuestionRepository
  readonly #sessionRepo: ISessionRepository

  constructor(questionRepo: IQuestionRepository, sessionRepo: ISessionRepository) {
    this.#questionRepo = questionRepo
    this.#sessionRepo = sessionRepo
  }

  /**
   * Genera una nueva sesión balanceada de 5 a 6 preguntas según el rol y nivel del usuario,
   * procurando no repetir preguntas de sesiones recientes.
   */
  public async createSession(
    userId: string,
    targetRole = 'fullstack',
    targetLevel = 'semi-senior',
    targetCount = 5
  ): Promise<InterviewSession> {
    const candidateQuestions = await this.#questionRepo.findByFilters(targetRole, targetLevel)
    const recentSessions = await this.#sessionRepo.listByUser(userId, 3)

    const recentlyUsedIds = new Set<string>()
    for (const s of recentSessions) {
      for (const sq of s.queue) {
        recentlyUsedIds.add(sq.questionId)
      }
    }

    // Filtrar preguntas recientes si hay suficientes preguntas disponibles
    const freshQuestions = candidateQuestions.filter((q) => !recentlyUsedIds.has(q.id))
    const pool = freshQuestions.length >= targetCount ? freshQuestions : candidateQuestions

    // Agrupar por categoría para balancear: comportamiento, tecnica, sistemas, cierre
    const byCategory: Record<string, Question[]> = {
      comportamiento: [],
      tecnica: [],
      sistemas: [],
      cierre: [],
    }

    for (const q of pool) {
      if (byCategory[q.category]) {
        byCategory[q.category].push(q)
      }
    }

    const selectedQuestions: Question[] = []

    // 1 de comportamiento
    if (byCategory.comportamiento.length > 0) {
      selectedQuestions.push(this.pickRandom(byCategory.comportamiento))
    }
    // 2 técnicas
    for (let i = 0; i < 2 && byCategory.tecnica.length > 0; i++) {
      const picked = this.pickRandom(byCategory.tecnica)
      selectedQuestions.push(picked)
      byCategory.tecnica = byCategory.tecnica.filter((q) => q.id !== picked.id)
    }
    // 1 de diseño de sistemas
    if (byCategory.sistemas.length > 0) {
      selectedQuestions.push(this.pickRandom(byCategory.sistemas))
    }
    // 1 de cierre
    if (byCategory.cierre.length > 0) {
      selectedQuestions.push(this.pickRandom(byCategory.cierre))
    }

    // Si aún faltan para llegar a targetCount, rellenar de la piscina general
    const selectedIds = new Set(selectedQuestions.map((q) => q.id))
    const remaining = pool.filter((q) => !selectedIds.has(q.id))

    while (selectedQuestions.length < targetCount && remaining.length > 0) {
      const picked = this.pickRandom(remaining)
      selectedQuestions.push(picked)
      selectedIds.add(picked.id)
      const idx = remaining.indexOf(picked)
      if (idx !== -1) remaining.splice(idx, 1)
    }

    const queue: SessionQuestion[] = selectedQuestions.map((q, idx) => ({
      id: `sq_${idx + 1}`,
      questionId: q.id,
      text: q.text,
      category: q.category,
      answer: null,
    }))

    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    return new InterviewSession({
      id: sessionId,
      userId,
      queue,
      currentIndex: 0,
      status: 'active',
    })
  }

  private pickRandom<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }
}
