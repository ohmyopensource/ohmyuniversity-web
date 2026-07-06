import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCatalogueRepository } from '../../../domain/repositories/course-catalogue.repository';
import { CourseSyllabusResponse } from '../../../domain/models/career/course-syllabus.model';

@Injectable()
export class GetCourseSyllabusUseCase {
  private readonly repo = inject(CourseCatalogueRepository);

  execute(adCod: string): Observable<CourseSyllabusResponse> {
    return this.repo.getCourseSyllabus(adCod);
  }
}
