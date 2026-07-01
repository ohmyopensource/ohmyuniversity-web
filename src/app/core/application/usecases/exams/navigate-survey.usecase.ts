import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import {
  SurveyNavigateRequest,
  SurveyPage,
} from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class NavigateSurveyUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: SurveyNavigateRequest): Observable<SurveyPage> {
    return this.repo.navigateSurvey(request);
  }
}
