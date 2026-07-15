import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { RoadmapRepository } from '../../domain/repositories/roadmap.repository';
import { CorsoLaureaNazionale } from '../../domain/models/roadmap/corso-laurea-nazionale.model';

@Injectable()
export class RoadmapApiRepository extends RoadmapRepository {
  private readonly http = inject(HttpClient);

  getMagistraliAffini(
    classeLaureaAttuale: string,
    annoAccademico?: number,
  ): Observable<CorsoLaureaNazionale[]> {
    let params = new HttpParams().set('classeLaureaAttuale', classeLaureaAttuale);
    if (annoAccademico !== undefined) {
      params = params.set('annoAccademico', annoAccademico);
    }
    return this.http.get<CorsoLaureaNazionale[]>(API.fetcher.magistraliAffini, { params });
  }
}
