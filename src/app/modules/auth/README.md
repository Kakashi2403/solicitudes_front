# Arquitectura Hexagonal - Módulo de Autenticación

## Descripción General

Este módulo implementa **Arquitectura Hexagonal (Ports & Adapters)** para el sistema de autenticación de la aplicación. La arquitectura hexagonal desacopla la lógica de negocio de los detalles de implementación técnica.

## Estructura de Carpetas

```
src/app/modules/auth/
├── domain/                    # Capa de Dominio (Lógica de negocio pura)
│   ├── entities/             # Entidades del dominio
│   │   └── user.entity.ts
│   ├── ports/                # Interfaces (Puertos)
│   │   ├── auth.port.ts
│   │   └── auth-repository.port.ts
│   └── use-cases/            # Casos de uso
│       ├── login.use-case.ts
│       ├── logout.use-case.ts
│       └── get-current-user.use-case.ts
│
├── application/              # Capa de Aplicación
│   ├── dto/                  # Data Transfer Objects
│   │   └── login.dto.ts
│   └── mappers/              # Mappers (Conversión entre capas)
│       └── login.mapper.ts
│
├── infrastructure/           # Capa de Infraestructura
│   ├── adapters/             # Implementaciones de los Puertos
│   │   ├── http-auth.adapter.ts    # Adaptador HTTP para APIs externas
│   │   └── local-storage-auth.adapter.ts  # Adaptador para persistencia
│   └── services/             # Servicios de aplicación
│       └── auth.service.ts        # Servicio fachada
│
├── presentation/             # Capa de Presentación
│   ├── pages/                # Páginas
│   │   └── login.page.ts
│   └── components/           # Componentes reutilizables
│       ├── login-form.component.ts
│       └── user-info.component.ts
│
├── auth.module.ts            # Módulo de Angular (Configuración DI)
├── auth.routes.ts            # Rutas del módulo
└── index.ts                  # Barrel exports
```

## Capas de la Arquitectura Hexagonal

### 1. **Domain (Dominio)**
Contiene la lógica de negocio pura, independiente de cualquier framework.

- **Entities**: Objetos que representan conceptos del dominio (`User`, `AuthCredentials`)
- **Ports**: Interfaces que definen contratos (qué debe hacer el sistema, no cómo)
  - `IAuthPort`: Define operaciones de autenticación
  - `IAuthRepositoryPort`: Define operaciones de persistencia
- **Use Cases**: Casos de uso que encapsulan la lógica de negocio

### 2. **Application (Aplicación)**
Coordina la comunicación entre capas.

- **DTOs**: Objetos para transferir datos entre capas
- **Mappers**: Convierten entre DTOs y entidades, aislando cambios en APIs externas

### 3. **Infrastructure (Infraestructura)**
Implementaciones técnicas específicas.

- **Adapters**: Implementan los Ports (interfaces del dominio)
  - `HttpAuthAdapter`: Conecta con APIs externas
  - `LocalStorageAuthAdapter`: Persiste datos localmente
- **Services**: Servicios que orquestan los use cases

### 4. **Presentation (Presentación)**
Componentes UI y páginas Angular.

- **Pages**: Páginas principales
- **Components**: Componentes reutilizables

## Cómo Usar

### 1. Importar en tu componente o módulo

```typescript
// En tu componente
import { AuthService, LoginPageComponent } from './modules/auth';
```

### 2. Usar el servicio de autenticación

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/infrastructure/services/auth.service';
import { AuthCredentials } from './modules/auth/domain/entities/user.entity';

@Component({
  selector: 'app-dashboard',
  template: `...`
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      console.log('Usuario actual:', user);
    });
  }

  login(credentials: AuthCredentials) {
    this.authService.login(credentials).subscribe(
      response => console.log('Login exitoso', response),
      error => console.error('Error en login', error)
    );
  }

  logout() {
    this.authService.logout().subscribe(
      () => console.log('Sesión cerrada'),
      error => console.error('Error al cerrar sesión', error)
    );
  }
}
```

### 3. Integrar la página de login en rutas

Ya está configurado en `app.routes.ts`:

```typescript
{
  path: 'auth',
  children: authRoutes  // Incluye /auth/login
}
```

## Adaptadores

### HttpAuthAdapter

Implementa comunicación con API externa. Configura la URL de tu API:

```typescript
// src/app/modules/auth/infrastructure/adapters/http-auth.adapter.ts
private readonly API_URL = 'https://tu-api.com/auth';
```

**Endpoints esperados:**
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh-token` - Refrescar token

**Formato esperado de respuesta:**

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "token": "jwt-token-here",
      "expiresIn": 3600
    },
    "refreshToken": "refresh-token-here"
  }
}
```

### LocalStorageAuthAdapter

Persiste datos de autenticación en localStorage:

- Configura claves: `auth_user` y `auth_token`
- Recupera automáticamente la información al cargar la app

## Inyección de Dependencias

El módulo usa inyección de dependencias para vincular Ports con Adapters:

```typescript
// En auth.module.ts
{
  provide: IAuthPort,
  useClass: HttpAuthAdapter
},
{
  provide: IAuthRepositoryPort,
  useClass: LocalStorageAuthAdapter
}
```

Esto permite **cambiar implementaciones sin modificar la lógica de negocio**.

## Ventajas de la Arquitectura Hexagonal

✅ **Independencia de Frameworks**: La lógica de negocio no depende de Angular  
✅ **Testeable**: Fácil crear mocks de los puertos  
✅ **Desacopladura**: Cambiar API o persistencia sin afectar el dominio  
✅ **Escalable**: Fácil agregar nuevas funcionalidades  
✅ **Mantenible**: Código organizado y responsabilidades claras  

## Extensiones

### Agregar un nuevo adaptador HTTP

Crea una nueva clase que implemente `IAuthPort`:

```typescript
@Injectable()
export class NuevoAuthAdapter implements IAuthPort {
  login(credentials: AuthCredentials): Observable<LoginResponse> {
    // Tu implementación
  }
  // ... resto de métodos
}
```

Luego configura en `auth.module.ts`:

```typescript
{
  provide: IAuthPort,
  useClass: NuevoAuthAdapter
}
```

### Agregar persistencia en SessionStorage

Crea un nuevo adaptador:

```typescript
@Injectable()
export class SessionStorageAuthAdapter implements IAuthRepositoryPort {
  // Implementar usando sessionStorage
}
```

## Notas

- Los componentes son **standalone** (Angular 14+)
- Se usa **Reactive Forms** para validación
- Se implementan **RxJS Observables** para manejo asincrónico
- El módulo es **lazy-loadable** si lo necesitas

---

**Autor**: Sistema de Autenticación Hexagonal  
**Versión**: 1.0  
**Framework**: Angular 21
