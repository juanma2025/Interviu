import type { DocumentData } from 'firebase-admin/firestore'
import { FirestoreRepository } from './firestore-base.js'
import type { IFeedbackRepository, FeedbackRecord } from './interfaces.js'

export class FirestoreFeedbackRepository extends FirestoreRepository<FeedbackRecord> implements IFeedbackRepository {
  protected readonly collectionName = 'feedback'

  protected toDomain(id: string, data: DocumentData): FeedbackRecord {
    return {
      id,
      uid: data.uid,
      type: data.type,
      message: data.message,
      score: data.score ?? null,
      createdAt: data.createdAt,
    }
  }

  protected toDocument(entity: FeedbackRecord): DocumentData {
    return {
      uid: entity.uid,
      type: entity.type,
      message: entity.message,
      score: entity.score ?? null,
      createdAt: entity.createdAt,
    }
  }

  public async save(feedback: FeedbackRecord): Promise<void> {
    await this.collection().doc(feedback.id).set(this.toDocument(feedback))
  }

  public async list(_period?: string): Promise<FeedbackRecord[]> {
    const snaps = await this.collection().orderBy('createdAt', 'desc').get()
    return snaps.docs.map((doc) => this.toDomain(doc.id, doc.data()))
  }
}
