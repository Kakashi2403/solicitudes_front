"use strict";
/**
 * EJEMPLOS Y PATRONES
 * Como extender y testear el modulo de autenticacion
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.MockAuthAdapter = exports.OAuth2AuthAdapter = void 0;
// ============================================================================
// EJEMPLO 1: Crear un nuevo adaptador HTTP alternativo
// ============================================================================
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * Adaptador alternativo que usa OAuth2
 * Puedes reemplazar HttpAuthAdapter con este en auth.module.ts
 */
var OAuth2AuthAdapter = function () {
    var _classDecorators = [(0, core_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OAuth2AuthAdapter = _classThis = /** @class */ (function () {
        function OAuth2AuthAdapter_1(http) {
            this.http = http;
            this.apiUrl = 'https://oauth-provider.com/auth';
            this.clientId = 'your-client-id';
            this.clientSecret = 'your-client-secret';
        }
        OAuth2AuthAdapter_1.prototype.login = function (credentials) {
            void this.http;
            void this.apiUrl;
            void this.clientId;
            void this.clientSecret;
            return new rxjs_1.Observable(function (observer) {
                observer.next({
                    user: {
                        id: 'oauth-user',
                        email: credentials.email,
                        fullName: 'OAuth Example User',
                        token: 'oauth-access-token',
                        expiresIn: 3600
                    },
                    success: true
                });
                observer.complete();
            });
        };
        OAuth2AuthAdapter_1.prototype.getCurrentUser = function () {
            return new rxjs_1.Observable(function (observer) {
                observer.next(null);
                observer.complete();
            });
        };
        OAuth2AuthAdapter_1.prototype.logout = function () {
            return new rxjs_1.Observable(function (observer) {
                observer.next();
                observer.complete();
            });
        };
        OAuth2AuthAdapter_1.prototype.refreshToken = function (token) {
            return new rxjs_1.Observable(function (observer) {
                observer.next({
                    user: {
                        id: 'oauth-user',
                        email: 'oauth@example.com',
                        fullName: 'OAuth Example User',
                        token: token,
                        expiresIn: 3600
                    },
                    success: true
                });
                observer.complete();
            });
        };
        return OAuth2AuthAdapter_1;
    }());
    __setFunctionName(_classThis, "OAuth2AuthAdapter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OAuth2AuthAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OAuth2AuthAdapter = _classThis;
}();
exports.OAuth2AuthAdapter = OAuth2AuthAdapter;
// ============================================================================
// EJEMPLO 2: Crear un nuevo adaptador de persistencia
// ============================================================================
/**
 * Adaptador que usa IndexedDB en lugar de localStorage
 */
// @Injectable()
// export class IndexedDbAuthAdapter implements IAuthRepositoryPort {
//   private db!: IDBDatabase;
//
//   constructor() {
//     this.initDb();
//   }
//
//   private initDb() {
//     const request = indexedDB.open('AuthDB', 1);
//     request.onupgradeneeded = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       if (!db.objectStoreNames.contains('auth')) {
//         db.createObjectStore('auth');
//       }
//     };
//   }
//
//   saveUser(user: User): void {
//     // Implementar guardado en IndexedDB
//   }
//
//   getUser(): User | null {
//     // Implementar lectura desde IndexedDB
//     return null;
//   }
//   // ... resto de metodos
// }
// ============================================================================
// EJEMPLO 3: Usar un Mock para Testing
// ============================================================================
/**
 * Mock para testing - implementa IAuthPort
 */
var MockAuthAdapter = /** @class */ (function () {
    function MockAuthAdapter() {
        this.mockUser = {
            id: 'test-123',
            email: 'test@example.com',
            fullName: 'Test User',
            token: 'mock-token',
            expiresIn: 3600
        };
    }
    MockAuthAdapter.prototype.login = function (credentials) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            if (credentials.email === 'test@example.com' && credentials.password === 'password') {
                observer.next({
                    user: _this.mockUser,
                    success: true
                });
                observer.complete();
                return;
            }
            observer.error({
                message: 'Credenciales invalidas'
            });
        });
    };
    MockAuthAdapter.prototype.getCurrentUser = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            observer.next(_this.mockUser);
            observer.complete();
        });
    };
    MockAuthAdapter.prototype.logout = function () {
        return new rxjs_1.Observable(function (observer) {
            observer.next();
            observer.complete();
        });
    };
    MockAuthAdapter.prototype.refreshToken = function (token) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            observer.next({
                user: __assign(__assign({}, _this.mockUser), { token: token }),
                success: true
            });
            observer.complete();
        });
    };
    return MockAuthAdapter;
}());
exports.MockAuthAdapter = MockAuthAdapter;
