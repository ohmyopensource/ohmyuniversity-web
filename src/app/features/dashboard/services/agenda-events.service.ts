import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AgendaFacade } from 'src/app/core/application/facades/agenda.facade';
import type { AgendaEvent } from '@shared/types';

/**
 * Provides the current month's calendar events to dashboard agenda widgets.
 * A month range covers both the "today" and "monthly grid" widgets, so a
 * single shared request (via shareReplay) serves them both without
 * duplicating calls when placed together on the dashboard.
 */
@Injectable({ providedIn: 'root' })
export class AgendaEventsService {
  private readonly calendar = inject(AgendaFacade);

  readonly monthEvents$: Observable<AgendaEvent[]> = this.loadCurrentMonthEvents().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private loadCurrentMonthEvents(): Observable<AgendaEvent[]> {
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), 1);
    const to = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
    return this.calendar.getEvents(from, to);
  }
}
