"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMapper = void 0;
/**
 * Mapper: Convierte DTOs a Entidades de Dominio y viceversa
 * Aisla la capa de presentacion de los cambios en las APIs externas
 */
var core_1 = require("@angular/core");
var LoginMapper = function () {
    var _classDecorators = [(0, core_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginMapper = _classThis = /** @class */ (function () {
        function LoginMapper_1() {
        }
        /**
         * Mapea LoginRequestDTO a AuthCredentials (Entidad de Dominio)
         */
        LoginMapper_1.prototype.dtoToAuthCredentials = function (dto) {
            return {
                email: dto.email,
                password: dto.password
            };
        };
        /**
         * Decodifica el JWT sin validar (solo lectura)
         * En produccion, la validacion debe hacerse en el backend
         */
        LoginMapper_1.prototype.decodeJwt = function (token) {
            try {
                var parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('Token invalido');
                }
                var normalizedPayload = parts[1]
                    .replace(/-/g, '+')
                    .replace(/_/g, '/')
                    .padEnd(Math.ceil(parts[1].length / 4) * 4, '=');
                var decoded = JSON.parse(atob(normalizedPayload));
                return decoded;
            }
            catch (error) {
                console.error('Error decodificando JWT:', error);
                throw new Error('No se pudo decodificar el token');
            }
        };
        /**
         * Mapea respuesta de API a Entidad User
         * Extrae informacion del JWT ya que la API solo devuelve el token
         */
        LoginMapper_1.prototype.apiResponseToUser = function (apiResponse) {
            var _a;
            var token = (_a = apiResponse.body) === null || _a === void 0 ? void 0 : _a.accessToken;
            if (!token) {
                throw new Error('La API de autenticacion no devolvio un access token');
            }
            var payload = this.decodeJwt(token);
            return {
                id: payload.nameid,
                email: payload.email,
                fullName: payload.unique_name,
                token: token,
                expiresIn: payload.exp ? payload.exp - Math.floor(Date.now() / 1000) : 3600
            };
        };
        /**
         * Mapea User a LoginResponseDTO (para presentacion)
         */
        LoginMapper_1.prototype.userToLoginResponseDTO = function (user) {
            return {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                token: user.token,
                expiresIn: user.expiresIn,
                refreshToken: user.refreshToken
            };
        };
        /**
         * Mapea respuesta de API a LoginResponse
         */
        LoginMapper_1.prototype.apiResponseToLoginResponse = function (apiResponse) {
            if (apiResponse.errors && apiResponse.errors.length > 0) {
                return {
                    success: false,
                    message: apiResponse.errors.join(', ')
                };
            }
            try {
                var user = this.apiResponseToUser(apiResponse);
                return {
                    user: user,
                    success: true,
                    message: 'Autenticacion exitosa'
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Error en la autenticacion'
                };
            }
        };
        return LoginMapper_1;
    }());
    __setFunctionName(_classThis, "LoginMapper");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginMapper = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginMapper = _classThis;
}();
exports.LoginMapper = LoginMapper;
