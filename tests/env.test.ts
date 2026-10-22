import { describe, it, expect } from 'vitest'
import { EnvironmentConfig } from '../server/src/config/env.js'

describe('EnvironmentConfig Validation', () => {
  it('falla con mensaje claro si falta ANTHROPIC_API_KEY', () => {
    expect(() => {
      new EnvironmentConfig({
        PORT: '8080',
        ANTHROPIC_API_KEY: '', // Vacío
      })
    }).toThrow('Error de configuración de variables de entorno: [ANTHROPIC_API_KEY]')
  })

  it('asigna valores por defecto razonables cuando las variables opcionales no se definen', () => {
    const config = new EnvironmentConfig({
      ANTHROPIC_API_KEY: 'sk-ant-test-key-12345',
    })

    expect(config.port).toBe(8080)
    expect(config.corsOrigin).toBe('http://localhost:5173')
    expect(config.claudeModel).toBe('claude-3-5-haiku-20241022')
    expect(config.aiMonthlyLimitPerUser).toBe(50)
    expect(config.reminderInactiveDays).toBe(3)
  })

  it('permite sobrescribir configuraciones numéricas y cadenas', () => {
    const config = new EnvironmentConfig({
      PORT: '9000',
      CORS_ORIGIN: 'https://intervu.app',
      ANTHROPIC_API_KEY: 'sk-ant-test-key-override',
      CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',
      AI_MONTHLY_LIMIT_PER_USER: '100',
      REMINDER_INACTIVE_DAYS: '5',
    })

    expect(config.port).toBe(9000)
    expect(config.corsOrigin).toBe('https://intervu.app')
    expect(config.claudeModel).toBe('claude-3-5-sonnet-20241022')
    expect(config.aiMonthlyLimitPerUser).toBe(100)
    expect(config.reminderInactiveDays).toBe(5)
  })
})
