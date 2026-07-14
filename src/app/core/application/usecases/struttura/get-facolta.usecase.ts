import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrutturaRepository } from '../../../domain/repositories/struttura.repository';
import { Struttura } from '../../../domain/models/struttura/struttura.model';

@Injectable()
export class GetFacoltaUseCase {
  private readonly repo = inject(StrutturaRepository);

  execute(): Observable<Struttura[]> {
    return this.repo.getFacolta();
  }
}
