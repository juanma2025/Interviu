import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../shared/domain/index.js'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON())
  }

  console.error('[UnhandledServerError]', err)

  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error inesperado en el servidor',
    },
  })
}
