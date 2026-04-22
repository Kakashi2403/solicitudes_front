# 🗺️ MAPA DE NAVEGACIÓN - Encuentra lo que Necesitas

## 📍 Guía Rápida: Archivo X Archivo

### 🎨 Si quieres cambiar la UI...

```
ESTILOS Y DISEÑO
├─ login.page.ts ← Colores, fuentes, animaciones
├─ login-form.component.ts ← Formulario
└─ user-info.component.ts ← Panel de usuario

Ruta: src/app/modules/auth/presentation/
```

### 🔌 Si necesitas cambiar la API...

```
API Y CONEXIONES
├─ http-auth.adapter.ts ← URL y endpoint
├─ login.dto.ts ← Estructura de respuesta
└─ login.mapper.ts ← Mapeo de datos

Ruta: src/app/modules/auth/infrastructure/adapters/
      src/app/modules/auth/application/
```

### 🧠 Si quieres entender la lógica...

```
LÓGICA DE NEGOCIO
├─ user.entity.ts ← Qué es un usuario
├─ auth.port.ts ← Interfaz de autenticación
├─ login.use-case.ts ← Qué pasa en un login
└─ auth.service.ts ← Punto de entrada

Ruta: src/app/modules/auth/domain/
      src/app/modules/auth/infrastructure/services/
```

### 📚 Si necesitas aprender...

```
DOCUMENTACIÓN
├─ README.md ← Explicación completa (en carpeta auth/)
├─ EJEMPLOS.ts ← Código de referencia (en carpeta auth/)
├─ TESTING.ts ← Cómo escribir tests (en carpeta auth/)
└─ GUIA_IMPLEMENTACION.md ← Guías prácticas (en raíz)

Todos en: src/app/modules/auth/
Otros en: Raíz del proyecto /
```

### 🚀 Si necesitas empezar rápido...

```
INICIO RÁPIDO
├─ COMENZAR_AHORA.md ← Lee esto primero
├─ INDICE_COMPLETO.md ← Mapa global
└─ RESUMEN_FINAL.md ← Estado actual

Todos en: Raíz del proyecto /
```

### 🐛 Si algo no funciona...

```
SOLUCIÓN DE PROBLEMAS
├─ SOLUCION_HTTPS_CORS.ts ← Errores SSL/CORS (en carpeta auth/)
├─ SOLICITUD_HTTP_EJEMPLO.ts ← Ejemplos HTTP (en carpeta auth/)
├─ API_ADAPTACION_COMPLETADA.md ← Qué cambió (en raíz)
└─ CAMBIOS_ESPECIFICOS.md ← Antes/después (en raíz)
```

---

## 🎯 Búsqueda por Necesidad

### Necesito... | Ir a...

| Necesidad | Archivo | Línea | Acción |
|-----------|---------|-------|--------|
| Cambiar URL API | `http-auth.adapter.ts` | 21 | Modifica `API_URL` |
| Cambiar endpoint | `http-auth.adapter.ts` | 34 | Cambia `/Token` |
| Adaptar respuesta | `login.mapper.ts` | 50 | Modifica `apiResponseToUser()` |
| Agregar campo | `user.entity.ts` | - | Agrega a interface |
| Personalizar formulario | `login-form.component.ts` | - | Modifica template |
| Cambiar estilos | `login.page.ts` | 80+ | Modifica `styles:` |
| Entender arquitectura | `README.md` | - | Lee sección "Capas" |
| Ver ejemplos | `EJEMPLOS.ts` | - | Busca "USE CASE..." |
| Agregar tests | `TESTING.ts` | - | Copia ejemplo |
| Solucionar CORS | `SOLUCION_HTTPS_CORS.ts` | - | Busca tu error |
| Entender flujo | `CAMBIOS_ESPECIFICOS.md` | - | Ve diagrama |

---

## 📂 Estructura Completa con Rutas

```
src/app/
└── modules/
    └── auth/
        │
        ├── 🧠 DOMAIN (Lógica Pura)
        │   ├── entities/
        │   │   └── user.entity.ts
        │   │       ├─ User
        │   │       ├─ AuthCredentials
        │   │       └─ LoginResponse
        │   │
        │   ├── ports/ (Interfaces)
        │   │   ├─ auth.port.ts (IAuthPort)
        │   │   └─ auth-repository.port.ts (IAuthRepositoryPort)
        │   │
        │   └── use-cases/
        │       ├─ login.use-case.ts
        │       ├─ logout.use-case.ts
        │       └─ get-current-user.use-case.ts
        │
        ├── 🔄 APPLICATION (DTOs + Mappers)
        │   ├── dto/
        │   │   └── login.dto.ts (ApiTokenResponseDTO, JwtPayload)
        │   │
        │   └── mappers/
        │       └── login.mapper.ts (decodeJwt, apiResponseToUser)
        │
        ├── ⚙️ INFRASTRUCTURE (Implementaciones)
        │   ├── adapters/
        │   │   ├─ http-auth.adapter.ts ← API HTTP
        │   │   └─ local-storage-auth.adapter.ts ← Persistencia
        │   │
        │   ├── config/
        │   │   └─ auth.config.ts
        │   │
        │   └── services/
        │       └─ auth.service.ts (Fachada)
        │
        ├── 🎨 PRESENTATION (Componentes UI)
        │   ├── pages/
        │   │   └─ login.page.ts ← Página principal
        │   │
        │   └── components/
        │       ├─ login-form.component.ts ← Formulario
        │       └─ user-info.component.ts ← Info usuario
        │
        ├── ⚙️ CONFIGURATION
        │   ├─ auth.module.ts ← Módulo + DI
        │   ├─ auth.routes.ts ← Rutas
        │   └─ index.ts ← Barrel exports
        │
        └── 📖 DOCUMENTACIÓN
            ├─ README.md ← Guía completa
            ├─ LOCAL_API_CONFIG.ts ← Config
            ├─ SOLICITUD_HTTP_EJEMPLO.ts ← Ejemplos
            ├─ SOLUCION_HTTPS_CORS.ts ← Soluciones
            ├─ EJEMPLOS.ts ← Patrones
            └─ TESTING.ts ← Tests

/
└── 📖 DOCUMENTACIÓN RAÍZ
    ├─ COMENZAR_AHORA.md ⭐ (Lee primero)
    ├─ INDICE_COMPLETO.md (Vista global)
    ├─ RESUMEN_FINAL.md (Estado actual)
    ├─ API_ADAPTACION_COMPLETADA.md (Cambios)
    ├─ CAMBIOS_ESPECIFICOS.md (Antes/después)
    ├─ GUIA_IMPLEMENTACION.md (Cómo extender)
    ├─ INICIO_RAPIDO.md (5 pasos)
    └─ RESUMEN_CREACION.md (Qué se creó)
```

---

## 🔍 Búsqueda por Tipo de Cambio

### Quiero cambiar... | Busca in...

#### 🌐 Conexión API
```
http-auth.adapter.ts          (21) API_URL
                              (34) login() endpoint
                              (53) logout() endpoint
                              (69) refreshToken() endpoint
```

#### 📊 Estructura de Datos
```
login.dto.ts                  (15) ApiTokenResponseDTO
                              (25) JwtPayload
login.mapper.ts               (50) decodeJwt()
                              (61) apiResponseToUser()
```

#### 🎨 Interfaz de Usuario
```
login.page.ts                 (80+) styles
                              (15) template
login-form.component.ts       (todas) styles y template
user-info.component.ts        (todas) styles y template
```

#### 🧠 Lógica de Negocio
```
login.use-case.ts            LoginUseCase.execute()
logout.use-case.ts           LogoutUseCase.execute()
auth.service.ts              AuthService (fachada)
```

#### 💾 Persistencia
```
local-storage-auth.adapter.ts saveUser(), getUser()
                              saveToken(), getToken()
```

---

## 🚨 Solución de Problemas

### Problema | Busca en | Solución

| Error | Archivo | Sección |
|-------|---------|---------|
| CORS Error | `SOLUCION_HTTPS_CORS.ts` | SOLUCIÓN 1 |
| SSL Error | `SOLUCION_HTTPS_CORS.ts` | SOLUCIÓN 1 |
| JWT Decode Error | `login.mapper.ts` | decodeJwt() |
| Credenciales Inválidas | `SOLICITUD_HTTP_EJEMPLO.ts` | PROBLEMAS |
| No aparece usuario | `login.page.ts` | onLogin() |
| Token no se guarda | `local-storage-auth.adapter.ts` | saveToken() |

---

## 📞 Contacto Rápido

**¿Dónde está qué?**

| Qué busco | Dónde | Tipo |
|-----------|-------|------|
| Componentes | `presentation/` | Carpeta |
| Lógica | `domain/` | Carpeta |
| API | `infrastructure/adapters/` | Carpeta |
| Tipos | `domain/entities/` + `application/dto/` | Archivos |
| Ejemplos | `EJEMPLOS.ts` + `TESTING.ts` | Archivos |
| Ayuda | `README.md` + guías | Documentación |

---

## ⏱️ Tiempo por Tarea

| Tarea | Tiempo | Dificultad |
|-------|--------|-----------|
| Entender flujo | 5-10 min | Fácil |
| Cambiar URL API | 1 min | Muy Fácil |
| Personalizar UI | 15-30 min | Fácil |
| Agregar endpoint | 10-20 min | Media |
| Entender arquitectura | 30-60 min | Media |
| Agregar nuevo use case | 30 min | Algo difícil |
| Escribir tests | 30-60 min | Algo difícil |

---

## 🎓 Orden de Lectura Recomendado

**Para aprender bien:**

1. **5 min** → `COMENZAR_AHORA.md`
2. **5 min** → Ejecutar `npm start` y probar
3. **10 min** → `CAMBIOS_ESPECIFICOS.md` (antes/después)
4. **15 min** → `API_ADAPTACION_COMPLETADA.md` (entender cambios)
5. **20 min** → `src/app/modules/auth/README.md` (arquitectura)
6. **10 min** → `EJEMPLOS.ts` (patrones)
7. **20 min** → `TESTING.ts` (cómo testear)

**Total: ~85 minutos para ser un experto** ✅

---

## 🎯 Punto de Entrada por Rol

### 👨‍💻 Frontend Developer
1. `COMENZAR_AHORA.md` → Ejecutar
2. `login.page.ts` → Personalizar UI
3. `login-form.component.ts` → Agregar campos
4. `GUIA_IMPLEMENTACION.md` → Integrar con backend

### 🏗️ Architect
1. `README.md` (en carpeta auth) → Entender patrón
2. `CAMBIOS_ESPECIFICOS.md` → Ver adaptaciones
3. `EJEMPLOS.ts` → Extensiones

### 🧪 QA / Tester
1. `TESTING.ts` → Ver ejemplos
2. `SOLICITUD_HTTP_EJEMPLO.ts` → Casos de uso
3. Ejecutar en navegador y testear

### 🔧 DevOps
1. `SOLUCION_HTTPS_CORS.ts` → Configuración
2. `LOCAL_API_CONFIG.ts` → URLs
3. Variables de entorno

---

**¡Encontraste lo que buscabas? Navega rápido usando esta guía.** 🚀
