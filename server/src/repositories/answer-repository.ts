import type { DocumentData } from 'firebase-admin/firestore'
import { Answer, Evaluation } from '../../../shared/domain/index.js'
import { FirestoreRepository } from './firestore-base.js'
import type { IAnswerRepository } from './interfaces.js'

export class FirestoreAnswerRepository extends FirestoreRepository<Answer> implements IAnswerRepository {
  protected readonly collectionName = 'users'

  protected toDomain(id: string, data: DocumentData): Answer {
    return new Answer({
      id,
      questionId: data.questionId,
      text: data.text || '',
      seconds: data.seconds ?? 0,
      source: data.source || 'text',
      skipped: Boolean(data.skipped),
      evaluationStatus: data.evaluationStatus || 'pending',
      evaluation: data.evaluation ? new Evaluation(data.evaluation) : null,
      createdAt: data.createdAt,
    })
  }

  protected toDocument(entity: Answer): DocumentData {
    return entity.toJSON()
  }

  private answersCollection(userId: string, sessionId: string) {
    return this.collection().doc(userId).collection('sessions').doc(sessionId).collection('answers')
  }

  public async findById(userId: string, sessionId: string, answerId: string): Promise<Answer | null> {
    const snap = await this.answersCollection(userId, sessionId).doc(answerId).get()
    if (!snap.exists) return null
    return this.toDomain(snap.id, snap.data()!)
  }

  public async save(userId: string, sessionId: string, answer: Answer): Promise<void> {
    await this.answersCollection(userId, sessionId)
      .doc(answer.id)
      .set(this.toDocument(answer), { merge: true })
  }

  public async listBySession(userId: string, sessionId: string): Promise<Answer[]> {
    const snaps = await this.answersCollection(userId, sessionId)
      .orderBy('createdAt', 'asc')
      .get()

    return snaps.docs.map((doc) => this.toDomain(doc.id, doc.data()))
  }
}
