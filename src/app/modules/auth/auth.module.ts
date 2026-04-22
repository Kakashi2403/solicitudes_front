/**
 * Auth Module Configuration
 * Configura la inyeccion de dependencias y proporciona todos los servicios necesarios
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Domain
import { LoginUseCase } from './domain/use-cases/login.use-case';
import { LogoutUseCase } from './domain/use-cases/logout.use-case';
import { GetCurrentUserUseCase } from './domain/use-cases/get-current-user.use-case';

// Application
import { LoginMapper } from './application/mappers/login.mapper';

// Infrastructure - Adapters
import { HttpAuthAdapter } from './infrastructure/adapters/http-auth.adapter';
import { LocalStorageAuthAdapter } from './infrastructure/adapters/local-storage-auth.adapter';
import { AUTH_CONFIG, defaultAuthConfig } from './infrastructure/config/auth.config';
import { AuthService } from './infrastructure/services/auth.service';

// Ports
import { AuthPort } from './domain/ports/auth.port';
import { AuthRepositoryPort } from './domain/ports/auth-repository.port';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Configuracion
    {
      provide: AUTH_CONFIG,
      useValue: defaultAuthConfig
    },

    // Mappers
    LoginMapper,

    // Use Cases
    LoginUseCase,
    LogoutUseCase,
    GetCurrentUserUseCase,

    // Infrastructure - Adapters
    HttpAuthAdapter,
    LocalStorageAuthAdapter,

    // Service Facade
    AuthService,

    // Inyeccion de dependencias - Vincula los puertos con los adaptadores
    {
      provide: AuthPort,
      useExisting: HttpAuthAdapter
    },
    {
      provide: AuthRepositoryPort,
      useExisting: LocalStorageAuthAdapter
    }
  ]
})
export class AuthModule {}
