import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { SurveyStartResponse } from '../../../domain/models/career/survey-compilation.model';

@Injectable()
export class StartSurveyUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(adsceId: number): Observable<SurveyStartResponse> {
    return this.repo.startSurvey(adsceId);
  }
}
