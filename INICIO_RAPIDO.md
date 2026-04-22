# 🚀 Guía de Inicio Rápido - Módulo de Autenticación Hexagonal

## ¿Qué es lo que recibiste?

Un módulo completo de autenticación construido con **Arquitectura Hexagonal**, listo para consumir APIs externas.

### Estructura:

```
✅ Domain Layer      → Lógica de negocio pura
✅ Application Layer → DTOs y Mappers
✅ Infrastructure    → Adaptadores y Servicios
✅ Presentation      → Componentes y Páginas
```

---

## ⚡ 5 Pasos para Empezar

### 1️⃣ Configurar la URL de tu API

Abre `src/app/modules/auth/infrastructure/adapters/http-auth.adapter.ts`

Cambia esta línea:

```typescript
private readonly API_URL = 'https://api.example.com/auth';
```

Por tu URL real:

```typescript
private readonly API_URL = 'https://tu-api.com/auth';
```

---

### 2️⃣ Adaptar el formato de respuesta

Si tu API devuelve un formato distinto, actualiza `login.mapper.ts`:

**Ejemplo: Si tu API responde así:**

```json
{
  "token": "jwt-token",
  "user": {
    "uuid": "123",
    "name": "John"
  }
}
```

**Actualiza el mapper:**

```typescript
apiResponseToUser(apiResponse: any): User {
  return {
    id: apiResponse.user.uuid,      // ← Cambiar
    email: apiResponse.user.email,  // ← Cambiar
    fullName: apiResponse.user.name, // ← Cambiar
    token: apiResponse.token        // ← Cambiar
  };
}
```

---

### 3️⃣ Usar en tus páginas

```typescript
import { Component } from '@angular/core';
import { LoginPageComponent } from './modules/auth';

@Component({
  selector: 'app-root',
  imports: [LoginPageComponent],
  template: '<app-login-page></app-login-page>'
})
export class App {}
```

---

### 4️⃣ Inyectar el servicio donde lo necesites

```typescript
import { Component } from '@angular/core';
import { AuthService } from './modules/auth';

@Component({
  selector: 'app-dashboard',
  template: '...'
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener usuario actual
    this.authService.getCurrentUser().subscribe(user => {
      console.log('Usuario:', user);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('Sesión cerrada');
    });
  }
}
```

---

### 5️⃣ Proteger rutas (opcional)

Crea un guard:

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../modules/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.getCurrentUser().pipe(
      map(user => user ? true : (this.router.navigate(['/auth/login']), false))
    );
  }
}
```

Usa en rutas:

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
```

---

## 🎯 Casos de Uso Comunes

### Verificar si el usuario está logueado

```typescript
this.authService.getCurrentUser().subscribe(user => {
  if (user) {
    console.log('Usuario autenticado:', user.fullName);
  } else {
    console.log('No hay usuario logueado');
  }
});
```

### Ejecutar acciones después del login

```typescript
this.authService.login(credentials).subscribe({
  next: (response) => {
    if (response.success) {
      this.router.navigate(['/dashboard']);
    }
  },
  error: (error) => {
    this.showErrorMessage(error.message);
  }
});
```

### Agregar token JWT a todas las requests (Interceptor)

```typescript
// src/app/http-interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { LocalStorageAuthAdapter } from '../modules/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorageAuthAdapter) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storage.getToken();
    if (token && !req.url.includes('/auth/')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
```

Registra en `app.ts`:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';

// En app.ts o bootstrap
TestBed.configureTestingModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
});
```

---

## 🌐 Endpoints Esperados de tu API

Tu API debe tener estos endpoints (o adaptar el código):

### 1. Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "token": "jwt-token-here"
    },
    "refreshToken": "refresh-token-here"
  }
}
```

### 2. Logout

```
POST /auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 3. Refresh Token (opcional)

```
POST /auth/refresh-token
Content-Type: application/json

{
  "token": "old-token"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "refreshToken": "new-refresh-token"
  }
}
```

---

## 📁 Estructura de Archivos Clave

```
src/app/modules/auth/
├── domain/                    # Lógica de negocio
│   ├── entities/             # User, AuthCredentials
│   ├── ports/                # Interfaces (IAuthPort)
│   └── use-cases/            # LoginUseCase, LogoutUseCase
├── infrastructure/           # Implementaciones
│   ├── adapters/             # HttpAuthAdapter, LocalStorageAuthAdapter
│   └── services/             # AuthService (Fachada)
├── presentation/             # UI
│   ├── pages/                # LoginPageComponent
│   └── components/           # LoginFormComponent, UserInfoComponent
└── application/              # DTOs y Mappers
    ├── dto/                  # LoginRequestDTO
    └── mappers/              # LoginMapper
```

---

## 🐛 Debugging

### Ver qué está pasando en las peticiones:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Intenta login
4. Deberías ver la petición a `/auth/login`

### Verificar localStorage:

En la consola del navegador:

```javascript
localStorage.getItem('auth_user')    // Ver usuario almacenado
localStorage.getItem('auth_token')   // Ver token
localStorage.removeItem('auth_user') // Limpiar
```

### Logs en consola:

El adaptador ya tiene algunos logs. Para más detalles, añade en `http-auth.adapter.ts`:

```typescript
login(credentials) {
  console.log('🔐 Intentando login con:', credentials.email);
  return this.http.post(...).pipe(
    tap(response => console.log('✅ Login exitoso:', response)),
    catchError(error => {
      console.error('❌ Error de login:', error);
      throw error;
    })
  );
}
```

---

## 📚 Documentación Completa

- **[README.md](./README.md)** - Explicación detallada de la arquitectura
- **[GUIA_IMPLEMENTACION.md](../../../GUIA_IMPLEMENTACION.md)** - Cómo conectar a tu API
- **[TESTING.ts](./TESTING.ts)** - Ejemplos de testing

---

## ✅ Checklist de Configuración

- [ ] Cambiar URL de API en `http-auth.adapter.ts`
- [ ] Adaptar formato de respuesta en `login.mapper.ts` (si es necesario)
- [ ] Probar login en navegador
- [ ] Verificar que el token se guarda en localStorage
- [ ] Crear un interceptor para agregar token a requests (si lo necesitas)
- [ ] Crear un guard para proteger rutas (si lo necesitas)
- [ ] Implementar refresh token (opcional)

---

## 🆘 Problemas Comunes

**P: ¿Por qué mi login no funciona?**
- ✅ Verifica la URL de API
- ✅ Abre DevTools → Network → busca la petición
- ✅ Verifica que tu API está CORS habilitado

**P: ¿Cómo cambio donde se almacena el token?**
- Usa `SessionStorageAuthAdapter` en lugar de `LocalStorageAuthAdapter`
- O crea un nuevo adapter que implemente `IAuthRepositoryPort`

**P: ¿Cómo agrego autenticación OAuth?**
- Crea `OAuth2AuthAdapter implements IAuthPort`
- Cambia la configuración en `auth.module.ts`

**P: ¿Cómo testeo esto?**
- Ver `TESTING.ts` para ejemplos completos de tests

---

## 🎓 Próximos Pasos

1. **Lee la documentación completa** en [README.md](./README.md)
2. **Conecta a tu API real** siguiendo [GUIA_IMPLEMENTACION.md](../../../GUIA_IMPLEMENTACION.md)
3. **Escribe tests** usando los ejemplos en [TESTING.ts](./TESTING.ts)
4. **Personaliza los componentes** según tu diseño
5. **Agrega más funcionalidades** (refresh token, 2FA, etc.)

---

## 💡 Tips & Tricks

### Usar variables de entorno

Crea `.env`:
```
NG_APP_API_URL=https://tu-api.com
```

Accede en el código:
```typescript
private readonly API_URL = process.env['NG_APP_API_URL'];
```

### Personalizaciones rápidas

**Cambiar colores:** Edita `login.page.ts` → `styles`
**Cambiar textos:** Edita los templates en components
**Agregar campos:** Modifica `LoginFormComponent`

---

**¡Listo! Ya tienes un sistema de autenticación profesional con arquitectura hexagonal.** 🎉

¿Preguntas? Revisa la documentación o crea un issue en tu repositorio.
