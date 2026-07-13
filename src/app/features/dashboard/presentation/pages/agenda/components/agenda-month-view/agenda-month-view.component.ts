import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import {
  LucideBookmark,
  LucideChevronLeft,
  LucideChevronRight,
  LucideDynamicIcon,
} from '@lucide/angular';
import type { AgendaEvent, AgendaMonthCell } from '@shared/types';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarMonthGridDays,
  calendarMonthLabel,
  truncateLabel,
  WEEKDAY_LABELS,
} from '@shared/utils/calendar.utils';
import {
  MAX_VISIBLE_EVENTS_PER_CELL,
  LABEL_LENGTH_MOBILE,
  LABEL_LENGTH_TABLET,
  LABEL_LENGTH_DESKTOP,
} from '@shared/constants';

@Component({
  selector: 'app-agenda-month-view',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomTextComponent,
    CustomButtonComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './agenda-month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaMonthViewComponent {
  readonly focusedDate = input.required<Date>();
  readonly events = input.required<AgendaEvent[]>();

  readonly daySelected = output<Date>();
  readonly monthChanged = output<Date>();

  readonly weekdayLabels = WEEKDAY_LABELS;
  readonly iconPrevious = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;
  readonly iconToday = LucideBookmark;

  readonly calendarEventTypeVariant = calendarEventTypeVariant;

  readonly monthLabel = computed(() => calendarMonthLabel(this.focusedDate()));

  readonly cells = computed<AgendaMonthCell[]>(() => {
    const today = new Date();
    const allEvents = this.events();

    return calendarMonthGridDays(this.focusedDate()).map(gridDay => {
      const dayEvents = allEvents
        .filter(event => calendarIsSameDay(event.startDate, gridDay.date))
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      return {
        ...gridDay,
        isToday: calendarIsSameDay(gridDay.date, today),
        visibleEvents: dayEvents.slice(0, MAX_VISIBLE_EVENTS_PER_CELL).map(event => ({
          event,
          labelMobile: truncateLabel(event.title, LABEL_LENGTH_MOBILE),
          labelTablet: truncateLabel(event.title, LABEL_LENGTH_TABLET),
          labelDesktop: truncateLabel(event.title, LABEL_LENGTH_DESKTOP),
        })),
        overflowCount: Math.max(0, dayEvents.length - MAX_VISIBLE_EVENTS_PER_CELL),
      };
    });
  });

  onDayClick(date: Date): void {
    this.daySelected.emit(date);
  }

  goToPreviousMonth(): void {
    this.shiftMonth(-1);
  }

  goToNextMonth(): void {
    this.shiftMonth(1);
  }

  private shiftMonth(deltaMonths: number): void {
    const current = this.focusedDate();
    const shifted = new Date(current.getFullYear(), current.getMonth() + deltaMonths, 1);
    this.monthChanged.emit(shifted);
  }
}
