import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import {
  buildInfoByAdsce,
  buildPianoMap,
  bookingKey,
  mapAppello,
  mapIscrizione,
  MappedExam,
} from '@shared/utils/exams-mapping.utils';

@Injectable({ providedIn: 'root' })
export class DashboardExamsService {
  private readonly carriera = inject(CareerFacade);

  readonly exams$: Observable<MappedExam[]> = forkJoin({
    appelli: this.carriera.getBookableSessions(),
    prenotazioni: this.carriera.getBookings(),
    piano: this.carriera.getStudyPlan(),
  }).pipe(
    map(({ appelli, prenotazioni, piano }) => {
      const pianoMap = buildPianoMap(piano);
      const infoByAdsce = buildInfoByAdsce(prenotazioni.prenotazioni ?? [], pianoMap);

      const prenotatiKeys = new Set(
        prenotazioni.prenotazioni.map(p => bookingKey(p.adsceId, p.appId)),
      );
      const prenotazioniMap = new Map(
        prenotazioni.prenotazioni.map(p => [bookingKey(p.adsceId, p.appId), p]),
      );

      const mapAppelli = appelli.appelli.map(a =>
        mapAppello(a, pianoMap, prenotazioniMap, prenotatiKeys, infoByAdsce),
      );

      // Bookings whose enrollment window has closed no longer appear in the
      // bookable-sessions list (Cineca drops them), but the student is still
      // booked - mirrors ExamsPage's prenotatiExtra fallback.
      const keysGiaPresenti = new Set(appelli.appelli.map(a => bookingKey(a.adsceId, a.appId)));
      const docenteByAdsce = new Map(
        appelli.appelli.filter(a => a.docente).map(a => [a.adsceId, a.docente]),
      );
      const prenotatiExtra = prenotazioni.prenotazioni
        .filter(p => !keysGiaPresenti.has(bookingKey(p.adsceId, p.appId)))
        .map(p => mapIscrizione(p, pianoMap, docenteByAdsce));

      return [...mapAppelli, ...prenotatiExtra];
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
