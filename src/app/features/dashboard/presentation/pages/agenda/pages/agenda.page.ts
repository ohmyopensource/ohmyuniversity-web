import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucidePlus } from '@lucide/angular';
import { AgendaViewHeaderComponent } from '../components/agenda-view-header/agenda-view-header.component';
import { AgendaDayStripComponent } from '../components/agenda-day-strip/agenda-day-strip.component';
import { AgendaTimelineComponent } from '../components/agenda-timeline/agenda-timeline.component';
import { AgendaMonthViewComponent } from '../components/agenda-month-view/agenda-month-view.component';
import { AgendaYearViewComponent } from '../components/agenda-year-view/agenda-year-view.component';
import { AgendaEventFormComponent } from '../components/agenda-event-form/agenda-event-form.component';
import { AgendaEventDetailComponent } from '../components/agenda-event-detail/agenda-event-detail.component';
import type { AgendaEvent, AgendaEventLayout, AgendaViewMode } from '@shared/types';
import { calculateEventLayouts, calendarIsSameDay } from '@shared/utils/calendar.utils';
import { AgendaFacade } from 'src/app/core/application/facades/agenda.facade';

@Component({
  selector: 'app-agenda-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomButtonComponent,
    AgendaViewHeaderComponent,
    AgendaDayStripComponent,
    AgendaTimelineComponent,
    AgendaMonthViewComponent,
    AgendaYearViewComponent,
    AgendaEventFormComponent,
    AgendaEventDetailComponent,
  ],
  templateUrl: './agenda.page.html',
})
export class AgendaPage implements OnInit {
  private readonly agenda = inject(AgendaFacade);

  readonly events = signal<AgendaEvent[]>([]);
  readonly focusedDate = signal<Date>(new Date());
  readonly currentView = signal<AgendaViewMode>('day');
  readonly isFormOpen = signal(false);
  readonly eventBeingEdited = signal<AgendaEvent | null>(null);
  readonly isDetailOpen = signal(false);
  readonly eventBeingViewed = signal<AgendaEvent | null>(null);
  readonly iconAdd = LucidePlus;

  readonly eventsForFocusedDay = computed<AgendaEvent[]>(() => {
    const day = this.focusedDate();
    return this.events()
      .filter(event => calendarIsSameDay(event.startDate, day))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  readonly eventLayouts = computed<AgendaEventLayout[]>(() =>
    calculateEventLayouts(this.eventsForFocusedDay()),
  );

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.agenda.getEvents().subscribe({
      next: events => this.events.set(events),
      error: () => {},
    });
  }

  selectDate(date: Date): void {
    this.focusedDate.set(date);
  }

  goToView(view: AgendaViewMode, date: Date): void {
    this.focusedDate.set(date);
    this.currentView.set(view);
  }

  onMonthDaySelected(date: Date): void {
    this.goToView('day', date);
  }

  onYearMonthSelected(date: Date): void {
    this.goToView('month', date);
  }

  goBack(): void {
    if (this.currentView() === 'day') {
      this.currentView.set('month');
    } else if (this.currentView() === 'month') {
      this.currentView.set('year');
    }
  }

  onEventSelected(event: AgendaEvent): void {
    this.openDetail(event);
  }

  openDetail(event: AgendaEvent): void {
    this.eventBeingViewed.set(event);
    this.isDetailOpen.set(true);
  }

  closeDetail(): void {
    this.isDetailOpen.set(false);
    this.eventBeingViewed.set(null);
  }

  onDetailEditRequested(event: AgendaEvent): void {
    this.closeDetail();
    this.openEditForm(event);
  }

  onDetailDeleteConfirmed(id: string): void {
    this.agenda.deleteEvent(id).subscribe({
      next: () => {
        this.events.update(events => events.filter(e => e.id !== id));
        this.closeDetail();
      },
      error: () => {},
    });
  }

  openCreateForm(): void {
    this.eventBeingEdited.set(null);
    this.isFormOpen.set(true);
  }

  openEditForm(event: AgendaEvent): void {
    this.eventBeingEdited.set(event);
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.eventBeingEdited.set(null);
  }

  onEventCreated(data: Omit<AgendaEvent, 'id' | 'createdAt' | 'updatedAt'>): void {
    this.agenda.createEvent(data).subscribe({
      next: created => {
        this.events.update(events => [...events, created]);
        this.closeForm();
      },
      error: () => {},
    });
  }

  onEventUpdated(payload: { id: string; partial: Partial<AgendaEvent> }): void {
    this.agenda.updateEvent(payload.id, payload.partial).subscribe({
      next: updated => {
        this.events.update(events => events.map(e => (e.id === payload.id ? updated : e)));
        this.closeForm();
      },
      error: () => {},
    });
  }
}
