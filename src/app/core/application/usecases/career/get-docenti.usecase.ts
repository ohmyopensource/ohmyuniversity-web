import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCatalogueRepository } from '../../../domain/repositories/course-catalogue.repository';
import { DocentiListResponse } from '../../../domain/models/career/docenti.model';

@Injectable()
export class GetDocentiUseCase {
  private readonly repo = inject(CourseCatalogueRepository);

  execute(tutti = false): Observable<DocentiListResponse> {
    return this.repo.getDocenti(tutti);
  }
}
