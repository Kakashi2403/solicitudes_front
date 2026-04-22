/**
 * Use Case: Get Current User
 * Obtiene el usuario actual de la sesion
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPort } from '../ports/auth.port';
import { User } from '../entities/user.entity';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private authPort: AuthPort) {}

  execute(): Observable<User | null> {
    return this.authPort.getCurrentUser();
  }
}
