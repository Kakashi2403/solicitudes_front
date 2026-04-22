/**
 * Use Case: Logout
 * Contiene la logica de negocio para cerrar sesion
 */
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthPort } from '../ports/auth.port';
import { AuthRepositoryPort } from '../ports/auth-repository.port';

@Injectable()
export class LogoutUseCase {
  constructor(
    private authPort: AuthPort,
    private authRepository: AuthRepositoryPort
  ) {}

  execute(): Observable<void> {
    return this.authPort.logout().pipe(
      tap(() => {
        this.authRepository.removeUser();
        this.authRepository.removeToken();
      })
    );
  }
}
