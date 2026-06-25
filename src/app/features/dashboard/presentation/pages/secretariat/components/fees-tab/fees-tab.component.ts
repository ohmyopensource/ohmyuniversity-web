import { Component, input, computed, inject, OnInit, signal } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCircleAlert,
  LucideClock,
  LucideInfo,
  LucideTriangleAlert,
  LucideReceipt,
  LucideArrowDownLeft,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { APP } from '@shared/constants';
import { FeeStatus } from '@shared/types/dashboard/dashboard-secretariat.types';
import {
  FeeStatusResponse,
  Charge,
} from '../../../../../../../core/domain/models/career/fees-status.model';
import { Invoice } from '../../../../../../../core/domain/models/career/invoice.model';
import { Refund } from '../../../../../../../core/domain/models/career/refund.model';
import { FeesFacade } from 'src/app/core/application/facades/fees.facade';

@Component({
  selector: 'app-fees-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CardStatusComponent],
  templateUrl: './fees-tab.component.html',
})
export class FeesTabComponent implements OnInit {
  readonly tasse = input.required<FeeStatusResponse | null>();
  readonly loading = input.required<boolean>();
  readonly error = input.required<boolean>();
  readonly hasCarriera = input.required<boolean>();

  private readonly feesFacade = inject(FeesFacade);

  readonly APP = APP;
  readonly iconCheck = LucideCircleCheck;
  readonly iconAlert = LucideCircleAlert;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconTriangle = LucideTriangleAlert;
  readonly iconReceipt = LucideReceipt;
  readonly iconRefund = LucideArrowDownLeft;

  readonly invoices = signal<Invoice[]>([]);
  readonly invoicesLoading = signal(true);
  readonly invoicesError = signal(false);

  readonly refunds = signal<Refund[]>([]);
  readonly refundsLoading = signal(true);
  readonly refundsError = signal(false);

  ngOnInit(): void {
    if (!this.hasCarriera()) return;

    this.feesFacade.getInvoices().subscribe({
      next: res => {
        this.invoices.set(res.invoices ?? []);
        this.invoicesLoading.set(false);
      },
      error: () => {
        this.invoicesError.set(true);
        this.invoicesLoading.set(false);
      },
    });

    this.feesFacade.getRefunds().subscribe({
      next: res => {
        this.refunds.set(res.refunds ?? []);
        this.refundsLoading.set(false);
      },
      error: () => {
        this.refundsError.set(true);
        this.refundsLoading.set(false);
      },
    });
  }

  readonly totalPaid = computed(() =>
    (this.tasse()?.addebiti ?? [])
      .filter(a => a.pagatoFlg === 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0),
  );

  readonly totalPending = computed(() =>
    (this.tasse()?.addebiti ?? [])
      .filter(a => a.pagatoFlg !== 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0),
  );

  addebitoStatus(a: Charge): FeeStatus {
    if (a.pagatoFlg === 1) return 'paid';
    if (a.scadutoFlg === 1 || a.fattScadutaFlg === 1) return 'overdue';
    return 'pending';
  }

  invoiceStatus(inv: Invoice): FeeStatus {
    if (inv.cancelledFlg === 1) return 'overdue';
    if (inv.paidFlg === 1) return 'paid';
    return 'pending';
  }

  feeStatusLabel(status: FeeStatus): string {
    const map: Record<FeeStatus, string> = {
      paid: 'Pagata',
      pending: 'Da pagare',
      overdue: 'Scaduta',
    };
    return map[status];
  }

  invoiceStatusLabel(inv: Invoice): string {
    if (inv.cancelledFlg === 1) return 'Annullata';
    if (inv.paidFlg === 1) return 'Pagata';
    return 'Da pagare';
  }

  feeStatusVariant(status: FeeStatus): 'success' | 'primary' | 'error' {
    const map: Record<FeeStatus, 'success' | 'primary' | 'error'> = {
      paid: 'success',
      pending: 'primary',
      overdue: 'error',
    };
    return map[status];
  }

  invoiceStatusVariant(inv: Invoice): 'success' | 'primary' | 'error' | 'neutral' {
    if (inv.cancelledFlg === 1) return 'neutral';
    if (inv.paidFlg === 1) return 'success';
    return 'primary';
  }

  feeIcon(status: FeeStatus): any {
    if (status === 'paid') return this.iconCheck;
    if (status === 'overdue') return this.iconAlert;
    return this.iconClock;
  }

  feeIconColor(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-dark)';
    if (status === 'overdue') return 'var(--color-error-dark)';
    return 'var(--color-primary-dark)';
  }

  feeIconBg(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-light)';
    if (status === 'overdue') return 'var(--color-error-light)';
    return 'var(--color-primary-light)';
  }

  formatAmount(amount: number | string | null | undefined): string {
    const n = typeof amount === 'string' ? parseFloat(amount) : (amount ?? 0);
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);
  }
}
