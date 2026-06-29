import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { CancelBookingRequest } from '../../../domain/models/career/book-exam.model';

@Injectable()
export class CancelBookingUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: CancelBookingRequest): Observable<void> {
    return this.repo.cancelBooking(request);
  }
}
