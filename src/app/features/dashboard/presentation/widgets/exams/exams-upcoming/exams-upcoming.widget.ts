import { Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarCheck } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { DashboardExamsService } from 'src/app/features/dashboard/services/dashboard-exams.service';

@Component({
  selector: 'app-exams-upcoming-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './exams-upcoming.widget.html',
})
export class ExamsUpcomingWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  private readonly examsService = inject(DashboardExamsService);
  private readonly exams = toSignal(this.examsService.exams$);

  readonly lucideCalendarCheck = LucideCalendarCheck;

  readonly upcomingBookings = computed(() => {
    const exams = this.exams() ?? [];
    return exams
      .filter(e => e.status === 'booked')
      .sort((a, b) => this.toSortableDate(a.date) - this.toSortableDate(b.date));
  });

  private toSortableDate(ddmmyyyy: string): number {
    const parts = ddmmyyyy.split('/');
    if (parts.length !== 3) return Number.MAX_SAFE_INTEGER;
    return new Date(+parts[2], +parts[1] - 1, +parts[0]).getTime();
  }
}
