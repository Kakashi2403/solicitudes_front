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
exports.HttpAuthAdapter = void 0;
/**
 * Adaptador HTTP Auth Service
 * Implementa AuthPort - Comunica con una API externa
 */
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var HttpAuthAdapter = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpAuthAdapter = _classThis = /** @class */ (function () {
        function HttpAuthAdapter_1(http, loginMapper, authRepository, config) {
            this.http = http;
            this.loginMapper = loginMapper;
            this.authRepository = authRepository;
            this.config = config;
            this.currentUserSubject = new rxjs_1.BehaviorSubject(this.authRepository.getUser());
            this.currentUser$ = this.currentUserSubject.asObservable();
        }
        /**
         * Realiza login contra la API externa
         * Endpoint configurable desde environment
         */
        HttpAuthAdapter_1.prototype.login = function (credentials) {
            var _this = this;
            return this.http
                .post(this.buildUrl(this.config.endpoints.login), {
                email: credentials.email,
                password: credentials.password
            })
                .pipe((0, operators_1.map)(function (apiResponse) {
                var loginResponse = _this.loginMapper.apiResponseToLoginResponse(apiResponse);
                if (loginResponse.success && loginResponse.user) {
                    _this.currentUserSubject.next(loginResponse.user);
                }
                return loginResponse;
            }));
        };
        /**
         * Obtiene el usuario actual desde el servicio
         */
        HttpAuthAdapter_1.prototype.getCurrentUser = function () {
            return this.currentUser$;
        };
        /**
         * Cierra sesion
         */
        HttpAuthAdapter_1.prototype.logout = function () {
            var _this = this;
            var logoutEndpoint = this.config.endpoints.logout;
            var request$ = logoutEndpoint ? this.http.post(this.buildUrl(logoutEndpoint), {}) : (0, rxjs_1.of)(void 0);
            return request$.pipe((0, operators_1.catchError)(function () { return (0, rxjs_1.of)(void 0); }), (0, operators_1.map)(function () {
                _this.currentUserSubject.next(null);
            }));
        };
        /**
         * Refresca el token
         */
        HttpAuthAdapter_1.prototype.refreshToken = function (token) {
            var _this = this;
            var refreshTokenEndpoint = this.config.endpoints.refreshToken;
            if (!refreshTokenEndpoint) {
                return (0, rxjs_1.throwError)(function () { return new Error('No hay endpoint configurado para refrescar el token'); });
            }
            return this.http
                .post(this.buildUrl(refreshTokenEndpoint), {
                token: token
            })
                .pipe((0, operators_1.map)(function (apiResponse) {
                var loginResponse = _this.loginMapper.apiResponseToLoginResponse(apiResponse);
                if (loginResponse.success && loginResponse.user) {
                    _this.currentUserSubject.next(loginResponse.user);
                }
                return loginResponse;
            }));
        };
        HttpAuthAdapter_1.prototype.buildUrl = function (endpoint) {
            var sanitizedBaseUrl = this.config.apiUrl.replace(/\/+$/, '');
            var sanitizedEndpoint = endpoint.startsWith('/') ? endpoint : "/".concat(endpoint);
            return "".concat(sanitizedBaseUrl).concat(sanitizedEndpoint);
        };
        return HttpAuthAdapter_1;
    }());
    __setFunctionName(_classThis, "HttpAuthAdapter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpAuthAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpAuthAdapter = _classThis;
}();
exports.HttpAuthAdapter = HttpAuthAdapter;
