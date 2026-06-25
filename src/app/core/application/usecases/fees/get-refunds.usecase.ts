import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeesRepository } from '../../../domain/repositories/fees.repository';
import { RefundResponse } from '../../../domain/models/career/refund.model';

@Injectable()
export class GetRefundsUseCase {
  private readonly repo = inject(FeesRepository);
  execute(): Observable<RefundResponse> {
    return this.repo.getRefunds();
  }
}
