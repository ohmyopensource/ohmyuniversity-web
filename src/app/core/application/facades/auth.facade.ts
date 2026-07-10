import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens, ProfiloCarriera } from 'src/app/core/domain/models/auth/auth-tokens.model';
import { LoginRequest } from 'src/app/core/domain/models/auth/login-request.model';
import { LogoutUseCase } from '../usecases/auth/logout.usecase';
import { RefreshTokenUseCase } from '../usecases/auth/refresh-token.usecase';
import {
  LoginUseCase,
  ACCESS_TOKEN_KEY,
  UNIVERSITY_ID_KEY,
  USER_NOME_KEY,
  USER_COGNOME_KEY,
  PROFILI_KEY,
} from '../usecases/auth/login.usecase';
import { SwitchCarrieraUseCase } from '../usecases/career/switch-carriera.usecase';
import { GetSessionsUseCase } from '../usecases/auth/get-sessions.usecase';
import { RevokeSessionUseCase } from '../usecases/auth/revoke-session.usecase';
import { AuthSession } from 'src/app/core/domain/models/auth/auth-session.model';

@Injectable()
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly refreshTokenUseCase = inject(RefreshTokenUseCase);
  private readonly switchCarrieraUseCase = inject(SwitchCarrieraUseCase);
  private readonly getSessionsUseCase = inject(GetSessionsUseCase);
  private readonly revokeSessionUseCase = inject(RevokeSessionUseCase);

  login(request: LoginRequest): Observable<AuthTokens> {
    return this.loginUseCase.execute(request);
  }

  logout(): Observable<void> {
    return this.logoutUseCase.execute();
  }

  refresh(universityId: string): Observable<string> {
    return this.refreshTokenUseCase.execute(universityId);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getUniversityId(): string | null {
    return localStorage.getItem(UNIVERSITY_ID_KEY);
  }

  getUserName(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    const cognome = localStorage.getItem(USER_COGNOME_KEY) ?? '';
    return `${nome} ${cognome}`.trim();
  }

  getNome(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    return nome
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  getNomeCompleto(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    const cognome = localStorage.getItem(USER_COGNOME_KEY) ?? '';
    return [nome, cognome]
      .map(s =>
        s
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      )
      .join(' ')
      .trim();
  }

  getProfili(): ProfiloCarriera[] {
    const raw = localStorage.getItem(PROFILI_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as ProfiloCarriera[];
    } catch {
      return [];
    }
  }

  hasCarriera(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.hasCarriera === true;
    } catch {
      return false;
    }
  }

  getActiveStuId(): number | null {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return typeof payload.stuId === 'number' ? payload.stuId : null;
    } catch {
      return null;
    }
  }

  switchCarriera(profilo: ProfiloCarriera): Observable<{ accessToken: string }> {
    return this.switchCarrieraUseCase.execute(profilo);
  }

  getSessions(): Observable<AuthSession[]> {
    return this.getSessionsUseCase.execute();
  }

  revokeSession(sessionId: string): Observable<void> {
    return this.revokeSessionUseCase.execute(sessionId);
  }
}
