import {
  Rubric,
  NotFoundError,
  type Evaluation,
} from '../../../shared/domain/index.js'
import type { FeedbackProvider } from '../adapters/feedback-provider.js'
import type {
  IAnswerRepository,
  IQuestionRepository,
  ISessionRepository,
  IUsageRepository,
  IUserRepository,
} from '../repositories/interfaces.js'

export class EvaluationService {
  readonly #feedbackProvider: FeedbackProvider
  readonly #questionRepo: IQuestionRepository
  readonly #answerRepo: IAnswerRepository
  readonly #sessionRepo: ISessionRepository
  readonly #usageRepo: IUsageRepository
  readonly #userRepo: IUserRepository

  constructor(
    feedbackProvider: FeedbackProvider,
    questionRepo: IQuestionRepository,
    answerRepo: IAnswerRepository,
    sessionRepo: ISessionRepository,
    usageRepo: IUsageRepository,
    userRepo: IUserRepository
  ) {
    this.#feedbackProvider = feedbackProvider
    this.#questionRepo = questionRepo
    this.#answerRepo = answerRepo
    this.#sessionRepo = sessionRepo
    this.#usageRepo = usageRepo
    this.#userRepo = userRepo
  }

  public async evaluateAnswer(
    userId: string,
    sessionId: string,
    answerId: string
  ): Promise<Evaluation> {
    const answer = await this.#answerRepo.findById(userId, sessionId, answerId)
    if (!answer) {
      throw new NotFoundError(`Respuesta con ID '${answerId}' no encontrada`)
    }

    const question = await this.#questionRepo.findById(answer.questionId)
    if (!question) {
      throw new NotFoundError(`Pregunta con ID '${answer.questionId}' no encontrada`)
    }

    const _user = await this.#userRepo.findById(userId)
    const rubric = Rubric.createDefault()

    try {
      const { evaluation, tokensIn, tokensOut } = await this.#feedbackProvider.evaluate(
        question.text,
        question.tip,
        answer.text,
        rubric
      )

      // Registrar consumo mensual de tokens e invocaciones de IA
      const now = new Date()
      const monthYear = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
      await this.#usageRepo.incrementUsage(userId, monthYear, tokensIn, tokensOut)

      // Actualizar estado de la respuesta a 'done'
      answer.completeEvaluation(evaluation)
      await this.#answerRepo.save(userId, sessionId, answer)

      // Actualizar la respuesta en el agregado InterviewSession
      const session = await this.#sessionRepo.findById(userId, sessionId)
      if (session) {
        const item = session.queue.find((q) => q.questionId === answer.questionId)
        if (item) {
          item.answer = answer
          await this.#sessionRepo.save(session)
        }
      }

      return evaluation
    } catch (err) {
      // En caso de fallo de IA, no perder el texto de la respuesta del usuario
      answer.markEvaluationFailed()
      await this.#answerRepo.save(userId, sessionId, answer)
      throw err
    }
  }
}
