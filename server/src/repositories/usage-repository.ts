import { FieldValue, type DocumentData } from 'firebase-admin/firestore'
import { FirestoreRepository } from './firestore-base.js'
import type { IUsageRepository, UsageRecord } from './interfaces.js'

export class FirestoreUsageRepository extends FirestoreRepository<UsageRecord> implements IUsageRepository {
  protected readonly collectionName = 'usage'

  protected toDomain(id: string, data: DocumentData): UsageRecord {
    const parts = id.split('_')
    return {
      uid: parts[0] || '',
      monthYear: parts[1] || '',
      aiCalls: data.aiCalls ?? 0,
      tokensIn: data.tokensIn ?? 0,
      tokensOut: data.tokensOut ?? 0,
    }
  }

  protected toDocument(entity: UsageRecord): DocumentData {
    return {
      uid: entity.uid,
      monthYear: entity.monthYear,
      aiCalls: entity.aiCalls,
      tokensIn: entity.tokensIn,
      tokensOut: entity.tokensOut,
    }
  }

  private docId(uid: string, monthYear: string): string {
    return `${uid}_${monthYear}`
  }

  public async getUsage(uid: string, monthYear: string): Promise<UsageRecord> {
    const id = this.docId(uid, monthYear)
    const snap = await this.collection().doc(id).get()
    if (!snap.exists) {
      return { uid, monthYear, aiCalls: 0, tokensIn: 0, tokensOut: 0 }
    }
    return this.toDomain(snap.id, snap.data()!)
  }

  public async incrementUsage(
    uid: string,
    monthYear: string,
    tokensIn = 0,
    tokensOut = 0
  ): Promise<UsageRecord> {
    const id = this.docId(uid, monthYear)
    const docRef = this.collection().doc(id)

    await docRef.set(
      {
        uid,
        monthYear,
        aiCalls: FieldValue.increment(1),
        tokensIn: FieldValue.increment(tokensIn),
        tokensOut: FieldValue.increment(tokensOut),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return this.getUsage(uid, monthYear)
  }
}
