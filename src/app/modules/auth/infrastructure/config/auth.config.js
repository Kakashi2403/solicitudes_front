"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_KEYS = exports.AUTH_ERROR_MESSAGES = exports.AUTH_ENDPOINTS = exports.AUTH_CONFIG = exports.defaultAuthConfig = void 0;
/**
 * Auth Configuration
 * Configuracion centralizada para el modulo de autenticacion
 */
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../environments/environment");
/**
 * Configuracion por defecto
 * Sobreescribe segun tu entorno (desarrollo, produccion, etc.)
 */
exports.defaultAuthConfig = {
    apiUrl: environment_1.environment.apis.auth.baseUrl,
    endpoints: {
        login: environment_1.environment.apis.auth.endpoints.login,
        logout: environment_1.environment.apis.auth.endpoints.logout,
        refreshToken: environment_1.environment.apis.auth.endpoints.refreshToken,
        getProfile: environment_1.environment.apis.auth.endpoints.profile,
        verifyToken: environment_1.environment.apis.auth.endpoints.verify
    },
    storageType: environment_1.environment.auth.storageType,
    storageKeys: environment_1.environment.auth.storageKeys,
    tokenExpirationTime: environment_1.environment.auth.tokenExpirationTime,
    refreshTokenThreshold: environment_1.environment.auth.refreshTokenThreshold,
    enableAutoRefresh: environment_1.environment.auth.enableAutoRefresh
};
exports.AUTH_CONFIG = new core_1.InjectionToken('AUTH_CONFIG');
/**
 * Endpoints de la API
 */
exports.AUTH_ENDPOINTS = {
    LOGIN: exports.defaultAuthConfig.endpoints.login,
    LOGOUT: (_a = exports.defaultAuthConfig.endpoints.logout) !== null && _a !== void 0 ? _a : '',
    REFRESH_TOKEN: (_b = exports.defaultAuthConfig.endpoints.refreshToken) !== null && _b !== void 0 ? _b : '',
    GET_PROFILE: (_c = exports.defaultAuthConfig.endpoints.getProfile) !== null && _c !== void 0 ? _c : '',
    VERIFY_TOKEN: (_d = exports.defaultAuthConfig.endpoints.verifyToken) !== null && _d !== void 0 ? _d : ''
};
/**
 * Mensajes de error
 */
exports.AUTH_ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Email o contrasena invalidos',
    SESSION_EXPIRED: 'Tu sesion ha expirado. Por favor inicia sesion de nuevo',
    NETWORK_ERROR: 'Error de conexion. Verifica tu conexion a internet',
    SERVER_ERROR: 'Error en el servidor. Intenta mas tarde',
    UNAUTHORIZED: 'No autorizado',
    FORBIDDEN: 'Acceso denegado'
};
/**
 * Claves de almacenamiento local
 */
exports.STORAGE_KEYS = {
    USER: exports.defaultAuthConfig.storageKeys.user,
    TOKEN: exports.defaultAuthConfig.storageKeys.token,
    REFRESH_TOKEN: exports.defaultAuthConfig.storageKeys.refreshToken,
    TOKEN_EXPIRATION: exports.defaultAuthConfig.storageKeys.tokenExpiration
};
