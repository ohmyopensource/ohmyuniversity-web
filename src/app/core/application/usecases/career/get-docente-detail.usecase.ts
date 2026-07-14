import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCatalogueRepository } from '../../../domain/repositories/course-catalogue.repository';
import { DocenteDetailResponse } from '../../../domain/models/career/docenti.model';

@Injectable()
export class GetDocenteDetailUseCase {
  private readonly repo = inject(CourseCatalogueRepository);

  execute(docenteId: string): Observable<DocenteDetailResponse> {
    return this.repo.getDocenteDetail(docenteId);
  }
}
