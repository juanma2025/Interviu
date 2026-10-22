import {
  Answer,
  type AnswerSource,
  NotFoundError,
  InterviewSession,
} from '../../../shared/domain/index.js'
import type { ISessionRepository, IAnswerRepository, IUserRepository } from '../repositories/interfaces.js'
import { SessionFactory } from './session-factory.js'

export class SessionService {
  readonly #sessionRepo: ISessionRepository
  readonly #answerRepo: IAnswerRepository
  readonly #userRepo: IUserRepository
  readonly #sessionFactory: SessionFactory

  constructor(
    sessionRepo: ISessionRepository,
    answerRepo: IAnswerRepository,
    userRepo: IUserRepository,
    sessionFactory: SessionFactory
  ) {
    this.#sessionRepo = sessionRepo
    this.#answerRepo = answerRepo
    this.#userRepo = userRepo
    this.#sessionFactory = sessionFactory
  }

  public async startSession(userId: string): Promise<InterviewSession> {
    const user = await this.#userRepo.findById(userId)
    const targetRole = user?.targetRole || 'fullstack'
    const targetLevel = user?.level || 'semi-senior'

    const session = await this.#sessionFactory.createSession(userId, targetRole, targetLevel, 5)
    await this.#sessionRepo.save(session)
    return session
  }

  public async getSession(userId: string, sessionId: string): Promise<InterviewSession> {
    const session = await this.#sessionRepo.findById(userId, sessionId)
    if (!session) {
      throw new NotFoundError(`Sesión con ID '${sessionId}' no encontrada`)
    }
    return session
  }

  public async listSessions(userId: string, limit = 20): Promise<InterviewSession[]> {
    return this.#sessionRepo.listByUser(userId, limit)
  }

  public async submitAnswer(
    userId: string,
    sessionId: string,
    props: {
      questionId: string
      text: string
      seconds: number
      source: AnswerSource
    }
  ): Promise<{ session: InterviewSession; answer: Answer }> {
    const session = await this.getSession(userId, sessionId)

    const answerId = `ans_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const answer = new Answer({
      id: answerId,
      questionId: props.questionId,
      text: props.text,
      seconds: props.seconds,
      source: props.source,
      skipped: false,
      evaluationStatus: 'pending',
    })

    // El agregado InterviewSession valida la regla de negocio y transiciona el estado
    session.submitAnswer(answer)
    session.advance()

    // Persistir respuesta y actualizar sesión
    await this.#answerRepo.save(userId, sessionId, answer)
    await this.#sessionRepo.save(session)

    return { session, answer }
  }

  public async skipQuestion(userId: string, sessionId: string): Promise<InterviewSession> {
    const session = await this.getSession(userId, sessionId)
    session.skip()
    await this.#sessionRepo.save(session)
    return session
  }
}
