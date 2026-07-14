import { Observable } from 'rxjs';
import { CoursePlanResponse } from '../models/career/course-plan.model';
import { CourseSyllabusResponse } from '../models/career/course-syllabus.model';
import { DocentiListResponse, DocenteDetailResponse } from '../models/career/docenti.model';

export abstract class CourseCatalogueRepository {
  abstract getCoursePlan(): Observable<CoursePlanResponse>;
  abstract getCourseSyllabus(adCod: string): Observable<CourseSyllabusResponse>;
  abstract getDocenti(tutti?: boolean): Observable<DocentiListResponse>;
  abstract getDocenteDetail(docenteId: string): Observable<DocenteDetailResponse>;
}
