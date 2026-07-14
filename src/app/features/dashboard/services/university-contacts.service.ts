import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StrutturaFacade } from 'src/app/core/application/facades/struttura.facade';
import { Struttura } from 'src/app/core/domain/models/struttura/struttura.model';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import {
  DocenteDetailResponse,
  DocenteSummary,
} from 'src/app/core/domain/models/career/docenti.model';
import {
  ContactCampusOption,
  DepartmentContact,
} from '@shared/types/dashboard/university-contacts.types';

const PLACEHOLDER_FAC_CODES = new Set(['NN', '000000']);

@Injectable({ providedIn: 'root' })
export class UniversityContactsService {
  private readonly struttura = inject(StrutturaFacade);
  private readonly career = inject(CareerFacade);

  private readonly strutture$: Observable<Struttura[]> = this.struttura.getFacolta().pipe(
    map(list => list.filter(s => !PLACEHOLDER_FAC_CODES.has(s.facCod))),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly departments$: Observable<DepartmentContact[]> = this.strutture$.pipe(
    map(list => list.map(s => this.toDepartmentContact(s))),
  );

  readonly campuses$: Observable<ContactCampusOption[]> = this.strutture$.pipe(
    map(list => {
      const seen = new Map<number, string>();
      for (const s of list) {
        for (const sede of s.sedi) {
          if (!seen.has(sede.sedeId)) seen.set(sede.sedeId, sede.sedeDes);
        }
      }
      return Array.from(seen.entries()).map(([id, label]) => ({ id, label }));
    }),
  );

  /**
   * Professors teaching the student's own degree course, from Cineca Course
   */
  readonly docenti$: Observable<DocenteSummary[]> = this.career.getDocenti(false).pipe(
    map(response => response.docenti),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /**
   * Ateneo-wide professor directory (every course, not just the student's
   * own). Backend-cached for 24h since it's identical for every student of
   * the same university - the first request after cache expiry may be
   * noticeably slower (iterates every course of the university).
   */
  readonly allDocenti$: Observable<DocenteSummary[]> = this.career.getDocenti(true).pipe(
    map(response => response.docenti),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** Fetched lazily (on accordion expand) - not cached here, one-shot per click. */
  getDocenteDetail(docenteId: string): Observable<DocenteDetailResponse> {
    return this.career.getDocenteDetail(docenteId);
  }

  private toDepartmentContact(s: Struttura): DepartmentContact {
    return {
      facId: s.facId,
      name: s.facDes,
      nameEng: s.facDesEng,
      city: s.citta || null,
      address: s.via || null,
      phone: s.tel || null,
      fax: s.fax || null,
      email: s.email || null,
      website: s.urlSitoWeb || null,
      sedeIds: s.sedi.map(sede => sede.sedeId),
    };
  }
}
