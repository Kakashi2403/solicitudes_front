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
exports.AuthModule = void 0;
/**
 * Auth Module Configuration
 * Configura la inyeccion de dependencias y proporciona todos los servicios necesarios
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// Domain
var login_use_case_1 = require("./domain/use-cases/login.use-case");
var logout_use_case_1 = require("./domain/use-cases/logout.use-case");
var get_current_user_use_case_1 = require("./domain/use-cases/get-current-user.use-case");
// Application
var login_mapper_1 = require("./application/mappers/login.mapper");
// Infrastructure - Adapters
var http_auth_adapter_1 = require("./infrastructure/adapters/http-auth.adapter");
var local_storage_auth_adapter_1 = require("./infrastructure/adapters/local-storage-auth.adapter");
var auth_config_1 = require("./infrastructure/config/auth.config");
var auth_service_1 = require("./infrastructure/services/auth.service");
// Ports
var auth_port_1 = require("./domain/ports/auth.port");
var auth_repository_port_1 = require("./domain/ports/auth-repository.port");
var AuthModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            imports: [common_1.CommonModule],
            providers: [
                // Configuracion
                {
                    provide: auth_config_1.AUTH_CONFIG,
                    useValue: auth_config_1.defaultAuthConfig
                },
                // Mappers
                login_mapper_1.LoginMapper,
                // Use Cases
                login_use_case_1.LoginUseCase,
                logout_use_case_1.LogoutUseCase,
                get_current_user_use_case_1.GetCurrentUserUseCase,
                // Infrastructure - Adapters
                http_auth_adapter_1.HttpAuthAdapter,
                local_storage_auth_adapter_1.LocalStorageAuthAdapter,
                // Service Facade
                auth_service_1.AuthService,
                // Inyeccion de dependencias - Vincula los puertos con los adaptadores
                {
                    provide: auth_port_1.AuthPort,
                    useExisting: http_auth_adapter_1.HttpAuthAdapter
                },
                {
                    provide: auth_repository_port_1.AuthRepositoryPort,
                    useExisting: local_storage_auth_adapter_1.LocalStorageAuthAdapter
                }
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
