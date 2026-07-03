import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { SurveyUnitsResponse } from '../../../domain/models/career/surveys.model';

@Injectable()
export class GetSurveyUnitsUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(adsceId: number): Observable<SurveyUnitsResponse> {
    return this.repo.getSurveyUnits(adsceId);
  }
}
