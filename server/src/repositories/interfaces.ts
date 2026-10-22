import type {
  Question,
  InterviewSession,
  Answer,
  UserProfile,
  PracticeSessionRecord,
} from '../../../shared/domain/index.js'

export interface IUserRepository {
  findById(uid: string): Promise<UserProfile | null>
  save(user: UserProfile): Promise<void>
  delete(uid: string): Promise<void>
}

export interface ISessionRepository {
  findById(userId: string, sessionId: string): Promise<InterviewSession | null>
  save(session: InterviewSession): Promise<void>
  listByUser(userId: string, limitCount?: number): Promise<InterviewSession[]>
  getPracticeRecords(userId: string): Promise<PracticeSessionRecord[]>
}

export interface IAnswerRepository {
  findById(userId: string, sessionId: string, answerId: string): Promise<Answer | null>
  save(userId: string, sessionId: string, answer: Answer): Promise<void>
  listBySession(userId: string, sessionId: string): Promise<Answer[]>
}

export interface IQuestionRepository {
  findById(id: string): Promise<Question | null>
  findAllActive(): Promise<Question[]>
  findByFilters(role?: string, level?: string, category?: string): Promise<Question[]>
  save(question: Question): Promise<void>
}

export interface UsageRecord {
  uid: string
  monthYear: string // 'YYYYMM'
  aiCalls: number
  tokensIn: number
  tokensOut: number
}

export interface IUsageRepository {
  getUsage(uid: string, monthYear: string): Promise<UsageRecord>
  incrementUsage(uid: string, monthYear: string, tokensIn?: number, tokensOut?: number): Promise<UsageRecord>
}

export interface FeedbackRecord {
  id: string
  uid: string
  type: 'suggestion' | 'nps'
  message: string
  score?: number | null
  createdAt: string
}

export interface IFeedbackRepository {
  save(feedback: FeedbackRecord): Promise<void>
  list(period?: string): Promise<FeedbackRecord[]>
}

export interface AppEventRecord {
  id: string
  uid: string
  name: string
  props: Record<string, unknown>
  createdAt: string
}

export interface IEventRepository {
  save(event: AppEventRecord): Promise<void>
}
