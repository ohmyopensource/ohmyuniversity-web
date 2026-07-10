import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { TimetableFacade } from 'src/app/core/application/facades/timetable.facade';
import { UNIVERSITY_ID_KEY } from 'src/app/core/application/usecases/auth/login.usecase';
import { TimetableResponse } from 'src/app/core/domain/models/timetable/timetable.model';

/** Ministerial course type → timetable site degree-type slug. */
const DEGREE_TYPE_MAP: Record<string, string> = {
  L: 'triennali',
  L2: 'triennali',
  LM: 'magistrali',
  LM5: 'magistrali_ciclo_unico',
  LM6: 'magistrali_ciclo_unico',
  LMCU: 'magistrali_ciclo_unico',
};

const ANNO_LABELS: Record<number, string[]> = {
  1: ['PRIMO ANNO', 'PRIMO ANNO '],
  2: ['SECONDO ANNO', 'SECONDO ANNO '],
  3: ['TERZO ANNO', 'TERZO ANNO '],
  4: ['QUARTO ANNO', 'QUARTO ANNO '],
  5: ['QUINTO ANNO', 'QUINTO ANNO '],
};

const ALWAYS_INCLUDE = [
  'ADE',
  'CREDITI LIBERI',
  'CREDITI A SCELTA',
  'ESAMI A SCELTA',
  'INSEGNAMENTI LIBERI',
];

/**
 * Resolves the timetables relevant to the logged-in student's course and year.
 * Same filtering logic previously living inside SchedulePage, extracted so it
 * isn't duplicated between the Orario page and the dashboard schedule widget.
 * Shared via shareReplay: both consumers trigger only one set of requests.
 */
@Injectable({ providedIn: 'root' })
export class MyTimetablesService {
  private readonly timetable = inject(TimetableFacade);
  private readonly auth = inject(AuthFacade);
  private readonly carriera = inject(CareerFacade);

  readonly mySchedules$: Observable<TimetableResponse[]> = this.resolve().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private resolve(): Observable<TimetableResponse[]> {
    const universityId = localStorage.getItem(UNIVERSITY_ID_KEY)?.toUpperCase() ?? 'UNIMOL';

    if (!this.auth.hasCarriera()) {
      return of([]);
    }

    return this.carriera.getCareerInfo().pipe(
      switchMap(info => {
        const degreeType = DEGREE_TYPE_MAP[info.tipoCorsoCod ?? ''] ?? 'triennali';
        const departmentId = info.facCod ? this.mapDepartmentId(info.facDes) : undefined;

        return this.timetable.getTimetables(universityId, departmentId, degreeType).pipe(
          map(data => {
            const byCorso = this.filterByCorso(data, info.cdsDes ?? '');
            return this.filterSchedules(byCorso, info.annoCorso ?? 1);
          }),
        );
      }),
      catchError(() => this.timetable.getTimetables(universityId)),
    );
  }

  private mapDepartmentId(facDes: string): string {
    return facDes
      .toLowerCase()
      .replace(/^dipartimento\s+di\s+/i, '')
      .replace(/\s+e\s+/g, '-e-')
      .replace(/\s+/g, '-')
      .replace(/[àá]/g, 'a')
      .replace(/[èé]/g, 'e')
      .replace(/[ìí]/g, 'i')
      .replace(/[òó]/g, 'o')
      .replace(/[ùú]/g, 'u');
  }

  private filterSchedules(schedules: TimetableResponse[], annoCorso: number): TimetableResponse[] {
    const annoLabel = ANNO_LABELS[annoCorso] ?? [];

    return schedules.filter(s => {
      const label = (s.label ?? '').toUpperCase().trim();

      if (ALWAYS_INCLUDE.some(k => label.includes(k))) return true;
      if (annoLabel.some(a => label.startsWith(a))) return true;

      const hasAnyAnno = [
        'PRIMO ANNO',
        'SECONDO ANNO',
        'TERZO ANNO',
        'QUARTO ANNO',
        'QUINTO ANNO',
      ].some(a => label.includes(a));

      return !hasAnyAnno;
    });
  }

  private filterByCorso(schedules: TimetableResponse[], cdsDes: string): TimetableResponse[] {
    const slug = cdsDes
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[àá]/g, 'a')
      .replace(/[èé]/g, 'e')
      .replace(/[ìí]/g, 'i')
      .replace(/[òó]/g, 'o')
      .replace(/[ùú]/g, 'u');

    return schedules.filter(s => s.timetablePageUrl.includes(slug));
  }
}
