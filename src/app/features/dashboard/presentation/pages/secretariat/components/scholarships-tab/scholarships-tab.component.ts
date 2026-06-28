import { Component, input, output, computed, signal } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideChevronRight,
  LucideEuro,
  LucideCalendarDays,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomPaginationComponent } from '@ui/custom-pagination/custom-pagination.component';
import {
  Scholarship,
  ScholarshipStatus,
} from '@shared/types/dashboard/dashboard-secretariat.types';
import { PAGINATION } from '@shared/constants';

@Component({
  selector: 'app-scholarships-tab',
  standalone: true,
  imports: [
    LucideDynamicIcon,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomPaginationComponent,
  ],
  templateUrl: './scholarships-tab.component.html',
})
export class ScholarshipsTabComponent {
  readonly scholarships = input.required<Scholarship[]>();
  readonly apply = output<Scholarship>();

  readonly PAGINATION = PAGINATION;
  readonly iconChevron = LucideChevronRight;
  readonly iconEuro = LucideEuro;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconExternalLink = LucideExternalLink;

  readonly currentPage = signal(1);

  readonly paginatedScholarships = computed(() => {
    const start = (this.currentPage() - 1) * PAGINATION.defaultPageSize;
    return this.scholarships().slice(start, start + PAGINATION.defaultPageSize);
  });

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  statusLabel(status: ScholarshipStatus): string {
    const map: Record<ScholarshipStatus, string> = {
      open: 'Aperta',
      closing: 'In scadenza',
      closed: 'Chiusa',
      awarded: 'Assegnata',
      'not-awarded': 'Non assegnata',
    };
    return map[status];
  }

  statusVariant(
    status: ScholarshipStatus,
  ): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<ScholarshipStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> =
      {
        open: 'success',
        closing: 'warning',
        closed: 'neutral',
        awarded: 'primary',
        'not-awarded': 'error',
      };
    return map[status];
  }

  onApply(s: Scholarship): void {
    this.apply.emit(s);
  }
}
