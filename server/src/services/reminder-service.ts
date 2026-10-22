import type { IUserRepository, ISessionRepository } from '../repositories/interfaces.js'
import { StreakCalculator } from '../../../shared/domain/index.js'

export interface ReminderNotification {
  userId: string
  email: string
  currentStreak: number
  daysInactive: number
}

export interface ReminderChannel {
  send(notification: ReminderNotification): Promise<void>
}

export class EmailReminderChannel implements ReminderChannel {
  public async send(notification: ReminderNotification): Promise<void> {
    // Implementación de envío de correo (vía Resend / SendGrid / Cloud Functions)
    console.log(
      `[EmailReminder] Enviando recordatorio a ${notification.email}. Días inactivo: ${notification.daysInactive}, Racha: ${notification.currentStreak}`
    )
  }
}

export class InAppReminderChannel implements ReminderChannel {
  public async send(notification: ReminderNotification): Promise<void> {
    console.log(`[InAppReminder] Guardando notificación in-app para usuario ${notification.userId}`)
  }
}

export class ReminderService {
  readonly #userRepo: IUserRepository
  readonly #sessionRepo: ISessionRepository
  readonly #channels: ReminderChannel[]
  readonly #inactiveThresholdDays: number

  constructor(
    userRepo: IUserRepository,
    sessionRepo: ISessionRepository,
    channels: ReminderChannel[],
    inactiveThresholdDays = 3
  ) {
    this.#userRepo = userRepo
    this.#sessionRepo = sessionRepo
    this.#channels = channels
    this.#inactiveThresholdDays = inactiveThresholdDays
  }

  public async checkAndSendUserReminder(userId: string): Promise<boolean> {
    const user = await this.#userRepo.findById(userId)
    if (!user || !user.remindersEnabled) {
      return false
    }

    const records = await this.#sessionRepo.getPracticeRecords(userId)
    if (records.length === 0) {
      return false
    }

    const dates = records.map((r) => r.completedAt)
    const streakInfo = StreakCalculator.calculate(dates)

    const latest = new Date(records[0].completedAt)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - latest.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays >= this.#inactiveThresholdDays) {
      const notification: ReminderNotification = {
        userId: user.uid,
        email: user.email,
        currentStreak: streakInfo.currentStreak,
        daysInactive: diffDays,
      }

      for (const channel of this.#channels) {
        await channel.send(notification)
      }
      return true
    }

    return false
  }
}
