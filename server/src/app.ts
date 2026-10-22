import express, { type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import type { AppContainer } from './container.js'
import { errorHandler } from './middleware/error-handler.js'

export function createApp(container: AppContainer): Express {
  const app = express()

  // 1. Cabeceras de seguridad con Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", 'https://identitytoolkit.googleapis.com', 'https://securetoken.googleapis.com'],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  )

  // 2. CORS restringido al origen configurado
  app.use(
    cors({
      origin: container.config.corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // 3. Logger estructurado con pino-http
  app.use(
    (pinoHttp as any)({
      autoLogging: process.env.NODE_ENV !== 'test',
      serializers: {
        req: (req: any) => ({
          method: req.method,
          url: req.url,
        }),
      },
    })
  )

  // 4. Parseo de JSON
  app.use(express.json({ limit: '2mb' }))

  // 5. Rate limiting global
  app.use(container.rateLimiter.middleware())

  // --- RUTAS DE LA API ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Banco de preguntas (Lectura pública / autenticada)
  app.get('/api/questions', container.questionController.list)
  app.get('/api/questions/:id', container.questionController.getById)

  // Sesiones de entrevista (Requieren AuthGuard)
  app.post(
    '/api/sessions',
    container.authGuard.middleware(),
    container.sessionController.create
  )
  app.get(
    '/api/sessions',
    container.authGuard.middleware(),
    container.sessionController.list
  )
  app.get(
    '/api/sessions/:id',
    container.authGuard.middleware(),
    container.sessionController.getById
  )
  app.post(
    '/api/sessions/:id/answers',
    container.authGuard.middleware(),
    container.usageGuard.middleware(),
    container.sessionController.submitAnswer
  )
  app.post(
    '/api/sessions/:id/skip',
    container.authGuard.middleware(),
    container.sessionController.skip
  )

  // Evaluación directa / reintento
  app.post(
    '/api/sessions/:sessionId/answers/:answerId/evaluate',
    container.authGuard.middleware(),
    container.usageGuard.middleware(),
    container.evaluationController.evaluate
  )

  // Estadísticas y progreso
  app.get(
    '/api/stats',
    container.authGuard.middleware(),
    container.statsController.getStats
  )

  // Sugerencias y NPS
  app.post(
    '/api/feedback',
    container.authGuard.middleware(),
    container.feedbackController.submit
  )
  app.get('/api/feedback/nps', container.feedbackController.npsSummary)

  // Operaciones sensibles (exige 2FA con SecondFactorGuard)
  app.delete(
    '/api/account',
    container.authGuard.middleware(),
    container.secondFactorGuard.middleware(),
    container.accountController.delete
  )

  // Manejador centralizado de errores
  app.use(errorHandler)

  return app
}
