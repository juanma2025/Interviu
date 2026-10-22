import type { DocumentData } from 'firebase-admin/firestore'
import { InterviewSession, type PracticeSessionRecord } from '../../../shared/domain/index.js'
import { FirestoreRepository } from './firestore-base.js'
import type { ISessionRepository } from './interfaces.js'

export class FirestoreSessionRepository extends FirestoreRepository<InterviewSession> implements ISessionRepository {
  protected readonly collectionName = 'users'

  protected toDomain(id: string, data: DocumentData): InterviewSession {
    return new InterviewSession({
      id,
      userId: data.userId,
      currentIndex: data.currentIndex ?? 0,
      status: data.status,
      queue: data.queue || (data.questionIds || []).map((qid: string, idx: number) => ({
        id: `sq_${idx + 1}`,
        questionId: qid,
      })),
      startedAt: data.startedAt,
      completedAt: data.completedAt,
    })
  }

  protected toDocument(entity: InterviewSession): DocumentData {
    return entity.toJSON()
  }

  private userSessions(userId: string) {
    return this.collection().doc(userId).collection('sessions')
  }

  public async findById(userId: string, sessionId: string): Promise<InterviewSession | null> {
    const snap = await this.userSessions(userId).doc(sessionId).get()
    if (!snap.exists) return null
    return this.toDomain(snap.id, snap.data()!)
  }

  public async save(session: InterviewSession): Promise<void> {
    await this.userSessions(session.userId)
      .doc(session.id)
      .set(this.toDocument(session), { merge: true })
  }

  public async listByUser(userId: string, limitCount = 20): Promise<InterviewSession[]> {
    const snaps = await this.userSessions(userId)
      .orderBy('startedAt', 'desc')
      .limit(limitCount)
      .get()

    return snaps.docs.map((doc) => this.toDomain(doc.id, doc.data()))
  }

  public async getPracticeRecords(userId: string): Promise<PracticeSessionRecord[]> {
    const snaps = await this.userSessions(userId)
      .where('status', '==', 'completed')
      .orderBy('startedAt', 'desc')
      .get()

    const records: PracticeSessionRecord[] = []
    for (const doc of snaps.docs) {
      const data = doc.data()
      // Calcular promedio si tiene respuestas evaluadas
      let avgScore: number | null = null
      if (Array.isArray(data.queue)) {
        const scores = data.queue
          .map((q: any) => q.answer?.evaluation?.score)
          .filter((s: any) => typeof s === 'number')

        if (scores.length > 0) {
          avgScore = Math.round((scores.reduce((a: number, b: number) => a + b, 0) / scores.length) * 10) / 10
        }
      }

      records.push({
        sessionId: doc.id,
        completedAt: data.completedAt || data.startedAt,
        category: data.category || (data.queue?.[0]?.category ?? 'tecnica'),
        score: avgScore,
      })
    }

    return records
  }
}
