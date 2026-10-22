import type { Request, Response } from 'express'
import { BaseController } from './base-controller.js'
import type { AccountService } from '../services/account-service.js'
import { AuthError } from '../../../shared/domain/index.js'

export class AccountController extends BaseController {
  readonly #accountService: AccountService

  constructor(accountService: AccountService) {
    super()
    this.#accountService = accountService
  }

  public delete = this.asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AuthError('Usuario no autenticado')
    await this.#accountService.deleteAccount(req.user.uid)
    return this.noContent(res)
  })
}
