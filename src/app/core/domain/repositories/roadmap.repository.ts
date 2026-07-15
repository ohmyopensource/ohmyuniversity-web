import { Observable } from 'rxjs';
import { CorsoLaureaNazionale } from '../models/roadmap/corso-laurea-nazionale.model';

export abstract class RoadmapRepository {
  abstract getMagistraliAffini(
    classeLaureaAttuale: string,
    annoAccademico?: number,
  ): Observable<CorsoLaureaNazionale[]>;
}
