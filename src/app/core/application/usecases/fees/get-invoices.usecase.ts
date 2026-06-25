import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeesRepository } from '../../../domain/repositories/fees.repository';
import { InvoiceResponse } from '../../../domain/models/career/invoice.model';

@Injectable()
export class GetInvoicesUseCase {
  private readonly repo = inject(FeesRepository);
  execute(): Observable<InvoiceResponse> {
    return this.repo.getInvoices();
  }
}
