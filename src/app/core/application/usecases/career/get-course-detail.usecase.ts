import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { CourseDetailResponse } from '../../../domain/models/career/course-detail.model';

@Injectable()
export class GetCourseDetailUseCase {
  private readonly repo = inject(ExamsRepository);

  execute(
    adCod: string,
    cdsCod: string,
    aaOffId?: number,
    cdsOffId?: number,
  ): Observable<CourseDetailResponse> {
    return this.repo.getCourseDetail(adCod, cdsCod, aaOffId, cdsOffId);
  }
}
