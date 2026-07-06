import { Observable } from 'rxjs';
import { CoursePlanResponse } from '../models/career/course-plan.model';
import { CourseSyllabusResponse } from '../models/career/course-syllabus.model';

export abstract class CourseCatalogueRepository {
  abstract getCoursePlan(): Observable<CoursePlanResponse>;
  abstract getCourseSyllabus(adCod: string): Observable<CourseSyllabusResponse>;
}
