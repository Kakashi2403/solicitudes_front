/**
 * Puerto AuthRepositoryPort - Define el contrato para persistencia de datos de autenticacion
 */
import { User } from '../entities/user.entity';

export abstract class AuthRepositoryPort {
  /**
   * Guarda el usuario en localStorage o sessionStorage
   */
  abstract saveUser(user: User): void;

  /**
   * Obtiene el usuario almacenado
   */
  abstract getUser(): User | null;

  /**
   * Elimina el usuario almacenado
   */
  abstract removeUser(): void;

  /**
   * Guarda el token
   */
  abstract saveToken(token: string): void;

  /**
   * Obtiene el token almacenado
   */
  abstract getToken(): string | null;

  /**
   * Elimina el token almacenado
   */
  abstract removeToken(): void;
}

export type IAuthRepositoryPort = AuthRepositoryPort;
