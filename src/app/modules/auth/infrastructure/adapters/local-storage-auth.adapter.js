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
exports.LocalStorageAuthAdapter = void 0;
/**
 * Adaptador LocalStorage Auth Repository
 * Implementa AuthRepositoryPort - Persiste datos de autenticacion
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var LocalStorageAuthAdapter = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LocalStorageAuthAdapter = _classThis = /** @class */ (function () {
        function LocalStorageAuthAdapter_1(platformId, config) {
            this.platformId = platformId;
            this.config = config;
        }
        /**
         * Guarda el usuario en localStorage
         */
        LocalStorageAuthAdapter_1.prototype.saveUser = function (user) {
            var _a;
            try {
                (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.setItem(this.config.storageKeys.user, JSON.stringify(user));
            }
            catch (error) {
                console.error('Error saving user to localStorage:', error);
            }
        };
        /**
         * Obtiene el usuario del localStorage
         */
        LocalStorageAuthAdapter_1.prototype.getUser = function () {
            var _a;
            try {
                var user = (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(this.config.storageKeys.user);
                return user ? JSON.parse(user) : null;
            }
            catch (error) {
                console.error('Error getting user from localStorage:', error);
                return null;
            }
        };
        /**
         * Elimina el usuario del localStorage
         */
        LocalStorageAuthAdapter_1.prototype.removeUser = function () {
            var _a;
            try {
                (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.removeItem(this.config.storageKeys.user);
            }
            catch (error) {
                console.error('Error removing user from localStorage:', error);
            }
        };
        /**
         * Guarda el token en localStorage
         */
        LocalStorageAuthAdapter_1.prototype.saveToken = function (token) {
            var _a;
            try {
                (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.setItem(this.config.storageKeys.token, token);
            }
            catch (error) {
                console.error('Error saving token to localStorage:', error);
            }
        };
        /**
         * Obtiene el token del localStorage
         */
        LocalStorageAuthAdapter_1.prototype.getToken = function () {
            var _a, _b;
            try {
                return (_b = (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.getItem(this.config.storageKeys.token)) !== null && _b !== void 0 ? _b : null;
            }
            catch (error) {
                console.error('Error getting token from localStorage:', error);
                return null;
            }
        };
        /**
         * Elimina el token del localStorage
         */
        LocalStorageAuthAdapter_1.prototype.removeToken = function () {
            var _a;
            try {
                (_a = this.getStorage()) === null || _a === void 0 ? void 0 : _a.removeItem(this.config.storageKeys.token);
            }
            catch (error) {
                console.error('Error removing token from localStorage:', error);
            }
        };
        LocalStorageAuthAdapter_1.prototype.getStorage = function () {
            if (!(0, common_1.isPlatformBrowser)(this.platformId)) {
                return null;
            }
            return this.config.storageType === 'sessionStorage' ? sessionStorage : localStorage;
        };
        return LocalStorageAuthAdapter_1;
    }());
    __setFunctionName(_classThis, "LocalStorageAuthAdapter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocalStorageAuthAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocalStorageAuthAdapter = _classThis;
}();
exports.LocalStorageAuthAdapter = LocalStorageAuthAdapter;
