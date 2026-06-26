import { CalendarFormEventType, CalendarEventType } from '@shared/types';
import { SelectOption } from '@ui/custom-input/custom-input.component';

export const FORM_TYPE_OPTIONS: SelectOption[] = [
  { value: 'ESAME', label: 'Esame' },
  { value: 'PROMEMORIA', label: 'Promemoria' },
  { value: 'EVENTO', label: 'Evento' },
];

export const FORM_TYPE_TO_EVENT_TYPE: Record<CalendarFormEventType, CalendarEventType> = {
  ESAME: 'EXAM',
  PROMEMORIA: 'REMINDER',
  EVENTO: 'PERSONAL',
};

export const EVENT_TYPE_TO_FORM_TYPE: Record<CalendarEventType, CalendarFormEventType> = {
  EXAM: 'ESAME',
  REMINDER: 'PROMEMORIA',
  PERSONAL: 'EVENTO',
  DEADLINE: 'EVENTO',
  UNIVERSITY: 'EVENTO',
};

export const DEFAULT_START_HOUR = 9;
export const DEFAULT_DURATION_MINUTES = 60;

export const MAX_VISIBLE_EVENTS_PER_CELL = 2;

/** Max badge label length per breakpoint - narrower screens get a shorter truncation */
export const LABEL_LENGTH_MOBILE = 6;
export const LABEL_LENGTH_TABLET = 10;
export const LABEL_LENGTH_DESKTOP = 14;

export const LANE_GAP_PX = 8;
