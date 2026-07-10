import { Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarDays } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { AgendaEventsService } from 'src/app/features/dashboard/services/agenda-events.service';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarMonthGridDays,
  WEEKDAY_LABELS,
} from '@shared/utils/calendar.utils';

interface MonthWidgetCell {
  date: Date;
  dayNumber: number;
  isInMonth: boolean;
  isToday: boolean;
  eventDotColors: string[];
}

const MAX_DOTS_PER_CELL = 3;

@Component({
  selector: 'app-agenda-monthly-widget',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './agenda-monthly.widget.html',
})
export class AgendaMonthlyWidgetComponent {
  @Input() size: WidgetSize = 'large';

  private readonly agendaEvents = inject(AgendaEventsService);
  private readonly monthEvents = toSignal(this.agendaEvents.monthEvents$);

  readonly lucideCalendar = LucideCalendarDays;

  /** Single-letter weekday header (Lun→L, Mar→M, Mer→M, ...), matches the widget's compact width. */
  readonly weekdayInitials = WEEKDAY_LABELS.map(label => label.charAt(0));

  readonly today = new Date();
  readonly currentMonth = this.today.toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  });

  readonly monthCells = computed<MonthWidgetCell[]>(() => {
    const events = this.monthEvents() ?? [];

    return calendarMonthGridDays(this.today)
      .filter(cell => cell.isInMonth)
      .map(cell => {
        const dayEvents = events.filter(event => calendarIsSameDay(event.startDate, cell.date));
        const colors = [
          ...new Set(dayEvents.map(e => `var(--color-${calendarEventTypeVariant(e.type)}-dark)`)),
        ].slice(0, MAX_DOTS_PER_CELL);

        return {
          date: cell.date,
          dayNumber: cell.date.getDate(),
          isInMonth: cell.isInMonth,
          isToday: calendarIsSameDay(cell.date, this.today),
          eventDotColors: colors,
        };
      });
  });

  /** Leading blank cells before day 1, so the grid aligns under the weekday header. */
  readonly leadingOffset = computed(() =>
    calendarMonthGridDays(this.today).findIndex(cell => cell.isInMonth),
  );
}
