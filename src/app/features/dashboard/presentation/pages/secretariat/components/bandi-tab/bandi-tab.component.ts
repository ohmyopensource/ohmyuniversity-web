import { Component, input, computed, signal } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideEuro,
  LucideCalendarDays,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomPaginationComponent } from '@ui/custom-pagination/custom-pagination.component';
import { Bando, BandoStatus } from '@shared/types/dashboard/dashboard-secretariat.types';
import { PAGINATION } from '@shared/constants';

@Component({
  selector: 'app-bandi-tab',
  standalone: true,
  imports: [
    LucideDynamicIcon,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomPaginationComponent,
  ],
  templateUrl: './bandi-tab.component.html',
})
export class BandiTabComponent {
  readonly bandi = input.required<Bando[]>();

  readonly PAGINATION = PAGINATION;
  readonly iconEuro = LucideEuro;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconExternalLink = LucideExternalLink;

  readonly currentPage = signal(1);

  readonly paginatedBandi = computed(() => {
    const start = (this.currentPage() - 1) * PAGINATION.defaultPageSize;
    return this.bandi().slice(start, start + PAGINATION.defaultPageSize);
  });

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  statusLabel(status: BandoStatus): string {
    const map: Record<BandoStatus, string> = {
      open: 'Aperto',
      closing: 'In scadenza',
      closed: 'Chiuso',
    };
    return map[status];
  }

  statusVariant(status: BandoStatus): 'success' | 'warning' | 'neutral' {
    const map: Record<BandoStatus, 'success' | 'warning' | 'neutral'> = {
      open: 'success',
      closing: 'warning',
      closed: 'neutral',
    };
    return map[status];
  }
}
