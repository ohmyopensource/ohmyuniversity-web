import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { AuthSession } from '../../../domain/models/auth/auth-session.model';

@Injectable()
export class GetSessionsUseCase {
  private readonly repo = inject(AuthRepository);

  execute(): Observable<AuthSession[]> {
    return this.repo.getSessions();
  }
}
