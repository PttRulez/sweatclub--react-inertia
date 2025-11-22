import { parse, format } from "date-fns"
import { ru } from "date-fns/locale"

/**
 * Date (из shadcn Calendar) → "yyyy-MM-dd" (для бэка / БД)
 */
export function dateToIso(date?: Date | null): string | null {
  if (!date) return null
  return format(date, "yyyy-MM-dd")
}

/**
 * "2025-11-07 14:30:00" → "14:30"
 */
export function dateTimeToTime(datetime: string): string {
  const d = parse(datetime, "yyyy-MM-dd HH:mm:ss", new Date())
  return format(d, "HH:mm")
}

/**
 * "2025-11-07 14:30:00" → "7.11 - 14:30" (с русской локалью)
 */
export function dateTimePrettify(datetime: string): string {
  const d = parse(datetime, "yyyy-MM-dd HH:mm:ss", new Date())
  return format(d, "d.MM - HH:mm", { locale: ru })
}

/**
 * Обратка: "yyyy-MM-dd" → Date (для Calendar)
 */
export function isoToDate(iso?: string | null): Date | undefined {
  if (!iso) return undefined
  return parse(iso, "yyyy-MM-dd", new Date())
}