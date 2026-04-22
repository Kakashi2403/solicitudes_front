/**
 * Configuración específica para API Local en https://localhost:7298
 */

export const localApiConfig = {
  // URL base de tu API
  baseUrl: 'https://localhost:7298/api',
  
  // Endpoints
  endpoints: {
    login: '/Token',
    logout: '/Token/logout',
    refreshToken: '/Token/refresh'
  },

  // Estructura esperada de respuesta del login
  responseStructure: {
    token: 'body.accessToken',
    errors: 'errors',
    warnings: 'warnings'
  },

  // Información extraída del JWT
  jwtPayload: {
    id: 'nameid',
    email: 'email',
    fullName: 'unique_name',
    expiresAt: 'exp'
  }
};

/**
 * NOTAS IMPORTANTES:
 * 
 * 1. JWT DECODING:
 *    - El token se decodifica automáticamente en `login.mapper.ts`
 *    - Se extrae: id (nameid), email, fullName (unique_name)
 *    - El tiempo de expiración se calcula desde exp en el payload
 * 
 * 2. SSL/HTTPS LOCALHOST:
 *    - Si ves errores CORS o SSL, puedes:
 *      a) Usar http://localhost:7298 en desarrollo
 *      b) Confiar en el certificado del navegador
 *      c) Configurar Angular para aceptar HTTPS inseguro en dev
 * 
 * 3. CORS:
 *    - Asegúrate que tu API tiene CORS configurado
 *    - Header requerido: Access-Control-Allow-Origin: *
 *    - Header requerido: Access-Control-Allow-Methods: POST, GET, OPTIONS
 * 
 * 4. CAMBIAR URL:
 *    - Modifica el valor en `http-auth.adapter.ts`: private readonly API_URL = '...'
 *    - O usa una variable de entorno NG_APP_API_URL
 */
