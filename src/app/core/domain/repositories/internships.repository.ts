import { Observable } from 'rxjs';
import { InternshipApplicationResponse } from '../models/career/internship.model';

export abstract class InternshipsRepository {
  abstract getApplications(): Observable<InternshipApplicationResponse>;
}
