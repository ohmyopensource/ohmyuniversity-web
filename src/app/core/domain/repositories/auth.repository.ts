import { Observable } from 'rxjs';
import { AuthTokens } from '../models/auth/auth-tokens.model';
import { LoginRequest } from '../models/auth/login-request.model';

export abstract class AuthRepository {
  abstract login(request: LoginRequest): Observable<AuthTokens>;
  abstract refresh(refreshToken: string, universityId: string): Observable<string>;
  abstract logout(refreshToken: string, universityId: string): Observable<void>;
  abstract switchUniversity(
    targetUniversityId: string,
    refreshToken: string,
  ): Observable<{ accessToken: string }>;
}
