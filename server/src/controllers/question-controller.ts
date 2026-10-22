import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { IQuestionRepository } from '../repositories/interfaces.js'
import { NotFoundError } from '../../../shared/domain/index.js'

export class QuestionController extends BaseController {
  readonly #questionRepo: IQuestionRepository

  constructor(questionRepo: IQuestionRepository) {
    super()
    this.#questionRepo = questionRepo
  }

  public list = this.asyncHandler(async (req: Request, res: Response) => {
    const role = req.query.role ? String(req.query.role) : undefined
    const level = req.query.level ? String(req.query.level) : undefined
    const category = req.query.category ? String(req.query.category) : undefined

    const questions = await this.#questionRepo.findByFilters(role, level, category)
    return this.ok(
      res,
      questions.map((q) => q.toJSON())
    )
  })

  public getById = this.asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const question = await this.#questionRepo.findById(id)
    if (!question) {
      throw new NotFoundError(`Pregunta con ID '${id}' no encontrada`)
    }
    return this.ok(res, question.toJSON())
  })
}
