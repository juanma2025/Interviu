import type { Firestore } from 'firebase-admin/firestore'
import type { Auth } from 'firebase-admin/auth'
import type { EnvironmentConfig } from './config/env.js'

// Repositories
import type {
  IUserRepository,
  ISessionRepository,
  IAnswerRepository,
  IQuestionRepository,
  IUsageRepository,
  IFeedbackRepository,
  IEventRepository,
} from './repositories/interfaces.js'
import { FirestoreUserRepository } from './repositories/user-repository.js'
import { FirestoreSessionRepository } from './repositories/session-repository.js'
import { FirestoreAnswerRepository } from './repositories/answer-repository.js'
import { FirestoreQuestionRepository } from './repositories/question-repository.js'
import { FirestoreUsageRepository } from './repositories/usage-repository.js'
import { FirestoreFeedbackRepository } from './repositories/feedback-repository.js'
import { FirestoreEventRepository } from './repositories/event-repository.js'

// Adapters
import { type FeedbackProvider, ClaudeFeedbackProvider } from './adapters/feedback-provider.js'
import { type SpeechTranscriber, GeminiSpeechTranscriber } from './adapters/speech-transcriber.js'

// Factories & Services
import { SessionFactory } from './services/session-factory.js'
import { SessionService } from './services/session-service.js'
import { EvaluationService } from './services/evaluation-service.js'
import { StatsService } from './services/stats-service.js'
import { ReminderService, EmailReminderChannel, InAppReminderChannel } from './services/reminder-service.js'
import { FeedbackService } from './services/feedback-service.js'
import { AccountService } from './services/account-service.js'

// Guards
import { AuthGuard, SecondFactorGuard, UsageGuard, RateLimiter } from './guards/index.js'

// Controllers
import { SessionController } from './controllers/session-controller.js'
import { QuestionController } from './controllers/question-controller.js'
import { EvaluationController } from './controllers/evaluation-controller.js'
import { StatsController } from './controllers/stats-controller.js'
import { FeedbackController } from './controllers/feedback-controller.js'
import { AccountController } from './controllers/account-controller.js'

export interface ContainerDependencies {
  db: Firestore
  auth: Auth
  config: EnvironmentConfig
  feedbackProviderOverride?: FeedbackProvider
  speechTranscriberOverride?: SpeechTranscriber
}

/**
 * Composition Root de la aplicación (server/src/container.ts)
 * Arma el grafo completo de dependencias mediante inyección por constructor.
 * Sin estado estático mutable ni singletons ocultos.
 */
export class AppContainer {
  // Config
  public readonly config: EnvironmentConfig

  // Repositories
  public readonly userRepo: IUserRepository
  public readonly sessionRepo: ISessionRepository
  public readonly answerRepo: IAnswerRepository
  public readonly questionRepo: IQuestionRepository
  public readonly usageRepo: IUsageRepository
  public readonly feedbackRepo: IFeedbackRepository
  public readonly eventRepo: IEventRepository

  // Adapters
  public readonly feedbackProvider: FeedbackProvider
  public readonly speechTranscriber: SpeechTranscriber

  // Factories & Services
  public readonly sessionFactory: SessionFactory
  public readonly sessionService: SessionService
  public readonly evaluationService: EvaluationService
  public readonly statsService: StatsService
  public readonly reminderService: ReminderService
  public readonly feedbackService: FeedbackService
  public readonly accountService: AccountService

  // Guards
  public readonly authGuard: AuthGuard
  public readonly secondFactorGuard: SecondFactorGuard
  public readonly usageGuard: UsageGuard
  public readonly rateLimiter: RateLimiter

  // Controllers
  public readonly sessionController: SessionController
  public readonly questionController: QuestionController
  public readonly evaluationController: EvaluationController
  public readonly statsController: StatsController
  public readonly feedbackController: FeedbackController
  public readonly accountController: AccountController

  constructor(deps: ContainerDependencies) {
    this.config = deps.config

    // 1. Repositorios
    this.userRepo = new FirestoreUserRepository(deps.db)
    this.sessionRepo = new FirestoreSessionRepository(deps.db)
    this.answerRepo = new FirestoreAnswerRepository(deps.db)
    this.questionRepo = new FirestoreQuestionRepository(deps.db)
    this.usageRepo = new FirestoreUsageRepository(deps.db)
    this.feedbackRepo = new FirestoreFeedbackRepository(deps.db)
    this.eventRepo = new FirestoreEventRepository(deps.db)

    // 2. Adapters externos
    this.feedbackProvider =
      deps.feedbackProviderOverride ||
      new ClaudeFeedbackProvider(this.config.anthropicApiKey, this.config.claudeModel)

    this.speechTranscriber =
      deps.speechTranscriberOverride || new GeminiSpeechTranscriber(this.config.googleAiApiKey)

    // 3. Factories & Services
    this.sessionFactory = new SessionFactory(this.questionRepo, this.sessionRepo)
    this.sessionService = new SessionService(
      this.sessionRepo,
      this.answerRepo,
      this.userRepo,
      this.sessionFactory
    )
    this.evaluationService = new EvaluationService(
      this.feedbackProvider,
      this.questionRepo,
      this.answerRepo,
      this.sessionRepo,
      this.usageRepo,
      this.userRepo
    )
    this.statsService = new StatsService(this.sessionRepo)
    this.reminderService = new ReminderService(
      this.userRepo,
      this.sessionRepo,
      [new EmailReminderChannel(), new InAppReminderChannel()],
      this.config.reminderInactiveDays
    )
    this.feedbackService = new FeedbackService(this.feedbackRepo)
    this.accountService = new AccountService(this.userRepo)

    // 4. Guards
    this.authGuard = new AuthGuard(deps.auth)
    this.secondFactorGuard = new SecondFactorGuard()
    this.usageGuard = new UsageGuard(this.usageRepo, this.config.aiMonthlyLimitPerUser)
    this.rateLimiter = new RateLimiter(60, 60 * 1000)

    // 5. Controllers
    this.sessionController = new SessionController(this.sessionService, this.evaluationService)
    this.questionController = new QuestionController(this.questionRepo)
    this.evaluationController = new EvaluationController(this.evaluationService)
    this.statsController = new StatsController(this.statsService)
    this.feedbackController = new FeedbackController(this.feedbackService)
    this.accountController = new AccountController(this.accountService)
  }
}
