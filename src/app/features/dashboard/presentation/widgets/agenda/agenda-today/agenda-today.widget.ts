import { Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AgendaEventCardComponent } from '../../../pages/agenda/components/agenda-event-card/agenda-event-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarDays } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { AgendaEventsService } from 'src/app/features/dashboard/services/agenda-events.service';
import { calendarIsSameDay } from '@shared/utils/calendar.utils';

@Component({
  selector: 'app-agenda-today-widget',
  standalone: true,
  imports: [
    AgendaEventCardComponent,
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './agenda-today.widget.html',
})
export class AgendaTodayWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  private readonly agendaEvents = inject(AgendaEventsService);
  private readonly monthEvents = toSignal(this.agendaEvents.monthEvents$);

  readonly lucideCalendar = LucideCalendarDays;

  readonly today = new Date();
  readonly todayLabel = this.today.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  readonly todayEvents = computed(() => {
    const events = this.monthEvents() ?? [];
    return events
      .filter(event => calendarIsSameDay(event.startDate, this.today))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });
}
