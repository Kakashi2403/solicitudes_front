/**
 * Adaptador HTTP Auth Service
 * Implementa AuthPort - Comunica con una API externa
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthPort } from '../../domain/ports/auth.port';
import { AuthRepositoryPort } from '../../domain/ports/auth-repository.port';
import { User, AuthCredentials, LoginResponse } from '../../domain/entities/user.entity';
import { LoginMapper } from '../../application/mappers/login.mapper';
import { ApiTokenResponseDTO } from '../../application/dto/login.dto';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthAdapter implements AuthPort {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private loginMapper: LoginMapper,
    @Inject(AuthRepositoryPort) private authRepository: AuthRepositoryPort,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.authRepository.getUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Realiza login contra la API externa
   * Endpoint configurable desde environment
   */
  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.http
      .post<ApiTokenResponseDTO>(this.buildUrl(this.config.endpoints.login), {
        email: credentials.email,
        password: credentials.password
      })
      .pipe(
        map((apiResponse) => {
          const loginResponse = this.loginMapper.apiResponseToLoginResponse(apiResponse);

          if (loginResponse.success && loginResponse.user) {
            this.currentUserSubject.next(loginResponse.user);
          }

          return loginResponse;
        })
      );
  }

  /**
   * Obtiene el usuario actual desde el servicio
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  /**
   * Cierra sesion
   */
  logout(): Observable<void> {
    const logoutEndpoint = this.config.endpoints.logout;
    const request$ = logoutEndpoint ? this.http.post<void>(this.buildUrl(logoutEndpoint), {}) : of(void 0);

    return request$.pipe(
      catchError(() => of(void 0)),
      map(() => {
        this.currentUserSubject.next(null);
      })
    );
  }

  /**
   * Refresca el token
   */
  refreshToken(token: string): Observable<LoginResponse> {
    const refreshTokenEndpoint = this.config.endpoints.refreshToken;

    if (!refreshTokenEndpoint) {
      return throwError(() => new Error('No hay endpoint configurado para refrescar el token'));
    }

    return this.http
      .post<ApiTokenResponseDTO>(this.buildUrl(refreshTokenEndpoint), {
        token
      })
      .pipe(
        map((apiResponse) => {
          const loginResponse = this.loginMapper.apiResponseToLoginResponse(apiResponse);

          if (loginResponse.success && loginResponse.user) {
            this.currentUserSubject.next(loginResponse.user);
          }

          return loginResponse;
        })
      );
  }

  private buildUrl(endpoint: string): string {
    const sanitizedBaseUrl = this.config.apiUrl.replace(/\/+$/, '');
    const sanitizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${sanitizedBaseUrl}${sanitizedEndpoint}`;
  }
}
