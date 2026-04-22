/**
 * GUIA: Solicitud HTTP al endpoint de Token
 *
 * Tu API: https://localhost:7298/api/Token
 * Metodo: POST
 * Content-Type: application/json
 */

// ============================================================================
// EJEMPLO 1: Solicitud Simple (como se ve en Postman)
// ============================================================================

/*
POST https://localhost:7298/api/Token
Content-Type: application/json

{
  "email": "fabianjsanchezpulifo@hotmail.com",
  "password": "Kakash1240"
}

RESPUESTA EXITOSA (200 OK):
{
  "body": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "errors": null,
  "warnings": null
}

PAYLOAD DEL JWT (decodificado):
{
  "nameid": "1",
  "unique_name": "Administrador",
  "email": "fabianjsanchezpulifo@hotmail.com",
  "nbf": 1776809844,
  "exp": 1776813444,
  "iat": 1776809844
}
*/

// ============================================================================
// EJEMPLO 2: Como se usa en la aplicacion Angular
// ============================================================================

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './index';
import { LoginResponse } from './domain/entities/user.entity';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" placeholder="Email" name="email" />
      <input [(ngModel)]="password" type="password" placeholder="Contrasena" name="password" />
      <button type="submit">Login</button>
    </form>
  `
})
export class ExampleComponent {
  email = 'fabianjsanchezpulifo@hotmail.com';
  password = 'Kakash1240';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login exitoso');
        console.log('Usuario:', response.user);

        if (response.user) {
          console.log('Token:', response.user.token);
        }

        // El usuario se guarda automaticamente en localStorage
      },
      error: (error: unknown) => {
        console.error('Error en login:', error);
      }
    });
  }
}

// ============================================================================
// EJEMPLO 3: Flujo completo con manejo de errores
// ============================================================================

/*
1. Usuario ingresa email y contrasena
2. LoginPageComponent llama a AuthService.login()
3. AuthService.login() -> LoginUseCase.execute()
4. LoginUseCase -> HttpAuthAdapter.login()
5. HttpAuthAdapter hace POST a https://localhost:7298/api/Token
6. API responde con { body: { accessToken: "..." }, errors: null }
7. LoginMapper decodifica el JWT y extrae:
   - id: "1" (de nameid)
   - email: "fabianjsanchezpulifo@hotmail.com"
   - fullName: "Administrador" (de unique_name)
   - token: "eyJ..." (el JWT completo)
8. LoginUseCase guarda en localStorage:
   - auth_user: { id, email, fullName, token, expiresIn }
   - auth_token: "eyJ..."
9. Component recibe LoginResponse con success: true
10. Usuario ve su nombre "Administrador" en UserInfoComponent
*/

// ============================================================================
// EJEMPLO 4: Problemas comunes y soluciones
// ============================================================================

/*
PROBLEMA 1: CORS Error
- Error: "Access to XMLHttpRequest has been blocked by CORS policy"
- SOLUCION:
  - Verifica que tu API tiene CORS habilitado
  - El servidor debe responder con: Access-Control-Allow-Origin: *

PROBLEMA 2: SSL/HTTPS Error (self-signed certificate)
- Error: "ssl_error_bad_cert_domain" o similar
- SOLUCION:
  - En desarrollo, accede a https://localhost:7298 en el navegador
  - Acepta el certificado (click en avanzado)
  - Luego la app podra hacer requests

PROBLEMA 3: JWT Decode Error
- Error: "Token invalido" en la decodificacion
- SOLUCION:
  - Verifica que el token esta bien formado (3 partes separadas por .)
  - Usa https://jwt.io para verificar manualmente
  - El token debe tener un payload con nameid, email, unique_name

PROBLEMA 4: Credenciales Incorrectas
- Respuesta: { "errors": ["Invalid credentials"] }
- SOLUCION:
  - Verifica que email y password son correctos
  - Usa el ejemplo:
    email: "fabianjsanchezpulifo@hotmail.com"
    password: "Kakash1240"
*/

// ============================================================================
// EJEMPLO 5: Verificar que funciona
// ============================================================================

/*
PASOS PARA DEBUGGEAR:

1. Abre la consola del navegador (F12)
2. Ve a la pestana Network
3. Intenta hacer login
4. Busca la peticion a /Token
5. Verifica:
   - Status: 200 (exitoso)
   - Headers: Content-Type: application/json
   - Response: { body: { accessToken: "..." }, errors: null }

6. En la consola (tab Console), verifica que el usuario se guardo:
   localStorage.getItem('auth_user')
   // Deberia devolver algo como:
   // {"id":"1","email":"...","fullName":"Administrador","token":"eyJ..."}

7. Verifica el token en localStorage:
   localStorage.getItem('auth_token')
   // Deberia devolver: eyJ...
*/

export {};
