import {
  TransportRoute,
  TransportCompany,
} from '@shared/types/dashboard/dashboard-transport.types';

export const MOCK_TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'r1',
    from: 'Stazione Centrale Bologna',
    to: 'Via Zamboni 33',
    duration: '18 min',
    changes: 0,
    type: 'bus',
    departures: ['07:15', '07:30', '07:45', '08:00', '08:15'],
  },
  {
    id: 'r2',
    from: 'Stazione Centrale Bologna',
    to: 'Via Zamboni 33',
    duration: '12 min',
    changes: 0,
    type: 'bus',
    departures: ['07:10', '07:25', '07:40', '07:55', '08:10'],
  },
  {
    id: 'r3',
    from: 'Aeroporto G. Marconi',
    to: 'Via Zamboni 33',
    duration: '35 min',
    changes: 1,
    type: 'mixed',
    departures: ['06:45', '07:15', '07:45', '08:15', '08:45'],
  },
];

export const MOCK_TRANSPORT_COMPANIES: TransportCompany[] = [
  {
    id: 'c1',
    name: 'Tper',
    type: 'bus',
    coverage: 'Bologna e provincia',
    description:
      'Principale azienda di trasporto pubblico locale di Bologna. Gestisce bus urbani ed extraurbani.',
    website: 'https://www.tper.it',
    scheduleUrl: 'https://www.tper.it/orari',
    appUrl: 'https://www.tper.it/app',
    color: 'var(--color-primary-dark)',
  },
  {
    id: 'c2',
    name: 'Trenitalia',
    type: 'train',
    coverage: 'Nazionale',
    description:
      'Trasporto ferroviario nazionale. Collegamento da tutte le principali città italiane verso Bologna.',
    website: 'https://www.trenitalia.com',
    scheduleUrl: 'https://www.trenitalia.com/orari',
    appUrl: 'https://www.trenitalia.com/app',
    color: 'var(--color-error-dark)',
  },
  {
    id: 'c3',
    name: 'Italo',
    type: 'train',
    coverage: 'Nazionale - Alta velocità',
    description:
      'Alta velocità italiana. Collegamento rapido tra le principali città con fermata a Bologna AV.',
    website: 'https://www.italotreno.it',
    scheduleUrl: 'https://www.italotreno.it/orari',
    color: 'var(--color-tertiary-dark)',
  },
  {
    id: 'c4',
    name: 'FlixBus',
    type: 'bus',
    coverage: 'Nazionale e internazionale',
    description:
      'Autobus a lunga percorrenza. Collegamento economico da e verso Bologna da tutta Italia ed Europa.',
    website: 'https://www.flixbus.it',
    scheduleUrl: 'https://www.flixbus.it/orari',
    color: 'var(--color-success-dark)',
  },
  {
    id: 'c5',
    name: 'BusItalia',
    type: 'bus',
    coverage: 'Emilia-Romagna',
    description:
      'Trasporto extraurbano in Emilia-Romagna. Collegamento tra comuni della regione e Bologna.',
    website: 'https://www.busitalia.it',
    scheduleUrl: 'https://www.busitalia.it/orari',
    color: 'var(--color-warning-dark)',
  },
  {
    id: 'c6',
    name: 'Marconi Express',
    type: 'train',
    coverage: 'Bologna - Aeroporto',
    description:
      "Collegamento diretto tra l'aeroporto G. Marconi e la stazione centrale di Bologna.",
    website: 'https://www.marconiexpress.it',
    scheduleUrl: 'https://www.marconiexpress.it/orari',
    color: 'var(--color-secondary-dark)',
  },
];
