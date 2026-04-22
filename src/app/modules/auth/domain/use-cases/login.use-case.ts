/**
 * Use Case: Login
 * Contiene la logica de negocio para el login
 */
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthPort } from '../ports/auth.port';
import { AuthRepositoryPort } from '../ports/auth-repository.port';
import { AuthCredentials, LoginResponse } from '../entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private authPort: AuthPort,
    private authRepository: AuthRepositoryPort
  ) {}

  execute(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.authPort.login(credentials).pipe(
      tap((response) => {
        if (response.success && response.user) {
          this.authRepository.saveUser(response.user);
          this.authRepository.saveToken(response.user.token);
        }
      })
    );
  }
}
