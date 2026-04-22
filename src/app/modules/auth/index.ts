/**
 * Barrel exports para el módulo de autenticación
 * Facilita las importaciones desde otros módulos
 */

// Domain
export * from './domain/entities/user.entity';
export * from './domain/ports/auth.port';
export * from './domain/ports/auth-repository.port';
export * from './domain/use-cases/login.use-case';
export * from './domain/use-cases/logout.use-case';
export * from './domain/use-cases/get-current-user.use-case';

// Application
export * from './application/dto/login.dto';
export * from './application/mappers/login.mapper';

// Infrastructure
export * from './infrastructure/adapters/http-auth.adapter';
export * from './infrastructure/adapters/local-storage-auth.adapter';
export * from './infrastructure/services/auth.service';

// Module
export * from './auth.module';
export * from './auth.routes';
