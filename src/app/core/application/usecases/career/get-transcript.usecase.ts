import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { CourseCatalogueRepository } from '../../../domain/repositories/course-catalogue.repository';
import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import {
  mergeToExams,
  mergeWithFuturePlan,
} from 'src/app/core/application/mappers/carriera.mapper';
import { CoursePlanResponse } from 'src/app/core/domain/models/career/course-plan.model';

@Injectable()
export class GetTranscriptUseCase {
  private readonly careerRepo = inject(CareerRepository);
  private readonly catalogueRepo = inject(CourseCatalogueRepository);

  execute(): Observable<Exam[]> {
    return forkJoin({
      piano: this.careerRepo.getStudyPlan(),
      libretto: this.careerRepo.getTranscript(),
      coursePlan: this.catalogueRepo
        .getCoursePlan()
        .pipe(catchError(() => of<CoursePlanResponse>({ exams: [] }))),
    }).pipe(
      map(({ piano, libretto, coursePlan }) => {
        const baseExams = mergeToExams(piano.righe ?? [], libretto.righe ?? []);
        return mergeWithFuturePlan(baseExams, coursePlan.exams ?? []);
      }),
    );
  }
}
