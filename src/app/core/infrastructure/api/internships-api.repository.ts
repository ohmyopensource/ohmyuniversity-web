import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';
import { InternshipsRepository } from '../../domain/repositories/internships.repository';
import { InternshipApplicationResponse } from 'src/app/core/domain/models/career/internship.model';

@Injectable()
export class InternshipsApiRepository extends InternshipsRepository {
  private readonly http = inject(HttpClient);

  getApplications(): Observable<InternshipApplicationResponse> {
    return this.http.get<InternshipApplicationResponse>(API.internships.applications);
  }
}
