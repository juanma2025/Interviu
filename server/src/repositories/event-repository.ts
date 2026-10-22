import type { DocumentData } from 'firebase-admin/firestore'
import { FirestoreRepository } from './firestore-base.js'
import type { IEventRepository, AppEventRecord } from './interfaces.js'

export class FirestoreEventRepository extends FirestoreRepository<AppEventRecord> implements IEventRepository {
  protected readonly collectionName = 'events'

  protected toDomain(id: string, data: DocumentData): AppEventRecord {
    return {
      id,
      uid: data.uid,
      name: data.name,
      props: data.props || {},
      createdAt: data.createdAt,
    }
  }

  protected toDocument(entity: AppEventRecord): DocumentData {
    return {
      uid: entity.uid,
      name: entity.name,
      props: entity.props || {},
      createdAt: entity.createdAt,
    }
  }

  public async save(event: AppEventRecord): Promise<void> {
    await this.collection().doc(event.id).set(this.toDocument(event))
  }
}
