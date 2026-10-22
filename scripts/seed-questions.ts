import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as dotenv from 'dotenv'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'

// Load environment variables from .env and server/.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(rootDir, '.env') })
dotenv.config({ path: path.join(rootDir, 'server', '.env') })

// Zod Schema for question validation
const QuestionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(10),
  category: z.enum(['comportamiento', 'tecnica', 'sistemas', 'cierre']),
  role: z.array(z.string()).min(1),
  level: z.array(z.string()).min(1),
  estimatedSeconds: z.number().int().positive(),
  tip: z.string().min(5),
  active: z.boolean(),
})

type QuestionItem = z.infer<typeof QuestionSchema>

// Initialize Firebase Admin
function getFirestoreInstance() {
  if (getApps().length > 0) {
    return getFirestore()
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID

  if (serviceAccountPath && fs.existsSync(path.resolve(rootDir, serviceAccountPath))) {
    const serviceAccount = JSON.parse(
      fs.readFileSync(path.resolve(rootDir, serviceAccountPath), 'utf-8')
    )
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id || projectId,
    })
    console.log(`[seed] Conectado a Firebase con Service Account: ${serviceAccount.project_id}`)
  } else if (projectId) {
    initializeApp({ projectId })
    console.log(`[seed] Conectado a Firebase con Project ID: ${projectId}`)
  } else {
    // If running in development without credentials, warn user
    console.warn(
      '\n[AVISO] No se encontraron credenciales de Firebase en .env ni server/.env.' +
      '\nDefine FIREBASE_SERVICE_ACCOUNT (ruta al archivo JSON) o FIREBASE_PROJECT_ID en server/.env.\n'
    )
    initializeApp({ projectId: 'intervu-preview' })
  }

  return getFirestore()
}

// Load questions from content/questions/
function loadQuestions(): QuestionItem[] {
  const questionsDir = path.join(rootDir, 'content', 'questions')
  const files = ['comportamiento.json', 'tecnica.json', 'sistemas.json', 'cierre.json']
  const allQuestions: QuestionItem[] = []

  for (const file of files) {
    const filePath = path.join(questionsDir, file)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`)
    }
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    const validated = z.array(QuestionSchema).parse(parsed)
    allQuestions.push(...validated)
  }

  return allQuestions
}

// Clean any documents marked with _seed: true in specified collection
async function cleanSeedDocuments(db: FirebaseFirestore.Firestore, collectionName: string) {
  try {
    const snapshot = await db.collection(collectionName).where('_seed', '==', true).get()
    if (!snapshot.empty) {
      const batch = db.batch()
      snapshot.forEach((doc) => batch.delete(doc.ref))
      await batch.commit()
      console.log(`[seed] Eliminados ${snapshot.size} documento(s) _seed en coleccion '${collectionName}'.`)
    }
  } catch {
    // Suppress errors if collection does not exist yet
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('🌱 INTERVU — SEMBRADO IDEMPOTENTE DE BANCO DE PREGUNTAS')
  console.log('='.repeat(60))

  const questions = loadQuestions()
  console.log(`[seed] Total preguntas leidas de content/questions/: ${questions.length}`)

  const db = getFirestoreInstance()

  // 1. Clean _seed documents across collections
  const collectionsToClean = ['users', 'questions', 'usage', 'feedback', 'events']
  for (const col of collectionsToClean) {
    await cleanSeedDocuments(db, col)
  }

  // 2. Upsert questions in batches of 500 (Firestore max batch size)
  const batch = db.batch()
  const questionsCol = db.collection('questions')

  for (const q of questions) {
    const docRef = questionsCol.doc(q.id)
    batch.set(docRef, {
      id: q.id,
      text: q.text,
      category: q.category,
      role: q.role,
      level: q.level,
      estimatedSeconds: q.estimatedSeconds,
      tip: q.tip,
      active: q.active,
      updatedAt: new Date().toISOString(),
    }, { merge: true })
  }

  await batch.commit()

  console.log(`\n Exito: ${questions.length} preguntas sembradas correctamente en Firestore.`)
  console.log('\nResumen por categoria:')
  const summary: Record<string, number> = {}
  for (const q of questions) {
    summary[q.category] = (summary[q.category] || 0) + 1
  }
  for (const [cat, count] of Object.entries(summary)) {
    console.log(`  - ${cat.padEnd(16)}: ${count} preguntas`)
  }
  console.log('='.repeat(60))
}

main().catch((error) => {
  console.error('\n Error durante el sembrado de preguntas:', error)
  process.exit(1)
})
