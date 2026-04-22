/**
 * Auth Configuration
 * Configuracion centralizada para el modulo de autenticacion
 */
import { InjectionToken } from '@angular/core';
import { environment } from '../../../../../environments/environment';

export interface AuthConfig {
  apiUrl: string;
  endpoints: {
    login: string;
    logout?: string;
    refreshToken?: string;
    getProfile?: string;
    verifyToken?: string;
  };
  storageType: 'localStorage' | 'sessionStorage';
  storageKeys: {
    user: string;
    token: string;
    refreshToken: string;
    tokenExpiration: string;
  };
  tokenExpirationTime: number;
  refreshTokenThreshold: number;
  enableAutoRefresh: boolean;
}

/**
 * Configuracion por defecto
 * Sobreescribe segun tu entorno (desarrollo, produccion, etc.)
 */
export const defaultAuthConfig: AuthConfig = {
  apiUrl: environment.apis.auth.baseUrl,
  endpoints: {
    login: environment.apis.auth.endpoints.login,
    logout: environment.apis.auth.endpoints.logout,
    refreshToken: environment.apis.auth.endpoints.refreshToken,
    getProfile: environment.apis.auth.endpoints.profile,
    verifyToken: environment.apis.auth.endpoints.verify
  },
  storageType: environment.auth.storageType,
  storageKeys: environment.auth.storageKeys,
  tokenExpirationTime: environment.auth.tokenExpirationTime,
  refreshTokenThreshold: environment.auth.refreshTokenThreshold,
  enableAutoRefresh: environment.auth.enableAutoRefresh
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

/**
 * Endpoints de la API
 */
export const AUTH_ENDPOINTS = {
  LOGIN: defaultAuthConfig.endpoints.login,
  LOGOUT: defaultAuthConfig.endpoints.logout ?? '',
  REFRESH_TOKEN: defaultAuthConfig.endpoints.refreshToken ?? '',
  GET_PROFILE: defaultAuthConfig.endpoints.getProfile ?? '',
  VERIFY_TOKEN: defaultAuthConfig.endpoints.verifyToken ?? ''
};

/**
 * Mensajes de error
 */
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email o contrasena invalidos',
  SESSION_EXPIRED: 'Tu sesion ha expirado. Por favor inicia sesion de nuevo',
  NETWORK_ERROR: 'Error de conexion. Verifica tu conexion a internet',
  SERVER_ERROR: 'Error en el servidor. Intenta mas tarde',
  UNAUTHORIZED: 'No autorizado',
  FORBIDDEN: 'Acceso denegado'
};

/**
 * Claves de almacenamiento local
 */
export const STORAGE_KEYS = {
  USER: defaultAuthConfig.storageKeys.user,
  TOKEN: defaultAuthConfig.storageKeys.token,
  REFRESH_TOKEN: defaultAuthConfig.storageKeys.refreshToken,
  TOKEN_EXPIRATION: defaultAuthConfig.storageKeys.tokenExpiration
};
