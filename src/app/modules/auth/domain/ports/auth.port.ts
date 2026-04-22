/**
 * Puerto AuthPort - Define el contrato para la autenticacion
 * Esta es una abstraccion que debe ser implementada por un adaptador
 */
import { Observable } from 'rxjs';
import { User, AuthCredentials, LoginResponse } from '../entities/user.entity';

export abstract class AuthPort {
  /**
   * Inicia sesion con credenciales
   */
  abstract login(credentials: AuthCredentials): Observable<LoginResponse>;

  /**
   * Obtiene el usuario actual
   */
  abstract getCurrentUser(): Observable<User | null>;

  /**
   * Cierra sesion
   */
  abstract logout(): Observable<void>;

  /**
   * Refresca el token
   */
  abstract refreshToken(token: string): Observable<LoginResponse>;
}

export type IAuthPort = AuthPort;
