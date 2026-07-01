import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import {
  SurveySummaryRequest,
  SurveySummaryResponse,
} from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class GetSurveySummaryUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: SurveySummaryRequest): Observable<SurveySummaryResponse> {
    return this.repo.getSurveySummary(request);
  }
}
