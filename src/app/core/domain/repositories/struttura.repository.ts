import { Observable } from 'rxjs';
import { Sede, Struttura } from '../models/struttura/struttura.model';

export abstract class StrutturaRepository {
  abstract getFacolta(): Observable<Struttura[]>;
  abstract getSede(sedeId: number): Observable<Sede>;
}
