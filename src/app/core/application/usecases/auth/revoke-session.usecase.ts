import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../../domain/repositories/auth.repository';

@Injectable()
export class RevokeSessionUseCase {
  private readonly repo = inject(AuthRepository);

  execute(sessionId: string): Observable<void> {
    return this.repo.revokeSession(sessionId);
  }
}
