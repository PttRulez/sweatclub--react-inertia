import { parse, format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * "YYYY-MM-DD" → Date (для React Calendar)
 */
export function isoToDate(iso?: string | null): Date | undefined {
  if (!iso) return undefined;
  return parse(iso, "yyyy-MM-dd", new Date());
}

/**
 * Date → "YYYY-MM-DD" (для Laravel / форм)
 */
export function dateToIso(date?: Date | null): string | null {
  if (!date) return null;
  return format(date, "yyyy-MM-dd");
}

export function todayIso(): string {
  return dateToIso(new Date())!;
}

/**
 * "2025-11-07 14:30:00" → "14:30"
 */
export function dateTimeToTime(datetime: string): string {
  const d = parse(datetime, "yyyy-MM-dd HH:mm:ss", new Date());
  return format(d, "HH:mm");
}

/**
 * "2025-11-07 14:30:00" → "7.11 - 14:30" (русский формат)
 */
export function dateTimePrettify(datetime: string): string {
  const d = parse(datetime, "yyyy-MM-dd HH:mm:ss", new Date());
  return format(d, "d.MM - HH:mm", { locale: ru });
}

/**
 * "2025-11-07" → Date
 */
export function isoDateToHuman(iso: string): string {
  const d = parse(iso, "yyyy-MM-dd", new Date());
  return format(d, "dd.MM.yyyy");
}

/**
 * Date → "dd.MM.yyyy"
 */
export function dateToHuman(date: Date): string {
  return format(date, "dd.MM.yyyy");
}

/**
 * "yyyy-MM-dd HH:mm:ss" → JS Date
 */
export function datetimeToDate(datetime: string): Date {
  return parse(datetime, "yyyy-MM-dd HH:mm:ss", new Date());
}