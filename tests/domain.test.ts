import { describe, it, expect } from 'vitest'
import {
  Score,
  InterviewSession,
  Answer,
  Question,
  ValidationError,
  AuthError,
  ForbiddenError,
  SecondFactorRequiredError,
  UsageLimitError,
  ProviderError,
  NotFoundError,
  AppError,
} from '../shared/domain/index.js'

describe('Domain: Score Value Object', () => {
  it('crea instancias válidas entre 0 y 10', () => {
    const s0 = Score.of(0)
    const s5 = Score.of(5.5)
    const s10 = Score.of(10)

    expect(s0.value).toBe(0)
    expect(s5.value).toBe(5.5)
    expect(s5.percentage).toBe(55)
    expect(s10.value).toBe(10)
    expect(s10.percentage).toBe(100)
  })

  it('rechaza puntajes menores a 0 o mayores a 10 lanzando ValidationError', () => {
    expect(() => Score.of(-1)).toThrow(ValidationError)
    expect(() => Score.of(10.1)).toThrow(ValidationError)
    expect(() => Score.of(NaN)).toThrow(ValidationError)
    expect(() => Score.of(Infinity)).toThrow(ValidationError)
  })

  it('determina si el puntaje supera el umbral de aprobación', () => {
    expect(Score.of(7).isPassing()).toBe(true)
    expect(Score.of(6.9).isPassing()).toBe(false)
    expect(Score.of(8).isPassing(8)).toBe(true)
  })

  it('compara igualdad por valor', () => {
    const a = Score.of(8.5)
    const b = Score.of(8.5)
    const c = Score.of(9.0)

    expect(a.equals(b)).toBe(true)
    expect(a.equals(c)).toBe(false)
  })
})

describe('Domain: Answer Entity', () => {
  it('permite respuestas válidas con al menos 3 palabras', () => {
    const answer = new Answer({
      id: 'ans_1',
      questionId: 'q_1',
      text: 'Esta es mi respuesta',
      seconds: 45,
      source: 'text',
      skipped: false,
    })

    expect(answer.wordCount).toBe(4)
    expect(answer.seconds).toBe(45)
    expect(answer.skipped).toBe(false)
  })

  it('lanza ValidationError cuando la respuesta tiene menos de 3 palabras y no está omitida', () => {
    expect(() => {
      new Answer({
        id: 'ans_invalid',
        questionId: 'q_1',
        text: 'Hola mundo',
        seconds: 10,
        source: 'text',
        skipped: false,
      })
    }).toThrow(ValidationError)

    expect(() => {
      new Answer({
        id: 'ans_empty',
        questionId: 'q_1',
        text: '',
        seconds: 10,
        source: 'text',
        skipped: false,
      })
    }).toThrow(ValidationError)
  })

  it('permite texto vacío cuando la respuesta está omitida (skipped = true)', () => {
    const skipped = new Answer({
      id: 'ans_skip',
      questionId: 'q_1',
      text: '',
      seconds: 0,
      source: 'text',
      skipped: true,
    })

    expect(skipped.skipped).toBe(true)
    expect(skipped.wordCount).toBe(0)
  })
})

describe('Domain: InterviewSession Aggregate & State Pattern', () => {
  const dummyQueue = [
    { id: 'sq_1', questionId: 'q_1', text: 'Pregunta 1', category: 'comportamiento' },
    { id: 'sq_2', questionId: 'q_2', text: 'Pregunta 2', category: 'tecnica' },
  ]

  it('inicia en estado activo y permite responder y avanzar', () => {
    const session = new InterviewSession({
      id: 'sess_1',
      userId: 'user_123',
      queue: dummyQueue,
    })

    expect(session.status).toBe('active')
    expect(session.currentIndex).toBe(0)
    expect(session.currentQuestion?.questionId).toBe('q_1')

    const ans1 = new Answer({
      id: 'ans_1',
      questionId: 'q_1',
      text: 'Respuesta con suficientes palabras válidas para pasar',
      seconds: 60,
      source: 'text',
      skipped: false,
    })

    session.submitAnswer(ans1)
    expect(session.queue[0].answer).toBeDefined()
    expect(session.queue[0].answer?.text).toBe(ans1.text)

    // Avanza a la siguiente
    session.advance()
    expect(session.currentIndex).toBe(1)
    expect(session.currentQuestion?.questionId).toBe('q_2')
  })

  it('transiciona a estado completado al finalizar la cola', () => {
    const session = new InterviewSession({
      id: 'sess_2',
      userId: 'user_123',
      queue: dummyQueue,
    })

    session.skip() // Omitir q_1 y avanza automáticamente a q_2
    expect(session.currentIndex).toBe(1)

    // Omitir q_2 avanza al final y completa la sesión
    session.skip()
    expect(session.status).toBe('completed')
    expect(session.isCompleted).toBe(true)
    expect(session.completedAt).toBeDefined()
  })

  it('rechaza operaciones inválidas cuando la sesión está completada', () => {
    const session = new InterviewSession({
      id: 'sess_3',
      userId: 'user_123',
      queue: dummyQueue,
      status: 'completed',
      completedAt: new Date().toISOString(),
    })

    const ans = new Answer({
      id: 'ans_extra',
      questionId: 'q_1',
      text: 'Texto de prueba suficiente',
      seconds: 30,
      source: 'text',
      skipped: false,
    })

    expect(() => session.submitAnswer(ans)).toThrow(ValidationError)
    expect(() => session.skip()).toThrow(ValidationError)
    expect(() => session.advance()).toThrow(ValidationError)
    expect(() => session.complete()).toThrow(ValidationError)
    expect(() => session.start()).toThrow(ValidationError)
  })
})

describe('Domain: Question Entity', () => {
  it('valida campos obligatorios y formato', () => {
    const q = new Question({
      id: 'q_test',
      text: '¿Cómo diseñarías un sistema de alta concurrencia?',
      category: 'sistemas',
      role: ['backend', 'fullstack'],
      level: ['senior'],
      estimatedSeconds: 300,
      tip: 'Habla sobre particionamiento y caché.',
      active: true,
    })

    expect(q.id).toBe('q_test')
    expect(q.matches('backend', 'senior')).toBe(true)
    expect(q.matches('frontend', 'senior')).toBe(false)
  })

  it('falla con categorías o duración inválidas', () => {
    expect(() => {
      new Question({
        id: 'q_err',
        text: 'Texto largo pero categoría inválida',
        category: 'invalida' as any,
        role: ['backend'],
        level: ['junior'],
        estimatedSeconds: 60,
        tip: 'Un consejo',
        active: true,
      })
    }).toThrow(ValidationError)
  })
})

describe('Error Hierarchy (POO)', () => {
  it('cada error hereda de AppError y conserva su código y código de estado HTTP', () => {
    const valErr = new ValidationError('Dato no válido')
    const authErr = new AuthError('No autenticado')
    const forErr = new ForbiddenError('No autorizado')
    const mfaErr = new SecondFactorRequiredError('Se requiere segundo factor')
    const limitErr = new UsageLimitError('Límite mensual alcanzado')
    const provErr = new ProviderError('Fallo en Claude')
    const notFound = new NotFoundError('Recurso no encontrado')

    expect(valErr instanceof AppError).toBe(true)
    expect(valErr.statusCode).toBe(400)
    expect(valErr.code).toBe('VALIDATION_ERROR')
    expect(valErr.toJSON()).toEqual({
      error: { code: 'VALIDATION_ERROR', message: 'Dato no válido' },
    })

    expect(authErr instanceof AppError).toBe(true)
    expect(authErr.statusCode).toBe(401)

    expect(forErr instanceof AppError).toBe(true)
    expect(forErr.statusCode).toBe(403)

    expect(mfaErr instanceof AppError).toBe(true)
    expect(mfaErr.statusCode).toBe(403)
    expect(mfaErr.code).toBe('SECOND_FACTOR_REQUIRED')

    expect(limitErr.statusCode).toBe(429)
    expect(provErr.statusCode).toBe(502)
    expect(notFound.statusCode).toBe(404)
  })
})
