import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../core/domain/repositories/auth.repository';
import { AuthTokens, ProfiloCarriera } from '../../../../core/domain/models/auth/auth-tokens.model';
import { LoginRequest } from '../../../../core/domain/models/auth/login-request.model';

const ACCESS_TOKEN_KEY = 'omu_access_token';
const REFRESH_TOKEN_KEY = 'omu_refresh_token';

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
export const UNIVERSITY_ID_KEY = 'omu_university_id';
export const USER_NOME_KEY = 'omu_nome';
export const USER_COGNOME_KEY = 'omu_cognome';
export const HAS_CARRIERA_KEY = 'omu_has_carriera';
export const PROFILI_KEY = 'omu_profili';

@Injectable()
export class LoginUseCase {
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);

  execute(request: LoginRequest): Observable<AuthTokens> {
    return this.authRepository.login(request).pipe(
      tap(tokens => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        localStorage.setItem(UNIVERSITY_ID_KEY, request.universityId);
        localStorage.setItem(USER_NOME_KEY, tokens.nome);
        localStorage.setItem(USER_COGNOME_KEY, tokens.cognome);

        const nuovi = tokens.profili ?? [];
        const esistenti: ProfiloCarriera[] = (() => {
          try {
            return JSON.parse(localStorage.getItem(PROFILI_KEY) ?? '[]');
          } catch {
            return [];
          }
        })();
        const altriAtenei = esistenti.filter(p => p.universityId !== request.universityId);
        const nuoviDedup = nuovi.filter(
          (p, i, arr) => arr.findIndex(x => x.stuId === p.stuId) === i,
        );
        const merged = [...altriAtenei, ...nuoviDedup];
        localStorage.setItem(PROFILI_KEY, JSON.stringify(merged));

        this.router.navigate(['/dashboard']);
      }),
    );
  }
}
