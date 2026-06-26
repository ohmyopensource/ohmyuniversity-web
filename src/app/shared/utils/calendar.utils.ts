import { LucideBell, LucideCalendarDays, LucideGraduationCap } from '@lucide/angular';
import type {
  CalendarEvent,
  CalendarEventLayout,
  CalendarEventType,
  DateParseResult,
  TimeParseResult,
} from '@shared/types';

/** Italian display label for the event's type, as shown on the form tabs */
export function calendarEventTypeLabel(type: CalendarEventType): string {
  switch (type) {
    case 'EXAM':
      return 'Esame';
    case 'REMINDER':
      return 'Promemoria';
    default:
      return 'Evento';
  }
}

/** Lucide icon associated with the event's type, mirrors calendar_event_type_ui.dart */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches icon: any used by custom-card/custom-badge inputs
export function calendarEventTypeIcon(type: CalendarEventType): any {
  switch (type) {
    case 'EXAM':
      return LucideGraduationCap;
    case 'REMINDER':
      return LucideBell;
    default:
      return LucideCalendarDays;
  }
}

/**
 * The 3 variant values actually used to color an event by type - a subset shared by both
 * custom-card's CardVariant and custom-badge's BadgeVariant, so it's safely assignable to
 * either [variant] input without a type mismatch (BadgeVariant has members like 'ghost'
 * that don't exist on CardVariant, so the full BadgeVariant type isn't assignable to it).
 */
export type CalendarEventVariant = 'error' | 'secondary' | 'warning';

/**
 * app-custom-card / app-custom-badge variant for the event's type.
 * Mirrors the Flutter mapping: EXAM=error, REMINDER=secondary, everything else=warning.
 */
export function calendarEventTypeVariant(type: CalendarEventType): CalendarEventVariant {
  switch (type) {
    case 'EXAM':
      return 'error';
    case 'REMINDER':
      return 'secondary';
    default:
      return 'warning';
  }
}

/** Hour-of-day label in AM/PM form (e.g. "9 AM", "12 PM"), used by the timeline's hour gutter */
export function calendarHourLabel(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}

/** Precise 24h time (e.g. "09:30"), used on individual event cards */
export function calendarPreciseTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** Time range label for an event (e.g. "09:30-11:00"), falls back to a single time if no endDate */
export function calendarEventTimeRange(event: CalendarEvent): string {
  if (!event.endDate) return calendarPreciseTime(event.startDate);
  return `${calendarPreciseTime(event.startDate)}-${calendarPreciseTime(event.endDate)}`;
}

/** Duration label for an event (e.g. "1h 30m", "45m"), empty string if no endDate */
export function calendarEventDurationLabel(event: CalendarEvent): string {
  if (!event.endDate) return '';
  const minutes = Math.round((event.endDate.getTime() - event.startDate.getTime()) / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) return `${hours}h ${remainingMinutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${remainingMinutes}m`;
}

/** Italian 3-letter weekday labels, Monday to Sunday, in calendar column order */
export const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

/** Italian 3-letter weekday label for a date (e.g. "Lun"), used by the day strip */
export function calendarWeekdayLabel(date: Date): string {
  return WEEKDAY_LABELS[(date.getDay() + 6) % 7];
}

const MONTH_LABELS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

/** Full Italian month name for a date (e.g. "Aprile"), used by the month/year view headers */
export function calendarMonthLabel(date: Date): string {
  return MONTH_LABELS[date.getMonth()];
}

/** Whether two dates fall on the same calendar day (ignores time of day) */
export function calendarIsSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Returns the 7 dates (Monday to Sunday) of the week containing the given date.
 * Mirrors _weekDaysFor in calendar_day_strip.dart.
 */
export function calendarWeekDays(date: Date): Date[] {
  const isoWeekday = (date.getDay() + 6) % 7; // 0 = Monday, ..., 6 = Sunday
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - isoWeekday);
  return Array.from(
    { length: 7 },
    (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i),
  );
}

export interface CalendarMonthGridDay {
  date: Date;
  /** Whether this date falls within the focused month (false for prev/next month spillover) */
  isInMonth: boolean;
}

/**
 * Returns the full grid of dates to display for a month view, including the leading and
 * trailing days from the previous/next month needed to fill complete weeks (Monday to Sunday).
 * Always a multiple of 7 (35 or 42 cells, matching what a 5- or 6-row month grid needs).
 */
export function calendarMonthGridDays(monthDate: Date): CalendarMonthGridDay[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const leadingOffset = (firstOfMonth.getDay() + 6) % 7; // days before the 1st, back to Monday
  const gridStart = new Date(year, month, 1 - leadingOffset);

  const daysFromStartToLastOfMonth =
    Math.round((lastOfMonth.getTime() - gridStart.getTime()) / 86400000) + 1;
  const totalCells = Math.ceil(daysFromStartToLastOfMonth / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
    return { date, isInMonth: date.getMonth() === month };
  });
}

interface ActiveLane {
  index: number;
  lane: number;
}

/**
 * Computes lane assignments for a list of events so overlapping events can be displayed
 * side by side on a timeline, like Google Calendar.
 *
 * Events must be sorted by startDate ascending before calling this function. Each event gets
 * a 0-based lane index; `laneCount` is the max number of simultaneous lanes seen across the
 * whole overlap group the event belongs to, not just at the moment it starts - an event
 * that begins alone but is later joined by two others must still report the resulting lane
 * count of 3, so all three render at one-third width.
 *
 * Events are tracked by their position in `sortedEvents`, not by object identity or `id`
 * (which can be `null` for an unsaved event) - safe even if the caller clones events between
 * calls, as long as the array order matches the events passed in.
 */
export function calculateEventLayouts(sortedEvents: CalendarEvent[]): CalendarEventLayout[] {
  const active: ActiveLane[] = [];
  const layoutByIndex = new Map<number, { lane: number; laneCount: number }>();

  sortedEvents.forEach((event, index) => {
    removeEndedEvents(active, sortedEvents, event.startDate);

    const lane = nextFreeLane(active);
    active.push({ index, lane });

    const laneCount = active.length;
    for (const activeLane of active) {
      const existing = layoutByIndex.get(activeLane.index);
      const nextLaneCount = existing ? Math.max(existing.laneCount, laneCount) : laneCount;
      layoutByIndex.set(activeLane.index, { lane: activeLane.lane, laneCount: nextLaneCount });
    }
  });

  return sortedEvents.map((event, index) => {
    const layout = layoutByIndex.get(index);
    return { event, lane: layout?.lane ?? 0, laneCount: layout?.laneCount ?? 1 };
  });
}

function removeEndedEvents(
  active: ActiveLane[],
  sortedEvents: CalendarEvent[],
  newEventStart: Date,
): void {
  for (let i = active.length - 1; i >= 0; i--) {
    const activeEvent = sortedEvents[active[i].index];
    const end = activeEvent.endDate ?? activeEvent.startDate;
    if (end.getTime() <= newEventStart.getTime()) {
      active.splice(i, 1);
    }
  }
}

function nextFreeLane(active: ActiveLane[]): number {
  let lane = 0;
  while (active.some(a => a.lane === lane)) {
    lane++;
  }
  return lane;
}

/** Timeline layout constants, mirrors calendar_timeline.dart's startHour/endHour/hourHeight */
export const CALENDAR_TIMELINE = {
  startHour: 0,
  endHour: 23,
  hourHeight: 104,
  leftGutter: 70,
} as const;

const TIME_STEP_MINUTES = 30;
const MIN_TIME_MINUTES = 0;
const MAX_TIME_MINUTES = 23 * 60 + 59;

/**
 * Steps a "hh:mm" time string up or down by 30 minutes, snapping to the nearest 30-minute
 * mark first (so "09:17" + step becomes "09:30", not "09:47"), then clamping to the
 * calendar's available hours (CALENDAR_TIMELINE.startHour/endHour).
 */
export function stepTime(value: string, direction: 1 | -1): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  const currentMinutes = match ? Number(match[1]) * 60 + Number(match[2]) : MIN_TIME_MINUTES;

  const snapped =
    direction > 0
      ? Math.ceil(currentMinutes / TIME_STEP_MINUTES) * TIME_STEP_MINUTES
      : Math.floor(currentMinutes / TIME_STEP_MINUTES) * TIME_STEP_MINUTES;

  // If already exactly on a 30-minute mark, snapping alone wouldn't move - step explicitly
  const stepped = snapped === currentMinutes ? snapped + direction * TIME_STEP_MINUTES : snapped;

  const clamped = Math.min(MAX_TIME_MINUTES, Math.max(MIN_TIME_MINUTES, stepped));

  const hours = Math.floor(clamped / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (clamped % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** Clamps an hour to the visible timeline range [startHour, endHour] */
function visibleHour(hour: number): number {
  if (hour < CALENDAR_TIMELINE.startHour) return CALENDAR_TIMELINE.startHour;
  if (hour > CALENDAR_TIMELINE.endHour) return CALENDAR_TIMELINE.endHour;
  return hour;
}

/** Top offset in px of a given hour's row within the timeline */
export function calendarHourTop(hour: number): number {
  return (hour - CALENDAR_TIMELINE.startHour) * CALENDAR_TIMELINE.hourHeight;
}

/** Top offset in px of a specific date/time within the timeline, clamped to the visible range */
export function calendarTimeTop(date: Date): number {
  const hour = visibleHour(date.getHours());
  const minutes = hour === date.getHours() ? date.getMinutes() : 0;
  return calendarHourTop(hour) + (minutes / 60) * CALENDAR_TIMELINE.hourHeight;
}

/** Top offset in px of an event's card, exactly on the hour gridline */
export function calendarEventTop(event: CalendarEvent): number {
  return calendarTimeTop(event.startDate);
}

/** Height in px of an event's card, proportional to its duration, with a 62px minimum */
export function calendarEventHeight(event: CalendarEvent): number {
  if (!event.endDate) return 62;
  const durationMinutes = (event.endDate.getTime() - event.startDate.getTime()) / 60000;
  const proportionalHeight = (durationMinutes / 60) * CALENDAR_TIMELINE.hourHeight;
  return Math.max(62, proportionalHeight);
}

/** Total height in px of the timeline, spanning startHour to endHour inclusive */
export function calendarTimelineTotalHeight(): number {
  const totalHours = CALENDAR_TIMELINE.endHour - CALENDAR_TIMELINE.startHour + 1;
  return totalHours * CALENDAR_TIMELINE.hourHeight;
}

/** List of whole hours shown in the timeline's left gutter, from startHour to endHour */
export function calendarTimelineHours(): number[] {
  const hours: number[] = [];
  for (let hour = CALENDAR_TIMELINE.startHour; hour <= CALENDAR_TIMELINE.endHour; hour++) {
    hours.push(hour);
  }
  return hours;
}

export function formatDateLabel(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

export function addMinutesToTime(value: string, minutesToAdd: number): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const totalMinutes = Number(match[1]) * 60 + Number(match[2]) + minutesToAdd;
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

export function parseDate(value: string): DateParseResult {
  const trimmed = value.trim();
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (!match) {
    return { ok: false, message: 'Completa la data nel formato gg/mm/aaaa.' };
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) {
    return { ok: false, message: 'Il mese deve essere tra 01 e 12.' };
  }
  if (day < 1 || day > 31) {
    return { ok: false, message: 'Il giorno deve essere tra 01 e 31.' };
  }

  // Reject dates that overflow into the next month (e.g. 31/04 doesn't exist)
  const candidate = new Date(year, month - 1, day);
  if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
    return { ok: false, message: 'Quel mese non ha questo giorno.' };
  }

  return { ok: true, day, month, year };
}

export function parseTime(value: string): TimeParseResult {
  const trimmed = value.trim();
  const match = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (!match) {
    return { ok: false, message: "Completa l'orario nel formato hh:mm." };
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23) {
    return { ok: false, message: 'Le ore devono essere tra 00 e 23.' };
  }
  if (minutes > 59) {
    return { ok: false, message: 'I minuti devono essere tra 00 e 59.' };
  }

  return { ok: true, hours, minutes };
}

/**
 * Auto-inserts "/" separators as the user types digits (gg/mm/aaaa), e.g. typing
 * "22062026" progressively becomes "22/06/2026". Strips any non-digit the user types
 * (including slashes they type themselves) and rebuilds the slashes from scratch, so the
 * result is stable whether typing forward or deleting characters with backspace.
 */
export function autoFormatDateInput(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 8);
  const day = digitsOnly.slice(0, 2);
  const month = digitsOnly.slice(2, 4);
  const year = digitsOnly.slice(4, 8);

  let result = day;
  if (month) result += `/${month}`;
  if (year) result += `/${year}`;
  return result;
}

/**
 * Validates the date field as the user types, checking only the parts that are already
 * complete - never flags "incomplete" while the user is still mid-typing a segment. Returns
 * an empty string when there's nothing wrong yet (including "still typing, looks fine so far").
 *
 * Runs against the raw value (before autoFormatDateInput strips/truncates it), so it can
 * catch letters or excess digits that the formatter would otherwise silently discard.
 */
export function validateDateLive(rawValue: string): string {
  if (rawValue === '') return '';

  if (/[^\d/]/.test(rawValue)) {
    return 'Usa solo numeri.';
  }

  const digitsOnly = rawValue.replace(/\D/g, '');
  if (digitsOnly.length > 8) {
    return 'Hai digitato troppe cifre.';
  }

  const dayDigits = digitsOnly.slice(0, 2);
  const monthDigits = digitsOnly.slice(2, 4);
  const yearDigits = digitsOnly.slice(4, 8);

  if (dayDigits.length === 2) {
    const day = Number(dayDigits);
    if (day < 1 || day > 31) return 'Il giorno deve essere tra 01 e 31.';
  }

  if (monthDigits.length === 2) {
    const month = Number(monthDigits);
    if (month < 1 || month > 12) return 'Il mese deve essere tra 01 e 12.';
  }

  if (yearDigits.length === 4) {
    const day = Number(dayDigits);
    const month = Number(monthDigits);
    const year = Number(yearDigits);
    const candidate = new Date(year, month - 1, day);
    if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
      return 'Quel mese non ha questo giorno.';
    }
  }

  return '';
}

/**
 * Validates the time field as the user types, same incremental approach as validateDateLive -
 * runs against the raw value to catch letters or excess digits before the formatter strips them.
 */
export function validateTimeLive(rawValue: string): string {
  if (rawValue === '') return '';

  if (/[^\d:]/.test(rawValue)) {
    return 'Usa solo numeri.';
  }

  const digitsOnly = rawValue.replace(/\D/g, '');
  if (digitsOnly.length > 4) {
    return 'Hai digitato troppe cifre.';
  }

  const hourDigits = digitsOnly.slice(0, 2);
  const minuteDigits = digitsOnly.slice(2, 4);

  if (hourDigits.length === 2) {
    const hours = Number(hourDigits);
    if (hours > 23) return 'Le ore devono essere tra 00 e 23.';
  }

  if (minuteDigits.length === 2) {
    const minutes = Number(minuteDigits);
    if (minutes > 59) return 'I minuti devono essere tra 00 e 59.';
  }

  return '';
}

/** Same digit-grouping idea as autoFormatDateInput, but for hh:mm (4 digits, one separator) */
export function autoFormatTimeInput(value: string): string {
  const normalized = value.replace(/[.,]/g, ':');
  const digitsOnly = normalized.replace(/[^\d]/g, '').slice(0, 4);
  const hours = digitsOnly.slice(0, 2);
  const minutes = digitsOnly.slice(2, 4);

  let result = hours;
  if (minutes) result += `:${minutes}`;
  return result;
}

export function clampTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;

  const hours = Math.min(23, Math.max(0, Number(match[1])));
  const minutes = Math.min(59, Math.max(0, Number(match[2])));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function truncateLabel(label: string, maxLength: number): string {
  if (label.length <= maxLength) return label;
  return `${label.slice(0, maxLength - 1)}…`;
}
