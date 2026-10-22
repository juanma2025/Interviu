import type { Firestore, DocumentData } from 'firebase-admin/firestore'

/**
 * Repositorio abstracto base para Firestore
 * Aplica el patrón Repository con mapeadores bidireccionales DocumentData <-> Entidad T
 */
export abstract class FirestoreRepository<T> {
  protected readonly db: Firestore
  protected abstract readonly collectionName: string

  constructor(db: Firestore) {
    this.db = db
  }

  /**
   * Mapeador para convertir el documento de Firestore a la entidad de dominio T
   */
  protected abstract toDomain(id: string, data: DocumentData): T

  /**
   * Mapeador para convertir la entidad de dominio T a documento de Firestore
   */
  protected abstract toDocument(entity: T): DocumentData

  protected collection() {
    return this.db.collection(this.collectionName)
  }
}
