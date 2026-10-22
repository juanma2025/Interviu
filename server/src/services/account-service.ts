import type { IUserRepository } from '../repositories/interfaces.js'

export class AccountService {
  readonly #userRepo: IUserRepository

  constructor(userRepo: IUserRepository) {
    this.#userRepo = userRepo
  }

  public async deleteAccount(userId: string): Promise<void> {
    await this.#userRepo.delete(userId)
  }
}
