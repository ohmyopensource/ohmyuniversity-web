import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoadmapRepository } from '../../../domain/repositories/roadmap.repository';
import { CorsoLaureaNazionale } from '../../../domain/models/roadmap/corso-laurea-nazionale.model';

@Injectable()
export class GetMagistraliAffiniUseCase {
  private readonly repo = inject(RoadmapRepository);

  execute(
    classeLaureaAttuale: string,
    annoAccademico?: number,
  ): Observable<CorsoLaureaNazionale[]> {
    return this.repo.getMagistraliAffini(classeLaureaAttuale, annoAccademico);
  }
}
