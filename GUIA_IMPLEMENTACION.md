# Guía de Implementación - Conectar API Externa

Esta guía te ayudará a conectar tu módulo de autenticación con una API externa real.

## Paso 1: Configurar la URL de la API

### Opción A: Usar variables de entorno

Crea archivos de configuración por entorno en la raíz del proyecto:

**`.env`** (desarrollo local)
```
NG_APP_API_URL=http://localhost:3000
```

**`.env.production`** (producción)
```
NG_APP_API_URL=https://api.tudominio.com
```

Luego accede en el código:
```typescript
// En http-auth.adapter.ts
private readonly API_URL = `${process.env['NG_APP_API_URL']}/auth`;
```

### Opción B: Usar archivo de configuración

1. Actualiza `auth.config.ts`:

```typescript
export const authConfig: AuthConfig = {
  apiUrl: 'https://tu-api.com',
  // ...
};
```

2. Usa en el adaptador:

```typescript
import { authConfig } from '../config/auth.config';

@Injectable()
export class HttpAuthAdapter implements IAuthPort {
  private readonly API_URL = `${authConfig.apiUrl}/auth`;
  // ...
}
```

## Paso 2: Adaptar el formato de respuesta de tu API

Si tu API tiene un formato diferente, modifica el `LoginMapper`:

### Ejemplo: Tu API responde así

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "jwt-token",
    "user": {
      "uuid": "user-123",
      "emailAddress": "user@example.com",
      "fullName": "John Doe"
    }
  }
}
```

### Solución: Actualizar el mapper

```typescript
// En login.mapper.ts
apiResponseToUser(apiResponse: any): User {
  return {
    id: apiResponse.data.user.uuid,
    email: apiResponse.data.user.emailAddress,
    fullName: apiResponse.data.user.fullName,
    token: apiResponse.data.accessToken,
    expiresIn: apiResponse.data.expiresIn
  };
}
```

## Paso 3: Configurar headers y autenticación

### Si tu API requiere headers especiales:

```typescript
// En http-auth.adapter.ts
login(credentials: AuthCredentials): Observable<LoginResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  });

  return this.http.post<ApiLoginResponseDTO>(
    `${this.API_URL}/login`,
    {
      email: credentials.email,
      password: credentials.password
    },
    { headers }
  ).pipe(
    map(apiResponse => 
      this.loginMapper.apiResponseToLoginResponse(apiResponse)
    )
  );
}
```

## Paso 4: Agregar manejo de errores

Actualiza el manejo de errores HTTP:

```typescript
// En http-auth.adapter.ts
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

login(credentials: AuthCredentials): Observable<LoginResponse> {
  return this.http.post<ApiLoginResponseDTO>(
    `${this.API_URL}/login`,
    { email: credentials.email, password: credentials.password }
  ).pipe(
    map(response => this.loginMapper.apiResponseToLoginResponse(response)),
    catchError(error => {
      const errorMessage = this.handleError(error);
      throw new Error(errorMessage);
    })
  );
}

private handleError(error: HttpErrorResponse): string {
  if (error.status === 401) {
    return 'Credenciales inválidas';
  } else if (error.status === 403) {
    return 'Acceso denegado';
  } else if (error.status === 0) {
    return 'Error de conexión';
  } else {
    return error.error?.message || 'Error desconocido';
  }
}
```

## Paso 5: Agregar interceptor para token

Crea un interceptor que agregue el token JWT a todas las peticiones:

```typescript
// En infrastructure/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageAuthAdapter } from '../adapters/local-storage-auth.adapter';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authRepository: LocalStorageAuthAdapter) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authRepository.getToken();

    if (token && !this.isAuthRequest(req)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

  private isAuthRequest(req: HttpRequest<any>): boolean {
    return req.url.includes('/auth/login') || req.url.includes('/auth/logout');
  }
}
```

Registra en `auth.module.ts`:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './infrastructure/interceptors/auth.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    // ... otros providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
```

## Paso 6: Agregar guard para proteger rutas

```typescript
// En infrastructure/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth/login'], { 
            queryParams: { returnUrl: state.url } 
          });
          return false;
        }
      })
    );
  }
}
```

Usa en rutas:

```typescript
// En app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];
```

## Paso 7: Manejar expiración de token

```typescript
// En auth.service.ts
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private tokenExpired$ = new Subject<void>();

  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.loginUseCase.execute(credentials).pipe(
      tap(response => {
        if (response.success && response.user.expiresIn) {
          this.scheduleTokenRefresh(response.user.expiresIn);
        }
      })
    );
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    // Refrescar 1 minuto antes de expirar
    const refreshIn = (expiresIn - 60) * 1000;
    setTimeout(() => {
      this.refreshToken();
    }, refreshIn);
  }

  private refreshToken(): void {
    const token = this.authRepository.getToken();
    if (token) {
      // Refrescar token
    }
  }
}
```

## Ejemplo Completo: Conectar con Supabase

Aquí hay un ejemplo completo de cómo adaptar para Supabase:

```typescript
// En http-auth.adapter.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IAuthPort } from '../../domain/ports/auth.port';

@Injectable()
export class SupabaseAuthAdapter implements IAuthPort {
  private readonly SUPABASE_URL = 'https://your-project.supabase.co';
  private readonly SUPABASE_KEY = 'your-anon-key';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        email: credentials.email,
        password: credentials.password
      },
      {
        headers: { apikey: this.SUPABASE_KEY }
      }
    ).pipe(
      map(response => ({
        user: {
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.user_metadata.full_name,
          token: response.access_token
        },
        success: true
      })),
      catchError(error => {
        throw new Error('Error de autenticación');
      })
    );
  }

  // ... resto de métodos
}
```

## Checklist de Implementación

- [ ] Configurar URL de API (variables de entorno o archivo)
- [ ] Adaptar formato de respuesta en LoginMapper
- [ ] Configurar headers si es necesario
- [ ] Agregar manejo de errores HTTP
- [ ] Crear e integrar AuthTokenInterceptor
- [ ] Crear e integrar AuthGuard
- [ ] Implementar refresh de token
- [ ] Probar con tu API real
- [ ] Sincronizar CORS en servidor API (if needed)
- [ ] Documentar endpoints específicos de tu API

## Debugging

Para ver qué está pasando en las peticiones HTTP:

```typescript
// En http-auth.adapter.ts
login(credentials: AuthCredentials): Observable<LoginResponse> {
  return this.http.post<ApiLoginResponseDTO>(
    `${this.API_URL}/login`,
    { email: credentials.email, password: credentials.password }
  ).pipe(
    tap(response => console.log('API Response:', response)),
    map(response => this.loginMapper.apiResponseToLoginResponse(response)),
    catchError(error => {
      console.error('Login error:', error);
      throw error;
    })
  );
}
```

---

¡Listo! Ahora tu módulo de autenticación está conectado a tu API externa.
