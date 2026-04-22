/**
 * DTO: Data Transfer Object para Login Request
 * Se usa para transferir datos entre capas
 */
export interface LoginRequestDTO {
  email: string;
  password: string;
}

/**
 * DTO: Data Transfer Object para Login Response
 */
export interface LoginResponseDTO {
  id: string;
  email: string;
  fullName: string;
  token: string;
  expiresIn?: number;
  refreshToken?: string;
}

/**
 * DTO: Data Transfer Object para API Response
 * Estructura de respuesta real de https://localhost:7298/api/Token
 */
export interface ApiTokenResponseDTO {
  body: {
    accessToken: string;
  };
  errors: null | string[];
  warnings: null | string[];
}

/**
 * DTO: Payload decodificado del JWT
 */
export interface JwtPayload {
  nameid: string;
  unique_name: string;
  email: string;
  nbf: number;
  exp: number;
  iat: number;
  [key: string]: any;
}
