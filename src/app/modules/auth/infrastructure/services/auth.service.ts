/**
 * Auth Service - Facade
 * Servicio de fachada que orquesta los use cases
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUseCase } from '../../domain/use-cases/login.use-case';
import { LogoutUseCase } from '../../domain/use-cases/logout.use-case';
import { GetCurrentUserUseCase } from '../../domain/use-cases/get-current-user.use-case';
import { AuthCredentials, LoginResponse, User } from '../../domain/entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private getCurrentUserUseCase: GetCurrentUserUseCase
  ) {}

  /**
   * Ejecuta el login
   */
  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.loginUseCase.execute(credentials);
  }

  /**
   * Ejecuta el logout
   */
  logout(): Observable<void> {
    return this.logoutUseCase.execute();
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): Observable<User | null> {
    return this.getCurrentUserUseCase.execute();
  }
}
