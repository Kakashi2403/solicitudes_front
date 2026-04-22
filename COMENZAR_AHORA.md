# 🎯 INICIO INMEDIATO - Tu API está Lista

## ✅ Estado Actual

Tu módulo de autenticación ha sido **100% adaptado** a tu API:

- ✅ URL configurada: `https://localhost:7298/api/Token`
- ✅ Respuesta parseada: `{ body: { accessToken } }`
- ✅ JWT decodificado automáticamente
- ✅ Datos extraídos: `id`, `email`, `fullName`
- ✅ Almacenamiento en localStorage

---

## 🚀 PASO 1: Inicia el desarrollo

```bash
npm start
```

Se abrirá en `http://localhost:4200`

---

## 🚀 PASO 2: Aceptar certificado HTTPS (importante)

1. Abre en otra pestaña: **`https://localhost:7298`**
2. Verás advertencia de seguridad
3. Click en **"Avanzado" → "Continuar de todas formas"**
4. El navegador ahora confía en tu API
5. Cierra la pestaña

(Esto es necesario solo una vez)

---

## 🚀 PASO 3: Navega al Login

Abre: **`http://localhost:4200/auth/login`**

---

## 🚀 PASO 4: Ingresa Credenciales

**Email:** `fabianjsanchezpulifo@hotmail.com`  
**Contraseña:** `Kakash1240`

---

## 🚀 PASO 5: Click en "Iniciar Sesión"

¡Debería redirigirse y mostrar:

```
Bienvenido
Administrador
fabianjsanchezpulifo@hotmail.com
[ Cerrar Sesión ]
```

---

## ⚡ Si No Funciona

### Error: CORS / Network Error

```
⚠️ Error de conexión. Por favor intenta de nuevo.
```

**Solución:**

1. Verifica que tu API está ejecutándose en `https://localhost:7298`
2. Abre https://localhost:7298 en el navegador
3. Acepta el certificado
4. Intenta el login de nuevo

### Error: Certificado

```
NET::ERR_CERT_AUTHORITY_INVALID
```

**Solución:**

1. Abre: https://localhost:7298
2. Click en "Avanzado"
3. Click en "Continuar"

### Error: Credenciales Inválidas

```
Email o contraseña inválidos
```

**Solución:**

- Verifica que email y contraseña son correctos
- Verifica que la cuenta existe en tu BD
- Comprueba en Postman con los mismos datos

---

## 📍 Archivos Principales

| Archivo | Propósito |
|---------|-----------|
| `http-auth.adapter.ts` | Hace la petición HTTP |
| `login.mapper.ts` | Decodifica JWT y mapea datos |
| `login.page.ts` | Página de login UI |
| `login-form.component.ts` | Formulario |
| `auth.service.ts` | Servicio principal |

---

## 🔍 Cómo Debuggear

### En DevTools (F12):

1. **Pestaña Network:**
   - Intenta login
   - Busca POST `/Token`
   - Verifica status: 200
   - Verifica response: `{ "body": { "accessToken": "..." } }`

2. **Pestaña Console:**
   ```javascript
   // Ver usuario
   JSON.parse(localStorage.getItem('auth_user'))
   
   // Ver token
   localStorage.getItem('auth_token')
   ```

3. **Pestaña Application:**
   - Storage → Local Storage
   - Busca `auth_user` y `auth_token`

---

## 📚 Documentación

- **API_ADAPTACION_COMPLETADA.md** - Cambios realizados
- **SOLICITUD_HTTP_EJEMPLO.ts** - Ejemplos de solicitudes
- **SOLUCION_HTTPS_CORS.ts** - Solución de problemas SSL/CORS
- **GUIA_IMPLEMENTACION.md** - Guía completa (en raíz)
- **INICIO_RAPIDO.md** - Quick start (en raíz)

---

## ✨ Lo Siguiente

Una vez que funcione el login:

### 1. Agregar Logout
Ya está implementado. El botón "Cerrar Sesión" funciona automáticamente.

### 2. Proteger Rutas
```typescript
// src/app/guards/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate() {
    return this.auth.getCurrentUser().pipe(
      map(user => user ? true : (this.router.navigate(['/auth/login']), false))
    );
  }
}

// Usa en routes:
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
```

### 3. Agregar Token a Requests
```typescript
// src/app/http-interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorageAuthAdapter) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storage.getToken();
    if (token && !req.url.includes('/Token')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}

// En app.ts:
import { HTTP_INTERCEPTORS } from '@angular/common/http';

providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
```

### 4. Agregar Logout Endpoint
Actualiza `logout()` en `http-auth.adapter.ts`:
```typescript
logout(): Observable<void> {
  return this.http.post<void>(`${this.API_URL}/Logout`, {}).pipe(
    tap(() => {
      this.currentUserSubject.next(null);
    })
  );
}
```

---

## 💡 Pro Tips

**Para el future:**

Si cambias de API, solo actualiza:

```typescript
// En http-auth.adapter.ts
private readonly API_URL = 'https://nueva-api.com/api';
```

---

## 🎓 Entender el Flujo

1. **Usuario escribe credenciales** en LoginFormComponent
2. **Form emite evento** al LoginPageComponent
3. **LoginPageComponent llama** a `AuthService.login()`
4. **AuthService ejecuta** `LoginUseCase`
5. **LoginUseCase llama** a `IAuthPort.login()` (HttpAuthAdapter)
6. **HttpAuthAdapter hace** POST a tu API
7. **API responde** con `{ body: { accessToken: "..." } }`
8. **LoginMapper decodifica** el JWT
9. **Extrae:** `id`, `email`, `fullName` del JWT
10. **Guarda en localStorage** el usuario y token
11. **Form desaparece**, aparece **UserInfoComponent**
12. **Usuario ve** su nombre y avatar

---

## 📞 Resumen Rápido

| Paso | Qué Hacer | Para Qué |
|------|-----------|----------|
| 1 | `npm start` | Inicia servidor Angular |
| 2 | Abre https://localhost:7298 | Aceptar certificado |
| 3 | Ve a http://localhost:4200/auth/login | Acceder al login |
| 4 | Ingresa credenciales | Autenticarse |
| 5 | Click en "Iniciar Sesión" | Enviar login |
| 6 | Ver "Bienvenido Administrador" | ✅ Éxito |

---

**¡Listo! Tu sistema de autenticación está completamente funcional.** 🎉

**¿Problema?** Revisa los archivos .md o sigue estos pasos para debuggear.

**¿Necesitas más?** Sigue leyendo el siguiente capítulo en la documentación.
