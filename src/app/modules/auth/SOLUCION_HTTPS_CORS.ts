/**
 * SOLUCIÓN: Errores HTTPS/CORS con localhost:7298
 * 
 * Si ves errores como:
 * - NET::ERR_CERT_AUTHORITY_INVALID
 * - Access to XMLHttpRequest has been blocked by CORS policy
 */

// ============================================================================
// SOLUCIÓN 1: Aceptar el certificado en el navegador (RECOMENDADO)
// ============================================================================

/*
1. Abre: https://localhost:7298
2. Verás una advertencia de seguridad
3. Click en "Avanzado" → "Continuar de todas formas"
4. El navegador ahora confía en el certificado
5. Ahora Angular puede hacer requests a esa URL

Este es el método más simple y seguro para desarrollo.
*/

// ============================================================================
// SOLUCIÓN 2: Configurar Angular DevServer como Proxy (alternativa)
// ============================================================================

/*
Si prefieres usar HTTP en desarrollo:

1. Abre angular.json
2. Busca "serve" → "options"
3. Agrega proxy:

{
  "serve": {
    "targets": {
      "development": {
        "proxyConfig": "proxy.conf.json"
      }
    }
  }
}

4. Crea proxy.conf.json en la raíz del proyecto:

{
  "/api/*": {
    "target": "https://localhost:7298",
    "secure": false,
    "changeOrigin": true
  }
}

5. Usa localhost en la app:
   private readonly API_URL = 'http://localhost:4200/api';
*/

// ============================================================================
// SOLUCIÓN 3: Cambiar URL en tiempo de ejecución (env)
// ============================================================================

/*
Crea archivos .env por entorno:

.env.development
NG_APP_API_URL=https://localhost:7298/api

.env.production
NG_APP_API_URL=https://api-produccion.com/api

En el código:
*/

export class EnvironmentConfig {
  // Cargará https://localhost:7298/api en desarrollo
  // Cargará https://api-produccion.com/api en producción
  static readonly API_URL = process.env['NG_APP_API_URL'] || 'https://localhost:7298/api';
}

// Usa en http-auth.adapter.ts:
/*
import { EnvironmentConfig } from '../config/environment.config';

export class HttpAuthAdapter implements IAuthPort {
  private readonly API_URL = EnvironmentConfig.API_URL;
  ...
}
*/

// ============================================================================
// SOLUCIÓN 4: Desactivar validación SSL (SOLO DESARROLLO - No recomendado)
// ============================================================================

/*
En package.json, cambia el script de start:

"start": "ng serve --ssl=true --ssl-cert=./server.crt --ssl-key=./server.key"

Esto NO es seguro para producción, solo para testing local.
*/

// ============================================================================
// VERIFICAR QUE FUNCIONA
// ============================================================================

/*
1. Abre la consola del navegador (F12)
2. Ve a Network tab
3. Intenta hacer login
4. Busca la petición POST a /Token
5. Verifica:
   - Status: 200 ✅
   - Headers: Content-Type: application/json
   - Response: { "body": { "accessToken": "..." }, ... }

Si ves 0 (pending), probablemente es error de CORS o SSL.
Si ves error CORS, verifica que tu API tiene CORS habilitado.
*/

// ============================================================================
// HEADERS REQUERIDOS EN TU API
// ============================================================================

/*
Tu API debe responder con estos headers:

Access-Control-Allow-Origin: *
(o la URL específica de tu frontend)

Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT

Access-Control-Allow-Headers: Content-Type, Authorization

Access-Control-Max-Age: 3600

Si tu API es ASP.NET, en Startup.cs agrega:

services.AddCors(options => {
  options.AddPolicy("AllowFrontend", builder => {
    builder
      .WithOrigins("http://localhost:4200", "https://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader();
  });
});

app.UseCors("AllowFrontend");
*/

export {};
