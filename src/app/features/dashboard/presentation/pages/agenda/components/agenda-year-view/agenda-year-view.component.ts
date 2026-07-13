import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import type { AgendaEvent, AgendaYearMonth } from '@shared/types';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarMonthGridDays,
  calendarMonthLabel,
} from '@shared/utils/calendar.utils';

@Component({
  selector: 'app-agenda-year-view',
  standalone: true,
  imports: [CustomCardComponent, CustomTextComponent, CustomButtonComponent],
  templateUrl: './agenda-year-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaYearViewComponent {
  readonly focusedDate = input.required<Date>();
  readonly events = input.required<AgendaEvent[]>();

  readonly monthSelected = output<Date>();
  readonly yearChanged = output<Date>();

  readonly iconPrevious = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;

  readonly yearLabel = computed(() => String(this.focusedDate().getFullYear()));

  readonly months = computed<AgendaYearMonth[]>(() => {
    const year = this.focusedDate().getFullYear();
    const today = new Date();
    const allEvents = this.events();

    return Array.from({ length: 12 }, (_, monthIndex) => {
      const monthDate = new Date(year, monthIndex, 1);
      const days = calendarMonthGridDays(monthDate).map(gridDay => {
        const dayEvents = gridDay.isInMonth
          ? allEvents
              .filter(event => calendarIsSameDay(event.startDate, gridDay.date))
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          : [];

        return {
          ...gridDay,
          isToday: calendarIsSameDay(gridDay.date, today),
          isWeekend: gridDay.date.getDay() === 0 || gridDay.date.getDay() === 6,
          dotVariant: dayEvents.length > 0 ? calendarEventTypeVariant(dayEvents[0].type) : null,
        };
      });

      return { date: monthDate, label: calendarMonthLabel(monthDate), days };
    });
  });

  onMonthClick(date: Date): void {
    this.monthSelected.emit(date);
  }

  goToPreviousYear(): void {
    this.shiftYear(-1);
  }

  goToNextYear(): void {
    this.shiftYear(1);
  }

  private shiftYear(deltaYears: number): void {
    const current = this.focusedDate();
    const shifted = new Date(current.getFullYear() + deltaYears, current.getMonth(), 1);
    this.yearChanged.emit(shifted);
  }
}
