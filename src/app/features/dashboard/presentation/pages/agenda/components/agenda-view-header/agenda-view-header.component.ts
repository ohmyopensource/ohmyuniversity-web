import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideChevronLeft } from '@lucide/angular';
import { calendarMonthLabel } from '@shared/utils/calendar.utils';
import { CalendarViewMode } from '@shared/types';

@Component({
  selector: 'app-agenda-view-header',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './agenda-view-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaViewHeaderComponent {
  readonly currentView = input.required<CalendarViewMode>();
  readonly focusedDate = input.required<Date>();

  readonly back = output<void>();

  readonly iconBack = LucideChevronLeft;

  /** Whether a "go up one level" button should be shown - false at the root (year) view */
  readonly hasBackButton = computed(() => this.currentView() !== 'year');

  /** Label shown on the header: month name in day view, year number in month view, year in year view */
  readonly label = computed<string>(() => {
    const date = this.focusedDate();
    if (this.currentView() === 'day') return calendarMonthLabel(date);
    return String(date.getFullYear());
  });

  onBackClick(): void {
    this.back.emit();
  }
}
