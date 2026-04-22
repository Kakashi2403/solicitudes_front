/**
 * Adaptador LocalStorage Auth Repository
 * Implementa AuthRepositoryPort - Persiste datos de autenticacion
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthRepositoryPort } from '../../domain/ports/auth-repository.port';
import { User } from '../../domain/entities/user.entity';
import { AUTH_CONFIG, AuthConfig } from '../config/auth.config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAuthAdapter implements AuthRepositoryPort {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) {}

  /**
   * Guarda el usuario en localStorage
   */
  saveUser(user: User): void {
    try {
      this.getStorage()?.setItem(this.config.storageKeys.user, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  /**
   * Obtiene el usuario del localStorage
   */
  getUser(): User | null {
    try {
      const user = this.getStorage()?.getItem(this.config.storageKeys.user);
      return user ? (JSON.parse(user) as User) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  }

  /**
   * Elimina el usuario del localStorage
   */
  removeUser(): void {
    try {
      this.getStorage()?.removeItem(this.config.storageKeys.user);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  }

  /**
   * Guarda el token en localStorage
   */
  saveToken(token: string): void {
    try {
      this.getStorage()?.setItem(this.config.storageKeys.token, token);
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  }

  /**
   * Obtiene el token del localStorage
   */
  getToken(): string | null {
    try {
      return this.getStorage()?.getItem(this.config.storageKeys.token) ?? null;
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  }

  /**
   * Elimina el token del localStorage
   */
  removeToken(): void {
    try {
      this.getStorage()?.removeItem(this.config.storageKeys.token);
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  }

  private getStorage(): Storage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return this.config.storageType === 'sessionStorage' ? sessionStorage : localStorage;
  }
}
