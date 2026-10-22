import * as fs from 'node:fs'
import * as path from 'node:path'
import * as dotenv from 'dotenv'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { EnvironmentConfig } from './config/env.js'
import { AppContainer } from './container.js'
import { createApp } from './app.js'

// Cargar variables de entorno
const rootDir = path.resolve(process.cwd())
dotenv.config({ path: path.join(rootDir, '.env') })
dotenv.config({ path: path.join(rootDir, 'server', '.env') })

// 1. Validar entorno
const config = new EnvironmentConfig(process.env)

// 2. Inicializar Firebase Admin
if (getApps().length === 0) {
  if (config.firebaseServiceAccount && fs.existsSync(config.firebaseServiceAccount)) {
    const serviceAccount = JSON.parse(fs.readFileSync(config.firebaseServiceAccount, 'utf-8'))
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id || config.firebaseProjectId,
    })
  } else {
    initializeApp({ projectId: config.firebaseProjectId })
  }
}

const db = getFirestore()
const auth = getAuth()

// 3. Ensamblar composition root
const container = new AppContainer({
  db,
  auth,
  config,
})

// 4. Crear y arrancar aplicación Express
const app = createApp(container)

app.listen(config.port, () => {
  console.log(`[Interviu Server] Servidor activo escuchando en http://localhost:${config.port}`)
})
