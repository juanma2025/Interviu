import { Score } from './score.js'

export interface PracticeSessionRecord {
  sessionId: string
  completedAt: string
  category?: string
  score?: number | null
}

export interface CategoryStats {
  category: string
  totalAnswered: number
  averageScore: number
  masteryPercentage: number
}

export interface WeekPoint {
  weekLabel: string // Ej: 'Sem 1', '12 Oct'
  startDate: string
  sessionsCount: number
  averageScore: number | null
}

export class StreakCalculator {
  /**
   * Calcula la racha actual en días consecutivos.
   * Si la última sesión fue hoy o ayer, la racha continúa; si hubo más de 1 día de brecha, se reinicia.
   */
  public static calculate(dates: (string | Date)[]): { currentStreak: number; longestStreak: number } {
    if (!dates || dates.length === 0) {
      return { currentStreak: 0, longestStreak: 0 }
    }

    // Normalizar a fechas únicas 'YYYY-MM-DD' ordenadas descendente
    const uniqueDayTimestamps = Array.from(
      new Set(
        dates
          .map((d) => (typeof d === 'string' ? new Date(d) : d))
          .filter((d) => !Number.isNaN(d.getTime()))
          .map((d) => {
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
          })
      )
    ).sort((a, b) => b.localeCompare(a)) // Más reciente primero

    if (uniqueDayTimestamps.length === 0) {
      return { currentStreak: 0, longestStreak: 0 }
    }

    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(
      yesterday.getDate()
    ).padStart(2, '0')}`

    const mostRecent = uniqueDayTimestamps[0]
    const isStreakAlive = mostRecent === todayStr || mostRecent === yesterdayStr

    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    if (isStreakAlive) {
      currentStreak = 1
      let expectedDate = new Date(mostRecent + 'T00:00:00')

      for (let i = 1; i < uniqueDayTimestamps.length; i++) {
        const currentDate = new Date(uniqueDayTimestamps[i] + 'T00:00:00')
        const diffDays = Math.round((expectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          currentStreak++
          expectedDate = currentDate
        } else {
          break
        }
      }
    }

    // Calcular la racha más larga de todo el historial
    for (let i = 0; i < uniqueDayTimestamps.length; i++) {
      tempStreak = 1
      let prevDate = new Date(uniqueDayTimestamps[i] + 'T00:00:00')

      for (let j = i + 1; j < uniqueDayTimestamps.length; j++) {
        const nextDate = new Date(uniqueDayTimestamps[j] + 'T00:00:00')
        const diffDays = Math.round((prevDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          tempStreak++
          prevDate = nextDate
        } else {
          break
        }
      }

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak
      }
    }

    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, longestStreak),
    }
  }
}

export class WeeklySeriesCalculator {
  /**
   * Genera la serie de las últimas N semanas (por defecto 6 semanas).
   */
  public static calculate(records: PracticeSessionRecord[], totalWeeks = 6): WeekPoint[] {
    const points: WeekPoint[] = []
    const now = new Date()

    // Encontrar el lunes de la semana actual
    const currentMonday = new Date(now)
    const day = currentMonday.getDay()
    const diff = currentMonday.getDate() - day + (day === 0 ? -6 : 1) // Ajuste cuando es domingo
    currentMonday.setDate(diff)
    currentMonday.setHours(0, 0, 0, 0)

    for (let i = totalWeeks - 1; i >= 0; i--) {
      const startOfWeek = new Date(currentMonday)
      startOfWeek.setDate(currentMonday.getDate() - i * 7)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 7)

      const weekRecords = records.filter((r) => {
        const d = new Date(r.completedAt)
        return d >= startOfWeek && d < endOfWeek
      })

      const scoredRecords = weekRecords.filter((r) => typeof r.score === 'number' && !Number.isNaN(r.score))
      const avgScore =
        scoredRecords.length > 0
          ? Math.round(
              (scoredRecords.reduce((acc, r) => acc + (r.score ?? 0), 0) / scoredRecords.length) * 10
            ) / 10
          : null

      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      const label = `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]}`

      points.push({
        weekLabel: label,
        startDate: startOfWeek.toISOString(),
        sessionsCount: weekRecords.length,
        averageScore: avgScore,
      })
    }

    return points
  }
}

export class CategoryMasteryCalculator {
  public static calculate(records: { category: string; score?: number | null }[]): {
    categories: CategoryStats[]
    weakestCategory: CategoryStats | null
  } {
    const validCats = ['comportamiento', 'tecnica', 'sistemas', 'cierre']
    const map: Record<string, { total: number; sum: number; scoredCount: number }> = {}

    for (const cat of validCats) {
      map[cat] = { total: 0, sum: 0, scoredCount: 0 }
    }

    for (const r of records) {
      if (r.category && map[r.category]) {
        map[r.category].total++
        if (typeof r.score === 'number' && !Number.isNaN(r.score)) {
          map[r.category].sum += r.score
          map[r.category].scoredCount++
        }
      }
    }

    const categories: CategoryStats[] = validCats.map((cat) => {
      const entry = map[cat]
      const avg = entry.scoredCount > 0 ? Math.round((entry.sum / entry.scoredCount) * 10) / 10 : 0
      const mastery = Math.min(100, Math.round(avg * 10))
      return {
        category: cat,
        totalAnswered: entry.total,
        averageScore: avg,
        masteryPercentage: mastery,
      }
    })

    // Encontrar la categoría más débil (con al menos 1 respuesta o la de menor puntaje)
    const activeEvaluated = categories.filter((c) => c.totalAnswered > 0)
    let weakest: CategoryStats | null = null

    if (activeEvaluated.length > 0) {
      weakest = activeEvaluated.reduce((prev, curr) => (curr.averageScore < prev.averageScore ? curr : prev))
    }

    return {
      categories,
      weakestCategory: weakest,
    }
  }
}

export class StatsCalculator {
  public static compute(records: PracticeSessionRecord[]) {
    const dates = records.map((r) => r.completedAt)
    const streak = StreakCalculator.calculate(dates)
    const weeklySeries = WeeklySeriesCalculator.calculate(records, 6)

    const scored = records.filter((r) => typeof r.score === 'number' && !Number.isNaN(r.score))
    const totalAnswered = records.length
    const averageScore =
      scored.length > 0
        ? Math.round((scored.reduce((acc, r) => acc + (r.score ?? 0), 0) / scored.length) * 10) / 10
        : 0

    const { categories, weakestCategory } = CategoryMasteryCalculator.calculate(
      records.map((r) => ({ category: r.category || 'tecnica', score: r.score }))
    )

    return {
      totalAnswered,
      averageScore: Score.of(averageScore).value,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      weeklySeries,
      categories,
      weakestCategory,
    }
  }
}
