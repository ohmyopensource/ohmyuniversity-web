import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternshipsRepository } from '../../../domain/repositories/internships.repository';
import { InternshipApplicationResponse } from '../../../domain/models/career/internship.model';

@Injectable()
export class GetInternshipApplicationsUseCase {
  private readonly repo = inject(InternshipsRepository);
  execute(): Observable<InternshipApplicationResponse> {
    return this.repo.getApplications();
  }
}
