import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthTokens } from '../../domain/models/auth/auth-tokens.model';
import { LoginRequest } from '../../domain/models/auth/login-request.model';
import { API } from '@shared/constants';

@Injectable()
export class AuthApiRepository extends AuthRepository {
  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<AuthTokens> {
    const payload = { ...request, universityId: request.universityId.toUpperCase() };
    return this.http.post<AuthTokens>(API.auth.login, payload);
  }

  refresh(refreshToken: string, universityId: string): Observable<string> {
    return this.http.post(API.auth.refresh, null, {
      params: { refreshToken, universityId },
      responseType: 'text',
    });
  }

  logout(refreshToken: string, universityId: string): Observable<void> {
    return this.http.post<void>(API.auth.logout, null, {
      params: { refreshToken, universityId },
    });
  }

  switchUniversity(
    targetUniversityId: string,
    refreshToken: string,
  ): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(API.auth.switchUniversity, null, {
      params: { targetUniversityId, refreshToken },
    });
  }
}
