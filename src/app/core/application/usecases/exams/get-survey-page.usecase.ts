import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import {
  SurveyGetPageRequest,
  SurveyPage,
} from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class GetSurveyPageUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: SurveyGetPageRequest): Observable<SurveyPage> {
    return this.repo.getSurveyPage(request);
  }
}
