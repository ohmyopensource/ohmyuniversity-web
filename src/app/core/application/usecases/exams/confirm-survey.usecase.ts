import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { SurveyConfirmRequest } from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class ConfirmSurveyUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: SurveyConfirmRequest): Observable<void> {
    return this.repo.confirmSurvey(request);
  }
}
