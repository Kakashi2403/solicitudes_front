/**
 * Mapper: Convierte DTOs a Entidades de Dominio y viceversa
 * Aisla la capa de presentacion de los cambios en las APIs externas
 */
import { Injectable } from '@angular/core';
import { LoginRequestDTO, LoginResponseDTO, ApiTokenResponseDTO, JwtPayload } from '../dto/login.dto';
import { User, AuthCredentials, LoginResponse } from '../../domain/entities/user.entity';

@Injectable()
export class LoginMapper {
  /**
   * Mapea LoginRequestDTO a AuthCredentials (Entidad de Dominio)
   */
  dtoToAuthCredentials(dto: LoginRequestDTO): AuthCredentials {
    return {
      email: dto.email,
      password: dto.password
    };
  }

  /**
   * Decodifica el JWT sin validar (solo lectura)
   * En produccion, la validacion debe hacerse en el backend
   */
  private decodeJwt(token: string): JwtPayload {
    try {
      const parts = token.split('.');

      if (parts.length !== 3) {
        throw new Error('Token invalido');
      }

      const normalizedPayload = parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(Math.ceil(parts[1].length / 4) * 4, '=');
      const decoded = JSON.parse(atob(normalizedPayload));

      return decoded as JwtPayload;
    } catch (error) {
      console.error('Error decodificando JWT:', error);
      throw new Error('No se pudo decodificar el token');
    }
  }

  /**
   * Mapea respuesta de API a Entidad User
   * Extrae informacion del JWT ya que la API solo devuelve el token
   */
  apiResponseToUser(apiResponse: ApiTokenResponseDTO): User {
    const token = apiResponse.body?.accessToken;

    if (!token) {
      throw new Error('La API de autenticacion no devolvio un access token');
    }

    const payload = this.decodeJwt(token);

    return {
      id: payload.nameid,
      email: payload.email,
      fullName: payload.unique_name,
      token,
      expiresIn: payload.exp ? payload.exp - Math.floor(Date.now() / 1000) : 3600
    };
  }

  /**
   * Mapea User a LoginResponseDTO (para presentacion)
   */
  userToLoginResponseDTO(user: User): LoginResponseDTO {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      token: user.token,
      expiresIn: user.expiresIn,
      refreshToken: user.refreshToken
    };
  }

  /**
   * Mapea respuesta de API a LoginResponse
   */
  apiResponseToLoginResponse(apiResponse: ApiTokenResponseDTO): LoginResponse {
    if (apiResponse.errors && apiResponse.errors.length > 0) {
      return {
        success: false,
        message: apiResponse.errors.join(', ')
      };
    }

    try {
      const user = this.apiResponseToUser(apiResponse);
      return {
        user,
        success: true,
        message: 'Autenticacion exitosa'
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error en la autenticacion'
      };
    }
  }
}
