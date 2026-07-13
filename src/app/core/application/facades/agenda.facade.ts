import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import type { AgendaEvent, UniversityEvent } from '@shared/types';
import { AgendaRepository } from '../../domain/repositories/agenda.repository';
import { AgendaEventResponse } from '../../domain/models/agenda/agenda.model';

@Injectable()
export class AgendaFacade {
  private readonly repo = inject(AgendaRepository);

  getEvents(from?: Date, to?: Date): Observable<AgendaEvent[]> {
    return this.repo
      .getEvents(from?.toISOString(), to?.toISOString())
      .pipe(map(events => events.map(this.mapEvent)));
  }

  getUniversityEvents(): Observable<UniversityEvent[]> {
    return this.repo.getUniversityEvents().pipe(
      map(events =>
        events.map(e => ({
          id: e.id,
          universityId: e.universityId,
          title: e.title,
          description: e.description,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
          allDay: e.allDay,
          url: e.url,
          sourceUrl: e.sourceUrl,
          publishedAt: e.publishedAt ? new Date(e.publishedAt) : null,
          imported: e.imported,
        })),
      ),
    );
  }

  createEvent(event: Omit<AgendaEvent, 'id' | 'createdAt' | 'updatedAt'>): Observable<AgendaEvent> {
    return this.repo
      .createEvent({
        title: event.title,
        description: event.description ?? undefined,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate?.toISOString(),
        allDay: event.allDay,
        type: event.type,
        color: event.color ?? undefined,
        url: event.url ?? undefined,
        notes: event.notes ?? undefined,
        location: event.location ?? undefined,
      })
      .pipe(map(this.mapEvent));
  }

  updateEvent(id: string, partial: Partial<AgendaEvent>): Observable<AgendaEvent> {
    return this.repo
      .updateEvent(id, {
        title: partial.title ?? '',
        description: partial.description ?? undefined,
        startDate: partial.startDate?.toISOString() ?? new Date().toISOString(),
        endDate: partial.endDate?.toISOString(),
        allDay: partial.allDay,
        type: partial.type,
        color: partial.color ?? undefined,
        url: partial.url ?? undefined,
        notes: partial.notes ?? undefined,
        location: partial.location ?? undefined,
      })
      .pipe(map(this.mapEvent));
  }

  deleteEvent(id: string): Observable<void> {
    return this.repo.deleteEvent(id);
  }

  importUniversityEvent(id: string): Observable<void> {
    return this.repo.importUniversityEvent(id);
  }

  private mapEvent(e: AgendaEventResponse): AgendaEvent {
    return {
      id: e.id,
      title: e.title,
      description: e.description,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : null,
      allDay: e.allDay,
      type: e.type as AgendaEvent['type'],
      color: e.color,
      url: e.url,
      notes: e.notes,
      location: e.location,
      createdAt: new Date(e.createdAt),
      updatedAt: new Date(e.updatedAt),
    };
  }
}
