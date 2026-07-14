import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { CourseCatalogueRepository } from '../../domain/repositories/course-catalogue.repository';
import { CoursePlanResponse } from '../../domain/models/career/course-plan.model';
import { CourseSyllabusResponse } from '../../domain/models/career/course-syllabus.model';
import {
  DocenteDetailResponse,
  DocentiListResponse,
} from '../../domain/models/career/docenti.model';

@Injectable()
export class CourseCatalogueApiRepository extends CourseCatalogueRepository {
  private readonly http = inject(HttpClient);

  getCoursePlan(): Observable<CoursePlanResponse> {
    return this.http.get<CoursePlanResponse>(API.courseCatalogue.plan);
  }

  getCourseSyllabus(adCod: string): Observable<CourseSyllabusResponse> {
    const params = new HttpParams().set('adCod', adCod);
    return this.http.get<CourseSyllabusResponse>(API.courseCatalogue.syllabus, { params });
  }

  getDocenti(tutti = false): Observable<DocentiListResponse> {
    const params = new HttpParams().set('tutti', tutti);
    return this.http.get<DocentiListResponse>(API.courseCatalogue.docenti, { params });
  }

  getDocenteDetail(docenteId: string): Observable<DocenteDetailResponse> {
    return this.http.get<DocenteDetailResponse>(API.courseCatalogue.docenteDetail(docenteId));
  }
}
