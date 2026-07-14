import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StrutturaRepository } from '../../domain/repositories/struttura.repository';
import { Sede, Struttura } from '../../domain/models/struttura/struttura.model';
import { API } from '@shared/constants';

@Injectable()
export class StrutturaApiRepository extends StrutturaRepository {
  private readonly http = inject(HttpClient);

  getFacolta(): Observable<Struttura[]> {
    return this.http.get<Struttura[]>(API.struttura.facolta);
  }

  getSede(sedeId: number): Observable<Sede> {
    return this.http.get<Sede>(API.struttura.sede(sedeId));
  }
}
