import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CorsoLaureaNazionale } from '../../domain/models/roadmap/corso-laurea-nazionale.model';
import { GetMagistraliAffiniUseCase } from '../usecases/roadmap/get-magistrali-affini.usecase';

@Injectable()
export class RoadmapFacade {
  private readonly getMagistraliAffiniUseCase = inject(GetMagistraliAffiniUseCase);

  getMagistraliAffini(
    classeLaureaAttuale: string,
    annoAccademico?: number,
  ): Observable<CorsoLaureaNazionale[]> {
    return this.getMagistraliAffiniUseCase.execute(classeLaureaAttuale, annoAccademico);
  }
}
