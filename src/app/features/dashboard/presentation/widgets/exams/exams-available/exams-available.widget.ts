import { Component, Input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarDays } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { BookingExamStatus } from '@shared/types/dashboard/dashboard-exams.types';
import { DashboardExamsService } from 'src/app/features/dashboard/services/dashboard-exams.service';

const STATUS_LABEL: Record<'open' | 'closing', string> = {
  open: 'Aperto',
  closing: 'In chiusura',
};

const STATUS_VARIANT: Record<'open' | 'closing', 'success' | 'warning'> = {
  open: 'success',
  closing: 'warning',
};

@Component({
  selector: 'app-exams-available-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './exams-available.widget.html',
})
export class ExamsAvailableWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  private readonly examsService = inject(DashboardExamsService);
  private readonly exams = toSignal(this.examsService.exams$);

  readonly lucideCalendarDays = LucideCalendarDays;
  readonly statusLabel = STATUS_LABEL;
  readonly statusVariant = STATUS_VARIANT;

  /** Only exams the student is actually enrolled in (matched against their study plan) - a
   *  widget shows what's relevant to the student, not the whole university's exam catalog. */
  readonly availableExams = computed(() => {
    const exams = this.exams() ?? [];
    return exams
      .filter(
        (e): e is typeof e & { status: 'open' | 'closing' } =>
          e.inStudyPlan && (e.status === 'open' || e.status === 'closing'),
      )
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'closing' ? -1 : 1;
        return this.toSortableDate(a.enrollDeadline) - this.toSortableDate(b.enrollDeadline);
      });
  });

  private toSortableDate(ddmmyyyy: string): number {
    const parts = ddmmyyyy.split('/');
    if (parts.length !== 3) return Number.MAX_SAFE_INTEGER;
    return new Date(+parts[2], +parts[1] - 1, +parts[0]).getTime();
  }
}
