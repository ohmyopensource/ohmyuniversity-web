import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFacoltaUseCase } from '../usecases/struttura/get-facolta.usecase';
import { Struttura } from 'src/app/core/domain/models/struttura/struttura.model';

@Injectable()
export class StrutturaFacade {
  private readonly getFacoltaUseCase = inject(GetFacoltaUseCase);

  getFacolta(): Observable<Struttura[]> {
    return this.getFacoltaUseCase.execute();
  }
}
