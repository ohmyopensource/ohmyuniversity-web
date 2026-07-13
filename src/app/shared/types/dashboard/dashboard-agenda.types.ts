import { AgendaEventVariant, AgendaMonthGridDay } from '@shared/utils/calendar.utils';
import { TextColor } from '@ui/custom-text/custom-text.component';

/** Classification of a agenda event, mirrors the backend AgendaEventType enum */
export type AgendaEventType = 'PERSONAL' | 'EXAM' | 'DEADLINE' | 'REMINDER' | 'UNIVERSITY';

/** A personal agenda event, used throughout the Agenda feature UI */
export interface AgendaEvent {
  id: string | null;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  allDay: boolean;
  type: AgendaEventType;
  color: string | null;
  url: string | null;
  notes: string | null;
  location: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/** Payload for creating or updating a personal agenda event (POST/PUT /api/v1/agenda/events) */
export interface AgendaEventRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  allDay?: boolean;
  type?: AgendaEventType;
  color?: string;
  url?: string;
  notes?: string;
}

/** Response shape returned by the personal agenda event endpoints */
export interface AgendaEventResponse {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  type: AgendaEventType;
  color: string | null;
  url: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** An event published by a university, optionally importable into the personal agenda */
export interface UniversityEvent {
  id: string;
  universityId: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  allDay: boolean;
  url: string | null;
  sourceUrl: string | null;
  publishedAt: Date | null;
  imported: boolean;
}

/** The 3 event categories selectable from the "new element" form tabs */
export type AgendaFormEventType = 'ESAME' | 'PROMEMORIA' | 'EVENTO';

/** Lane assignment for one event within an overlapping group, used by the timeline view */
export interface AgendaEventLayout {
  event: AgendaEvent;
  /** 0-based column index among overlapping events */
  lane: number;
  /** Max number of simultaneous lanes within this event's overlap group */
  laneCount: number;
}

export interface DayStripDay {
  date: Date;
  weekdayLabel: string;
  isSelected: boolean;
  isToday: boolean;
  weekdayColor: TextColor;
  dayNumberColor: TextColor;
  dotVariant: AgendaEventVariant | null;
}

export type DateParseResult =
  | { ok: true; day: number; month: number; year: number }
  | { ok: false; message: string };

export type TimeParseResult =
  | { ok: true; hours: number; minutes: number }
  | { ok: false; message: string };

export interface AgendaMonthCellEvent {
  event: AgendaEvent;
  labelMobile: string;
  labelTablet: string;
  labelDesktop: string;
}

export interface AgendaMonthCell extends AgendaMonthGridDay {
  isToday: boolean;
  visibleEvents: AgendaMonthCellEvent[];
  overflowCount: number;
}

export interface PositionedEventLayout {
  layout: AgendaEventLayout;
  top: number;
  height: number;
  widthExpr: string;
  leftExpr: string;
  compact: boolean;
}

export type AgendaViewMode = 'year' | 'month' | 'day';

export interface AgendaYearGridDay extends AgendaMonthGridDay {
  isToday: boolean;
  isWeekend: boolean;
  dotVariant: AgendaEventVariant | null;
}

export interface AgendaYearMonth {
  date: Date;
  label: string;
  days: AgendaYearGridDay[];
}
