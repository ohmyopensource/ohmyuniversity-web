import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { SurveySaveRequest } from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class SaveSurveyPageUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: SurveySaveRequest): Observable<void> {
    return this.repo.saveSurveyPage(request);
  }
}
