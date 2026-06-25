import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeStatusResponse } from 'src/app/core/domain/models/career/fees-status.model';
import { InvoiceResponse } from 'src/app/core/domain/models/career/invoice.model';
import { RefundResponse } from 'src/app/core/domain/models/career/refund.model';
import { GetFeesStatusUseCase } from '../usecases/fees/get-fees-status.usecase';
import { GetInvoicesUseCase } from '../usecases/fees/get-invoices.usecase';
import { GetRefundsUseCase } from '../usecases/fees/get-refunds.usecase';

@Injectable()
export class FeesFacade {
  private readonly getFeesStatusUseCase = inject(GetFeesStatusUseCase);
  private readonly getInvoicesUseCase = inject(GetInvoicesUseCase);
  private readonly getRefundsUseCase = inject(GetRefundsUseCase);

  getStatus(): Observable<FeeStatusResponse> {
    return this.getFeesStatusUseCase.execute();
  }

  getInvoices(): Observable<InvoiceResponse> {
    return this.getInvoicesUseCase.execute();
  }

  getRefunds(): Observable<RefundResponse> {
    return this.getRefundsUseCase.execute();
  }
}
