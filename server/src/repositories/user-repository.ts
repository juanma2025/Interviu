import type { DocumentData } from 'firebase-admin/firestore'
import { UserProfile } from '../../../shared/domain/index.js'
import { FirestoreRepository } from './firestore-base.js'
import type { IUserRepository } from './interfaces.js'

export class FirestoreUserRepository extends FirestoreRepository<UserProfile> implements IUserRepository {
  protected readonly collectionName = 'users'

  protected toDomain(id: string, data: DocumentData): UserProfile {
    return new UserProfile({
      uid: id,
      displayName: data.displayName || '',
      email: data.email || '',
      targetRole: data.targetRole || 'fullstack',
      level: data.level || 'semi-senior',
      onboardingDone: Boolean(data.onboardingDone),
      consent: data.consent,
      reminders: data.reminders,
      createdAt: data.createdAt,
    })
  }

  protected toDocument(entity: UserProfile): DocumentData {
    return entity.toJSON()
  }

  public async findById(uid: string): Promise<UserProfile | null> {
    const snap = await this.collection().doc(uid).get()
    if (!snap.exists) return null
    return this.toDomain(snap.id, snap.data()!)
  }

  public async save(user: UserProfile): Promise<void> {
    await this.collection().doc(user.uid).set(this.toDocument(user), { merge: true })
  }

  public async delete(uid: string): Promise<void> {
    await this.collection().doc(uid).delete()
  }
}
