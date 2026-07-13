import { Observable } from 'rxjs';
import {
  AgendaEventResponse,
  AgendaEventCreateRequest,
  UniversityEventResponse,
} from '../models/agenda/agenda.model';

export abstract class AgendaRepository {
  abstract getEvents(from?: string, to?: string): Observable<AgendaEventResponse[]>;
  abstract createEvent(request: AgendaEventCreateRequest): Observable<AgendaEventResponse>;
  abstract updateEvent(
    id: string,
    request: AgendaEventCreateRequest,
  ): Observable<AgendaEventResponse>;
  abstract deleteEvent(id: string): Observable<void>;
  abstract getUniversityEvents(): Observable<UniversityEventResponse[]>;
  abstract importUniversityEvent(id: string): Observable<void>;
}
