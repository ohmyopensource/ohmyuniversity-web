import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternshipApplicationResponse } from 'src/app/core/domain/models/career/internship.model';
import { GetInternshipApplicationsUseCase } from '../usecases/internships/get-internship-applications.usecase';

@Injectable()
export class InternshipsFacade {
  private readonly getApplicationsUseCase = inject(GetInternshipApplicationsUseCase);

  getApplications(): Observable<InternshipApplicationResponse> {
    return this.getApplicationsUseCase.execute();
  }
}
