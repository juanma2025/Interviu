import type { DocumentData } from 'firebase-admin/firestore'
import { Question } from '../../../shared/domain/index.js'
import { FirestoreRepository } from './firestore-base.js'
import type { IQuestionRepository } from './interfaces.js'

export class FirestoreQuestionRepository extends FirestoreRepository<Question> implements IQuestionRepository {
  protected readonly collectionName = 'questions'

  protected toDomain(id: string, data: DocumentData): Question {
    return new Question({
      id,
      text: data.text,
      category: data.category,
      role: data.role || [],
      level: data.level || [],
      estimatedSeconds: data.estimatedSeconds,
      tip: data.tip,
      active: Boolean(data.active),
    })
  }

  protected toDocument(entity: Question): DocumentData {
    return entity.toJSON()
  }

  public async findById(id: string): Promise<Question | null> {
    const snap = await this.collection().doc(id).get()
    if (!snap.exists) return null
    return this.toDomain(snap.id, snap.data()!)
  }

  public async findAllActive(): Promise<Question[]> {
    const snaps = await this.collection().where('active', '==', true).get()
    return snaps.docs.map((doc) => this.toDomain(doc.id, doc.data()))
  }

  public async findByFilters(role?: string, level?: string, category?: string): Promise<Question[]> {
    let query: FirebaseFirestore.Query = this.collection().where('active', '==', true)

    if (category) {
      query = query.where('category', '==', category)
    }
    if (role) {
      query = query.where('role', 'array-contains', role)
    }

    const snaps = await query.get()
    let results = snaps.docs.map((doc) => this.toDomain(doc.id, doc.data()))

    if (level) {
      results = results.filter((q) => q.level.includes(level))
    }

    return results
  }

  public async save(question: Question): Promise<void> {
    await this.collection().doc(question.id).set(this.toDocument(question), { merge: true })
  }
}
