import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';
import {
  AgendaEventCreateRequest,
  AgendaEventResponse,
  UniversityEventResponse,
} from '../../domain/models/agenda/agenda.model';
import { AgendaRepository } from '../../domain/repositories/agenda.repository';

@Injectable()
export class AgendaApiRepository extends AgendaRepository {
  private readonly http = inject(HttpClient);

  getEvents(from?: string, to?: string): Observable<AgendaEventResponse[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<AgendaEventResponse[]>(API.agenda.events, { params });
  }

  createEvent(request: AgendaEventCreateRequest): Observable<AgendaEventResponse> {
    return this.http.post<AgendaEventResponse>(API.agenda.events, request);
  }

  updateEvent(id: string, request: AgendaEventCreateRequest): Observable<AgendaEventResponse> {
    return this.http.put<AgendaEventResponse>(API.agenda.event(id), request);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(API.agenda.event(id));
  }

  getUniversityEvents(): Observable<UniversityEventResponse[]> {
    return this.http.get<UniversityEventResponse[]>(API.agenda.universityEvents);
  }

  importUniversityEvent(id: string): Observable<void> {
    return this.http.post<void>(API.agenda.importEvent(id), null);
  }
}
