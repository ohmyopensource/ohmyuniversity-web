import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';
import { ProfiloCarriera } from 'src/app/core/domain/models/auth/auth-tokens.model';
import { AuthRepository } from 'src/app/core/domain/repositories/auth.repository';
import {
  ACCESS_TOKEN_KEY,
  UNIVERSITY_ID_KEY,
  REFRESH_TOKEN_KEY,
} from 'src/app/core/application/usecases/auth/login.usecase';

@Injectable()
export class SwitchCarrieraUseCase {
  private readonly http = inject(HttpClient);
  private readonly authRepository = inject(AuthRepository);

  /**
   * Switches the active career profile.
   *
   * - Same university: calls /switch-carriera to update stuId/matId in JWT
   * - Cross university: calls /switch-university to get a new JWT for the target university.
   *   Returns a 409 observable if no active session exists (caller must prompt login).
   */
  execute(profilo: ProfiloCarriera): Observable<{ accessToken: string }> {
    const currentUniversityId = localStorage.getItem(UNIVERSITY_ID_KEY) ?? '';
    const isSameUniversity =
      profilo.universityId.toUpperCase() === currentUniversityId.toUpperCase();

    if (isSameUniversity) {
      return this.http
        .post<{ accessToken: string }>(API.auth.switchCarriera, null, {
          params: {
            stuId: profilo.stuId.toString(),
            matId: profilo.matId.toString(),
            matricola: profilo.matricola,
          },
        })
        .pipe(
          tap(response => {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
          }),
        );
    } else {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
      return this.authRepository
        .switchUniversity(profilo.universityId.toUpperCase(), refreshToken)
        .pipe(
          tap(response => {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
            localStorage.setItem(UNIVERSITY_ID_KEY, profilo.universityId.toUpperCase());
          }),
        );
    }
  }
}
