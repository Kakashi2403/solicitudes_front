/**
 * Entidad User - Representa un usuario en el dominio
 * Esta es la forma pura de los datos sin dependencias de frameworks
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  token: string;
  expiresIn?: number;
  refreshToken?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user?: User;
  success: boolean;
  message?: string;
}
