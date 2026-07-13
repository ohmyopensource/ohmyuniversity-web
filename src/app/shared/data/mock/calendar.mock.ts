import { AgendaEvent } from '@types';

function todayAt(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export const MOCK_CALENDAR_EVENTS: AgendaEvent[] = [
  {
    id: '1',
    title: 'Design Review',
    description: null,
    startDate: todayAt(11, 0),
    endDate: todayAt(11, 30),
    allDay: false,
    type: 'PERSONAL',
    color: null,
    url: null,
    notes: null,
    location: null,
    createdAt: todayAt(8, 0),
    updatedAt: todayAt(8, 0),
  },
  {
    id: '2',
    title: 'Esame Basi di Dati',
    description: null,
    startDate: todayAt(11, 45),
    endDate: todayAt(13, 15),
    allDay: false,
    type: 'EXAM',
    color: null,
    url: null,
    notes: null,
    location: null,
    createdAt: todayAt(8, 0),
    updatedAt: todayAt(8, 0),
  },
  {
    id: '3',
    title: 'Ricevimento docente',
    description: 'Incontro con docente',
    startDate: todayAt(13, 30),
    endDate: todayAt(14, 30),
    allDay: false,
    type: 'PERSONAL',
    color: null,
    url: null,
    notes: null,
    location: 'Aula virtuale',
    createdAt: todayAt(8, 0),
    updatedAt: todayAt(8, 0),
  },
];
